import { mount } from '@vue/test-utils'
import CompanyList from '@/components/CompanyList.vue'

describe('CompanyList', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CompanyList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
