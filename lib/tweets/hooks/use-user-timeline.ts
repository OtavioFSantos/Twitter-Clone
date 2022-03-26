import { useQuery } from "react-query";

export const useUserTimeline = (userId: string) =>
  useQuery("userId", () =>
    fetch(`/api/tweets/${userId}`).then((res) => res.json())
  );
