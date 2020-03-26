<template>
  <div>
    <template v-if="matches('hasCompany.editing.editingTools')">
      <p class="flex items-center mb-1 font-semibold">
        {{ label }}
      </p>
      <p>What tools is your company using to communicate and collaborate?</p>
      <edit-tools />
    </template>
    <template v-else-if="matches('hasCompany.saving')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-else>
      <template v-if="tools && tools.length > 0">
        <p class="flex items-center mb-1 font-semibold">
          {{ label }}
          <button
            @click="edit"
            class="ml-2 transition duration-150 ease-in-out hover:text-yellow-500 focus:outline-none focus:shadow-focus"
          >
            <v-icon icon="edit" class="w-4 h-4" />
          </button>
        </p>
        <ul class="flex flex-wrap mt-1">
          <li
            v-for="{ tool } in tools"
            :key="tool.id"
            class="px-4 py-1 mb-2 mr-2 border border-black rounded-full"
          >
            {{ tool.name }}
          </li>
        </ul>
      </template>
      <template v-else-if="!matches('hasCompany.editing.editingRemotePolicy')">
        <p>
          <button @click="edit" class="btn btn-regular">
            + add tools you are using
          </button>
        </p>
        <p class="text-sm">
          Let us know what tools you company is using to communicate and
          collaborate.
        </p>
      </template>
    </template>
  </div>
</template>

<script>
import EditTools from '@/components/EditTools'
export default {
  components: {
    EditTools
  },
  data() {
    return {
      label: 'tools'
    }
  },
  computed: {
    companyService() {
      return this.$contributeMachine.context.companyMachine
    },
    tools() {
      return this.companyService.state.context.company.office_tools
    }
  },
  methods: {
    edit() {
      this.edited = [...this.tools]
      this.send({ type: 'EDIT', params: { key: 'office_tools' } })
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

<style scoped></style>
