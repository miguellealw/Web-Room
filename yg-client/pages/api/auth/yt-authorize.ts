import { withApiAuthRequired } from "@auth0/nextjs-auth0";

// This just redirect to the API's endpoint to authorize with YouTube
export default withApiAuthRequired(async function ytAuthorize(req, res) {
  res.redirect(`${process.env.API_URL}/auth/v1.0/authorize`);
});
