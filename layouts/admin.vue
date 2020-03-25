<template>
  <div class="flex flex-col w-full h-full px-4 mx-auto lg:max-w-4xl lg:px-0">
    <header
      class="flex flex-col justify-center flex-none mb-12 sm:flex-row-reverse sm:justify-between sm:pt-4 sm:px-2 lg:pt-8"
    >
      <admin-navbar />
      <nuxt-link to="/" class="sm:ml-2 sm:mt-4"
        ><logo :admin="true" class="w-48"
      /></nuxt-link>
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
import AdminNavbar from '@/components/admin/AdminNavbar'
export default {
  components: {
    AdminNavbar,
    BaseFooter,
    Logo
  }
}
</script>

<style></style>
