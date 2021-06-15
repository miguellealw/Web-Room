from datetime import datetime as dt
import json

from tests.base import BaseTestCase
# from YG_server import create_app
from YG_server.models import db, Category, User

class TestCategory(BaseTestCase):
	def setUp(self):
		# Call setup from super class to keep client in 'self'
		super(TestCategory, self).setUp()

		# Create 2 users
		new_user = User(id=1, username = "testuser", created_at = dt.now(), email = "test@email.com")
		new_user.set_password("Password123@")
		new_user_2 = User(id=2, username = "testuser_2", created_at = dt.now(), email = "test_2@email.com")
		new_user_2.set_password("Password123@")
		db.session.add(new_user)
		db.session.add(new_user_2)
		db.session.commit()

		# categories for user 1
		self.new_category = Category(id=1, name="Test Category", user_id=new_user.id, created_at=dt.now())
		self.new_category_2 = Category(id=2, name="Test Category 2", user_id=new_user.id, created_at=dt.now())
		# categories for user 2
		self.new_category_3 = Category(id=3, name="Test Category 3", user_id=new_user_2.id, created_at=dt.now())
		self.new_category_4 = Category(id=4, name="Test Category 4", user_id=new_user_2.id, created_at=dt.now())
		db.session.add(self.new_category)
		db.session.add(self.new_category_2)
		db.session.add(self.new_category_3)
		db.session.add(self.new_category_4)
		db.session.commit()

	# * GET /api/v1.0/categories
	def test_get_all_categories(self):
		## ACT
		res = self.client.get('/api/v1.0/categories')
		categories = json.loads(res.data)

		## ASSERT
		self.assertEqual(res.status_code, 200)

		self.assertEqual(categories[0]['name'], "Test Category")
		self.assertEqual(categories[1]['name'], "Test Category 2")
		self.assertEqual(categories[2]['name'], "Test Category 3")
		self.assertEqual(categories[3]['name'], "Test Category 4")

		# Check if owner of public categories is correct
		self.assertEqual(categories[0]["_owner"], f"/api/v1.0/users/{self.new_category.user_id}")
		self.assertEqual(categories[1]["_owner"], f"/api/v1.0/users/{self.new_category_2.user_id}")
		self.assertEqual(categories[2]["_owner"], f"/api/v1.0/users/{self.new_category_3.user_id}")
		self.assertEqual(categories[3]["_owner"], f"/api/v1.0/users/{self.new_category_4.user_id}")

		# Check if all categories were returned
		self.assertEqual(len(categories), 4)

	# * GET /api/v1.0/categories/<category_id>
	def test_specified_category(self):
		# ACT
		res_user_1 = self.client.get('/api/v1.0/categories/1')
		category_user_1 = json.loads(res_user_1.data)

		res_user_2 = self.client.get('/api/v1.0/categories/3')
		category_user_2 = json.loads(res_user_2.data)

		# ASSERT
		self.assertEqual(category_user_1['name'], "Test Category")
		self.assertIn("_links", category_user_1)
		self.assertIn("_owner", category_user_1)
		self.assertEqual(category_user_1["_owner"], f"/api/v1.0/users/1")
		self.assertIn("channels", category_user_1)

		self.assertEqual(category_user_2['name'], "Test Category 3")
		self.assertIn("_links", category_user_2)
		self.assertIn("_owner", category_user_2)
		self.assertEqual(category_user_2["_owner"], f"/api/v1.0/users/2")
		self.assertIn("channels", category_user_2)

