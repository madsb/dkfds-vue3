import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import FdsBreadcrumb from '../../components/navigation/fds-breadcrumb.vue'
import { testAccessibility } from '../../test-utils'

const mockItems = [
  { text: 'Forside', href: '/' },
  { text: 'Komponenter', href: '/komponenter' },
  { text: 'Brødkrumme' },
]

// Mock RouterLink component for Vue Router tests
const MockRouterLink = {
  name: 'RouterLink',
  props: ['to'],
  render() {
    return h('a', { href: this.to, class: 'breadcrumbs__link' }, this.$slots.default?.())
  },
}

describe('FdsBreadcrumb', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as nav element', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })
      expect(wrapper.element.tagName).toBe('NAV')
    })

    it('has breadcrumbs class by default', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })
      expect(wrapper.classes()).toContain('breadcrumbs')
    })

    it('renders ordered list with correct class', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })
      const ol = wrapper.find('ol')
      expect(ol.exists()).toBe(true)
      expect(ol.classes()).toContain('breadcrumbs__list')
    })

    it('renders correct number of list items', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })
      const listItems = wrapper.findAll('li')
      expect(listItems).toHaveLength(mockItems.length)
    })
  })

  describe('Props', () => {
    describe('items prop', () => {
      it('renders all items correctly', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: { items: mockItems },
        })
        const listItems = wrapper.findAll('li')

        expect(listItems[0].text()).toContain('Forside')
        expect(listItems[1].text()).toContain('Komponenter')
        expect(listItems[2].text()).toContain('Brødkrumme')
      })

      it('renders links for items with href', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: { items: mockItems },
        })

        const firstLink = wrapper.findAll('a')[0]
        const secondLink = wrapper.findAll('a')[1]

        expect(firstLink.attributes('href')).toBe('/')
        expect(firstLink.text()).toBe('Forside')
        expect(secondLink.attributes('href')).toBe('/komponenter')
        expect(secondLink.text()).toBe('Komponenter')
      })

      it('renders span for current page (no href)', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: { items: mockItems },
        })

        const spans = wrapper.findAll('span')
        const currentPageSpan = spans.find((span) => span.text() === 'Brødkrumme')
        expect(currentPageSpan?.exists()).toBe(true)
      })

      it('handles single item', () => {
        const singleItem = [{ text: 'Current Page' }]
        const wrapper = mount(FdsBreadcrumb, {
          props: { items: singleItem },
        })

        const listItems = wrapper.findAll('li')
        expect(listItems).toHaveLength(1)
        expect(wrapper.text()).toContain('Current Page')
      })

      it('handles empty items array', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: { items: [] },
        })

        const listItems = wrapper.findAll('li')
        expect(listItems).toHaveLength(0)
      })
    })

    describe('ariaLabel prop', () => {
      it('uses default Danish aria-label', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: { items: mockItems },
        })
        expect(wrapper.attributes('aria-label')).toBe('Brødkrumme')
      })

      it('uses custom aria-label when provided', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: {
            items: mockItems,
            ariaLabel: 'Navigation breadcrumb',
          },
        })
        expect(wrapper.attributes('aria-label')).toBe('Navigation breadcrumb')
      })
    })

    describe('container prop', () => {
      it('does not add container class by default', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: { items: mockItems },
        })
        expect(wrapper.classes()).not.toContain('container')
      })

      it('adds container class when container=true', () => {
        const wrapper = mount(FdsBreadcrumb, {
          props: {
            items: mockItems,
            container: true,
          },
        })
        expect(wrapper.classes()).toContain('container')
      })
    })
  })

  describe('Icons and Separators', () => {
    it('shows chevron-right icons as separators', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const icons = wrapper.findAll('svg use')
      expect(icons.length).toBeGreaterThan(0)

      // Check that icons have correct href attribute
      icons.forEach((icon) => {
        expect(icon.attributes('href')).toBe('#chevron-right')
      })
    })

    it('does not show separator icon for first item', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const firstListItem = wrapper.findAll('li')[0]
      const firstIcon = firstListItem.find('svg')
      expect(firstIcon.exists()).toBe(false)
    })

    it('shows separator icons for all items except first', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const listItems = wrapper.findAll('li')

      // First item should not have icon
      expect(listItems[0].find('svg').exists()).toBe(false)

      // Other items should have icons
      for (let i = 1; i < listItems.length; i++) {
        expect(listItems[i].find('svg').exists()).toBe(true)
      }
    })
  })

  describe('Accessibility', () => {
    it('has proper navigation landmark', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.attributes('aria-label')).toBeTruthy()
    })

    it('marks current page with aria-current', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const listItems = wrapper.findAll('li')
      const lastItem = listItems[listItems.length - 1]

      expect(lastItem.attributes('aria-current')).toBe('page')
    })

    it('does not mark non-current pages with aria-current', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const listItems = wrapper.findAll('li')

      // All items except last should not have aria-current
      for (let i = 0; i < listItems.length - 1; i++) {
        expect(listItems[i].attributes('aria-current')).toBeUndefined()
      }
    })

    it('has accessible links with correct classes', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const links = wrapper.findAll('a')
      links.forEach((link) => {
        expect(link.classes()).toContain('breadcrumbs__link')
      })
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsBreadcrumb :items="items" />
          </main>
        `,
        components: { FdsBreadcrumb },
        data() {
          return {
            items: mockItems,
          }
        },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Events', () => {
    it('emits item-click event when breadcrumb link is clicked', async () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const firstLink = wrapper.find('a')
      await firstLink.trigger('click')

      expect(wrapper.emitted('item-click')).toHaveLength(1)

      const emittedEvent = wrapper.emitted('item-click')![0]
      expect(emittedEvent[1]).toEqual(mockItems[0]) // item
      expect(emittedEvent[2]).toBe(0) // index
    })

    it('does not emit event when current page is clicked', async () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      // Current page is rendered as span, not link
      const spans = wrapper.findAll('span')
      const currentPageSpan = spans.find((span) => span.text() === 'Brødkrumme')

      if (currentPageSpan) {
        await currentPageSpan.trigger('click')
        expect(wrapper.emitted('item-click')).toBeFalsy()
      }
    })

    it('emits correct event data for different items', async () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const links = wrapper.findAll('a')

      // Click second link
      await links[1].trigger('click')

      const emittedEvents = wrapper.emitted('item-click')!
      expect(emittedEvents).toHaveLength(1)

      const [_event, item, index] = emittedEvents[0]
      expect(item).toEqual(mockItems[1])
      expect(index).toBe(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles items without href property', () => {
      const itemsWithoutHref = [{ text: 'Page 1' }, { text: 'Page 2' }]

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: itemsWithoutHref },
      })

      const links = wrapper.findAll('a')
      expect(links).toHaveLength(0)

      const spans = wrapper.findAll('span')
      expect(spans.length).toBeGreaterThan(0)
    })

    it('handles items with custom data property', () => {
      const itemsWithData = [
        { text: 'Home', href: '/', data: { id: 1 } },
        { text: 'Current', data: { id: 2 } },
      ]

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: itemsWithData },
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.findAll('li')).toHaveLength(2)
    })

    it('maintains proper structure with dynamic items', async () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const newItems = [{ text: 'New Home', href: '/new' }, { text: 'New Current' }]

      await wrapper.setProps({ items: newItems })

      const listItems = wrapper.findAll('li')
      expect(listItems).toHaveLength(2)
      expect(wrapper.text()).toContain('New Home')
      expect(wrapper.text()).toContain('New Current')

      // Last item should still have aria-current
      const lastItem = listItems[listItems.length - 1]
      expect(lastItem.attributes('aria-current')).toBe('page')
    })
  })

  describe('Integration', () => {
    it('works with different types of navigation structures', () => {
      const deepNavigation = [
        { text: 'Home', href: '/' },
        { text: 'Category', href: '/category' },
        { text: 'Subcategory', href: '/category/sub' },
        { text: 'Product', href: '/category/sub/product' },
        { text: 'Details' },
      ]

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: deepNavigation },
      })

      const listItems = wrapper.findAll('li')
      expect(listItems).toHaveLength(5)

      const links = wrapper.findAll('a')
      expect(links).toHaveLength(4) // All except current page

      // Check separators
      const icons = wrapper.findAll('svg')
      expect(icons).toHaveLength(4) // One for each item except first
    })

    it('follows DKFDS v11 structure exactly', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: {
          items: mockItems,
          container: true,
          ariaLabel: 'Brødkrumme',
        },
      })

      // Check nav structure
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.classes()).toContain('breadcrumbs')
      expect(wrapper.classes()).toContain('container')
      expect(wrapper.attributes('aria-label')).toBe('Brødkrumme')

      // Check ol structure
      const ol = wrapper.find('ol')
      expect(ol.classes()).toContain('breadcrumbs__list')

      // Check li structure
      const listItems = wrapper.findAll('li')
      listItems.forEach((li) => {
        expect(li.classes()).toContain('breadcrumbs__list-item')
      })

      // Check links have correct classes
      const links = wrapper.findAll('a')
      links.forEach((link) => {
        expect(link.classes()).toContain('breadcrumbs__link')
      })

      // Check SVG icons are properly configured
      const svgs = wrapper.findAll('svg')
      svgs.forEach((svg) => {
        expect(svg.classes()).toContain('icon-svg')
        expect(svg.attributes('focusable')).toBe('false')
        expect(svg.attributes('aria-hidden')).toBe('true')
      })
    })
  })

  describe('Vue Router Integration', () => {
    it('uses standard anchor tags when Vue Router is not available', () => {
      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
      })

      const links = wrapper.findAll('a')
      expect(links).toHaveLength(2) // All except current page
      expect(links[0].attributes('href')).toBe('/')
      expect(links[1].attributes('href')).toBe('/komponenter')
    })

    it('detects and uses Vue Router when available', () => {
      // Mock Vue Router injection
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })

      // Should still render links properly
      const links = wrapper.findAll('a')
      expect(links).toHaveLength(2)
    })

    it('respects useNativeLinks prop even when Vue Router is available', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsBreadcrumb, {
        props: {
          items: mockItems,
          useNativeLinks: true,
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })

      // Should use standard anchor tags despite router being available
      const links = wrapper.findAll('a')
      links.forEach((link) => {
        expect(link.attributes('href')).toBeDefined()
      })
    })

    it('handles items with to prop for Vue Router', () => {
      const routerItems = [
        { text: 'Home', to: '/', href: '/' },
        { text: 'About', to: { name: 'about' }, href: '/about' },
        { text: 'Current' },
      ]

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: routerItems },
      })

      const links = wrapper.findAll('a')
      expect(links).toHaveLength(2)

      // Should fall back to href when no router
      expect(links[0].attributes('href')).toBe('/')
      expect(links[1].attributes('href')).toBe('/about')
    })

    it('handles external links correctly', () => {
      const itemsWithExternal = [
        { text: 'Internal', href: '/' },
        { text: 'External', href: 'https://example.com', external: true },
        { text: 'Current' },
      ]

      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: itemsWithExternal },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })

      const links = wrapper.findAll('a')
      expect(links).toHaveLength(2)

      // External link should always use standard anchor
      expect(links[1].attributes('href')).toBe('https://example.com')
    })

    it('emits events correctly with Vue Router integration', async () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })

      const firstLink = wrapper.find('a')
      await firstLink.trigger('click')

      expect(wrapper.emitted('item-click')).toHaveLength(1)
      const emittedEvent = wrapper.emitted('item-click')![0]
      expect(emittedEvent[1]).toEqual(mockItems[0])
      expect(emittedEvent[2]).toBe(0)
    })

    it('handles missing router gracefully', () => {
      // Test with partial router injection (missing $route)
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
        global: {
          provide: {
            $router: mockRouter,
            // Missing $route
          },
        },
      })

      // Should fall back to standard anchors
      const links = wrapper.findAll('a')
      expect(links).toHaveLength(2)
      expect(links[0].attributes('href')).toBe('/')
    })

    it('handles router without RouterLink component', () => {
      // Mock router without RouterLink
      const mockRouter = {}
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsBreadcrumb, {
        props: { items: mockItems },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })

      // Should fall back to standard anchors
      const components = wrapper.findAll('a')
      expect(components).toHaveLength(2)
      // When falling back to anchor tags, href should be set
      expect(components[0].element.getAttribute('href')).toBe('/')
    })
  })
})
