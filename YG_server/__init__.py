import os

from flask import Flask, make_response, jsonify


# TODO: setup postgresql

def create_app(test_config=None):
  # create and configure the app

  # __name__ is the name of the current python module
  # info on flask object - https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask
  app = Flask(__name__, instance_relative_config=True)
  app.config.from_object('config.DevConfig')
  # app.config.from_object('config.ProdConfig')

  # if test_config is None:
  #   # load the instance config, if it exists, when not testing
  #   app.config.from_pyfile('config.py', silent=True)
  # else:
  #   # load the test config if passed in
  #   app.config.from_mapping(test_config)

  # ensure the instance folder exists
  try:
    os.makedirs(app.instance_path)
  except OSError:
    pass

  @app.errorhandler(404)
  def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

  ## INIT DATABASE
  from . import db
  db.init_app(app)

  ## REGISTER BLUEPRINTS
  url_version = '/api/v1.0'
  from . import auth
  from .categories import categories
  app.register_blueprint(auth.bp, url_prefix=f'{url_version}/auth')
  app.register_blueprint(categories, url_prefix=f'{url_version}/categories')

  return app