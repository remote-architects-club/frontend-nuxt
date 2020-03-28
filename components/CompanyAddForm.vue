<template>
  <div data-cy="add-form">
    <template v-if="matches('addCompany.editing')">
      <validation-observer v-slot="{ invalid }">
        <div class="mb-4">
          <p class="mb-1">Name*</p>
          <validation-provider v-slot="{ errors }" rules="required" name="name">
            <text-input
              placeholder="Company name"
              v-model="company.name"
              data-cy="input-name"
            ></text-input>
            <span class="error" data-cy="error-name">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="w-1/2 mb-4">
          <p class="mb-1">City*</p>
          <validation-provider v-slot="{ errors }" rules="required" name="city">
            <text-input
              placeholder="City"
              v-model="company.city"
              data-cy="input-city"
            ></text-input>
            <span class="error" data-cy="error-city">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="w-1/2 mb-4">
          <p class="mb-1">Country*</p>
          <validation-provider v-slot="{ errors }" rules="required">
            <country-select
              v-model="company.country_iso"
              data-cy="select-country"
            />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="mb-4">
          <p class="mb-1">Website</p>
          <validation-provider v-slot="{ errors }" rules="url">
            <text-input
              type="url"
              placeholder="https://..."
              v-model="company.url"
              data-cy="input-website"
            ></text-input>
            <span class="error" data-cy="error-website">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="mb-8">
          <p class="mb-1">Size</p>
          <radio-input
            v-model="company.num_people"
            :options="sizeOptions"
            data-cy="radio-size"
          />
        </div>
        <div class="mb-4">
          <p class="flex items-center">
            <button
              @click="save"
              :disabled="invalid"
              class="mr-4 btn btn-regular"
              data-cy="btn-save"
            >
              save
            </button>
            <button @click="cancel" class="btn btn-text" data-cy="btn-cancel">
              cancel
            </button>
          </p>
        </div>
      </validation-observer>
    </template>
    <template v-else-if="matches('addCompany.saving')">
      <div class="flex items-center justify-center h-64">
        <p class="font-bold text-center">Saving...</p>
      </div>
    </template>
    <template v-else-if="matches('hasCompany')">
      <div class="flex items-center justify-center h-64">
        <p class="font-bold text-center">Done!</p>
        <p class="text-center">Redirecting...</p>
      </div>
    </template>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import TextInput from '@/components/TextInput'
import RadioInput from '@/components/RadioInput'
import CountrySelect from '@/components/CountrySelect'
const validate = require('validate.js')

extend('required', {
  ...required,
  message: 'You need to type a {_field_}...'
})
extend('url', (value) => {
  const val = validate({ website: value }, { website: { url: true } })
  if (!val) return true
  return "Hmmm, this doesn't look right (don't forget the http://)"
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    CountrySelect,
    RadioInput,
    TextInput
  },
  data() {
    return {
      company: {
        name: '',
        city: null,
        country_iso: null,
        url: '',
        num_people: 1
      },
      sizeOptions: [
        { label: 'Small (1-9 people)', value: 0 },
        { label: 'Medium (10-49 people)', value: 1 },
        { label: 'Large (50+ people)', value: 2 }
      ]
    }
  },
  computed: {
    service() {
      return this.$contributeMachine.context.companyMachine
    },
    context() {
      return this.service.state.context
    },
    stateValue() {
      return this.service.state.value
    }
  },
  mounted() {
    this.company = this.context.company
  },
  watch: {
    stateValue() {
      if (this.matches('hasCompany')) {
        setTimeout(() => this.goToStep2(), 3000)
      }
    }
  },
  methods: {
    matches(value) {
      return this.service.state.matches(value)
    },
    save() {
      this.service.send({ type: 'SAVE_NEW', params: { company: this.company } })
    },
    cancel() {
      this.service.send({ type: 'CANCEL' })
    },
    goToStep2() {
      // this.$router.push(`/add/${this.context.company.id}`)
      this.$router.push(`/add/company?id=${this.context.company.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  @apply text-xs text-gray-600;
}
</style>
