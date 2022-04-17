import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export const useProfile = () => {
  const session = useSession();
  return useQuery(
    !!session.data && !!session.data.user
      ? `users/${session.data.user.email}`
      : null,
    () =>
      fetch(`/api/user/${encodeURIComponent(session.data.user.email)}`).then(
        (res) => res.json()
      )
  );
};
