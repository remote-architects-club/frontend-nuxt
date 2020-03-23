<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Tools</h1>
    <template v-if="state.matches('fetching')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-else-if="state.matches('idle') && tools.length > 0">
      <nav class="flex justify-end mb-4 text-sm">
        <p class="inline-block mr-4">
          sort:
          <button
            class="link"
            @click="sortBy = 'name'"
            :class="{ 'font-semibold': sortBy === 'name' }"
          >
            name
          </button>
          <span> | </span>
          <button
            class="link"
            @click="sortBy = 'popularity'"
            :class="{ 'font-semibold': sortBy === 'popularity' }"
          >
            popularity
          </button>
        </p>
        <p class="inline-block">
          filter:
          <label class="mr-2"
            ><input
              type="checkbox"
              v-model="showFree"
              class="mr-1"
              :disabled="!showPaid"
            /><span>free</span></label
          >
          <label
            ><input
              type="checkbox"
              v-model="showPaid"
              class="mr-1"
              :disabled="!showFree"
            /><span>paid</span></label
          >
        </p>
        <p>
          <select v-model="filterCategory">
            <option value="">None</option>
            <option v-for="{ name } in categories" :key="name">{{
              name
            }}</option>
          </select>
        </p>
      </nav>
      <template v-for="tool in toolsSorted">
        <tool :tool="tool" v-if="tool.url" :key="tool.id" />
      </template>
    </template>
    <template v-else-if="state.matches('idle') && tools.length === 0">
      <p>
        No tools were found.
      </p>
    </template>
    <template v-else-if="state.matches('failedFetch')">
      <p>
        There was an internal error when trying to get the tools... Reload page
        to try again.
      </p>
    </template>
  </div>
</template>

<script>
import { toolsMachineVue } from '@/fsm/toolsMachine'

import Tool from '@/components/Tool'

export default {
  layout: 'pages',
  components: {
    Tool
  },
  data() {
    return {
      sortBy: 'popularity',
      showFree: true,
      showPaid: true,
      filterCategory: null
    }
  },
  mounted() {
    toolsMachineVue.send({ type: 'FETCH' })
  },
  computed: {
    state() {
      return toolsMachineVue.current
    },
    context() {
      return toolsMachineVue.context
    },
    tools() {
      return this.context.tools
    },
    categories() {
      return this.context.categories
    },
    toolsFiltered() {
      if (this.showFree && this.showPaid) return this.tools
      if (!this.showFree) {
        return this.tools.filter((tool) => !tool.is_free)
      } else {
        return this.tools.filter((tool) => tool.is_free)
      }
    },
    toolsSorted() {
      if (!this.toolsFiltered && !this.toolsFiltered.length > 0) return []
      if (this.sortBy === 'popularity') {
        console.log('pop')

        return [...this.toolsFiltered].sort(
          (a, b) => b.office_tools.length - a.office_tools.length
        )
      } else if (this.sortBy === 'name') {
        console.log('name')
        return [...this.toolsFiltered].sort((a, b) => a.name[0] - b.name[0])
      }
      return []
    }
  }
}
</script>
