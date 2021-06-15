from flask import jsonify, abort
from flask.helpers import url_for
from YG_server.models import Channel
from YG_server.api import bp

from YG_server.schemas import channel_schema, channels_schema

@bp.route('/channels', methods=['GET', 'POST'])
def get_channels():
  channels = Channel.query.all()
  if channels is None:
    abort(404, description="Channels could be not fetched")

  # Access categories from channel
  # backrefs allow me to access categories related to each individual channel
  # channel_str.append(f"{channel} is in categories: {channel.categories}")

  return jsonify(channels_schema.dump(channels))



@bp.route('/channels/<int:channel_id>', methods=['GET'])
def get_channel(channel_id):
  found_channel = Channel.query.get_or_404(channel_id, description="Channel does not exist")
  return jsonify(channel_schema.dump(found_channel))
