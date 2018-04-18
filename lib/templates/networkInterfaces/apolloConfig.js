import {ApolloLink, split, from} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'
import {onError} from 'apollo-link-error'
import {getMainDefinition} from 'apollo-utilities'
import 'subscriptions-transport-ws'

import {getTokenFromStorage} from '../util/authHelpers'

// make sure to export default
export default ({store, req, isHMR}) => {
  if (isHMR) return
  // compose your Links here for the current client
  const httpLink = new HttpLink({uri: 'https://api.graph.cool/simple/v1/' + process.env.GRAPHQL_PROJECT_ID})

  // here you can place your middleware. ctx has the context forwarded from Nuxt
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getTokenFromStorage(req) && getTokenFromStorage(req).token
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    })
    return forward(operation)
  })

  // Set up subscription
  const wsLink = process.browser ? new WebSocketLink({
    uri: process.env.GRAPHQL_SUBSCRIPTION, // `wss://${process.env.GRAPHQL_SUBSCRIPTION}/v1/${process.env.GRAPHQL_PROJECT_ID}`
    options: {
      reconnect: true,
      timeout: 30000,
      // lazy: true,
      connectionParams: () => {
        const token = getTokenFromStorage() && getTokenFromStorage().token
        return {
          Authorization: token ? `Bearer ${token}` : null
        }
      }
    }
  }) : null

  if (wsLink) {
    // fix for websocket timeout issue: https://github.com/apollographql/subscriptions-transport-ws/issues/377
    wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () => wsLink.subscriptionClient.maxConnectTimeGenerator.max
  }

  const link = process.browser ? split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  ) : httpLink

  const errorLink = onError((res) => {
    console.log(res)
    const {graphQLErrors, networkError} = res
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  // return the an object with additional apollo-client options
  return {
    link: from([errorLink, authMiddleware, link]),
    cache: new InMemoryCache()
  }
}
