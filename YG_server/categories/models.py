from datetime import datetime
from .. import db
from .. import channel_category
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

  user = db.relationship(
    'User',
    backref=db.backref('users', lazy=True)
  )

  # this will relate channel to a category
  channel_category = db.relationship(
    'Channel', 
    secondary=channel_category,
    # load channels when loading category
    lazy='subquery',
    backref=db.backref('channels', lazy='True')
  )

  def __repr__(self):
    return '<Category %r>' % self.name


