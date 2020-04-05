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
      totalCompanies: 0,
      resultsPerPage: 10
    },
    states: {
      idle: {
        on: {
          LOAD: {
            target: 'fetching'
          }
        }
      },
      fetching: {
        id: 'fetching',
        invoke: {
          id: 'fetch-companies',
          src: invokeFetchCompanies,
          onDone: {
            target: 'done',
            actions: assign({
              companies: (_, event) => event.data.companies,
              totalCompanies: (_, event) => event.data.totalCompanies
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
      done: {
        on: {
          '': [
            {
              target: 'found',
              cond: (context) => context.companies.length > 0
            },
            { target: 'notFound' }
          ]
        }
      },
      found: {
        on: {
          NEXT_PAGE: {
            target: 'fetching',
            actions: ['incrementOffset']
          },
          PREV_PAGE: {
            target: 'fetching',
            actions: ['decrementOffset']
          }
        }
      },
      notFound: {
        on: {
          RELOAD: {
            target: 'fetching'
          }
        }
      },
      failed: {
        on: {
          RELOAD: {
            target: 'fetching'
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

async function invokeFetchCompanies(context) {
  const { data } = await client.query({
    query: gql`
      query offices {
        office_aggregate(
          where: {
            _or: [
              { remote_policy: { _is_null: false } }
              { latest_experience: { _is_null: false } }
            ],
            publish: {_eq: true}
          }
        ) {
          aggregate {
            count
          }
        }
        office(
          where: {
            _or: [
              { remote_policy: { _is_null: false } }
              { latest_experience: { _is_null: false } }
            ],
            publish: {_eq: true}
          }
          order_by: { updated_at: desc }
          offset: ${context.offset}
          limit: ${context.resultsPerPage}
        ) {
          city
          country_iso
          id
          name
          num_people
          remote_policy
          remote_since
          url
          num_experiences
          latest_experience
          office_tools(order_by: { tool: { name: asc } }) {
            tool {
              id
              name
              url
            }
          }
          experiences(order_by: { created_at: desc }) {
            colleagues
            company
            company_text
            created_at
            final_tips
            hardware
            id
            name
            not_wfh_reason
            not_wfh_reason_text
            own_experience
            own_experience_text
            tools
            tools_text
            wfh
          }
        }
      }
    `
  })

  return {
    companies: data.office,
    totalCompanies: data.office_aggregate.aggregate.count
  }
}

// function invokeFetchCompanies(context) {
//   return client
//     .query({
//       query: gql`
//         query companies {
//           experience(
//             distinct_on: office_id
//             order_by: { office_id: desc, created_at: desc }
//             limit: ${context.resultsPerPage}
//             offset: ${context.offset}
//           ) {
//             office {
//               name
//               city
//               country_iso
//               id
//               num_people
//               url
//               remote_policy
//               remote_since
//               office_tools(order_by: { tool: { name: asc } }) {
//                 tool {
//                   id
//                   name
//                   url
//                   description
//                 }
//               }
//               experiences(order_by: { created_at: desc }) {
//                 id
//                 wfh
//                 own_experience
//                 own_experience_text
//                 hardware
//                 colleagues
//                 tools
//                 tools_text
//                 company
//                 company_text
//                 not_wfh_reason
//                 not_wfh_reason_text
//                 final_tips
//                 created_at
//               }
//             }
//           }
//         }
//       `
//     })
//     .then(({ data }) => data.experience.map(({ office }) => office))
// }

export const companiesMachine = generateVueMachine(machine)
