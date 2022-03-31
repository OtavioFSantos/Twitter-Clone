import { Tweet } from "../../lib/tweets/components/Tweet";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import { db } from "../../prisma/db";
import type { NextPageContext } from "next";
import styles from "../../styles/Tweet.module.css";
import Link from "next/link";

const tweetService = new TweetsService(db);

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function TweetPage(props: Props) {
  return (
    <article>
      <nav className={styles.navbar}>
        <Link href="../">
          <a className={styles.home}>home</a>
        </Link>
      </nav>
      <section className={styles.centralize}>
        <div className={styles.timeline}>
          <Tweet key={props.tweet.id} tweet={props.tweet} />
        </div>
        <span>
          <br />-<br />
        </span>
      </section>
    </article>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const tweetId = ctx.query.tweetId as string;
  const userTweet = await tweetService.findTweetById(tweetId);

  return {
    props: {
      tweet: {
        id: userTweet.id,
        content: userTweet.content,
        likes: userTweet.likes,
        createdAt: userTweet.createdAt.toISOString(),
        user: userTweet.user,
      },
    },
  };
}
