from flask import Blueprint, jsonify, request, abort
from datetime import datetime as dt
from flask.helpers import url_for
from YG_server.models import db, Category, User
from YG_server.api import bp

from YG_server.schemas import category_schema, categories_schema

@bp.route('/categories', methods=['GET', 'POST'])
def get_categories():
  categories = Category.query.all()
  if categories is None:
    abort(404, description="No categories available")

  return jsonify(categories_schema.dump(categories)), 200


@bp.route('/categories/<int:category_id>', methods=['GET', 'DELETE', 'PUT'])
def get_category(category_id):
  found_category = Category.query.get(category_id)
  if found_category is None:
    abort(404, description="Category does not exist")

  # instead of returning category id return URI
  return jsonify(category_schema.dump(found_category))

