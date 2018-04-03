import {ApolloLink, concat, split} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'
import 'subscriptions-transport-ws' // this is the default of apollo-link-ws

import {getTokenFromStorage} from '../util/authHelpers'

// make sure to export default
export default ({store}) => {
  // compose your Links here for the current client
  const httpLink = new HttpLink({uri: 'https://api.graph.cool/simple/v1/' + process.env.GRAPHQL_ALIAS})

  // here you can place your middleware. ctx has the context forwarded from Nuxt
  const authMiddleware = new ApolloLink((operation, forward) => {
    let token
    if (!process.server) {
      const storage = getTokenFromStorage()
      token = storage.token || null
      token && store.commit('SET_AUTH_TOKEN', token)
      storage.user && store.commit('SET_USER', storage.user)
    }
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    })
    return forward(operation)
  })

  // Set up subscription
  const wsLink = process.browser ? new WebSocketLink({
    uri: `wss://${process.env.GRAPHQL_SUBSRIPTION}/v1/${process.env.GRAPHQL_ALIAS}`,
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
