<template>
  <div>
    <!-- <form-progress :form-state/> -->
    <nav class="flex justify-center mt-4">
      <button
        v-if="formState.activeQuestion !== 0"
        @click="$emit('back')"
        class="mx-4 btn btn-text"
        data-cy="back"
      >
        previous
      </button>
      <button
        @click="$emit('next')"
        :disabled="isNextDisabled"
        class="mx-4 btn btn-regular"
        data-cy="next"
      >
        {{ nextLabel }}
      </button>
    </nav>
  </div>
</template>
<script>
// import FormProgress from '@/components/FormProgress.vue'
export default {
  name: 'form-nav',
  components: {
    // 'form-progress': FormProgress
  },
  props: ['formState', 'formData'],
  computed: {
    isNextDisabled() {
      if (
        this.formState.current.validation.includes('required') &&
        !this.formData[this.formState.current.name]
      )
        return true
      return false
    },
    nextLabel() {
      if (this.formState.current.isFinal) return 'finish'
      if (
        !this.formState.current.validation.includes('required') &&
        !this.formData[this.formState.current.name]
      )
        return 'skip'
      return 'next'
    }
  }
}
</script>
