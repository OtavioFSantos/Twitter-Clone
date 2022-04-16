import Link from "next/link";
import { Tweet } from "../lib/tweets/components/Tweet";
import { CreateTweetForm } from "../lib/tweets/components/CreateTweetForm";
import { useTimeline } from "../lib/tweets/hooks/use-timeline";
import { TweetsService } from "../lib/tweets/services/TweetsService";
import styles from "../styles/Index.module.css";
import { db } from "../prisma/db";
import { useSession } from "next-auth/react";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

const service = new TweetsService(db);

export default function IndexPage(props: Props) {
  const query = useTimeline(props.tweets);
  const { data: session } = useSession();

  return (
    <main>
      <nav className={styles.navbar}>
        {!!session ? (
          <img
            className={styles.user_image}
            src={session.user.image}
            alt="profile picture"
          />
        ) : (
          <Link href="/login">
            <a className={styles.signin}>Sign in</a>
          </Link>
        )}
      </nav>
      <article className={styles.centralize}>
        <section className={styles.new_tweet}>
          <CreateTweetForm />
        </section>

        <section className={styles.timeline}>
          {query.data.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </section>
      </article>
    </main>
  );
}

export async function getServerSideProps() {
  const tweets = await service.list();

  return {
    props: {
      tweets: tweets.map((tweet) => ({
        ...tweet,
        createdAt: tweet.createdAt.toISOString(),
      })),
    },
  };
}
