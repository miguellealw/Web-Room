import {
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import axios from "axios";
import SerializeCookie from "../../../lib/SerializeCookies";

export default withApiAuthRequired(async function getChannel(req, res) {
  const cookie = SerializeCookie(req);

  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const { user } = getSession(req, res);
  const channelId = req.query.channelId;

  switch (req.method) {
    case "GET": {
      try {
        const response = await axios({
          method: "GET",
          url: `${process.env.API_URL}/api/v1.0/users/current_user/channels/${channelId}?auth_id=${user.sub}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Cookie: cookie,
          },
        });

        res.status(200).json(response.data);
      } catch (e) {
        console.error("GET CHANNEL BY ID ERROR: ", e);

        // check if error is when user does not own channel
        // res.status(200);
        res.status(404)
        // if(e === 'Error: Request failed with status code 404')
      }
      break;
    }
  }
});
