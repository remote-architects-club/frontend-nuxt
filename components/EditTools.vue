<template>
  <div>
    <ul class="flex flex-wrap mt-1">
      <li
        v-for="{ tool } in context.tools"
        :key="tool.id"
        class="px-4 py-1 mb-2 mr-2 border border-black rounded-full"
      >
        {{ tool.name
        }}<button
          @click="remove(tool)"
          class="pl-2 text-lg font-bold transition duration-150 ease-in-out hover:text-yellow-500 focus:outline-none focus:shadow-focus"
        >
          &times;
        </button>
      </li>
    </ul>
    <div class="p-4 my-4 border border-black">
      <p class="mb-1 font-semibold">Add new tool</p>

      <div class="flex items-center">
        <input
          type="text"
          placeholder="Tool name..."
          maxlength="25"
          class="w-full p-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          v-model.trim="toolName"
          v-debounce:500.lock="search"
        />
        <p class="-ml-10 font-mono text-xs text-left text-gray-600">
          {{ toolName.length }}/25
        </p>
      </div>

      <div class="mb-2">
        <p class="text-sm" v-if="!toolName">
          Start typing to search...
        </p>
        <p v-if="matches('not_found')" class="mt-2 text-right">
          <button
            @click="add"
            class="px-4 py-2 text-sm transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
          >
            add new entry for <strong>{{ toolName }}</strong>
          </button>
        </p>
        <p v-if="matches('searching')">
          Searching...
        </p>
      </div>
      <div v-if="matches('found')" class="mt-4">
        <ul v-if="context.foundItems.length > 0" class="flex">
          <li v-for="tool in context.foundItems" :key="tool.id" class="">
            <button
              @click="select(tool)"
              :disabled="isAdded(tool.id)"
              class="px-4 py-1 mr-2 transition duration-150 ease-in-out border border-black rounded-full hover:bg-yellow-500 focus:outline-none focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ tool.name }}<span class="pl-2 text-lg font-bold">&plus;</span>
            </button>
          </li>
        </ul>
      </div>
      <div v-else-if="matches('notFound') && toolName" class="mt-4">
        <button
          @click="addNew(toolName)"
          class="px-4 py-1 mr-2 transition duration-150 ease-in-out border border-black rounded-full hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
        >
          add <strong>{{ toolName }}</strong
          ><span class="pl-2 text-lg font-bold">&plus;</span>
        </button>
      </div>
    </div>
    <p class="flex items-center">
      <button
        @click="finish"
        class="px-4 py-2 mr-4 font-bold transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
      >
        ok
      </button>
      <button
        @click="finish"
        class="px-4 py-2 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus"
      >
        close
      </button>
    </p>
    <!-- TODO: delete -->
    <div
      class="absolute top-0 right-0 p-2 m-2 font-bold bg-gray-300 rounded shadow font-sm"
    >
      {{ state.value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolName: ''
    }
  },
  computed: {
    companyService() {
      return this.$contributeMachine.context.companyMachine
    },
    toolsService() {
      return this.companyService.children.get('toolsMachine')
    },
    context() {
      return this.toolsService.state.context
    },
    state() {
      return this.toolsService.state
    },
    searched() {
      return this.toolName && !this.context.isFirstSearch
    }
  },
  watch: {
    toolName(val) {
      if (val.trim().length === 0) {
        this.reset()
      }
    }
  },
  methods: {
    search() {
      if (this.toolName) {
        return this.toolsService.send({
          type: 'SEARCH',
          params: { searchTerm: this.toolName }
        })
      }
    },
    select(tool) {
      this.toolName = ''
      // this.$emit('select', tool)
      this.toolsService.send({ type: 'SELECT', params: { tool } })
      this.reset()
    },
    addNew(name) {
      this.toolsService.send({ type: 'ADD_NEW', params: { name } })
    },
    remove(tool) {
      this.toolsService.send({ type: 'REMOVE', params: { tool } })
    },
    reset() {
      this.toolsService.send({ type: 'RESET' })
    },
    finish() {
      this.toolsService.send({ type: 'FINISH' })
    },
    isAdded(id) {
      return this.context.tools.findIndex((item) => item.tool.id === id) >= 0
    },
    matches(value) {
      return this.toolsService.state.matches(value)
    },
    send(event) {
      this.toolsService.send(event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
