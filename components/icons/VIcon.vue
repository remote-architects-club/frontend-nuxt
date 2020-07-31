<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    class="fill-current"
  >
    <keep-alive>
      <component :is="dynamicIcon"></component>
    </keep-alive>
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: 'x',
    },
  },
  computed: {
    dynamicIcon() {
      return `v-${this.icon}` // default icon: x
    },
  },
}
</script>

<style>
svg {
  @apply cursor-pointer;
  @apply inline-block;
}
</style>
