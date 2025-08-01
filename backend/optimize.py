import os
import requests
from flask_restx import Namespace, Resource, fields
from openrouteservice import convert  # For decoding encoded polyline geometry

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
    'route_geometry': fields.List(fields.List(fields.Float))  # [lat, lon]
})

optimize_response_model = optimize_ns.model('OptimizeResponse', {
    'origin': fields.String,
    'destination': fields.String,
    'alternatives': fields.List(fields.Nested(route_result_model))
})

EMISSIONS = {
    'driving-car': 0.21,
    'cycling-electric': 0.02,
    'cycling-regular': 0.0,
    'foot-walking': 0.0
}

MODE_LABELS = {
    'driving-car': 'Car',
    'cycling-electric': 'Electric Cycle',
    'cycling-regular': 'Bicycle',
    'foot-walking': 'Walk'
}

FUEL_COST_PER_KM = 6.0 / 15  # ₹6 per litre, 15 km/l

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

        modes = ['cycling-electric', 'cycling-regular', 'foot-walking']
        results = []

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
                steps = route['guidance'].get('instructions')
                directions = [step.get('message', '') + step.get('instructionType', '') for step in steps]

                distance_km = round(summary['lengthInMeters'] / 1000, 2)
                duration_min = round(summary['travelTimeInSeconds'] / 60)
                emissions = round(distance_km * EMISSIONS['driving-car'], 2)
                fuel_cost = round(distance_km * FUEL_COST_PER_KM, 2)
                directions = [step['message'] for step in steps]

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

        for mode in modes:
            url = f"{ORS_URL_BASE}{mode}"
            headers = {
                'Authorization': ORS_API_KEY,
                'Content-Type': 'application/json'
            }
            body = {
                "coordinates": [[start_lon, start_lat], [end_lon, end_lat]],
                "instructions": True,
                "preference": "fastest",
                "geometry": True  # Only this, no geometry_format
            }

            response = requests.post(url, json=body, headers=headers)

            if response.status_code != 200:
                continue

            try:
                route = response.json()
                route_data = route['routes'][0]

                segment = route_data['segments'][0]
                distance_km = round(segment['distance'] / 1000, 2)
                duration_min = round(segment['duration'] / 60)
                emissions = round(distance_km * EMISSIONS.get(mode, 0), 2)
                fuel_cost = round(distance_km * FUEL_COST_PER_KM, 2) if mode == 'driving-car' else 0.0
                directions = [step['instruction'] for step in segment.get('steps', [])]

                # Decode polyline into [lat, lon]
                decoded_geom = convert.decode_polyline(route_data['geometry'])
                leaflet_coords = [[point[1], point[0]] for point in decoded_geom['coordinates']]

                results.append({
                    "mode": MODE_LABELS[mode],
                    "distance_km": distance_km,
                    "duration_min": duration_min,
                    "carbon_emissions_kg": emissions,
                    "fuel_cost_rs": fuel_cost,
                    "directions": directions,
                    "route_geometry": leaflet_coords
                })
            except Exception as e:
                print(f"Error parsing response for mode {mode}: {e}")
                continue

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
