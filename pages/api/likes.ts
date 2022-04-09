import type { NextApiRequest, NextApiResponse } from "next";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import { db } from "../../prisma/db";
import { getSession } from "next-auth/react";
import { UserService } from "../../lib/users/services/UserService";
import { withSession } from "./authentication";

const tweetsService = new TweetsService(db);
const userService = new UserService(db);

// criar uma função que recebe um callback e verifica a sessão do usuário
// antes de chamar o callback

// se a sessão existir, chama o callback, caso contrário, retorna um erro 401 não autorizado

// how to protect api endpoint next js
// callback hell, promise hell
// inversion of control, delegation, dependency injection

// export default withSession(async function handler(req, res) {
//  ..
//})

/**
 * @withSession
 * export default async function handler(req, res) {}
 */

/**
 * export function withSession(cb) {
 *    return async function (req, res) {
 *      const session = await getSession({ req })
 *      if (!session.user) // bloqueia o usuário e retorna o erro
 *
 *     return cb(req, res)
 *    }
 * }
 */

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session) {
      const user = await userService.findByEmail(session.user.email);
      const like = await tweetsService.createLike(req.body.id, user.id);

      return res.status(201).json(like);
    }
    return res.status(401).send("Unauthorized");
  }

  return res.status(404).send("Not Found");
});
