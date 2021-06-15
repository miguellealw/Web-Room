from flask import Blueprint

bp = Blueprint('auth', __name__)

from YG_server.auth import routes