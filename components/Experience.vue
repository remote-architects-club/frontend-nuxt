<template>
  <div>
    <p class="mb-2 text-gray-600">
      posted on
      {{ $dateFns.format(new Date(experience.created_at), 'MMMM do, hh:mm') }}
      by <em>{{ exp.name || 'Anonymous' }}</em>
    </p>
    <div class="p-2 border border-black">
      <div class="mb-4">
        <p class="mb-2 font-semibold">status</p>
        <div class="pl-4">
          <p class="">{{ wfh }}</p>
          <div v-if="exp.wfh === 0">
            <p>{{ ownExperience }}</p>
            <p v-if="exp.own_experience_text">
              💬&ldquo;{{ exp.own_experience_text }}&rdquo;
            </p>
          </div>
          <div v-else>
            <p v-if="exp.not_wfh_reason_text">
              💬&ldquo;{{ exp.not_wfh_reason_text }}&rdquo;
            </p>
          </div>
        </div>
      </div>
      <div v-if="showTools && exp.tools >= 0" class="mb-4">
        <p class="mb-2 font-semibold">tools</p>
        <div class="pl-4">
          <p v-if="exp.wfh === 0">{{ hardware }}</p>
          <p>{{ tools }}</p>
          <p v-if="exp.tools_text">💬&ldquo;{{ exp.tools_text }}&rdquo;</p>
        </div>
      </div>
      <div class="mb-4" v-if="exp.company >= 0">
        <p class="mb-2 font-semibold">company</p>
        <div class="pl-4">
          <p>{{ company }}</p>
          <p v-if="exp.company_text">💬&ldquo;{{ exp.company_text }}&rdquo;</p>
        </div>
      </div>
      <div v-if="exp.final_tips">
        <p class="mb-2 font-semibold">tips/advice</p>
        <div class="pl-4">
          <p>💬&ldquo;{{ exp.final_tips }}&rdquo;</p>
        </div>
      </div>
      <!-- <div v-html="introText" class="p-2 mb-4 border border-black" /> -->
      <!-- <div v-if="hasThoughts">
        <p class="mb-4 font-semibold">here is what else they said</p>
        <div v-for="(item, index) in cleanTextLabels" :key="index" class="mb-1">
          <template v-if="item.label !== 'name'">
            <span class="font-semibold">{{ item.label }} </span>
            <span>{{ exp[item.question] }}</span>
          </template>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
// import questions from '../config/formConfig.json'
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
        { question: 'name', label: 'name' },
        { question: 'own_experience_text', label: 'experience' },
        { question: 'not_wfh_reason_text', label: 'reason' },
        { question: 'tools_text', label: 'tools' },
        { question: 'company_text', label: 'company' },
        { question: 'final_tips', label: 'tips/advice' }
      ]
    }
  },
  computed: {
    wfh() {
      if (this.exp.wfh === 0) {
        return '🏠working from home'
      } else {
        return '🏢not working from home' + this.reasonNotWfh
      }
    },
    ownExperience() {
      return [
        '🙂loves the experience',
        '😐kinda likes the experience',
        '🙁hates the experience.'
      ][this.exp.own_experience]
    },
    reasonNotWfh() {
      return [
        ' (not allowed to 😠)',
        ' (situation over there improved and things are back to normal)',
        ' (prefers/needs to come to the office everyday 😶) '
      ][this.exp.not_wfh_reason]
    },
    tools() {
      return [
        '🙁their tools are not helping as they should',
        '😐their tools are ok, have room for improvement',
        '🙂their tools are perfect!'
      ][this.exp.tools]
    },
    hardware() {
      return [
        '🙂company provided hardware',
        "🙁company doesn't provide hardware"
      ][this.exp.hardware ? 0 : 1]
    },
    company() {
      return [
        "🙁company's reaction to COVID-19 was bad, either slow or inefficient",
        "😐company's reaction to COVID-19 was ok, but could've been better ",
        "🙂company's reaction to COVID-19 was perfect. "
      ][this.exp.company]
    },
    showTools() {
      if (
        this.exp.wfh === 0 ||
        (this.exp.wfh === 1 && this.exp.colleagues !== 0)
      )
        return true
      return false
    },
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
    }
    // isWFH() {
    //   return this.exp.wfh === 0
    // },
    // hasThoughts() {
    //   for (const label of this.cleanTextLabels) {
    //     if (label === name) continue
    //     if (this.exp[label.question]) {
    //       return true
    //     }
    //   }
    //   return false
    // },
    // introText() {
    //   let intro = ''
    //   // name
    //   if (!this.exp.name) {
    //     intro += 'This person '
    //   } else {
    //     intro += `${this.exp.name} `
    //   }

    //   if (this.isWFH) {
    //     intro += '<strong>🏠 is working from home</strong>, '
    //     intro += [
    //       'but <strong>😭 hates it</strong>! ',
    //       'and <strong>🙄 kinda likes it</strong>. ',
    //       "and <strong>🥳 is lovin' it</strong>! "
    //     ][this.exp.own_experience]
    //     intro += [
    //       'However, most of their colleagues are <strong>not</strong> working from home. ',
    //       'Some of their colleagues are also working from home. ',
    //       'All their colleagues are <strong>also</strong> working from home. '
    //     ][this.exp.colleagues]
    //     intro += [
    //       'The company <strong>did</strong> provide them with hardware, ',
    //       'The company <strong>did not</strong> provide them with hardware, '
    //     ][this.exp.hardware ? 0 : 1]
    //     if (this.exp.hardware) {
    //       intro += ['but ', 'and ', 'and '][this.exp.tools]
    //     } else {
    //       intro += ['and ', 'and ', 'but '][this.exp.tools]
    //     }
    //     intro += [
    //       'their tools <strong>😤kinda suck</strong> right now. ',
    //       'their tools are <strong>😐kinda working fine</strong>. ',
    //       'their tools are <strong>🤓working perfectly</strong>. '
    //     ][this.exp.tools]
    //   } else {
    //     intro += '<strong>🏢 is not working from home</strong>, '
    //     intro += [
    //       'because they are <strong>not allowed</strong> to 😠. ',
    //       'because situation over there improved and things are <strong>back to normal</strong>. ',
    //       'because they <strong>prefer/need</strong> to come to the office everyday 😶. '
    //     ][this.exp.not_wfh_reason]
    //     intro += [
    //       'Also, most of their colleagues are <strong>not</strong> working from home. ',
    //       'However, some of their colleagues are working from home. ',
    //       'However, all their colleagues are working from home. '
    //     ][this.exp.colleagues]
    //     if (this.exp.colleagues !== 0) {
    //       intro += [
    //         'The tools their are using <strong>😤kinda suck</strong> right now. ',
    //         'The tools their are using <strong>😐kinda working fine</strong>. ',
    //         'The tools their are using <strong>🤓working perfectly</strong>. '
    //       ][this.exp.tools]
    //     }
    //   }
    //   intro += [
    //     "And they do believe their company's reaction to COVID-19 was <strong>🖕bad</strong>, either slow or inefficient. ",
    //     "And they believe their company's reaction to COVID-19 was <strong>👍ok</strong>, but could've been better. ",
    //     "And they do believe their company's reaction to COVID-19 was <strong>👏perfect</strong>. "
    //   ][this.exp.company]
    //   return intro
    // }
  },
  methods: {
    // describeOwnExperience(own_experience) {
    //   console.log(own_experience)

    //   return [
    //     'but <strong>hates it</strong> 😭',
    //     'and <strong>kinda likes it</strong> 🙄',
    //     "and <strong>is lovin' it</strong> 🥳"
    //   ][own_experience]
    // },
    removeEmpty(obj) {
      Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key])
      return obj
    }
    // findAnswer(answer, questionName) {
    //   // console.log(answer, questionName)
    //   if (questionName === 'colleagues') {
    //     if (this.isWHF) questionName = `is_wfh_${questionName}`
    //     if (!this.isWHF) questionName = `not_wfh_${questionName}`
    //   }
    //   const question = questions.find((q) => q.name === questionName)
    //   // console.log(question)
    //   if (question.type === 'radio') {
    //     const choice = question.options.choices.find(
    //       (choice) => choice.value === answer
    //     )
    //     return choice.label
    //   }
    //   return answer
    // }
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
