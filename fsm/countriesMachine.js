import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

const machine = Machine({
  id: 'countriesMachine',
  initial: 'fetching',
  context: {
    countries: null
  },
  states: {
    fetching: {
      invoke: {
        id: 'invoke-fetch-countries',
        src: invokeFetchCountries,
        onDone: {
          actions: assign({
            countries: (context, event) => event.data
          }),
          target: 'done'
        },
        onError: 'failed'
      }
    },
    failed: {
      on: {
        FETCH: 'fetching'
      }
    },
    done: {
      type: 'final'
    }
  }
})

async function invokeFetchCountries() {
  const { data } = await client.query({
    query: gql`
      query country {
        country(order_by: { name: asc }) {
          iso
          name
        }
      }
    `
  })
  return data.country
}

export const countriesMachine = generateVueMachine(machine)
