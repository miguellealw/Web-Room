import { NextApiRequest } from "next";
import { serialize } from "cookie";

const SerializeCookie = (req: NextApiRequest): string => {
  let serializedCookie = "";
  for (const cookie in req.cookies) {
    const value = req.cookies[cookie];
    const stringValue =
      typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

		// Build serialized cookie
    serializedCookie += serialize(cookie, String(stringValue)) + ';';
  }

  return serializedCookie;
};

export default SerializeCookie;
