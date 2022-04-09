import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export function withSession(callback) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session.user) {
      return res.status(401).send("Unauthorized");
    }
    return callback(req, res);
  };
}
