from YG_server import db
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash

######## Join Tables ########

# relate user and channel
user_channel = db.Table(
  'user_channel',

  db.Column(
    'channel_id',
    db.Integer ,
    db.ForeignKey('channel.id'),
    primary_key=True
  ),

  db.Column(
    'user_id',
    db.Integer,
    db.ForeignKey('user.id'),
    primary_key=True
  ),
)

# relate category and channel
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

######## Categories ########

class Category(db.Model):
  __tablename__ = 'category'

  id = db.Column( db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)  
  created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

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



######## Channels ########

class Channel(db.Model):
  __tablename__ = 'channel'

  id = db.Column(db.Integer, primary_key=True)
  # will contain the id of the channel from the YouTube API
  yt_channel_id = db.Column(db.String, nullable=False, unique=True)
  name = db.Column(db.String, nullable=False, unique=False)

  # backref - declare 'channels' property on Category class
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

  def __repr__(self):
    return '<Channel %r>' % self.name


######## Users ########
class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(25), unique=True, nullable=False)
  created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  password = db.Column(db.String(25), nullable=False)
  # user_instance.user_channel - gets channels(subscriptions) of user 
  # NOTE: do not rename to channels or error occurs
  user_channel = db.relationship(
    'Channel', 
    secondary=user_channel,
    # load channels when loading user
    lazy='subquery',
    # channel.users - get users of channel (consider removing)
    backref=db.backref('users', lazy=True)
  )
  # user_instance.categories = gets categories of user
  categories = db.relationship(
    'Category',
    lazy='subquery',
    # category.users = get user/s of category (should only be 1 user)
    backref=db.backref('user', lazy=True)
  )
  def __repr__(self):
    return '<User %r>' % self.username

  def password(self, password):                                              
    self.password = generate_password_hash(password)

  def verify_password(self, password):                                       
    return check_password_hash(self.password, password)