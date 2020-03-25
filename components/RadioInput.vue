<template>
  <div>
    <p class="flex mb-2" v-for="(option, index) in options" :key="index">
      <label :class="{ 'font-bold': option.value === value }"
        ><input
          :name="id"
          type="radio"
          @input="$emit('input', $event.target.value)"
          :checked="option.value === value"
          :value="option.value"
          class="mt-1 bg-white border border-black"
          :data-cy="`${option.value}`"
        />
        <span>{{ option.label }}</span></label
      >
    </p>
  </div>
</template>

<script>
export default {
  props: ['options', 'value', 'id']
}
</script>

<style scoped>
label {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5rem;
}
</style>
