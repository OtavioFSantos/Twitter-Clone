import { Tweet } from "../lib/tweets/components/Tweet";
import { CreateTweetForm } from "../lib/tweets/components/CreateTweetForm";
import { Navbar } from "../lib/shared/components/Navbar";
import { useTimeline } from "../lib/tweets/hooks/use-timeline";
import { TweetsService } from "../lib/tweets/services/TweetsService";
import styles from "../styles/Index.module.css";
import { db } from "../prisma/db";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import Head from "next/head";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

const service = new TweetsService(db);

export default function IndexPage(props: Props) {
  const query = useTimeline(props.tweets);
  const { data: session } = useSession();

  return (
    <main>
      <Head>
        <title>Home / Twitter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        ></link>
      </Head>
      <Navbar />
      <article className={styles.centralize}>
        <section className={styles.new_tweet}>
          {!!session ? <CreateTweetForm /> : <Fragment></Fragment>}
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
