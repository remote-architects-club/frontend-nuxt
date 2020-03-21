<template>
  <div>
    <header class="mb-12 text-center">
      <h2 class="mb-8 text-xl">
        The COVID-19 is forcing architecture offices around the world to
        implement remote working for the first time. Share your experience and
        support our colleagues.
      </h2>

      <div class="mt-5">
        <p>
          <nuxt-link to="/add" class="btn btn-large">
            contribute
          </nuxt-link>
        </p>

        <p class="text-sm">It's easy and anonymous.</p>
      </div>
    </header>
    <section class="w-full mx-auto">
      <company-list />
    </section>
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
