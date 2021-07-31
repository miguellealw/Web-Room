import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function ytAuthorize(req, res) {
  res.redirect(`${process.env.API_URL}/auth/v1.0/authorize`);
});
