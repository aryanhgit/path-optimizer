# geocode.py

import requests

def get_coordinates(place_name, limit=100):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        'q': place_name,
        'format': 'json',
        'limit': limit
    }

    headers = {
        'User-Agent': 'BusRouteOptimizer/1.0'
    } 
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        data = response.json()
        if data:
            results = []
            for item in data:
                results.append({
                    'name': item.get('display_name'),
                    'latitude': item.get('lat'),
                    'longitude': item.get('lon')
                })
            return results
        else:
            return {'error': 'Place not found'}
    else:
        return {'error': 'Failed to fetch coordinates'}
