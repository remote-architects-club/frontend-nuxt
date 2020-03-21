<template>
  <footer
    class="flex justify-between pt-4 pb-8 mt-auto text-sm border-t-2 border-black"
  >
    <section>
      <ul class="flex items-center">
        <li class="font-semibold">
          <nuxt-link to="/about" class="link">about</nuxt-link>
        </li>
      </ul>
    </section>
    <section>
      <p class="mb-2">
        This site is in active development.<br />Enter your email to stay in the
        loop:
      </p>

      <p class="flex mb-4">
        <input
          type="email"
          placeholder="Email"
          class="w-64 p-1 mr-1 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
        /><button class="btn btn-regular">
          Subscribe
        </button>
      </p>
      <p>Done with 💛 in Berlin.</p>
    </section>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
