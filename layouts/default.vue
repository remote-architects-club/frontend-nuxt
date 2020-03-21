<template>
  <div class="max-w-4xl mx-auto">
    <nav class="flex justify-end pt-4 mb-8">
      <ul class="flex items-center">
        <li class="font-semibold">
          <nuxt-link to="/about" class="link">about</nuxt-link>
        </li>
      </ul>
    </nav>
    <header class="mb-8">
      <logo></logo>
    </header>
    <main>
      <!-- <h1
        class="mb-8 text-6xl leading-none tracking-wide uppercase bold font-logo"
      >
        Remote<br />Architects<br />Club
      </h1> -->
      <nuxt />
    </main>
    <footer>
      footer
    </footer>
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

<style>
body,
html,
#__nuxt {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aeaeae' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  @apply antialiased h-full;
}
</style>
