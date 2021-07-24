## TODO: create instructions on how to set up project

- [ ] Set up environment variables

	* API
		* `API_VERSION` - version of api
	* Flask
		* `FLASK_APP` - name of app (YG_server)
		* `FLASK_ENV` - environment var specifying development, testing, production
		* `SECRET_KEY` - generate 
		* `SESSION_COOKIE_NAME` - random string of chars
	* Database
		* `SQLALCHEMY_DATABASE_URI`=`postgresql://postgres:<PASSWORD>@localhost:5432/<DB_NAME>`
			* Local DB
		* `TEST_DATABASE_URI`=`postgresql://postgres:<PASSWORD>@localhost:5432/<DB_NAME>`
			* DB for testing
	* YouTube API
		* `YOUTOUBE_API_CLIENT_ID` - client ID for YouTube API. Generate from google console.  * `YOUTUBE_API_CLIENT_SECRET` - client Secret for YouTube API. Generate from google console.
		* `CLIENT_SECRET_FILENAME` - client secret JSON file from YouTube API. Generate from google console.
	* OAuth
		* `OAUTHLIB_INSECURE_TRANSPORT=1` - YouTube google oauth library does not let *non-https* sites access API. Since localhost is *http*, enable insecure transport. **Disable in production**

- [ ] How to set up virtual environment

- [ ] How to install deps in venv

- [ ] How to set up db and run migrations

- [ ] How to run tests

- [x] Start flask server: Git Bash in Windows: `source venv/Scripts/activate`


## Other Notes
- After installing dependency do `pip freeze > requirements.txt` to add to requirements.txt file