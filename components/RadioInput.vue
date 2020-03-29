<template>
  <div>
    <p v-for="(option, index) in options" :key="index" class="flex mb-2">
      <label :class="{ 'font-bold': option.value === value }"
        ><input
          :name="id"
          type="radio"
          :checked="option.value === value"
          :value="option.value"
          class="mt-1 bg-white border border-black"
          :data-cy="`${option.value}`"
          @input="$emit('input', $event.target.value)"
        />
        <span>{{ option.label }}</span></label
      >
    </p>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
label {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5rem;
}
</style>
