import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "./CreateTweetForm.module.css";

const saveTweet = (data) =>
  fetch("/api/tweet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export function CreateTweetForm() {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation("create-tweet", saveTweet, {
    onSuccess: () => {
      setContent("");

      queryClient.invalidateQueries(["tweets"]);
    },
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    const data = {
      content,
    };

    mutation.mutate(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className={styles.input_tweet}
        maxLength={200}
        cols={30}
        rows={3}
        value={content}
        onChange={(ev) => setContent(ev.target.value)}
      />

      <button className={styles.tweet_button} disabled={!content}>
        {mutation.isLoading ? "Criando tweet..." : "Tweetar"}
      </button>
    </form>
  );
}
