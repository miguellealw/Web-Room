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
		res = self.client.get('/api/v1.0/categories', json={})
		categories = json.loads(res.data)
		# print("JSON _DATA", json_data)

		## ASSERT
		# categories = Category.query.all()
		self.assertEqual(res.status_code, 200)
		self.assertEqual(new_category.name, categories[0]['name'])
		self.assertEqual(new_category_2.name, categories[1]['name'])
		self.assertEqual(new_category_3.name, categories[2]['name'])
		self.assertEqual(len(categories), 3)

	def test_post_category(self):

		# ARRANGE
		# Create user
		user_res = self.client.post('/auth/v1.0/register', json={
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		user = json.loads(user_res.data)
		print("USER", user)

		## ACT
		category_res = self.client.post('/api/v1.0/users/current_user/categories', json={
			"name": "Test Category"
		})
		category = json.loads(category_res.data)

		## ASSERT
		self.assertEqual(user_res.status_code, 201)
		self.assertEqual(category_res.status_code, 200)

		self.assertEqual(user['username'], "testuser")
		self.assertEqual(category['name'], "Test Category")


	# NOTE: MAY REMOVE
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