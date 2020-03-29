<template>
  <article class="p-4 bg-white border-t-2 border-black shadow-lg sm:p-8">
    <header class="mb-8">
      <div class="flex flex-wrap items-center justify-between">
        <h2 class="inline-block text-lg font-bold leading-tight">
          {{ company.name }}
        </h2>
        <company-location
          :city="company.city"
          :country-iso="company.country_iso"
        />
      </div>
      <company-url v-if="company.url" :url="company.url" />
    </header>

    <div>
      <company-remote-policy class="mb-4" />
      <company-tools class="mb-4" />
    </div>
  </article>
</template>

<script>
import CompanyLocation from '@/components/CompanyLocation'
import CompanyUrl from '@/components/CompanyUrl'
import CompanyRemotePolicy from '@/components/CompanyRemotePolicy'
import CompanyTools from '@/components/CompanyTools'

export default {
  components: {
    CompanyTools,
    CompanyRemotePolicy,
    CompanyUrl,
    CompanyLocation
  },
  props: {
    company: {
      type: Object,
      required: true
    }
  }
}
</script>

<style type="scss"></style>
