from os import environ
import os
from flask import Flask, make_response, jsonify
from werkzeug.exceptions import HTTPException
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

import flask_cors

from YG_server.models import db
# from ..config import app_config

login_manager = LoginManager()
cors = flask_cors.CORS()
ma = Marshmallow()
migrate = Migrate()

def resource_not_found(e):
  return jsonify(error=str(e)), 404

def resource_conflict(e):
  return jsonify(error=str(e)), 409

def resource_forbidden(e):
  return jsonify(error=str(e)), 403

def default_handler(e):
  if isinstance(e, HTTPException):
    return jsonify(error=str(e)), 404

  return jsonify({"error": f"Non-HTTP Error: {e}"}), 500

# config_name will be development, production, testing
def create_app(is_test_config=None):
  ## CREATE APP AND LOAD CONFIG
  app = Flask(__name__, instance_relative_config=True)


  # app.config.from_object('config.DevConfig')
  # app.config.from_object('config.ProdConfig')
  # app.config.from_object('config.TestingConfig')

  if is_test_config is None:
    app.config.from_object('config.DevConfig')
  else:
    # load test config if passed in
    app.config.from_object('config.TestingConfig')

  try:
    os.makedirs(app.instance_path)
  except OSError:
    pass

  ## REGISTER PLUGINS - make globally accessible to other parts of app
  db.init_app(app)
  login_manager.init_app(app)
  cors.init_app(app)
  ma.init_app(app)
  migrate.init_app(app, db)


  ## SETUP ERROR HANDLERS
  app.register_error_handler(404, resource_not_found)
  app.register_error_handler(409, resource_conflict)
  app.register_error_handler(403, resource_forbidden)
  app.register_error_handler(Exception, default_handler)


  ## REGISTER BLUEPRINTS
  with app.app_context():
    from YG_server.auth import bp as auth_bp
    from YG_server.api import bp as api_bp

    API_VERSION = environ.get("API_VERSION")
    app.register_blueprint(api_bp, url_prefix=f'/api/{API_VERSION}')
    app.register_blueprint(auth_bp, url_prefix=f'/auth/{API_VERSION}')

  return app