from .. import db

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

  password = db.Column(
    db.String(25),
    nullable=False
  )

  def __repr__(self):
    return '<User %r>' % self.username