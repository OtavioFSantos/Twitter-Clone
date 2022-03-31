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
    user: {
      email: string;
      image: string;
      name: string;
      id: string;
    };
  };
};

const handleLike = (data) =>
  fetch("/api/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export function Tweet({ tweet }: Props) {
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
    <Link href={`/page/${tweet.id}`}>
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
          <div className={styles.likes}>
            <button className={styles.like_button} onClick={onSubmit}></button>
            <span className={styles.like_number}>{tweet.likes}</span>
          </div>
          <span className={styles.tweet_date}>
            {new Date(tweet.createdAt).toLocaleDateString()}
          </span>
        </section>
      </div>
    </Link>
  );
}
