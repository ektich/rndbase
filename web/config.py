import os


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'nuiktotyposleetogo'
    DB_NAME = os.environ.get('DB_NAME') or 'rndbase'
    """DB_NAME: name of the database to use"""
