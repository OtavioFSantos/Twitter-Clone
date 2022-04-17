import type { NextPageContext } from "next";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import styles from "../../styles/User.module.css";
import { Tweet } from "../../lib/tweets/components/Tweet";
import { useUserTimeline } from "../../lib/tweets/hooks/use-user-timeline";
import { UserService } from "../../lib/users/services/UserService";
import { db } from "../../prisma/db";
import { Navbar } from "../../lib/shared/components/Navbar";
import Head from "next/head";

const service = new TweetsService(db);
const userService = new UserService(db);

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function UserPage(props: Props) {
  const query = useUserTimeline(props.profile.id);

  return (
    <div>
      <Head>
        <title>{props.profile.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        ></link>
      </Head>
      <Navbar />
      <section className={styles.centralize}>
        <div className={styles.profile}>
          <img
            className={styles.user_image}
            src={props.profile.image}
            alt="profile picture"
          />
          <a className={styles.user_name}>{props.profile.name}</a>
          <a className={styles.user_email}>{props.profile.email}</a>
          <a className={styles.user_tweets}>
            {query.status === "success" && (
              <span>{Object.keys(query.data).length} tweets</span>
            )}
            {query.status === "error" && <span>Error</span>}
            {query.status === "loading" && <span>loading</span>}
          </a>
        </div>

        <div className={styles.timeline}>
          {query.status === "loading" && <span>Loading...</span>}
          {query.status === "error" && <span>Error {":-("}</span>}
          {query.status === "success" &&
            query.data.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const userId = ctx.query.userId as string;
  const userTweets = await service.listByUserId(userId);
  const userProfile = await userService.findById(userId);

  return {
    props: {
      profile: {
        id: userProfile.id,
        name: userProfile.name,
        image: userProfile.image,
        email: userProfile.email,
      },
      tweets: userTweets.map((tweet) => ({
        ...tweet,
        createdAt: tweet.createdAt.toISOString(),
      })),
    },
  };
}
