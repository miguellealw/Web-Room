from .. import db
from datetime import datetime

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

  def __repr__(self):
    return '<User %r>' % self.username

  # @password.setter                                                           
  # def password(self, password):                                              
  #   self.password_hash = bcrypt.hashpw(password, bcrypt.gensalt(12))       

  # def verify_password(self, password):                                       
  #   return bcrypt.hashpw(password, self.password_hash) == self.password_hash    