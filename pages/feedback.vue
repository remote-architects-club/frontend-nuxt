<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">What else?</h1>
    <div class="p-4 bg-white shadow-lg sm:p-8 content">
      <template v-if="thankYou">
        <p class="font-bold">Thank you!</p>
        <div class="my-8">
          <iframe
            src="https://giphy.com/embed/xT1XGT9ersCCKjhVny"
            width="240"
            height="240"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          <p class="text-xs">
            <a
              href="https://giphy.com/gifs/originals-reaction-xT1XGT9ersCCKjhVny"
              >via GIPHY</a
            >
          </p>
        </div>
      </template>
      <template v-else-if="error">
        <p>
          Oops, that's did not work.<br />Wanna
          <button class="link" @click="error = false">go back</button> and try
          again?
        </p>
      </template>
      <template v-else>
        <p>You tell me.</p>
        <p>
          I am building this all alone in the isolation of my little apartment
          in Berlin. But I am building this for you, and would love to hear your
          feedback.
        </p>
        <p>
          What's missing? What should be different? What would you like to see?
        </p>
        <p>Just type below, hit send, and let me know.</p>
        <form
          name="feedback"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          class="max-w-lg"
          @submit.prevent="handleSubmit"
        >
          <input type="hidden" name="form-name" value="feedback" />
          <p>
            <textarea-input
              placeholder="Share your thoughts..."
              v-model="form.feedback"
              name="feedback"
              :show-count="false"
            />
          </p>
          <p class="mb-8">
            <label
              >If you'd like to hear back from me, let me know your email<br />
              <text-input
                type="email"
                name="email"
                placeholder="Enter you email"
                v-model="form.email"
            /></label>
          </p>
          <p>
            <button type="submit" class="btn btn-regular">
              Send
            </button>
          </p>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import TextareaInput from '@/components/TextareaInput.vue'
import TextInput from '@/components/TextInput.vue'
export default {
  layout: 'pages',
  components: { TextareaInput, TextInput },
  data() {
    return {
      error: false,
      thankYou: false,
      form: {
        email: '',
        feedback: ''
      }
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    handleSubmit() {
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      this.$axios
        .$post(
          '/',
          this.encode({
            'form-name': 'feedback',
            ...this.form
          }),
          axiosConfig
        )
        .then(() => {
          this.thankYou = true
        })
        .catch(() => {
          this.error = true
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
