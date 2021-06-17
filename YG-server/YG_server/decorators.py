from functools import wraps
from flask import g, request, redirect, url_for, session
from YG_server.auth.oauth import get_authenticated_service

def yt_auth_required(f):
	@wraps(f)
	def decorated_function(*args, **kwargs):
		# Check if user is authed by youtube
		if 'credentials' not in session:
			return redirect('authorize')

		yt_client = get_authenticated_service()
		return f(yt_client, *args, **kwargs)
	return decorated_function