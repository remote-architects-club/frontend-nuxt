<template>
  <div class="p-8 bg-white shadow-lg">
    <experience
      v-for="exp in experiences"
      :key="exp.id"
      class="mb-8 info-grid"
      :experience="exp"
    >
    </experience>
  </div>
</template>

<script>
export default {
  props: {
    experiences: {
      type: Array,
      required: true,
    },
  },
  methods: {},
}
</script>
