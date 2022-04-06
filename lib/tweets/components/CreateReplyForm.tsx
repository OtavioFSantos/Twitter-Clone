import { useState } from "react";
import { useCreateTweet } from "../hooks/use-replies-timeline";
import styles from "./CreateReplyForm.module.css";
import { useQueryClient } from "react-query";

type Props = {
  replyId: string;
};

export function CreateReplyForm({ replyId }: Props) {
  const [content, setContent] = useState("");
  const createTweet = useCreateTweet();
  const queryClient = useQueryClient();

  const onSubmit = (ev) => {
    ev.preventDefault();

    createTweet.mutate(
      { content, tweetId: replyId },
      {
        onSuccess: () => {
          setContent("");
          queryClient.invalidateQueries([`tweetId/${replyId}`]);
        },
      }
    );
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
