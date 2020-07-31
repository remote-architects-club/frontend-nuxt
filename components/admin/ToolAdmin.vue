<template>
  <div>
    <button
      class="w-full hover:border-2 hover:border-black hover:cursor-pointer focus:outline-none"
      @click="toggleEdit"
    >
      <tool :tool="tool" />
    </button>
    <div v-if="edit" class="mb-12">
      <p class="font-bold">Categories</p>
      <ul class="flex flex-wrap">
        <li
          v-for="category in categories"
          :key="category.name"
          class="mx-2 my-1"
        >
          <label
            ><input
              v-model="checkedCategories"
              type="checkbox"
              class="mr-1"
              :value="category.name"
            /><span :class="{ 'font-semibold': isChecked(category.name) }">{{
              category.name
            }}</span></label
          >
        </li>
      </ul>
      <button class="btn btn-regular" @click="saveCategories">save</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */

// import Multiselect from 'vue-multiselect'
import Tool from '@/components/Tool'

export default {
  components: {
    Tool,
    // Multiselect
  },
  props: {
    tool: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      edit: false,
      checkedCategories: this.tool.tool_categories.map(
        (cat) => cat.category_name
      ),
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit
    },
    isChecked(category_name) {
      if (this.tool.tool_categories) {
        return this.tool.tool_categories.find(
          (cat) => cat.category_name === category_name
        )
      }
      return false
    },
    saveCategories() {
      this.$emit('save-categories', {
        tool_id: this.tool.id,
        categories: this.checkedCategories,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
