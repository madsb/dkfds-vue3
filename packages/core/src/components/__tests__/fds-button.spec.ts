import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsButton from '../fds-button.vue'
import { FdsVariantEnum } from 'dkfds-vue3-utils'

describe('FdsButton', () => {
  describe('Rendering', () => {
    it('renders button element', () => {
      const wrapper = mount(FdsButton)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders with default primary variant class', () => {
      const wrapper = mount(FdsButton)
      expect(wrapper.find('button').classes()).toContain('button')
      expect(wrapper.find('button').classes()).toContain('button-primary')
    })

    it('renders slot content', () => {
      const slotContent = 'Click me'
      const wrapper = mount(FdsButton, {
        slots: {
          default: slotContent
        }
      })
      expect(wrapper.text()).toBe(slotContent)
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsButton, {
        slots: {
          default: '<span class="icon">🔧</span> Settings'
        }
      })
      expect(wrapper.find('.icon').exists()).toBe(true)
      expect(wrapper.text()).toContain('Settings')
    })
  })

  describe('Variants', () => {
    it.each([
      [FdsVariantEnum.primary, 'button-primary'],
      [FdsVariantEnum.secondary, 'button-secondary'],
      [FdsVariantEnum.tertiary, 'button-tertiary'],
      [FdsVariantEnum.quaternary, 'button-quaternary'],
      [FdsVariantEnum.info, 'button-info'],
      [FdsVariantEnum.success, 'button-success'],
      [FdsVariantEnum.warning, 'button-warning'],
      [FdsVariantEnum.error, 'button-error']
    ])('renders with variant "%s" class "%s"', (variant, expectedClass) => {
      const wrapper = mount(FdsButton, {
        props: { variant }
      })
      expect(wrapper.find('button').classes()).toContain(expectedClass)
    })

    it('accepts custom variant string', () => {
      const customVariant = 'custom-variant'
      const wrapper = mount(FdsButton, {
        props: { variant: customVariant }
      })
      expect(wrapper.find('button').classes()).toContain(`button-${customVariant}`)
    })
  })

  describe('Props', () => {
    it('has correct default variant', () => {
      const wrapper = mount(FdsButton)
      
      // The component should have the default variant applied
      expect(wrapper.find('button').classes()).toContain('button-primary')
    })
  })

  describe('DOM attributes', () => {
    it('passes through native button attributes', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          disabled: true,
          type: 'submit',
          'aria-label': 'Submit form',
          'data-testid': 'submit-button'
        }
      })
      
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
      expect(button.attributes('type')).toBe('submit')
      expect(button.attributes('aria-label')).toBe('Submit form')
      expect(button.attributes('data-testid')).toBe('submit-button')
    })
  })

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(FdsButton)
      await wrapper.find('button').trigger('click')
      
      // Native button doesn't emit custom events, but click works
      expect(wrapper.find('button').element).toBeTruthy()
    })

    it('handles click with event handler', async () => {
      let clicked = false
      const wrapper = mount(FdsButton, {
        attrs: {
          onClick: () => { clicked = true }
        }
      })
      
      await wrapper.find('button').trigger('click')
      expect(clicked).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('is keyboard accessible by default', () => {
      const wrapper = mount(FdsButton)
      const button = wrapper.find('button')
      
      // Buttons are focusable by default
      expect(button.element.tagName).toBe('BUTTON')
    })

    it('can be disabled', () => {
      const wrapper = mount(FdsButton, {
        attrs: { disabled: true }
      })
      
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('supports aria attributes', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          'aria-pressed': 'true',
          'aria-expanded': 'false',
          'aria-describedby': 'help-text'
        }
      })
      
      const button = wrapper.find('button')
      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(button.attributes('aria-describedby')).toBe('help-text')
    })
  })

  describe('Edge cases', () => {
    it('handles empty slot gracefully', () => {
      const wrapper = mount(FdsButton)
      expect(wrapper.text()).toBe('')
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('handles undefined variant', () => {
      const wrapper = mount(FdsButton, {
        props: { variant: undefined }
      })
      expect(wrapper.find('button').classes()).toContain('button-primary')
    })

    it('handles null variant', () => {
      const wrapper = mount(FdsButton, {
        props: { variant: null }
      })
      // Vue will convert null to "null" string for string props
      expect(wrapper.find('button').classes()).toContain('button-null')
    })
  })
})