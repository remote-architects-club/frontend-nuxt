<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Blog</h1>
    <div class="p-4 mb-8 bg-white shadow-lg sm:p-8 ">
      <template v-if="state.matches('fetchingAll')">
        <div class="flex items-center justify-center p-12">
          <spinner color="#000" />
        </div>
      </template>
      <template v-else-if="state.matches('idle') && posts.length > 0">
        <article v-for="post in posts" :key="post.id" class="content">
          <time class="text-gray-600" :datetime="post._publishedAt">{{
            $dateFns.format(new Date(post._publishedAt), 'MMMM do')
          }}</time>
          <h2 class="pt-2 mt-2 mb-8 text-lg font-bold border-t-2 border-black">
            {{ post.title }}
          </h2>
          <div v-html="post.content" />
        </article>
      </template>
      <template v-else-if="state.matches('failed')">
        <p>
          There was an internal error when trying to get the tools... Please,
          reload page to try again.
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { blogMachine } from '@/fsm/blogMachine'

export default {
  name: 'PageTools',
  layout: 'pages',
  computed: {
    state() {
      return blogMachine.current
    },
    context() {
      return blogMachine.context
    },
    posts() {
      return this.context.posts
    }
  },
  mounted() {
    blogMachine.send({ type: 'FETCH_ALL' })
  }
}
</script>

<style lang="scss"></style>
