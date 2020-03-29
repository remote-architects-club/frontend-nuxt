<template>
  <div>
    <div class="p-4 bg-white shadow-lg sm:p-8">
      <form @submit.prevent="submit">
        <template v-for="(question, key) in questions">
          <field-group
            :key="`${_uid}-${question.name}`"
            :field-id="key"
            :active="formState.current.name === question.name"
            :is-next="formState.isNext"
          >
            <div class="field-area">
              <field-label :for="`${_uid}-${question.name}`">
                {{ question.label }}
              </field-label>
              <div class="h-4" />
              <Component
                :is="`${question.type}-input`"
                :id="`${_uid}-${question.name}`"
                v-model="formData[question.name]"
                v-bind="{ ...question.options.attrs }"
                :name="`${question.name}`"
                :type="question.type"
                :options="
                  !!question.options.choices ? question.options.choices : false
                "
                :data-cy="question.name"
              />
              <p
                v-if="question.options && question.options.explanation"
                class="mt-1 text-sm"
              >
                {{ question.options.explanation }}
              </p>
            </div>
            <!-- <field-error :is-valid="isValid">{{ error }}</field-error> -->
          </field-group>
        </template>
      </form>
    </div>
    <!-- Next and Back Nav -->
    <form-nav
      class="relative"
      :form-state="formState"
      :form-data="formData"
      @back="back"
      @next="next"
    />
  </div>
</template>

<script>
import FieldGroup from '@/components/FieldGroup'
import FieldLabel from '@/components/FieldLabel'
// import FieldError from '@/components/FieldError'
import RadioInput from '@/components/RadioInput'
import TextareaInput from '@/components/TextareaInput'
import TextInput from '@/components/TextInput'
import FormNav from '@/components/FormNav'

export default {
  components: {
    FieldGroup,
    FieldLabel,
    // FieldError,
    TextInput,
    TextareaInput,
    RadioInput,
    FormNav
  },
  data() {
    return {
      formData: {},
      // isValid: true,
      error: 'error'
    }
  },
  provide() {
    return {
      formState: this.formState
    }
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
    questions() {
      return this.context.questions
    },
    formState() {
      return this.context.formState
    },
    isAnswerValid() {
      const isRequired = this.formState.current.validation.includes('required')
      const input = this.formData[this.formState.current.name]
      return !isRequired || (isRequired && input)
    }
  },
  methods: {
    submit() {},
    next() {
      if (this.isAnswerValid) {
        this.send({
          type: 'NEXT',
          params: { input: this.formData[this.formState.current.name] }
        })
        // return (this.isValid = true)
      }
      // return (this.isValid = false)
    },
    back() {
      return this.send({ type: 'PREVIOUS' })
    },

    matches(value) {
      this.state.matches(value)
    },
    send(value) {
      this.personalMachine.send(value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
