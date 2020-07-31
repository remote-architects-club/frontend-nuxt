<template>
  <p class="text-center">
    <span class="font-bold">{{ context.numExperiences }}</span> people from
    <span class="font-bold">{{ context.totalCompanies }}</span> companies in
    <span class="font-bold">{{ context.numCities }}</span> cities around the
    world shared their experience
  </p>
</template>

<script>
export default {
  name: 'ContributionStats',
  props: {
    companiesMachine: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      maxZoom: 5.5,
    }
  },
  computed: {
    state() {
      return this.companiesMachine.current
    },
    context() {
      return this.companiesMachine.context
    },
  },
}
</script>

<style lang="scss" scoped></style>
