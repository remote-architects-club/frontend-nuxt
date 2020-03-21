<template>
  <div>
    <!-- <form-progress :form-state/> -->
    <nav class="flex justify-center mt-4">
      <button
        v-if="formState.activeQuestion !== 0"
        @click="$emit('back')"
        class="px-4 py-2 mx-4 text-sm font-semibold transition duration-150 ease-in-out border-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus "
      >
        previous
      </button>
      <button
        @click="$emit('next')"
        :disabled="isNextDisabled"
        class="px-4 py-2 mx-4 text-sm font-semibold transition duration-150 ease-in-out bg-white border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed"
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
