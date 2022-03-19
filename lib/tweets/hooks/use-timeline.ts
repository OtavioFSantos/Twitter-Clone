import { useQuery } from 'react-query'

export const useTimeline = (tweets: any[]) => useQuery(
    "tweets",
    () => fetch("/api/tweet").then((res) => res.json()),
    {
      initialData: tweets,
    }
  );