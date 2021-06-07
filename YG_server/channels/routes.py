from flask import Blueprint, jsonify, request, abort
from YG_server import db
from .models import Channel
from YG_server.categories.models import Category


channels_bp = Blueprint('channels', __name__)
@channels_bp.route('', methods=['GET', 'POST'])
def all():
  if request.method == 'POST':
    created_channel = request.get_json()
    name = created_channel['name']
    yt_channel_id = created_channel['yt_channel_id']
    category_id = created_channel['category_id']

    if name is None or yt_channel_id is None:
      abort(400, description="Name or yt_channel_id not passed in body")

    # TODO: check if channel is already in DB, if it is just add skip creation and relate to category

    new_channel = Channel(
      name=name,
      yt_channel_id=yt_channel_id,
    )

    # relate channel to category
    # TODO: read about security in getting primary keys from client
    category = Category.query.filter(Category.id == category_id).first()
    category.channel_category.append(new_channel)

    db.session.add(new_channel)
    db.session.commit()

    if new_channel is None:
      abort(409, description="Channel could not be created")

    return jsonify(f'channel created: {new_channel.name}'), 201

  channels = Channel.query.all()
  channel_str = []

  for channel in channels:
    # backrefs allow me to access categories related to each individual channel
    channel_str.append(f"{channel} is in categories: {channel.categories}")

  if channels is None:
    abort(404, description="Channels could be not fetched")
  # return jsonify({"channels": str(channels), "categories": str(categories)})
  return jsonify({"message:": str(channel_str)})


