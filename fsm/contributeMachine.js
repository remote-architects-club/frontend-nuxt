import { Machine, spawn, assign } from 'xstate'
import { generateVueMachine } from './generateVueMachine'
import { companyMachine } from './companyMachine'
import { createPersonalMachine } from './personalMachine'

export const machine = Machine({
  id: 'contributeMachine',
  context: {
    companyMachine: null,
    personalMachine: null,
    company: null,
    personal: null
  },
  initial: 'company',
  states: {
    company: {
      entry: assign({
        companyMachine: () => spawn(companyMachine, { sync: true })
      })
    },
    personal: {
      entry: assign({
        personalMachine: (context) =>
          spawn(
            createPersonalMachine(
              context.companyMachine.state.context.companyId
            ),
            { sync: true }
          )
      }),
      on: {
        FINISH: 'done',
        action: assign({
          company: (context) => context.companyMachine.state.context.company,
          personal: (context) => context.personalMachine.state.context.formData
        })
      }
    },
    done: {
      type: 'final'
    },
    cancelled: {
      type: 'final'
    }
  },
  on: {
    PERSONAL: 'personal'
  }
})

export const contributeMachine = generateVueMachine(machine)
