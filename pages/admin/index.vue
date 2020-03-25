<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Admin</h1>
    <div class="p-4 bg-white shadow-lg sm:p-8 content">
      <nav class="mb-8">
        <ul>
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
      <p>
        <button class="btn btn-regular" @click="logout">Logout</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'auth',
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
