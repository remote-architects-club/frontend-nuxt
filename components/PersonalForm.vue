<template>
  <div>
    <template v-if="state.matches('editing')">
      <h2 class="mb-4 font-bold">
        Tell us how's it going at your company
      </h2>
      <form-template />
    </template>

    <template v-else-if="state.matches('saving')">
      <div class="flex items-center justify-center p-12">
        <spinner color="#000" />
      </div>
    </template>

    <template v-else-if="state.matches('done')">
      <div class="flex flex-col items-center p-8 bg-white shadow-lg">
        <p class="mb-4 font-bold text-center">Thank you!</p>
        <p class="mb-4 text-center">
          <nuxt-link :to="`/company/${companyId}`" class="link"
            >See what other people are saying about your company</nuxt-link
          >
          <br />or<br /><nuxt-link to="/" class="link"
            >Browse all companies</nuxt-link
          >
        </p>
        <mc-api-form sign-up-location="contribute_form" />

        <div class="mx-auto">
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
      </div>
    </template>
  </div>
</template>

<script>
import FormTemplate from '@/components/FormTemplate'
import McApiForm from '@/components/McApiForm'

export default {
  components: {
    FormTemplate,
    McApiForm,
  },
  props: {
    companyId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    personalMachine() {
      return this.$contributeMachine.context.personalMachine
    },
    state() {
      return this.personalMachine.state
    },
    context() {
      return this.personalMachine.state.context
    },

    formState() {
      return this.context.formState
    },
  },

  methods: {},
}
</script>

<style scss>
/* input[type='radio'] {
  margin-top: -2px;
  @apply -mt-1;
} */
</style>
