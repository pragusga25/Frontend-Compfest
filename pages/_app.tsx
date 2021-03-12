import type { AppProps } from "next/app"
import { GlobalStyles } from "twin.macro"
import { useApollo } from "../lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import "../styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState, pageProps.token)
  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default App
