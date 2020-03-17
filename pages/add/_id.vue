<template>
  <div>
    <div v-if="state.matches('step_2.loading') && !company">
      <p>Loading...</p>
    </div>
    <div v-else-if="state.matches('step_2.idle') && company">
      <company-details :company="company" />
      <div class="h-8" />
      <form-step-2 />
      <div class="h-8" />
      <company-experiences :company="company" />
    </div>
  </div>
</template>

<script>
import { formMachine } from '@/fsm/formMachine'
import FormStep2 from '@/components/FormStep2'
import CompanyDetails from '@/components/CompanyDetails'
import CompanyExperiences from '@/components/CompanyExperiences'
export default {
  layout: 'form',
  components: {
    CompanyExperiences,
    CompanyDetails,
    FormStep2
  },
  computed: {
    state() {
      return formMachine.current
    },
    context() {
      return formMachine.context
    },
    company() {
      return this.context.selectedCompany
    }
  },
  mounted() {
    if (!this.company) {
      formMachine.send({
        type: 'LOAD_STEP_2',
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>

<style lang="scss"></style>
