import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Tweet } from "../../lib/tweets/Tweet";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import { UserService } from "../../lib/users/services/UserService";
import { db } from "../../prisma/db";

const tweetsService = new TweetsService(db);
const userService = new UserService(db);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!!session && !!session.user) {
      session.user.email;
      const user = await userService.findByEmail(session.user.email);
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const tweet = new Tweet(req.body.content);

      const newTweet = await tweetsService.create(tweet, user.id);
      return res.status(201).json(newTweet);
    }

    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (req.method === "GET") {
    const tweets = await tweetsService.list();
    return res.status(200).json(tweets);
  }

  return res.status(404).send("Not Found");
}
