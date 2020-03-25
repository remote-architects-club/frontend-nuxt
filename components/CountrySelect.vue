<template>
  <select
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
    class="p-4 select-css"
  >
    <template v-if="matches('fetching')">
      <option value="">--Loading countries...--</option>
    </template>
    <template v-else>
      <option
        v-for="country in countries"
        :value="country.iso"
        :key="country.iso"
        >{{ country.name }}</option
      >
    </template>
  </select>
</template>

<script>
import { countriesMachine } from '@/fsm/countriesMachine'
export default {
  computed: {
    countries() {
      return countriesMachine.context.countries
    }
  },
  methods: {
    matches(value) {
      return countriesMachine.current.matches(value)
    }
  }
}
</script>

<style lang="scss"></style>
