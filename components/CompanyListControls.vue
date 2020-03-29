<template>
  <nav class="flex justify-end my-2 text-sm md:my-4">
    <!-- <p class="mr-2">{{ total }} entries</p> -->
    <p class="mr-2">
      showing entries {{ 1 + context.offset }}-{{
        context.offset + context.companies.length
      }}
      (of {{ total }})
    </p>
    <button v-if="context.offset > 0" class="mr-2 link" @click="prevPage">
      &larr; prev
    </button>
    <button
      v-if="context.totalCompanies > context.resultsPerPage"
      class="link"
      @click="nextPage"
    >
      next &rarr;
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  computed: {
    total() {
      return this.context.totalCompanies
    }
  },
  methods: {
    nextPage() {
      this.$emit('next-page')
    },
    prevPage() {
      this.$emit('prev-page')
    }
  }
}
</script>

<style lang="scss" scoped></style>
