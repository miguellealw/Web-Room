# How to Set Up React Application

---

## API's
Auth0
* Applications
	* Create an Tenant
	* Go to `Applications > Applications` and create a **Regular Web Application** application for the app
	* In `Applications > Applications` also create a **Machine to Machine** application for the Management API used to get the app_metadata which contains whether the user is authed w/ YouTube.
	* In `Applications > APIs` create an API application with identifier of `https://youtubebox/api`. *This identifier does not matter, however make sure you use it on the `AUTH0_AUDIENCE` environment variable*.
* Actions
	*	In `Actions > Custom` create an action on **Pre User Registration**. This action will add the `is_authed_with_youtube` variable in users app_metadata after the user signs up.
		```javascript
		exports.onExecutePreUserRegistration = async (event, api) => {
			api.user.setAppMetadata("is_authed_with_youtube", false);
		};
		```
	* Save the draft. Deploy. Finally, add the action to the flow in the **Pre User Registration** phase.

---

## Environment Vars
Create `.env.local` file
* `AUTH0_BASE_URL=...` - base url of frontend app like `http://localhost:3000`
* Create a regular web application in Auth0 dashboard
	* `AUTH0_CLIENT_ID=...`
	* `AUTH0_CLIENT_SECRET=...`
	* `AUTH0_ISSUER_BASE_URL=...` - the url of your Auth0 tenant domain like `https://app-name.auth0.com`. **Make sure you add `https://`**
	* `AUTH0_DOMAIN=...` - same as issuer base url above w/out `https://`
	* `AUTH0_SECRET=` - a long secret value used to encrypt the session cookie (can be generated using nodejs). *Not the same as client secret*

* Create an API applciation
	* `AUTH0_AUDIENCE=...` - API identifier from Auth0

* Machine to Machine YouTube Box API for the Management API
	*	Create a machine to machine application in Auth0 dashboard
	* `MM_AUTH0_CLIENT_ID=...` - 
	* `MM_AUTH0_CLIENT_SECRET=...`

In .env.development
* `API_URL=<URL to server>` - this server url in this project is `http://localhost:5000`

Example:
**env.local**
```
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=...

# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=...

# The base url of your application
AUTH0_BASE_URL=http://localhost:3000

# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL=...

# Same as AUTH0_ISSUER_BASE_URL without https://
AUTH0_DOMAIN=...

# A long, secret value used to encrypt the session cookie (Generated)
AUTH0_SECRET=...

AUTH0_AUDIENCE=...

# Machine to Machine YouTube Box API for the Management API
MM_AUTH0_CLIENT_ID=...
MM_AUTH0_CLIENT_SECRET=...

```