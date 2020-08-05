<template>
  <nav data-cy="main-menu" class="sm:flex sm:justify-end">
    <ul
      class="flex items-center justify-center space-x-4 font-semibold sm:block sm:space-x-0 sm:text-right"
    >
      <li>
        <nuxt-link to="/" class="link">home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tools" class="link">tools</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/blog" class="link">blog</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about" class="link">about</nuxt-link>
      </li>
      <li class="sm:mt-2">
        <nuxt-link
          to="/jobs"
          class="p-1 font-bold text-white bg-black hover:underline"
          >remote jobs</nuxt-link
        >
      </li>
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
