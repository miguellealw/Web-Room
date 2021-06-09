from flask import Blueprint, jsonify, request, abort, redirect, url_for
from datetime import datetime as dt
from werkzeug.security import check_password_hash, generate_password_hash

from YG_server.models import db, User, Category
from YG_server.api import bp

# users_bp = Blueprint('User', __name__, url_prefix='/users')

@bp.route('/users', methods=['GET'])
def get_user():
  user_id = request.args.get('id')
  user_found = User.query.get(user_id)

  if user_found is None:
    abort(404)

  return jsonify({"username": user_found.username})

@bp.route('/users/current_user', methods=['GET'])
def current_user():
  # TODO: get jwt token and find user
  id = request.get_json()['user_id']
  user_found = User.query.get(id)

  if user_found is None:
    abort(404, description="User not found")

  # channels = user_found.channels
  # if channels is None:
  #   abort(404, description="User has no channels")

  # categories = user_found.categories
  # if categories is None:
  #   abort(404, description="User has no categories")

  # TODO: get channels of current user
  return jsonify({
    "username": user_found.username, 
  })

@bp.route('/current_user/channels', methods=['GET'])
def get_user_channels():
  id = request.get_json()['user_id']
  user_found = User.query.get(id)

  if user_found is None:
    abort(404, description="User not found")

  channels = user_found.channels
  if channels is None:
    abort(404, description="User has no channels")

  return jsonify({
    "channels": str(channels),
  })

@bp.route('/users/current_user/categories', methods=['GET'])
def get_user_categories():
  id = request.get_json()['user_id']
  user_found = User.query.get(id)

  if user_found is None:
    abort(404, description="User not found")

  categories = user_found.categories
  if categories is None:
    abort(404, description="User has no categories")

  return jsonify({
    "categories": str(categories),
  })

@bp.route('/users/current_user/categories/<int:category_id>', methods=['GET'])
def get_user_category(category_id):
  user_id = request.get_json()['user_id']
  category = Category.query.get(category_id)

  if category is None:
    abort(404, description=f"Category does not exist")

  # check if user owns category
  if category.user_id != int(user_id):
    abort(404, description=f"User does not own category with id={category_id}")

  return jsonify({
    "category": str(category),
  })
