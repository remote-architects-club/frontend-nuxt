<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Tools</h1>
    <template v-if="state.matches('fetching')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-else-if="state.matches('idle') && tools.length > 0">
      <template v-for="tool in toolsByUsage">
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
    toolsByUsage() {
      if (this.tools && this.tools.length > 0) {
        return [...this.tools].sort(
          (a, b) => b.office_tools.length - a.office_tools.length
        )
      }
      return []
    }
  }
}
</script>
