import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Tweet } from "../../../../lib/tweets/Tweet";
import { TweetsService } from "../../../../lib/tweets/services/TweetsService";
import { UserService } from "../../../../lib/users/services/UserService";
import { db } from "../../../../prisma/db";

const tweetsService = new TweetsService(db);
const userService = new UserService(db);

export default async function handleCreateTweet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const user = await userService.findByEmail(session.user.email);

  const content = req.body.content;

  const newTweet = await tweetsService.create(
    content,
    user.id,
    req.body.replyToTweetId
  );
  return res.status(201).json(newTweet);
}
