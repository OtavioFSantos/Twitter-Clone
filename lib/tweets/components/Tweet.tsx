/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import styles from "./Tweet.module.css";
import type { Tweet as TweetType } from "@prisma/client";
import Link from "next/link";
import { useHandleLikes } from "../hooks/use-handle-like";

type Props = {
  tweet: {
    id: TweetType["id"];
    content: TweetType["content"];
    likes: TweetType["likes"];
    repliesCount: number;
    createdAt: string;
    replyToTweetId: string;
    likeList: {
      userId: string;
    }[];
    user: {
      email: string;
      image: string;
      name: string;
      id: string;
    };
  };
};

export function Tweet({ tweet }: Props) {
  const handleLike = useHandleLikes();
  console.log(tweet.repliesCount);

  const onClick = (ev) => {
    ev.stopPropagation();
    handleLike.mutate(tweet);
  };

  return (
    <Link href={`/tweet/${tweet.id}`}>
      <div className={styles.tweet} key={tweet.id}>
        <section className={styles.person}>
          <img
            className={styles.user_image}
            src={tweet.user.image}
            alt="profile picture"
          />
          <Link href={`/page/${tweet.user.id}`}>
            <a className={styles.user_info}>
              <span className={styles.user_name}>{tweet.user.name}</span>
              <span className={styles.user_email}> - {tweet.user.email}</span>
            </a>
          </Link>
        </section>

        <p className={styles.content}>{tweet.content}</p>

        <section className={styles.tweet_data}>
          <div>
            <div className={styles.likes}>
              <button
                type="button"
                className={styles.like_button}
                onClick={onClick}
              ></button>
              <span className={styles.like_number}>
                {tweet.likeList.length}
              </span>
            </div>

            <div className={styles.replies}>
              <span className={styles.replies_icon}></span>
              <span className={styles.replies_number}>
                {tweet.repliesCount}
              </span>
            </div>
          </div>
          <span className={styles.tweet_date}>
            {new Date(tweet.createdAt).toLocaleDateString()}
          </span>
        </section>
      </div>
    </Link>
  );
}
