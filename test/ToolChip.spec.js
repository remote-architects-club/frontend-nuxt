import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ToolChip from '@/components/ToolChip.vue'

const name = 'tool name'
const id =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)
const url = 'http://example.com'

const factory = () =>
  shallowMount(ToolChip, {
    propsData: {
      name,
      id,
      url,
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  })

describe('ToolChip', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('it receives a name and id prop', () => {
    const wrapper = factory()
    expect(wrapper.props().name).toBe(name)
    expect(wrapper.props().id).toBe(id)
    expect(wrapper.props().url).toBe(url)
  })

  // test('it displays name prop value', () => {
  //   const wrapper = factory()

  //   expect(wrapper.get('[data-cy=tool-name]').text()).toBe(name)
  // })
  // test('if tool has no url, display name on a span tag', () => {
  //   const wrapper = shallowMount(ToolChip, {
  //     propsData: {
  //       name,
  //       id
  //     },
  //     stubs: {
  //       NuxtLink: RouterLinkStub
  //     }
  //   })
  //   expect(wrapper.get('[data-cy=tool-name]').text()).toBe(name)
  //   // console.log(wrapper.get('[data-cy=tool-name]').html())
  //   expect(wrapper.get('[data-cy=tool-name]').is('span')).toBe(true)
  // })
  // test('if tool has url, display name on a link tag', () => {
  //   const wrapper = factory()
  //   expect(wrapper.get('[data-cy=tool-name]').text()).toBe(name)
  //   // console.log(wrapper.get('[data-cy=tool-name]').html())
  //   expect(wrapper.get('[data-cy=tool-name]').is('a')).toBe(true)
  // })
  // test('if tool has url, it is linked to the tool page on rac', () => {
  //   const wrapper = factory()
  //   const toolHref = `/tools/tool?id=${id}`
  //   // console.log(wrapper.get('[data-cy=tool-name]').html())
  //   expect(wrapper.get('[data-cy=tool-name]').props().to).toBe(toolHref)
  // })
  test('renders properly when url is present', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('renders properly when url is not present', () => {
    const wrapper = shallowMount(ToolChip, {
      propsData: {
        name,
        id,
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
