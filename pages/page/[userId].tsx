import type { NextPageContext } from "next";
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import styles from "../../styles/User.module.css";
import { Tweet } from "../../lib/tweets/components/Tweet";
import { useUserTimeline } from "../../lib/tweets/hooks/use-user-timeline";
import { UserService } from "../../lib/users/services/UserService";
import { db } from "../../prisma/db";
import Link from "next/link";

const service = new TweetsService(db);
const userService = new UserService(db);

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function UserPage(props: Props) {
  const query = useUserTimeline(props.profile.id);

  return (
    <div>
      <nav className={styles.navbar_top}>
        <Link href="../">
          <a className={styles.home}>Home</a>
        </Link>
      </nav>
      <nav className={styles.navbar}>
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
      </nav>

      <section className={styles.centralize}>
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
