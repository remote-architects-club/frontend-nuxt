<template>
  <div>
    <header class="mb-12 text-center">
      <h2 class="mb-8 text-xl">
        The COVID-19 is forcing architecture offices around the world to
        implement remote working for the first time. Share your experience and
        support our colleagues.
      </h2>

      <div class="mt-5">
        <p>
          <nuxt-link to="/add" class="btn btn-large">
            contribute
          </nuxt-link>
        </p>

        <p class="text-sm">It's easy and anonymous.</p>
      </div>
    </header>
    <section data-cy="map">
      <client-only>
        <contribution-stats :companies-machine="companiesMachine" />
        <div class="h-4" />
        <company-map :companies-machine="companiesMachine" />
      </client-only>
    </section>
    <div class="h-8" />
    <section class="w-full mx-auto">
      <company-list :companies-machine="companiesMachine" />
    </section>
  </div>
</template>

<script>
import { companiesMachine } from '@/fsm/companiesMachine'

import CompanyList from '@/components/CompanyList'
import CompanyMap from '@/components/CompanyMap'
import ContributionStats from '@/components/ContributionStats'
export default {
  components: {
    ContributionStats,
    CompanyMap,
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

<style></style>
