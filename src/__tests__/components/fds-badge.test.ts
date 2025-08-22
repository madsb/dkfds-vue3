import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsBadge from "../../components/data-display/fds-badge.vue"
import { testAccessibility } from '../../test-utils'

describe('FdsBadge', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as span element by default', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('has badge class by default', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.classes()).toContain('badge')
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
    describe('Tag prop', () => {
      it('renders as span when tag="span"', () => {
        const wrapper = mount(FdsBadge, {
          props: { tag: 'span' },
        })

        expect(wrapper.element.tagName).toBe('SPAN')
      })

      it('renders as strong when tag="strong"', () => {
        const wrapper = mount(FdsBadge, {
          props: { tag: 'strong' },
        })

        expect(wrapper.element.tagName).toBe('STRONG')
      })

      it('maintains badge class regardless of tag', () => {
        const wrapperSpan = mount(FdsBadge, {
          props: { tag: 'span' },
        })
        const wrapperStrong = mount(FdsBadge, {
          props: { tag: 'strong' },
        })

        expect(wrapperSpan.classes()).toContain('badge')
        expect(wrapperStrong.classes()).toContain('badge')
      })

      it('combines tag prop with other props correctly', () => {
        const wrapper = mount(FdsBadge, {
          props: {
            tag: 'strong',
            variant: 'success',
          },
        })

        expect(wrapper.element.tagName).toBe('STRONG')
        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.classes()).toContain('badge-success')
      })
    })

    describe('Variant prop', () => {
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

      it('handles null variant prop', () => {
        const wrapper = mount(FdsBadge, {
          props: { variant: null },
        })

        const classes = wrapper.classes().join(' ')
        expect(classes).not.toMatch(/badge-(success|info|warning|error)/)
      })
    })

    describe('Combined props', () => {
      it('combines all props correctly', () => {
        const wrapper = mount(FdsBadge, {
          props: {
            tag: 'strong',
            variant: 'error',
          },
        })

        expect(wrapper.element.tagName).toBe('STRONG')
        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.classes()).toContain('badge-error')
      })
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

    it('renders slot content in strong tag when specified', () => {
      const wrapper = mount(FdsBadge, {
        props: { tag: 'strong' },
        slots: {
          default: 'Important',
        },
      })

      expect(wrapper.element.tagName).toBe('STRONG')
      expect(wrapper.text()).toBe('Important')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slot content', () => {
      const wrapper = mount(FdsBadge)
      expect(wrapper.text()).toBe('')
    })

    it('handles undefined variant prop', () => {
      const wrapper = mount(FdsBadge, {
        props: {},
      })

      const classes = wrapper.classes()
      expect(classes).toContain('badge')
    })

    it('handles undefined tag prop (defaults to span)', () => {
      const wrapper = mount(FdsBadge, {
        props: {},
      })

      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('renders multiple badges with different configurations', () => {
      const TestWrapper = {
        template: `
          <div>
            <FdsBadge>Default</FdsBadge>
            <FdsBadge tag="strong"  variant="success">Success</FdsBadge>
            <FdsBadge  variant="error">Error</FdsBadge>
          </div>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(TestWrapper)
      const badges = wrapper.findAllComponents(FdsBadge)

      expect(badges).toHaveLength(3)
      expect(badges[0].element.tagName).toBe('SPAN')
      expect(badges[1].element.tagName).toBe('STRONG')
      expect(badges[1].classes()).toContain('badge-success')
      expect(badges[2].element.tagName).toBe('SPAN')
      expect(badges[2].classes()).toContain('badge-error')
    })

    it('maintains classes when props change', async () => {
      const wrapper = mount(FdsBadge, {
        props: {
          variant: 'info',
        },
      })

      expect(wrapper.classes()).toContain('badge-info')

      await wrapper.setProps({ variant: 'warning' })
      expect(wrapper.classes()).toContain('badge-warning')
      expect(wrapper.classes()).not.toContain('badge-info')
    })

    it('maintains tag when other props change', async () => {
      const wrapper = mount(FdsBadge, {
        props: {
          tag: 'strong',
        },
      })

      expect(wrapper.element.tagName).toBe('STRONG')

      await wrapper.setProps({ variant: 'success' })
      expect(wrapper.element.tagName).toBe('STRONG')
    })
  })

  describe('Accessibility', () => {
    it('renders semantic span element by default', () => {
      const wrapper = mount(FdsBadge, {
        slots: { default: 'Status' },
      })

      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('renders semantic strong element when specified', () => {
      const wrapper = mount(FdsBadge, {
        props: { tag: 'strong' },
        slots: { default: 'Important' },
      })

      expect(wrapper.element.tagName).toBe('STRONG')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <p>
              Status: <FdsBadge variant="success">Active</FdsBadge>
            </p>
            <p>
              Count: <FdsBadge >42</FdsBadge>
            </p>
            <p>
              Important: <FdsBadge tag="strong" variant="error">Critical</FdsBadge>
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

    it('uses strong tag for emphasis when appropriate', () => {
      const EmphasisWrapper = {
        template: `
          <p>
            New features available <FdsBadge tag="strong" variant="info">NEW</FdsBadge>
          </p>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(EmphasisWrapper)
      const badge = wrapper.findComponent(FdsBadge)

      expect(badge.element.tagName).toBe('STRONG')
      expect(badge.text()).toBe('NEW')
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
              Messages <FdsBadge  variant="info">12</FdsBadge>
            </li>
            <li>
              Notifications <FdsBadge  variant="warning">3</FdsBadge>
            </li>
            <li>
              Updates <FdsBadge tag="strong"  variant="success">NEW</FdsBadge>
            </li>
          </ul>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(ListWrapper)
      const badges = wrapper.findAllComponents(FdsBadge)

      expect(badges).toHaveLength(3)
      expect(badges[0].text()).toBe('12')
      expect(badges[0].classes()).toContain('badge-info')
      expect(badges[1].text()).toBe('3')
      expect(badges[1].classes()).toContain('badge-warning')
      expect(badges[2].text()).toBe('NEW')
      expect(badges[2].element.tagName).toBe('STRONG')
      expect(badges[2].classes()).toContain('badge-success')
    })

    it('works with dynamic content', async () => {
      const DynamicWrapper = {
        template: `
          <div>
            <FdsBadge :tag="emphasize ? 'strong' : 'span'" :variant="status">{{ count }}</FdsBadge>
          </div>
        `,
        components: { FdsBadge },
        data() {
          return {
            count: 5,
            status: 'info' as const,
            emphasize: false,
          }
        },
      }

      const wrapper = mount(DynamicWrapper)
      const badge = wrapper.findComponent(FdsBadge)

      expect(badge.text()).toBe('5')
      expect(badge.element.tagName).toBe('SPAN')
      expect(badge.classes()).toContain('badge-info')

      await wrapper.setData({ count: 10, status: 'success', emphasize: true })

      expect(badge.text()).toBe('10')
      expect(badge.element.tagName).toBe('STRONG')
      expect(badge.classes()).toContain('badge-success')
      expect(badge.classes()).not.toContain('badge-info')
    })

    it('works in a form context to show validation state', () => {
      const FormWrapper = {
        template: `
          <form>
            <label>
              Email 
              <FdsBadge v-if="isValid" variant="success" >Valid</FdsBadge>
              <FdsBadge v-else tag="strong" variant="error" >Invalid</FdsBadge>
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
      expect(badge.element.tagName).toBe('STRONG')
      expect(badge.classes()).toContain('badge-error')

      wrapper.vm.isValid = true
      wrapper.vm.$nextTick(() => {
        badge = wrapper.findComponent(FdsBadge)
        expect(badge.text()).toBe('Valid')
        expect(badge.element.tagName).toBe('SPAN')
        expect(badge.classes()).toContain('badge-success')
      })
    })

    it('follows DKFDS v11 usage guidelines', () => {
      // Test that badges are used for highlighting important content
      const GuidelinesWrapper = {
        template: `
          <article>
            <h2>Product <FdsBadge tag="strong" variant="success" >NEW</FdsBadge></h2>
            <p>Status: <FdsBadge variant="info">Available</FdsBadge></p>
            <p>Stock: <FdsBadge variant="warning" >Low</FdsBadge></p>
          </article>
        `,
        components: { FdsBadge },
      }

      const wrapper = mount(GuidelinesWrapper)
      const badges = wrapper.findAllComponents(FdsBadge)

      // NEW badge uses strong for emphasis
      expect(badges[0].element.tagName).toBe('STRONG')
      expect(badges[0].classes()).toContain('badge-success')

      // Status badge uses default span
      expect(badges[1].element.tagName).toBe('SPAN')
      expect(badges[1].classes()).toContain('badge-info')

      // Stock warning uses span with warning variant
      expect(badges[2].element.tagName).toBe('SPAN')
      expect(badges[2].classes()).toContain('badge-warning')
    })
  })
})
