import json
from datetime import datetime as dt
import unittest
from tests.base import BaseTestCase
from YG_server.models import db, Category, User, Channel

# TODO: test failed fetches like 404

class TestUser(BaseTestCase):
	def setUp(self):
		# Call setup from super class to keep client in 'self'
		super(TestUser, self).setUp()

		# SETUP AUTH
		self.user_res = self.client.post('/auth/v1.0/register', json={
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		self.user = json.loads(self.user_res.data)



	# def tearDown(self):
		# super().teardDown()
		# pass

	# * POST /api/v1.0/users/current_user/categories
	def test_create_user_category(self):
		## ACT
		category_res = self.client.post('/api/v1.0/users/current_user/categories', json={
			"name": "Test Category"
		})
		category = json.loads(category_res.data)

		## ASSERT
		self.assertEqual(category_res.status_code, 201)

		self.assertEqual(self.user['username'], "testuser")
		self.assertEqual(category['name'], "Test Category")
	
	# * GET /api/v1.0/users/current_user/categories/<category_id>
	def test_get_user_specified_category(self):
		## ARRANGE
		new_category = Category(id=1, name="Test Category", user_id=self.user["id"], created_at=dt.now())
		db.session.add(new_category)
		db.session.commit()

		## ACT
		category_res = self.client.get('/api/v1.0/users/current_user/categories/1')
		category = json.loads(category_res.data)

		## ASSERT
		self.assertEqual(category_res.status_code, 200)
		self.assertEqual(new_category.name, category['name'])
		self.assertEqual(category["_owner"], f'/api/v1.0/users/{self.user["id"]}')

	# * GET /api/v1.0/users/current_user
	def test_get_current_user(self):
		current_user_res = self.client.get('/api/v1.0/users/current_user')
		current_user = json.loads(current_user_res.data)

		self.assertEqual(current_user["username"], "testuser")

	# * GET /api/v1.0/users/<user_id>
	def test_get_user(self):
		pass

	# * GET /api/v1.0/users/current_user/channels
	def test_get_user_channels(self):
		pass


	# * GET /api/v1.0/users/current_user/channels/<channel_id>
	def test_get_user_specified_channel(self):
		pass

	# * POSt /api/v1.0/users/current_user/categories/<category_id>/add_channel
	def test_add_channel_to_category(self):
		pass