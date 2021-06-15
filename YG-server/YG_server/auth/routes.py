from flask import jsonify, request, abort
from datetime import datetime
from flask_login import login_required, logout_user, current_user, login_user
from YG_server.auth import bp
from YG_server.models import db, User
from YG_server import login_manager
from YG_server.schemas import UserSchema, user_schema
from marshmallow import ValidationError

@login_manager.user_loader
def load_user(user_id):
  return User.query.get(user_id)

@bp.route('/register', methods=['POST'])
def register():
  if current_user.is_authenticated:
    return jsonify({"username": current_user.username})

  error = None
  ## FORM
  username = request.get_json()['username']
  password = request.get_json()['password']
  password2 = request.get_json()['confirm_password']
  email = request.get_json()['email']

  valid_data = None
  try:
    valid_data = UserSchema().load({
      "username": username,
      "email": email,
      "hashed_password": password
    })
  except ValidationError as err:
    return jsonify(err.messages)

  if password != password2:
    error = 'Passwords do not match'

  # Check if user already exists in db
  if User.query.filter(User.username == valid_data["username"]).first() is not None:
    error = f'Username is already registered.'
  elif User.query.filter(User.email == valid_data["email"]).first() is not None:
    error = f'Email is already registered.'

  # Return if error is found
  if error is not None:
    abort(409, description=error)

  new_user = User(
    username = valid_data["username"],
    created_at = datetime.now(),
    email = valid_data["email"],
  )
  new_user.set_password(valid_data["hashed_password"])

  db.session.add(new_user)
  db.session.commit()

  login_user(new_user)

  # return jsonify({"username": new_user.username, "flash": f"User {new_user.username} is now registered"}), \
  #   201, \
  #   {'Location': url_for('api.get_user', user_id = new_user.id, _external = True)}

  return jsonify( user_schema.dump(new_user) ), 201


@bp.route('/login', methods=['GET'])
def login():
  if current_user.is_authenticated:
    return jsonify({"username": current_user.username, "flash": "User already logged in"})

  username = request.get_json()['username']
  password = request.get_json()['password']

  valid_data = None
  try:
    valid_data = UserSchema(partial=("email",)).load({
      "username": username,
      "hashed_password": password
    })
  except ValidationError as err:
    return jsonify(err.messages)

  user = User.query.filter_by(username = valid_data["username"]).first()
  if user is None or not user.verify_password(valid_data["hashed_password"]):
    abort(403, description="Login values are incorrect")

  #TODO: consider using 'next' to send user to page they were initially trying to visit
  login_user(user)

  return jsonify({"username": f"{user.username}", "flash": "User logged in"})

@bp.route('/logout')
@login_required
def logout():
  logout_user()
  return jsonify({"flash": "User logged out"})