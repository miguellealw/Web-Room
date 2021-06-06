from . import db

## Join table for channels and categories
channel_category = db.Table(
  'channel_category',

  db.Column(
    'channel_id',
    db.Integer ,
    db.ForeignKey('channel.id'),
    primary_key=True
  ),

  db.Column(
    'category_id',
    db.Integer,
    db.ForeignKey('category.id'),
    primary_key=True
  ),
)