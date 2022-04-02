import { useQuery } from "react-query";

export const useRepliesTimeline = (tweetId: string) =>
  useQuery(`tweetId/${tweetId}`, () =>
    fetch(`/api/tweet/${tweetId}`).then((res) => res.json())
  );
