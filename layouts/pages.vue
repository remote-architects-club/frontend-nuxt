<template>
  <div class="container py-8 mx-auto">
    <header class="mb-12">
      <nuxt-link to="/"><logo class="w-48"/></nuxt-link>
    </header>
    <main class="max-w-xl mx-auto">
      <div class="max-w-2xl mx-auto">
        <nuxt />
      </div>
      <div
        class="fixed absolute top-0 left-0 p-2 m-2 font-bold bg-gray-500 rounded shadow font-sm"
      >
        <portal-target name="state" />
      </div>
    </main>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  components: {
    Logo
  }
}
</script>

<style></style>
