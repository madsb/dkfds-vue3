import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import FdsTooltip from '../../components/feedback/fds-tooltip.vue'
import { testAccessibility } from '../../test-utils'

// Simple mock for tooltip utility - just what the component actually uses
vi.mock('../../utils/scripts', () => ({
  tooltip: vi.fn().mockImplementation(() => ({
    init: vi.fn(),
    destroy: vi.fn(),
  })),
  destroyAllTooltips: vi.fn(),
}))

// Mock generateId to return a ref-like object
vi.mock('../../composables/generateId', () => ({
  default: (id?: string) => ({ value: id || 'fid_test_id' }),
}))

describe('FdsTooltip', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      wrapper = mount(FdsTooltip, {
        props: {
          content: 'Test content',
        },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with correct DKFDS structure', () => {
      wrapper = mount(FdsTooltip, {
        props: {
          content: 'Test tooltip',
        },
      })

      expect(wrapper.find('.tooltip-wrapper').exists()).toBe(true)
      expect(wrapper.find('.tooltip-target').exists()).toBe(true)
    })

    it('renders tooltip text element', () => {
      wrapper = mount(FdsTooltip, {
        props: {
          content: 'Help text',
        },
      })

      const tooltipWrapper = wrapper.find('.tooltip-wrapper')
      expect(tooltipWrapper.exists()).toBe(true)
      expect(tooltipWrapper.attributes('data-tooltip')).toBe('Help text')
    })
  })

  describe('Props', () => {
    it('accepts content prop', () => {
      wrapper = mount(FdsTooltip, {
        props: {
          content: 'Custom tooltip text',
        },
      })

      expect(wrapper.find('.tooltip-wrapper').attributes('data-tooltip')).toBe(
        'Custom tooltip text',
      )
    })

    it('accepts trigger prop', () => {
      wrapper = mount(FdsTooltip, {
        props: {
          content: 'Test',
          trigger: 'click',
        },
      })

      expect(wrapper.find('.tooltip-wrapper').attributes('data-trigger')).toBe('click')
    })

    it('accepts disabled prop', () => {
      wrapper = mount(FdsTooltip, {
        props: {
          content: 'Test',
          disabled: true,
        },
      })

      expect(wrapper.find('.tooltip-target').attributes('disabled')).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      wrapper = mount(FdsTooltip, {
        props: {
          content: 'Test',
          trigger: 'click',
        },
      })

      const target = wrapper.find('.tooltip-target')
      expect(target.attributes('aria-label')).toBe('Vis hjælpetekst')
    })

    it('meets accessibility standards', async () => {
      await testAccessibility(FdsTooltip, {
        props: {
          content: 'Accessible tooltip',
        },
      })
    })
  })
})
