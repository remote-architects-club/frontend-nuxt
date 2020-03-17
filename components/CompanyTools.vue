<template>
  <div>
    <template v-if="isEditing">
      <p class="flex items-center mb-1 font-semibold">
        {{ label }}
      </p>
      <form @submit.prevent="submit">
        <ul class="flex mt-1 mb-2">
          <li
            v-for="tool in tools"
            :key="tool.id"
            class="px-4 py-1 mr-2 border border-black rounded-full"
          >
            {{ tool.name
            }}<button
              @click="edit"
              class="pl-2 text-lg font-bold transition duration-150 ease-in-out hover:text-yellow-500 focus:outline-none focus:shadow-focus"
            >
              &times;
            </button>
          </li>
        </ul>
        <p>
          <input
            type="text"
            placeholder="Add new tool"
            class="w-full p-4 mb-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          />
        </p>
        <p class="flex items-center">
          <button
            type="submit"
            class="px-4 py-2 mr-4 font-bold transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
          >
            save
          </button>
          <button
            @click="isEditing = false"
            class="px-4 py-2 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus"
          >
            cancel
          </button>
        </p>
      </form>
    </template>
    <template v-else>
      <p class="flex items-center mb-1 font-semibold">
        {{ label }}
        <button
          @click="edit"
          class="ml-2 transition duration-150 ease-in-out hover:text-yellow-500 focus:outline-none focus:shadow-focus"
        >
          <v-icon icon="edit" class="w-4 h-4" />
        </button>
      </p>
      <ul class="flex mt-1">
        <li
          v-for="tool in tools"
          :key="tool.id"
          class="px-4 py-1 mr-2 border border-black rounded-full "
        >
          {{ tool.name }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tools: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      edited: this.tools,
      label: 'tools'
    }
  },
  methods: {
    edit() {
      if (!this.edited) this.edited = this.tools
      this.isEditing = true
    }
  }
}
</script>

<style scoped></style>
