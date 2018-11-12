from flaskapp import api
from flaskapp import app
from flask_restful import Resource
from flaskapp import db

app.logger.info("loading api.py")


class Cities(Resource):
    """Return list of cities in the region"""

    def get(self, lang, region):
        """Return list of cities in the region"""

        return {region: ['city1', 'city2']}


class Regions(Resource):
    """Return list of regions"""

    def get(self, lang):
        try:
            regions = db.Db(host='db').get_all_regions(lang=lang,
                                                       return_dict=True)
            app.logger.info(regions)

            return {'regions': regions}
        except NotImplementedError as e:
            return {'message':
                    "Language {} is not supported yet".format(lang)}, 404


# routes are prefixed with /api/v1: see declaration of
# api in __init__py file
api.add_resource(Cities, '/<lang>/<region>/cities')
api.add_resource(Regions, '/<lang>/regions')
