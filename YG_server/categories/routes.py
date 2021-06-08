from flask import Blueprint, jsonify, request, abort
from datetime import datetime as dt

from flask.helpers import url_for

from .models import db, Category
from YG_server.users.models import User

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('', methods=['GET', 'POST'])
def all():
  if request.method == 'POST':
    created_category = request.get_json()
    name = created_category['name']
    user_id = created_category['user_id']

    if user_id is None:
      abort(400, description="user_id not passed from client")
    if name is None: 
      abort(400, description="name not passed from client")
    
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

    return jsonify({'name': f'{new_category.name}'}), 201


  categories = Category.query.all()
  if categories is None:
    abort(404, description="No categories available")

  res = []
  for category in categories:
    res.append({
      'title': f'{category.name}',
      'uri': f'http://localhost:5000/api/v1.0/categories/{category.id}',
      # 'uri': url_for('get_cateogry', category_id = f'{category.id}')
    })

  return jsonify(res), 200

@categories_bp.route('/<int:category_id>', methods=['GET', 'DELETE', 'PUT'])
def get_category(category_id):

  # TODO: only get category if user owns it
  found_category = Category.query.get(category_id)
  if found_category is None:
    abort(404, description="Category does not exist")

  if request.method == 'PUT':
    new_name = request.get_json()['name']
    found_category.name = new_name
    db.session.commit()
    return jsonify({
      'name': f'{found_category.name}', 
      'uri': f'http://localhost:5000/api/v1.0/categories/{found_category.id}',
      # 'created': f'{found_category.created}'
    })

  if request.method == 'DELETE':
    db.session.delete(found_category)
    db.session.commit()
    return jsonify({'message': f'category \'{found_category.name}\' has been deleted'})

  # instead of returning category id return URI
  return jsonify({
    'name': f'{found_category.name}', 
    'uri': f'http://localhost:5000/api/v1.0/categories/{found_category.id}',
    # 'created': f'{found_category.created}'
  })

