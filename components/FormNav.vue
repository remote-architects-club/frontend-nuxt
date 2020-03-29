<template>
  <div>
    <!-- <form-progress :form-state/> -->
    <nav class="flex justify-center mt-4">
      <button
        v-if="formState.activeQuestion !== 0"
        class="mx-4 btn btn-text"
        data-cy="back"
        @click="$emit('back')"
      >
        previous
      </button>
      <button
        :disabled="isNextDisabled"
        class="mx-4 btn btn-regular"
        data-cy="next"
        @click="$emit('next')"
      >
        {{ nextLabel }}
      </button>
    </nav>
  </div>
</template>
<script>
// import FormProgress from '@/components/FormProgress.vue'
export default {
  name: 'FormNav',
  components: {
    // 'form-progress': FormProgress
  },
  props: {
    formState: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      required: true
    }
  },
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
