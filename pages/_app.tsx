import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
