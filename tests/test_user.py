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

	def test_create_user_specified_category_404(self):
		## ACT
		category_res = self.client.get('/api/v1.0/users/current_user/categories/1')
		category = json.loads(category_res.data)

		## ASSERT
		self.assertEqual(category_res.status_code, 404)
		self.assertEqual(category["error"], '404 Not Found: Category does not exist')

	
	# * GET /api/v1.0/users/current_user/categories
	def test_get_user_categories(self):
		# ARRANGE
		new_category = Category(id=1, name="Test Category", user_id=self.user["id"], created_at=dt.now())
		new_category_2 = Category(id=2, name="Test Category 2", user_id=self.user["id"], created_at=dt.now())
		new_category_3 = Category(id=3, name="Test Category 3", user_id=self.user["id"], created_at=dt.now())

		db.session.add(new_category)
		db.session.add(new_category_2)
		db.session.add(new_category_3)
		db.session.commit()

		# ACT
		categories_res = self.client.get('/api/v1.0/users/current_user/categories')
		categories = json.loads(categories_res.data)

		# ASSERT
		self.assertEqual(categories_res.status_code, 200)
		self.assertEqual(len(categories), 3)


	
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

	def test_get_user_specified_category_404(self):
		## ACT
		category_res = self.client.get('/api/v1.0/users/current_user/categories/1')
		category = json.loads(category_res.data)

		## ASSERT
		self.assertEqual(category_res.status_code, 404)
		self.assertEqual(category["error"], '404 Not Found: Category does not exist')

	# * POST /api/v1.0/users/current_user/categories/<category_id>/add_channel
	def test_add_channel_to_category(self):
		# Create category to add channel to
		new_category = Category(id=1, name="Test Category", user_id=self.user["id"], created_at=dt.now())
		db.session.add(new_category)
		db.session.commit()

		# ACT
		channel_res = self.client.post('/api/v1.0/users/current_user/categories/1/add_channel', json={
			"name": "Test YouTube Channel",
			"yt_channel_id": "test_id_test"
		})
		channel = json.loads(channel_res.data)

		self.assertEqual(channel_res.status_code, 200)
		self.assertEqual(channel["name"], "Test YouTube Channel")
		self.assertEqual(channel["yt_channel_id"], "test_id_test")
		self.assertIn("_links", channel)


	# * GET /api/v1.0/users/current_user/channels
	def test_get_user_channels(self):
		# ARRANGE
		# Create Category
		new_category = Category(id=1, name="Test Category", user_id=self.user["id"], created_at=dt.now())
		db.session.add(new_category)
		db.session.commit()

		# Create Channels
		self.client.post('/api/v1.0/users/current_user/categories/1/add_channel', json={
			"name": "Test YouTube Channel",
			"yt_channel_id": "test_id_test"
		})
		self.client.post('/api/v1.0/users/current_user/categories/1/add_channel', json={
			"name": "Test YouTube Channel 2",
			"yt_channel_id": "test_id_test_2"
		})

		# ACT
		channels_res = self.client.get('/api/v1.0/users/current_user/channels')
		channels = json.loads(channels_res.data)

		# ASSERT
		self.assertEqual(channels_res.status_code, 200)
		self.assertEqual(channels[0]["name"], "Test YouTube Channel")
		self.assertEqual(channels[0]["yt_channel_id"], "test_id_test")

		self.assertEqual(channels[1]["name"], "Test YouTube Channel 2")
		self.assertEqual(channels[1]["yt_channel_id"], "test_id_test_2")
		self.assertEqual(len(channels), 2)

	# * GET /api/v1.0/users/current_user/channels/<channel_id>
	def test_get_user_specified_channel(self):
		# ARRANGE
		# Create Category
		new_category = Category(id=1, name="Test Category", user_id=self.user["id"], created_at=dt.now())
		db.session.add(new_category)
		db.session.commit()

		ch_res = self.client.post('/api/v1.0/users/current_user/categories/1/add_channel', json={
			"id": 1,
			"name": "Test YouTube Channel",
			"yt_channel_id": "test_id_test"
		})

		# ACT
		channel_res = self.client.get('/api/v1.0/users/current_user/channels/4')
		channel = json.loads(channel_res.data)

		# ASSERT
		self.assertEqual(channel_res.status_code, 200)
		self.assertEqual(channel["name"], "Test YouTube Channel")
		self.assertEqual(channel["yt_channel_id"], "test_id_test")
		self.assertIn("_links", channel)


	# * GET /api/v1.0/users/current_user
	def test_get_current_user(self):
		current_user_res = self.client.get('/api/v1.0/users/current_user')
		current_user = json.loads(current_user_res.data)

		self.assertEqual(current_user["username"], "testuser")

	# * GET /api/v1.0/users/<user_id>
	def test_get_user(self):
		pass

