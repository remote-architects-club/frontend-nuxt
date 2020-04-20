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
      post: null,
      error: null
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH_ALL: 'fetchingAll',
          FETCH_POST: 'fetchingPost'
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
      fetchingPost: {},
      failed: {
        on: {
          FETCH_ALL: 'fetchingAll',
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
      setError: assign({
        error: (_, event) => event.data
      })
    }
  }
)

async function invokeFetchAll() {
  const { data } = await client.query({
    query: gql`
      query allPosts {
        allPosts(
          filter: { _status: { eq: published } }
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

export const blogMachine = generateVueMachine(machine)
