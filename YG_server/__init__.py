from flask import Flask, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import HTTPException
from .error_handlers import resource_not_found, resource_could_not_be_created

db = SQLAlchemy()

# TODO: setup postgresql

def create_app(test_config=None):
  # __name__ is the name of the current python module
  # info on flask object - https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask

  ## CREATE APP AND LOAD CONFIG
  app = Flask(__name__, instance_relative_config=True)
  app.config.from_object('config.DevConfig')
  # app.config.from_object('config.ProdConfig')

  ## SETUP ERROR HANDLERS
  app.register_error_handler(404, resource_not_found)
  app.register_error_handler(409, resource_could_not_be_created)

  ## REGISTER PLUGINS - make globally accessible to other parts of app
  # register db
  db.init_app(app)

  ## REGISTER BLUEPRINTS
  with app.app_context():
    from . import auth
    # from .channels import routes as channels
    from .users import routes as users
    from .categories import routes as categories

    url_version = '/api/v1.0'
    # app.register_blueprint(auth.bp, url_prefix=f'{url_version}/auth')
    app.register_blueprint(categories.categories_bp, url_prefix=f'{url_version}/categories')
    # app.register_blueprint(categories.channels_bp, url_prefix=f'{url_version}/channels')
    app.register_blueprint(users.users_bp, url_prefix=f'{url_version}/users')

  return app