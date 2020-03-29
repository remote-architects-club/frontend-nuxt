<template>
  <div v-show="loading" class="v-spinner">
    <div class="v-square" :style="spinnerStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'SquareLoader',

  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#000'
    },
    size: {
      type: String,
      default: '50px'
    }
  },
  data() {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.size,
        width: this.size
      }
    }
  }
}
</script>

<style></style>
