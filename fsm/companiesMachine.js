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
      resultsPerPage: 10,
      allOfficesCities: [],
      numExperiences: 0,
      numCities: 0,
      snippets: {}
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
              totalCompanies: (_, event) => event.data.totalCompanies,
              numExperiences: (_, event) => event.data.numExperiences,
              allOfficesCities: (_, event) => event.data.allOfficesCities,
              numCities: (_, event) => event.data.numCities,
              snippets: (context, event) => {
                context.snippets['ownExperience'] = event.data.randomExperience
                context.snippets['tools'] = event.data.randomTool
                context.snippets['toolsTop10'] = event.data.toolsTop10
                return context.snippets
              }
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
        companies:office(
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
          cityByCityId {
            id
            name
            lng
            lat
            country_iso
          }
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
        allOfficesCities:office(
          where: {
            _or: [
              { remote_policy: { _is_null: false } }
              { latest_experience: { _is_null: false } }
            ],
            city_id: {_is_null: false},
            publish: {_eq: true}
          }
          order_by: { updated_at: desc }
        ) {

          id
          name

          cityByCityId {
            id
            name
            lng
            lat
            country_iso
          }
        }
        experience_aggregate {
          aggregate {
            count
          }
        }
        city_aggregate {
          aggregate {
            count
          }
        }
        random_experience(order_by: {created_at: asc}) {
          id
          name
          office_id
          office_name
          own_experience
          own_experience_text
          created_at
          country_iso
          city
        }
        random_tool(order_by: {created_at: asc}, limit:4) {
          tools_text
          tools_array
          tools
          ordering
          office_name
          office_id
          name
          id
          created_at
          country_iso
          city
        }
        tool_top_10 {
          id
          name
          description
          url
          num_offices
        }
      }
    `
  })

  return {
    companies: data.companies,
    totalCompanies: data.office_aggregate.aggregate.count,
    allOfficesCities: data.allOfficesCities,
    numExperiences: data.experience_aggregate.aggregate.count,
    numCities: data.city_aggregate.aggregate.count,
    randomExperience: data.random_experience,
    randomTool: data.random_tool,
    toolsTop10: data.tool_top_10
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
