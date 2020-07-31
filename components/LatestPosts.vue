<template>
  <div>
    <h2 class="mb-4 font-bold">Latest blog posts</h2>
    <template v-if="state.matches('fetchingAll')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-else-if="state.matches('idle') && posts.length > 0">
      <ul class="blog-list">
        <li
          v-for="post in posts"
          :key="post.id"
          class="bg-white shadow-lg blog-list-item"
        >
          <div v-if="post.image">
            <img
              :src="post.image.url"
              class="object-cover w-full h-48 overflow-hidden shadow-sm sm:h-48"
            />
          </div>
          <div v-else></div>
          <div class="flex flex-col justify-between px-4 pb-4">
            <div>
              <h3 class="mb-1 font-bold sm:mb-2">
                <nuxt-link :to="`/blog/${post.slug}`" class="link">{{
                  post.title
                }}</nuxt-link>
              </h3>
              <p>{{ post.excerpt }}</p>
              <div class="h-4"></div>
            </div>
            <p class="text-sm">
              by {{ post.author.name }} on
              <time :datetime="post._firstPublishedAt">{{
                $dateFns.format(new Date(post._firstPublishedAt), 'MMMM do')
              }}</time>
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template v-else-if="state.matches('failed')">
      <p>
        There was an internal error when trying to get the latest posts...
        Please, reload page to try again.
      </p>
    </template>
  </div>
</template>

<script>
import { blogMachine } from '@/fsm/blogMachine'

export default {
  name: 'LatestPosts',

  computed: {
    state() {
      return blogMachine.current
    },
    context() {
      return blogMachine.context
    },
    posts() {
      return this.context.latestPosts
    },
  },
  mounted() {
    blogMachine.send({ type: 'FETCH_LATEST' })
  },
}
</script>

<style lang="scss">
ul.blog-list {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
}
li.blog-list-item {
  display: grid;
  grid-gap: 1rem;
}

@screen md {
  li.blog-list-item {
    grid-template-columns: 1fr;
  }
}
</style>
