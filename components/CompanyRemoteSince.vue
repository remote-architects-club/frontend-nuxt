<template>
  <div>
    <template v-if="isEditing">
      <p class="flex items-center mb-1 font-semibold">
        {{ label }}
      </p>
      <form @submit.prevent="submit">
        <!-- <input
          type="date"
          v-model="edited"
          class="w-full p-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          placeholder="Describe your company's policy related to working from home."
        /> -->

        <datepicker
          v-model="edited"
          calendar-class=""
          input-class="p-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
        />

        <p class="flex items-center mt-2">
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
      <p>
        {{ formattedDate }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    remoteSince: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      edited: '',
      label: 'policy on since'
    }
  },
  computed: {
    formattedDate() {
      if (this.remoteSince)
        return this.$dateFns.format(new Date(this.remoteSince), 'MMMM do')
      return ''
    }
  },
  methods: {
    edit() {
      if (!this.edited) this.edited = new Date(this.remoteSince)
      this.isEditing = true
    }
  }
}
</script>

<style>
.vdp-datepicker__calendar .cell.selected {
  @apply bg-yellow-500 !important;
}
.vdp-datepicker__calendar .cell:hover {
  @apply border border-yellow-500 !important;
}
</style>
