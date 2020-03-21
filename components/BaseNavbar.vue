<template>
  <nav class="flex justify-end pt-4 mb-4">
    <ul class="flex items-center">
      <li class="font-semibold">
        <nuxt-link to="/" class="link">home</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/tools" class="link">tools</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/articles" class="link">articles</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/about" class="link">about</nuxt-link>
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
