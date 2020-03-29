<template>
  <div class="form-error-message">
    <type-based-transition transition-type="fadeUpDown">
      <!-- <button class="form-button" v-if="isValid">Ok</button>
      <span v-else> <slot /> </span> -->
      <span v-if="!isValid"> <slot /> </span>
    </type-based-transition>
  </div>
</template>
<script>
import TypeBasedTransition from '@/components/Transitions/TypeBasedTransition.vue'

export default {
  name: 'FieldError',
  components: {
    TypeBasedTransition
  },
  props: {
    isValid: {
      type: Boolean,
      default: true
    }
  }
}
</script>
