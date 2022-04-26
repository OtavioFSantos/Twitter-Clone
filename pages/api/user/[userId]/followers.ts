import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "../../../../lib/users/services/UserService";
import { db } from "../../../../prisma/db";

const userService = new UserService(db);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;

  const followers = await userService.listFollowers(userId);
  return res.status(200).json(followers);
}
