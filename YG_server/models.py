from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

# Create db here and register in __init__ to avoid circular imports
db = SQLAlchemy()

######## Join Tables ########

# relate user and channel
user_channel = db.Table(
  'user_channel',
  db.Column('channel_id', db.Integer , db.ForeignKey('channel.id', ondelete="cascade")),
  db.Column('user_id', db.Integer, db.ForeignKey('user.id', ondelete="cascade")),
)

# relate category and channel
channel_category = db.Table(
  'channel_category',
  db.Column( 'channel_id', db.Integer, db.ForeignKey('channel.id', ondelete="cascade") ),
  db.Column( 'category_id', db.Integer, db.ForeignKey('category.id', ondelete="cascade") ),
)

######## Categories ########

class Category(db.Model):
  __tablename__ = 'category'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(30), nullable=False)  
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="cascade"), nullable=False)

  # this will relate channel to a category
  # category.channel - get channels of category
  channels = db.relationship(
    'Channel', 
    secondary=channel_category,
    # load channels when loading category
    lazy='subquery',
    # channel.categories - get categories of channel
    backref=db.backref('categories', lazy=True),
    # if category is deleted then relation to channel in channel_category is also deleted
  )

  def __repr__(self):
    return '<Category %r>' % self.name



######## Channels ########

class Channel(db.Model):
  __tablename__ = 'channel'
  id = db.Column(db.Integer, primary_key=True)
  # will contain the id of the channel from the YouTube API
  yt_channel_id = db.Column(db.String, nullable=False, unique=True)
  name = db.Column(db.String(100), nullable=False, unique=False)

  # backref - declare 'channels' property on Category class
  # category = db.relationship(
  #   'Category', 
  #   backref=db.backref('channels', lazy=True)
  # )

  # channel.user - gets user of channel
  user = db.relationship(
    'User', 
    secondary=user_channel,
    lazy='subquery',
    # user.channels - gets channels of user
    backref=db.backref('channels', lazy=True),
    # if channel is deleted then relation to user in user_channel is also deleted
  )

  def __repr__(self):
    return '<Channel %r>' % self.name


######## Users ########
class User(UserMixin, db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(25), unique=True, nullable=False, index=True)
  email = db.Column(db.String(40), unique=True, nullable=False, index=True)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  hashed_password = db.Column(db.String(200), nullable=False)

  # user.categories = gets categories of user
  categories = db.relationship(
    'Category',
    lazy='subquery',
    # category.users = get user/s of category (should only be 1 user)
    backref=db.backref('user', lazy=True)
  )

  def __repr__(self):
    return '<User %r>' % self.username

  def set_password(self, password):                                              
    self.hashed_password = generate_password_hash(password)

  def verify_password(self, password):                                       
    return check_password_hash(self.hashed_password, password)

