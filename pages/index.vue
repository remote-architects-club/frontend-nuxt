<template>
  <div>
    <header class="mb-12 text-center">
      <h2 class="mb-8 text-xl">
        More and more companies around the world are realizing, rather forcibly,
        that remote work in architecture is possible. Let's help make it a
        long-lasting reality.
      </h2>

      <!-- <div class="mt-5">
        <p>
          <nuxt-link to="/add" class="btn btn-large">
            contribute
          </nuxt-link>
        </p>

        <p class="text-sm">It's easy and anonymous.</p>
      </div> -->
    </header>
    <section data-cy="phase-ii">
      <section data-cy="phase-ii-intro">
        <h2 class="section-title">
          Phase II
        </h2>
        <div class="h-8" />
        <p class="mb-4">
          With the current easing of lockdown restrictions, architects all over
          the world are slowly starting to go back to their offices.
        </p>
        <p class="mb-4 font-bold">
          Now we want to understand how this is gonna go.
        </p>
        <p class="mb-4">
          Our open-floor offices suddenly seem immensely inadequate to our new
          paranoid reality. Will companies still maintain working-from-home as a
          viable alternative to their employees? What will change in our
          professional relationships and processes?
        </p>
        <p class="mb-4">
          We'll soon publish a new, small survey to gauge the situation.
        </p>
      </section>
    </section>
    <div class="mt-10 mb-16 border-t-2 border-black"></div>
    <section data-cy="latest-posts">
      <latest-posts />
    </section>
    <div class="h-16" />
    <section data-cy="phase-i">
      <section data-cy="phase-i-intro">
        <h2 class="section-title">
          Phase I
        </h2>
        <div class="h-8" />
        <p class="mb-4">
          Back in February and March, as the world realized how serious the
          COVID-19 pandemic was, architecture companies scrambled to adapt as
          their employees transitioned to working-from-home.
        </p>
        <p class="mb-4">
          For about 1,5 months, we asked architects all over the world to share
          their experiences during this transition.
        </p>
        <p class="mb-4">
          Almost 100 contributions later,
          <nuxt-link
            to="/blog/first-month-recap-what-did-we-learn"
            class="font-bold link"
            >this is what we noticed</nuxt-link
          >. Below, you'll find a snapshot of the submitted stories, or you can
          <nuxt-link to="/phase-i-contributions" class="font-bold link"
            >read them all in full here</nuxt-link
          >.
        </p>
      </section>
      <div class="h-16" />
      <section data-cy="map">
        <client-only>
          <contribution-stats :companies-machine="companiesMachine" />
          <div class="h-4" />
          <company-map :companies-machine="companiesMachine" />
        </client-only>
      </section>
      <div class="h-8" />
      <section data-cy="snippets">
        <home-snippets :companies-machine="companiesMachine" />
      </section>
      <div class="h-16" />
      <section class="w-full mx-auto" data-cy="contribution-list">
        <p class="mb-4 font-bold text-center">
          <nuxt-link to="/phase-i-contributions" class="font-bold link"
            >Read all entries</nuxt-link
          >
          &rarr;
        </p>
      </section>
    </section>
  </div>
</template>

<script>
import { companiesMachine } from '@/fsm/companiesMachine'

import CompanyMap from '@/components/CompanyMap'
import ContributionStats from '@/components/ContributionStats'
import HomeSnippets from '@/components/HomeSnippets'
import LatestPosts from '@/components/LatestPosts'
export default {
  components: {
    ContributionStats,
    CompanyMap,
    LatestPosts,
    HomeSnippets
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

<style scoped>
h2.section-title {
  @apply overflow-hidden text-center text-xl font-bold tracking-wide uppercase;
}

h2.section-title:before,
h2.section-title:after {
  background-color: #000;
  content: '';
  display: inline-block;
  height: 2px;
  position: relative;
  vertical-align: middle;
  width: 50%;
}

h2.section-title:before {
  right: 0.5em;
  margin-left: -50%;
}

h2.section-title:after {
  left: 0.5em;
  margin-right: -50%;
}
</style>
