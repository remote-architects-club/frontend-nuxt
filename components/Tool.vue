<template>
  <article class="flex p-4 mb-8 border border-black ">
    <figure class="flex-none mr-4 ">
      <tool-logo :url="tool.url" :name="tool.name" />
    </figure>
    <div class="w-full ">
      <div class="sm:flex sm:justify-between">
        <div class="mb-1 sm:mb-2">
          <p class="font-semibold">
            <!-- <a :href="tool.url" class="link">{{ tool.name }}</a> -->
            {{ tool.name }}
          </p>
          <p v-if="tool.url"><company-url :url="tool.url" /></p>
        </div>
        <div>
          <div class="text-xs sm:flex sm:justify-end">
            <p class="inline-block px-2 mb-1 mr-1 text-xs border rounded-full ">
              <span v-if="tool.is_free">free</span><span v-else>paid</span>
            </p>

            <ul
              v-if="tool.tool_categories && tool.tool_categories.length > 0"
              class="flex flex-wrap sm:justify-end"
            >
              <li
                v-for="{ category_name: cat } in tool.tool_categories"
                :key="cat"
                class="px-2 mb-1 mr-1 text-xs bg-gray-300 rounded-full sm:ml-1"
              >
                {{ cat }}
              </li>
            </ul>
          </div>
          <p
            v-if="tool.office_tools && tool.office_tools.length > 0"
            class="text-xs sm:text-right"
          >
            used by {{ tool.office_tools.length }} companies
          </p>
        </div>
      </div>
      <p>{{ tool.description }}</p>
    </div>
  </article>
</template>

<script>
import CompanyUrl from '@/components/CompanyUrl'
import ToolLogo from '@/components/ToolLogo'
export default {
  components: {
    ToolLogo,
    CompanyUrl
  },
  props: {
    tool: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
