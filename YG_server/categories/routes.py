from flask import Blueprint, jsonify, request, abort

from .models import Category

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('', methods=['GET', 'POST'])
def all():
  if request.method == 'POST':
    name = request.get_json()
    if name is None:
      abort(400)

    # TODO: create category
    new_category = Category(
      
    )
    return jsonify(name), 201

  return jsonify({'message': 'all categoriies'})

@categories_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
  return jsonify({'message': f'category: {category_id}'})

