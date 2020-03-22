<template>
  <div class="max-w-xl mx-auto">
    <template v-if="state.matches('hasCompany.fetching') && !company">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <div
      v-else-if="company"
      class="p-4 mb-12 bg-white border-t-2 border-black shadow-lg sm:p-8"
    >
      <company-details :company="company" class="mb-8" />
      <p class="my-8 text-center">
        <btn-edit-company :company-id="company.id" />
      </p>
      <div
        class="mb-8"
        v-if="company.experiences && company.experiences.length > 0"
      >
        <h2 class="mb-8 text-xl font-bold">
          What are people saying about {{ company.name }}?
        </h2>

        <div
          class="p-8 mb-8 bg-white shadow-lg"
          v-for="experience in company.experiences"
          :key="experience.id"
        >
          <experience :experience="experience" />
        </div>
      </div>

      <p class="my-8 text-center md:text-left">
        <btn-add-experience :company-id="company.id" />
      </p>
    </div>
  </div>
</template>

<script>
import CompanyDetails from '@/components/CompanyDetails'
import { companyMachineVue } from '@/fsm/companyMachine'
import Experience from '@/components/Experience'
import BtnEditCompany from '@/components/BtnEditCompany'
import BtnAddExperience from '@/components/BtnAddExperience'
export default {
  layout: 'pages',
  components: {
    BtnAddExperience,
    BtnEditCompany,
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
