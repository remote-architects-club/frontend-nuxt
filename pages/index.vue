<template>
  <div>
    <header class="max-w-2xl mx-auto mb-12 text-center">
      <h2 class="mb-8 text-xl">
        <!-- More and more companies around the world are realizing, rather forcibly,
        that remote work in architecture is possible. Let's help make it a
        long-lasting reality. -->
        Help us to keep the discussion going and to understand how
        "architecture" and "remote work" are getting along.
      </h2>
      <p class="mb-2 text-center">
        <a
          href="https://remotearchitectsclub.typeform.com/to/hOBrKpIj"
          class="inline-block px-8 py-4 text-base font-bold leading-6 text-black transition duration-150 ease-in-out bg-yellow-500 border-2 border-black shadow btn hover:bg-black hover:text-white hover:shadow-lg"
        >
          Participate in
          <strong>The State of Remote Work in Architecture</strong> survey
          &rarr;
        </a>
      </p>
      <p class="mb-16">
        It will only take five minutes of your time. It is easy and anonymous.
      </p>
    </header>

    <div class="mb-4 border-t-2 border-black"></div>
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

export default {
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

div.typeform {
  height: 500px;
}
</style>
