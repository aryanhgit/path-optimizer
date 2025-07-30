# optimize.py

import os
import requests
from flask_restx import Namespace, Resource, fields

ORS_API_KEY = os.getenv('ORS_API_KEY')
ORS_URL_BASE = "https://api.openrouteservice.org/v2/directions/"

optimize_ns = Namespace('optimize', description='Route optimization and comparison')

optimize_input_model = optimize_ns.model('OptimizeInput', {
    'origin': fields.String(required=True, description='Origin coordinates (lon,lat)'),
    'destination': fields.String(required=True, description='Destination coordinates (lon,lat)')
})

route_result_model = optimize_ns.model('RouteResult', {
    'mode': fields.String(description="Travel mode (car, motorcycle, bike, walk)"),
    'distance_km': fields.Float,
    'duration_min': fields.Integer,
    'carbon_emissions_kg': fields.Float
})

optimize_response_model = optimize_ns.model('OptimizeResponse', {
    'origin': fields.String,
    'destination': fields.String,
    'alternatives': fields.List(fields.Nested(route_result_model))
})

EMISSIONS = {
    'driving-car': 0.21,
    'driving-motorcycle': 0.12,
    'cycling-regular': 0.0,
    'foot-walking': 0.0
}

MODE_LABELS = {
    'driving-car': 'car',
    'driving-motorcycle': 'motorcycle',
    'cycling-regular': 'bike',
    'foot-walking': 'walk'
}

@optimize_ns.route('/compare')
class RouteComparison(Resource):
    @optimize_ns.expect(optimize_input_model)
    @optimize_ns.marshal_with(optimize_response_model)
    def post(self):
        data = optimize_ns.payload
        origin = data.get('origin')  # "lon,lat"
        destination = data.get('destination')

        try:
            start_lon, start_lat = map(float, origin.split(','))
            end_lon, end_lat = map(float, destination.split(','))
        except:
            optimize_ns.abort(400, "Invalid coordinate format. Use 'lon,lat'.")

        modes = ['driving-car', 'driving-motorcycle', 'cycling-regular', 'foot-walking']
        results = []

        for mode in modes:
            url = f"{ORS_URL_BASE}{mode}"
            headers = {
                'Authorization': ORS_API_KEY,
                'Content-Type': 'application/json'
            }
            body = {
                "coordinates": [[start_lon, start_lat], [end_lon, end_lat]]
            }

            response = requests.post(url, json=body, headers=headers)

            if response.status_code != 200:
                continue  # Skip this mode on failure

            try:
                route = response.json()
                segment = route['routes'][0]['segments'][0]
                distance_km = round(segment['distance'] / 1000, 2)
                duration_min = round(segment['duration'] / 60)
                emissions = round(distance_km * EMISSIONS.get(mode, 0), 2)

                results.append({
                    "mode": MODE_LABELS[mode],
                    "distance_km": distance_km,
                    "duration_min": duration_min,
                    "carbon_emissions_kg": emissions
                })
            except Exception as e:
                continue

        if not results:
            optimize_ns.abort(500, "No valid routes found.")

        return {
            "origin": origin,
            "destination": destination,
            "alternatives": results
        }
