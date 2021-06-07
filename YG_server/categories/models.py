from datetime import datetime
# from YG_server import db, channel_category 
from YG_server import db
from YG_server.channels.models import Channel

channel_category = db.Table(
  'channel_category',

  db.Column(
    'channel_id',
    db.Integer,
    db.ForeignKey('channel.id'),
    # primary_key=True
  ),

  db.Column(
    'category_id',
    db.Integer,
    db.ForeignKey('category.id'),
    # primary_key=True
  ),
)

class Category(db.Model):
  __tablename__ = 'category'

  id = db.Column(
    db.Integer,
    primary_key=True
  )

  name = db.Column(
    db.String,
    nullable=False
  )  

  created = db.Column(
    db.DateTime, 
    nullable=False,
    default=datetime.utcnow
  )

  user_id = db.Column(
    db.Integer,
    db.ForeignKey('user.id'),
    nullable=False
  )

  # user = db.relationship(
  #   'User',
  #   backref=db.backref('users', lazy=True)
  # )

  # this will relate channel to a category
  # category_instance.channel_category - get channels of category
  channel_category = db.relationship(
    'Channel', 
    secondary=channel_category,
    # load channels when loading category
    lazy='subquery',
    # channel.categories - get categories of channel
    backref=db.backref('categories', lazy=True)
    # backref='categories'
  )

  def __repr__(self):
    return '<Category %r>' % self.name


