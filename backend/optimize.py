import os
import requests
from flask_restx import Namespace, Resource, fields
from openrouteservice import convert
from concurrent.futures import ThreadPoolExecutor

ORS_API_KEY = os.getenv('ORS_API_KEY')
ORS_URL_BASE = "https://api.openrouteservice.org/v2/directions/"

TOMTOM_API_KEY = os.getenv('TOMTOM_API_KEY')
TOMTOM_BASE_URL = "https://api.tomtom.com/routing/1/calculateRoute"

optimize_ns = Namespace('optimize', description='Route optimization and comparison')

optimize_input_model = optimize_ns.model('OptimizeInput', {
    'origin': fields.String(required=True, description='Origin coordinates (lon,lat)'),
    'destination': fields.String(required=True, description='Destination coordinates (lon,lat)'),
    'optimize_by': fields.String(required=False, default='time', description='Optimization preference: "time" or "cost"')
})

route_result_model = optimize_ns.model('RouteResult', {
    'mode': fields.String,
    'distance_km': fields.Float,
    'duration_min': fields.Integer,
    'carbon_emissions_kg': fields.Float,
    'fuel_cost_rs': fields.Float,
    'directions': fields.List(fields.String),
    'route_geometry': fields.List(fields.List(fields.Float))
})

optimize_response_model = optimize_ns.model('OptimizeResponse', {
    'origin': fields.String,
    'destination': fields.String,
    'alternatives': fields.List(fields.Nested(route_result_model))
})

# gm / km 
EMISSIONS = {
    'driving-car': 121.9,
    'cycling-electric': 14,
    'cycling-regular': 16, #estimating the life-cycle emission
    'foot-walking': 5
}

MODE_LABELS = {
    'driving-car': 'Car',
    'cycling-electric': 'Electric Cycle',
    'cycling-regular': 'Bicycle',
    'foot-walking': 'Walk'
}

# Distance: 100 km
# Mileage: 15 km/L
# Fuel Price: ₹100/L
# Calculation: 100 km / 15 km/L \* ₹100/L = ₹666.67 (total fuel cost).
# Cost per KM: ₹666.67 / 100 km = ₹6.67 per km.
FUEL_COST_PER_KM = 6.67

def fetch_ors_mode(mode, start_lon, start_lat, end_lon, end_lat):
    url = f"{ORS_URL_BASE}{mode}"
    headers = {
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json'
    }
    body = {
        "coordinates": [[start_lon, start_lat], [end_lon, end_lat]],
        "instructions": True,
        "preference": "fastest",
        "geometry": True
    }

    try:
        response = requests.post(url, json=body, headers=headers)
        if response.status_code != 200:
            return None
        route = response.json()
        route_data = route['routes'][0]
        segment = route_data['segments'][0]

        distance_km = round(segment['distance'] / 1000, 2)
        duration_min = round(segment['duration'] / 60)
        emissions = round(distance_km * EMISSIONS.get(mode, 0), 2)
        fuel_cost = round(distance_km * FUEL_COST_PER_KM, 2) if mode == 'driving-car' else 0.0
        directions = [step['instruction'] for step in segment.get('steps', [])]

        decoded_geom = convert.decode_polyline(route_data['geometry'])
        leaflet_coords = [[point[1], point[0]] for point in decoded_geom['coordinates']]

        return {
            "mode": MODE_LABELS[mode],
            "distance_km": distance_km,
            "duration_min": duration_min,
            "carbon_emissions_kg": emissions,
            "fuel_cost_rs": fuel_cost,
            "directions": directions,
            "route_geometry": leaflet_coords
        }
    except Exception as e:
        print(f"Error in ORS mode {mode}: {e}")
        return None

@optimize_ns.route('/compare')
class RouteComparison(Resource):
    @optimize_ns.expect(optimize_input_model)
    @optimize_ns.marshal_with(optimize_response_model)
    def post(self):
        data = optimize_ns.payload
        origin = data.get('origin')
        destination = data.get('destination')
        optimize_by = data.get('optimize_by', 'time')

        try:
            start_lon, start_lat = map(float, origin.split(','))
            end_lon, end_lat = map(float, destination.split(','))
        except:
            optimize_ns.abort(400, "Invalid coordinate format. Use 'lon,lat'.")

        results = []
        modes = ['cycling-electric', 'cycling-regular', 'foot-walking']

        # TomTom (car mode)
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (compatible; MyFlaskApp/1.0)"
            }

            tomtom_url = (
                f"{TOMTOM_BASE_URL}/{start_lat},{start_lon}:{end_lat},{end_lon}/json"
                f"?traffic=true&instructionsType=text&key={TOMTOM_API_KEY}"
            )

            response = requests.get(tomtom_url, headers=headers)

            if response.status_code == 200:
                data = response.json()
                route = data['routes'][0]
                summary = route['summary']
                instructions = route['legs'][0]['points']
                steps = route['guidance'].get('instructions', [])
                directions = [step.get('message', '') for step in steps]

                distance_km = round(summary['lengthInMeters'] / 1000, 2)
                duration_min = round(summary['travelTimeInSeconds'] / 60)
                emissions = round(distance_km * EMISSIONS['driving-car'], 2)
                fuel_cost = round(distance_km * FUEL_COST_PER_KM, 2)
                leaflet_coords = [[pt['latitude'], pt['longitude']] for pt in instructions]

                results.append({
                    "mode": MODE_LABELS['driving-car'],
                    "distance_km": distance_km,
                    "duration_min": duration_min,
                    "carbon_emissions_kg": emissions,
                    "fuel_cost_rs": fuel_cost,
                    "directions": directions,
                    "route_geometry": leaflet_coords
                })
        except Exception as e:
            print(f"TomTom error: {e}")

        # ORS (parallel calls)
        with ThreadPoolExecutor(max_workers=len(modes)) as executor:
            futures = [
                executor.submit(fetch_ors_mode, mode, start_lon, start_lat, end_lon, end_lat)
                for mode in modes
            ]
            for future in futures:
                res = future.result()
                if res:
                    results.append(res)

        if not results:
            return {
                "origin": origin,
                "destination": destination,
                "alternatives": []
            }, 200

        results.sort(key=lambda x: x['carbon_emissions_kg'] if optimize_by == 'cost' else x['duration_min'])

        return {
            "origin": origin,
            "destination": destination,
            "alternatives": results
        }
