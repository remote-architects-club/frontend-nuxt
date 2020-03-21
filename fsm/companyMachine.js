/* eslint-disable camelcase */
import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { toolsMachine } from './toolsMachine'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

export const companyMachine = Machine(
  {
    id: 'companyMachine',
    context: {
      company: null,
      companyId: null,
      foundCompanies: [],
      error: null,
      searchTerm: '',
      isFirstSearch: true,
      editingKey: null
    },
    initial: 'noCompany',
    states: {
      noCompany: {
        id: 'noCompany',
        initial: 'idle',
        states: {
          idle: {
            entry: ['resetAll'],
            on: {
              SEARCH: {
                target: 'searching'
              }
            }
          },
          searching: {
            id: 'searching',
            entry: ['toggleIsFirstSearch', 'setSearchTerm'],
            invoke: {
              id: 'search-companies',
              src: invokeSearchCompanies,
              onDone: {
                target: 'done',
                actions: ['setFoundCompanies']
              },
              onError: {
                target: 'idle',
                actions: ['setError']
              }
            }
          },
          done: {
            on: {
              '': [
                { target: 'found', cond: 'hasResults' },
                { target: 'notFound' }
              ]
            }
          },
          found: {
            on: {
              SEARCH: 'searching',
              SELECT: {
                target: '#hasCompany',
                actions: ['setCompanyId', 'resetSearch']
              },

              RESET: {
                target: 'idle',
                actions: ['resetSearch']
              }
            }
          },
          notFound: {
            on: {
              SEARCH: 'searching'
            }
          }
        },
        on: {
          ADD: {
            target: '#addCompany',
            actions: ['setName']
          }
        }
      },
      addCompany: {
        id: 'addCompany',
        initial: 'editing',
        states: {
          editing: {
            on: {
              SAVE_NEW: { target: 'saving' }
            }
          },
          saving: {
            invoke: {
              id: 'invoke-save-company',
              src: invokeSaveCompany,
              onDone: {
                target: 'done',
                actions: ['setCompany']
              },
              onError: 'editing'
            }
          },
          done: {
            on: {
              HAS_COMPANY: '#hasCompany'
            }
          }
        }
      },
      hasCompany: {
        id: 'hasCompany',
        initial: 'start',
        states: {
          start: {
            on: {
              '': [
                { target: 'idle', cond: 'hasCompany' },
                { target: 'fetching', cond: 'hasCompanyId' },
                { target: '#noCompany' }
              ]
            }
          },
          idle: {
            on: {
              EDIT: {
                target: 'editing',
                actions: ['setEditingKey']
              },
              FINISH: '#done'
            }
          },
          fetching: {
            id: 'fetching',
            invoke: {
              id: 'fetchCompany',
              src: invokeFetchCompany,
              onDone: {
                target: 'idle',
                actions: ['setCompany']
              },
              onError: {
                target: '#noCompany',
                actions: ['setError']
              }
            }
          },
          editing: {
            initial: 'starting',
            states: {
              starting: {
                on: {
                  '': [
                    {
                      target: 'editingRemotePolicy',
                      cond: 'isEditingKeyRemotePolicy'
                    },
                    {
                      target: 'editingTools',
                      cond: 'isEditingKeyTools'
                    },
                    { target: '#hasCompany.idle' }
                  ]
                }
              },
              editingRemotePolicy: {},
              editingTools: {
                invoke: {
                  id: 'toolsMachine',
                  src: toolsMachine,
                  data: (context) => ({
                    ...toolsMachine.context,
                    tools: context.company.office_tools,
                    companyId: context.companyId // the value you want to pass to child machine
                  }),
                  onDone: {
                    target: '#hasCompany.idle',
                    actions: ['updateToolsList']
                  }
                }
              }
            },
            on: {
              SAVE: '#hasCompany.saving',
              CANCEL_EDIT: '#hasCompany.idle'
            }
          },
          saving: {
            id: 'saving_edit',
            invoke: {
              id: 'save_edit',
              src: invokeSaveEdit,
              onDone: {
                target: 'idle',
                actions: ['updateCompany']
              },
              onError: {
                target: 'idle',
                actions: ['setError']
              }
            }
          }
        }
      },
      done: {
        id: 'done',
        type: 'final'
      }
    },
    on: {
      CANCEL: '#noCompany',
      RESTART: '#noCompany',
      FETCH_COMPANY: {
        target: '#hasCompany',
        actions: ['setCompanyId']
      }
    }
  },
  {
    actions: {
      setSearchTerm: assign({
        searchTerm: (_, event) => event.params.searchTerm
      }),
      setName: assign({
        company: (_, event) => {
          return {
            name: event.params.name
          }
        }
      }),
      setFoundCompanies: assign({
        foundCompanies: (context, event) => event.data
      }),
      setCompanyId: assign({
        companyId: (_, event) => event.params.id
      }),
      setCompany: assign({
        company: (_, event) => event.data,
        companyId: (_, event) => event.data.id
      }),
      setEditingKey: assign({
        editingKey: (_, event) => event.params.key
      }),
      updateCompany: assign({
        company: (context, event) => {
          console.log('action: updateSelectedCompany', event)
          const { affected_rows, returning } = event.data
          if (affected_rows === 0) return
          const { remote_since, remote_policy } = returning[0]
          context.company.remote_since = remote_since
          context.company.remote_policy = remote_policy
          return context.company
        }
      }),
      updateToolsList: assign({
        company: (context, event) => {
          context.company.office_tools = [...event.data.tools]
          return context.company
        }
      }),
      setError: assign({
        error: (_, event) => event.data
      }),
      toggleIsFirstSearch: assign({
        isFirstSearch: false
      }),
      resetSearch: assign({
        searchTerm: null,
        foundCompanies: [],
        error: null
      }),
      resetAll: assign({
        company: null,
        companyId: null,
        foundCompanies: [],
        error: null,
        searchTerm: '',
        isFirstSearch: true,
        editingKey: null
      })
    },
    guards: {
      hasResults: (context) => context.foundCompanies.length > 0,
      hasCompany: (context) => context.company,
      hasCompanyId: (context) => context.companyId,
      isEditingKeyRemotePolicy: (context) =>
        context.editingKey === 'remote_policy',
      isEditingKeyTools: (context) => context.editingKey === 'office_tools'
    }
  }
)
// ------------------------------------
// FUNCTIONS
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
  // console.log('invokeFetchCompany', context)
  return client
    .query({
      query: gql`
        query office {
          office_by_pk(id: "${context.companyId}") {
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
              wfh
              own_experience
              own_experience_text
              hardware
              colleagues
              tools
              tools_text
              company
              company_text
              not_wfh_reason
              not_wfh_reason_text
              final_tips
              created_at
            }
          }
        }
      `
    })
    .then(({ data }) => data.office_by_pk)
}

async function invokeSaveCompany(event) {
  // debugger
  const { name, city, country_iso, url, num_people } = event.company
  const { data } = await client.mutate({
    mutation: gql`
      mutation insert_office(
        $city: String
        $country_iso: String
        $name: String
        $num_people: Int
        $url: String
      ) {
        insert_office(
          objects: {
            city: $city
            country_iso: $country_iso
            name: $name
            num_people: $num_people
            url: $url
          }
        ) {
          affected_rows
          returning {
            id
            name
            num_people
            country_iso
            city
            remote_policy
            remote_since
            url
            office_tools(order_by: { tool: { name: asc } }) {
              tool {
                id
                name
                description
                url
              }
            }
          }
        }
      }
    `,
    variables: {
      name,
      city,
      country_iso,
      url,
      num_people
    }
  })
  return data.insert_office.returning[0]
}
async function invokeSaveEdit(context, event) {
  debugger
  console.log('invokeSaveEdit', context, event)
  const { companyId: id } = context
  const { remote_policy, remote_since } = event.params
  const { data } = await client.mutate({
    mutation: gql`
      mutation update_office(
        $id: uuid
        $remote_policy: String
        $remote_since: date
      ) {
        update_office(
          where: { id: { _eq: $id } }
          _set: { remote_policy: $remote_policy, remote_since: $remote_since }
        ) {
          affected_rows
          returning {
            remote_policy
            remote_since
          }
        }
      }
    `,
    variables: {
      id,
      remote_since,
      remote_policy
    }
  })
  return data.update_office
}

export const companyMachineVue = generateVueMachine(companyMachine)
