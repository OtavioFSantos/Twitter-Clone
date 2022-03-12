const { PrismaClient } = require("@prisma/client")

async function run() {
    const prisma = new PrismaClient()

    /*await prisma.tweet.create({ 
        data: {
            content: "La li lu lei lo",
            likes: 2
        }
    })*/

    /*await prisma.tweet.delete({
        where: {
            id: "30e566c9-f61d-4313-815b-fba076af56c1"
        }
    })*/
}

run().catch(err => {
  console.error(err);
  process.exit(1);
})