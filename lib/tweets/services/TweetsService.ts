import type { PrismaClient } from "@prisma/client";
import { Tweet } from "../Tweet";

export class TweetsService {
  constructor(private readonly db: PrismaClient) {}

  async create(tweet: Tweet) {
    if(tweet.content.length > 200){
      throw new Error('Exceeded max length');
    }

    return this.db.tweet.create({
      data: {
        content: tweet.content,
        likes: tweet.likes ?? 0,
        createdAt: tweet.createdAt,
      },
    });
  }

  async list(){
    return this.db.tweet.findMany({
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
  }

  async updateLike(tweet: Tweet) {  //parece correto
    return this.db.tweet.update({
      where: {
        id: tweet.content["id"],
      },
      data: {
        likes: tweet.content["likes"] + 1,
      },
    });
  }
}