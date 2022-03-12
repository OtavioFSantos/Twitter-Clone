import styles from "./Tweet.module.css";
import type { Tweet as TweetType } from "@prisma/client";

type Props = {
  tweet: {
    id: TweetType["id"];
    content: TweetType["content"];
    likes: TweetType["likes"];
    createdAt: string;
  };
};

export function Tweet({ tweet }: Props) {
  return (
    <div className={styles.tweet} key={tweet.id}>
      <p>{tweet.content}</p>

      <div className={styles.tweet_data}>
        <span>{tweet.likes} Likes</span>
        <span>{new Date(tweet.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
