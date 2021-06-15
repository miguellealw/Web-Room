from datetime import datetime as dt
import json

from tests.base import BaseTestCase
# from YG_server import create_app
from YG_server.models import db, Category, User

class TestCategory(BaseTestCase):
	# * GET /api/v1.0/categories
	def test_get_all_categories(self):
		## ARRANGE
		new_user = User(username = "testuser", created_at = dt.now(), email = "test@email.com")
		new_user.set_password("Password123@")

		new_user_2 = User(username = "testuser_2", created_at = dt.now(), email = "test_2@email.com")
		new_user_2.set_password("Password123@")

		db.session.add(new_user)
		db.session.add(new_user_2)
		db.session.commit()

		# categories for user 1
		new_category = Category(name="Test Category", user_id=new_user.id, created_at=dt.now())
		new_category_2 = Category(name="Test Category 2", user_id=new_user.id, created_at=dt.now())
		# categories for user 2
		new_category_3 = Category(name="Test Category 3", user_id=new_user_2.id, created_at=dt.now())
		new_category_4 = Category(name="Test Category 3", user_id=new_user_2.id, created_at=dt.now())

		db.session.add(new_category)
		db.session.add(new_category_2)
		db.session.add(new_category_3)
		db.session.add(new_category_4)

		db.session.commit()

		## ACT
		res = self.client.get('/api/v1.0/categories', json={})
		categories = json.loads(res.data)

		## ASSERT
		self.assertEqual(res.status_code, 200)

		self.assertEqual(new_category.name, categories[0]['name'])
		self.assertEqual(new_category_2.name, categories[1]['name'])
		self.assertEqual(new_category_3.name, categories[2]['name'])
		self.assertEqual(new_category_4.name, categories[3]['name'])

		# Check if owner of public categories is correct
		self.assertEqual(categories[0]["_owner"], f"/api/v1.0/users/{new_category.user_id}")
		self.assertEqual(categories[1]["_owner"], f"/api/v1.0/users/{new_category_2.user_id}")
		self.assertEqual(categories[2]["_owner"], f"/api/v1.0/users/{new_category_3.user_id}")
		self.assertEqual(categories[3]["_owner"], f"/api/v1.0/users/{new_category_4.user_id}")

		# Check if all categories were returned
		self.assertEqual(len(categories), 4)

	# * GET /api/v1.0/categories/<category_id>
	# def test_specified_category(self):
	# 	# ARRANGE
	# 	new_user = User(username = "testuser", created_at = dt.now(), email = "test@email.com")
	# 	new_user.set_password("Password123@")
	# 	db.session.add(new_user)
	# 	db.session.commit()

	# 	# categories
	# 	new_category = Category(id=1, name="Test Category", user_id=new_user.id, created_at=dt.now())
	# 	new_category_2 = Category(name="Test Category 2", user_id=new_user.id, created_at=dt.now())
	# 	db.session.add(new_category)
	# 	db.session.add(new_category_2)
	# 	db.session.commit()

	# 	# ACT
	# 	res = self.client.get('/api/v1.0/categories/1')
	# 	category = json.loads(res.data)

	# 	self.assertEqual(new_category.name, category['name'])
	# 	self.assertIn("_links", category)
	# 	self.assertIn("_owner", category)
	# 	self.assertIn("channels", category)