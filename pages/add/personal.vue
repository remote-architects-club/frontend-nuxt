<template>
  <div class="max-w-xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Contribute</h1>
    </div>
    <personal-form v-if="companyId" :company-id="companyId"></personal-form>
  </div>
</template>

<script>
import PersonalForm from '@/components/PersonalForm'

export default {
  layout: 'pages',
  middleware: 'companyId',
  components: {
    PersonalForm
  },
  data() {
    return {
      companyId: this.$route.query.id
    }
  },
  computed: {
    companyMachine() {
      return this.$contributeMachine.context.companyMachine
    }
  },
  mounted() {
    this.$contributeMachine.send({ type: 'PERSONAL' })
  }
}
</script>

<style lang="scss" scoped></style>
