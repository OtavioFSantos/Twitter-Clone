import { randomUUID } from 'crypto'
import styles from "../styles/Index.module.css"

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

export default function IndexPage(props: Props) {
  return (
    <main>
      <article>
        <h1 className={styles.title}>O número da sorte é: {props.number}</h1>
      </article>
    </main>
  )
}

export async function getServerSideProps() {
  const number = Math.floor(Math.random() * 100)

  return {
    props: {
      number
    }
  }
}