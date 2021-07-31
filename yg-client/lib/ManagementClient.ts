import { ManagementClient } from "auth0";

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.MM_AUTH0_CLIENT_ID,
  clientSecret: process.env.MM_AUTH0_CLIENT_SECRET,
  scope: "read:users update:users",
});

export default management;
