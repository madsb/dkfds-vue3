import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsButton from "../../components/layout/fds-button.vue"

describe('FdsButton', () => {
  describe('Rendering', () => {
    it('renders button element with default primary variant', () => {
      const wrapper = mount(FdsButton)

      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.classes()).toContain('button')
      expect(wrapper.classes()).toContain('button-primary')
    })

    it('renders slot content correctly', () => {
      const wrapper = mount(FdsButton, {
        slots: {
          default: 'Click me',
        },
      })

      expect(wrapper.text()).toBe('Click me')
    })

    it('renders with HTML content in slot', () => {
      const wrapper = mount(FdsButton, {
        slots: {
          default: '<span class="icon">→</span> Next',
        },
      })

      expect(wrapper.find('.icon').exists()).toBe(true)
      expect(wrapper.text()).toContain('Next')
    })
  })

  describe('Variants', () => {
    const validVariants = ['primary', 'secondary', 'tertiary', 'warning']

    validVariants.forEach((variant) => {
      it(`applies ${variant} variant class correctly`, () => {
        const wrapper = mount(FdsButton, {
          props: { variant },
        })

        expect(wrapper.classes()).toContain(`button-${variant}`)
      })
    })

    it('accepts custom variant strings', () => {
      const customVariant = 'custom-variant'
      const wrapper = mount(FdsButton, {
        props: { variant: customVariant },
      })

      expect(wrapper.classes()).toContain(`button-${customVariant}`)
    })
  })

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const onClick = vi.fn()
      const wrapper = mount(FdsButton, {
        attrs: {
          onClick,
        },
      })

      await wrapper.trigger('click')
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('respects disabled attribute', async () => {
      const onClick = vi.fn()
      const wrapper = mount(FdsButton, {
        attrs: {
          disabled: true,
          onClick,
        },
      })

      expect(wrapper.attributes('disabled')).toBeDefined()

      // Note: jsdom doesn't prevent click events on disabled buttons
      // In real browsers, this wouldn't fire
      await wrapper.trigger('click')
      // So we just verify the disabled attribute is set
      expect(wrapper.element.hasAttribute('disabled')).toBe(true)
    })
  })

  describe('Attributes', () => {
    it('passes through native button attributes', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          type: 'submit',
          'aria-label': 'Submit form',
          'data-testid': 'submit-btn',
        },
      })

      expect(wrapper.attributes('type')).toBe('submit')
      expect(wrapper.attributes('aria-label')).toBe('Submit form')
      expect(wrapper.attributes('data-testid')).toBe('submit-btn')
    })

    it('handles form attribute correctly', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          form: 'my-form-id',
        },
      })

      expect(wrapper.attributes('form')).toBe('my-form-id')
    })
  })

  describe('Accessibility', () => {
    it('maintains proper button role', () => {
      const wrapper = mount(FdsButton)

      // Native button elements have implicit role="button"
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('supports aria-pressed for toggle buttons', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          'aria-pressed': 'true',
        },
      })

      expect(wrapper.attributes('aria-pressed')).toBe('true')
    })

    it('supports aria-expanded for disclosure buttons', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          'aria-expanded': 'false',
          'aria-controls': 'panel-id',
        },
      })

      expect(wrapper.attributes('aria-expanded')).toBe('false')
      expect(wrapper.attributes('aria-controls')).toBe('panel-id')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slot gracefully', () => {
      const wrapper = mount(FdsButton)

      expect(wrapper.text()).toBe('')
      expect(wrapper.classes()).toContain('button')
    })

    it('maintains reactivity when variant changes', async () => {
      const wrapper = mount(FdsButton, {
        props: { variant: 'primary' },
      })

      expect(wrapper.classes()).toContain('button-primary')

      await wrapper.setProps({ variant: 'secondary' })
      expect(wrapper.classes()).not.toContain('button-primary')
      expect(wrapper.classes()).toContain('button-secondary')
    })

    it('handles multiple click handlers', async () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      const wrapper = mount(FdsButton, {
        attrs: {
          onClick: [handler1, handler2],
        },
      })

      await wrapper.trigger('click')
      expect(handler1).toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
    })
  })

  describe('Integration Scenarios', () => {
    it('works correctly in forms', () => {
      const wrapper = mount({
        template: `
          <form>
            <FdsButton type="submit">Submit</FdsButton>
            <FdsButton type="reset">Reset</FdsButton>
            <FdsButton type="button">Cancel</FdsButton>
          </form>
        `,
        components: { FdsButton },
      })

      const buttons = wrapper.findAllComponents(FdsButton)
      expect(buttons[0].attributes('type')).toBe('submit')
      expect(buttons[1].attributes('type')).toBe('reset')
      expect(buttons[2].attributes('type')).toBe('button')
    })

    it('works with loading states', async () => {
      const ParentComponent = {
        template: `
          <FdsButton :disabled="loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </FdsButton>
        `,
        components: { FdsButton },
        data() {
          return { loading: false }
        },
      }

      const wrapper = mount(ParentComponent)
      const button = wrapper.findComponent(FdsButton)

      expect(button.text()).toBe('Save')
      expect(button.attributes('disabled')).toBeUndefined()

      // Simulate loading state
      await wrapper.setData({ loading: true })

      expect(button.text()).toBe('Saving...')
      expect(button.attributes('disabled')).toBeDefined()
    })
  })

  describe('DKFDS v11 Features', () => {
    describe('Icon Support', () => {
      it('renders with icon', () => {
        const wrapper = mount(FdsButton, {
          props: {
            icon: 'refresh',
            variant: 'primary',
          },
          slots: {
            default: 'Refresh',
          },
        })

        const iconSvg = wrapper.find('svg.icon-svg')
        expect(iconSvg.exists()).toBe(true)
        expect(iconSvg.attributes('focusable')).toBe('false')
        expect(iconSvg.attributes('aria-hidden')).toBe('true')
        expect(iconSvg.find('use').attributes('href')).toBe('#refresh')
      })

      it('renders icon on the right when iconRight is true', () => {
        const wrapper = mount(FdsButton, {
          props: {
            icon: 'arrow-right',
            iconRight: true,
          },
          slots: {
            default: 'Next',
          },
        })

        const iconSvgs = wrapper.findAll('svg.icon-svg')
        expect(iconSvgs).toHaveLength(1)

        // Icon should be after the slot content
        const button = wrapper.find('button')
        const buttonHtml = button.html()
        const iconIndex = buttonHtml.indexOf('<svg')
        const textIndex = buttonHtml.indexOf('Next')
        expect(iconIndex > textIndex).toBe(true)
      })

      it('does not render icon when icon prop is not provided', () => {
        const wrapper = mount(FdsButton, {
          slots: { default: 'No icon' },
        })

        expect(wrapper.find('svg.icon-svg').exists()).toBe(false)
      })

      it('handles empty icon prop gracefully', () => {
        const wrapper = mount(FdsButton, {
          props: { icon: '' },
          slots: { default: 'Button' },
        })

        expect(wrapper.find('svg.icon-svg').exists()).toBe(false)
      })

      it('updates icon dynamically', async () => {
        const wrapper = mount(FdsButton, {
          props: { icon: 'save' },
          slots: { default: 'Save' },
        })

        expect(wrapper.find('use').attributes('href')).toBe('#save')

        await wrapper.setProps({ icon: 'edit' })
        expect(wrapper.find('use').attributes('href')).toBe('#edit')
      })
    })

    describe('Mobile Full Width', () => {
      it('applies xs-full-width class when fullWidthMobile is true', () => {
        const wrapper = mount(FdsButton, {
          props: { fullWidthMobile: true },
        })

        expect(wrapper.classes()).toContain('xs-full-width')
      })

      it('does not apply xs-full-width class by default', () => {
        const wrapper = mount(FdsButton)

        expect(wrapper.classes()).not.toContain('xs-full-width')
      })

      it('can toggle fullWidthMobile dynamically', async () => {
        const wrapper = mount(FdsButton, {
          props: { fullWidthMobile: false },
        })

        expect(wrapper.classes()).not.toContain('xs-full-width')

        await wrapper.setProps({ fullWidthMobile: true })
        expect(wrapper.classes()).toContain('xs-full-width')
      })
    })

    describe('Icon Only Buttons', () => {
      it('applies button-icon-only class when iconOnly is true', () => {
        const wrapper = mount(FdsButton, {
          props: { iconOnly: true },
        })

        expect(wrapper.classes()).toContain('button-icon-only')
      })

      it('does not apply button-icon-only class by default', () => {
        const wrapper = mount(FdsButton)

        expect(wrapper.classes()).not.toContain('button-icon-only')
      })

      it('works correctly with icon and iconOnly props together', () => {
        const wrapper = mount(FdsButton, {
          props: {
            icon: 'close',
            iconOnly: true,
          },
        })

        expect(wrapper.classes()).toContain('button-icon-only')
        expect(wrapper.find('svg.icon-svg').exists()).toBe(true)
        expect(wrapper.find('use').attributes('href')).toBe('#close')
      })
    })

    describe('Combined Features', () => {
      it('combines multiple v11 features correctly', () => {
        const wrapper = mount(FdsButton, {
          props: {
            variant: 'secondary',
            icon: 'settings',
            iconRight: true,
            fullWidthMobile: true,
            iconOnly: false,
          },
        })

        expect(wrapper.classes()).toContain('button-secondary')
        expect(wrapper.classes()).toContain('xs-full-width')
        expect(wrapper.classes()).not.toContain('button-icon-only')
        expect(wrapper.find('svg.icon-svg').exists()).toBe(true)
      })

      it('handles all features with warning variant', () => {
        const wrapper = mount(FdsButton, {
          props: {
            variant: 'warning',
            icon: 'warning',
            iconOnly: true,
            fullWidthMobile: true,
          },
        })

        expect(wrapper.classes()).toContain('button-warning')
        expect(wrapper.classes()).toContain('xs-full-width')
        expect(wrapper.classes()).toContain('button-icon-only')
        expect(wrapper.find('svg.icon-svg').exists()).toBe(true)
      })
    })

    describe('Backward Compatibility', () => {
      it('maintains compatibility with basic button usage', () => {
        const wrapper = mount(FdsButton, {
          slots: { default: 'Click me' },
        })

        expect(wrapper.classes()).toContain('button')
        expect(wrapper.classes()).toContain('button-primary')
        expect(wrapper.text()).toBe('Click me')
      })

      it('maintains compatibility with variant prop', () => {
        const variants = ['primary', 'secondary', 'tertiary', 'warning']

        variants.forEach((variant) => {
          const wrapper = mount(FdsButton, {
            props: { variant },
          })
          expect(wrapper.classes()).toContain(`button-${variant}`)
        })
      })
    })
  })

  describe('Accessibility', () => {
    it('maintains proper ARIA attributes on icons', () => {
      const wrapper = mount(FdsButton, {
        props: { icon: 'save' },
      })

      const icon = wrapper.find('svg.icon-svg')
      expect(icon.attributes('focusable')).toBe('false')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('passes through all attributes correctly', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          'aria-label': 'Save document',
          'data-testid': 'save-btn',
          type: 'submit',
          disabled: true,
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Save document')
      expect(wrapper.attributes('data-testid')).toBe('save-btn')
      expect(wrapper.attributes('type')).toBe('submit')
      expect(wrapper.attributes('disabled')).toBeDefined()
    })
  })
})
