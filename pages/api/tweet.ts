// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== "POST"){
    return res.status(500).json({message: "Method not allowed"})
  }

  try {
    const data = JSON.parse(req.body)
    data.likes = 0
    await prisma.tweet.create({ data })
  } catch(err) {
    res.status(405).json({ message: "Something went wrong" })
  }
}