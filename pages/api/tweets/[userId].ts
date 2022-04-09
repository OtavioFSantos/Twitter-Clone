import { NextApiRequest, NextApiResponse } from "next";
import { TweetsService } from "../../../lib/tweets/services/TweetsService";
import { db } from "../../../prisma/db";
import { withSession } from "../authentication";

const tweetsService = new TweetsService(db);

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const tweets = await tweetsService.listByUserId(userId);

  res.status(200).json(tweets);
});
