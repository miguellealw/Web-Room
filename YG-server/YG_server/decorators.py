from functools import wraps
from flask import redirect, session, abort
from YG_server.auth.oauth import get_authenticated_service

def yt_auth_required(f):
	@wraps(f)
	def route_handler(*args, **kwargs):
		# Check if user is authed by youtube
		if 'credentials' not in session:
			# TODO: handle this properly. send json message to frontend and have frontend handle redirection
			return redirect('auth.authorize')

		yt_client = get_authenticated_service()
		return f(yt_client, *args, **kwargs)
	return route_handler


# For Auth0
def requires_auth(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		if 'profile' not in session:
			# Redirect to Login page here
			abort(500, description="NOT AUTHED WITH AUTH0")
			# return redirect('/')
		return f(*args, **kwargs)

	return decorated