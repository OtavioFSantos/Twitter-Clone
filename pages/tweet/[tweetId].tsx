import { Tweet } from "../../lib/tweets/components/Tweet";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import { CreateReplyForm } from "../../lib/tweets/components/CreateReplyForm";
import { db } from "../../prisma/db";
import { useRepliesTimeline } from "../../lib/tweets/hooks/use-replies";
import type { NextPageContext } from "next";
import styles from "../../styles/Tweet.module.css";
import { Navbar } from "../../lib/shared/components/Navbar";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import Head from "next/head";

const tweetService = new TweetsService(db);

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function TweetPage(props: Props) {
  const query = useRepliesTimeline(props.tweet.id);
  const { data: session } = useSession();

  return (
    <article>
      <Head>
        <title>
          {props.tweet.user.name} on Twitter: "{props.tweet.content}"
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        ></link>
      </Head>
      <Navbar />
      <section className={styles.centralize}>
        <div className={styles.timeline}>
          <Tweet key={props.tweet.id} tweet={props.tweet} />
        </div>
        <section className={styles.new_tweet}>
          {!!session ? (
            <CreateReplyForm key={props.tweet.id} replyId={props.tweet.id} />
          ) : (
            <Fragment></Fragment>
          )}
        </section>
        <span>
          <br />-<br />
        </span>
        <div className={styles.timeline_below}>
          {query.status === "loading" && <span>Loading...</span>}
          {query.status === "error" && <span>Error {":-("}</span>}
          {query.status === "success" &&
            query.data.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
        </div>
      </section>
    </article>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const tweetId = ctx.query.tweetId as string;
  const userTweet = await tweetService.findTweetById(tweetId);
  const tweetReplies = await tweetService.listByReplyId(tweetId);

  return {
    props: {
      tweet: {
        id: userTweet.id,
        content: userTweet.content,
        likes: userTweet.likes,
        createdAt: userTweet.createdAt.toISOString(),
        replyToTweetId: userTweet.replyToTweetId,
        user: userTweet.user,
        likeList: userTweet.likeList,
      },
      replies: tweetReplies.map((tweet) => ({
        ...tweet,
        createdAt: tweet.createdAt.toISOString(),
      })),
    },
  };
}
