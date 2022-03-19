import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Tweet } from "../../lib/tweets/Tweet";
import { TweetsService } from "../../lib/tweets/services/TweetsService";

const prisma = new PrismaClient();

const tweetsService = new TweetsService(prisma);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const tweet = new Tweet(req.body);
    const updatedTweet = await tweetsService.updateLike(tweet);
    return res.status(201).json(updatedTweet);
  }

  return res.status(404).send("Not Found");
}