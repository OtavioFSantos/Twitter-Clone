import { useQuery, useMutation, useQueryClient } from "react-query";

export const useRepliesTimeline = (tweetId: string) =>
  useQuery(`tweetId/${tweetId}/replies`, () =>
    fetch(`/api/tweets/${tweetId}/replies`).then((res) => res.json())
  );

const createTweet = (data: { content: string; tweetId?: string }) =>
  fetch(`/api/tweets/protected/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: data.content,
      replyToTweetId: data.tweetId,
    }),
  }).then((res) => res.json());

export const useCreateTweet = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation(
    "createTweet",
    ({ content, tweetId }: { content: string; tweetId?: string }) =>
      createTweet({ content, tweetId }),
    {
      onSuccess: (_data, { tweetId }) => {
        onSuccess();
        queryClient.invalidateQueries(["tweets"]);
        queryClient.invalidateQueries([`tweetId/${tweetId}/replies`]);
      },
    }
  );
};
