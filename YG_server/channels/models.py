from .. import db
from YG_server.users.models import user_channel

class Channel(db.Model):
  __tablename__ = 'channel'

  id = db.Column(
    db.Integer,
    primary_key=True
  )

  # will contain the id of the channel from the YouTube API
  yt_channel_id = db.Column(
    db.String,
    nullable=False,
    unique=True
  )

  name = db.Column(
    db.String,
    nullable=False,
    unique=False
  )

  # backref - declare 'channels' property on Channel class
  # category = db.relationship(
  #   'Category', 
  #   backref=db.backref('channels', lazy=True)
  # )

  # channel_instance.user - gets user of channel
  user = db.relationship(
    'User', 
    secondary=user_channel,
    lazy='subquery',
    # user.channels - gets channels of user
    backref=db.backref('channels', lazy=True)
  )

  # channel_category = 

  def __repr__(self):
    return '<Channel %r>' % self.name

