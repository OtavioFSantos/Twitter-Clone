import { useState } from "react";
import { useCreateTweet } from "../hooks/use-replies";
import styles from "./CreateReplyForm.module.css";

type Props = {
  replyId: string;
};

export function CreateReplyForm({ replyId }: Props) {
  const [content, setContent] = useState("");
  const createTweet = useCreateTweet(() => setContent(""));

  const onSubmit = (ev) => {
    ev.preventDefault();
    createTweet.mutate({ content, tweetId: replyId });
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className={styles.input_tweet}
        maxLength={200}
        cols={30}
        rows={4}
        value={content}
        placeholder="Reply to tweet..."
        onChange={(ev) => setContent(ev.target.value)}
      />

      <button className={styles.tweet_button} disabled={!content}>
        {createTweet.isLoading ? "Replying..." : "Reply"}
      </button>
    </form>
  );
}
