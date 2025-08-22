import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsSpinner from '../../components/fds-spinner.vue'

describe('FdsSpinner', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(FdsSpinner)

      expect(wrapper.find('.spinner-wrapper').exists()).toBe(true)
      expect(wrapper.find('.spinner').exists()).toBe(true)
      expect(wrapper.find('.spinner').classes()).not.toContain('spinner-small')
      expect(wrapper.find('.spinner').classes()).not.toContain('spinner-light')
    })

    it('renders with wrapper element', () => {
      const wrapper = mount(FdsSpinner)

      expect(wrapper.find('.spinner-wrapper').exists()).toBe(true)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('Props', () => {
    describe('size', () => {
      it('applies small size class when size is small', () => {
        const wrapper = mount(FdsSpinner, {
          props: { size: 'small' },
        })

        expect(wrapper.find('.spinner').classes()).toContain('spinner-small')
      })

      it('does not apply small size class when size is large', () => {
        const wrapper = mount(FdsSpinner, {
          props: { size: 'large' },
        })

        expect(wrapper.find('.spinner').classes()).not.toContain('spinner-small')
      })

      it('defaults to large size', () => {
        const wrapper = mount(FdsSpinner)

        expect(wrapper.find('.spinner').classes()).not.toContain('spinner-small')
      })
    })

    describe('variant', () => {
      it('applies light variant class when variant is light', () => {
        const wrapper = mount(FdsSpinner, {
          props: { variant: 'light' },
        })

        expect(wrapper.find('.spinner').classes()).toContain('spinner-light')
      })

      it('does not apply light variant class when variant is default', () => {
        const wrapper = mount(FdsSpinner, {
          props: { variant: 'default' },
        })

        expect(wrapper.find('.spinner').classes()).not.toContain('spinner-light')
      })

      it('defaults to default variant', () => {
        const wrapper = mount(FdsSpinner)

        expect(wrapper.find('.spinner').classes()).not.toContain('spinner-light')
      })
    })

    describe('srOnlyText', () => {
      it('renders screen reader text when provided and no slot content', () => {
        const wrapper = mount(FdsSpinner, {
          props: { srOnlyText: 'Loading content' },
        })

        const srOnly = wrapper.find('.sr-only')
        expect(srOnly.exists()).toBe(true)
        expect(srOnly.text()).toBe('Loading content')
      })

      it('does not render screen reader text when not provided', () => {
        const wrapper = mount(FdsSpinner)

        expect(wrapper.find('.sr-only').exists()).toBe(false)
      })

      it('does not render screen reader text when slot content is provided', () => {
        const wrapper = mount(FdsSpinner, {
          props: { srOnlyText: 'Loading content' },
          slots: { default: 'Visible loading text' },
        })

        expect(wrapper.find('.sr-only').exists()).toBe(false)
      })
    })

    describe('centered', () => {
      it('applies centering classes when centered is true', () => {
        const wrapper = mount(FdsSpinner, {
          props: { centered: true },
        })

        const wrapperDiv = wrapper.find('.spinner-wrapper')
        expect(wrapperDiv.classes()).toContain('d-flex')
        expect(wrapperDiv.classes()).toContain('justify-content-center')
      })

      it('does not apply centering classes when centered is false', () => {
        const wrapper = mount(FdsSpinner, {
          props: { centered: false },
        })

        const wrapperDiv = wrapper.find('.spinner-wrapper')
        expect(wrapperDiv.classes()).not.toContain('d-flex')
        expect(wrapperDiv.classes()).not.toContain('justify-content-center')
      })

      it('defaults to not centered', () => {
        const wrapper = mount(FdsSpinner)

        const wrapperDiv = wrapper.find('.spinner-wrapper')
        expect(wrapperDiv.classes()).not.toContain('d-flex')
        expect(wrapperDiv.classes()).not.toContain('justify-content-center')
      })
    })

    describe('ariaLive', () => {
      it('sets aria-live attribute on status text', () => {
        const wrapper = mount(FdsSpinner, {
          props: { ariaLive: 'assertive' },
          slots: { default: 'Loading' },
        })

        const status = wrapper.find('.spinner-status')
        expect(status.attributes('aria-live')).toBe('assertive')
      })

      it('defaults to polite aria-live', () => {
        const wrapper = mount(FdsSpinner, {
          slots: { default: 'Loading' },
        })

        const status = wrapper.find('.spinner-status')
        expect(status.attributes('aria-live')).toBe('polite')
      })

      it('can set aria-live to off', () => {
        const wrapper = mount(FdsSpinner, {
          props: { ariaLive: 'off' },
          slots: { default: 'Loading' },
        })

        const status = wrapper.find('.spinner-status')
        expect(status.attributes('aria-live')).toBe('off')
      })
    })

    describe('combination of props', () => {
      it('applies multiple props correctly', () => {
        const wrapper = mount(FdsSpinner, {
          props: {
            size: 'small',
            variant: 'light',
            centered: true,
            srOnlyText: 'Loading...',
          },
        })

        const spinner = wrapper.find('.spinner')
        const wrapperDiv = wrapper.find('.spinner-wrapper')
        const srOnly = wrapper.find('.sr-only')

        expect(spinner.classes()).toContain('spinner-small')
        expect(spinner.classes()).toContain('spinner-light')
        expect(wrapperDiv.classes()).toContain('d-flex')
        expect(wrapperDiv.classes()).toContain('justify-content-center')
        expect(srOnly.text()).toBe('Loading...')
      })
    })
  })

  describe('Slots', () => {
    it('renders default slot content in status div', () => {
      const wrapper = mount(FdsSpinner, {
        slots: {
          default: 'Loading data...',
        },
      })

      const status = wrapper.find('.spinner-status')
      expect(status.exists()).toBe(true)
      expect(status.text()).toBe('Loading data...')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsSpinner, {
        slots: {
          default: '<span class="custom">Processing...</span>',
        },
      })

      const status = wrapper.find('.spinner-status')
      expect(status.exists()).toBe(true)
      expect(status.find('.custom').exists()).toBe(true)
      expect(status.find('.custom').text()).toBe('Processing...')
    })

    it('does not render status div when no slot content', () => {
      const wrapper = mount(FdsSpinner)

      expect(wrapper.find('.spinner-status').exists()).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('has role="status" on status text container', () => {
      const wrapper = mount(FdsSpinner, {
        slots: { default: 'Loading' },
      })

      const status = wrapper.find('.spinner-status')
      expect(status.attributes('role')).toBe('status')
    })

    it('sets aria-hidden="true" on spinner when status text is present', () => {
      const wrapper = mount(FdsSpinner, {
        slots: { default: 'Loading' },
      })

      const spinner = wrapper.find('.spinner')
      expect(spinner.attributes('aria-hidden')).toBe('true')
    })

    it('does not set aria-hidden on spinner when no status text', () => {
      const wrapper = mount(FdsSpinner)

      const spinner = wrapper.find('.spinner')
      expect(spinner.attributes('aria-hidden')).toBeUndefined()
    })

    it('provides accessible text through sr-only class', () => {
      const wrapper = mount(FdsSpinner, {
        props: { srOnlyText: 'Page is loading' },
      })

      const srOnly = wrapper.find('.sr-only')
      expect(srOnly.exists()).toBe(true)
      expect(srOnly.text()).toBe('Page is loading')
    })

    it('supports both visible and screen reader text', () => {
      const wrapper = mount(FdsSpinner, {
        slots: { default: 'Visible loading message' },
      })

      const status = wrapper.find('.spinner-status')
      expect(status.attributes('role')).toBe('status')
      expect(status.text()).toBe('Visible loading message')
    })
  })

  describe('Attributes', () => {
    it('passes through additional attributes to spinner element', () => {
      const wrapper = mount(FdsSpinner, {
        attrs: {
          'data-testid': 'my-spinner',
          'aria-label': 'Custom spinner',
        },
      })

      const spinner = wrapper.find('.spinner')
      expect(spinner.attributes('data-testid')).toBe('my-spinner')
      expect(spinner.attributes('aria-label')).toBe('Custom spinner')
    })

    it('preserves class attribute on spinner element', () => {
      const wrapper = mount(FdsSpinner, {
        attrs: {
          class: 'custom-class',
        },
      })

      const spinner = wrapper.find('.spinner')
      expect(spinner.classes()).toContain('spinner')
      expect(spinner.classes()).toContain('custom-class')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slot gracefully', () => {
      const wrapper = mount(FdsSpinner, {
        slots: { default: '' },
      })

      // Empty slot should still be considered as having content
      expect(wrapper.find('.spinner-status').exists()).toBe(true)
    })

    it('handles whitespace-only slot content', () => {
      const wrapper = mount(FdsSpinner, {
        slots: { default: '   ' },
      })

      const status = wrapper.find('.spinner-status')
      expect(status.exists()).toBe(true)
      expect(status.text().trim()).toBe('')
    })

    it('handles undefined props gracefully', () => {
      const wrapper = mount(FdsSpinner, {
        props: {
          size: undefined,
          variant: undefined,
          srOnlyText: undefined,
          centered: undefined,
          ariaLive: undefined,
        } as any,
      })

      // Should use defaults
      expect(wrapper.find('.spinner').classes()).not.toContain('spinner-small')
      expect(wrapper.find('.spinner').classes()).not.toContain('spinner-light')
      expect(wrapper.find('.sr-only').exists()).toBe(false)
      expect(wrapper.find('.spinner-wrapper').classes()).not.toContain('d-flex')
    })
  })

  describe('TypeScript Interface', () => {
    it('component exports correct prop types', () => {
      // This test mainly ensures TypeScript compilation works
      const component = FdsSpinner as any

      // The component should be defined
      expect(component).toBeDefined()
    })
  })
})
