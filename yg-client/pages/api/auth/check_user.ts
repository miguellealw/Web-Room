import {
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import axios from "axios";
import management from "../../../lib/ManagementClient";

// This endpoint will check if the user exists in our DB and if they are authed with YouTube
export default withApiAuthRequired(async function checkUser(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const { user } = getSession(req, res);

  try {
    const response = await axios(
      `${process.env.API_URL}/auth/v1.0/check_user/${user.sub}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
});
