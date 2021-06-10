
from flask import jsonify, abort
from flask.helpers import url_for
from YG_server.models import Channel
from YG_server.api import bp

@bp.route('/channels', methods=['GET', 'POST'])
def get_channels():
  channels = Channel.query.all()
  if channels is None:
    abort(404, description="Channels could be not fetched")

  # Access categories from channel
  # backrefs allow me to access categories related to each individual channel
  # channel_str.append(f"{channel} is in categories: {channel.categories}")

  return jsonify([
    {
      'name': f'{channel.name}',
      'yt_channel_id': f'{channel.yt_channel_id}',
      'uri': url_for('api.get_channel', channel_id=channel.id)
    }
    for channel in channels
  ])


@bp.route('/channels/<int:channel_id>', methods=['GET'])
def get_channel(channel_id):
  found_channel = Channel.query.get_or_404(channel_id, description="Channel does not exist")
  return jsonify({ "name": found_channel.name, "yt_channel_id": found_channel.yt_channel_id })
