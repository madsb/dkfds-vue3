import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import FdsToastContainer from '../../components/fds-toast-container.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

// Mock the generateId function to return a simple string
vi.mock('dkfds-vue3-utils', async () => {
  const actual = (await vi.importActual('dkfds-vue3-utils')) as any
  return {
    ...actual,
    generateId: (prefix: string) => ({ value: `${prefix}-test-id` }),
  }
})

// Mock DOM methods for animation testing
const mockOffsetHeight = vi.fn(() => 100)

describe('FdsToastContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    // Mock element methods for transition testing
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: mockOffsetHeight,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsToastContainer)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with correct DKFDS structure', () => {
      const wrapper = mount(FdsToastContainer)

      expect(wrapper.find('.toast-container').exists()).toBe(true)
      expect(wrapper.attributes('aria-live')).toBe('assertive')
      expect(wrapper.attributes('aria-atomic')).toBe('false')
      expect(wrapper.attributes('aria-relevant')).toBe('additions')
    })

    it('uses generated id by default', () => {
      const wrapper = mount(FdsToastContainer)

      const container = wrapper.find('.toast-container')
      const id = container.attributes('id')
      expect(id).toBe('toast-container-test-id')
    })

    it('uses custom id when provided', () => {
      const customId = 'custom-toast-container'
      const wrapper = mount(FdsToastContainer, {
        props: { id: customId },
      })

      expect(wrapper.find('.toast-container').attributes('id')).toBe(customId)
    })

    it('renders with simple container structure', () => {
      const wrapper = mount(FdsToastContainer)

      expect(wrapper.find('.toast-container').exists()).toBe(true)
    })

    it('renders with proper ARIA attributes', () => {
      const wrapper = mount(FdsToastContainer)

      expect(wrapper.attributes('aria-live')).toBe('assertive')
    })

    it('renders with proper ARIA atomic attribute', () => {
      const wrapper = mount(FdsToastContainer)

      expect(wrapper.attributes('aria-atomic')).toBe('false')
    })
  })

  describe('Props', () => {
    it('uses custom id when provided', () => {
      const customId = 'custom-toast-container'
      const wrapper = mount(FdsToastContainer, {
        props: { id: customId },
      })

      expect(wrapper.attributes('id')).toBe(customId)
    })

    it('uses generated id by default', () => {
      const wrapper = mount(FdsToastContainer)

      expect(wrapper.attributes('id')).toBe('toast-container-test-id')
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const slotContent = '<div class="custom-toast">Custom toast content</div>'
      const wrapper = mount(FdsToastContainer, {
        slots: {
          default: slotContent,
        },
      })

      expect(wrapper.find('.custom-toast').exists()).toBe(true)
      expect(wrapper.find('.custom-toast').text()).toBe('Custom toast content')
    })

    it('renders multiple slot items', () => {
      const wrapper = mount(FdsToastContainer, {
        slots: {
          default: `
            <div class="toast-1">Toast 1</div>
            <div class="toast-2">Toast 2</div>
            <div class="toast-3">Toast 3</div>
          `,
        },
      })

      expect(wrapper.find('.toast-1').exists()).toBe(true)
      expect(wrapper.find('.toast-2').exists()).toBe(true)
      expect(wrapper.find('.toast-3').exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(FdsToastContainer)

      expect(wrapper.attributes('aria-live')).toBe('assertive')
      expect(wrapper.attributes('aria-atomic')).toBe('false')
      expect(wrapper.attributes('aria-relevant')).toBe('additions')
    })

    it.skip('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsToastContainer
              position="top-right"
              :fixed="true"
              :stacked="true"
              aria-label="Test notifications"
            >
              <div class="toast toast-info" aria-atomic="true">Test toast</div>
            </FdsToastContainer>
          </main>
        `,
        components: { FdsToastContainer },
      }

      await testAccessibility(TestWrapper)
    })
  })


  describe('Lifecycle', () => {
    it('mounts and unmounts without errors', () => {
      const wrapper = mount(FdsToastContainer)
      expect(wrapper.exists()).toBe(true)

      // Unmount component
      wrapper.unmount()

      // Should not throw any errors
      expect(true).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slots gracefully', () => {
      const wrapper = mount(FdsToastContainer)
      expect(wrapper.find('.toast-container').exists()).toBe(true)
    })

    it('handles multiple children in slot', () => {
      const wrapper = mount(FdsToastContainer, {
        slots: {
          default: `
            <div>Toast 1</div>
            <div>Toast 2</div>
            <div>Toast 3</div>
          `
        }
      })

      expect(wrapper.find('.toast-container').exists()).toBe(true)
    })
  })

  describe('Integration', () => {
    it('works with actual DOM container', async () => {
      const containerId = 'integration-test-container'
      
      const wrapper = mount(FdsToastContainer, {
        props: { id: containerId },
      })

      await flushPromises()

      // Container should have the correct id
      expect(wrapper.attributes('id')).toBe(containerId)
    })

    it('works with complex toast content', () => {
      const complexContent = `
        <div class="toast toast-info" aria-atomic="true">
          <h3>Complex Toast</h3>
          <p>With multiple elements</p>
          <button>Action</button>
        </div>
      `

      const wrapper = mount(FdsToastContainer, {
        slots: {
          default: complexContent,
        },
      })

      expect(wrapper.find('.toast h3').text()).toBe('Complex Toast')
      expect(wrapper.find('.toast p').text()).toBe('With multiple elements')
      expect(wrapper.find('.toast button').text()).toBe('Action')
    })
  })
})
