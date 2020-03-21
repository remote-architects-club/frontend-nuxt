<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">About</h1>
    <div v-html="content" class="p-4 bg-white shadow-lg sm:p-8 content"></div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { client } from '@/plugins/apollo'
export default {
  layout: 'pages',
  async asyncData() {
    const { data } = await client.query({
      query: gql`
        query about {
          about {
            content(markdown: true)
          }
        }
      `
    })
    return { content: data.about.content }
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style lang="scss">
.content {
  p {
    @apply mb-4;
  }
  h3 {
    @apply font-bold mt-8 mb-4 text-lg;
  }
  a {
    @apply underline;
  }
  a:hover,
  a:focus {
    @apply font-bold;
  }
}
</style>
