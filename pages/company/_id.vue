<template>
  <div>
    <div v-if="state.matches('hasCompany.fetching') && !company">
      <p>Loading...</p>
    </div>
    <div v-else-if="company">
      <company-details :company="company" class="mb-8" />
      <div
        class="mb-8"
        v-if="company.experiences && company.experiences.length > 0"
      >
        <h2 class="mb-8 text-xl font-bold">
          What are people saying about {{ company.name }}
        </h2>
        <div
          class="p-8 mb-8 bg-white shadow-lg"
          v-for="experience in company.experiences"
          :key="experience.id"
        >
          <experience :experience="experience" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyDetails from '@/components/CompanyDetails'
import { companyMachineVue } from '@/fsm/companyMachine'
import Experience from '@/components/Experience'
export default {
  layout: 'pages',
  components: {
    Experience,
    CompanyDetails
  },
  computed: {
    context() {
      return companyMachineVue.context
    },
    state() {
      return companyMachineVue.current
    },
    company() {
      return this.context.company
    }
  },
  mounted() {
    if (!this.company) {
      companyMachineVue.send({
        type: 'FETCH_COMPANY',
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>

<style lang="scss"></style>
