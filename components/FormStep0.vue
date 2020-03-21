<template>
  <div class="p-8 bg-white shadow-lg">
    <h2 class="mb-8 font-bold">
      First, let's get some info about your company
    </h2>
    <template v-if="matches('noCompany')">
      <p class="mb-2">What's your company's name?</p>
      <input
        type="text"
        class="w-full p-4 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
        placeholder="Company name"
        v-model="companyName"
        v-debounce:500.lock="search"
      />
      <div class="mb-8">
        <p class="text-sm" v-if="!companyName">
          As soon as you enter a name, we'll search on our database if this
          office's already been added.
        </p>
        <p v-if="searched && companyName" class="mt-2 text-right">
          <button
            @click="add(companyName)"
            :disabled="matches('noCompany.searching')"
            class="px-4 py-2 text-sm transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed"
          >
            add new entry for <strong>{{ companyName }}</strong>
          </button>
        </p>
        <p v-if="matches('noCompany.searching')">
          Searching...
        </p>
      </div>
      <div v-if="matches('noCompany.found')">
        <p class="mt-4 mb-6 border-b-2 border-black">
          Found {{ context.foundCompanies.length }} possible
          <span v-if="context.foundCompanies.length === 1">match</span
          ><span v-else>matches</span>.
        </p>
        <ul v-if="context.foundCompanies.length > 0">
          <li
            v-for="company in context.foundCompanies"
            :key="company.id"
            class="flex items-center justify-between mb-6"
          >
            <p class="font-bold">{{ company.name }}</p>
            <p class="flex items-center">
              <span class="flex items-center mr-4">
                <v-icon icon="location" class="w-4 h-4" />{{ company.city }},
                {{ company.country_iso }}
              </span>
              <button
                @click="select(company.id)"
                class="px-4 py-2 text-sm transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
              >
                select
              </button>
            </p>
          </li>
        </ul>
      </div>
      <div v-if="matches('noCompany.notFound')">
        <p class="my-4">No matches found for "{{ companyName }}."</p>
      </div>
    </template>
    <template v-if="matches('addCompany')">
      <company-add-form />
    </template>
  </div>
</template>

<script>
import CompanyAddForm from '@/components/CompanyAddForm'
export default {
  components: {
    CompanyAddForm
  },
  data() {
    return {
      company: '',
      isLoading: false,
      searchInput: '',
      companyName: ''
    }
  },

  computed: {
    service() {
      return this.$contributeMachine.context.companyMachine
    },
    context() {
      return this.service.state.context
    },
    state() {
      return this.service.state.value
    },
    searched() {
      return this.companyName && !this.context.isFirstSearch
    }
  },
  mounted() {
    if (!this.matches('noCompany.idle')) {
      this.send({ type: 'RESTART' })
    }
  },
  watch: {
    companyName(val) {
      if (!val) {
        this.send({ type: 'RESET' })
      }
    },
    state() {
      if (this.matches('hasCompany')) {
        this.goToStep2()
      }
    }
  },

  methods: {
    matches(value) {
      return this.service.state.matches(value)
    },
    send(event) {
      this.service.send(event)
    },
    search() {
      if (this.companyName) {
        return this.send({
          type: 'SEARCH',
          params: { searchTerm: this.companyName }
        })
      }
    },
    select(id) {
      // console.log(this.company)
      if (id) {
        this.send({
          type: 'SELECT',
          params: {
            id
          }
        })
        return this.$emit('select', id)
      }
    },
    add(name) {
      this.send({
        type: 'ADD',
        params: {
          name
        }
      })
    },
    goToStep2() {
      this.$router.push(`/add/${this.context.company.id}`)
    }
  }
}
</script>

<style scoped></style>
