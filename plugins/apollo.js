import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI,
  // uri: 'https://remotearchitectsclub-api.herokuapp.com/v1/graphql',
  fetch
})
