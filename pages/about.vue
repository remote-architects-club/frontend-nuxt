<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">About</h1>
    <div class="p-4 bg-white shadow-lg sm:p-8 content" v-html="content"></div>
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
/* TODO: move to global css file  */
/* CONTENT  */
.content {
  p {
    @apply mb-4;
  }
  h2 {
    @apply mt-10 mb-4 text-xl font-bold;
  }
  h3 {
    @apply mt-8 mb-2 text-lg font-bold;
  }
  a {
    @apply underline;
  }
  a:hover,
  a:focus {
    @apply font-bold;
  }
  blockquote {
    @apply ml-8 pl-4 border-l-2 border-black italic font-serif my-8 text-gray-600;
  }
  img {
    @apply mt-8;
  }
  img + em {
    @apply text-sm mb-8;
  }
}
</style>
