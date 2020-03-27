<template>
  <div class="text-left">
    <template v-if="state.matches('fetching')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-if="state.matches('found')">
      <company-list-controls
        :context="context"
        @prev-page="prevPage"
        @next-page="nextPage"
      />
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
          <section class="col-2">
            <p class="mb-4 font-semibold">stories</p>

            <div>
              <template v-if="company.experiences.length > 0">
                <experience
                  :experience="experience"
                  v-for="experience in company.experiences"
                  :key="experience.id"
                  class="mb-8 "
                />
              </template>
              <template v-else>
                <p>No stories added yet.<br />👇Be the first and contribute!</p>
              </template>
            </div>
          </section>

          <section class="col-2">
            <div></div>
            <p class="py-6 text-center md:text-left">
              <btn-add-experience :company-id="company.id" />
            </p>
          </section>
        </div>
      </div>
      <!-- <company-list-controls :context="context" /> -->
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
import CompanyListControls from '@/components/CompanyListControls'

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
    CompanyListControls,
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
