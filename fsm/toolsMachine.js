/* eslint-disable camelcase */
import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

export const toolsMachine = Machine(
  {
    id: 'toolsMachine',
    initial: 'idle',
    context: {
      tools: [],
      tool: null,
      itemId: null,
      foundItems: [],
      error: null,
      searchTerm: '',
      isFirstSearch: true,
      companyId: null
    },
    states: {
      idle: {
        on: {
          FETCH: 'fetching',
          SEARCH: {
            target: 'searching'
          }
        }
      },
      searching: {
        id: 'searching',
        entry: ['toggleIsFirstSearch', 'setSearchTerm'],
        invoke: {
          id: 'invoke-search',
          src: invokeSearch,
          onDone: {
            target: 'done',
            actions: ['setFoundItems']
          },
          onError: {
            target: 'idle',
            actions: ['setError']
          }
        }
      },
      fetching: {
        invoke: {
          id: 'invoke-fetch',
          src: invokeFetch,
          onDone: {
            target: 'idle',
            actions: ['setTools']
          },
          onError: 'failedFetch'
        }
      },
      failedFetch: {
        on: {
          FETCH: 'fetching'
        }
      },
      done: {
        on: {
          '': [{ target: 'found', cond: 'hasResults' }, { target: 'notFound' }]
        }
      },
      found: {
        on: {
          SEARCH: 'searching',
          SELECT: {
            target: 'addingExisting',
            actions: ['setTool', 'resetSearch']
          },
          ADD_NEW: {
            target: 'addingNew',
            actions: ['resetSearch']
          },
          RESET: {
            target: 'idle',
            actions: ['resetSearch']
          }
        }
      },
      notFound: {
        on: {
          SEARCH: 'searching',
          ADD_NEW: {
            target: 'addingNew',
            actions: ['resetSearch']
          },
          RESET: {
            target: 'idle',
            actions: ['resetSearch']
          }
        }
      },
      removing: {
        id: 'removing',
        invoke: {
          id: 'invoke-remove-tool',
          src: invokeRemoveTool,
          onDone: {
            target: 'idle',
            actions: ['updateToolsList']
          },
          onError: 'idle'
        }
      },
      addingExisting: {
        invoke: {
          id: 'invoke-add-existing',
          src: invokeAddExisting,
          onDone: {
            target: 'idle',
            actions: ['updateToolsList']
          }
        }
      },
      addingNew: {
        invoke: {
          id: 'invoke-add-new',
          src: invokeAddNew,
          onDone: {
            target: 'idle',
            actions: ['setNewTool', 'updateToolsList']
          }
        }
      },
      end: {
        type: 'final',
        data: {
          tools: (context, event) => context.tools
        }
      }
    },
    on: {
      REMOVE: {
        target: 'removing',
        actions: ['setTool']
      },
      FINISH: 'end'
    }
  },
  {
    actions: {
      setSearchTerm: assign({
        searchTerm: (_, event) => event.params.searchTerm
      }),
      setFoundItems: assign({
        foundItems: (context, event) => event.data
      }),
      setTool: assign({
        tool: (_, event) => event.params.tool
      }),
      setNewTool: assign({
        tool: (_, event) => event.data
      }),
      setTools: assign({
        tools: (_, event) => event.data.tools
      }),
      updateToolsList: assign({
        tools: (context, event) => {
          if (event.type.includes('add')) {
            context.tools.push({ tool: context.tool })
            return context.tools
          } else if (event.type.includes('remove')) {
            return context.tools.filter(
              (item) => item.tool.id !== context.tool.id
            )
          }
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
        foundItems: [],
        error: null
      })
    },
    guards: {
      hasResults: (context) => context.foundItems.length > 0
    }
  }
)

// ------------------------------------
// FUNCTIONS
async function invokeFetch() {
  const { data } = await client.query({
    query: gql`
      query tools {
        tool(order_by: { name: asc }) {
          description
          id
          name
          url
          is_free
          tool_categories(order_by: { category_name: asc }) {
            category_name
          }
          office_tools {
            office {
              id
            }
          }
        }
      }
    `
  })
  return { tools: data.tool }
}
function invokeSearch(context) {
  return client
    .query({
      query: gql`
        query tools {
          search_tools(args: { search: "${context.searchTerm}" }) {
            id
            name
            url
            description
          }
        }
      `
    })
    .then(({ data }) => data.search_tools)
}

async function invokeAddExisting(context) {
  const { companyId: office_id } = context
  const { id: tool_id } = context.tool
  const result = await insertOfficeTool(office_id, tool_id)
  return result
}

function invokeRemoveTool(context, event) {
  const { companyId: office_id } = context
  const { id: tool_id } = event.params.tool
  return client
    .mutate({
      mutation: gql`
        mutation delete_office_tool($office_id: uuid, $tool_id: uuid) {
          delete_office_tool(
            where: {
              office_id: { _eq: $office_id }
              tool_id: { _eq: $tool_id }
            }
          ) {
            affected_rows
          }
        }
      `,
      variables: {
        office_id,
        tool_id
      }
    })
    .then(({ data }) => data.delete_office_tool)
}

async function invokeAddNew(context, event) {
  const { name } = event.params
  const newTool = await insertTool(name)
  const { companyId: office_id } = context
  const { id: tool_id } = newTool
  await insertOfficeTool(office_id, tool_id)
  return newTool
}

function insertTool(name) {
  return client
    .mutate({
      mutation: gql`
        mutation insert_tool($name: String) {
          insert_tool(objects: { name: $name }) {
            returning {
              description
              id
              name
              url
            }
          }
        }
      `,
      variables: {
        name
      }
    })
    .then(({ data }) => data.insert_tool.returning[0])
}

function insertOfficeTool(office_id, tool_id) {
  return client
    .mutate({
      mutation: gql`
        mutation insert_office_tool($office_id: uuid, $tool_id: uuid) {
          insert_office_tool(
            objects: { office_id: $office_id, tool_id: $tool_id }
          ) {
            affected_rows
          }
        }
      `,
      variables: {
        office_id,
        tool_id
      }
    })
    .then(({ data }) => data.insert_office_tool.affected_rows)
}
export const toolsMachineVue = generateVueMachine(toolsMachine)
