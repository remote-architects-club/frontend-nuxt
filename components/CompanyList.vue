<template>
  <div class="text-left">
    <template v-if="state.matches('found')">
      <nav class="flex justify-end text-sm">
        <button v-if="context.offset > 0" @click="prevPage" class="link">
          prev
        </button>
        <button @click="nextPage" class="link">next</button>
      </nav>
      <!-- <p class="mb-8">Filter</p> -->
      <div
        class="p-4 mb-12 bg-white border-t-2 border-black shadow-lg sm:p-8"
        v-for="company in context.companies"
        :key="company.id"
      >
        <company-details :company="company" />
        <section class="col-2">
          <div></div>
          <p class="pt-8 mb-12 text-center md:text-left">
            <btn-edit-company :company-id="company.id" />
          </p>
        </section>
        <div>
          <template
            v-if="company.experiences && company.experiences.length > 0"
          >
            <section class="col-2">
              <p class="mb-4 font-semibold">stories</p>
              <div>
                <experience
                  :experience="experience"
                  v-for="experience in company.experiences"
                  :key="experience.id"
                  class="mb-8 "
                />
              </div>
            </section>
          </template>
          <section class="col-2">
            <div></div>
            <p class="py-6 text-center md:text-left">
              <btn-add-experience :company-id="company.id" />
            </p>
          </section>
        </div>
      </div>
      <!-- <article
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
              <span v-if="company.num_people"
                >&nbsp;{{ company.num_people }}</span
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
          <p>
            {{ $dateFns.format(new Date(company.remote_since), 'MMMM do') }}
          </p>

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
            <btn-edit-company :company-id="company.id" />
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
              <btn-add-experience :company-id="company.id" />
            </p>
          </div>
        </div>
      </article> -->
      <nav>
        <button v-if="context.offset > 0" @click="prevPage">prev</button>
        <button @click="nextPage">next</button>
      </nav>
    </template>
    <template v-else-if="state.matches('notFound')">
      <p class="p-8 mb-8 text-center bg-white shadow-lg">
        No companies added yet.<br />Be the first by contributing👆 and help to
        support our fellow architects!
      </p>
    </template>
  </div>
</template>

<script>
import { companiesMachine } from '@/fsm/companiesMachine'
import Experience from '@/components/Experience'
import BtnAddExperience from '@/components/BtnAddExperience'
import BtnEditCompany from '@/components/BtnEditCompany'
import CompanyDetails from '@/components/CompanyDetails'
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
    Experience,
    CompanyDetails,
    BtnEditCompany,
    BtnAddExperience
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
