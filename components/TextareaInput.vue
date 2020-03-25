<template>
  <div>
    <textarea
      :value="value"
      maxlength="280"
      v-bind="$attrs"
      autofocus
      class="input"
      @input="input"
      rows="4"
    />
    <p v-if="showCount" class="font-mono text-xs text-right">
      {{ value.length }}/280
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextareaInput',
  props: {
    value: {
      default: '',
      type: String
    },
    showCount: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      charCount: this.value.length
    }
  },
  methods: {
    input(evt) {
      this.charCount = evt.target.value.length
      this.$emit('input', evt.target.value)
    }
  }
}
</script>
