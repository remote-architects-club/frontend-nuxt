/* eslint-disable camelcase */

import { Machine, assign, sendParent } from 'xstate'
import gql from 'graphql-tag'
import questions from '../config/formConfig.json'
import { client } from '@/plugins/apollo'

export const createPersonalMachine = (companyId) => {
  return Machine(
    {
      id: 'personalMachine',
      context: {
        questions,
        formData: {
          companyId
        },
        formState: {
          current: questions[0],
          activeQuestion: 0,
          isNext: true,
          formLength: questions.length,
          isComplete: false,
          isValid: false
        }
      },
      initial: 'editing',
      states: {
        editing: {
          id: 'editing',
          initial: 'start',
          states: {
            start: {
              id: 'start',
              entry: assign({
                formState: (context, event) => {
                  context.formState.current = questions[0]
                  context.formState.activeQuestion = 0
                  return context.formState
                }
              }),
              on: {
                NEXT: [
                  {
                    target: '#editing.isWFH',
                    cond: (context, event) => event.params.input === 0,
                    actions: ['setAnswer']
                  },
                  {
                    target: '#editing.notWFH',
                    cond: (context, event) => event.params.input === 1,
                    actions: ['setAnswer']
                  },
                  {
                    target: '#editing.vacation',
                    actions: ['setAnswer']
                  }
                ]
              }
            },
            isWFH: {
              id: 'isWFH',
              initial: 'ownExperience',
              states: {
                ownExperience: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'own_experience'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'ownExperienceText',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: '#editing.start'
                  }
                },
                ownExperienceText: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'own_experience_text'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'hardware',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'ownExperience'
                  }
                },
                hardware: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'hardware'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'colleagues',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'ownExperienceText'
                  }
                },
                colleagues: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'is_wfh_colleagues'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'tools',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'hardware'
                  }
                },

                tools: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'tools'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'toolsText',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: [
                      {
                        target: 'colleagues',
                        cond: (context, event) => context.formData.wfh === 0
                      },
                      {
                        target: '#editing.notWFH.colleagues',
                        cond: (context, event) => context.formData.wfh === 1
                      }
                    ]
                  }
                },
                toolsText: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'tools_text'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'company',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'tools'
                  }
                },
                company: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'company'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'companyText',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'toolsText'
                  }
                },
                companyText: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'company_text'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: '#editing.finalTips',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'company'
                  }
                }
              }
            },
            notWFH: {
              id: 'notWFH',
              initial: 'reason',
              states: {
                reason: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'not_wfh_reason'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'reasonText',
                      actions: ['setAnswer']
                    }
                  }
                },
                reasonText: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'not_wfh_reason_text'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'colleagues',
                      actions: ['setAnswer']
                    }
                  }
                },
                colleagues: {
                  entry: assign({
                    formState: (context, event) => {
                      const index = context.questions.findIndex(
                        (question) => question.name === 'not_wfh_colleagues'
                      )
                      context.formState.activeQuestion = index
                      context.formState.current = questions[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: [
                      {
                        target: '#editing.finalTips',
                        cond: (context, event) => event.params.input === 0,
                        actions: ['setAnswer']
                      },
                      {
                        target: '#editing.isWFH.tools',
                        actions: ['setAnswer']
                      }
                    ]
                  }
                }
              }
            },
            vacation: {
              entry: assign({
                formState: (context, event) => {
                  const index = context.questions.findIndex(
                    (question) => question.name === 'vacation'
                  )
                  context.formState.activeQuestion = index
                  context.formState.current = questions[index]
                  return context.formState
                }
              }),
              on: {
                NEXT: {
                  target: '#saving',
                  actions: ['setAnswer']
                },
                PREVIOUS: '#editing.start'
              }
            },
            finalTips: {
              id: 'finalTips',
              entry: assign({
                formState: (context, event) => {
                  const index = context.questions.findIndex(
                    (question) => question.name === 'final_tips'
                  )
                  context.formState.activeQuestion = index
                  context.formState.current = questions[index]
                  return context.formState
                }
              }),
              on: {
                NEXT: {
                  target: '#saving',
                  actions: ['setAnswer']
                },
                PREVIOUS: '#editing.isWFH.companyText'
              }
            }
          }
        },
        saving: {
          id: 'saving',
          invoke: {
            id: 'invoke-save',
            src: invokeSave,
            onDone: {
              target: 'done',
              actions: ['setSavedData']
            },
            onError: 'failed'
          }
        },
        failed: {
          on: {
            SAVE: {
              target: 'saving'
            },
            CANCEL: {}
          }
        },
        done: {
          type: 'final',
          actions: sendParent({ type: 'FINISH' })
        }
      }
    },
    {
      actions: {
        setAnswer: assign({
          formData: (context, event) => {
            const { name: key } = context.formState.current
            const { input: answer } = event.params
            context.formData[key] = answer
            return context.formData
          }
        }),
        setSavedData: assign({
          formData: (_, event) => event.data
        })
      }
    }
  )
}

async function invokeSave(context) {
  const {
    companyId: office_id,
    wfh,
    own_experience,
    own_experience_text,
    hardware,
    is_wfh_colleagues,
    tools,
    tools_text,
    company,
    company_text,
    not_wfh_reason,
    not_wfh_reason_text,
    not_wfh_colleagues,
    final_tips
  } = context.formData
  const colleagues = is_wfh_colleagues || not_wfh_colleagues

  const { data } = await client.mutate({
    mutation: gql`
      mutation insert_experience(
        $colleagues: Int
        $company: Int
        $company_text: String
        $final_tips: String
        $hardware: Boolean
        $not_wfh_reason_text: String
        $not_wfh_reason: Int
        $office_id: uuid
        $own_experience: Int
        $own_experience_text: String
        $tools: Int
        $tools_text: String
        $wfh: Int
      ) {
        insert_experience(
          objects: {
            colleagues: $colleagues
            company: $company
            company_text: $company_text
            final_tips: $final_tips
            hardware: $hardware
            not_wfh_reason_text: $not_wfh_reason_text
            not_wfh_reason: $not_wfh_reason
            office_id: $office_id
            own_experience: $own_experience
            own_experience_text: $own_experience_text
            tools: $tools
            tools_text: $tools_text
            wfh: $wfh
          }
        ) {
          affected_rows
          returning {
            id
            colleagues
            company
            company_text
            created_at
            final_tips
            hardware
            not_wfh_reason
            not_wfh_reason_text
            office_id
            own_experience
            own_experience_text
            tools
            tools_text
            wfh
          }
        }
      }
    `,
    variables: {
      colleagues,
      company,
      company_text,
      final_tips,
      hardware,
      not_wfh_reason,
      not_wfh_reason_text,
      office_id,
      own_experience,
      own_experience_text,
      tools,
      tools_text,
      wfh
    }
  })
  return data.insert_experience.returning[0].experience
}
