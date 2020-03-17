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
      class="pt-2 mb-12 border-t-2 border-black"
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

        <p class="font-bold">Stories</p>
        <ul>
          <li v-for="story in company.experiences" :key="story.id" class="mb-4">
            <span class="text-gray-700"
              >Posted on
              {{ $dateFns.format(new Date(story.created_at), 'MMMM do') }}</span
            ><br />
            {{ story.own_experience }}
          </li>
          <li>
            <button
              class="flex items-center justify-center px-4 py-1 text-sm font-medium leading-6 text-yellow-900 transition duration-150 ease-in-out bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-400 focus:outline-none focus:shadow-outline md:py-2 md:text-lg md:px-5"
            >
              Add
            </button>
          </li>
        </ul>
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
