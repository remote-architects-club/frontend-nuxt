<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Contribute</h1>
      <p>
        Tell everyone how's your company responding to the crisis and, most
        importantly, how <strong>you</strong> are dealing with it.
      </p>
    </div>
    <section class="w-full mx-auto">
      <form-step-0 :service="context.companyMachine" @select="goToStep2" />
    </section>
  </div>
</template>

<script>
import FormStep0 from '@/components/FormStep0'
export default {
  layout: 'pages',
  components: {
    FormStep0
  },
  computed: {
    context() {
      return this.$contributeMachine.context
    }
  },

  methods: {
    goToStep2(event) {
      this.$router.push(`/add/${event}`)
    }
  }
}
</script>

<style lang="scss"></style>
