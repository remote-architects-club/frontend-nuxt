<template>
  <nav class="flex justify-center pt-2 mb-8 sm:justify-end">
    <ul class="flex items-center justify-end sm:flex-col sm:items-end">
      <li class="font-semibold">
        <nuxt-link to="/admin" class="link">home</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/admin/tools" class="link">tools</nuxt-link>
      </li>
      <li class="font-semibold">
        <nuxt-link to="/admin/articles" class="link">articles</nuxt-link>
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
