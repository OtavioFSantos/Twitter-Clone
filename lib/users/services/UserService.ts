import type { DB } from "../../../prisma/db";

export class UserService {
  constructor(private readonly db: DB) {}

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.db.user.findUnique({
      where: { id },
    });
  }
}
