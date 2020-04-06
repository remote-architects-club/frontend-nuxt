import { mount, RouterLinkStub } from '@vue/test-utils'
import ToastSubscribe from '@/components/ToastSubscribe.vue'

const factory = () => mount(ToastSubscribe)

describe('ToastSubscribe', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('renders properly ', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('disappears when close button is clicked', () => {
    const wrapper = factory()
    wrapper.find('[data-cy=close-btn]').trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
