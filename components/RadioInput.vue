<template>
  <div class="pl-4">
    <p class="flex mb-2" v-for="(option, index) in options" :key="index">
      <label :class="{ 'font-bold': option.value === value }"
        ><input
          type="radio"
          @input="$emit('input', $event.target.value)"
          :checked="option.value === value"
          :value="option.value"
          class="mr-2"
        />{{ option.label }}</label
      >
    </p>
  </div>
</template>

<script>
export default {
  props: ['options', 'value']
}
</script>

<style scoped></style>
