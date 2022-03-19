import { PrismaClient } from "@prisma/client";
import { Tweet } from "../lib/tweets/components/Tweet";
import { CreateTweetForm } from "../lib/tweets/components/CreateTweetForm";
import { useTimeline } from '../lib/tweets/hooks/use-timeline'
import { TweetsService } from '../lib/tweets/services/TweetsService'
import styles from "../styles/Index.module.css";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function IndexPage(props: Props) {
  const query = useTimeline(props.tweets)

  return (
    <main>
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
  const prisma = new PrismaClient();
  const service = new TweetsService(prisma);
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
