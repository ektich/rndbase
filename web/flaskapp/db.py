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
        :param database: Database to connect to (default rndbase)
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

    def get_all_regions(self, lang='en', return_dict=False):
        """Get the list of all regions in the database

        By default return list containing names of the regions in UK
        English.
        If return_dict is True return list of dictionaries of {name:
        'name', label: 'Name'} format, where 'name' is the internal
        name of the region, and label is the name of the
        region in specified language.

        :param lang: language for the lablels (default en)
        :return_dict: return as list of dictionaries (defaul False)
        """

        projection = {'name': True,
                      "{}.name".format(lang): True,
                      "_id": False}

        result = self.db.regions.find(projection=projection)
        try:
            if return_dict:
                return [{'name': r['name'],
                         'label': r[lang]['name']} for r in result]
            else:
                return [r[lang]['name'] for r in result]
        except KeyError as e:
            raise NotImplementedError

    def get_all_cities(self, lang='en'):
        """Get the list of all cities present in the database

        By default return names of the cities in the UK
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

    def update_industry(self, name, city, region, cpoint):
        """Update information about the industry

        If the record about the industry does not exist in the
        database it will be  created

        :param name: name of the industry
        :param city: name of the city
        :param region: name of the region
        :param cpoint: compass point"""

        d = {'name': name,
             'location': {
                 'city': city,
                 'region': region,
                 'cpoint': cpoint}}

        try:
            self.db.industries.replace_one(filter=d,
                                           replacement=d,
                                           upsert=True)
        except pymongo.errors.WriteError:
            print("inserting of {} failed".format(d))
