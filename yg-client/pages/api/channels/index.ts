import {
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import axios from "axios";
import SerializeCookie from "../../../lib/SerializeCookies";
import cors from "../cors";

export default withApiAuthRequired(async function getChannels(req, res) {
	const cookie = SerializeCookie(req)

  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const nextPageToken = req.query.nextPageToken;

  switch (req.method) {
    // GET YouTube Channels
    case "GET": {
      await cors(req, res);

      const response = await axios({
        method: "GET",
        url: `${process.env.API_URL}/api/v1.0/users/current_user/yt-channels${
          nextPageToken ? `?nextPageToken=${nextPageToken}` : ""
        }`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookie,
        },
      });
      res.status(200).json(response.data);
      break;
    }

  }
});
