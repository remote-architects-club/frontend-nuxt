<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Tools</h1>
    <div class="p-4 mb-8 bg-white shadow-lg ">
      <template v-if="state.matches('fetching')">
        <div class="flex items-center justify-center p-12">
          <spinner color="#000" />
        </div>
      </template>
      <template v-else-if="state.matches('idle')">
        <nav v-if="tools.length > 0" class="flex justify-end mb-4 text-sm">
          <p class="inline-block mr-4">
            <button
              class="link"
              :class="{ 'font-semibold': sortBy === 'name' }"
              @click="sortBy = 'name'"
            >
              &darr;name
            </button>
            <span> | </span>
            <button
              class="link"
              :class="{ 'font-semibold': sortBy === 'popularity' }"
              @click="sortBy = 'popularity'"
            >
              &darr;popularity
            </button>
          </p>
          <p class="inline-block mr-4">
            <label class="mr-1"
              ><input
                v-model="showFree"
                type="checkbox"
                class="mr-1"
                :disabled="!showPaid"
              /><span>free</span></label
            >
            <label
              ><input
                v-model="showPaid"
                type="checkbox"
                class="mr-1"
                :disabled="!showFree"
              /><span>paid</span></label
            >
          </p>
          <p class="inline-block">
            <select
              v-model="filterCategory"
              placeholder="category..."
              class="pl-1 pr-8 select-css"
            >
              <option value="" selected>-- all categories --</option>
              <option v-for="{ name } in categories" :key="name">{{
                name
              }}</option>
            </select>
          </p>
        </nav>
        <div v-if="toolsSorted.length > 0" data-cy="tools-list">
          <template v-for="tool in toolsSorted">
            <tool v-if="tool.url" :key="tool.id" :tool="tool" />
          </template>
        </div>
        <template v-else>
          <p class="flex p-4 mb-8 bg-white shadow-lg sm:p-8">
            No tools were found.
            <button class="link" @click="clearFilters">
              Try clearing the filters.
            </button>
          </p>
        </template>
      </template>
      <template v-else-if="state.matches('idle') && tools.length === 0">
        <p>
          Oops, no tools were found... we'll add some soon...
        </p>
      </template>
      <template v-else-if="state.matches('failedFetch')">
        <p>
          There was an internal error when trying to get the tools... Reload
          page to try again.
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { toolsMachineVue } from '@/fsm/toolsMachine'

import Tool from '@/components/Tool'

export default {
  name: 'PageTools',
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
      let tools = [...this.tools]
      if (this.filterCategory)
        tools = this.filterByCategory(tools, this.filterCategory)
      if (this.showFree && this.showPaid) return tools
      if (!this.showFree) {
        return tools.filter((tool) => !tool.is_free)
      } else {
        return tools.filter((tool) => tool.is_free)
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
  },
  mounted() {
    toolsMachineVue.send({ type: 'FETCH' })
  },
  methods: {
    filterByCategory(tools, category) {
      return tools.filter((tool) =>
        tool.tool_categories.map((tc) => tc.category_name).includes(category)
      )
    },
    clearFilters() {
      this.showFree = true
      this.showPaid = true
      this.filterCategory = null
    }
  }
}
</script>
