const { PrismaClient } = require("@prisma/client");

async function run() {
  const prisma = new PrismaClient();

  const otavio = await prisma.user.create({
    data: {
      email: "otavio@email.com",
      name: "Otávio",
    },
  });

  const gustavo = await prisma.user.create({
    data: {
      email: "gustavo@email.com",
      name: "Gustavo",
    },
  });

  const mamae = await prisma.user.create({
    data: {
      email: "luciara@email.com",
      name: "Mamis",
    },
  });

  try {
    const followerOtavio = await prisma.follower.create({
      data: { userId: otavio.id },
    });
    const followerGustavo = await prisma.follower.create({
      data: { userId: gustavo.id },
    });
    const followerMamae = await prisma.follower.create({
      data: { userId: mamae.id },
    });

    await prisma.user.update({
      where: { id: otavio.id },
      data: {
        followers: {
          connectOrCreate: {
            create: {
              followerId: followerGustavo.id,
            },
            where: {
              userId_followerId: {
                followerId: followerGustavo.id,
                userId: otavio.id,
              },
            },
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: otavio.id },
      data: {
        followers: {
          connectOrCreate: {
            create: {
              followerId: followerMamae.id,
            },
            where: {
              userId_followerId: {
                followerId: followerMamae.id,
                userId: otavio.id,
              },
            },
          },
        },
      },
    });

    let otavioFollowers = await prisma.user.findUnique({
      where: { id: otavio.id },
      select: {
        followers: {
          select: {
            follower: {
              select: {
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log(JSON.stringify(otavioFollowers, null, 2));

    await prisma.followersOnUser.delete({
      where: {
        userId_followerId: {
          userId: otavio.id,
          followerId: followerGustavo.id,
        },
      },
    });
    otavioFollowers = await prisma.followersOnUser.findMany({
      where: {
        userId: otavio.id,
      },
      select: {
        follower: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    console.log(JSON.stringify(otavioFollowers, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.user.delete({ where: { id: mamae.id } });
    await prisma.user.delete({ where: { id: otavio.id } });
    await prisma.user.delete({ where: { id: gustavo.id } });
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
