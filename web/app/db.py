"""Classes interacting with the database"""

import pymongo
from urllib.parse import quote_plus


class Db(object):
    """Class representing mongoDB database"""

    def __init__(self, host='localhost', database='rndbase',
                 username=None, password=None):
        """Class representing mongoDB database

        If username and password are provided connection will be
        authenticated against the database

        :param host: MongoDB server hostname (default localhost)
        :param database: Database to connect to (default assetsdb)
        :param username: Username used for authentication
        :param password: Password used for authentication
        """

        if (username and password):
            dburi = "mongodb://{}:{}@{}/{}".format(
                quote_plus(username),
                quote_plus(password),
                host, database)
        else:
            dburi = "mongodb://{}".format(host)

        self.db = pymongo.MongoClient(dburi)[database]

    def close(self):
        """Close database connection"""

        self.db.close()

    def get_all_cities(self, lang='en'):
        """Get the list of all cities present in the database

        By default return names of the cities in the (british)
        English.
        An exception is raised if labels in specified language do not
        exist in the database.

        :param lang: language for the names
        """

        projection = {"{}.name".format(lang): True,
                      "_id": False}
        result = self.db.cities.find(projection=projection)
        return [r[lang]['name'] for r in result]

    def get_goods(self, lang='en'):
        """Get the list of goods

        By default returns names of goods in (British) English

        Returns dictionary of dictionaries, where key is the internal name of
        the good (lowercase english name), and the subdictionary
        contains (British) English name and internal name of the
        industry:
        r['coal'] = {'name': 'Coal', 'industry': 'coal mine'}
        :param lang: language for the names
        """

        projection = {'name': True,
                      '{}.name'.format(lang): True,
                      'industry': True,
                      '_id': False}
        result = self.db.goods.find(projection=projection)
        return {r['name']: {'name': r[lang]['name'],
                            'industry': r['industry']} for r in result}
