import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import styles from "./Navbar.module.css";
import { signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className={styles.navbar}>
      <Link href="../">
        <a className={styles.home}>Home</a>
      </Link>
      <div>
        <h3 className={styles.title}>Twitter Clone</h3>
      </div>
      <section className={styles.section}>
        {!!session ? (
          <Fragment>
            <div className={styles.sign} onClick={() => signOut()}>
              Sign out
            </div>
            <img
              className={styles.user_image}
              src={session.user.image}
              alt="profile picture"
            />
          </Fragment>
        ) : (
          <Fragment>
            <Link href="/login">
              <a className={styles.sign}>Sign in</a>
            </Link>
            <img
              className={styles.user_image}
              src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
              alt="default picture"
            />
          </Fragment>
        )}
      </section>
    </nav>
  );
}
