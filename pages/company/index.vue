<template>
  <div>
    <template v-if="state.matches('hasCompany.fetching') && !company">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-else-if="company">
      <p class="mb-2"><nuxt-link to="/" class="link">&larr; back</nuxt-link></p>
      <div class="p-4 mb-12 bg-white border-t-2 border-black shadow-lg sm:p-8">
        <company-details :company="company" />
        <section class="col-2">
          <div></div>
          <p class="pt-8 mb-12 text-center md:text-left">
            <btn-edit-company :company-id="company.id" />
          </p>
        </section>
        <div>
          <section class="col-2">
            <p class="mb-4 font-semibold">stories</p>

            <div>
              <template v-if="company.experiences.length > 0">
                <experience
                  v-for="experience in company.experiences"
                  :key="experience.id"
                  :experience="experience"
                  class="mb-8 "
                />
              </template>
              <template v-else>
                <p>No stories added yet.<br />👇Be the first and contribute!</p>
              </template>
            </div>
          </section>

          <section class="col-2">
            <div></div>
            <p class="py-6 text-center md:text-left">
              <btn-add-experience :company-id="company.id" />
            </p>
          </section>
        </div>
      </div>
    </template>
    <!-- <div
      v-else-if="company"
      class="p-4 mb-12 bg-white border-t-2 border-black shadow-lg sm:p-8"
    >
      <company-details :company="company" class="mb-8" />
      <p class="my-8 text-center">
        <btn-edit-company :company-id="company.id" />
      </p>
      <div
        v-if="company.experiences && company.experiences.length > 0"
        class="mb-8"
      >
        <h2 class="mb-8 text-xl font-bold">
          What are people saying about {{ company.name }}?
        </h2>

        <div
          v-for="experience in company.experiences"
          :key="experience.id"
          class="p-8 mb-8 bg-white shadow-lg"
        >
          <experience :experience="experience" />
        </div>
      </div>

      <p class="my-8 text-center md:text-left">
        <btn-add-experience :company-id="company.id" />
      </p>
    </div> -->
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
  middleware: 'companyId',
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
        params: { id: this.$route.query.id }
      })
    }
  }
}
</script>

<style lang="scss"></style>
