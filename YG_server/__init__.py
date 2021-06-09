from os import environ
from flask import Flask, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import HTTPException
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def resource_not_found(e):
  return jsonify(error=str(e)), 404

def resource_conflict(e):
  return jsonify(error=str(e)), 409

def default_handler(e):
  if isinstance(e, HTTPException):
    return jsonify(error=str(e)), 404

  return jsonify({"error": "Non-HTTP Error"}), 500

def create_app():
  ## CREATE APP AND LOAD CONFIG
  app = Flask(__name__, instance_relative_config=True)
  app.config.from_object('config.DevConfig')
  # app.config.from_object('config.ProdConfig')

  ## SETUP ERROR HANDLERS
  app.register_error_handler(404, resource_not_found)
  app.register_error_handler(409, resource_conflict)
  app.register_error_handler(Exception, default_handler)

  ## REGISTER PLUGINS - make globally accessible to other parts of app
  db.init_app(app) # register db
  login_manager.init_app(app) # register login_manager

  ## REGISTER BLUEPRINTS
  with app.app_context():
    from YG_server.auth import bp as auth_bp
    from YG_server.api import bp as api_bp

    API_VERSION = environ.get("API_VERSION")
    app.register_blueprint(api_bp, url_prefix=f'/api/{API_VERSION}')
    app.register_blueprint(auth_bp, url_prefix=f'/{API_VERSION}/auth')

  return app