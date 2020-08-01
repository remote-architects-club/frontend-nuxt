<template>
  <div>
    <h1 class="mb-4 text-3xl font-bold">Remote Jobs</h1>
    <div class="h-full p-4 mb-8 bg-white shadow-lg">
      <div class="prose">
        <p>
          Are companies starting to look into hiring remote? Are there
          architects out there looking for remote jobs in architecture?
        </p>
        <p>
          We are gauging interest in a future
          <strong>remote job board for architects</strong>. If you are
          interested in participating, chose one of the following options:
        </p>
      </div>
      <div class="py-8 md:py-12">
        <template v-if="!type">
          <ul class="flex flex-col items-center justify-center space-y-4">
            <li>
              <button
                class="w-full px-6 btn btn-large md:w-auto"
                @click="company"
              >
                I want to <strong>hire</strong> remote architects!
              </button>
            </li>
            <li>
              <button
                class="w-full px-6 btn btn-large md:w-auto"
                @click="architect"
              >
                I want to <strong>find</strong> a remote job!
              </button>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="flex items-center justify-center">
            <div class="p-6 text-center border-2 border-black">
              <template v-if="type === 'company'">
                <p class="mb-4 font-bold">
                  "I want to <strong>hire</strong> remote architects!"
                </p>
                <p>
                  Great to hear 🙌<br />We will work hard on building a platform
                  to allow you to do just that.
                </p>
              </template>
              <template v-else-if="type === 'architect'">
                <p class="mb-4 font-bold">
                  "I want to <strong>find</strong> a remote job!"
                </p>
                <p>
                  Great to hear 💪<br />We will work hard on building a platform
                  to allow you to do just that.
                </p>
              </template>
              <div class="h-6"></div>
              <mc-api-form
                placeholder="Enter your email"
                :sign-up-location="`jobs-${type}`"
                button-text="let me know when it's ready"
                :is-vertical="true"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { jobsFormMachineVue } from '@/fsm/jobsFormMachine'

export default {
  name: 'JobsPage',
  layout: 'pages',
  data() {
    return {
      type: null,
      ip: null,
    }
  },
  computed: {
    state() {
      return jobsFormMachineVue.current
    },
    context() {
      return jobsFormMachineVue.context
    },
  },
  methods: {
    async getUserIp() {
      const data = await this.$axios.$get('https://api.ipify.org?format=json')
      return data.ip
    },
    company() {
      this.type = 'company'
      this.increment(this.type)
    },
    architect() {
      this.type = 'architect'
      this.increment(this.type)
    },
    async increment(type) {
      const ip = await this.getUserIp()
      const location = null
      console.log(ip, type)
      jobsFormMachineVue.send({
        type: 'INCREMENT',
        params: { type, location, ip },
      })
    },
  },
}
</script>
