import { UserService } from "../../../lib/users/services/UserService";
import { db } from "../../../prisma/db";

const userService = new UserService(db);

export default async function handleUserProfile(req, res) {
  const userEmail = req.query.userEmail;
  console.log("handleUSerProfile", { userEmail });
  const user = await userService.findByEmail(userEmail);

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(404).send("Not found");
}
