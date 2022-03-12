import { PrismaClient } from "@prisma/client";
import { useQuery } from "react-query";
import styles from "../styles/Index.module.css";
import { Tweet } from "../lib/tweets/components/Tweet";
import { CreateTweetForm } from "../lib/tweets/components/CreateTweetForm";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function IndexPage(props: Props) {
  const query = useQuery(
    "tweets",
    () => fetch("/api/tweet").then((res) => res.json()),
    {
      initialData: props.tweets,
    }
  );

  return (
    <main>
      <h1 className={styles.title}>Tweets: </h1>

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
  const tweets = await prisma.tweet.findMany({
    select: {
      id: true,
      content: true,
      likes: true,
      createdAt: true,
    },
  });

  return {
    props: {
      tweets: tweets.map((tweet) => ({
        ...tweet,
        createdAt: tweet.createdAt.toISOString(),
      })),
    },
  };
}
