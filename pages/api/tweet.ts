import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Tweet } from "../../lib/tweets/Tweet";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import { UserService } from "../../lib/users/services/UserService";
import { db } from "../../prisma/db";
import { withSession } from "./authentication";

const tweetsService = new TweetsService(db);
const userService = new UserService(db);

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const user = await userService.findByEmail(session.user.email);

    const tweet = new Tweet(req.body.content);

    const newTweet = await tweetsService.create(
      tweet,
      user.id,
      req.body.replyToTweetId
    );
    return res.status(201).json(newTweet);
  }

  if (req.method === "GET") {
    const tweets = await tweetsService.list();
    return res.status(200).json(tweets);
  }

  return res.status(404).send("Not Found");
});
