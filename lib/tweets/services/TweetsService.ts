import { DB } from "../../../prisma/db";
import { Tweet } from "../Tweet";

export class TweetsService {
  constructor(private readonly db: DB) {}

  async create(tweet: Tweet, userId: string) {
    if (tweet.content.length > 200) {
      throw new Error("Exceeded max length");
    }

    return this.db.tweet.create({
      data: {
        userId,
        content: tweet.content,
        likes: tweet.likes ?? 0,
        createdAt: tweet.createdAt,
      },
    });
  }

  async list() {
    return this.db.tweet.findMany({
      select: {
        id: true,
        content: true,
        likes: true,
        createdAt: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async listByUserId(userId: string) {
    return this.db.tweet.findMany({
      select: {
        id: true,
        content: true,
        likes: true,
        createdAt: true,
        user: true,
      },
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateLike(tweet: Tweet) {
    return this.db.tweet.update({
      where: {
        id: tweet.content["id"],
      },
      data: {
        likes: tweet.content["likes"] + 1,
      },
    });
  }

  async findTweetById(tweetId: string) {
    return this.db.tweet.findUnique({
      select: {
        id: true,
        content: true,
        likes: true,
        createdAt: true,
        user: true,
      },
      where: {
        id: tweetId,
      },
    });
  }
}
