/* eslint-disable camelcase */
import { Machine, assign } from 'xstate'
import gql from 'graphql-tag'
import { generateVueMachine } from './generateVueMachine'
import { client } from '@/plugins/apollo'

export const machine = Machine(
  {
    id: 'jobsForm',
    initial: 'idle',
    context: {
      type: null,
    },
    states: {
      idle: {
        on: {
          INCREMENT: 'incrementing',
        },
      },
      incrementing: {
        invoke: {
          id: 'invoke-increment',
          src: invokeIncrement,
          onDone: {
            target: 'idle',
            actions: ['setType'],
          },
          onError: {
            target: 'failed',
            actions: ['setError'],
          },
        },
      },
      failed: {},
    },
    on: {},
  },
  {
    actions: {
      setError: assign({
        error: (_, event) => event.data,
      }),
      setType: assign({
        type: (_, event) => event.data.type,
      }),
    },
    guards: {},
  }
)

// ------------------------------------
// FUNCTIONS
async function invokeIncrement(_, event) {
  const {
    params: { type, ip, location },
  } = event
  const objects = [{ ip, location, type }]
  console.log(objects)
  const { data } = await client.mutate({
    mutation: gql`
      mutation increment($objects: [jobs_form_insert_input!]!) {
        insert_jobs_form(objects: $objects) {
          affected_rows
        }
      }
    `,
    variables: {
      objects,
    },
  })
  return { data, type }
}

export const jobsFormMachineVue = generateVueMachine(machine)
