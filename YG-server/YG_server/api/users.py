from YG_server.decorators import requires_auth, yt_auth_required
from YG_server.auth.oauth import get_channel, get_channel_videos, get_subscriptions
from flask import jsonify, request, abort, session
from datetime import datetime as dt
from marshmallow.exceptions import ValidationError
from flask_cors import cross_origin

from YG_server.models import db, User, Category, Channel
from YG_server.schemas import (
  CategorySchema,
  ChannelSchema,
  category_schema, 
  categories_schema, 
  channels_schema, 
  channel_schema
)

from YG_server.api import bp
from flask_login import login_required, current_user as fl_current_user

@bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
  # user_id = request.args.get('id')
  user_found = User.query.get(user_id)

  if user_found is None:
    abort(404, description='User does not exist')

  return jsonify({"username": user_found.username})

@bp.route('/users/current_user', methods=['GET'])
# Auth0
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def current_user():
  return jsonify({
    "message": "THIS IS A PRIVATE ROUTE OF AUTH0"
  })
  # return jsonify({
  #   "username": fl_current_user.username, 
  #   "isLoggedIn": True
  # })

# This will return the users subscriptions
@bp.route('/users/current_user/yt-channels', methods=['GET'])
@yt_auth_required
# @cross_origin(headers=["Content-Type", "Authorization"])
# @requires_auth
# def get_user_yt_channels(yt_client, auth_id):
def get_user_yt_channels(yt_client):
  nextPageToken = request.args.get('nextPageToken')
  channels = get_subscriptions(yt_client, 
    part='snippet', 
    mine=True, 
    pageToken=nextPageToken,
    # order='alphabetical', 
    maxResults=40
  )

  return jsonify( channels )

# This will return the channels that a user has in categories
@bp.route('/users/current_user/channels', methods=['GET'])
# @login_required
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
@yt_auth_required
def get_user_channels(auth_id, yt_client):
  # user_found = User.query.get_or_404(fl_current_user.id, description="User not found")
  user_found = User.query.filter_by(auth_id=auth_id).first_or_404(description="User not found")
  channels = user_found.channels
  if channels is None:
    abort(404, description="User channels could not be loaded")

  # Get id's of channels and pass to get_channel as dict
  # channel_ids = [channel.yt_channel_id for channel in channels]

  # Get channel data from youtube
  # yt_channels = get_channel(yt_client, 
  #   part='snippet,contentDetails', 
  #   id=channel_ids
  # )

  # USE THIS INSTEAD OF CODE BELOW
  # if len(found_category.channels) != 0:
  #   found_category.add_yt_data(yt_client, get_channel)

  # Apply YouTube channel data to response
  # res = []
  # for channel in channels_schema.dump(user_found.channels):
  #   # Add YouTube data to each channel
  #   channel["yt_data"] = next(filter(lambda yt_channel: yt_channel["id"] == channel["yt_channel_id"], yt_channels["items"]), None)
  #   res.append(channel)

  # TODO: return object w/ data from yt_channels like nextPage toke and pageInfo
  # return jsonify( res )
  return jsonify( channels_schema.dump(user_found.channels) )

@bp.route('/users/current_user/categories/<int:category_id>/add_channel', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def add_channel_to_category(auth_id, category_id):
  valid_data = None
  try:
    valid_data = ChannelSchema().load({
      "name": request.get_json()["name"],
      "yt_channel_id": request.get_json()["yt_channel_id"]
    })
  except ValidationError as err:
    return jsonify(err.messages), 403

  if request.method == 'POST':
    # Find category
    category_found = Category.query.get_or_404(category_id, description="Channel could not be created because category does not exist")

    # check if channel is already in DB, if it is skip creation; fetch channel and relate to category
    channel_to_add = Channel.query.filter_by(yt_channel_id = valid_data["yt_channel_id"]).first()

    # check if channel is already in specified category. if it is, return error code
    if channel_to_add is not None:
      if category_found in channel_to_add.categories:
        abort(409, description="Channel already exists in category")

    # if channel is not in db, create it 
    if channel_to_add is None:
      channel_to_add = Channel(
        name = valid_data["name"],
        yt_channel_id = valid_data["yt_channel_id"],
      )
      if channel_to_add is None:
        abort(409, description="Channel could not be created")

    # Relate category with new channel
    category_found.channels.append(channel_to_add)

    # relate channel to user
    # user_found = User.query.get_or_404(fl_current_user.id, description="Channel could not be created because user does not Exist")
    user_found = User.query.filter_by(auth_id=auth_id).first_or_404(description="User not found")
    user_found.channels.append(channel_to_add)

    db.session.add(channel_to_add)
    db.session.commit()

    return jsonify( channel_schema.dump(channel_to_add) )


# TODO: make endpiont a delete method
# TODO: .../remove_channel/<yt_channel_id>
@bp.route('/users/current_user/categories/<int:category_id>/remove_channel', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def remove_channel_from_category(auth_id, category_id):
  valid_data = None
  try:
    valid_data = ChannelSchema().load({
      "name": request.get_json()["name"],
      "yt_channel_id": request.get_json()["yt_channel_id"]
    })
  except ValidationError as err:
    return jsonify(err.messages), 403

  # Find category
  category_found = Category.query.get_or_404(category_id, description="Channel could not be created because category does not exist")
  channel_to_remove = Channel.query.filter_by(yt_channel_id = valid_data["yt_channel_id"]).first()

  if channel_to_remove is None:
    abort(409, description="Channels was not deleted because it does not exist.")

  # Remove channel relationship with cateogry
  category_found.channels.remove(channel_to_remove)

  # relate channel to user
  # user_found = User.query.get_or_404(fl_current_user.id, description="Channel could not be created because user does not Exist")
  # user_found.channels.append(channel_to_add)

  # TODO: only delete channel if no other category references it
  # TODO: CHECK THE user_channel table if the channel ID is not there, then delete from DB
  # db.session.delete(channel_to_remove)

  db.session.commit()

  return jsonify( channel_schema.dump(channel_to_remove) )


@bp.route('/users/current_user/channels/<string:yt_channel_id>', methods=['GET'])
# @login_required
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
# def get_user_channel(yt_channel_id):
def get_user_channel(auth_id, yt_channel_id):
  # user_found = User.query.get_or_404(fl_current_user.id, description="User not found")
  user_found = User.query.filter_by(auth_id=auth_id).first_or_404(description="User not found")

  # get channel specified
  channel_found = next(filter(lambda ch: ch.yt_channel_id == yt_channel_id, user_found.channels), None)
  if channel_found is None:
    abort(404, description="User does not own channel")

  return jsonify( channel_schema.dump(channel_found) )

@bp.route('/users/current_user/categories', methods=['GET', 'POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
# @login_required
def get_user_categories(auth_id):
  user_found = User.query.filter_by(auth_id=auth_id).first_or_404(description="User not found")
  categories = user_found.categories

  if categories is None:
    abort(404, description="User categories could not be loaded")

  if request.method == 'POST':
    name = request.get_json()['name'].strip()

    valid_data = None
    try:
      valid_data = CategorySchema().load({
        "name": name
      })
    except ValidationError as err:
      return jsonify(err.messages)
      
    new_category = Category(
      name=valid_data["name"],
      user_id=user_found.id,
      created_at=dt.now(),
    )
    # TODO: add empty uploads array when creating category

    if new_category is None:
      abort(409, description="Category could not be created")

    db.session.add(new_category)
    db.session.commit()

    return jsonify( category_schema.dump(new_category) ), 201

  # ==== GET ====
  # TODO: pass ?channels=true when fetching categories to return channels. for now it returning channels by default

  return jsonify(categories_schema.dump(categories))

@bp.route('/users/current_user/categories/<int:category_id>', methods=['GET', 'PUT', 'DELETE'])
@yt_auth_required
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def get_user_category(auth_id, yt_client, category_id):
  user_found = User.query.filter_by(auth_id=auth_id).first_or_404(description="User not found")
  # TODO consider using user_found.categories
  found_category = Category.query.get_or_404(category_id, description="Category does not exist")

  # check if user owns category
  if found_category.user_id != int(user_found.id):
    abort(404, description=f"User does not own provided category")

  # PUT
  if request.method == 'PUT':
    new_name = request.get_json()['name']
    valid_data = None
    try:
      valid_data = CategorySchema().load({
        "name": new_name
      })
    except ValidationError as err:
      return jsonify(err.messages)

    found_category.name = valid_data["name"]
    # TODO: consider adding onupdate=db.func.current_timestamp() to category updated_at column in model
    found_category.updated_at = dt.now()

    db.session.commit()
    return jsonify(category_schema.dump(found_category))

  # DELETE
  if request.method == 'DELETE':
    db.session.delete(found_category)
    db.session.commit()
    return jsonify({'flash': f'Category \'{found_category.name}\' was deleted'})

  # GET

  # Add YouTube data of channels and videos
  if len(found_category.channels) != 0:
    found_category.add_yt_data(yt_client, get_channel)
    found_category.add_channel_videos(yt_client, get_channel_videos)


  return jsonify( category_schema.dump(found_category) )
