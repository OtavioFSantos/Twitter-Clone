import type { PrismaClient } from "@prisma/client";
import { Tweet } from "../Tweet";

export class TweetsService {
  constructor(private readonly db: PrismaClient) {}

  async create(tweet: Tweet) {
    return this.db.tweet.create({
      data: {
        content: tweet.content,
        likes: tweet.likes ?? 0,
        createdAt: tweet.createdAt,
      },
    });
  }
}
