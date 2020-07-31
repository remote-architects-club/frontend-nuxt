<template>
  <div>
    <nuxt-link
      v-if="url"
      :to="`/tools/tool?id=${id}`"
      data-cy="tool-name"
      class="px-4 py-1 border border-black rounded-full hover:bg-yellow-500 hover:cursor-pointer"
      >{{ name }}</nuxt-link
    >
    <span
      v-else
      data-cy="tool-name"
      class="px-4 py-1 border border-black rounded-full"
      >{{ name }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped></style>
