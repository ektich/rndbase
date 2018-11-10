from flaskapp import api
from flaskapp import app
from flask_restful import Resource
from flaskapp import db

app.logger.info("loading api.py")
class Cities(Resource):
    """Return list of cities in the region"""

    def get(self, region):
        """Return list of cities in the region"""

        return {region: ['city1', 'city2']}

class Regions(Resource):
    """Return list of regions"""

    def get(self):
        regions = db.Db(host='db').get_all_regions(return_dict=True)
        app.logger.info(regions)

        return {'regions': regions}

api.add_resource(Cities, '/cities/<region>')
api.add_resource(Regions, '/regions')
