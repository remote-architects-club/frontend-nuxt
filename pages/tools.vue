<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Tools</h1>
    <div>
      <template v-if="toolsByUsage && toolsByUsage.length > 0">
        <div
          v-for="tool in toolsByUsage"
          :key="tool.id"
          class="flex p-4 mb-8 bg-white shadow-lg "
        >
          <div class="flex-none mr-4 ">
            <tool-logo :url="tool.url" :name="tool.name" />
          </div>
          <div>
            <div class="flex justify-between">
              <div class="mb-2">
                <p class="font-semibold">
                  <!-- <a :href="tool.url" class="link">{{ tool.name }}</a> -->
                  {{ tool.name }}
                </p>
                <p v-if="tool.url"><company-url :url="tool.url" /></p>
              </div>
              <div>
                <div class="flex text-xs">
                  <p class="px-2 mr-1 text-xs border rounded-full">
                    <span v-if="tool.is_free">free</span
                    ><span v-else>paid</span>
                  </p>

                  <ul
                    class="flex justify-end"
                    v-if="
                      tool.tool_categories && tool.tool_categories.length > 0
                    "
                  >
                    <li
                      v-for="{ category_name: cat } in tool.tool_categories"
                      :key="cat"
                      class="px-2 ml-1 text-xs bg-gray-300 rounded-full"
                    >
                      {{ cat }}
                    </li>
                  </ul>
                </div>
                <p v-if="tool.office_tools" class="text-xs text-right">
                  used by {{ tool.office_tools.length }} companies
                </p>
              </div>
            </div>
            <p>{{ tool.description }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import {toolsMachineVue} from '@/fsm/toolsMachine'
import gql from 'graphql-tag'
import { client } from '@/plugins/apollo'
import CompanyUrl from '@/components/CompanyUrl'
import ToolLogo from '@/components/ToolLogo'

export default {
  layout: 'pages',
  components: {
    ToolLogo,
    CompanyUrl
  },
  async asyncData() {
    const { data } = await client.query({
      query: gql`
        query tools {
          tool(order_by: { name: asc }) {
            description
            id
            name
            url
            is_free
            tool_categories(order_by: { category_name: asc }) {
              category_name
            }
            office_tools {
              office {
                id
              }
            }
          }
        }
      `
    })
    return { tools: data.tool }
  },
  data() {
    return {
      tools: []
    }
  },
  computed: {
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
