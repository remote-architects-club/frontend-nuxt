<template>
  <article class="p-8 bg-white border-t-2 border-b-2 border-black shadow-lg">
    <header class="mb-8">
      <div class="flex items-center justify-between">
        <h2 class="inline-block text-lg font-bold">{{ company.name }}</h2>
        <company-location
          :city="company.city"
          :country-iso="company.country_iso"
        />
      </div>
      <company-url v-if="company.url" :url="company.url" />
    </header>
    <div>
      <section class="mb-4">
        <p class="flex items-center mb-1 font-semibold">
          work-from-home policy
        </p>
        <p>
          {{ company.remote_policy || 'n/a' }}
        </p>
      </section>
      <section class="mb-4">
        <p class="flex items-center mb-1 font-semibold">
          policy on since
        </p>
        <p>
          {{
            company.remote_since
              ? $dateFns.format(new Date(company.remote_since), 'MMMM do')
              : 'n/a'
          }}
        </p>
      </section>
      <section>
        <p class="flex items-center mb-1 font-semibold">
          tools
        </p>
        <ul class="flex flex-wrap mt-1">
          <li
            v-for="{ tool } in company.office_tools"
            :key="tool.id"
            class="px-4 py-1 mb-2 mr-2 border border-black rounded-full"
          >
            {{ tool.name }}
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>

<script>
import CompanyLocation from '@/components/CompanyLocation'
import CompanyUrl from '@/components/CompanyUrl'
// import CompanyRemotePolicy from '@/components/CompanyRemotePolicy'
// import CompanyRemoteSince from '@/components/CompanyRemoteSince'
// import CompanyTools from '@/components/CompanyTools'

export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  components: {
    // CompanyTools,
    // CompanyRemotePolicy,
    // CompanyRemoteSince,
    CompanyUrl,
    CompanyLocation
  }
}
</script>

<style type="scss"></style>
