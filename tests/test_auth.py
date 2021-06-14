import json
from datetime import datetime as dt
from tests.base import BaseTestCase
from YG_server.models import db, Category, User, Channel

class TestAuth(BaseTestCase):
	def test_login(self):
		pass

	def test_register(self):
		user_res = self.client.post('/auth/v1.0/register', json={
			"id": 1,
			"username": "testuser",
			"email": "test@email.com",
			"password": "Password123@",
			"confirm_password": "Password123@"
		})
		user = json.loads(user_res.data)

		self.assertEqual(user["email"], "test@email.com")
		self.assertEqual(user["username"], "testuser")
		self.assertEqual(user["id"], 1)

		self.assertNotIn("hashed_password", user)


	def test_logout(self):
		pass