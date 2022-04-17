import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import Head from "next/head";

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
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
