
from flask import Blueprint, jsonify, request, abort, redirect, url_for
from datetime import datetime as dt
from werkzeug.security import check_password_hash, generate_password_hash

from YG_server.users.models import db, User

users_bp = Blueprint('User', __name__)

@users_bp.route('/register', methods=['POST'])
def register():
  if request.method == 'POST':
    user = request.get_json()
    username = user['username']
    password = user['password']
    error = None

    # Check if user or password were note provided.
    # Otherwise check if user already exists in db
    if not username:
      error = 'Username is required.'
    elif not password:
      error = 'Password is required.'
    elif User.query.filter(User.username == username).first() is not None:
      error = f'User \'{username}\' is already registered.'

    # Return if error is found
    if error is not None:
      abort(409, description=error)

    # if not error add user to db
    new_user = User(
      username = username,
      password = generate_password_hash(password),
      created = dt.now()
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"New User": new_user.username})


@users_bp.route('/login', methods=['GET'])
def login():
  pass


@users_bp.route('', methods=['GET'])
def get_user():
  user_id = request.args.get('id')
  user_found = User.query.filter(User.id == user_id).first()

  if user_found is None:
    abort(404)

  return jsonify({"username": user_found.username})


@users_bp.route('/current_user', methods=['GET'])
def current_user():
  user_found = User.query.filter(User.username == 'test_username').first()
  if user_found is None:
    abort(404)
  return jsonify({"username": user_found.username})