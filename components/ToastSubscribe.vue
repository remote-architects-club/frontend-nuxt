<template>
  <div
    v-if="open"
    data-cy="toast-subscribe"
    class="sticky inset-x-0 top-0 flex flex-wrap items-center justify-center py-1 text-white bg-black shadow"
  >
    <p class="mb-2 font-bold text-center sm:mb-0 sm:pr-2">
      Stay in the loop for future updates
      <span class="hidden sm:inline-block">&rarr;</span
      ><span class="sm:hidden">&darr;</span>
    </p>
    <mc-api-form />
    <button
      data-cy="close-btn"
      class="absolute top-0 right-0 p-2 text-lg font-bold text-white"
      @click="open = false"
    >
      &times;
    </button>
  </div>
</template>

<script>
import McApiForm from '@/components/McApiForm.vue'
export default {
  components: {
    McApiForm
  },
  data() {
    return {
      open: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
