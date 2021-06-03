# TODO: switch to postgreSQL

import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

# g - is a special object that is unique for each request.

def get_db():
  if 'db' not in g:
    # connect method will establish connection to DATABASE config key from __init__
    g.db = sqlite3.connect(
      # current_ap=p - speical object that points to flask application handling the req
      current_app.config['DATABASE'],
      detect_types=sqlite3.PARSE_DECLTYPES
    )
    # Return DB row like dicts
    g.db.row_factory = sqlite3.Row

  return g.db


def init_db():
  # returns db connection
  db = get_db()

  with current_app.open_resource('schema.sql') as f:
    db.executescript(f.read().decode('utf8'))


# click.command('init-db) - defines cli command 'init-db' that call the init_db function
@click.command('init-db')
@with_appcontext
def init_db_command():
  """Clear the existing data and create new tables."""
  init_db()
  click.echo('Initialized the database.')

def close_db(e=None):
  db = g.pop('db', None)

  if db is not None:
    db.close()


def init_app(app): 
  # call function when cleaning up after returning the response
  app.teardown_appcontext(close_db)
  # adds a new command that can be called with the flask command
  app.cli.add_command(init_db_command)