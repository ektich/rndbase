from flaskapp import api
from flaskapp import app
from flask_restful import Resource


app.logger.info("loading api.py")
class Cities(Resource):
    def get(self, region):
        """Return list of cities in the region"""

        return {region: ['city1', 'city2']}


api.add_resource(Cities, '/cities/<region>')
