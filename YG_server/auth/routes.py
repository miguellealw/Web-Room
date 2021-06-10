import os
import sys
from flask import jsonify, request, abort
from datetime import datetime
from flask.helpers import url_for
from flask_login import login_required, logout_user, current_user, login_user

from YG_server.auth import bp
from YG_server.models import db, User

from YG_server import login_manager

@login_manager.user_loader
def load_user(user_id):
  return User.query.get(user_id)

@bp.route('/register', methods=['POST'])
def register():
  if current_user.is_authenticated:
    return jsonify({"username": current_user.username})

  ## FORM
  username = request.form['username']
  password = request.form['password']
  password2 = request.form['confirm_password']
  email = request.form['email']

  # TODO: validate user input

  error = None
  # Check if user or password were not provided.
  # Otherwise check if user already exists in db
  if not username or not password or not email:
    error = 'Username, email, and password are required.'
  elif password != password2:
    error = 'Passwords do not match'
  elif User.query.filter(User.username == username).first() is not None:
    error = f'Username is already registered.'
  elif User.query.filter(User.email == email).first() is not None:
    error = f'Email is already registered.'

  # Return if error is found
  if error is not None:
    abort(409, description=error)

  new_user = User(
    username = username,
    created = datetime.now(),
    email = email,
  )
  new_user.set_password(password)

  db.session.add(new_user)
  db.session.commit()

  login_user(new_user)

  return jsonify({"username": new_user.username}), \
    201, \
    {'Location': url_for('api.get_user', user_id = new_user.id, _external = True)}


@bp.route('/login', methods=['GET'])
def login():
  if current_user.is_authenticated:
    return jsonify({"username": current_user.username, "flash": "User already logged in"})

  username = request.form['username']
  password = request.form['password']

  # TODO: validate user input

  user = User.query.filter_by(username = username).first()
  if user is None or not user.verify_password(password):
    abort(403, description="Login values are incorrect")

  #TODO: consider using 'next' to send user to page they were initially trying to visit
  login_user(user)

  return jsonify({"username": f"{user.username}"})

@bp.route('/logout')
@login_required
def logout():
  logout_user()
  return jsonify({"flash": "User logged out"})