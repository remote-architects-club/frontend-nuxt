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
        We are actively working on improving this site.<br />Enter your email to
        stay in the loop for further developments:
      </p>

      <p class="flex mb-2">
        <input
          type="email"
          placeholder="Email"
          class="w-64 p-1 mr-1 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
        /><button
          class="px-4 py-2 text-sm transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
        >
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
