from flask import Blueprint, jsonify, request, abort
from datetime import datetime as dt

from .models import db, Category
from YG_server.users.models import User

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('', methods=['GET', 'POST'])
def all():
  if request.method == 'POST':
    created_category = request.get_json()
    name = created_category['name']
    user_id = created_category['user_id']

    if name is None or user_id is None:
      abort(400, description="Name not passed from client")
    
    user = User.query.get(user_id)
    if user is None:
      abort(409, description="Category could not be created; User does not exist")
      
    new_category = Category(
      name=name,
      user_id=user_id,
      created=dt.now()
    )

    if new_category is None:
      abort(409, description="Category could not be created")

    db.session.add(new_category)
    db.session.commit()


    return jsonify(f'category created: {new_category.name}'), 201


  categories = Category.query.all()
  if categories is None:
    abort(404, description="No categories available")

  return jsonify(str(categories)), 200

@categories_bp.route('/<int:category_id>', methods=['GET', 'DELETE', 'PUT'])
def get_category(category_id):

  # TODO: only get category if user owns it
  found_category = Category.query.get(category_id)
  if found_category is None:
    abort(404, description="Category does not exist")

  if request.method == 'DELETE':
    db.session.delete(found_category)
    db.session.commit()
    return jsonify({'message': f'category \'{found_category.name}\' has been deleted'})

  return jsonify({'message': f'category: {found_category}'})

