import { NextApiRequest, NextApiResponse } from "next";
import { TweetsService } from "../../../lib/tweets/services/TweetsService";
import { db } from "../../../prisma/db";

const tweetsService = new TweetsService(db);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tweetId = req.query.tweetId as string;

  const tweet = await tweetsService.findTweetById(tweetId);

  res.status(200).json(tweet);
}
