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
        companyMachine: (context, event) =>
          spawn(companyMachine, { sync: true })
      }),
      on: {
        PERSONAL: 'personal'
      }
    },
    personal: {
      entry: assign({
        personalMachine: (context, event) =>
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
          company: (context, event) =>
            context.companyMachine.state.context.company,
          personal: (context, event) =>
            context.personalMachine.state.context.formData
        })
      }
    },
    done: {
      type: 'final'
    },
    cancelled: {
      type: 'final'
    }
  }
})

export const contributeMachine = generateVueMachine(machine)
