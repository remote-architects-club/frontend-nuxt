<template>
  <div class="flex flex-col h-full max-w-4xl mx-auto">
    <base-navbar />
    <header class="mb-12">
      <nuxt-link to="/"><logo class="w-48"/></nuxt-link>
    </header>
    <main class="flex-1 mb-12">
      <nuxt class="max-w-xl mx-auto" />
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
