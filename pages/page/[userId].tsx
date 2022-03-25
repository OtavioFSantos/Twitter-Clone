import type { NextPageContext } from "next";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import { PrismaClient } from "@prisma/client";
import styles from "../../styles/User.module.css";
import { Tweet } from "../../lib/tweets/components/Tweet";
import { useTimeline } from "../../lib/tweets/hooks/use-timeline";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function UserPage(props: Props) {
  const query = useTimeline(props.tweets);

  return (
    <div>
      <nav className={styles.navbar}>
        <img
          className={styles.user_image}
          src={query.data[0].user.image}
          alt="profile picture"
        />
        <a className={styles.user_name}>{query.data[0].user.name}</a>
        <a className={styles.user_email}>{query.data[0].user.email}</a>
        <a className={styles.user_tweets}>
          {Object.keys(query.data).length} tweets
        </a>
      </nav>

      <section className={styles.centralize}>
        <div className={styles.timeline}>
          {query.data.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const userId = ctx.query.userId;
  const prisma = new PrismaClient();
  const service = new TweetsService(prisma);
  const userTweets = await service.listUserTweets(JSON.stringify(userId));

  return {
    props: {
      tweets: userTweets.map((tweet) => ({
        ...tweet,
        createdAt: tweet.createdAt.toISOString(),
      })),
    },
  };
}
