import json
from datetime import datetime as dt
from tests.base import BaseTestCase
from YG_server.models import db, Category, User, Channel

# TODO: test failed logins

class TestAuth(BaseTestCase):
	def test_login(self):

		# ARRANGE
		self.client.post('/auth/v1.0/register', json={
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		self.client.get('/auth/v1.0/logout')

		# ACT
		user_res = self.client.get('/auth/v1.0/login', json={
			"username": "testuser",
			"password": "Password123@"
		})
		user = json.loads(user_res.data)

		# ASSERT
		self.assertEqual(user_res.status_code, 200)
		self.assertEqual(user["flash"], "User logged in")
		self.assertEqual(user["username"], "testuser")


	def test_register(self):
		user_res = self.client.post('/auth/v1.0/register', json={
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		user = json.loads(user_res.data)

		self.assertEqual(user_res.status_code, 201)
		self.assertEqual(user["email"], "test@email.com")
		self.assertEqual(user["username"], "testuser")
		# self.assertEqual(user["id"], 2)

		self.assertNotIn("hashed_password", user)


	def test_logout(self):
		user_res = self.client.post('/auth/v1.0/register', json={
			"id": 1,
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		# user = json.loads(user_res.data)

		logout_res = self.client.get('/auth/v1.0/logout')
		logout = json.loads(logout_res.data)

		self.assertEqual(logout_res.status_code, 200)
		self.assertEqual(logout["flash"], "User logged out")



