import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "../../../../lib/users/services/UserService";
import { getSession } from "next-auth/react";
import { db } from "../../../../prisma/db";

const userService = new UserService(db);

export default async function handleFollow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const session = await getSession({ req });

  const currentUser = await userService.findByEmail(session.user.email);
  const followUser = await userService.findById(userId);

  let currentUserAsFollower = await userService.findUserAsFollowerById(
    currentUser.id
  );

  if (
    followUser.followers.some((e) => e.followerId == currentUser.follower.id)
  ) {
    return res.status(500).send("error");
  }

  if (!currentUserAsFollower) {
    currentUserAsFollower = await userService.createFollower(currentUser.id);
  }

  await userService.updateRelation(userId, currentUserAsFollower.id);
  return res.status(201).json({});
}
