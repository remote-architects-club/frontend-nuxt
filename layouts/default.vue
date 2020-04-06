<template>
  <div>
    <toast-subscribe />
    <div class="flex flex-col w-full h-full px-4 mx-auto lg:max-w-4xl lg:px-0 ">
      <header class="mb-12">
        <base-navbar class="sm:mb-0 md:-mb-12 lg:-mb-16" />
        <logo></logo>
      </header>
      <main class="flex-1 mb-12">
        <nuxt />
      </main>
      <base-footer />
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import BaseFooter from '@/components/BaseFooter'
import BaseNavbar from '@/components/BaseNavbar'
import ToastSubscribe from '@/components/ToastSubscribe'
export default {
  components: {
    BaseNavbar,
    BaseFooter,
    Logo,
    ToastSubscribe
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
#__layout {
  @apply h-full;
}
</style>
