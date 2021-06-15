from os import environ, path
from dotenv import load_dotenv

baseddir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(baseddir, '.env'))


# BASE CONFIG
class Config:
  SECRET_KEY = environ.get('SECRET_KEY')
  FLASK_APP = environ.get('FLASK_APP')
  FLASK_ENV = environ.get('FLASK_ENV')
  SESSION_COOKIE_NAME = environ.get('SESSION_COOKIE_NAME')
  STATIC_FOLDER = 'static'

  # [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
  SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")
  SQLALCHEMY_ECHO = False
  # disable warning of system resources
  SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProdConfig(Config):
  FLASK_ENV = 'production'
  DEBUG = False
  TESTING = False
  DATABASE_URI = environ.get('PROD_DATABASE_URI')


class DevConfig(Config):
  FLASK_ENV = 'development'
  DEBUG = True
  TESTING = True
  DATABASE_URI = environ.get('DEV_DATABASE_URI')


class TestingConfig(Config):
  FLASK_ENV = 'testing'
  # DEBUG = True
  TESTING = True
  # DATABASE_URI = environ.get("TEST_DATABASE_URI")
  SQLALCHEMY_DATABASE_URI = environ.get("TEST_DATABASE_URI")
