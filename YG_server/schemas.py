from YG_server import ma
from YG_server.models import Channel, User, Category
from marshmallow import fields, validate

## SQLAlchemyAutoSchema automatically generates fields based on model

#### User #### 
class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    fields = ("email", "username", "hashed_password", "created")
    model =  User
    include_relationships = True

  username = fields.String(required=True, validate=validate.Length(5,25))
  hashed_password = fields.String(
    required=True, 
    validate=validate.And(
      validate.Length(10, 30),
      validate.Regexp(
        r"^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$])[\w\d@#$]{10,30}$", 
        error="Password must contain 1 digit, 1 uppercase letter, at least 1 lowercase letter, and at least 1 special character"
      )
    )
  )
  email = fields.Email(required=True)

  #  _links = ma.Hyperlinks(
  #      {
  #       "self": ma.URLFor("api.get_user", values=dict(user_id="<id>")),
  #       "collection": ma.URLFor("api.users"),
  #      }
  #  )


#### Channels #### 
class ChannelSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Channel
    fields = ("name", "yt_channel_id", "_links")
    include_relationships = True

  _links = ma.Hyperlinks(
    {
      "self": ma.URLFor("api.get_user_channel", values=dict( channel_id="<id>" )),
      "collection": ma.URLFor("api.get_user_channels"),
    }
  )

channel_schema = ChannelSchema()
channels_schema = ChannelSchema(many=True)


#### Category #### 
class CategorySchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model =  Category
    fields = ("name", "created_at", "updated_at", "_links", "channels")
    include_relationships = True

  name = fields.String(
    required=True,
    validate=validate.Length(1, 30)
  )
  channels = ma.Nested(ChannelSchema, many=True)

  _links = ma.Hyperlinks(
    {
      "self": ma.URLFor("api.get_user_category", values=dict( category_id="<id>" )),
      "collection": ma.URLFor("api.get_user_categories"),
    }
  )


category_schema = CategorySchema()
# don't send back list of channels in category when fetching all categories
categories_schema = CategorySchema(many=True, only=("name", "created_at", "updated_at"))
