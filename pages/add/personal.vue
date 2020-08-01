<template>
  <div class="max-w-xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Contribute</h1>
    </div>
    <template v-if="state.matches('personal')">
      <personal-form v-if="company" :company-id="companyId"></personal-form>
    </template>
  </div>
</template>

<script>
import PersonalForm from '@/components/PersonalForm'

export default {
  layout: 'pages',
  middleware: 'companyId',
  components: {
    PersonalForm,
  },
  data() {
    return {
      companyId: this.$route.query.id,
    }
  },
  computed: {
    state() {
      return this.$contributeMachine.current
    },
    companyService() {
      return this.$contributeMachine.context.companyMachine
    },
    personalService() {
      return this.$contributeMachine.context.personalMachine
    },
    companyContext() {
      return this.companyService.state.context
    },
    company() {
      return this.companyContext.company
    },
  },
  mounted() {
    this.$contributeMachine.send({ type: 'PERSONAL' })
    if (!this.company) {
      this.companyService.send({
        type: 'FETCH_COMPANY',
        params: { id: this.companyId },
      })
    }
  },
}
</script>

<style lang="scss" scoped></style>
