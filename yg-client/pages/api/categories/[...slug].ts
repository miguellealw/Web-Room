import {
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import axios from "axios";
import SerializeCookie from "../../../lib/SerializeCookies";

export default withApiAuthRequired(async function getCategory(req, res) {
  const cookie = SerializeCookie(req);

  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const { user } = getSession(req, res);
  const slug = req.query.slug;
  const categoryId = slug[0];
  // Route will contain add_channel or remove_channel
  const route = slug[1];

  switch (req.method) {
    case "POST": {
      if (route === "add_channel") {
        const response = await axios({
          method: "POST",
          url: `${
            process.env.API_URL
          }/api/v1.0/users/current_user/categories/${parseInt(
            categoryId
          )}/add_channel?auth_id=${user.sub}`,
          data: {
            name: req.body.name,
            yt_channel_id: req.body.yt_channel_id,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Cookie: cookie,
          },
        });

        res.status(200).json(response.data);
      } else if (route === "remove_channel") {
        const response = await axios({
          method: "POST",
          url: `${
            process.env.API_URL
          }/api/v1.0/users/current_user/categories/${parseInt(
            categoryId
          )}/remove_channel?auth_id=${user.sub}`,
          data: {
            name: req.body.name,
            yt_channel_id: req.body.yt_channel_id,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Cookie: cookie,
          },
        });

        res.status(200).json(response.data);
      } else {
        res.status(404);
      }

      break;
    }
  }
});
