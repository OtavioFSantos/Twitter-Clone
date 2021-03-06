/* eslint-disable @next/next/no-img-element */
import { TweetsService } from "../../lib/tweets/services/TweetsService";
import styles from "../../styles/User.module.css";
import { Tweet } from "../../lib/tweets/components/Tweet";
import { useUserTimeline } from "../../lib/tweets/hooks/use-user-timeline";
import { UserService } from "../../lib/users/services/UserService";
import { db } from "../../prisma/db";
import { Navbar } from "../../lib/shared/components/Navbar";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { NextPageContext } from "next";

const service = new TweetsService(db);
const userService = new UserService(db);

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

const useFollowerMutation = (userId: string) => {
  return useMutation(`follow-user-${userId}`, () =>
    fetch(`/api/user/${userId}/follow`, {
      method: "PATCH",
    }).then((res) => res.json())
  );
};

const useUnfollowerMutation = (userId: string) => {
  return useMutation(`unfollow-user-${userId}`, () =>
    fetch(`/api/user/${userId}/unfollow`, {
      method: "PATCH",
    }).then((res) => res.json())
  );
};

export default function UserPage(props: Props) {
  const query = useUserTimeline(props.profile.id);
  const { data: session } = useSession();
  const followerMutation = useFollowerMutation(props.profile.id);
  const unfollowerMutation = useUnfollowerMutation(props.profile.id);

  const followUser = () => {
    followerMutation.mutate();
  };

  const unfollowUser = () => {
    unfollowerMutation.mutate();
  };

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
          <a className={styles.user_followers}>
            {query.status === "success" && (
              <span>{props.profile.followers.length} followers</span>
            )}
            {query.status === "error" && <span>Error</span>}
            {query.status === "loading" && <span>loading</span>}
          </a>
          <a className={styles.user_tweets}>
            {query.status === "success" && (
              <span>{Object.keys(query.data).length} tweets</span>
            )}
            {query.status === "error" && <span>Error</span>}
            {query.status === "loading" && <span>loading</span>}
          </a>
          <section>
            {!!session &&
              session.user.email != props.profile.email &&
              !props.profile.followers.some(
                (e) => e.followerId == props.session.id
              ) && (
                <button
                  type="button"
                  className={styles.follow_button}
                  onClick={followUser}
                >
                  {followerMutation.isLoading ? "Loading" : "Follow"}
                </button>
              )}
            {!!session &&
              props.profile.followers.some(
                (e) => e.followerId == props.session.id
              ) && (
                <button
                  type="button"
                  className={styles.follow_button}
                  onClick={unfollowUser}
                >
                  {followerMutation.isLoading ? "Loading" : "Unfollow"}
                </button>
              )}
          </section>
        </div>

        <div className={styles.timeline}>
          {query.status === "loading" && <span>Loading...</span>}
          {query.status === "error" && <span>Error</span>}
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
  const session = await getSession(ctx);
  const userSession = await userService.findByEmail(session.user.email);

  return {
    props: {
      profile: {
        id: userProfile.id,
        name: userProfile.name,
        image: userProfile.image,
        email: userProfile.email,
        followers: userProfile.followers,
      },
      tweets: userTweets.map((tweet) => ({
        ...tweet,
        createdAt: tweet.createdAt.toISOString(),
      })),
      session: {
        id: userSession.follower.id,
      },
    },
  };
}
