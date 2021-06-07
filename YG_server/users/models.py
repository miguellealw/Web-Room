from .. import db
from datetime import datetime

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

class User(db.Model):
  __tablename__ = 'user'

  id = db.Column(
    db.Integer,
    primary_key=True
  )

  username = db.Column(
    db.String(25),
    unique=True,
    nullable=False
  )

  created = db.Column(
    db.DateTime, 
    nullable=False,
    default=datetime.utcnow
  )

  password = db.Column(
    db.String(25),
    nullable=False
  )

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

  # @password.setter                                                           
  # def password(self, password):                                              
  #   self.password_hash = bcrypt.hashpw(password, bcrypt.gensalt(12))       

  # def verify_password(self, password):                                       
  #   return bcrypt.hashpw(password, self.password_hash) == self.password_hash    