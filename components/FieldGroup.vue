<template>
  <!-- <data-driven-transition :isNext="isNext"> -->
  <div v-if="active" :key="fieldId" class="field-group">
    <slot />
  </div>
  <!-- </data-driven-transition> -->
</template>
<script>
// import DataDrivenTransition from '@/components/Transitions/DataDrivenTransition.vue'

export default {
  name: 'FieldGroup',
  // inject: ['formState'],
  components: {
    // DataDrivenTransition
  },
  props: {
    fieldId: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    isNext: {
      type: Boolean,
      default: true
    }
  }
  // computed: {
  //   active() {
  //     return this.formState.activeField === this.fieldId
  //   },
  //   isNext() {
  //     return this.formState.isNext
  //   }
  // }
}
</script>
