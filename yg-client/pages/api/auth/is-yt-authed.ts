import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import management from "../../../lib/ManagementClient";

export default withApiAuthRequired(async function isYTAuthed(req, res) {
  const session = getSession(req, res);

  // const auth0User = await management.users.get({
  //   id: session.user.sub,
  // });

  res.status(200).json({
    // isAuthedWithYouTube: auth0User.app_metadata.is_authed_with_youtube,
    isAuthedWithYouTube: session.isAuthedWithYouTube,
  });
});
