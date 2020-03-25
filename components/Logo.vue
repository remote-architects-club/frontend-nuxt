<template>
  <img class="logo" src="~assets/logo-admin.svg" v-if="admin" />
  <img class="logo" src="~assets/logo-main.svg" v-else />
</template>
<script>
export default {
  props: {
    admin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.logo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
