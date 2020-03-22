<template>
  <div>
    <template v-if="isLoading">
      <div class="py-2">
        <spinner color="#000" size="25" />
      </div>
    </template>
    <template v-else-if="status === 'success'">
      <p class="font-bold">Done 👏!</p>
    </template>
    <template v-else-if="status === 'failure'">
      <p class="font-bold">Oops 🙀!</p>
      <p>
        I'm so sorry, something went wrong on my side!
        <button class="link" @click="status = 'idle'">
          Wanna try again?
        </button>
      </p>
    </template>
    <template v-else>
      <form @submit.prevent="submit" class="flex mb-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          class="w-full p-1 mr-1 transition duration-150 ease-in-out border border-black rounded-none shadow-inner focus:outline-none focus:shadow-focus"
          v-model="email"
        /><button
          type="submit"
          class="flex-none btn btn-regular"
          :disabled="isLoading"
        >
          Subscribe
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
      default: 'General'
    }
  },
  data() {
    return {
      email: '',
      isLoading: false,
      status: 'idle'
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      await this.sendToMailchimp()
      this.isLoading = false
    },
    async sendToMailchimp(email, signUpLocation) {
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
    }
  }
}
</script>
