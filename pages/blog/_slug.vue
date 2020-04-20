<template>
  <div>
    <p class="mb-2 font-bold sm:-ml-4">
      &larr;&nbsp;<nuxt-link to="/blog" class="link">Blog</nuxt-link>
    </p>
    <div class="p-4 mb-8 bg-white shadow-lg sm:p-8 ">
      <article>
        <header>
          <div class="image">
            <img
              v-if="post.image"
              :src="post.image.url"
              class="object-cover w-full h-24 overflow-hidden shadow-sm sm:h-full"
            />
          </div>
          <div class="title">
            <h1 class="text-3xl font-bold leading-tight">
              {{ post.title }}
            </h1>
            <p>{{ post.excerpt }}</p>
            <div class="h-4" />
            <p class="text-sm ">
              by {{ post.author.name }} on
              <time :datetime="post._firstPublishedAt">{{
                $dateFns.format(new Date(post._firstPublishedAt), 'MMMM do')
              }}</time>
            </p>
          </div>
        </header>
        <div class="md:w-2/3 md:ml-auto">
          <div class="w-24 my-8 border-t-2 border-black" />
          <div class="md:pl-4 content" v-html="post.content" />
          <div class="w-24 my-12 border-t-2 border-black" />
          <div class="text-sm italic md:pl-4" v-html="post.author.bio"></div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { client } from '@/plugins/apollo'
import gql from 'graphql-tag'
export default {
  layout: 'pages',
  async asyncData({ params }) {
    try {
      console.info(params.slug)

      let { data } = await client.query({
        query: gql`
          {
            post(filter: { slug: { eq: "${params.slug}" } }) {
              id
              slug
              title
              createdAt
              excerpt
              image {
                url
              }
              content(markdown: true)
              author {
                name
                id
                bio
                photo {
                  url
                }
              }
              _firstPublishedAt
            }
          }
        `
      })
      return {
        post: data.post
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  }
}
</script>
<style scoped>
header {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-areas:
    'image'
    'title';
}
@screen md {
  header {
    grid-template-columns: 1fr 2fr;
    grid-gap: 2rem;
    grid-template-areas:
      'image .'
      'image .'
      'image title';
  }
}
.image {
  grid-area: image;
}
.title {
  grid-area: title;
}
.excerpt {
  grid-area: excerpt;
}
.metadata {
  grid-area: metadata;
}
</style>
