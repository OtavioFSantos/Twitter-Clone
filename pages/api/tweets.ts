import type { NextApiRequest, NextApiResponse } from "next";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import { db } from "../../prisma/db";

const tweetsService = new TweetsService(db);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId;

  if (userId) {
    // busca os tweets do usuário
    const userTweets = await tweetsService.listByUserId(userId as string);
    return res.status(200).json(userTweets);
  }

  // busca os tweets de todo mundo
  const allTweets = await tweetsService.list();
  return res.status(200).json(allTweets);
}
