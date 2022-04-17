import { useState } from "react";
import { useCreateTweet } from "../hooks/use-replies-timeline";
import styles from "./CreateTweetForm.module.css";

export function CreateTweetForm() {
  const [content, setContent] = useState("");
  const createTweet = useCreateTweet(() => setContent(""));

  const onSubmit = (ev) => {
    ev.preventDefault();
    createTweet.mutate({ content });
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className={styles.input_tweet}
        maxLength={200}
        cols={30}
        rows={4}
        value={content}
        placeholder="What's happening?"
        onChange={(ev) => setContent(ev.target.value)}
      />

      <button className={styles.tweet_button} disabled={!content}>
        {createTweet.isLoading ? "Creating tweet..." : "Tweet"}
      </button>
    </form>
  );
}
