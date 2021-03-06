import { useQuery } from "react-query";

export const useUserTimeline = (userId: string) =>
  useQuery(`userId/${userId}`, () =>
    fetch(`/api/tweets?userId=${userId}`).then((res) => res.json())
  );
