<template>
  <div>
    <div class="p-4 bg-white shadow-lg sm:p-8">
      <form @submit.prevent="submit">
        <template v-for="(questionGroup, iGroup) in questionGroups">
          <template v-for="(question, key) in questionGroup">
            <field-group
              :key="`${_uid}-${question.name}`"
              :field-id="key"
              :active="formState.activeQuestionGroup === iGroup"
              :is-next="formState.isNext"
            >
              <div>
                <label
                  :for="`${_uid}-${question.name}`"
                  class="flex flex-wrap items-center justify-between "
                >
                  {{ question.label }}
                  <span
                    v-if="!question.validation.includes('required')"
                    class="text-sm italic text-gray-600"
                    >optional</span
                  >
                </label>
                <div class="h-2" />
                <Component
                  :is="`${question.type}-input`"
                  :id="`${_uid}-${question.name}`"
                  v-model="formData[iGroup][key].answer"
                  v-bind="{ ...question.options.attrs }"
                  :name="`${question.name}`"
                  :type="question.type"
                  :options="
                    !!question.options.choices
                      ? question.options.choices
                      : false
                  "
                  :data-cy="question.name"
                />
                <p
                  v-if="question.options && question.options.explanation"
                  class="mt-1 text-sm"
                >
                  {{ question.options.explanation }}
                </p>
                <div v-if="key < questionGroup.length - 1" class="h-8" />
              </div>
            </field-group>
          </template>
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
import RadioInput from '@/components/RadioInput'
import TextareaInput from '@/components/TextareaInput'
import TextInput from '@/components/TextInput'
import FormNav from '@/components/FormNav'

export default {
  components: {
    FieldGroup,
    TextInput,
    TextareaInput,
    RadioInput,
    FormNav
  },
  data() {
    return {
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
    questionGroups() {
      return this.context.questionGroups
    },
    formState() {
      return this.context.formState
    },
    formData() {
      return this.context.formData
    }
  },
  methods: {
    submit() {},
    next() {
      this.send({
        type: 'NEXT',
        params: { input: this.formData[this.formState.activeQuestionGroup] }
      })
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
