import { useMutation, useQueryClient } from "react-query";

const handleLike = (data) =>
  fetch("/api/tweets/protected/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const useHandleLikes = () => {
  const queryClient = useQueryClient();

  return useMutation("update-likes", handleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });
};
