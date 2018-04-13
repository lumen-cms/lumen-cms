import {ApolloLink, concat, split} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'
import 'subscriptions-transport-ws' // this is the default of apollo-link-ws

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
    uri: process.env.GRAPHQL_SUBSRIPTION, // `wss://${process.env.GRAPHQL_SUBSRIPTION}/v1/${process.env.GRAPHQL_PROJECT_ID}`
    options: {
      reconnect: true,
      timeout: 40000,
      connectionParams: () => {
        const token = getTokenFromStorage() && getTokenFromStorage().token
        return {
          Authorization: token ? `Bearer ${token}` : null
        }
      }
    }
  }) : null

  const link = process.browser ? split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  ) : httpLink

  // return the an object with additional apollo-client options
  return {
    link: concat(authMiddleware, link),
    cache: new InMemoryCache()
  }
}
