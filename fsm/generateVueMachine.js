import Vue from 'vue'
import { interpret } from 'xstate'

export const generateVueMachine = (machine) => {
  return new Vue({
    data() {
      return {
        current: machine.initialState,
        context: machine.context,
        service: interpret(machine),
      }
    },
    created() {
      this.service
        .onTransition((state) => {
          this.current = state
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              `[${machine.id.toUpperCase()} STATE]`,
              this.current.value
            )
          }
        })
        .onChange((updatedContext) => {
          this.context = updatedContext
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              `[ ${machine.id.toUpperCase()} CONTEXT ]`,
              updatedContext
            )
          }
        })
        .start()
    },
    methods: {
      send(event) {
        this.service.send(event)
      },
    },
  })
}
