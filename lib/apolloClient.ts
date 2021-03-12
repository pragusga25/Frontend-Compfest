import { ApolloClient, HttpLink, split } from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache"
import fetch from "isomorphic-fetch"
import ws from "isomorphic-ws"
import React from "react"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { setContext } from "@apollo/client/link/context"

import nookies from "nookies"

const createHttpLink = () => {
  const httpLink = new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://oprec-backend.compfest.id/v1/graphql",
    credentials: "include",
    fetch,
  })
  return httpLink
}

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(
      process.env.NEXT_PUBLIC_WS_URL ||
        "ws://oprec-backend.compfest.id/v1/graphql",
      {
        lazy: true,
        reconnect: true,
      },
      ws
    )
  )
}

let initialToken: string

const getAuthLink = (initialToken: string) => {
  return setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token =
      "eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlpDUzM2TlRmRTY0OWNySk9EY2NDbldWVEg4UmduUjRDaUhURnFydzlUTTAifQ.eyJleHAiOjE2MTU2NDg1OTAsImlhdCI6MTYxNDQzODk5MCwic3ViIjoiMzQzZDU5ODctMzA2YS00ODE1LThkY2ItZmEyZmQwZmY1MjNiIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS11c2VyLWlkIjoiMzQzZDU5ODctMzA2YS00ODE1LThkY2ItZmEyZmQwZmY1MjNiIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhcHBsaWNhbnQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYXBwbGljYW50In19.GttBtNbVqCEMA2kJkFs1o_Sq_SUqLA9YRHqRYLm-o0pHuvLIM448tl36pnpy42NQet9grBfKeR-wTORgZXBpAfegGEcJi5fJnjP75ZuSvuhl8ekjme313Hu-Z1av9m3s6C0dR6opUtYJ6UVtsIHrotb3SEIzFOEIWcy_pcAQHSgmi30c6mK2k79u7Ey7HjKOnGB-e8QuCLueFmYXgSUSxsxRobDFMp43Q3qx-FLHFYOslDxsdMLXzOGj7KPM2NEX9Ts35W05CuVafjyWcpjEzxBGpoAR6RSc4kU-rehOzsmim0t7VoeVTqYzzCF1fOrWxoKuPJqB_qFQYICsVg8rvBnSM-fIFMc6hTddIpn56V2A9MhGLblLl9FR05qlfQwBp13O2kRckML7CBBJugzonuaG0lmA37J6IE3GKwzRhdDwO-rhgmZfD20ydQHv5pBUwUf6OrAEs8629eBNrq_RrEXpQimzy-_2mxbpcRamgR-CQhq2XydB6ew84oowezpMBZEC-aWWUdGaWJaFiP-bcR6j7eUhTgchWNJM7N0m4k349IgMS1ii_G-JFhkP3-YbYMfLjj3LR2-MnLbtX8w1XkikElqTKfrsK5udFQvJ8MJ9iWnaLo_Ti1cP-aUXZum-G5Be3foJd33p_N8jnXa8KQs-_My0LHZiHQx46Zix27M"
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })
}

let apolloClient: ApolloClient<NormalizedCacheObject>

export const createApolloClient = (token: string) => {
  const ssrMode = typeof window === "undefined"

  const l = !ssrMode
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          )
        },
        createWSLink(),
        createHttpLink()
      )
    : createHttpLink()

  const link = getAuthLink(token).concat(l)

  return new ApolloClient({ ssrMode, link, cache: new InMemoryCache() })
}

export function initializeApollo(initialState = {}, token: string) {
  const _token = token ?? nookies.get(null)?.token
  const _apolloClient = apolloClient ?? createApolloClient(_token)

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(initialState: any, token: string) {
  const store = React.useMemo(() => initializeApollo(initialState, token), [
    initialState,
    token,
  ])
  return store
}
