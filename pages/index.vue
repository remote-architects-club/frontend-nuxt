<template>
  <div>
    <header class="mb-12 text-center">
      <h1
        class="mb-8 text-6xl leading-none tracking-wide uppercase bold font-logo"
      >
        Remote<br />Architects<br />Club
      </h1>
      <h2 class="mb-8 text-xl">
        The COVID-19 is forcing architecture offices around the world to
        implement remote working for the first time. <br />Share your
        experience.
      </h2>

      <div class="mt-5">
        <p>
          <nuxt-link
            to="/add"
            class="inline-block px-8 py-3 text-base font-bold leading-6 text-black transition duration-150 ease-in-out bg-white border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-outline md:py-4 md:text-lg md:px-10"
          >
            Contribute
          </nuxt-link>
        </p>

        <p class="text-sm">It's easy and anonymous.</p>
      </div>
      <!-- <div class="mt-5">
        <p>
          <nuxt-link
            to="/add"
            class="inline-block px-8 py-3 text-base font-medium leading-6 text-yellow-900 transition duration-150 ease-in-out bg-yellow-500 border border-transparent rounded-md shadow hover:bg-yellow-400 focus:outline-none focus:shadow-outline md:py-4 md:text-lg md:px-10"
          >
            Contribute
          </nuxt-link>
        </p>

        <p class="text-sm text-yellow-900">It's easy and anonymous.</p>
      </div> -->
    </header>
    <main class="max-w-4xl p-8 mx-auto bg-white shadow-lg">
      <company-list />
    </main>
  </div>
</template>

<script>
import CompanyList from '@/components/CompanyList'
export default {
  components: {
    CompanyList
  }
}
</script>

<style></style>
