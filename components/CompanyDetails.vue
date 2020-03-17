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
      <company-remote-policy :remote-policy="remotePolicy" class="mb-4" />
      <company-remote-since :remote-since="remoteSince" class="mb-4" />
      <company-tools :tools="tools" class="mb-4" />
    </div>
  </article>
</template>

<script>
import CompanyLocation from '@/components/CompanyLocation'
import CompanyUrl from '@/components/CompanyUrl'
import CompanyRemotePolicy from '@/components/CompanyRemotePolicy'
import CompanyRemoteSince from '@/components/CompanyRemoteSince'
import CompanyTools from '@/components/CompanyTools'

export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  components: {
    CompanyTools,
    CompanyRemotePolicy,
    CompanyRemoteSince,
    CompanyUrl,
    CompanyLocation
  },
  data() {
    return {}
  },
  computed: {
    remoteSince() {
      if (this.company.remote_since) return this.company.remote_since
      return ''
    },

    remotePolicy() {
      if (this.company.remote_since)
        return this.company.remote_policy.slice(0, 280)
      return ''
    },
    tools() {
      if (this.company.office_tools)
        return this.company.office_tools.map(({ tool }) => tool)
      return []
    }
  }
}
</script>

<style type="scss"></style>
