<template>
  <footer
    data-cy="footer"
    class="px-4 pt-4 pb-8 mt-auto text-sm border-t-2 border-black "
  >
    <div
      class="flex flex-col items-center justify-between sm:flex-row sm:items-start"
    >
      <section class="mb-4">
        <ul
          class="flex flex-wrap items-center justify-center nav sm:block sm:items-start sm:justify-start"
        >
          <li class="font-semibold">
            <nuxt-link to="/" class="link">home</nuxt-link>
          </li>
          <li class="font-semibold">
            <nuxt-link to="/tools" class="link">tools</nuxt-link>
          </li>
          <li class="font-semibold">
            <nuxt-link to="/blog" class="link">blog</nuxt-link>
          </li>
          <li class="font-semibold">
            <nuxt-link to="/about" class="link">about</nuxt-link>
          </li>
          <li class="font-semibold">
            <nuxt-link to="/feedback" class="link">what else?</nuxt-link>
          </li>
        </ul>
      </section>
      <section class="mb-4 text-center sm:text-left">
        <p class="mb-2">
          This site is in active development.<br />Enter your email to stay in
          the loop:
        </p>
        <mc-api-form sign-up-location="footer" />
        <p class="h-2" />
      </section>
    </div>
    <div>
      <p>
        RAC is <strong>open source</strong>.<br />
        You can check (and contribute to!) the
        <a
          href="https://github.com/danrocha/remote-architects-club/"
          class="link"
          >codebase on Github</a
        >
        or see
        <a
          href="https://github.com/danrocha/remote-architects-club/projects/2"
          class="link"
          >our Roadmap</a
        >.
      </p>
      <p>Made with 💛 in Berlin.</p>
    </div>
  </footer>
</template>

<script>
import McApiForm from '@/components/McApiForm'
export default {
  components: {
    McApiForm
  }
}
</script>

<style lang="scss" scoped>
.nav {
  li {
    @apply mx-2;
  }
}
@screen sm {
  .nav {
    li {
      @apply mx-0;
    }
  }
}
</style>
