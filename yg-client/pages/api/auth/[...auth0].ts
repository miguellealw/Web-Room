import {
  handleAuth,
  handleLogin,
  handleCallback,
} from "@auth0/nextjs-auth0";
import management from "../../../lib/ManagementClient";

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
          const user = await management.users.get({ id: session.user.sub });
          console.log("USER in Callback", user);

          // TODO: call check_user to add user_id to my DB if not already there
          // `http://localhost:5000/auth/v1.0/check_user/${session.user.auth_id}`,

          // TODO: check if user has the app_metadata.is_authed_with_youtbe property
          // if(!user?.app_metadata.is_authed_with_youtbe) {
          //   // if they do not add it and set to false
          //   const updatedUser = await management.users.update({id: user.sub}, {
          //     app_metadata: {
          //       "is_authed_with_youtube": true
          //     }
          //   })

            // after redirect to server /auth/v1.0/authorize to auth user with YouTube
            // and set app_metadata.is_authed_with_youtube to true
            // res.redirect('http://localhost:5000/auth/v1.0/authorize')
          // }

          return session;
        },
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
