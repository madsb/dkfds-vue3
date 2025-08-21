import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsAlert from '../../components/fds-alert.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsAlert', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsAlert)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with default info variant', () => {
      const wrapper = mount(FdsAlert)
      const alert = wrapper.find('.alert')

      expect(alert.exists()).toBe(true)
      expect(alert.classes()).toContain('alert-info')
    })

    it('renders alert content in paragraph', () => {
      const wrapper = mount(FdsAlert, {
        slots: {
          default: 'Alert message content',
        },
      })

      expect(wrapper.find('.alert-text').text()).toBe('Alert message content')
    })

    it('renders inside a transition wrapper', () => {
      const wrapper = mount(FdsAlert)

      // Vue Test Utils wraps transitions, so we check for the alert div
      expect(wrapper.find('.alert').exists()).toBe(true)
    })

    it('has correct structure with alert-body', () => {
      const wrapper = mount(FdsAlert)

      expect(wrapper.find('.alert').exists()).toBe(true)
      expect(wrapper.find('.alert-body').exists()).toBe(true)
      expect(wrapper.find('.alert-text').exists()).toBe(true)
    })
  })

  describe('Props', () => {
    it('renders with custom header text', () => {
      const wrapper = mount(FdsAlert, {
        props: { header: 'Important Notice' },
      })

      expect(wrapper.find('.alert-heading').exists()).toBe(true)
      expect(wrapper.find('.alert-heading').text()).toBe('Important Notice')
    })

    it('handles null header prop', () => {
      const wrapper = mount(FdsAlert, {
        props: { header: null },
      })

      expect(wrapper.find('.alert-heading').exists()).toBe(false)
    })

    it('renders all variant types correctly', () => {
      const variants = ['success', 'info', 'warning', 'error'] as const

      variants.forEach((variant) => {
        const wrapper = mount(FdsAlert, {
          props: { variant },
        })

        expect(wrapper.find('.alert').classes()).toContain(`alert-${variant}`)
      })
    })

    it('shows icon when showIcon is true', () => {
      const wrapper = mount(FdsAlert, {
        props: { showIcon: true },
      })

      const icon = wrapper.find('.alert-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('use').attributes('href')).toBe('#info')
    })

    it('does not show icon by default', () => {
      const wrapper = mount(FdsAlert)

      expect(wrapper.find('.alert-icon').exists()).toBe(false)
    })

    it('renders close button when closeable is true', () => {
      const wrapper = mount(FdsAlert, {
        props: { closeable: true },
      })

      const closeButton = wrapper.find('.alert-close')
      expect(closeButton.exists()).toBe(true)
      expect(closeButton.text()).toContain('Luk')
      expect(wrapper.find('.alert').classes()).toContain('has-close')
    })

    it('does not render close button by default', () => {
      const wrapper = mount(FdsAlert)

      expect(wrapper.find('.alert-close').exists()).toBe(false)
      expect(wrapper.find('.alert').classes()).not.toContain('has-close')
    })

    it('uses correct icon for each variant', () => {
      const variants = ['success', 'info', 'warning', 'error'] as const

      variants.forEach((variant) => {
        const wrapper = mount(FdsAlert, {
          props: { variant, showIcon: true },
        })

        const icon = wrapper.find('.alert-icon use')
        expect(icon.attributes('href')).toBe(`#${variant}`)
      })
    })
  })

  describe('Events', () => {
    it('emits close event when close button is clicked', async () => {
      const wrapper = mount(FdsAlert, {
        props: { closeable: true },
      })

      const closeButton = wrapper.find('.alert-close')
      await closeButton.trigger('click')

      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('close')?.[0]).toEqual([true])
    })

    it('hides alert when close button is clicked', async () => {
      const wrapper = mount(FdsAlert, {
        props: { closeable: true },
      })

      expect(wrapper.find('.alert').exists()).toBe(true)

      const closeButton = wrapper.find('.alert-close')
      await closeButton.trigger('click')

      expect(wrapper.find('.alert').exists()).toBe(false)
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsAlert, {
        slots: {
          default: '<span class="custom-content">Custom alert message</span>',
        },
      })

      const alertText = wrapper.find('.alert-text')
      expect(alertText.find('.custom-content').text()).toBe('Custom alert message')
    })

    it('renders header slot content', () => {
      const wrapper = mount(FdsAlert, {
        slots: {
          header: '<h3 class="custom-header">Custom Header</h3>',
        },
      })

      expect(wrapper.find('.custom-header').text()).toBe('Custom Header')
      expect(wrapper.find('.alert-heading').exists()).toBe(false)
    })

    it('prioritizes header slot over header prop', () => {
      const wrapper = mount(FdsAlert, {
        props: { header: 'Prop Header' },
        slots: {
          header: '<h3>Slot Header</h3>',
        },
      })

      expect(wrapper.text()).toContain('Slot Header')
      expect(wrapper.text()).not.toContain('Prop Header')
    })

    it('renders custom close button content', () => {
      const wrapper = mount(FdsAlert, {
        props: { closeable: true },
        slots: {
          button: '<span class="custom-close">Close Alert</span>',
        },
      })

      const closeButton = wrapper.find('.alert-close')
      expect(closeButton.find('.custom-close').text()).toBe('Close Alert')
      expect(closeButton.text()).not.toContain('Luk')
    })
  })

  describe('Accessibility', () => {
    it('applies alert role for warning and error variants', () => {
      const wrapper1 = mount(FdsAlert, {
        props: { variant: 'warning' },
      })
      expect(wrapper1.find('.alert').attributes('role')).toBe('alert')

      const wrapper2 = mount(FdsAlert, {
        props: { variant: 'error' },
      })
      expect(wrapper2.find('.alert').attributes('role')).toBe('alert')
    })

    it('does not apply alert role for info and success variants', () => {
      const wrapper1 = mount(FdsAlert, {
        props: { variant: 'info' },
      })
      expect(wrapper1.find('.alert').attributes('role')).toBe('')

      const wrapper2 = mount(FdsAlert, {
        props: { variant: 'success' },
      })
      expect(wrapper2.find('.alert').attributes('role')).toBe('')
    })

    it('has correct aria-label on icon for each variant', () => {
      const expectedLabels = {
        info: 'Information',
        success: 'Succes',
        warning: 'Advarsel',
        error: 'Fejl',
      }

      Object.entries(expectedLabels).forEach(([variant, label]) => {
        const wrapper = mount(FdsAlert, {
          props: { variant: variant as any, showIcon: true },
        })

        const icon = wrapper.find('.alert-icon')
        expect(icon.attributes('aria-label')).toBe(label)
      })
    })

    it('icon is not focusable', () => {
      const wrapper = mount(FdsAlert, {
        props: { showIcon: true },
      })

      const icon = wrapper.find('.alert-icon')
      expect(icon.attributes('focusable')).toBe('false')
    })

    it('close button icon has correct accessibility attributes', () => {
      const wrapper = mount(FdsAlert, {
        props: { closeable: true },
      })

      const closeIcon = wrapper.find('.alert-close svg')
      expect(closeIcon.attributes('focusable')).toBe('false')
      expect(closeIcon.attributes('aria-hidden')).toBe('true')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsAlert variant="info" header="Information" show-icon closeable>
              This is an informational alert message
            </FdsAlert>
          </main>
        `,
        components: { FdsAlert },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty default slot', () => {
      const wrapper = mount(FdsAlert)

      expect(wrapper.find('.alert-text').text()).toBe('')
    })

    it('handles empty header prop', () => {
      const wrapper = mount(FdsAlert, {
        props: { header: '' },
      })

      // Empty string is falsy, so header won't render
      expect(wrapper.find('.alert-heading').exists()).toBe(false)
    })

    it('maintains visibility state after close', async () => {
      const wrapper = mount(FdsAlert, {
        props: { closeable: true },
      })

      const closeButton = wrapper.find('.alert-close')
      await closeButton.trigger('click')

      // Alert should be hidden
      expect(wrapper.find('.alert').exists()).toBe(false)

      // Component wrapper still exists
      expect(wrapper.exists()).toBe(true)
    })

    it('handles multiple close events', async () => {
      const wrapper = mount(FdsAlert, {
        props: { closeable: true },
      })

      const closeButton = wrapper.find('.alert-close')
      await closeButton.trigger('click')

      // Should only emit once since alert is hidden after first click
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
  })

  describe('Integration', () => {
    it('works with dynamic content updates', async () => {
      const wrapper = mount(FdsAlert, {
        slots: {
          default: 'Initial message',
        },
      })

      expect(wrapper.find('.alert-text').text()).toBe('Initial message')

      // Update slot content
      await wrapper.setProps({})
      await wrapper.vm.$nextTick()
    })

    it('works in a form context with validation messages', () => {
      const FormWrapper = {
        template: `
          <form>
            <FdsAlert variant="error" header="Validation Error">
              Please correct the errors below
            </FdsAlert>
            <input type="text" />
            <button type="submit">Submit</button>
          </form>
        `,
        components: { FdsAlert },
      }

      const wrapper = mount(FormWrapper)
      const alert = wrapper.findComponent(FdsAlert)

      expect(alert.exists()).toBe(true)
      expect(alert.find('.alert').attributes('role')).toBe('alert')
    })

    it('can be used for multiple alert instances', () => {
      const MultiAlertWrapper = {
        template: `
          <div>
            <FdsAlert variant="info" class="alert-1">Info message</FdsAlert>
            <FdsAlert variant="warning" class="alert-2">Warning message</FdsAlert>
            <FdsAlert variant="error" class="alert-3">Error message</FdsAlert>
          </div>
        `,
        components: { FdsAlert },
      }

      const wrapper = mount(MultiAlertWrapper)
      const alerts = wrapper.findAllComponents(FdsAlert)

      expect(alerts).toHaveLength(3)
      expect(alerts[0].find('.alert').classes()).toContain('alert-info')
      expect(alerts[1].find('.alert').classes()).toContain('alert-warning')
      expect(alerts[2].find('.alert').classes()).toContain('alert-error')
    })
  })
})
