import {
  handleAuth,
  getAccessToken,
  handleLogin,
  getSession,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { ManagementClient } from "auth0";

export default handleAuth({
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
          // console.log("session", session);

          var management = new ManagementClient({
            domain: process.env.AUTH0_DOMAIN as string,
            clientId: process.env.MM_AUTH0_CLIENT_ID,
            clientSecret: process.env.MM_AUTH0_CLIENT_SECRET,
            scope: "read:users update:users",
          });

          const users = await management.users.get({ id: session.user.sub });
          console.log("USERS", users);


          // TODO: check if user has the app_metadata.is_authed_with_youtbe property
          // if they do not add it and set to false
          // after redirect to http://localhost:5000/auth/v1.0/authorize
          // and set app_metadata.is_authed_with_youtube to true

          // const updatedUser = await management.users.update({id: user.sub}, {
          //   app_metadata: {
          //     "is_authed_with_youtube": false
          //   }
          // })


          // TODO: call check_user to add user_id to my DB if not already there
          // `http://localhost:5000/auth/v1.0/check_user/${session.user.auth_id}`,


          return session;
        },
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
