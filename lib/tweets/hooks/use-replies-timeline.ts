import { useQuery, useMutation } from "react-query";

export const useRepliesTimeline = (tweetId: string) =>
  useQuery(`tweetId/${tweetId}`, () =>
    fetch(`/api/tweet/${tweetId}`).then((res) => res.json())
  );

const createTweet = (data: { content: string; tweetId?: string }) =>
  fetch("/api/tweet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: data.content,
      replyToTweetId: data.tweetId,
    }),
  }).then((res) => res.json());

export const useCreateTweet = () => useMutation("createTweet", createTweet);
