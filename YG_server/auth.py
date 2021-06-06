# import functools

# from flask import (
#     Blueprint, flash, g, redirect, render_template, request, session, url_for
# )
# from werkzeug.security import check_password_hash, generate_password_hash

# # from YG_server.db import get_db


# # create blueprint named 'auth'
# # __name__ - tells blueprint where it is defined
# bp = Blueprint('auth', __name__)

# # TODO: edit so json is returned and not templates
    
# # This may NOT be necessary since a user will be registered when logging in using YouTube for the first time 
# # no password will be necessary since YouTube auth will take care of that
# @bp.route('/register', methods=('GET', 'POST'))
# def register():
#   if request.method == 'POST':
#     username = request.form['username']
#     password = request.form['password']
#     db = get_db()
#     error = None

#     if not username:
#       error = 'Username is required.'
#     elif not password:
#       error = 'Password is required.'
#     elif db.execute(
#       'SELECT id FROM user WHERE username = ?', (username,)
#     ).fetchone() is not None:
#       error = 'User {} is already registered.'.format(username)

#     # if not error add user to db
#     if error is None:
#       db.execute(
#         'INSERT INTO user (username, password) VALUES (?, ?)',
#         (username, generate_password_hash(password))
#       )
#       db.commit()
#       return redirect(url_for('auth.login'))

#     # Will be accessible from template
#     flash(error)

#   return render_template('auth/register.html')



# @bp.route('/login', methods=('GET', 'POST'))
# def login():
#   if request.method == 'POST':
#     username = request.form['username']
#     password = request.form['password']
#     db = get_db()
#     error = None
#     user = db.execute(
#       'SELECT * FROM user WHERE username = ?', (username,)
#     ).fetchone()

#     if user is None:
#       error = 'Incorrect username.'
#     elif not check_password_hash(user['password'], password):
#       error = 'Incorrect password.'

#     # session is dict that store data across requests
#     if error is None:
#       session.clear()
#       session['user_id'] = user['id']
#       return redirect(url_for('index'))

#     flash(error)

#   return render_template('auth/login.html')



# # If user is logged in (if session contains user_id) then provide user data to frontend
# @bp.before_app_request
# def load_logged_in_user():
#   user_id = session.get('user_id')

#   if user_id is None:
#     g.user = None
#   else:
#     g.user = get_db().execute(
#       'SELECT * FROM user WHERE id = ?', (user_id,)
#     ).fetchone()


# # This decorator returns a new view function that wraps the original view it’s applied to. 
# # The new function checks if a user is loaded and redirects to the login page otherwise. 
# # If a user is loaded the original view is called and continues normally. 
# def login_required(view):
#   @functools.wraps(view)
#   def wrapped_view(**kwargs):
#     if g.user is None:
#         return redirect(url_for('auth.login'))

#     return view(**kwargs)

#   return wrapped_view


# @bp.route('/logout')
# def logout():
#   session.clear()
#   return redirect(url_for('index'))