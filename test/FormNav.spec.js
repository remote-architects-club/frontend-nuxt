import { mount } from '@vue/test-utils'
import FormNav from '@/components/FormNav.vue'

describe('FormNav', () => {
  test('is a Vue instance', () => {
    const formState = {
      currentGroup: [{ validation: [] }],
      activeQuestionGroup: 0,
    }
    const formData = [[{ answer: '' }]]
    const wrapper = mount(FormNav, {
      propsData: {
        formState,
        formData,
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  }),
    test('NEXT button is disabled if one question is required and has no answer', () => {
      const formState = {
        currentGroup: [{ validation: ['required'] }, { validation: [] }],
        activeQuestionGroup: 0,
      }
      let formData = [[{ answer: '' }, { answer: '' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })
      expect(wrapper.vm.isNextDisabled).toBe(true)

      formData = [[{ answer: '' }, { answer: 'answer' }]]
      wrapper.setProps({ formData })
      expect(wrapper.vm.isNextDisabled).toBe(true)
    }),
    test('NEXT button is enabled if one question is required and has answer', () => {
      const formState = {
        currentGroup: [{ validation: ['required'] }, { validation: [] }],
        activeQuestionGroup: 0,
      }
      const formData = [[{ answer: 'answer' }, { answer: '' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })
      expect(wrapper.vm.isNextDisabled).toBe(false)
    }),
    test('NEXT button is enabled if question is not required', () => {
      const formState = {
        currentGroup: [{ validation: [] }, { validation: [] }],
        activeQuestionGroup: 0,
      }
      const formData = [[{ answer: '' }, { answer: '' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })

      expect(wrapper.vm.isNextDisabled).toBe(false)
    }),
    test("next label is 'finish' if question is final", () => {
      const formState = {
        currentGroup: [{ validation: [], isFinal: true }],
        activeQuestionGroup: 0,
      }
      const formData = [[{ answer: 'answer' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })
      expect(wrapper.vm.nextLabel).toBe('finish')
    }),
    test("next label is 'next' if question is not final", () => {
      const formState = {
        currentGroup: [{ validation: [] }],
        activeQuestionGroup: 0,
      }
      const formData = [[{ answer: 'answer' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })
      expect(wrapper.vm.nextLabel).toBe('next')
    }),
    test("next label is 'next' if question is required", () => {
      const formState = {
        currentGroup: [{ validation: ['required'] }],
        activeQuestionGroup: 0,
      }
      const formData = [[{ answer: 'answer' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })
      expect(wrapper.vm.nextLabel).toBe('next')
    }),
    test("next label is 'next' if question is not required but has an answer", () => {
      const formState = {
        currentGroup: [{ validation: [] }],
        activeQuestionGroup: 0,
      }
      const formData = [[{ answer: 'answer' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })
      expect(wrapper.vm.nextLabel).toBe('next')
    }),
    test("next label is 'skip' if question is not required and has no answer", () => {
      const formState = {
        currentGroup: [{ validation: [] }],
        activeQuestionGroup: 0,
      }
      const formData = [[{ answer: '' }]]
      const wrapper = mount(FormNav, {
        propsData: {
          formState,
          formData,
        },
      })
      expect(wrapper.vm.nextLabel).toBe('skip')
    })
})
