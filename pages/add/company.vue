<template>
  <div>
    <div class="max-w-xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Contribute</h1>
      </div>
      <div v-if="companyState.matches('hasCompany.fetching') && !company">
        <div class="flex items-center justify-center p-12">
          <spinner color="#000" />
        </div>
      </div>
      <div v-else-if="company">
        <p class="mb-8">
          This is the information we have on your company. You can edit or
          complement, if you want.
        </p>
        <company-details-editing :company="company" class="mb-8" />
        <p
          class="mb-4 text-center"
          v-if="isEditing && companyState.matches('hasCompany.idle')"
        >
          <nuxt-link
            :to="`/company/${company.id}`"
            class="px-4 py-2 mx-4 text-sm font-bold transition duration-150 ease-in-out bg-white border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
            >done</nuxt-link
          >
          <nuxt-link
            :to="`/company/${company.id}`"
            class="px-4 py-2 mx-4 text-sm font-bold transition duration-150 ease-in-out border-b-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus"
            >cancel</nuxt-link
          >
        </p>
        <p
          class="text-center"
          v-else-if="!isEditing && companyState.matches('hasCompany.idle')"
        >
          <nuxt-link
            to="/add"
            class="px-4 py-2 mx-4 text-sm font-bold transition duration-150 ease-in-out border-b-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus"
            >back</nuxt-link
          >
          <button
            @click="openPersonal"
            class="px-4 py-2 text-sm font-bold transition duration-150 ease-in-out bg-white border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
          >
            All good, continue &rarr;
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyDetailsEditing from '@/components/CompanyDetailsEditing'

export default {
  layout: 'pages',
  middleware: 'companyId',
  name: 'ContributeCompany',
  components: {
    CompanyDetailsEditing
  },
  data() {
    return {
      companyId: this.$route.query.id,
      isEditing: this.$route.query.editing || false
    }
  },
  mounted() {
    if (this.companyState.matches('addCompany.done')) {
      return this.companyService.send({ type: 'HAS_COMPANY' })
    }
    if (!this.company) {
      return this.companyService.send({
        type: 'FETCH_COMPANY',
        params: { id: this.companyId }
      })
    }
  },
  computed: {
    companyService() {
      return this.$contributeMachine.context.companyMachine
    },
    companyContext() {
      return this.companyService.state.context
    },
    companyState() {
      return this.companyService.state
    },
    company() {
      return this.companyContext.company
    }
  },
  methods: {
    openPersonal() {
      this.$contributeMachine.send({ type: 'PERSONAL' })
      this.$router.push(`/add/personal?id=${this.companyId}`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
