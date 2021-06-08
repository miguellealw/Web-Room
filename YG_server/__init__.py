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
    from .auth import routes as auth
    from .channels import routes as channels
    from .users import routes as users
    from .categories import routes as categories

    url_version = '/api/v1.0'
    app.register_blueprint(categories.categories_bp, url_prefix=f'{url_version}/categories')
    app.register_blueprint(channels.channels_bp, url_prefix=f'{url_version}/channels')
    app.register_blueprint(users.users_bp, url_prefix=f'{url_version}/users')
    app.register_blueprint(auth.bp, url_prefix=f'{url_version}/auth')

  return app