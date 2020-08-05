<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Phase I: Contributions</h1>
    <company-list :companies-machine="companiesMachine" />
  </div>
</template>

<script>
import { companiesMachine } from '@/fsm/companiesMachine'
export default {
  layout: 'pages',
  data() {
    return {
      companiesMachine,
    }
  },
  mounted() {
    this.companiesMachine.send({ type: 'LOAD' })
  },
}
</script>

<style lang="scss" scoped></style>
