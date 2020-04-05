<template>
  <div>
    <ul v-if="tools.length > 0" class="flex flex-wrap">
      <li v-for="tool in tools" :key="tool.id" class="mb-2 mr-1">
        <tool-chip :id="tool.id" :name="tool.name" :url="tool.url" />
      </li>
    </ul>
  </div>
</template>

<script>
import ToolChip from '@/components/ToolChip'
export default {
  name: 'ToolChipList',
  components: {
    ToolChip
  },
  props: {
    tools: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped></style>
