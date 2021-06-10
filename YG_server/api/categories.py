from flask import Blueprint, jsonify, request, abort
from datetime import datetime as dt
from flask.helpers import url_for
from YG_server.models import db, Category, User
from YG_server.api import bp

from flask_login import login_required, current_user as fl_current_user

from YG_server.schemas import category_schema, categories_schema

@bp.route('/categories', methods=['GET', 'POST'])
@login_required
def get_categories():
  categories = Category.query.all()
  if categories is None:
    abort(404, description="No categories available")

  return jsonify(categories_schema.dump(categories)), 200


@bp.route('/categories/<int:category_id>', methods=['GET', 'DELETE', 'PUT'])
@login_required
def get_category(category_id):

  # TODO: only get category if user owns it
  found_category = Category.query.get(category_id)
  if found_category is None:
    abort(404, description="Category does not exist")

  # instead of returning category id return URI
  return jsonify(category_schema.dump(found_category))

