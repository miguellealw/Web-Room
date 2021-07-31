import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import management from "../../../lib/ManagementClient";

// This will run after user is succesfully authorized with youtube
export default withApiAuthRequired(async function ytCallback(req, res) {
  const { user } = getSession(req, res);

  // Set users app_metadata in Auth0
  await management.users.update(
    { id: user.sub },
    {
      app_metadata: {
        is_authed_with_youtube: true,
      },
    }
  );

  res.redirect("/channels");
});
