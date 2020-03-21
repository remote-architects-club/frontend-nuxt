<template>
  <div>
    <template v-if="matches('hasCompany.editing.editingRemoteSince')">
      <p class="flex items-center mb-1 font-semibold">
        {{ label }}
      </p>
      <datepicker
        v-model="edited"
        calendar-class=""
        input-class="p-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
      />

      <p class="flex items-center mt-2">
        <button @click="save" class="mr-4 btn btn-regular">
          save
        </button>
        <button @click="cancel" class="btn btn-text">
          cancel
        </button>
      </p>
    </template>
    <template v-else>
      <template v-if="remotePolicy">
        <p class="flex items-center mb-1 font-semibold">
          {{ label }}
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
      </template>
      <template v-else>
        <p>
          <button
            @click="edit"
            class="px-4 py-2 mr-4 font-bold transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
          >
            + add starting date
          </button>
        </p>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edited: '',
      label: 'policy on since'
    }
  },
  computed: {
    formattedDate() {
      if (this.remoteSince)
        return this.$dateFns.format(new Date(this.remoteSince), 'MMMM do')
      return ''
    },
    companyService() {
      return this.$contributeMachine.context.companyMachine
    },
    remoteSince() {
      return this.companyService.state.context.company.remote_since
    }
  },
  methods: {
    datepickerFormatter(date) {
      return this.$dateFns.format(new Date(date), 'MM-dd-y')
    },
    edit() {
      this.send({ type: 'EDIT', params: { key: 'remote_since' } })
      if (!this.edited) this.edited = new Date(this.remoteSince)
    },
    cancel() {
      this.send({ type: 'CANCEL_EDIT' })
      this.$emit('cancelEditing')
    },
    save() {
      this.send({
        type: 'SAVE',
        params: { remote_since: this.datepickerFormatter(this.edited) }
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

<style>
.vdp-datepicker__calendar .cell.selected {
  @apply bg-yellow-500 !important;
}
.vdp-datepicker__calendar .cell:hover {
  @apply border border-yellow-500 !important;
}
</style>
