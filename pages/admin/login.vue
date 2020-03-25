<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Login</h1>
    <div class="p-4 bg-white shadow-lg sm:p-8 content">
      <p>
        You need to login to access the administration area.
      </p>
      <p>
        <button class="btn btn-regular" @click="login">click to login</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  methods: {
    login() {
      this.$auth.loginWith('auth0')
    }
  }
}
</script>

<style lang="scss" scoped></style>
