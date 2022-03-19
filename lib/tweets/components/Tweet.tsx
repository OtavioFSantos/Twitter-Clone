import styles from "./Tweet.module.css";
import type { Tweet as TweetType } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import Link from "next/link";

type Props = {
  tweet: {
    id: TweetType["id"];
    content: TweetType["content"];
    likes: TweetType["likes"];
    createdAt: string;
  };
  userName: string;
  userId: string;
};

const handleLike = (data) =>
  fetch("/api/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export function Tweet({ tweet, userId, userName }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation("update-likes", handleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    mutation.mutate(tweet);
  };

  return (
    <div className={styles.tweet} key={tweet.id}>
      <div className={styles.person}>
        <Link href={`/page/${userId}`}>
          <a className={styles.name}>{userName}</a>
        </Link>
        <span> - {new Date(tweet.createdAt).toLocaleDateString()}</span>
      </div>

      <p className={styles.content}>{tweet.content}</p>

      <div className={styles.tweet_data}>
        <button className={styles.likeButton} onClick={onSubmit}></button>
        <span>
          {tweet.likes} {tweet.likes > 0 ? "Likes" : "Like"}
        </span>
      </div>
    </div>
  );
}
