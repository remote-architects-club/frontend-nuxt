<template>
  <div>
    <main class="max-w-4xl mx-auto">
      <form-step-0 @select="step2" />
    </main>
  </div>
</template>

<script>
import { formMachine } from '@/fsm/formMachine'
import FormStep0 from '@/components/FormStep0'
export default {
  layout: 'form',
  components: {
    FormStep0
  },
  computed: {
    state() {
      return formMachine.current
    },
    context() {
      return formMachine.context
    }
  },
  methods: {
    step2() {
      this.$router.push(`/add/${this.context.selectedCompanyId}`)
    }
  }
}
</script>

<style lang="scss"></style>
