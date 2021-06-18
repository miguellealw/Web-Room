import google.oauth2.credentials
import google_auth_oauthlib.flow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google_auth_oauthlib.flow import InstalledAppFlow
from httplib2 import REDIRECT_CODES
from flask import session

from os import environ, path
from dotenv import load_dotenv

baseddir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(baseddir, '.env'))
CLIENT_SECRETS_FILE = environ.get('CLIENT_SECRET_FILENAME')

# This OAuth 2.0 access scope allows for full read/write access to the
# authenticated user's account.
SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
API_SERVICE_NAME = 'youtube'
API_VERSION = 'v3'

def get_authenticated_service():
	# flow docs - https://google-auth-oauthlib.readthedocs.io/en/latest/reference/google_auth_oauthlib.flow.html
  flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
  # credentials = flow.run_console()
  credentials = google.oauth2.credentials.Credentials(**session['credentials'])
  return build(API_SERVICE_NAME, API_VERSION, credentials = credentials)

# This method calls the API's youtube.subscriptions.insert method to add a
# subscription to the specified channel.
# def add_subscription(youtube, channel_id):
#   add_subscription_response = youtube.subscriptions().insert(
#     part='snippet',
#     body=dict(
#       snippet=dict(
#         resourceId=dict(
#           channelId=channel_id
#         )
#       )
#     )).execute()

#   return add_subscription_response['snippet']['title']

def get_subscriptions(service, **kwargs):
	list_subscriptions_response = service.subscriptions().list(**kwargs).execute()

	return list_subscriptions_response

# def get_channel(service, channel_id, **kwargs):
# 	list_channel_response = service.channels().list(**kwargs).execute()

def get_channel(service, **kwargs):
	list_channel_response = service.channels().list(**kwargs).execute()
	return list_channel_response