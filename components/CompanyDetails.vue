<template>
  <div>
    <header class="mb-8">
      <div class="sm:flex sm:items-center sm:justify-between sm:flex-wrap">
        <h2 class="inline-block text-lg font-bold">{{ company.name }}</h2>
        <company-location
          :city="company.city"
          :country-iso="company.country_iso"
        />
      </div>
      <company-url v-if="company.url" :url="company.url" />
    </header>
    <div>
      <section class="mb-4 col-2">
        <p class="flex items-center mb-1 font-semibold">
          work-from-home policy
        </p>
        <p>
          {{ company.remote_policy || 'n/a' }}
        </p>
      </section>
      <section v-if="company.remote_policy" class="mb-4 col-2">
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
      <section class="col-2">
        <p class="flex items-center mb-1 font-semibold">
          tools
        </p>
        <ul v-if="company.office_tools.length" class="flex flex-wrap mt-1">
          <li
            v-for="{ tool } in company.office_tools"
            :key="tool.id"
            class="px-4 py-1 mb-2 mr-2 border border-black rounded-full"
          >
            {{ tool.name }}
          </li>
        </ul>
        <p v-else>n/a</p>
      </section>
    </div>
  </div>
</template>

<script>
import CompanyLocation from '@/components/CompanyLocation'
import CompanyUrl from '@/components/CompanyUrl'
// import CompanyRemotePolicy from '@/components/CompanyRemotePolicy'
// import CompanyRemoteSince from '@/components/CompanyRemoteSince'
// import CompanyTools from '@/components/CompanyTools'

export default {
  components: {
    // CompanyTools,
    // CompanyRemotePolicy,
    // CompanyRemoteSince,
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

<style type="scss">
@screen md {
  .col-2 {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 150px 1fr;
    align-items: start;
  }
}
</style>
