/* eslint-disable camelcase */

import { Machine, assign, sendParent } from 'xstate'
import gql from 'graphql-tag'
import questionGroups from '../config/formConfig.json'
import { client } from '@/plugins/apollo'

export const createPersonalMachine = (companyId) => {
  return Machine(
    {
      id: 'personalMachine',
      context: {
        questionGroups,
        questionGroupsKeys: questionGroups.map((qg) => qg.map((q) => q.name)),
        formData: [],
        companyId,
        userIp: null,
        formState: {
          currentGroup: questionGroups[0],
          activeQuestionGroup: 0,
          isNext: true,
          formLength: questionGroups.length,
          isComplete: false,
          isValid: false
        }
      },
      initial: 'editing',
      states: {
        editing: {
          id: 'editing',
          initial: 'name',
          states: {
            name: {
              id: 'name',
              entry: assign({
                formState: (context) => {
                  context.formState.currentGroup = questionGroups[0]
                  context.formState.activeQuestionGroup = 0
                  return context.formState
                },
                formData: (context) => {
                  // add all keys to formData, if formData not filled
                  // console.log(context)
                  if (context.formData.length === 0) {
                    context.formData = questionGroups.map((group) =>
                      group.map(({ name }) => {
                        return {
                          name,
                          answer: ''
                        }
                      })
                    )
                  }
                  return context.formData
                }
              }),
              on: {
                NEXT: { target: 'wfh', actions: ['setAnswer'] }
              }
            },
            wfh: {
              id: 'wfh',
              entry: assign({
                formState: (context) => {
                  const index = context.questionGroupsKeys.findIndex((qgk) =>
                    qgk.includes('wfh')
                  )
                  context.formState.activeQuestionGroup = index
                  context.formState.currentGroup = questionGroups[index]
                  return context.formState
                }
              }),
              on: {
                NEXT: [
                  {
                    target: '#editing.isWFH',
                    cond: (context, event) =>
                      Number(event.params.input[0].answer) === 0,
                    actions: ['setAnswer']
                  },
                  {
                    target: '#editing.notWFH',
                    cond: (context, event) =>
                      Number(event.params.input[0].answer) === 1,
                    actions: ['setAnswer']
                  },
                  {
                    target: '#editing.vacation',
                    actions: ['setAnswer']
                  }
                ],
                PREVIOUS: '#editing.name'
              }
            },
            isWFH: {
              id: 'isWFH',
              initial: 'ownExperience',
              states: {
                ownExperience: {
                  entry: assign({
                    formState: (context) => {
                      const index = context.questionGroupsKeys.findIndex(
                        (qgk) => qgk.includes('own_experience')
                      )
                      context.formState.activeQuestionGroup = index
                      context.formState.currentGroup = questionGroups[index]
                      return context.formState
                    }
                  }),

                  on: {
                    NEXT: {
                      target: 'hardware',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: '#wfh'
                  }
                },
                hardware: {
                  entry: assign({
                    formState: (context) => {
                      const index = context.questionGroupsKeys.findIndex(
                        (qgk) => qgk.includes('hardware')
                      )
                      context.formState.activeQuestionGroup = index
                      context.formState.currentGroup = questionGroups[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'colleagues',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'ownExperience'
                  }
                },
                colleagues: {
                  entry: assign({
                    formState: (context) => {
                      const index = context.questionGroupsKeys.findIndex(
                        (qgk) => qgk.includes('is_wfh_colleagues')
                      )
                      context.formState.activeQuestionGroup = index
                      context.formState.currentGroup = questionGroups[index]
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
                    formState: (context) => {
                      const index = context.questionGroupsKeys.findIndex(
                        (qgk) => qgk.includes('tools')
                      )
                      context.formState.activeQuestionGroup = index
                      context.formState.currentGroup = questionGroups[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'company',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: [
                      {
                        target: 'colleagues',
                        cond: (context) => context.formData.wfh === 0
                      },
                      {
                        target: '#editing.notWFH.colleagues',
                        cond: (context) => context.formData.wfh === 1
                      }
                    ]
                  }
                },
                company: {
                  entry: assign({
                    formState: (context) => {
                      const index = context.questionGroupsKeys.findIndex(
                        (qgk) => qgk.includes('company')
                      )
                      context.formState.activeQuestionGroup = index
                      context.formState.currentGroup = questionGroups[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: '#editing.finalTips',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: 'tools'
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
                    formState: (context) => {
                      const index = context.questionGroupsKeys.findIndex(
                        (qgk) => qgk.includes('not_wfh_reason')
                      )
                      context.formState.activeQuestionGroup = index
                      context.formState.currentGroup = questionGroups[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: {
                      target: 'colleagues',
                      actions: ['setAnswer']
                    },
                    PREVIOUS: '#editing.wfh'
                  }
                },

                colleagues: {
                  entry: assign({
                    formState: (context) => {
                      const index = context.questionGroupsKeys.findIndex(
                        (qgk) => qgk.includes('not_wfh_colleagues')
                      )
                      context.formState.activeQuestionGroup = index
                      context.formState.currentGroup = questionGroups[index]
                      return context.formState
                    }
                  }),
                  on: {
                    NEXT: [
                      {
                        target: '#editing.finalTips',
                        cond: (context, event) =>
                          Number(event.params.input[0].answer) === 0,
                        actions: ['setAnswer']
                      },
                      {
                        target: '#editing.isWFH.tools',
                        actions: ['setAnswer']
                      }
                    ],
                    PREVIOUS: 'reason'
                  }
                }
              }
            },
            vacation: {
              entry: assign({
                formState: (context) => {
                  const index = context.questionGroupsKeys.findIndex((qgk) =>
                    qgk.includes('vacation')
                  )
                  context.formState.activeQuestionGroup = index
                  context.formState.currentGroup = questionGroups[index]
                  return context.formState
                }
              }),
              on: {
                NEXT: {
                  target: '#saving',
                  actions: ['setAnswer']
                },
                PREVIOUS: '#editing.wfh'
              }
            },
            finalTips: {
              id: 'finalTips',
              entry: assign({
                formState: (context) => {
                  const index = context.questionGroupsKeys.findIndex((qgk) =>
                    qgk.includes('final_tips')
                  )
                  context.formState.activeQuestionGroup = index
                  context.formState.currentGroup = questionGroups[index]
                  return context.formState
                }
              }),
              on: {
                NEXT: {
                  target: '#saving',
                  actions: ['setAnswer']
                },
                PREVIOUS: '#editing.isWFH.company'
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
            // console.log('action:setAnswer')
            const { activeQuestionGroup } = context.formState
            const { input } = event.params
            context.formData[activeQuestionGroup] = input
            return context.formData
          },
          userIp: (context, event) => {
            return event.params.userIp
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
  const inputArray = context.questionGroups
    .map((qg, i) => {
      const group = qg.map((q, j) => {
        const answer =
          context.formData[i][j].answer === ''
            ? null
            : context.formData[i][j].answer
        return {
          [q.name]: answer
        }
      })
      return group
    })
    .flat()

  // console.log(inputArray)
  let inputObject = {}
  for (const obj of inputArray) {
    inputObject = { ...inputObject, ...obj }
  }
  console.log(inputObject)
  // debugger
  const { companyId: office_id, userIp: user_ip } = context
  const {
    wfh,
    own_experience,
    own_experience_text,
    is_wfh_colleagues,
    tools,
    tools_text,
    company,
    company_text,
    not_wfh_reason,
    not_wfh_reason_text,
    not_wfh_colleagues,
    final_tips,
    name
  } = inputObject

  const colleagues = is_wfh_colleagues || not_wfh_colleagues
  let { hardware } = inputObject
  if (!hardware) hardware = false

  const { data } = await client.mutate({
    mutation: gql`
      mutation insert_experience(
        $name: String
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
        $user_ip: String
      ) {
        insert_experience(
          objects: {
            name: $name
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
            user_ip: $user_ip
          }
        ) {
          affected_rows
          returning {
            id
            name
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
            user_ip
          }
        }
      }
    `,
    variables: {
      name,
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
      wfh,
      user_ip
    }
  })
  return data.insert_experience.returning[0].experience
}
