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
  const categoryId = req.query.categoryId;

  switch (req.method) {
    case "GET": {
      const response = await axios({
        method: "GET",
        url: `${process.env.API_URL}/api/v1.0/users/current_user/categories/${categoryId}?auth_id=${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookie,
        },
      });

      res.status(200).json(response.data);
      break;
    }
    // PUT - update category - TODO: move this file to folder - read here https://nextjs.org/docs/api-routes/dynamic-api-routes#index-routes-and-dynamic-api-routes
    case "PUT": {
      const name: string = req.body.name;
      const response = await axios({
        method: "PUT",
        url: `${process.env.API_URL}/api/v1.0/users/current_user/categories/${categoryId}?auth_id=${user.sub}`,
        data: { name },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookie,
        },
      });

      res.status(200).json(response.data);
      break;
    }
    // DELETE - delete category
    case "DELETE": {
      try {
        const response = await axios({
          method: "DELETE",
          url: `${process.env.API_URL}/api/v1.0/users/current_user/categories/${categoryId}?auth_id=${user.sub}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Cookie: cookie,
          },
        });

        res.status(200).json(response.data);
      } catch (e) {
        console.error("Category DELETE Error", e);
      }
      break;
    }
  }
});
