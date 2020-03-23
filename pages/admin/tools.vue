<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Tools</h1>
    <template v-if="state.matches('fetching')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-else-if="!state.matches('fetching') && tools.length > 0">
      <ul>
        <li v-for="tool in tools" :key="tool.id">
          <tool-admin
            :tool="tool"
            :categories="categories"
            @save-categories="saveCategories"
          />
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { toolsMachineVue } from '@/fsm/toolsMachine'
import ToolAdmin from '@/components/admin/ToolAdmin'
export default {
  layout: 'admin',
  components: {
    ToolAdmin
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
    }
  },
  mounted() {
    toolsMachineVue.send({ type: 'FETCH' })
  },
  methods: {
    saveCategories(params) {
      toolsMachineVue.send({ type: 'SAVE_CATEGORIES', params: { ...params } })
    }
  }
}
</script>

<style lang="scss" scoped></style>
