<template>
  <p class="flex items-center">
    <v-icon icon="link" class="w-4 h-4 mt-1 mr-1" />
    <a :href="url" class="link">{{ domain }}</a>
  </p>
</template>

<script>
import { extractDomain } from '@/plugins/url-utils'
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    domain() {
      return extractDomain(this.url)
    },
  },
}
</script>
