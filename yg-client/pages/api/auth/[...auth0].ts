import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import axios from "axios";
import management from "../../../lib/ManagementClient";

function NotAuthedWithYouTubeException() {
  // this.value = value;
  this.message = "User is not authorized with YouTube";
  this.toString = function () {
    return this.message;
  };
}

export default handleAuth({
  // This is here to access the access token using the getAccessToken
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          // audience: 'https://api.example.com/products', // or AUTH0_AUDIENCE
          audience: process.env.AUTH0_AUDIENCE, // or AUTH0_AUDIENCE
          // Add the `offline_access` scope to also get a Refresh Token
          scope: "openid profile email", // or AUTH0_SCOPE
        },
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },

  // After user is authenticated check if they are authorized with youtube
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        afterCallback: async (req, res, session, state) => {
          // Assign if authed with youtube to session
          const auth0User = await management.users.get({
            id: session.user.sub,
          });
          session.isAuthedWithYouTube =
            auth0User.app_metadata.is_authed_with_youtube;

          // Calling http://localhost:3000/api/auth/check_user will cause 401 unauthorized
          // error 
          await axios(
            `${process.env.API_URL}/auth/v1.0/check_user?auth_id=${session.user.sub}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          return session;
        },
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
