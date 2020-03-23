<template>
  <img
    :src="logo"
    class="w-12 h-12 overflow-hidden rounded-full"
    @error="onImgError"
  />
</template>

<script>
import { extractDomain } from '@/plugins/url-utils'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imgError: false
    }
  },
  computed: {
    domain() {
      return extractDomain(this.url)
    },
    logo() {
      return this.imgError
        ? `https://avatars.dicebear.com/v2/initials/${this.name}.svg?options[bold]=1`
        : `https://logo.clearbit.com/${this.domain}`
    }
  },
  methods: {
    onImgError() {
      this.imgError = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
