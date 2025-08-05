import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsBadge from '../../components/fds-badge.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsBadge', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as span element', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('has badge class by default', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.classes()).toContain('badge')
    })

    it('renders with default large size', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.classes()).toContain('badge-large')
    })

    it('renders without variant class when variant is null', () => {
      const wrapper = mount(FdsBadge)
      const classes = wrapper.classes()

      expect(classes).not.toContain('badge-success')
      expect(classes).not.toContain('badge-info')
      expect(classes).not.toContain('badge-warning')
      expect(classes).not.toContain('badge-error')
    })
  })

  describe('Props', () => {
    it('renders with small size when specified', () => {
      const wrapper = mount(FdsBadge, {
        props: { size: 'small' },
      })

      expect(wrapper.classes()).toContain('badge-small')
      expect(wrapper.classes()).not.toContain('badge-large')
    })

    it('renders with large size when specified', () => {
      const wrapper = mount(FdsBadge, {
        props: { size: 'large' },
      })

      expect(wrapper.classes()).toContain('badge-large')
      expect(wrapper.classes()).not.toContain('badge-small')
    })

    it('renders all variant types correctly', () => {
      const variants = ['success', 'info', 'warning', 'error'] as const

      variants.forEach((variant) => {
        const wrapper = mount(FdsBadge, {
          props: { variant },
        })

        expect(wrapper.classes()).toContain(`badge-${variant}`)
      })
    })

    it('renders success variant with correct class', () => {
      const wrapper = mount(FdsBadge, {
        props: { variant: 'success' },
      })

      expect(wrapper.classes()).toContain('badge-success')
    })

    it('renders info variant with correct class', () => {
      const wrapper = mount(FdsBadge, {
        props: { variant: 'info' },
      })

      expect(wrapper.classes()).toContain('badge-info')
    })

    it('renders warning variant with correct class', () => {
      const wrapper = mount(FdsBadge, {
        props: { variant: 'warning' },
      })

      expect(wrapper.classes()).toContain('badge-warning')
    })

    it('renders error variant with correct class', () => {
      const wrapper = mount(FdsBadge, {
        props: { variant: 'error' },
      })

      expect(wrapper.classes()).toContain('badge-error')
    })

    it('combines size and variant classes', () => {
      const wrapper = mount(FdsBadge, {
        props: {
          size: 'small',
          variant: 'success',
        },
      })

      expect(wrapper.classes()).toContain('badge')
      expect(wrapper.classes()).toContain('badge-small')
      expect(wrapper.classes()).toContain('badge-success')
    })

    it('handles null variant prop', () => {
      const wrapper = mount(FdsBadge, {
        props: { variant: null },
      })

      const classes = wrapper.classes().join(' ')
      expect(classes).not.toMatch(/badge-(success|info|warning|error)/)
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsBadge, {
        slots: {
          default: 'Badge Text',
        },
      })

      expect(wrapper.text()).toBe('Badge Text')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsBadge, {
        slots: {
          default: '<strong>Important</strong> <em>Badge</em>',
        },
      })

      expect(wrapper.find('strong').text()).toBe('Important')
      expect(wrapper.find('em').text()).toBe('Badge')
    })

    it('renders number content', () => {
      const wrapper = mount(FdsBadge, {
        slots: {
          default: '42',
        },
      })

      expect(wrapper.text()).toBe('42')
    })

    it('renders with icon in slot', () => {
      const wrapper = mount(FdsBadge, {
        slots: {
          default: '<svg class="icon"><use href="#check"></use></svg> Complete',
        },
      })

      expect(wrapper.find('svg.icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#check')
      expect(wrapper.text()).toContain('Complete')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slot content', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.text()).toBe('')
    })

    it('handles undefined size prop (defaults to large)', () => {
      const wrapper = mount(FdsBadge, {
        props: {},
      })

      expect(wrapper.classes()).toContain('badge-large')
    })

    it('handles undefined variant prop', () => {
      const wrapper = mount(FdsBadge, {
        props: {},
      })

      const classes = wrapper.classes()
      expect(classes).toHaveLength(2) // 'badge' and 'badge-large'
      expect(classes).toContain('badge')
      expect(classes).toContain('badge-large')
    })

    it('renders multiple badges with different configurations', () => {
      const TestWrapper = {
        template: `
          <div>
            <FdsBadge>Default</FdsBadge>
            <FdsBadge size="small" variant="success">Success</FdsBadge>
            <FdsBadge size="large" variant="error">Error</FdsBadge>
          </div>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(TestWrapper)
      const badges = wrapper.findAllComponents(FdsBadge)

      expect(badges).toHaveLength(3)
      expect(badges[0].classes()).toContain('badge-large')
      expect(badges[1].classes()).toContain('badge-small')
      expect(badges[1].classes()).toContain('badge-success')
      expect(badges[2].classes()).toContain('badge-large')
      expect(badges[2].classes()).toContain('badge-error')
    })

    it('maintains classes when props change', async () => {
      const wrapper = mount(FdsBadge, {
        props: {
          size: 'large',
          variant: 'info',
        },
      })

      expect(wrapper.classes()).toContain('badge-large')
      expect(wrapper.classes()).toContain('badge-info')

      await wrapper.setProps({ size: 'small', variant: 'warning' })

      expect(wrapper.classes()).toContain('badge-small')
      expect(wrapper.classes()).toContain('badge-warning')
      expect(wrapper.classes()).not.toContain('badge-large')
      expect(wrapper.classes()).not.toContain('badge-info')
    })
  })

  describe('Accessibility', () => {
    it('renders semantic span element', () => {
      const wrapper = mount(FdsBadge, {
        slots: { default: 'Status' },
      })

      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <p>
              Status: <FdsBadge variant="success">Active</FdsBadge>
            </p>
            <p>
              Count: <FdsBadge size="small">42</FdsBadge>
            </p>
          </main>
        `,
        components: { FdsBadge },
      }

      await testAccessibility(TestWrapper)
    })

    it('works with screen reader context', () => {
      const ContextWrapper = {
        template: `
          <div>
            <span id="label">Status:</span>
            <FdsBadge aria-labelledby="label">Active</FdsBadge>
          </div>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(ContextWrapper)
      const badge = wrapper.findComponent(FdsBadge)

      expect(badge.attributes('aria-labelledby')).toBe('label')
    })
  })

  describe('Integration', () => {
    it('works in a table context', () => {
      const TableWrapper = {
        template: `
          <table>
            <tbody>
              <tr>
                <td>User 1</td>
                <td><FdsBadge variant="success">Active</FdsBadge></td>
              </tr>
              <tr>
                <td>User 2</td>
                <td><FdsBadge variant="error">Inactive</FdsBadge></td>
              </tr>
            </tbody>
          </table>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(TableWrapper)
      const badges = wrapper.findAllComponents(FdsBadge)

      expect(badges).toHaveLength(2)
      expect(badges[0].text()).toBe('Active')
      expect(badges[0].classes()).toContain('badge-success')
      expect(badges[1].text()).toBe('Inactive')
      expect(badges[1].classes()).toContain('badge-error')
    })

    it('works in a list context with counts', () => {
      const ListWrapper = {
        template: `
          <ul>
            <li>
              Messages <FdsBadge size="small" variant="info">12</FdsBadge>
            </li>
            <li>
              Notifications <FdsBadge size="small" variant="warning">3</FdsBadge>
            </li>
          </ul>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(ListWrapper)
      const badges = wrapper.findAllComponents(FdsBadge)

      expect(badges).toHaveLength(2)
      expect(badges[0].text()).toBe('12')
      expect(badges[0].classes()).toContain('badge-info')
      expect(badges[1].text()).toBe('3')
      expect(badges[1].classes()).toContain('badge-warning')
    })

    it('works with dynamic content', async () => {
      const DynamicWrapper = {
        template: `
          <div>
            <FdsBadge :variant="status">{{ count }}</FdsBadge>
          </div>
        `,
        components: { FdsBadge },
        data() {
          return {
            count: 5,
            status: 'info' as const,
          }
        },
      }

      const wrapper = mount(DynamicWrapper)
      const badge = wrapper.findComponent(FdsBadge)

      expect(badge.text()).toBe('5')
      expect(badge.classes()).toContain('badge-info')

      await wrapper.setData({ count: 10, status: 'success' })

      expect(badge.text()).toBe('10')
      expect(badge.classes()).toContain('badge-success')
      expect(badge.classes()).not.toContain('badge-info')
    })

    it('works in a form context to show validation state', () => {
      const FormWrapper = {
        template: `
          <form>
            <label>
              Email 
              <FdsBadge v-if="isValid" variant="success" size="small">Valid</FdsBadge>
              <FdsBadge v-else variant="error" size="small">Invalid</FdsBadge>
            </label>
            <input type="email" />
          </form>
        `,
        components: { FdsBadge },
        data() {
          return { isValid: false }
        },
      }

      const wrapper = mount(FormWrapper)
      let badge = wrapper.findComponent(FdsBadge)

      expect(badge.text()).toBe('Invalid')
      expect(badge.classes()).toContain('badge-error')

      wrapper.vm.isValid = true
      wrapper.vm.$nextTick(() => {
        badge = wrapper.findComponent(FdsBadge)
        expect(badge.text()).toBe('Valid')
        expect(badge.classes()).toContain('badge-success')
      })
    })
  })
})
