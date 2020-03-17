<template>
  <div class="container py-8 mx-auto">
    <header class="mb-12">
      <nuxt-link to="/"><logo class="w-48"/></nuxt-link>
    </header>
    <main class="max-w-xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Contribute</h1>
        <p>
          Tell everyone how's your company responding to the crisis and, most
          importantly, how <strong>you</strong> are dealing with it.
        </p>
      </div>
      <div class="max-w-2xl mx-auto">
        <nuxt />
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
