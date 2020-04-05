<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Tools</h1>
    <template v-if="state.matches('fetchingTool') && !tool">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>
    <div v-else-if="tool" class="p-4 mb-8 bg-white shadow-lg sm:p-8 ">
      <div class="w-full">
        <header
          data-cy="header"
          class="mb-8 sm:flex sm:justify-between sm:items-start"
        >
          <div class="sm:flex sm:items-center">
            <tool-logo
              :url="tool.url"
              :name="tool.name"
              class="w-24 h-24 mr-4 border"
              data-cy="logo"
            />
            <div>
              <h2 class="text-lg font-semibold" data-cy="name">
                {{ tool.name }}
              </h2>
              <p v-if="tool.url" data-cy="url">
                <company-url :url="tool.url" />
              </p>
            </div>
          </div>
          <div class="text-xs sm:flex sm:justify-end">
            <p
              class="inline-block px-2 mb-1 mr-1 text-xs border rounded-full"
              data-cy="price"
            >
              <span v-if="tool.is_free">free</span><span v-else>paid</span>
            </p>

            <ul
              v-if="tool.tool_categories && tool.tool_categories.length > 0"
              data-cy="categories"
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
        </header>
        <section data-cy="description" class="mb-8">
          <p>{{ tool.description }}</p>
        </section>
        <section data-cy="companies" class="mb-8">
          <p v-if="tool.office_tools && tool.office_tools.length > 0" class="">
            <button
              class="link"
              data-cy="btn-show-companies"
              @click="showCompanies = !showCompanies"
            >
              used by {{ tool.office_tools.length }} companies
            </button>
          </p>
          <ul
            v-if="showCompanies"
            class="pt-4 pl-2 border-l border-black"
            data-cy="company-list"
          >
            <li v-for="{ office } in tool.office_tools" :key="office.id">
              {{ office.name }} ({{ office.city }}, {{ office.country_iso }})
            </li>
          </ul>
        </section>
        <section data-cy="comments" class="p-4 mb-8 border border-black">
          <div class="flex flex-wrap items-center justify-between">
            <h3 class="font-bold">comments</h3>
            <button
              v-if="state.matches('idle')"
              class="btn btn-regular"
              @click="openAddComment"
            >
              &plus; add comment
            </button>
          </div>
          <form
            v-if="state.matches('addingComment')"
            class="mt-8"
            data-cy="formAddComment"
            @submit.prevent="saveComment"
          >
            <label>
              How does {{ tool.name }} help you do your job? Tell us what's
              great about it or what needs improvement.
              <textarea-input
                v-model="comment"
                data-cy="inputComment"
                placeholder="Comments"
                :show-count="false"
                rows="3"
              />
            </label>
            <div class="h-4" />
            <label>
              name
              <text-input
                v-model="commenterName"
                data-cy="inputCommenterName"
                placeholder="Enter your name"
              />
            </label>
            <div class="h-4" />
            <div>
              <button
                class="mr-4 btn btn-regular"
                :disabled="comment.length === 0"
              >
                save
              </button>
              <button class="btn btn-text" @click="cancelAddComment">
                cancel
              </button>
            </div>
          </form>
          <ul
            v-if="tool.tool_comments.length"
            data-cy="comment-list"
            class="mt-8"
          >
            <li
              v-for="comment in tool.tool_comments"
              :key="comment.id"
              class="mb-2"
            >
              <p class="font-semibold text-gray-600">
                {{ comment.name
                }}<span class="text-sm font-normal">
                  -
                  {{
                    $dateFns.formatDistanceToNow(new Date(comment.created_at), {
                      addSuffix: true
                    })
                  }}</span
                >
              </p>
              <p>💬{{ comment.comment }}</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { toolsMachineVue } from '@/fsm/toolsMachine'
import ToolLogo from '@/components/ToolLogo'
import CompanyUrl from '@/components/CompanyUrl'
import TextareaInput from '@/components/TextareaInput'
import TextInput from '@/components/TextInput'
export default {
  name: 'PageToolDetails',
  middleware: 'toolId',
  layout: 'pages',
  components: {
    TextInput,
    TextareaInput,
    CompanyUrl,
    ToolLogo
  },
  data() {
    return {
      showCompanies: false,
      comment: '',
      commenterName: ''
    }
  },
  computed: {
    context() {
      return toolsMachineVue.context
    },
    state() {
      return toolsMachineVue.current
    },
    tool() {
      return this.context.tool
    }
  },
  mounted() {
    toolsMachineVue.send({
      type: 'FETCH_TOOL',
      params: { id: this.$route.query.id }
    })
  },
  methods: {
    openAddComment() {
      toolsMachineVue.send({ type: 'ADD_COMMENT' })
    },
    cancelAddComment() {
      this.comment = ''
      toolsMachineVue.send({ type: 'CANCEL' })
    },
    saveComment() {
      const params = {
        name: this.commenterName,
        comment: this.comment
      }
      toolsMachineVue.send({ type: 'SAVE', params })
    }
  }
}
</script>

<style lang="scss"></style>
