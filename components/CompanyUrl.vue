<template>
  <p class="flex items-center">
    <v-icon icon="link" class="w-4 h-4" /> {{ domain }}
  </p>
</template>

<script>
const psl = require('psl')
function extractHostname(url) {
  let hostname
  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url.includes('//')) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }
  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]
  return hostname
}
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    domain() {
      return psl.get(extractHostname(this.url))
    }
  }
}
</script>
