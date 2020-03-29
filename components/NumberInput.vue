<template>
  <input
    type="number"
    autofocus
    class="w-full p-4 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
    v-bind="$attrs"
    :value="value"
    @input="input"
  />
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String
    }
  },

  methods: {
    input(evt) {
      this.$emit('input', evt.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
