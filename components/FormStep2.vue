<template>
  <div class="p-8 bg-white shadow-lg">
    <h2 class="mb-8 font-bold">
      Tell us about your experience working from home at
      {{ company.name }}
    </h2>

    <form ref="form" @submit.prevent="validate">
      <section class="mb-8">
        <p class="mb-4">
          In general, how would you rate your overall experience so far? *
        </p>
        <ul class="pl-4 mb-8">
          <li class="flex mb-2">
            <input type="radio" id="own_rating_1" name="own_rating" value="1" />
            <label for="own_rating_1" class="ml-2"
              >😭I hate it, wanna go back to the office</label
            >
          </li>
          <li class="flex mb-2">
            <input type="radio" id="own_rating_2" name="own_rating" value="3" />
            <label for="own_rating_2" class="ml-2"
              >🙄Meh, it's alright...</label
            >
          </li>
          <li class="flex mb-2">
            <input type="radio" id="own_rating_3" name="own_rating" value="5" />
            <label for="own_rating_3" class="ml-2">🥳I'm loving it!</label>
          </li>
        </ul>

        <p>Care to elaborate?</p>
        <textarea
          v-model="experience"
          class="w-full p-4 mt-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          placeholder="Is everything working as expected? Are you having any difficulties? Anything you particular like/hate?"
        />
        <p class="text-sm text-right">{{ experience.length }}/280</p>
      </section>

      <section class="mb-8">
        <p class="mb-4">
          What about the <strong>tools</strong> you are using?*
        </p>

        <ul class="pl-4 mb-8">
          <li class="flex mb-2">
            <input
              type="radio"
              id="tools_rating_1"
              name="tools_rating"
              value="1"
            />
            <label for="tools_rating_1" class="ml-2"
              >😤It's just not working, it's hard to get work done</label
            >
          </li>
          <li class="flex mb-2">
            <input
              type="radio"
              id="tools_rating_2"
              name="tools_rating"
              value="3"
            />
            <label for="tools_rating_2" class="ml-2"
              >😐They're ok, but there is room for improvement</label
            >
          </li>
          <li class="flex mb-2">
            <input
              type="radio"
              id="tools_rating_3"
              name="tools_rating"
              value="5"
            />
            <label for="tools_rating_3" class="ml-2"
              >🤓They're great, we found the right tools and everything is
              running smoothly</label
            >
          </li>
        </ul>
        <p>Any other thoughts about the tools?</p>
        <textarea
          class="w-full p-4 mt-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          v-model="tools_thoughts"
          placeholder="Any tool in particular is a pain or a joy to use? Any other tools you wish your company would use?"
        />
      </section>
      <section class="mb-8">
        <p class="mb-4">
          What do you think about <strong>your company's response</strong> to
          COVID-19?*
        </p>

        <ul class="pl-4 mb-8">
          <li class="flex mb-2">
            <input
              type="radio"
              id="company_rating_1"
              name="company_rating"
              value="1"
            />
            <label for="company_rating_1" class="ml-2"
              >🖕Too slow/not comprehensive enough</label
            >
          </li>
          <li class="flex mb-2">
            <input
              type="radio"
              id="company_rating_2"
              name="company_rating"
              value="3"
            />
            <label for="company_rating_2" class="ml-2"
              >👍It's ok, but there is room for improvement</label
            >
          </li>
          <li class="flex mb-2">
            <input
              type="radio"
              id="company_rating_3"
              name="company_rating"
              value="5"
            />
            <label for="company_rating_3" class="ml-2"
              >👏It was perfect, timely and efficient</label
            >
          </li>
        </ul>
        <p>
          Any other thoughts about <strong>your company's response</strong>?
        </p>
        <textarea
          class="w-full p-4 mt-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          v-model="company_policy_thoughts"
          placeholder="Any deserved praise? Or would you have done things differently?"
        />
      </section>
      <section class="flex items-center mt-12">
        <button
          type="submit"
          class="px-4 py-2 mr-8 font-bold transition duration-150 ease-in-out border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
        >
          save
        </button>
        <button
          @click="cancel"
          class="px-4 py-2 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus"
        >
          cancel
        </button>
      </section>
    </form>
  </div>
</template>

<script>
import { formMachine } from '@/fsm/formMachine'

export default {
  data() {
    return {
      valid: true,
      experience: ''
    }
  },
  computed: {
    state() {
      return formMachine.current
    },
    context() {
      return formMachine.context
    },
    company() {
      return this.context.selectedCompany
    }
  },
  methods: {
    validate() {
      console.log('validate')
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    cancel() {
      console.log('reset')
    }
  }
}
</script>

<style scoped>
input[type='radio'] {
  margin-top: 2px;
}
</style>
