import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

const machine = Machine(
  {
    id: 'form',
    initial: 'step_0',
    context: {
      foundCompanies: [],
      selectedCompanyId: null,
      selectedCompany: null,
      error: null,
      searchTerm: '',
      searching: false
    },
    states: {
      step_0: {
        initial: 'idle',
        states: {
          idle: {},
          searching: {
            id: 'searching',
            entry: ['setSearchTerm'],
            invoke: {
              id: 'search-companies',
              src: invokeSearchCompanies,
              onDone: {
                target: 'done',
                actions: assign({
                  foundCompanies: (context, event) => event.data
                })
              },
              onError: {
                target: 'not_found',
                actions: assign({
                  error: (context, event) => event.data
                })
              }
            }
          },
          done: {
            on: {
              '': [
                { target: 'found', cond: 'hasResults' },
                { target: 'not_found' }
              ]
            }
          },
          found: {
            on: {
              SELECT: {
                target: '#step_2',
                actions: ['setCompanyId', 'clearFoundCompanies']
              }
            }
          },
          not_found: {}
        },
        on: {
          SEARCH: {
            target: '.searching',
            cond: 'searchValid'
          },
          RESET: {
            target: '.idle',
            actions: ['clearFoundCompanies']
          },
          LOAD_STEP_2: {
            target: 'step_2.loading',
            actions: ['setCompanyId']
          }
        }
      },
      step_1: {},
      step_2: {
        id: 'step_2',
        initial: 'loading',
        states: {
          idle: {
            on: {
              LOAD_STEP_2: {
                target: 'loading',
                actions: ['setCompanyId']
              }
            }
          },
          loading: {
            id: 'loading',
            invoke: {
              id: 'fetch-company',
              src: invokeFetchCompany,
              onDone: {
                target: 'idle',
                actions: assign({
                  selectedCompany: (context, event) => event.data
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
          failed: {}
        }
      }
    }
  },
  {
    actions: {
      setSearchTerm: assign({
        searchTerm: (context, event) => {
          return event.params.searchTerm
        }
      }),
      clearFoundCompanies: assign({
        foundCompanies: []
      }),
      // setSelectedCompany: assign({
      //   selectedCompany: (context, event) => {
      //     return context.foundCompanies.find(
      //       (company) => company.id === event.params.id
      //     )
      //   }
      // }),
      setCompanyId: assign({
        selectedCompanyId: (context, event) => {
          return event.params.id
        }
      })
    },
    guards: {
      hasResults: (context) => context.foundCompanies.length > 0,
      searchValid: (context, event) => {
        return event.params.searchTerm.length > 0
      }
    }
  }
)
// -------------------------------------------
function invokeSearchCompanies(context) {
  return client
    .query({
      query: gql`
        query offices {
          search_offices(args: { search: "${context.searchTerm}" }) {
            id
            name
            city
            country_iso
          }
        }
      `
    })
    .then(({ data }) => data.search_offices)
}
function invokeFetchCompany(context) {
  console.log('invokeFetchCompany', context)
  return client
    .query({
      query: gql`
        query office {
          office_by_pk(id: "${context.selectedCompanyId}") {
            city
            country_iso
            id
            name
            num_people
            remote_policy
            remote_since
            url
            office_tools(order_by: {tool: {name: asc}}) {
              tool {
                id
                name
                url
                description
              }
            }
            experiences(order_by: {created_at: desc}) {
              id
              own_experience
              own_rating
              remote_since
              other_tools
              created_at
              company_rating
              company_policy
            }
          }
        }
      `
    })
    .then(({ data }) => data.office_by_pk)
}

export const formMachine = generateVueMachine(machine)
