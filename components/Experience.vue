<template>
  <div>
    <p class="mb-4 font-semibold text-right text-gray-600">
      {{ $dateFns.format(new Date(experience.created_at), 'MMMM do') }}
    </p>
    <div v-html="introText" class="p-2 mb-4 border border-black" />
    <!-- <div>
      <div
        v-for="(item, index) in cleanMultipleChoiceLabels"
        :key="index"
        class="m-choice-grid"
      >
        <span class="mr-2 font-semibold">{{ item.label }}</span>
        <span>{{ findAnswer(exp[item.question], item.question) }}</span>
      </div>
    </div> -->
    <div v-if="hasThoughts">
      <p class="mb-4 font-semibold">here is what else they said</p>
      <div v-for="(item, index) in cleanTextLabels" :key="index" class="mb-1">
        <span class="font-semibold">{{ item.label }} </span>
        <span>{{ exp[item.question] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import questions from '../config/formConfig.json'
export default {
  props: {
    experience: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      multipleChoiceLabels: [
        { question: 'wfh', label: 'working from home?' },
        { question: 'not_wfh_reason', label: 'why not?' },
        { question: 'own_experience', label: "how's it been like?" },
        {
          question: 'hardware',
          label: 'company provided you hardware?'
        },
        { question: 'colleagues', label: 'how about your colleagues?' },
        {
          question: 'tools',
          label: 'tools working?'
        },
        {
          question: 'company',
          label: "company's response to COVID-19?"
        }
      ],
      textLabels: [
        { question: 'own_experience_text', label: 'experience' },
        { question: 'not_wfh_reason_text', label: 'reason' },
        { question: 'tools_text', label: 'tools' },
        { question: 'company_text', label: 'company' },
        { question: 'final_tips', label: 'tips/advice' }
      ],
      answerLabels: [
        { question: 'wfh', label: 'working from home?' },
        { question: 'own_experience', label: "how's it been like?" },
        { question: 'own_experience_text', label: '' },
        {
          question: 'hardware',
          label: 'office provided hardware (laptop/desktop/tablet)?'
        },
        { question: 'colleagues', label: 'how about your colleagues?' },
        {
          question: 'tools',
          label: "how's it going with the tools you are using?"
        },
        { question: 'tools_text', label: '' },
        {
          question: 'company',
          label: "what do you think of your company's response to COVID-19?"
        },
        { question: 'company_text', label: '' },
        { question: 'not_wfh_reason', label: 'why not?' },
        { question: 'not_wfh_reason_text', label: '' },
        { question: 'final_tips', label: 'any tips/advice?' }
      ]
    }
  },
  computed: {
    exp() {
      return this.removeEmpty({ ...this.experience })
    },
    questions() {
      return Object.keys(this.exp)
    },

    cleanTextLabels() {
      return this.textLabels.filter((label) =>
        this.questions.includes(label.question)
      )
    },
    cleanMultipleChoiceLabels() {
      return this.multipleChoiceLabels.filter((label) =>
        this.questions.includes(label.question)
      )
    },
    isWFH() {
      return this.exp.wfh === 0
    },
    hasThoughts() {
      for (const label of this.cleanTextLabels) {
        if (this.exp[label.question]) {
          return true
        }
      }
      return false
    },
    introText() {
      let intro = ''
      if (this.isWFH) {
        intro += 'This person <strong>🏠 is working from home</strong>, '
        intro += [
          'but <strong>😭 hates it</strong>! ',
          'and <strong>🙄 kinda likes it</strong>. ',
          "and <strong>🥳 is lovin' it</strong>! "
        ][this.exp.own_experience]
        intro += [
          'However, most of their colleagues are <strong>not</strong> working from home. ',
          'Some of their colleagues are also working from home. ',
          'All their colleagues are <strong>also</strong> working from home. '
        ][this.exp.colleagues]
        intro += [
          'The company <strong>did</strong> provide them with hardware, ',
          'The company <strong>did not</strong> provide them with hardware, '
        ][this.exp.hardware ? 0 : 1]
        if (this.exp.hardware) {
          intro += ['but ', 'and ', 'and '][this.exp.tools]
        } else {
          intro += ['and ', 'and ', 'but '][this.exp.tools]
        }
        intro += [
          'their tools <strong>😤kinda suck</strong> right now. ',
          'their tools are <strong>😐kinda working fine</strong>. ',
          'their tools are <strong>🤓working perfectly</strong>. '
        ][this.exp.tools]
      } else {
        intro += 'This person <strong>🏢 is not working from home</strong>, '
        intro += [
          'because their <strong>position</strong> does not allow them to 😔. ',
          'because their <strong>boss or company</strong> does not allow them to 😠. ',
          'because they <strong>prefer</strong> to come the office everyday 😶. '
        ][this.exp.not_wfh_reason]
        intro += [
          'Also, most of their colleagues are <strong>not</strong> working from home. ',
          'However, some of their colleagues are working from home. ',
          'However, all their colleagues are working from home. '
        ][this.exp.colleagues]
        if (this.exp.colleagues !== 0) {
          intro += [
            'The tools their are using <strong>😤kinda suck</strong> right now. ',
            'The tools their are using <strong>😐kinda working fine</strong>. ',
            'The tools their are using <strong>🤓working perfectly</strong>. '
          ][this.exp.tools]
        }
      }
      intro += [
        "And they do believe their company's reaction to COVID-19 was <strong>🖕bad</strong>, either slow or inefficient. ",
        "And they believe their company's reaction to COVID-19 was <strong>👍ok</strong>, but could've been better. ",
        "And they do believe their company's reaction to COVID-19 was <strong>👏perfect</strong>. "
      ][this.exp.company]
      return intro
    }
  },
  methods: {
    describeOwnExperience(own_experience) {
      console.log(own_experience)

      return [
        'but <strong>hates it</strong> 😭',
        'and <strong>kinda likes it</strong> 🙄',
        "and <strong>is lovin' it</strong> 🥳"
      ][own_experience]
    },
    removeEmpty(obj) {
      Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key])
      return obj
    },
    findAnswer(answer, questionName) {
      // console.log(answer, questionName)
      if (questionName === 'colleagues') {
        if (this.isWHF) questionName = `is_wfh_${questionName}`
        if (!this.isWHF) questionName = `not_wfh_${questionName}`
      }
      const question = questions.find((q) => q.name === questionName)
      // console.log(question)
      if (question.type === 'radio') {
        const choice = question.options.choices.find(
          (choice) => choice.value === answer
        )
        return choice.label
      }
      return answer
    }
  }
}
</script>

<style lang="scss" scoped>
.m-choice-grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 150px 1fr;
}
</style>
