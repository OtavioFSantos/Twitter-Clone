import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!!session && !!session.user) {
      router.push("/");
    }
  }, [session]);

  return (
    <article className={styles.login_page}>
      <h1 className={styles.login_h1}>
        Welcome!
        <br />
        Please login to continue
      </h1>
      <button className={styles.login_button} onClick={() => signIn("github")}>
        Login with Github
      </button>
    </article>
  );
}
