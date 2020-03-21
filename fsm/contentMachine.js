import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

const machine = Machine({
  id: 'contentMachine',
  initial: 'idle',
  context: {
    content: null,
    page: null
  },
  states: {
    idle: {
      on: {
        FETCH_PAGE: 'fetchingPage'
      }
    },
    fetchingPage: {
      invoke: {
        id: 'invoke-fetch-page',
        src: invokeFetchPage,
        onDone: {
          actions: assign({
            content: (context, event) => event.data
          }),
          target: 'idle'
        },
        onError: 'idle'
      }
    },
    done: {
      type: 'final'
    }
  }
})

async function invokeFetchPage(context, event) {
  // console.log(context, event)
  const {
    params: { page }
  } = event
  const { data } = await client.query({
    query: gql`
      query ${page} {
        ${page} {
          content(markdown: true)
        }
      }
    `
  })
  return data[page].content
}

export const contentMachine = generateVueMachine(machine)
