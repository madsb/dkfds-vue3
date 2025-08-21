import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsPaginering from '../../components/fds-paginering.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

// Mock the generateId function to return a simple string
vi.mock('dkfds-vue3-utils', async () => {
  const actual = (await vi.importActual('dkfds-vue3-utils')) as any
  return {
    ...actual,
    generateId: (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,
  }
})

describe('FdsPaginering', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsPaginering)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with correct DKFDS structure', () => {
      const wrapper = mount(FdsPaginering, {
        props: { list: Array.from({ length: 50 }, (_, i) => i + 1) },
      })

      expect(wrapper.find('nav.pagination').exists()).toBe(true)
      expect(wrapper.find('.pagination__items').exists()).toBe(true)
      expect(wrapper.find('[role="navigation"]').exists()).toBe(true)
    })

    it('does not render when list is empty', () => {
      const wrapper = mount(FdsPaginering, {
        props: { list: [] },
      })

      expect(wrapper.find('nav.pagination').exists()).toBe(false)
    })

    it('does not render when total items is less than page size', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 5 }, (_, i) => i + 1),
          pageSize: 10,
        },
      })

      expect(wrapper.find('nav.pagination').exists()).toBe(false)
    })

    it('renders mobile indicator with correct format', () => {
      const wrapper = mount(FdsPaginering, {
        props: { list: Array.from({ length: 25 }, (_, i) => i + 1) },
      })

      const mobileIndicator = wrapper.find('.pagination-mobile')
      expect(mobileIndicator.exists()).toBe(true)
      expect(mobileIndicator.text()).toBe('Side 1 af 3')
      expect(mobileIndicator.attributes('aria-live')).toBe('polite')
    })
  })

  describe('Props', () => {
    it('accepts and applies list prop correctly', () => {
      const testList = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      expect(wrapper.find('nav.pagination').exists()).toBe(true)
      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 1 af 3')
    })

    it('handles pageSize prop correctly', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 20 }, (_, i) => i + 1),
          pageSize: 5,
        },
      })

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 1 af 4')
    })

    it('handles maxElements prop for pagination display', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 100 }, (_, i) => i + 1),
          maxElements: 5,
        },
      })

      const pageButtons = wrapper.findAll('.pagination-number')
      expect(pageButtons.length).toBeLessThanOrEqual(5)
    })

    it('shows first/last buttons when showFirstLast is true', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 100 }, (_, i) => i + 1),
          showFirstLast: true,
        },
      })

      // First button should not be visible on page 1
      expect(wrapper.find('.button-first').exists()).toBe(false)
      expect(wrapper.find('.button-last').exists()).toBe(true)
    })

    it('hides first/last buttons when showFirstLast is false', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 100 }, (_, i) => i + 1),
          showFirstLast: false,
        },
      })

      expect(wrapper.find('.button-first').exists()).toBe(false)
      expect(wrapper.find('.button-last').exists()).toBe(false)
    })

    it('uses custom id prop', () => {
      const customId = 'custom-pagination'
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 20 }, (_, i) => i + 1),
          id: customId,
        },
      })

      expect(wrapper.find('nav.pagination').attributes('id')).toBe(customId)
    })

    it('handles external pagination with totalItems', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 0,
        },
      })

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 1 af 10')
    })

    it('calculates pages correctly with skip prop', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 20, // Should be on page 3
        },
      })

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 3 af 10')
      expect(wrapper.find('.current-page').text()).toBe('3')
    })
  })

  describe('Events', () => {
    it('emits filteredPage event on initialization', () => {
      const testList = Array.from({ length: 25 }, (_, i) => i + 1)
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      expect(wrapper.emitted('filteredPage')).toBeTruthy()
      expect(wrapper.emitted('filteredPage')?.[0]).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])
    })

    it('emits skip event with correct value', () => {
      const testList = Array.from({ length: 25 }, (_, i) => i + 1)
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      expect(wrapper.emitted('skip')).toBeTruthy()
      expect(wrapper.emitted('skip')?.[0]).toEqual([0])
    })

    it('emits page-change event when page is changed', async () => {
      const testList = Array.from({ length: 30 }, (_, i) => i + 1)
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      const nextButton = wrapper.find('.button-next')
      await nextButton.trigger('click')

      expect(wrapper.emitted('page-change')).toBeTruthy()
      expect(wrapper.emitted('page-change')?.[0]).toEqual([2])
    })

    it('emits updated filteredPage when page changes', async () => {
      const testList = Array.from({ length: 30 }, (_, i) => i + 1)
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      const nextButton = wrapper.find('.button-next')
      await nextButton.trigger('click')

      const filteredPageEvents = wrapper.emitted('filteredPage')
      expect(filteredPageEvents).toBeTruthy()
      expect(filteredPageEvents?.[1]).toEqual([[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]])
    })
  })

  describe('Navigation', () => {
    it('shows previous button when not on first page', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 10, // Page 2
        },
      })

      expect(wrapper.find('.button-previous').exists()).toBe(true)
      expect(wrapper.find('.button-next').exists()).toBe(true)
    })

    it('hides previous button on first page', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 30 }, (_, i) => i + 1),
          pageSize: 10,
        },
      })

      expect(wrapper.find('.button-previous').exists()).toBe(false)
    })

    it('hides next button on last page', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 30,
          pageSize: 10,
          skip: 20, // Page 3 (last page)
        },
      })

      expect(wrapper.find('.button-next').exists()).toBe(false)
    })

    it('navigates to next page correctly', async () => {
      const testList = Array.from({ length: 30 }, (_, i) => i + 1)
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      const nextButton = wrapper.find('.button-next')
      await nextButton.trigger('click')

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 2 af 3')
      expect(wrapper.find('.current-page').text()).toBe('2')
    })

    it('navigates to previous page correctly', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 30,
          pageSize: 10,
          skip: 10, // Start on page 2
        },
      })

      const prevButton = wrapper.find('.button-previous')
      await prevButton.trigger('click')

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 1 af 3')
      expect(wrapper.find('.current-page').text()).toBe('1')
    })

    it('navigates to first page correctly', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 50, // Start on page 6
          showFirstLast: true,
        },
      })

      const firstButton = wrapper.find('.button-first')
      await firstButton.trigger('click')

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 1 af 10')
      expect(wrapper.find('.current-page').text()).toBe('1')
    })

    it('navigates to last page correctly', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 0, // Start on page 1
          showFirstLast: true,
        },
      })

      const lastButton = wrapper.find('.button-last')
      await lastButton.trigger('click')

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 10 af 10')
      expect(wrapper.find('.current-page').text()).toBe('10')
    })

    it('navigates to specific page correctly', async () => {
      const testList = Array.from({ length: 50 }, (_, i) => i + 1)
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      // Find page 3 button
      const pageButtons = wrapper.findAll('.pagination-number .button-secondary')
      const page3Button = pageButtons.find((btn) => btn.text() === '3')

      if (page3Button) {
        await page3Button.trigger('click')
        expect(wrapper.find('.pagination-mobile').text()).toBe('Side 3 af 5')
        expect(wrapper.find('.current-page').text()).toBe('3')
      }
    })
  })

  describe('Pagination Logic', () => {
    it('generates correct page structure for small page count', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 50 }, (_, i) => i + 1),
          pageSize: 10,
          maxElements: 7,
        },
      })

      // Should show all pages (1, 2, 3, 4, 5)
      const pageNumbers = wrapper.findAll('.pagination-number')
      expect(pageNumbers).toHaveLength(5)
    })

    it('generates ellipsis for large page count', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          maxElements: 7,
          skip: 0,
        },
      })

      // Should show ellipsis for many pages
      const ellipsis = wrapper.findAll('.pagination-overflow')
      expect(ellipsis.length).toBeGreaterThan(0)
    })

    it('shows correct pages around current page', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 40, // Page 5
          maxElements: 7,
        },
      })

      // Should show pages around current page
      const currentPage = wrapper.find('.current-page')
      expect(currentPage.text()).toBe('5')
    })

    it('adjusts range when current page is near beginning', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 10, // Page 2
          maxElements: 7,
        },
      })

      // Should show more pages at the beginning
      const pageNumbers = wrapper.findAll(
        '.pagination-number .button-secondary, .pagination-number .current-page',
      )
      expect(pageNumbers[0].text()).toBe('1')
    })

    it('adjusts range when current page is near end', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: 80, // Page 9
          maxElements: 7,
        },
      })

      // Should show more pages at the end
      const currentPage = wrapper.find('.current-page')
      expect(currentPage.text()).toBe('9')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA label for navigation', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 30,
          pageSize: 10,
          skip: 10, // Page 2 of 3
        },
      })

      const nav = wrapper.find('nav.pagination')
      expect(nav.attributes('aria-label')).toBe('Paginering, side 2 af 3')
    })

    it('has correct ARIA labels for navigation buttons', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 50,
          pageSize: 10,
          skip: 20, // Page 3
          showFirstLast: true,
        },
      })

      expect(wrapper.find('.button-first').attributes('aria-label')).toBe('Gå til første side')
      expect(wrapper.find('.button-previous').attributes('aria-label')).toBe('Gå til forrige side')
      expect(wrapper.find('.button-next').attributes('aria-label')).toBe('Gå til næste side')
      expect(wrapper.find('.button-last').attributes('aria-label')).toBe('Gå til sidste side')
    })

    it('has correct ARIA labels for page numbers', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 30,
          pageSize: 10,
          skip: 10, // Page 2
        },
      })

      const currentPage = wrapper.find('.current-page')
      expect(currentPage.attributes('aria-label')).toBe('Aktuel side, side 2')
      expect(currentPage.attributes('aria-current')).toBe('page')

      const pageButton = wrapper.find('.button-secondary')
      expect(pageButton.attributes('aria-label')).toMatch(/Gå til side \d+/)
    })

    it('has screen reader only text for navigation buttons', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 50,
          pageSize: 10,
          skip: 0,
          showFirstLast: true,
        },
      })

      expect(wrapper.find('.button-last .sr-only').text()).toBe('Sidste side')
    })

    it('icons are properly hidden from screen readers', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 30,
          pageSize: 10,
          skip: 10,
        },
      })

      const icons = wrapper.findAll('.icon-svg')
      icons.forEach((icon) => {
        expect(icon.attributes('aria-hidden')).toBe('true')
        expect(icon.attributes('focusable')).toBe('false')
      })
    })

    it.skip('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsPaginering 
              :list="items" 
              :page-size="5"
              show-first-last
            />
          </main>
        `,
        components: { FdsPaginering },
        data() {
          return {
            items: Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })),
          }
        },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty list gracefully', () => {
      const wrapper = mount(FdsPaginering, {
        props: { list: [] },
      })

      expect(wrapper.find('nav.pagination').exists()).toBe(false)
    })

    it('handles single page scenario', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 5 }, (_, i) => i + 1),
          pageSize: 10,
        },
      })

      expect(wrapper.find('nav.pagination').exists()).toBe(false)
    })

    it('prevents navigation to invalid pages', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 30,
          pageSize: 10,
          skip: 0,
        },
      })

      const currentPage = wrapper.find('.current-page')
      await currentPage.trigger('click')

      // Should not emit page-change for current page
      const pageChangeEvents = wrapper.emitted('page-change')
      expect(pageChangeEvents).toBeFalsy()
    })

    it('prevents default action on all navigation clicks', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 30,
          pageSize: 10,
          skip: 10,
        },
      })

      const preventDefault = vi.fn()
      const mockEvent = { preventDefault }

      // Test previous button
      const prevButton = wrapper.find('.button-previous')
      await prevButton.trigger('click', { preventDefault })

      expect(preventDefault).toHaveBeenCalled()
    })

    it('handles rapid page changes correctly', async () => {
      const testList = Array.from({ length: 50 }, (_, i) => i + 1)
      const wrapper = mount(FdsPaginering, {
        props: { list: testList, pageSize: 10 },
      })

      const nextButton = wrapper.find('.button-next')

      // Rapidly click next button
      await nextButton.trigger('click')
      await nextButton.trigger('click')

      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 3 af 5')
    })

    it('resets to page 1 when list changes and current page exceeds total', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 50 }, (_, i) => i + 1),
          pageSize: 10,
        },
      })

      // Go to page 3
      const nextButton = wrapper.find('.button-next')
      await nextButton.trigger('click')
      await nextButton.trigger('click')

      expect(wrapper.find('.current-page').text()).toBe('3')

      // Change list to have only 15 items (2 pages)
      await wrapper.setProps({
        list: Array.from({ length: 15 }, (_, i) => i + 1),
      })

      // Should reset to page 1
      expect(wrapper.find('.current-page').text()).toBe('1')
      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 1 af 2')
    })

    it('handles zero total items', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 0,
          pageSize: 10,
        },
      })

      expect(wrapper.find('nav.pagination').exists()).toBe(false)
    })

    it('handles very large page numbers', () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 10000,
          pageSize: 10,
          skip: 5000, // Page 501
        },
      })

      expect(wrapper.find('.current-page').text()).toBe('501')
      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 501 af 1000')
    })
  })

  describe('Integration', () => {
    it('works with external pagination systems', async () => {
      let currentSkip = 0
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 100,
          pageSize: 10,
          skip: currentSkip,
        },
      })

      // Check initial skip event
      expect(wrapper.emitted('skip')?.[0]).toEqual([0])

      const nextButton = wrapper.find('.button-next')
      await nextButton.trigger('click')

      // Should emit skip event with new value
      expect(wrapper.emitted('skip')?.[1]).toEqual([10])
    })

    it('maintains state consistency across prop changes', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          list: Array.from({ length: 30 }, (_, i) => i + 1),
          pageSize: 10,
        },
      })

      // Go to page 2
      const nextButton = wrapper.find('.button-next')
      await nextButton.trigger('click')

      // Verify we're on page 2
      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 2 af 3')

      // Change page size - this should keep us on a valid page
      await wrapper.setProps({ pageSize: 15 })

      // With new page size, we have 2 pages total, and we should stay on page 2
      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 2 af 2')
    })

    it('works with dynamic content loading', async () => {
      const wrapper = mount(FdsPaginering, {
        props: {
          totalItems: 0,
          pageSize: 10,
          skip: 0,
        },
      })

      // Initially no pagination
      expect(wrapper.find('nav.pagination').exists()).toBe(false)

      // Load content
      await wrapper.setProps({ totalItems: 50 })

      // Should show pagination
      expect(wrapper.find('nav.pagination').exists()).toBe(true)
      expect(wrapper.find('.pagination-mobile').text()).toBe('Side 1 af 5')
    })
  })
})
