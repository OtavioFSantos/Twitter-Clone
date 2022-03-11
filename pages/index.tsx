import { PrismaClient } from '@prisma/client'
import styles from "../styles/Index.module.css"
import { useForm } from 'react-hook-form'

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

const saveTweet = async (data) => {
  await fetch("/api/tweet", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export default function IndexPage(props: Props) {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      await saveTweet(data)
    } catch(err) {
      console.log(err)
    }
    
  }

  return (
      <main>
        <h1 className={styles.title}>Tweets: </h1>

        <article className={styles.centralize}>
          <section className={styles.new_tweet}>
            <form onSubmit={ handleSubmit(onSubmit) }>
              <textarea className={styles.input_tweet} id="" cols={30} rows={3} {...register("content", { required: true })}></textarea>
              <button className={styles.tweet_button}>Twittar</button>
            </form>
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