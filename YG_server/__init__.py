from os import environ
from flask import Flask, make_response, jsonify
from werkzeug.exceptions import HTTPException
from flask_login import LoginManager
from flask_httpauth import HTTPBasicAuth
from flask_marshmallow import Marshmallow

import flask_cors

from YG_server.models import User, db

login_manager = LoginManager()
cors = flask_cors.CORS()
ma = Marshmallow()

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

def create_app():
  ## CREATE APP AND LOAD CONFIG
  app = Flask(__name__, instance_relative_config=True)
  app.config.from_object('config.DevConfig')
  # app.config.from_object('config.ProdConfig')

  ## SETUP ERROR HANDLERS
  app.register_error_handler(404, resource_not_found)
  app.register_error_handler(409, resource_conflict)
  app.register_error_handler(403, resource_forbidden)
  app.register_error_handler(Exception, default_handler)

  ## REGISTER PLUGINS - make globally accessible to other parts of app
  db.init_app(app) # register db
  login_manager.init_app(app) # register login_manager
  cors.init_app(app)
  ma.init_app(app)

  ## REGISTER BLUEPRINTS
  with app.app_context():
    from YG_server.auth import bp as auth_bp
    from YG_server.api import bp as api_bp

    API_VERSION = environ.get("API_VERSION")
    app.register_blueprint(api_bp, url_prefix=f'/api/{API_VERSION}')
    app.register_blueprint(auth_bp, url_prefix=f'/auth/{API_VERSION}')

  return app