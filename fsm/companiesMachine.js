import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

const machine = Machine(
  {
    id: 'companies',
    initial: 'idle',
    context: {
      companies: null,
      error: null,
      offset: 0,
      resultsPerPage: 10
    },
    states: {
      idle: {
        on: {
          LOAD: {
            target: 'loading'
          }
        }
      },
      loading: {
        id: 'loading',
        invoke: {
          id: 'fetch-companies',
          src: invokeFetchCompanies,
          onDone: {
            target: 'loaded',
            actions: assign({
              companies: (context, event) => event.data
            })
          },
          onError: {
            target: 'failed',
            actions: assign({
              error: (context, event) => event.data
            })
          }
        }
      },
      loaded: {
        on: {
          NEXT_PAGE: {
            target: 'loading',
            actions: ['incrementOffset']
          },
          PREV_PAGE: {
            target: 'loading',
            actions: ['decrementOffset']
          }
        }
      },
      failed: {
        on: {
          RELOAD: {
            target: 'loading'
          }
        }
      }
    }
  },
  {
    actions: {
      incrementOffset: assign({
        offset: (context) => context.offset + context.resultsPerPage
      }),
      decrementOffset: assign({
        offset: (context) => context.offset - context.resultsPerPage
      })
    }
  }
)

function invokeFetchCompanies(context) {
  return client
    .query({
      query: gql`
        query companies {
          experience(
            distinct_on: office_id
            order_by: { office_id: desc, created_at: desc }
            limit: ${context.resultsPerPage}
            offset: ${context.offset}
          ) {
            office {
              name
              city
              country_iso
              id
              num_people
              url
              remote_policy
              remote_since
              office_tools(order_by: { tool: { name: asc } }) {
                tool {
                  id
                  name
                  url
                  description
                }
              }
              experiences(order_by: { created_at: desc }) {
                company_rating
                created_at
                id
                other_tools
                own_experience
                own_rating
                remote_since
              }
            }
          }
        }
      `
    })
    .then(({ data }) => data.experience.map(({ office }) => office))
}

export const companiesMachine = generateVueMachine(machine)
