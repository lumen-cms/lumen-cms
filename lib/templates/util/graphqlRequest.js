import { UserRole } from './enum'
import { GraphQLClient } from 'graphql-request'

const staticToken = {
  moderator: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWIzODdmNjY1MmE1YjcxZWMyZmZlOTIxIiwiZW1haWwiOiJkamdhcm1zK21vZGVyYXRvckBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJNb2RlcmF0b3IiLCJsYXN0TmFtZSI6IlVzZXIiLCJwZXJtaXNzaW9ucyI6W3sicHJvamVjdElkIjoidGVzdCIsInJvbGUiOiJNT0RFUkFUT1IifV19LCJpYXQiOjE1MzA0MjkyODZ9._eXvtjqJWPGUtt86ApFI5x6NfPK1e6HPhcqkMIV2E2A'
}

const TestUser = {
  id: '12341234',
  email: 'djgarms+test@gmail.com',
  firstName: 'AVA Test FirstName',
  lastName: 'AVA Test LastName',
  permissions: [{
    projectId: 'test',
    role: UserRole.MODERATOR
  }]
}

/**
 *
 * @param {{token:string,projectId:string|string}} tokenObj
 * @return {GraphQLClient | request}
 */
function getGqlClient (tokenObj) {
  let projectId = 'test'
  if (!tokenObj) {
    return new GraphQLClient('http://localhost:4000', {
      headers: { projectId }
    })
  }
  let token
  if (typeof tokenObj === 'string') {
    token = tokenObj
  } else if (typeof tokenObj === 'object') {
    token = tokenObj.token
    projectId = tokenObj.projectId || projectId
  }
  const headers = {
    projectId
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return new GraphQLClient('http://localhost:4000', {
    headers
  })
}

function graphqlRequest (gql, variables, token) {
  const gqlClient = getGqlClient(token)
  return gqlClient.request(gql, variables)
}

export {
  graphqlRequest,
  staticToken,
  TestUser
}
