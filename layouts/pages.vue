<template>
  <div class="flex flex-col w-full h-full px-4 mx-auto lg:max-w-4xl lg:px-0">
    <header class="flex justify-between flex-none mb-8 sm:pt-4 sm:px-2 lg:pt-8">
      <nuxt-link to="/" class="mt-4 sm:ml-2"><logo class="w-48"/></nuxt-link>
      <base-navbar />
    </header>
    <main class="flex-1 mb-12">
      <nuxt />
    </main>
    <base-footer />
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import BaseFooter from '@/components/BaseFooter'
import BaseNavbar from '@/components/BaseNavbar'
export default {
  components: {
    BaseNavbar,
    BaseFooter,
    Logo
  }
}
</script>

<style></style>
