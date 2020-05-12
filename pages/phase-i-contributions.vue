<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Phase I: Contributions</h1>
    <!-- <div class="p-4 bg-white shadow-lg sm:p-8 content">
      ....
    </div> -->
    <company-list :companies-machine="companiesMachine" />
  </div>
</template>

<script>
import CompanyList from '@/components/CompanyList'
import { companiesMachine } from '@/fsm/companiesMachine'
export default {
  layout: 'pages',
  components: {
    CompanyList
  },
  data() {
    return {
      companiesMachine
    }
  },
  mounted() {
    this.companiesMachine.send({ type: 'LOAD' })
  }
}
</script>

<style lang="scss" scoped></style>
