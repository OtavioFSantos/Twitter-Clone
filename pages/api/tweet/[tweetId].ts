import { NextApiRequest, NextApiResponse } from "next";
import { TweetsService } from "../../../lib/tweets/services/TweetsService";
import { db } from "../../../prisma/db";
import { withSession } from "../authentication";

const tweetsService = new TweetsService(db);

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tweetId = req.query.tweetId as string;
  const replies = await tweetsService.listByReplyId(tweetId);

  res.status(200).json(replies);
});
