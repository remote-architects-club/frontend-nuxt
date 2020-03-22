<template>
  <div class="max-w-xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Contribute</h1>
    </div>
    <personal-form v-if="company" :company="company"></personal-form>
  </div>
</template>

<script>
import PersonalForm from '@/components/PersonalForm'

export default {
  layout: 'pages',
  components: {
    PersonalForm
  },
  mounted() {
    if (!this.company) {
      this.companyMachine.send({
        type: 'FETCH_COMPANY',
        params: { id: this.$route.params.id }
      })
    }
    this.$contributeMachine.send({ type: 'PERSONAL' })
  },
  computed: {
    companyMachine() {
      return this.$contributeMachine.context.companyMachine
    },
    company() {
      return this.companyMachine.state.context.company
    }
  }
}
</script>

<style scoped></style>
