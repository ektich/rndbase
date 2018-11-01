"""Collection of functions to process imports from CSV files"""

from app.db import Db
import re

# compass point remapping
cp_map = {'north': 'n',
          'south': 's',
          'east': 'e',
          'west': 'w',
          'north-west': 'nw',
          'north-east': 'ne',
          'south-east': 'se',
          'south-west': 'sw'
          }


def import_industries(file, city):
    """Import industries for a city

    A lot of things are assumed, but what can be extracted from the
    file is inserted into the databse.

    :param file: uploaded CSV file
    :param city: city for which processing is done
    """

    db = Db(host='db')  # should use configuration parameter!!!
    goods = db.get_goods()
    industries = [goods[k]['industry'] for k in goods.keys()]

    # misformatted lines
    unprocessed = []

    # non-existent goods
    unknown_goods = []

    for line in file:
        line = line.strip().lower()
        (good, rest) = line.split(',', 1)
        try:
            (industry, rest) = rest.split('-', 1)
            # print("{}: {}".format(good, industry))
            # try to carve out industry name from the rest part
            location = re.sub(industry, '', rest)
            # and now split location into city and compass point
            (city, compass) = location.strip().split(' ', 1)
            # compas might have a comma at the end
            compass = compass.strip(',')
            print("{}:{}".format(city, cp_map[compass]))
        except (ValueError, UnboundLocalError, KeyError):
            unprocessed.append(line)

        if good not in goods.keys():
            unknown_goods.append(line)

    print("--- unprocessed ---")
    [print(l) for l in unprocessed]

    print("--- unknown goods ---")
    [print(l) for l in unknown_goods]
