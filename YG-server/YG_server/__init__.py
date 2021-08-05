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
  print("404 ERROR HANDLER", e)
  return jsonify(error=str(e)), 404

def resource_conflict(e):
  return jsonify(error=str(e)), 409

def resource_forbidden(e):
  return jsonify(error=str(e)), 403

def default_handler(e):
  print("DEFAULT ERROR HANDLER", e)
  if isinstance(e, HTTPException):
    return jsonify(error=str(e)), 404


  return jsonify({"error": f"Non-HTTP Error: {e}"}), 500

# Error handler

# For Auth0
class AuthError(Exception):
  def __init__(self, error, status_code):
    self.error = error
    self.status_code = status_code

# config_name will be development, production, testing
def create_app(config_type=None):
  ## CREATE APP AND LOAD CONFIG
  app = Flask(__name__, instance_relative_config=True)

  if config_type is None:
    app.config.from_object('config.DevConfig')
  elif config_type == 'prod':
    app.config.from_object('config.ProdConfig')
  elif config_type == 'testing':
    app.config.from_object('config.TestingConfig')
  else:
    print("Configuration type not valid. Pass a valid config type to create_app in wsgi.py")
    return app

  try:
    os.makedirs(app.instance_path)
  except OSError:
    pass

  ## REGISTER PLUGINS - make globally accessible to other parts of app
  db.init_app(app)
  login_manager.init_app(app)
  cors.init_app(app, supports_credentials=True)
  ma.init_app(app)
  migrate.init_app(app, db)

  # Environment variables that will be used in other parts of the app
  app.AUTH0_DOMAIN = app.config["AUTH0_DOMAIN"]
  app.ALGORITHMS = app.config["ALGORITHMS"]
  app.API_AUDIENCE = app.config["API_AUDIENCE"]
  app.CLIENT_SECRET_FILENAME = app.config["CLIENT_SECRET_FILENAME"]
  app.FRONTEND_SERVER = app.config["FRONTEND_SERVER"]

  ## SETUP ERROR HANDLERS
  app.register_error_handler(404, resource_not_found)
  app.register_error_handler(409, resource_conflict)
  app.register_error_handler(403, resource_forbidden)
  app.register_error_handler(Exception, default_handler)

  # For Auth0
  @app.errorhandler(AuthError)
  def handle_auth_error(ex):
      response = jsonify(ex.error)
      response.status_code = ex.status_code
      return response

  ## REGISTER BLUEPRINTS
  with app.app_context():
    from YG_server.auth import bp as auth_bp
    from YG_server.api import bp as api_bp

    API_VERSION = app.config["API_VERSION"]
    app.register_blueprint(api_bp, url_prefix=f'/api/{API_VERSION}')
    app.register_blueprint(auth_bp, url_prefix=f'/auth/{API_VERSION}')

  return app