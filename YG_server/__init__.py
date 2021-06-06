from flask import Flask, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# TODO: setup postgresql

def create_app(test_config=None):
  # __name__ is the name of the current python module
  # info on flask object - https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask

  ## CREATE APP AND LOAD CONFIG
  app = Flask(__name__, instance_relative_config=True)
  app.config.from_object('config.DevConfig')
  # app.config.from_object('config.ProdConfig')

  ## SETUP DEFAULT ERROR ROUTE HANDLER
  @app.errorhandler(404)
  def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

  ## REGISTER PLUGINS - make globally accessible to other parts of app
  # register db
  db.init_app(app)

  ## REGISTER BLUEPRINTS
  with app.app_context():
    from . import auth
    # from .channels import routes as channels
    # from .users import routes as users
    from .categories import routes as categories

    url_version = '/api/v1.0'
    # app.register_blueprint(auth.bp, url_prefix=f'{url_version}/auth')
    app.register_blueprint(categories.categories_bp, url_prefix=f'{url_version}/categories')

  return app