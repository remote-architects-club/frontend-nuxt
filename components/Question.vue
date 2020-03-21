<template>
  <component
    :is="componentType"
    :question="question"
    @input="$emit('input', $event)"
  ></component>
</template>

<script>
import TransitionFade from '@/components/TransitionFade'
import RadioInput from '@/components/RadioInput'

export default {
  components: {
    RadioInput,
    TransitionFade
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    componentType() {
      return `${this.question.type}-input`
    }
  }
}
</script>

<style lang="scss" scoped></style>
