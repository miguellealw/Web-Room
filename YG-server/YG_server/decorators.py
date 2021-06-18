from functools import wraps
from flask import g, request, redirect, url_for, session
from YG_server.auth.oauth import get_authenticated_service

def yt_auth_required(f):
	@wraps(f)
	def route_handler(*args, **kwargs):
		# Check if user is authed by youtube
		if 'credentials' not in session:
			return redirect('auth.authorize')

		yt_client = get_authenticated_service()
		return f(yt_client, *args, **kwargs)
	return route_handler