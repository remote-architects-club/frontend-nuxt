<template>
  <div class="text-left">
    <nav class="flex justify-end text-sm">
      <button v-if="context.offset > 0" @click="prevPage" class="link">
        prev
      </button>
      <button @click="nextPage" class="link">next</button>
    </nav>
    <p class="mb-8">Filter</p>
    <article
      v-for="company in context.companies"
      :key="company.id"
      class="p-8 mb-8 bg-white border-t-2 border-black shadow-lg"
    >
      <header class="flex justify-between mb-8">
        <h1 class="text-xl font-bold">
          {{ company.name }}
        </h1>
        <ul class="flex items-center">
          <li class="flex items-center mr-4">
            <img src="~assets/icons/person.svg" class="w-4 h-4" />
            <span v-if="company.num_people">&nbsp;{{ company.num_people }}</span
            ><span v-else>n/a</span>
          </li>
          <li class="flex items-center mr-4">
            <img src="~assets/icons/link.svg" class="w-4 h-4" />
            <span v-if="company.url"
              >&nbsp;{{ companyDomain(company.url) }}</span
            ><span v-else>n/a</span>
          </li>

          <li class="flex items-center">
            <img src="~assets/icons/location.svg" class="w-4 h-4" />
            {{ company.city }},
            {{ company.country_iso }}
          </li>
        </ul>
      </header>
      <div class="details-grid">
        <p class="font-bold">Company Policy</p>
        <p>{{ company.remote_policy }}</p>

        <p class="font-bold">WFH Since</p>
        <p>{{ $dateFns.format(new Date(company.remote_since), 'MMMM do') }}</p>

        <p class="font-bold">Tools</p>
        <ul class="flex">
          <li
            v-for="{ tool } in company.office_tools"
            :key="tool.id"
            class="px-4 py-1 mr-2 border border-black rounded-full"
          >
            {{ tool.name }}
          </li>
        </ul>
        <div class="h-4" />
        <div class="h-4" />
        <div />
        <p class="text-center">
          <router-link
            :to="`/add/${company.id}?editing=true`"
            class="px-4 py-2 text-sm font-semibold transition duration-150 ease-in-out bg-white border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <v-icon icon="edit" class="w-4 h-4"></v-icon> edit company info
          </router-link>
        </p>
        <div class="h-4" />
        <div class="h-4" />
        <p class="font-bold">Stories</p>
        <div>
          <template
            v-if="company.experiences && company.experiences.length > 0"
          >
            <div
              v-for="experience in company.experiences"
              :key="experience.id"
              class="py-4 mb-4 border-t-2 border-black"
            >
              <experience :experience="experience" />
            </div>
          </template>
          <p class="py-6 text-center border-t-2 border-black">
            <router-link
              :to="`/add/${company.id}/personal`"
              class="px-4 py-2 text-sm font-semibold transition duration-150 ease-in-out bg-white border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &plus; add your experience
            </router-link>
          </p>
        </div>
      </div>
    </article>
    <nav>
      <button v-if="context.offset > 0" @click="prevPage">prev</button>
      <button @click="nextPage">next</button>
    </nav>
  </div>
</template>

<script>
import { companiesMachine } from '@/fsm/companiesMachine'
import Experience from '@/components/Experience'
const psl = require('psl')
function extractHostname(url) {
  let hostname
  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url.includes('//')) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }
  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]
  return hostname
}

export default {
  name: 'CompanyList',
  components: {
    Experience
  },
  computed: {
    state() {
      return companiesMachine.current
    },
    context() {
      return companiesMachine.context
    }
  },
  mounted() {
    if (!this.board) {
      companiesMachine.send({ type: 'LOAD' })
    }
  },
  methods: {
    nextPage() {
      companiesMachine.send({ type: 'NEXT_PAGE' })
      this.scrollToTop()
    },
    prevPage() {
      companiesMachine.send({ type: 'PREV_PAGE' })
      this.scrollToTop()
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    companyDomain(url) {
      return psl.get(extractHostname(url))
    }
  }
}
</script>

<style scoped>
.details-grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 150px 1fr;
}
</style>
