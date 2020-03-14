<template>
  <div class="container mx-auto text-center">
    <header class="mb-12 text-center">
      <h1 class="mb-8 text-6xl leading-none tracking-wide uppercase bold">
        Remote<br />Architects<br />Club
      </h1>
      <h2 class="mb-8">
        The COVID19 is forcing architecture offices around the world to
        implement remote working for the first time. Tell us your story.
      </h2>
      <p>
        <button
          class="p-2 tracking-wide text-yellow-900 uppercase bg-yellow-500 rounded"
        >
          Tell your story
        </button>
      </p>
    </header>
    <main>
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
