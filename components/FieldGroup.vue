<template>
  <!-- <data-driven-transition :isNext="isNext"> -->
  <div class="field-group" v-if="active" :key="fieldId">
    <slot />
  </div>
  <!-- </data-driven-transition> -->
</template>
<script>
// import DataDrivenTransition from '@/components/Transitions/DataDrivenTransition.vue'

export default {
  name: 'field-group',
  props: ['fieldId', 'active', 'isNext'],
  // inject: ['formState'],
  components: {
    // DataDrivenTransition
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
