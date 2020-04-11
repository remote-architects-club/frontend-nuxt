<template>
  <div>
    <template v-if="!state || state.matches('fetching')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <template v-else>
      <section data-cy="own-experience">
        <h2 class="mb-4 font-bold">
          How does it feel to be working from home?
        </h2>
        <ul data-cy="own-experience-list" class="own-experience">
          <li
            v-for="exp in context.snippets.ownExperience"
            :key="exp.id"
            class="relative px-4 pt-10 pb-4 bg-white border-t-2 border-black shadow-lg"
          >
            <span
              class="absolute top-0 left-0 z-0 pl-2 font-bold leading-tight text-gray-300 quote"
            >
              &ldquo;
            </span>
            <div class="relative z-20 flex flex-col justify-between h-full">
              <div>
                <p>{{ exp.own_experience_text }}</p>
                <p class="italic text-gray-600">&mdash; {{ exp.name }}</p>
              </div>
              <div class="mt-auto text-gray-600">
                <p>
                  {{ exp.office_name }}<br />{{ exp.city }},
                  {{ exp.country_iso }}
                </p>
                <p class="text-sm">
                  <nuxt-link :to="`/company?id=${exp.office_id}`" class="link"
                    >read more<span class="no-underline">
                      &rarr;</span
                    ></nuxt-link
                  >
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <div class="h-8" />
      <section data-cy="tools">
        <h2 class="mb-4 font-bold">What are people saying about tools?</h2>
        <ul data-cy="tools-list" class="tools-list">
          <li
            v-for="tool in context.snippets.tools"
            :key="tool.id"
            class="relative px-4 pt-10 pb-4 bg-white border-t-2 border-black shadow-lg"
          >
            <span
              class="absolute top-0 left-0 z-0 pl-2 font-bold leading-tight text-gray-300 quote"
            >
              &ldquo;
            </span>
            <div class="relative z-20 flex flex-col justify-between h-full">
              <div>
                <p>{{ tool.tools_text }}</p>
                <p class="italic text-gray-600">&mdash; {{ tool.name }}</p>
              </div>
              <div class="h-2" />
              <div class="mt-auto text-gray-600">
                <p>using:</p>
                <div class="h-2" />
                <ul class="">
                  <li
                    v-for="t in cleanToolsArray(tool.tools_array)"
                    :key="t.id"
                    class="-mb-1"
                  >
                    <tool-chip :id="t.id" :name="t.name" :url="t.url" />
                  </li>
                </ul>
                <div class="h-3" />
                <p>
                  {{ tool.office_name }}<br />{{ tool.city }},
                  {{ tool.country_iso }}
                </p>
                <p class="text-sm">
                  <nuxt-link :to="`/company?id=${tool.office_id}`" class="link"
                    >read more<span class="no-underline">
                      &rarr;</span
                    ></nuxt-link
                  >
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="h-8" />
        <section data-cy="tools-top-10">
          <h2 class="mb-4 font-bold">Top 10 most used tools</h2>

          <div class="p-4 bg-white shadow-lg sm:p-8">
            <ol data-cy="tools-top-10-list">
              <li
                v-for="(tool, i) in context.snippets.toolsTop10"
                :key="tool.id"
                class="flex flex-wrap"
              >
                <p class="mb-1">
                  {{ i + 1 }}.
                  <span class="font-semibold"
                    ><nuxt-link
                      :to="`/tools/tool?id=${tool.id}`"
                      class="link"
                      >{{ tool.name }}</nuxt-link
                    ></span
                  >
                </p>
                <p class="text-gray-600">
                  &nbsp;&nbsp;{{ tool.num_offices }} companies
                </p>
              </li>
            </ol>
          </div>
        </section>
      </section>
    </template>
  </div>
</template>

<script>
import ToolChip from '@/components/ToolChip'
export default {
  name: 'HomeSnippets',
  components: {
    ToolChip
  },
  props: {
    companiesMachine: {
      type: Object,
      required: true
    }
  },
  computed: {
    state() {
      return this.companiesMachine.current
    },
    context() {
      return this.companiesMachine.context
    }
  },
  methods: {
    cleanToolsArray(toolsArray) {
      // console.log(typeof toolsArray)
      let newStr = toolsArray.replace(/("")/g, '"')
      newStr = newStr.replace(/(\("\[)/g, '')
      newStr = newStr.replace(/(\]"\))/g, '')
      newStr = newStr.replace(/(\}, )/g, '},,')
      // console.log(newStr)
      // console.log(newStr)

      const newArr = newStr.split(',,').map((obj) => JSON.parse(obj))
      // console.log(newArr)
      return newArr
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-gap: 1rem;
}
ul.own-experience {
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
}
ul.tools-list {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.quote {
  font-size: 8rem;
}
</style>
