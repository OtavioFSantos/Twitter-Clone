import { useMutation } from "react-query";

const handleLike = (data) =>
  fetch("/api/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const useHandleLikes = () => useMutation("update-likes", handleLike);
