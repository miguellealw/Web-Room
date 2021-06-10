from YG_server import ma
import flask_marshmallow
from YG_server.models import Channel, User, Category

#### User #### 
class UserSchema(ma.SQLAlchemySchema):
  class Meta:
    fields = ("email", "username", "created")
    model =  User

    username = ma.auto_field()
    email = ma.auto_field()
    created = ma.auto_field()
    hashed_password = ma.auto_field()
    categories = ma.auto_field()

  #  _links = ma.Hyperlinks(
  #      {
  #       "self": ma.URLFor("api.get_user", values=dict(user_id="<id>")),
  #       "collection": ma.URLFor("api.users"),
  #      }
  #  )


#### Channels #### 
class ChannelSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Channel
    fields = ("name", "yt_channel_id", "_links")

  id = ma.auto_field()
  yt_channel_id = ma.auto_field()
  name = ma.auto_field()

  _links = ma.Hyperlinks(
    {
      "self": ma.URLFor("api.get_user_channel", values=dict( channel_id="<id>" )),
      "collection": ma.URLFor("api.get_user_channels"),
    }
  )

channel_schema = ChannelSchema()
channels_schema = ChannelSchema(many=True)


#### Category #### 
class CategorySchema(ma.SQLAlchemySchema):
  class Meta:
    model =  Category
    fields = ("name", "created", "_links", "channels")

  id = ma.auto_field()
  name = ma.auto_field()
  created = ma.auto_field()
  user_id = ma.auto_field()
  # channels = ma.Nested("api.get_user_channels")
  channels = ma.auto_field()

  _links = ma.Hyperlinks(
    {
      "self": ma.URLFor("api.get_user_category", values=dict( category_id="<id>" )),
      "collection": ma.URLFor("api.get_user_categories"),
    }
  )

  # TODO: add channels array when many=False
  # _channels = ma.Hyperlinks({
  #   "channels": ma.URLFor("api.get_user_category_channels", values=dict( category_id="<id>") )
  # })

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)
