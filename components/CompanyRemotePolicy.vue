<template>
  <div>
    <template v-if="matches('hasCompany.editing.editingRemotePolicy')">
      <validation-observer v-slot="{ invalid }">
        <div>
          <p class="flex items-center mb-1 font-semibold">
            {{ labelRemotePolicy }}
          </p>
          <validation-provider
            v-slot="{ errors }"
            rules="max:280"
            name="policy"
            vid="policy"
          >
            <textarea-input
              v-model="editedRemotePolicy"
              placeholder="Describe your company's policy related to working from home."
            />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="mb-4">
          <p class="flex items-center mb-1 font-semibold">
            {{ labelRemoteSince }}
          </p>
          <validation-provider
            v-slot="{ errors }"
            rules="required_if:policy,"
            name="date"
          >
            <datepicker
              v-model="editedRemoteSince"
              calendar-class=""
              input-class="p-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
            />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <p class="flex items-center">
          <button
            @click="save"
            :disabled="invalid || !(editedRemotePolicy && editedRemoteSince)"
            class="px-4 py-2 mr-4 font-bold transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed"
          >
            save
          </button>
          <button
            @click="cancel"
            class="px-4 py-2 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus"
          >
            cancel
          </button>
        </p>
      </validation-observer>
    </template>
    <template v-else>
      <template v-if="remotePolicy">
        <div class="mb-4">
          <p class="flex items-center mb-1 font-semibold">
            {{ labelRemotePolicy }}
            <button
              @click="edit"
              class="ml-2 transition duration-150 ease-in-out hover:text-yellow-500 focus:outline-none focus:shadow-focus"
            >
              <v-icon icon="edit" class="w-4 h-4" />
            </button>
          </p>
          <p>
            {{ remotePolicy }}
          </p>
        </div>
        <div class="mb-4">
          <p class="flex items-center mb-1 font-semibold">
            {{ labelRemoteSince }}
            <button
              @click="edit"
              class="ml-2 transition duration-150 ease-in-out hover:text-yellow-500 focus:outline-none focus:shadow-focus"
            >
              <v-icon icon="edit" class="w-4 h-4" />
            </button>
          </p>
          <p>
            {{ formattedDate }}
          </p>
        </div>
      </template>
      <template v-else>
        <p>
          <button
            @click="edit"
            class="px-4 py-2 mr-4 font-bold transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
          >
            + add work-from-home policy
          </button>
        </p>
      </template>
    </template>
  </div>
</template>

<script>
/* eslint-disable camelcase */

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required_if, max } from 'vee-validate/dist/rules'
import TextareaInput from '@/components/TextareaInput'
extend('required_if', {
  ...required_if,
  message: 'You need to add a {_field_}...'
})
extend('max', max)

export default {
  components: {
    TextareaInput,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      editedRemoteSince: '',
      editedRemotePolicy: '',
      labelRemotePolicy: 'work-from-home policy',
      labelRemoteSince: 'policy started on'
    }
  },
  computed: {
    companyService() {
      return this.$contributeMachine.context.companyMachine
    },
    remotePolicy() {
      return this.companyService.state.context.company.remote_policy
    },
    remoteSince() {
      return this.companyService.state.context.company.remote_since
    },
    formattedDate() {
      if (this.remoteSince)
        return this.$dateFns.format(new Date(this.remoteSince), 'MMMM do')
      return ''
    }
  },
  mounted() {
    this.editedRemotePolicy = this.remotePolicy || ''
    this.editedRemoteSince = this.remoteSince || ''
  },
  methods: {
    edit() {
      this.send({ type: 'EDIT', params: { key: 'remote_policy' } })
      // if (!this.edited) this.edited = this.remotePolicy
    },
    cancel() {
      this.send({ type: 'CANCEL_EDIT' })
      this.$emit('cancelEditing')
    },
    save() {
      this.send({
        type: 'SAVE',
        params: {
          remote_policy: this.editedRemotePolicy,
          remote_since: this.editedRemoteSince
        }
      })
    },
    matches(value) {
      return this.companyService.state.matches(value)
    },
    send(event) {
      this.companyService.send(event)
    }
  }
}
</script>

<style scoped>
.error {
  @apply text-xs text-gray-600;
}
</style>
