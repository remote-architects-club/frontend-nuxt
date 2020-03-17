import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI,
  fetch
})
