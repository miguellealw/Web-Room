import json
from datetime import datetime as dt
from tests.base import BaseTestCase
from YG_server.models import db, Category, User, Channel

# TODO: test failed fetches like 404

class TestUser(BaseTestCase):
	def test_create_user_category(self):
		# ARRANGE
		# setup auth
		user_res = self.client.post('/auth/v1.0/register', json={
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		user = json.loads(user_res.data)

		## ACT
		category_res = self.client.post('/api/v1.0/users/current_user/categories', json={
			"name": "Test Category"
		})
		category = json.loads(category_res.data)

		## ASSERT
		self.assertEqual(user_res.status_code, 201)
		self.assertEqual(category_res.status_code, 201)

		self.assertEqual(user['username'], "testuser")
		self.assertEqual(category['name'], "Test Category")
	
	def test_get_user_specified_category(self):
		## ARRANGE

		# setup auth
		user_res = self.client.post('/auth/v1.0/register', json={
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		user = json.loads(user_res.data)

		new_category = Category(id=1, name="Test Category", user_id=user["id"], created_at=dt.now())
		db.session.add(new_category)
		db.session.commit()

		## ACT
		category_res = self.client.get('/api/v1.0/users/current_user/categories/1', json={})
		category = json.loads(category_res.data)

		## ASSERT
		# categories = Category.query.all()
		self.assertEqual(category_res.status_code, 200)
		self.assertEqual(new_category.name, category['name'])


	def test_get_current_user(self):
		user_res = self.client.post('/auth/v1.0/register', json={
			"id": 1,
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})

		current_user_res = self.client.get('/api/v1.0/users/current_user')
		current_user = json.loads(current_user_res.data)

		self.assertEqual(current_user["username"], "testuser")

	def test_get_user(self):
		pass

	def test_get_user_channels(self):
		pass

	def test_get_user_specified_channel(self):
		pass

	def test_add_channel_to_category(self):
		pass