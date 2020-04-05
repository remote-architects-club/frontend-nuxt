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
      categories: [],
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
          FETCH_TOOL: 'fetchingTool',
          SEARCH: {
            target: 'searching'
          },
          SAVE_CATEGORIES: {
            target: 'savingCategories'
          },
          ADD_COMMENT: 'addingComment'
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
            actions: ['setTools', 'setCategories']
          },
          onError: 'failedFetch'
        }
      },
      fetchingTool: {
        invoke: {
          id: 'invoke-fetch-tool',
          src: invokeFetchTool,
          onDone: {
            target: 'idle',
            actions: ['setFetchedTool']
          },
          onError: 'idle'
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
      savingCategories: {
        invoke: {
          id: 'invoke-save-categories',
          src: invokeSaveCategories,
          onDone: {
            target: 'idle',
            actions: ['setToolCategories']
          },
          onError: 'idle'
        }
      },
      addingComment: {
        on: {
          CANCEL: 'idle',
          SAVE: 'savingComment'
        }
      },
      savingComment: {
        invoke: {
          id: 'invoke-save-comment',
          src: invokeSaveComment,
          onDone: {
            actions: ['updateToolComments'],
            target: 'idle'
          },
          // TODO: add error handling logic
          onError: 'addingComment'
        }
      },
      end: {
        type: 'final',
        data: {
          tools: (context) => context.tools
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
      setFetchedTool: assign({
        tool: (_, event) => event.data
      }),
      setNewTool: assign({
        tool: (_, event) => event.data
      }),
      setTools: assign({
        tools: (_, event) => event.data.tools
      }),
      setCategories: assign({
        categories: (_, event) => event.data.categories
      }),
      setToolCategories: assign({
        tools: (context, event) => {
          const { tool_id, newCategories } = event.data
          context.tools.find(
            (tool) => tool.id === tool_id
          ).tool_categories = newCategories.map((category_name) => {
            return { category_name }
          })
          return context.tools
        }
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
      }),
      updateToolComments: assign({
        tool: (context, event) => {
          context.tool.tool_comments.unshift(event.data)
          return context.tool
        }
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
      query tools_and_categories {
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
        category_tool(order_by: { name: asc }) {
          name
        }
      }
    `
  })
  return { tools: data.tool, categories: data.category_tool }
}
async function invokeFetchTool(context, event) {
  console.log(context, event)
  const { id } = event.params
  const { data } = await client.query({
    query: gql`
      query tool($id: uuid!) {
        tool_by_pk(id: $id) {
          id
          description
          is_free
          name
          url
          tool_categories(order_by: { category_name: asc }) {
            category_name
          }
          office_tools(order_by: { office: { name: asc } }) {
            office {
              id
              name
              city
              country_iso
            }
          }
          tool_comments(order_by: { created_at: desc }) {
            id
            name
            comment
            created_at
          }
        }
      }
    `,
    variables: {
      id
    }
  })
  return data.tool_by_pk
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

async function invokeSaveCategories(context, event) {
  const { tool_id, categories } = event.params
  const currentTool = context.tools.find((tool) => tool.id === tool_id)
  const existingCategories = currentTool.tool_categories.map(
    (cat) => cat.category_name
  )
  const categoriesToAdd = getCategoriesToAdd(existingCategories, categories)
  const categoriesToDelete = getCategoriesToDelete(
    existingCategories,
    categories
  )
  console.log('categoriesToAdd', categoriesToAdd)
  console.log('categoriesToDelete', categoriesToDelete)

  if (!categoriesToAdd && !categoriesToDelete) return existingCategories
  let mutation = ''
  if (categoriesToAdd.length) {
    for (const category of categoriesToAdd) {
      mutation += `insert_${
        category.split(' ')[0]
      }: insert_tool_category(objects: {category_name: "${category}", tool_id: "${tool_id}"}) {
            affected_rows
          }
        `
    }
    // console.log(mutation)

    const { data } = await client.mutate({
      mutation: gql`
        mutation add_tool_categories {
          ${mutation}
        }
      `
    })
    console.log(data)
  }
  if (categoriesToDelete.length) {
    mutation = ''
    for (const category of categoriesToDelete) {
      mutation += `remove_${
        category.split(' ')[0]
      }: delete_tool_category(where: {tool_id: {_eq: "${tool_id}"}, category_name: {_eq: "${category}"}}) {
          affected_rows
        }
      `
    }
    const { data } = await client.mutate({
      mutation: gql`
        mutation remove_tool_categories {
          ${mutation}
        }
      `
    })
    console.log(data)
  }

  return { newCategories: categories, tool_id }
}

function getCategoriesToAdd(existingCategories, newCategories) {
  if (existingCategories.length) {
    return newCategories.filter((cat) => !existingCategories.includes(cat))
  }
  return newCategories
}
function getCategoriesToDelete(existingCategories, newCategories) {
  if (existingCategories.length) {
    return existingCategories.filter((cat) => !newCategories.includes(cat))
  }
  return []
}

async function invokeSaveComment(context, event) {
  console.log('invokeSaveComment', context, event)
  const {
    tool: { id: tool_id }
  } = context
  const { name, comment } = event.params

  const { data } = await client.mutate({
    mutation: gql`
      mutation insert_comment($tool_id: uuid, $name: String, $comment: String) {
        insert_tool_comment(
          objects: { tool_id: $tool_id, name: $name, comment: $comment }
        ) {
          returning {
            id
            tool_id
            name
            comment
            created_at
          }
        }
      }
    `,
    variables: {
      tool_id,
      name,
      comment
    }
  })
  return data.insert_tool_comment.returning[0]
}

export const toolsMachineVue = generateVueMachine(toolsMachine)
