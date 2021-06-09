from flask import jsonify, request, abort
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash

from YG_server.auth import bp
from YG_server.models import db, User


@bp.route('/register', methods=['POST'])
def register():
  # TODO: verify password 
  if request.method == 'POST':
    user = request.get_json()
    username = user['username']
    password = user['password']
    error = None

    # Check if user or password were not provided.
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
      created = datetime.now()
    )
    # new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"New User": new_user.username})


@bp.route('/login', methods=['GET'])
def login():
  # TODO: use flask-login, flask-praetorian, or Auth0
  return jsonify(message="LOGIN NOT IMPLMENTED")
