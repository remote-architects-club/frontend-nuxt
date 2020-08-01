<template>
  <nav class="flex justify-end pt-2 mb-8" data-cy="main-menu">
    <ul class="text-right">
      <li class="font-semibold">
        <nuxt-link to="/" class="link">home</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/tools" class="link">tools</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/blog" class="link">blog</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/about" class="link">about</nuxt-link>
      </li>
      <li class="mt-2 font-semibold">
        <nuxt-link
          to="/jobs"
          class="p-1 font-bold text-white bg-black hover:underline"
          >remote jobs</nuxt-link
        >
      </li>
      <!-- <li class="font-semibold">
        <nuxt-link to="/feedback" class="link">what else?</nuxt-link>
      </li> -->
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
ul {
  li {
    @apply ml-2;
  }
}
</style>
