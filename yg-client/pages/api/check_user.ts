import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function checkUser(req, res) {
  const { accessToken } = await getAccessToken(req, res);
	console.log("REQUEST", req.query)
	console.log("TEST", `http://localhost:5000/api/v1.0/users/check_user/${req.query.auth_id}`)
  const response = await fetch(`http://localhost:5000/auth/v1.0/check_user/${req.query.auth_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const user = await response.json();
  res.status(200).json(user);
});