from flask import Flask
from flask_restful import Api
from config import Config


app = Flask(__name__)
api = Api(app, prefix="/api/v1")

from flaskapp import routes
from flaskapp import restapi
app.config.from_object(Config)
