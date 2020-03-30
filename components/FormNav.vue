<template>
  <div>
    <!-- <form-progress :form-state/> -->
    <nav class="flex justify-center mt-4">
      <button
        v-if="formState.activeQuestionGroup !== 0"
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
      type: Array,
      required: true
    }
  },
  computed: {
    isNextDisabled() {
      const isNextDisabled = this.formState.currentGroup.map((question, i) => {
        return (
          this.isRequired(question) &&
          this.formData[this.formState.activeQuestionGroup][i].answer === ''
        )
      })
      return isNextDisabled.includes(true)
    },
    nextLabel() {
      if (
        this.formState.currentGroup[this.formState.currentGroup.length - 1]
          .isFinal
      )
        return 'finish'
      const skippable = this.formState.currentGroup.map((question, i) => {
        return (
          !this.isRequired(question) &&
          this.formData[this.formState.activeQuestionGroup][i].answer === ''
        )
      })
      if (skippable.includes(false)) {
        return 'next'
      }
      return 'skip'
    }
  },
  methods: {
    isRequired(question) {
      return question.validation.includes('required')
    }
  }
}
</script>
