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
    const tweet = new Tweet(req.body.content);
    const newTweet = await tweetsService.create(tweet);
    return res.status(201).json(newTweet);
  }

  if (req.method === "GET") {
    //const tweets = await tweetsService.list()
    const tweets = await prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
        likes: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(tweets);
  }

  return res.status(404).send("Not Found");
}