const { PrismaClient } = require("@prisma/client")

async function run() {
    const prisma = new PrismaClient()

    await prisma.tweet.create({ 
        data: {
            content: "Primeiro tweet.",
            likes: 5
        }
    })

    await prisma.tweet.create({ 
        data: {
            content: "Segundo tweet",
            likes: 2
        }
    })
}

run().catch(err => {
  console.error(err);
  process.exit(1);
})