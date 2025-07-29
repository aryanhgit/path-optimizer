import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

ORS_API_KEY = os.getenv('ORS_API_KEY')

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.get_json()
    origin = data['origin']  # format: "longitude,latitude"
    destination = data['destination']

    # Parse coordinates
    try:
        start_lon, start_lat = map(float, origin.split(','))
        end_lon, end_lat = map(float, destination.split(','))
    except:
        return jsonify({"error": "Invalid coordinate format"}), 400

    # Build ORS request
    url = "https://api.openrouteservice.org/v2/directions/driving-car"
    headers = {
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json'
    }
    body = {
        "coordinates": [[start_lon, start_lat], [end_lon, end_lat]]
    }

    response = requests.post(url, json=body, headers=headers)
    print("ORS response status:", response.status_code)
    print("ORS response body:", response.text)  # <-- this helps debug

    if response.status_code != 200:
        return jsonify({"error": "ORS API failed", "details": response.text}), 500

    try:
        route = response.json()
        segment = route['routes'][0]['segments'][0]
        distance_km = segment['distance'] / 1000
        duration_min = segment['duration'] / 60
        carbon_saved = round(distance_km * 0.21, 2)

        return jsonify({
            "route": "Optimized public route",
            "estimated_time": f"{round(duration_min)} minutes",
            "distance": f"{round(distance_km, 2)} km",
            "carbon_saving_kg": carbon_saved
        })
    except Exception as e:
        return jsonify({"error": "Failed to parse route", "details": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
