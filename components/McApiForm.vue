<template>
  <div>
    <template v-if="isLoading">
      <div class="py-2">
        <spinner color="#000" size="25" />
      </div>
    </template>
    <template v-else-if="status === 'success'">
      <p class="font-bold" data-cy="subscribe-success">
        👏 Great, we'll get in touch shortly!
      </p>
    </template>
    <template v-else-if="status === 'failure'">
      <div data-cy="subscribe-failure">
        <p class="font-bold">Oops 🙀!</p>
        <p>
          I'm so sorry, something went wrong on my side!
          <button class="link" @click="status = 'idle'">
            Wanna try again?
          </button>
        </p>
      </div>
    </template>
    <template v-else>
      <form class="flex" data-cy="subscribe" @submit.prevent="submit">
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email"
          data-cy="email-input"
          v-bind="$attrs"
          class="p-1 mr-1 text-black transition duration-150 ease-in-out border border-black rounded-none shadow-inner focus:outline-none focus:shadow-focus"
        /><button
          type="submit"
          class="flex-none btn btn-regular"
          :disabled="isLoading"
        >
          subscribe
        </button>
      </form>
    </template>
  </div>
</template>

<script>
const NETLIFY_MC_FUNCTION = '/.netlify/functions/newsletter-signup'
export default {
  name: 'McApiForm',
  props: {
    signUpLocation: {
      type: String,
      default: 'General',
    },
    isDark: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      isLoading: false,
      status: 'idle',
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      await this.sendToMailchimp()
      this.isLoading = false
    },
    async sendToMailchimp() {
      const url = `${NETLIFY_MC_FUNCTION}?email=${encodeURIComponent(
        this.email
      )}&tag=${this.signUpLocation}`
      console.log(url)
      try {
        const res = await fetch(url)
        if (res.status !== 200) {
          throw new Error(res)
        }
        this.status = 'success'
      } catch (e) {
        console.error(e)
        this.status = 'failure'
      }
    },
  },
}
</script>
