import type { DB } from "../../../prisma/db";

export class UserService {
  constructor(private readonly db: DB) {}

  async list() {
    return this.db.user.findMany({
      select: {
        id: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        followers: {
          select: {
            followerId: true,
          },
        },
        follower: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  findById(id: string) {
    return this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        followers: {
          select: {
            followerId: true,
          },
        },
        follower: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  findUserAsFollowerById(id: string) {
    return this.db.follower.findUnique({
      where: { userId: id },
    });
  }

  listFollowers(userId: string) {
    return this.db.followersOnUser.findMany({
      where: {
        userId: userId,
      },
      select: {
        follower: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  createFollower(id: string) {
    return this.db.follower.create({
      data: {
        userId: id,
      },
    });
  }

  deleteFollower(userId: string, followerId: string) {
    return this.db.followersOnUser.delete({
      where: {
        userId_followerId: {
          userId,
          followerId,
        },
      },
    });
  }

  updateRelation(userId: string, followerId: string) {
    return this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          connectOrCreate: {
            where: {
              userId_followerId: {
                followerId,
                userId,
              },
            },
            create: {
              followerId,
            },
          },
        },
      },
    });
  }
}
