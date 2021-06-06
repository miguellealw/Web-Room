from datetime import datetime
from .. import db

class Channel(db.Model):
  __tablename__ = 'channel'

  id = db.Column(
    db.Integer,
    primary_key=True
  )

  name = db.Column(
    db.String,
    nullable=False,
    unique=False
  )

  category_id = db.Column(
    db.Integer,
    db.ForeignKey('category.id'),
    nullable=False
  )

  # backref - declare 'channels' property on Channel class
  # category = db.relationship(
  #   'Category', 
  #   backref=db.backref('channels', lazy=True)
  # )

  # channel_category = 

  # TODO: figure out if relating to user is necessary b/c channels will be fetchanble from the YouTube API
  # Maybe join table may work

  def __repr__(self):
    return '<Channel %r>' % self.name

