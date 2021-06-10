from flask import Blueprint, jsonify, request, abort, redirect, url_for
from datetime import datetime as dt
from werkzeug.security import check_password_hash, generate_password_hash

from YG_server.models import db, User, Category
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
  # username = request.get_json()['username']

  user_found = User.query.get(fl_current_user.id)
  if user_found is None:
    abort(404, description="User not found")

  channels = user_found.channels
  if channels is None:
    abort(404, description="User channels could not be loaded")

  return jsonify({
    "channels": str(channels),
  })

@bp.route('/users/current_user/categories', methods=['GET'])
@login_required
def get_user_categories():
  # username = request.get_json()['username']

  user_found = User.query.get(fl_current_user.id)
  if user_found is None:
    abort(404, description="User not found")

  categories = user_found.categories
  if categories is None:
    abort(404, description="User categories could not be loaded")

  return jsonify({
    "categories": str(categories),
  })

@bp.route('/users/current_user/categories/<int:category_id>', methods=['GET'])
@login_required
def get_user_category(category_id):
  user_found = User.query.get(fl_current_user.id)
  if user_found is None:
    abort(404, description="User not found")

  # TODO consider using user_found.categories

  category = Category.query.get(category_id)
  if category is None:
    abort(404, description=f"Category does not exist")

  # check if user owns category
  if category.user_id != int(user_found.id):
    abort(404, description=f"User does not own provided category")

  return jsonify({
    "category": str(category),
  })
