import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { inject } from 'vue'
import FdsFejlopsummering from '../../components/fds-fejlopsummering.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsFejlopsummering', () => {
  beforeEach(() => {
    // Reset any mocked functions
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders nothing when there are no errors', () => {
      const wrapper = mount(FdsFejlopsummering)
      expect(wrapper.find('nav').exists()).toBe(false)
    })

    it('renders nav element when errors exist', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })
      expect(wrapper.find('nav').exists()).toBe(true)
    })

    it('renders with correct DKFDS structure', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      expect(wrapper.find('.alert.alert-error').exists()).toBe(true)
      expect(wrapper.find('.alert-icon').exists()).toBe(true)
      expect(wrapper.find('.alert-body').exists()).toBe(true)
      expect(wrapper.find('.alert-heading').exists()).toBe(true)
      expect(wrapper.find('.alert-text.nobullet-list').exists()).toBe(true)
    })

    it('applies correct CSS classes', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      const alert = wrapper.find('.alert')
      expect(alert.classes()).toContain('alert-error')
      expect(alert.classes()).toContain('mt-0')
      expect(alert.classes()).toContain('mb-8')
    })

    it('renders SVG icon with correct attributes', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      const svg = wrapper.find('svg')
      expect(svg.attributes('aria-label')).toBe('Fejl')
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.find('use').attributes('href')).toBe('#error')
    })
  })

  describe('Props', () => {
    it('uses default header text', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      expect(wrapper.find('.alert-heading').text()).toBe('Der er problemer')
    })

    it('accepts custom header text', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          header: 'Custom header',
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      expect(wrapper.find('.alert-heading').text()).toBe('Custom header')
    })

    it('renders manual errors from props', () => {
      const errors = [
        { id: 'field1', message: 'Error 1' },
        { id: 'field2', message: 'Error 2' },
      ]

      const wrapper = mount(FdsFejlopsummering, {
        props: { errors },
      })

      const links = wrapper.findAll('.function-link')
      expect(links).toHaveLength(2)
      expect(links[0].text()).toBe('Error 1')
      expect(links[1].text()).toBe('Error 2')
    })

    it('generates unique ID when not provided', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      const heading = wrapper.find('.alert-heading')
      const headingId = heading.attributes('id')
      expect(headingId).toBeTruthy()
      expect(wrapper.find('nav').attributes('aria-labelledby')).toBe(headingId)
    })

    it('uses provided ID for accessibility', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          id: 'custom-id',
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      expect(wrapper.find('.alert-heading').attributes('id')).toBe('custom-id')
      expect(wrapper.find('nav').attributes('aria-labelledby')).toBe('custom-id')
    })

    it('does not add data-module attribute (Vue-native implementation)', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      expect(wrapper.find('.alert').attributes('data-module')).toBeUndefined()
    })

    it('respects autoCollect prop', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          autoCollect: false,
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      // Component should still render manual errors
      expect(wrapper.find('.function-link').text()).toBe('Test error')
    })
  })

  describe('Events', () => {
    it('emits error-clicked event when error link is clicked', async () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'field1', message: 'Error 1' }],
        },
      })

      const link = wrapper.find('.function-link')
      await link.trigger('click')

      expect(wrapper.emitted('error-clicked')).toBeTruthy()
      expect(wrapper.emitted('error-clicked')?.[0]).toEqual(['field1'])
    })

    it('prevents default link behavior', async () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'field1', message: 'Error 1' }],
        },
      })

      const link = wrapper.find('.function-link')
      const event = new Event('click')
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      link.element.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('focuses element when error link is clicked (Vue-native behavior)', async () => {
      // Create a mock element
      const mockElement = document.createElement('input')
      mockElement.id = 'field1'
      mockElement.scrollIntoView = vi.fn() // Mock scrollIntoView for jsdom
      document.body.appendChild(mockElement)
      const focusSpy = vi.spyOn(mockElement, 'focus')
      const scrollSpy = vi.spyOn(mockElement, 'scrollIntoView')

      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'field1', message: 'Error 1' }],
        },
      })

      await wrapper.find('.function-link').trigger('click')

      // Scroll should be called immediately
      expect(scrollSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'center',
      })

      // Focus should be called after a delay
      await new Promise((resolve) => setTimeout(resolve, 550))
      expect(focusSpy).toHaveBeenCalled()

      // Cleanup
      document.body.removeChild(mockElement)
    })
  })

  describe('Slots', () => {
    it('renders header slot content', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
        slots: {
          header: '<span>Custom header slot</span>',
        },
      })

      expect(wrapper.find('.alert-heading').text()).toBe('Custom header slot')
    })

    it('renders default slot content in list', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
        slots: {
          default: '<li>Additional error item</li>',
        },
      })

      const list = wrapper.find('.nobullet-list')
      expect(list.html()).toContain('Additional error item')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      const alert = wrapper.find('.alert')
      expect(alert.attributes('role')).toBe('alert')

      const nav = wrapper.find('nav')
      expect(nav.attributes('aria-labelledby')).toBeTruthy()
    })

    it('error links have correct href attributes', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [
            { id: 'field1', message: 'Error 1' },
            { id: 'field2', message: 'Error 2' },
          ],
        },
      })

      const links = wrapper.findAll('.function-link')
      expect(links[0].attributes('href')).toBe('#field1')
      expect(links[1].attributes('href')).toBe('#field2')
    })
  })

  describe('Error Collection (Vue-native)', () => {
    it('provides error registration functions via provide/inject', () => {
      let provided: any
      const TestComponent = {
        template: '<div></div>',
        setup() {
          provided = (inject as any)('errorSummary')
        },
      }

      mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
        slots: {
          default: TestComponent,
        },
      })

      expect(provided).toBeDefined()
      expect(provided.registerError).toBeInstanceOf(Function)
      expect(provided.unregisterError).toBeInstanceOf(Function)
      expect(provided.clearErrors).toBeInstanceOf(Function)
    })

    it('auto-collection can be disabled', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          autoCollect: false,
          errors: [{ id: 'manual', message: 'Manual error' }],
        },
      })

      // Should still render manual errors when autoCollect is false
      expect(wrapper.find('.function-link').exists()).toBe(true)
      expect(wrapper.find('.function-link').text()).toBe('Manual error')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty errors array', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [],
        },
      })

      expect(wrapper.find('nav').exists()).toBe(false)
    })

    it('handles missing element for focus gracefully', async () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'non-existent', message: 'Error' }],
        },
      })

      // Should not throw when element doesn't exist
      await expect(wrapper.find('.function-link').trigger('click')).resolves.not.toThrow()
      expect(wrapper.emitted('error-clicked')?.[0]).toEqual(['non-existent'])
    })

    it('handles non-input elements for scroll', async () => {
      // Create a div element that can be scrolled to
      const mockElement = document.createElement('div')
      mockElement.id = 'div-element'
      document.body.appendChild(mockElement)

      // Mock scrollIntoView method
      mockElement.scrollIntoView = vi.fn()
      const scrollSpy = vi.spyOn(mockElement, 'scrollIntoView')

      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'div-element', message: 'Error' }],
        },
      })

      await wrapper.find('.function-link').trigger('click')

      // Should scroll the element
      expect(scrollSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'center',
      })
      expect(wrapper.emitted('error-clicked')?.[0]).toEqual(['div-element'])

      // Cleanup
      document.body.removeChild(mockElement)
    })

    it('cleans up Vue-native functionality on unmount', () => {
      const wrapper = mount(FdsFejlopsummering, {
        props: {
          errors: [{ id: 'test', message: 'Test error' }],
        },
      })

      expect(wrapper.find('nav').exists()).toBe(true)

      // Should unmount without throwing (Vue-native cleanup)
      expect(() => wrapper.unmount()).not.toThrow()
    })
  })

  describe('Accessibility Compliance', () => {
    it('meets accessibility standards', async () => {
      const wrapper = await testAccessibility(FdsFejlopsummering, {
        props: {
          errors: [
            { id: 'field1', message: 'First error message' },
            { id: 'field2', message: 'Second error message' },
          ],
        },
      })

      // Ensure the component rendered with errors
      expect(wrapper.find('nav').exists()).toBe(true)
    })
  })
})
