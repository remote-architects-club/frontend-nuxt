<template>
  <div class="p-4 bg-white shadow-lg sm:p-8">
    <h2 class="mb-8 font-bold">
      First, let's get some info about your company
    </h2>
    <template v-if="matches('noCompany')">
      <p class="mb-2">What's your company's name?</p>
      <input
        id="office-name"
        v-model="companyName"
        v-debounce:500.lock="search"
        data-cy="office-name"
        type="text"
        class="w-full p-4 transition duration-150 ease-in-out border border-black rounded-none shadow-inner focus:outline-none focus:shadow-focus"
        placeholder="Company name"
      />
      <div class="mb-8">
        <p v-if="!companyName" class="text-sm" data-cy="explanation">
          As soon as you enter a name, we'll search on our database if this
          office's already been added.
        </p>

        <template v-if="matches('noCompany.searching')">
          <div class="flex items-center justify-center p-12" data-cy="spinner">
            <spinner color="#000" />
          </div>
        </template>
        <!-- <p v-if="matches('noCompany.searching')">
          Searching...
        </p> -->
      </div>
      <div v-if="matches('noCompany.found')" data-cy="results">
        <p class="mb-6 border-b-2 border-black">
          Found {{ context.foundCompanies.length }} possible
          <span v-if="context.foundCompanies.length === 1">match</span
          ><span v-else>matches</span>
        </p>
        <ul v-if="context.foundCompanies.length > 0" class="mb-8">
          <li
            v-for="foundCompany in context.foundCompanies"
            :key="foundCompany.id"
            class="flex justify-between mb-4"
          >
            <div class="w-full">
              <p class="font-bold">
                {{ foundCompany.name }}
              </p>
              <p class="flex items-center mr-4">
                <v-icon icon="location" class="w-4 h-4" />{{
                  foundCompany.city
                }},
                {{ foundCompany.country_iso }}
              </p>
            </div>

            <p>
              <button class="btn btn-regular" @click="select(foundCompany.id)">
                select
              </button>
            </p>
          </li>
        </ul>
      </div>
      <div v-if="matches('noCompany.notFound')" data-cy="not-found">
        <p class="my-4">No matches found for "{{ companyName }}"</p>
      </div>
      <p v-if="searched && companyName" class="mt-4 text-center">
        <span v-if="matches('noCompany.found')" class="text-sm"
          >None of the above?</span
        >
        <br />
        <button
          :disabled="matches('noCompany.searching')"
          class="btn btn-regular"
          data-cy="btn-add-new"
          @click="add(companyName)"
        >
          &plus; add new entry for <strong>{{ companyName }}</strong>
        </button>
      </p>
    </template>
    <template v-else-if="matches('addCompany')">
      <company-add-form />
    </template>
    <template v-else>
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
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
  watch: {
    companyName(val) {
      if (!val) {
        this.send({ type: 'RESET' })
      }
    },
    state() {
      if (this.matches('addCompany.done')) {
        this.$emit('select', this.context.companyId)
      }
    }
  },
  mounted() {
    if (!this.matches('noCompany.idle')) {
      this.send({ type: 'RESTART' })
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
    }
    // goToStep2() {
    //   this.$router.push(`/add/${this.context.company.id}`)
    // }
  }
}
</script>

<style scoped></style>
