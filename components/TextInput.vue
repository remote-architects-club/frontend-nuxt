<template>
  <input
    type="text"
    autofocus
    class="w-full p-4 transition duration-150 ease-in-out border border-black rounded-none shadow-inner focus:outline-none focus:shadow-focus"
    v-bind="$attrs"
    @input="input"
    :value="value"
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
  // data() {
  //   return {
  //     charCount: this.value.length
  //   }
  // },
  methods: {
    input(evt) {
      // this.charCount = evt.target.value.length
      this.$emit('input', evt.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
