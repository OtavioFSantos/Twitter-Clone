import { PrismaClient } from '@prisma/client'
import styles from "../styles/Index.module.css"

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

export default function IndexPage(props: Props) {
  return (
      <main>
        <h1 className={styles.title}>Tweets: </h1>

        <article className={styles.centralize}>
          <section className={styles.new_tweet}>
            <textarea className={styles.textarea} rows={5} cols={35}></textarea>
            <button className={styles.tweet_button}>Twittar</button>
          </section>

          <section className={styles.timeline}>
            {props.tweets.map(tweet => (
              <div className={styles.tweet} key={tweet.id}>
                <p>{tweet.content}</p>

                <div className={styles.tweet_data}>
                  <span>{tweet.likes} Likes</span>
                  <span>{new Date(tweet.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </section>
        </article>
      </main>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  const tweets = await prisma.tweet.findMany({
    select: {
      id: true,
      content: true,
      likes: true,
      createdAt: true
    }
  })

  return {
    props: {
      tweets: tweets.map(tweet => ({ ...tweet, createdAt: tweet.createdAt.toISOString() }))
    }
  }
}