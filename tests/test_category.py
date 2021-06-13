import unittest
from datetime import datetime as dt
import json

from tests.base import BaseTestCase
# from YG_server import create_app
from YG_server.models import db, Category, User

class TestCategory(BaseTestCase):
	def test_get_all_categories(self):
		## ARRANGE
		new_user = User(username = "testuser", created_at = dt.now(), email = "test@email.com")
		new_user.set_password("Password123@")
		db.session.add(new_user)
		db.session.commit()

		new_category = Category(name="Test Category", user_id=new_user.id, created_at=dt.now())
		new_category_2 = Category(name="Test Category 2", user_id=new_user.id, created_at=dt.now())
		new_category_3 = Category(name="Test Category 3", user_id=new_user.id, created_at=dt.now())
		db.session.add(new_category)
		db.session.add(new_category_2)
		db.session.add(new_category_3)
		db.session.commit()

		## ACT
		response = self.client.get('/api/v1/categories', json={})
		# json_data = json.dumps(response)
		print("JSON _DATA", response)

		## ASSERT
		# categories = Category.query.all()
		self.assertEqual(response.status_code, 200)
		# self.assertIn(new_category, categories)
		# self.assertEqual(len(categories), 3)

	## TODO: figure out how to send cookies
	# ADD test_ to add back to tests
	def post_category(self):
		new_user = User(username = "testuser", created_at = dt.now(), email = "test@email.com")
		new_user.set_password("Password123@")
		db.session.add(new_user)
		db.session.commit()

		# API REQUEST
		response = self.client.post('/api/v1/users/current_user/categories', json={
			"name": "Test Category"
		})
		self.assertEqual(response.status_code, 200)
		# json_data = test_category.get_json()
		print("TEST CATEGORY", response)
		json_data = json.dumps(response)

		# new_category = Category(name=json_data['name'], user_id=new_user.id, created_at=dt.now())
		new_category = Category(name='Test Category', user_id=new_user.id, created_at=dt.now())
		db.session.add(new_category)
		db.session.commit()


	# 	## ASSERT
	# 	category = Category.query.filter_by(name = json_data["name"]).first()
	# 	self.assertEqual(category.name, "Test Category")


	def test_creation(self):
		# Setup User
		new_user = User(username = "testuser", created_at = dt.now(), email = "test@email.com")
		new_user.set_password("Password123@")
		db.session.add(new_user)
		db.session.commit()

		new_category = Category(name="Test Category", user_id=new_user.id, created_at=dt.now())
		db.session.add(new_category)
		db.session.commit()

		categories = Category.query.all()
		self.assertIn(new_category, categories)
		self.assertEqual(len(categories), 1)