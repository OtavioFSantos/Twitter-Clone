import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from 'next/router'

export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!!session && !!session.user) {
            router.push('/')
        }
    }, [session])


    return (
        <article>
            <h1>Login</h1>
            <button onClick={() => signIn("github")}>Login with Github</button>
        </article>
    )
}