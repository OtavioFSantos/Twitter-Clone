import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "./CreateReplyForm.module.css";

type Props = {
  replyId: {
    id: string;
  };
};

const saveTweet = (data) =>
  fetch("/api/tweet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export function CreateReplyForm({ replyId }: Props) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation("create-reply", saveTweet, {
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    const data = {
      content,
      replyToTweetId: replyId.id,
    };

    mutation.mutate(data);
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
        {mutation.isLoading ? "Replying..." : "Reply"}
      </button>
    </form>
  );
}
