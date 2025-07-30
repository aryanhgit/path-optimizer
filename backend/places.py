# places.py

from flask_restx import Namespace, Resource, fields
from geocode import get_coordinates

place_ns = Namespace('places', description='Place to coordinates')

place_input_model = place_ns.model('PlaceInput', {
    'place': fields.String(required=True, description="Name of the place")
})

coordinates_model = place_ns.model('Coordinates', {
    'name': fields.String,
    'latitude': fields.String,
    'longitude': fields.String
})

coordinate_list = place_ns.model('CoordinateList', {
    'result': fields.List(fields.Nested(coordinates_model))
})


@place_ns.route('/geocode')
class PlaceToCoordinates(Resource):
    @place_ns.expect(place_input_model)
    @place_ns.marshal_with(coordinate_list)
    def post(self):
        place_name = place_ns.payload['place']
        results = get_coordinates(place_name)

        # Wrap results in a dict to match model
        if isinstance(results, dict) and 'error' in results:
            # Handle error as an HTTP error
            place_ns.abort(404, results['error'])
        return {'result': results}
