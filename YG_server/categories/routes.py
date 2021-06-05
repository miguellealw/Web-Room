from flask import Blueprint, jsonify

# from YG_server.db import get_db

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('/', methods=['GET'])
def all():
  return jsonify({'message': 'all categoriies'})

@categories_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
  return jsonify({'message': f'category: {category_id}'})


@categories_bp.route('', methods=['POST'])
def create_category():
  return jsonify({'message': 'new category'}), 201