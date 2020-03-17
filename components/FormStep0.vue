<template>
  <div class="p-8 bg-white shadow-lg">
    <h2 class="mb-8 font-bold">
      First, let's get some info about your company
    </h2>
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
          @click="add"
          class="px-4 py-2 text-sm transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
        >
          add new entry for <strong>{{ companyName }}</strong>
        </button>
      </p>
      <p v-if="state.matches('step_0.searching')">
        Searching...
      </p>
    </div>
    <div v-if="state.matches('step_0.found')">
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
              <img src="~assets/icons/location.svg" class="w-4 h-4" />{{
                company.city
              }}, {{ company.country_iso }}
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
  </div>
</template>

<script>
import { formMachine } from '@/fsm/formMachine'

export default {
  data() {
    return {
      company: '',
      isLoading: false,
      searchInput: '',
      companyName: '',
      isFirstSearch: true
    }
  },
  computed: {
    state() {
      return formMachine.current
    },
    context() {
      return formMachine.context
    },
    searched() {
      return this.companyName && !this.isFirstSearch
    }
  },
  watch: {
    companyName(val) {
      if (!val) {
        formMachine.send({ type: 'RESET' })
      }
    }
  },

  methods: {
    search() {
      if (this.companyName) {
        if (this.isFirstSearch) this.isFirstSearch = false
        return formMachine.send({
          type: 'SEARCH',
          params: { searchTerm: this.companyName }
        })
      }
    },
    select(id) {
      // console.log(this.company)
      if (id) {
        formMachine.send({
          type: 'SELECT',
          params: {
            id
          }
        })
        return this.$emit('select')
      }
    },
    add() {
      return this.$emit('add', this.companyName)
    }
  }
}
</script>

<style scoped></style>
