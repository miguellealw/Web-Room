from flask import Blueprint, jsonify, request, abort, redirect, url_for
from datetime import datetime as dt
from marshmallow.exceptions import ValidationError
from werkzeug.security import check_password_hash, generate_password_hash

from YG_server.models import db, User, Category, Channel
from YG_server.schemas import (
  CategorySchema,
  category_schema, 
  categories_schema, 
  channels_schema, 
  channel_schema
)

from YG_server.api import bp
from YG_server.auth.routes import load_user

from flask_login import login_required, current_user as fl_current_user

@bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
  # user_id = request.args.get('id')
  user_found = User.query.get(user_id)

  if user_found is None:
    abort(404, description='User does not exist')

  return jsonify({"username": user_found.username})

@bp.route('/users/current_user', methods=['GET'])
@login_required
def current_user():
  return jsonify({
    "username": fl_current_user.username, 
  })

@bp.route('/users/current_user/channels', methods=['GET'])
@login_required
def get_user_channels():
  user_found = User.query.get_or_404(fl_current_user.id, description="User not found")
  channels = user_found.channels
  if channels is None:
    abort(404, description="User channels could not be loaded")

  return jsonify( channels_schema.dump(user_found.channels) )

@bp.route('/users/current_user/categories/<int:category_id>/add_channel', methods=['POST'])
@login_required
def add_channel_to_category(category_id):
  req_data = request.get_json()
  name = req_data["name"]
  yt_channel_id = req_data["yt_channel_id"]

  if name is None or yt_channel_id is None:
    abort(400, description="Name or yt_channel_id not passed in body")

  if request.method == 'POST':
    # Find category
    category_found = Category.query.get_or_404(category_id, description="Channel could not be created because category does not exist")

    # check if channel is already in DB, if it is skip creation; fetch channel and relate to category
    channel_to_add = Channel.query.filter_by(yt_channel_id = yt_channel_id).first()

    # if channel is not in db create it 
    if channel_to_add is None:
      channel_to_add = Channel(
        name=name,
        yt_channel_id=yt_channel_id,
      )
      if channel_to_add is None:
        abort(409, description="Channel could not be created")

    # Relate category with new channel
    category_found.channels.append(channel_to_add)

    # relate channel to user
    user_found = User.query.get_or_404(fl_current_user.id, description="Channel could not be created because user does not Exist")
    user_found.channels.append(channel_to_add)

    db.session.add(channel_to_add)
    db.session.commit()

    return jsonify( channel_schema.dump(channel_to_add))

@bp.route('/users/current_user/channels/<int:channel_id>', methods=['GET'])
@login_required
def get_user_channel(channel_id):
  user_found = User.query.get_or_404(fl_current_user.id, description="User not found")

  # get channel specified
  channel_found = next(filter(lambda ch: ch.id == channel_id, user_found.channels), None)
  if channel_found is None:
    abort(404, description="User does not own channel")

  return jsonify( channel_schema.dump(channel_found) )




@bp.route('/users/current_user/categories', methods=['GET', 'POST'])
@login_required
def get_user_categories():
  user_found = User.query.get_or_404(fl_current_user.id, description="User not found")
  categories = user_found.categories

  if categories is None:
    abort(404, description="User categories could not be loaded")

  if request.method == 'POST':
    name = request.get_json()['name']

    valid_data = None
    try:
      valid_data = CategorySchema().load({
        "name": name
      })
    except ValidationError as err:
      return jsonify(err.messages)
      
    new_category = Category(
      name=valid_data["name"],
      user_id=fl_current_user.id,
      created=dt.now()
    )

    if new_category is None:
      abort(409, description="Category could not be created")

    db.session.add(new_category)
    db.session.commit()

    return jsonify( category_schema.dump(new_category) )

  # ==== GET ====
  return jsonify(categories_schema.dump(categories))

@bp.route('/users/current_user/categories/<int:category_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def get_user_category(category_id):
  user_found = User.query.get_or_404(fl_current_user.id, description="User not found")
  found_category = Category.query.get_or_404(category_id, description="Category does not exist")

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
    db.session.commit()
    return jsonify(category_schema.dump(found_category))

  if request.method == 'DELETE':
    db.session.delete(found_category)
    db.session.commit()
    return jsonify({'flash': f'Category \'{found_category.name}\' was deleted'})

  # TODO consider using user_found.categories
  category = Category.query.get(category_id)
  if category is None:
    abort(404, description=f"Category does not exist")

  # check if user owns category
  if category.user_id != int(user_found.id):
    abort(404, description=f"User does not own provided category")

  return jsonify( category_schema.dump(found_category) )


# /users/<id>/categories - get categories channel belongs to
# @bp.route('/channels/<int:channel_id>/categories', methods=['GET', 'POST'])
# def get_categories_of_channel(channel_id):
#   pass