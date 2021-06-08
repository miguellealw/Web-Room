from flask import Blueprint, jsonify, request, abort
from YG_server import db
from .models import Channel
from YG_server.categories.models import Category
from YG_server.users.models import User


channels_bp = Blueprint('channels', __name__)

@channels_bp.route('', methods=['GET', 'POST'])
def all():
  created_channel = request.get_json()
  user_id = created_channel['user_id']
  ## ==== POST ====
  # TODO: only create channel when adding to category
  if request.method == 'POST':
    name = created_channel['name']
    yt_channel_id = created_channel['yt_channel_id']
    category_id = created_channel['category_id']


    if name is None or yt_channel_id is None:
      abort(400, description="Name or yt_channel_id not passed in body")

    # TODO: check if channel is already in DB, if it is skip creation; fetch channel and relate to category

    new_channel = Channel(
      name=name,
      yt_channel_id=yt_channel_id,
    )

    if new_channel is None:
      abort(409, description="Channel could not be created")

    # relate channel to category
    # TODO: read about security in getting primary keys from client
    category_found = Category.query.get(category_id)
    if(category_found is None):   
      abort(409, description="Channel could not be created; category does not exist")
    # Access channels from category
    category_found.channel_category.append(new_channel)

    # relate channel to user
    user_found = User.query.get(user_id)
    if(user_found is None):   
      abort(409, description="Channel could not be created; user does not exist")
    user_found.user_channel.append(new_channel)

    db.session.add(new_channel)
    db.session.commit()

    return jsonify({'name': f'{new_channel.name}'}), 201

  ## ==== GET ====

  # only get current user channels
  user_found = User.query.filter(User.id == user_id).first()
  if(user_found is None):   
    abort(409, description="Channel could not be fetched; user does not exist")

  channels = user_found.channels

  if channels is None:
    abort(404, description="Channels could be not fetched")

  res = []
  for channel in channels:
    # Access categories from channel
    # backrefs allow me to access categories related to each individual channel
    # channel_str.append(f"{channel} is in categories: {channel.categories}")
    res.append({
      'name': f'{channel.name}',
      'yt_channel_id': f'{channel.yt_channel_id}',
      'uri': f'http://localhost:5000/api/v1.0/channels/{channel.id}',
    })

  # return jsonify({"message:": str(channel_str)})
  return jsonify(res)


@channels_bp.route('/<int:channel_id>', methods=['GET', 'POST'])
def get_channel(channel_id):
  pass

# /users/<id>/categories - get categories channel belongs to
@channels_bp.route('/<int:channel_id>/categories', methods=['GET', 'POST'])
def get_categories_of_channel(channel_id):
  pass
