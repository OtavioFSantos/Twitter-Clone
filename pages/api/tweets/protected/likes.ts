import type { NextApiRequest, NextApiResponse } from "next";
import { TweetsService } from "../../../../lib/tweets/services/TweetsService";
import { db } from "../../../../prisma/db";
import { getSession } from "next-auth/react";
import { UserService } from "../../../../lib/users/services/UserService";

const tweetsService = new TweetsService(db);
const userService = new UserService(db);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const user = await userService.findByEmail(session.user.email);
    const like = await tweetsService.createLike(req.body.id, user.id);

    return res.status(201).json(like);
  }

  return res.status(404).send("Not Found");
}
