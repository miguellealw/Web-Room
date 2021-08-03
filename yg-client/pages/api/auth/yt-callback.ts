import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import management from "../../../lib/ManagementClient";

// This will run after user is succesfully authorized with youtube
export default withApiAuthRequired(async function ytCallback(req, res) {
  // const { user, ...session } = getSession(req, res);
  const session = getSession(req, res);

  try {
    // Set users app_metadata in Auth0
    await management.users.update(
      { id: session.user.sub },
      {
        app_metadata: {
          is_authed_with_youtube: true,
        },
      }
    );

    session.isAuthedWithYouTube = true;

    res.redirect("/channels");
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
});
