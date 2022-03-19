import styles from "./Tweet.module.css";
import type { Tweet as TweetType } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  tweet: {
    id: TweetType["id"];
    content: TweetType["content"];
    likes: TweetType["likes"];
    createdAt: string;
  };
};

const handleLike = (data) => 
  fetch("/api/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //tenho duvida se é assim
    },
    body: JSON.stringify(data),
  })


export function Tweet({ tweet }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation("update-likes", handleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  })

  const onSubmit = (ev) => {
    ev.preventDefault();
    mutation.mutate(tweet);
  }

  return (
    <div className={styles.tweet} key={tweet.id}>
      <div className={styles.person}>
        <span className={styles.name}>Anonymous</span>
        <span className={styles.username}>@anonymous · </span>
        <span>{new Date(tweet.createdAt).toLocaleDateString()}</span>
      </div>

      <p className={styles.content}>{tweet.content}</p>

      <div className={styles.tweet_data}>
        <button className={styles.likeButton} onClick={
          onSubmit/*() => mutation.mutate(tweet)*/
          }></button>
        <span>{tweet.likes} {tweet.likes > 0 ? "Likes" : "Like"}</span>
      </div>
    </div>
  );
}
