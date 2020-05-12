/* eslint-disable camelcase */
import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

const machine = new Machine(
  {
    id: 'blogMachine',
    context: {
      posts: [],
      latestPosts: [],
      post: null,
      error: null
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH_ALL: 'fetchingAll',
          FETCH_POST: 'fetchingPost',
          FETCH_LATEST: 'fetchingLatest'
        }
      },
      fetchingAll: {
        invoke: {
          id: 'invoke-fetch-all',
          src: invokeFetchAll,
          onDone: {
            actions: ['setPosts'],
            target: 'idle'
          },
          onError: {
            actions: ['setError'],
            target: 'failed'
          }
        }
      },
      fetchingLatest: {
        invoke: {
          id: 'invoke-fetch-latest',
          src: invokeFetchLatest,
          onDone: {
            actions: ['setLatestPosts'],
            target: 'idle'
          },
          onError: {
            actions: ['setError'],
            target: 'failed'
          }
        }
      },
      fetchingPost: {},
      failed: {
        on: {
          FETCH_ALL: 'fetchingAll',
          FETCH_LATEST: 'fetchingLatest',
          FETCH_POST: 'fetchingPost'
        }
      }
    }
  },
  {
    actions: {
      setPosts: assign({
        posts: (_, event) => event.data
      }),
      setLatestPosts: assign({
        latestPosts: (_, event) => event.data
      }),
      setError: assign({
        error: (_, event) => event.data
      })
    }
  }
)

async function invokeFetchAll() {
  let filter = ''
  if (process.env.NODE_ENV !== 'development')
    filter = 'filter: {_status: { eq: published }}'
  const { data } = await client.query({
    query: gql`
      query allPosts {
        allPosts(
          ${filter}
          orderBy: _firstPublishedAt_DESC
        ) {
          id
          title
          content(markdown: true)
          author {
            name
            id
            bio
            photo {
              url
            }
          }
          slug
          excerpt
          image {
            url
          }
          _firstPublishedAt
        }
        _allPostsMeta {
          count
        }
      }
    `
  })
  return data.allPosts
}
async function invokeFetchLatest() {
  let filter = ''
  if (process.env.NODE_ENV !== 'development')
    filter = 'filter: {_status: { eq: published }}'
  const { data } = await client.query({
    query: gql`
      query allPosts {
        allPosts(
          ${filter}
          orderBy: _firstPublishedAt_DESC
          first: 3
        ) {
          id
          title
          content(markdown: true)
          author {
            name
            id
            bio
            photo {
              url
            }
          }
          slug
          excerpt
          image {
            url
          }
          _firstPublishedAt
        }
        _allPostsMeta {
          count
        }
      }
    `
  })
  return data.allPosts
}

export const blogMachine = generateVueMachine(machine)
