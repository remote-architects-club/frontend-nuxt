import { mount, RouterLinkStub } from '@vue/test-utils'
import ToolChipList from '@/components/ToolChipList.vue'

const factory = ({ propsData }) =>
  mount(ToolChipList, {
    propsData,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })

describe('ToolChipList', () => {
  test('is a Vue instance', () => {
    const wrapper = factory({
      propsData: {
        tools: [
          { id: 'id1', name: 'name1', url: 'http://url1.com' },
          { id: 'id2', name: 'name2', url: 'http://url2.com' },
          { id: 'id3', name: 'name3', url: 'http://url3.com' }
        ]
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('renders properly when 3 items are present', () => {
    const wrapper = factory({
      propsData: {
        tools: [
          { id: 'id1', name: 'name1', url: 'http://url1.com' },
          { id: 'id2', name: 'name2', url: 'http://url2.com' },
          { id: 'id3', name: 'name3', url: 'http://url3.com' }
        ]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('renders properly when 1 items is present', () => {
    const wrapper = factory({
      propsData: {
        tools: [{ id: 'id1', name: 'name1', url: 'http://url1.com' }]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('renders properly when an empty list is passed as prop', () => {
    const wrapper = factory({
      propsData: {
        tools: []
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('renders properly when prop is not present', () => {
    const wrapper = factory({ propsData: {} })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
