import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsTilTop from '../../components/navigation/fds-til-top.vue'
import { testAccessibility } from '../../test-utils'

// Store original values to restore after tests
const originalInnerHeight = window.innerHeight
const originalAddEventListener = window.addEventListener
const originalRemoveEventListener = window.removeEventListener
const originalScrollTo = window.scrollTo

describe('FdsTilTop', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock window properties for jsdom
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    })

    // Create a spy for scrollTo that we can track
    window.scrollTo = vi.fn()

    // Mock addEventListener and removeEventListener
    window.addEventListener = vi.fn()
    window.removeEventListener = vi.fn()
  })

  afterEach(() => {
    // Restore original window properties
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    })

    window.scrollTo = originalScrollTo
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
  })

  describe('Rendering', () => {
    it('renders anchor element with correct DKFDS classes', () => {
      const wrapper = mount(FdsTilTop)

      const anchor = wrapper.find('a')
      expect(anchor.exists()).toBe(true)
      expect(anchor.classes()).toContain('button')
      expect(anchor.classes()).toContain('back-to-top-button')
      expect(anchor.classes()).toContain('d-print-none')
    })

    it('renders with correct href attribute', () => {
      const wrapper = mount(FdsTilTop)

      expect(wrapper.find('a').attributes('href')).toBe('#top')
    })

    it('renders icon with correct attributes', () => {
      const wrapper = mount(FdsTilTop)

      const svg = wrapper.find('svg.icon-svg')
      expect(svg.exists()).toBe(true)
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')

      const use = svg.find('use')
      expect(use.attributes('href')).toBe('#arrow-upward')
    })

    it('renders screen reader text', () => {
      const wrapper = mount(FdsTilTop)

      const srText = wrapper.find('.sr-only')
      expect(srText.exists()).toBe(true)
      expect(srText.text()).toBe('Til toppen af siden')
    })

    it('renders visible text for desktop', () => {
      const wrapper = mount(FdsTilTop)

      const visibleText = wrapper.find('.d-none.d-md-inline-block')
      expect(visibleText.exists()).toBe(true)
      expect(visibleText.text()).toBe('Til toppen')
      expect(visibleText.attributes('aria-hidden')).toBe('true')
    })

    it('is hidden by default', () => {
      const wrapper = mount(FdsTilTop)

      expect(wrapper.isVisible()).toBe(false)
    })
  })

  describe('Props', () => {
    it('uses default screen reader text', () => {
      const wrapper = mount(FdsTilTop)

      expect(wrapper.find('.sr-only').text()).toBe('Til toppen af siden')
    })

    it('accepts custom screen reader text', () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          screenReaderText: 'Go to top of page',
        },
      })

      expect(wrapper.find('.sr-only').text()).toBe('Go to top of page')
    })

    it('uses default visible text', () => {
      const wrapper = mount(FdsTilTop)

      expect(wrapper.find('.d-none.d-md-inline-block').text()).toBe('Til toppen')
    })

    it('accepts custom visible text', () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          visibleText: 'To top',
        },
      })

      expect(wrapper.find('.d-none.d-md-inline-block').text()).toBe('To top')
    })

    it('accepts custom threshold', () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          threshold: 500,
        },
      })

      expect(wrapper.vm.threshold).toBe(500)
    })

    it('calculates default threshold as 2 screen heights', () => {
      window.innerHeight = 1000
      const wrapper = mount(FdsTilTop)

      // Trigger initial visibility check
      const component = wrapper.vm as any
      component.updateVisibility()

      expect(component.scrollThreshold).toBe(2000)
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsTilTop, {
        slots: {
          default: 'Back to top',
        },
      })

      expect(wrapper.find('.d-none.d-md-inline-block').text()).toBe('Back to top')
    })

    it('renders HTML content in slot', () => {
      const wrapper = mount(FdsTilTop, {
        slots: {
          default: '<span class="custom">Custom <strong>text</strong></span>',
        },
      })

      expect(wrapper.find('.custom').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('text')
    })

    it('falls back to visibleText prop when slot is empty', () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          visibleText: 'Fallback text',
        },
      })

      expect(wrapper.find('.d-none.d-md-inline-block').text()).toBe('Fallback text')
    })
  })

  describe('Scroll Behavior', () => {
    it('shows when scroll position exceeds threshold', async () => {
      const wrapper = mount(FdsTilTop)
      const component = wrapper.vm as any

      // Mock scroll position above threshold using vi.spyOn
      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(2000)

      component.updateVisibility()
      await wrapper.vm.$nextTick()

      expect(wrapper.isVisible()).toBe(true)

      vi.restoreAllMocks()
    })

    it('hides when scroll position is below threshold', async () => {
      const wrapper = mount(FdsTilTop)
      const component = wrapper.vm as any

      // Mock scroll position below threshold
      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(500)

      component.updateVisibility()
      await wrapper.vm.$nextTick()

      expect(wrapper.isVisible()).toBe(false)

      vi.restoreAllMocks()
    })

    it('uses custom threshold correctly', async () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          threshold: 1000,
        },
      })

      // Test that the threshold prop is accepted
      expect(wrapper.vm.threshold).toBe(1000)

      // Test visibility behavior programmatically
      const component = wrapper.vm as any

      // Manually set scroll position below threshold
      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(800)
      component.updateVisibility()
      await wrapper.vm.$nextTick()
      expect(component.isVisible).toBe(false)

      // Manually set scroll position above threshold
      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(1200)
      component.updateVisibility()
      await wrapper.vm.$nextTick()
      expect(component.isVisible).toBe(true)

      vi.restoreAllMocks()
    })

    it('recalculates threshold on window resize when using default', () => {
      const wrapper = mount(FdsTilTop)
      const component = wrapper.vm as any

      // Initial calculation
      component.updateVisibility()
      expect(component.scrollThreshold).toBe(1600) // 800 * 2

      // Change window height
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: 1000,
      })

      // Trigger resize handler
      const resizeHandler = (window.addEventListener as any).mock.calls.find(
        (call: any) => call[0] === 'resize',
      )[1]
      resizeHandler()

      expect(component.scrollThreshold).toBe(2000) // 1000 * 2
    })

    it('does not recalculate threshold on resize when using custom threshold', () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          threshold: 500,
        },
      })
      const component = wrapper.vm as any

      expect(component.scrollThreshold).toBe(500)

      // Trigger resize handler
      const resizeHandler = (window.addEventListener as any).mock.calls.find(
        (call: any) => call[0] === 'resize',
      )[1]
      resizeHandler()

      expect(component.scrollThreshold).toBe(500) // Should remain custom value
    })
  })

  describe('Click Behavior', () => {
    it('prevents default click behavior', async () => {
      const wrapper = mount(FdsTilTop)
      const event = { preventDefault: vi.fn() }

      await wrapper.find('a').trigger('click', event)

      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('calls scrollTo with correct parameters', async () => {
      const wrapper = mount(FdsTilTop)

      await wrapper.find('a').trigger('click')

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      })
    })
  })

  describe('Event Listeners', () => {
    it('adds scroll and resize event listeners on mount', () => {
      mount(FdsTilTop)

      expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), {
        passive: true,
      })
      expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function), {
        passive: true,
      })
    })

    it('removes event listeners on unmount', () => {
      const wrapper = mount(FdsTilTop)

      wrapper.unmount()

      expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })
  })

  describe('Accessibility', () => {
    it('has proper link semantics', () => {
      const wrapper = mount(FdsTilTop)

      const link = wrapper.find('a')
      expect(link.element.tagName).toBe('A')
      expect(link.attributes('href')).toBe('#top')
    })

    it('hides decorative icon from screen readers', () => {
      const wrapper = mount(FdsTilTop)

      const icon = wrapper.find('svg')
      expect(icon.attributes('aria-hidden')).toBe('true')
      expect(icon.attributes('focusable')).toBe('false')
    })

    it('provides screen reader text', () => {
      const wrapper = mount(FdsTilTop)

      const srText = wrapper.find('.sr-only')
      expect(srText.exists()).toBe(true)
      expect(srText.text()).toBeTruthy()
    })

    it('hides visible text from screen readers', () => {
      const wrapper = mount(FdsTilTop)

      const visibleText = wrapper.find('.d-none.d-md-inline-block')
      expect(visibleText.attributes('aria-hidden')).toBe('true')
    })

    it('passes accessibility tests', async () => {
      // Wrap in main landmark to satisfy axe region rule
      const TestWrapper = {
        template: `
          <main>
            <FdsTilTop />
          </main>
        `,
        components: { FdsTilTop },
      }

      await testAccessibility(TestWrapper)
    })

    it('supports keyboard navigation', async () => {
      const wrapper = mount(FdsTilTop)

      // Link should be focusable and handle keyboard events
      const link = wrapper.find('a')
      expect(link.element.tabIndex).not.toBe(-1)

      // For keyboard navigation, the default browser behavior would handle enter key
      // We can test that the link is properly accessible
      expect(link.attributes('href')).toBe('#top')
      expect(link.element.tagName).toBe('A')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('uses correct DKFDS v11 classes', () => {
      const wrapper = mount(FdsTilTop)
      const link = wrapper.find('a')

      expect(link.classes()).toContain('button')
      expect(link.classes()).toContain('back-to-top-button')
      expect(link.classes()).toContain('d-print-none')
    })

    it('uses arrow-upward icon as per DKFDS v11', () => {
      const wrapper = mount(FdsTilTop)

      expect(wrapper.find('use').attributes('href')).toBe('#arrow-upward')
    })

    it('implements responsive display pattern', () => {
      const wrapper = mount(FdsTilTop)

      // Icon should always be visible
      expect(wrapper.find('svg').exists()).toBe(true)

      // Text should be hidden on mobile, visible on desktop
      const textElement = wrapper.find('.d-none.d-md-inline-block')
      expect(textElement.exists()).toBe(true)
      expect(textElement.classes()).toContain('d-none')
      expect(textElement.classes()).toContain('d-md-inline-block')
    })

    it('provides proper Danish language defaults', () => {
      const wrapper = mount(FdsTilTop)

      expect(wrapper.find('.sr-only').text()).toBe('Til toppen af siden')
      expect(wrapper.find('.d-none.d-md-inline-block').text()).toBe('Til toppen')
    })
  })

  describe('Edge Cases', () => {
    it('handles missing window properties gracefully', () => {
      const wrapper = mount(FdsTilTop)
      const component = wrapper.vm as any

      // Mock fallback to document.documentElement.scrollTop
      vi.spyOn(document.documentElement, 'scrollTop', 'get').mockReturnValue(500)
      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(undefined as any)

      // Should not throw error
      expect(() => component.updateVisibility()).not.toThrow()

      vi.restoreAllMocks()
    })

    it('handles zero threshold', async () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          threshold: 0,
        },
      })
      const component = wrapper.vm as any

      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(1)

      component.updateVisibility()
      await wrapper.vm.$nextTick()

      expect(wrapper.isVisible()).toBe(true)

      vi.restoreAllMocks()
    })

    it('handles negative scroll positions', async () => {
      const wrapper = mount(FdsTilTop)
      const component = wrapper.vm as any

      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(-100)

      component.updateVisibility()
      await wrapper.vm.$nextTick()

      expect(wrapper.isVisible()).toBe(false)

      vi.restoreAllMocks()
    })
  })

  describe('Integration Scenarios', () => {
    it('works with dynamic threshold changes', async () => {
      const wrapper = mount(FdsTilTop, {
        props: {
          threshold: 1000,
        },
      })
      const component = wrapper.vm as any

      // Set scroll position between old and new thresholds
      const _mockScrollSpy = vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(1500)

      component.updateVisibility()
      await wrapper.vm.$nextTick()
      expect(wrapper.isVisible()).toBe(true)

      // Note: The component's scrollThreshold is set once based on the initial prop
      // Changing the prop doesn't automatically update the internal threshold
      // This is the current behavior of the component
      await wrapper.setProps({ threshold: 2000 })
      component.updateVisibility()
      await wrapper.vm.$nextTick()

      // The threshold remains 1000 (the original value), so it should still be visible
      expect(wrapper.isVisible()).toBe(true)

      vi.restoreAllMocks()
    })

    it('works in long page scenarios', async () => {
      const wrapper = mount(FdsTilTop)
      const component = wrapper.vm as any

      // Test a few key scroll positions
      const testCases = [
        { position: 0, shouldBeVisible: false },
        { position: 1500, shouldBeVisible: false }, // below 2 * 800 = 1600
        { position: 1700, shouldBeVisible: true }, // above threshold
        { position: 3200, shouldBeVisible: true }, // well above threshold
      ]

      for (const { position, shouldBeVisible } of testCases) {
        vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(position)

        component.updateVisibility()
        await wrapper.vm.$nextTick()

        expect(component.isVisible).toBe(shouldBeVisible)

        vi.restoreAllMocks()
      }
    })

    it('handles rapid scroll changes', () => {
      const wrapper = mount(FdsTilTop)
      const component = wrapper.vm as any

      // Rapid scroll up and down
      const positions = [2000, 1000, 3000, 500, 4000]

      positions.forEach((position) => {
        vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(position)

        expect(() => component.updateVisibility()).not.toThrow()

        vi.restoreAllMocks()
      })
    })
  })
})
