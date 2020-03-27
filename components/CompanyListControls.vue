<template>
  <nav class="flex justify-end mb-4 text-sm">
    <!-- <p class="mr-2">{{ total }} entries</p> -->
    <p class="mr-2">
      showing entries {{ 1 + context.offset }}-{{
        context.offset + context.companies.length
      }}
      (of {{ total }})
    </p>
    <button v-if="context.offset > 0" @click="prevPage" class="mr-2 link">
      &larr; prev
    </button>
    <button
      v-if="context.totalCompanies > context.resultsPerPage"
      @click="nextPage"
      class="link"
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
