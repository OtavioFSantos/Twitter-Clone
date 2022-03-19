import type { PrismaClient } from "@prisma/client";

export class UserService {
  constructor(private readonly db: PrismaClient) {}

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
    });
  }
}
