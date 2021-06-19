from YG_server.auth.oauth import CLIENT_SECRETS_FILE, SCOPES
from flask import jsonify, request, abort, url_for, session, redirect
from datetime import datetime
from flask_login import login_required, logout_user, current_user, login_user
from YG_server.auth import bp
from YG_server.models import db, User
from YG_server import login_manager
from YG_server.schemas import UserSchema, user_schema
from marshmallow import ValidationError

import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery

from os import environ, path
from dotenv import load_dotenv

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
    abort(403, description  = err.messages)
    # return jsonify(err.messages)

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


@bp.route('/login', methods=['GET', 'POST'])
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
    return jsonify(err.messages), 403

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

### YOUTUBE API / GOOGLE OAUTH

@bp.route('/authorize')
def authorize():
  # Create a flow instance to manage the OAuth 2.0 Authorization Grant Flow
  # steps.
  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES)
  flow.redirect_uri = url_for('auth.oauth2callback', _external=True)
  authorization_url, state = flow.authorization_url(
      # This parameter enables offline access which gives your application
      # both an access and refresh token.
      access_type='offline',
      # This parameter enables incremental auth.
      include_granted_scopes='true')


  # Store the state in the session so that the callback can verify that
  # the authorization server response.
  session['state'] = state

  return redirect(authorization_url)


@bp.route('/oauth2callback')
def oauth2callback():
  # Specify the state when creating the flow in the callback so that it can
  # verify the authorization server response.
  state = session['state']
  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
  flow.redirect_uri = url_for('auth.oauth2callback', _external=True)

  # Use the authorization server's response to fetch the OAuth 2.0 tokens.
  authorization_response = request.url
  flow.fetch_token(authorization_response=authorization_response)

  # Store the credentials in the session.
  # ACTION ITEM for developers:
  #     Store user's access and refresh tokens in your data store if
  #     incorporating this code into your real app.
  credentials = flow.credentials
  session['credentials'] = {
      'token': credentials.token,
      'refresh_token': credentials.refresh_token,
      'token_uri': credentials.token_uri,
      'client_id': credentials.client_id,
      'client_secret': credentials.client_secret,
      'scopes': credentials.scopes
  }

  # TODO: change to client route
  return redirect(url_for('api.get_user_yt_channels'))
