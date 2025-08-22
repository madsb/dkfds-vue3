import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsTilbageLink from '../../components/navigation/fds-tilbage-link.vue'
import { testAccessibility } from '../../test-utils'

describe('FdsTilbageLink', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsTilbageLink)
      expect(wrapper.find('.back-link').exists()).toBe(true)
    })

    it('renders within a div wrapper', () => {
      const wrapper = mount(FdsTilbageLink)
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.find('div > a.back-link').exists()).toBe(true)
    })

    it('renders the chevron-left icon', () => {
      const wrapper = mount(FdsTilbageLink)
      const svg = wrapper.find('svg.icon-svg')
      expect(svg.exists()).toBe(true)
      expect(svg.find('use').attributes('href')).toBe('#chevron-left')
    })

    it('renders default text "Tilbage"', () => {
      const wrapper = mount(FdsTilbageLink)
      expect(wrapper.text()).toContain('Tilbage')
    })
  })

  describe('Props', () => {
    it('uses default href when not provided', () => {
      const wrapper = mount(FdsTilbageLink)
      expect(wrapper.find('a').attributes('href')).toBe('javascript:void(0);')
    })

    it('accepts custom href prop', () => {
      const customHref = '/previous-page'
      const wrapper = mount(FdsTilbageLink, {
        props: { href: customHref },
      })
      expect(wrapper.find('a').attributes('href')).toBe(customHref)
    })

    it('handles empty string href', () => {
      const wrapper = mount(FdsTilbageLink, {
        props: { href: '' },
      })
      expect(wrapper.find('a').attributes('href')).toBe('')
    })
  })

  describe('Slots', () => {
    it('renders custom slot content', () => {
      const wrapper = mount(FdsTilbageLink, {
        slots: {
          default: 'Custom tilbage tekst',
        },
      })
      expect(wrapper.text()).toContain('Custom tilbage tekst')
      expect(wrapper.text()).not.toContain('Tilbage')
    })

    it('renders HTML in slot', () => {
      const wrapper = mount(FdsTilbageLink, {
        slots: {
          default: '<span class="custom">Gå tilbage</span>',
        },
      })
      expect(wrapper.find('.custom').exists()).toBe(true)
      expect(wrapper.find('.custom').text()).toBe('Gå tilbage')
    })
  })

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(FdsTilbageLink)
      await wrapper.find('a').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('prevents default navigation with default href', async () => {
      const wrapper = mount(FdsTilbageLink)
      const event = new MouseEvent('click')
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      const link = wrapper.find('a').element as HTMLAnchorElement
      link.dispatchEvent(event)

      // javascript:void(0) doesn't actually navigate, so preventDefault isn't called
      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('allows navigation with custom href', async () => {
      const wrapper = mount(FdsTilbageLink, {
        props: { href: '/test-page' },
      })

      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('/test-page')
    })
  })

  describe('Accessibility', () => {
    it('has accessible icon attributes', () => {
      const wrapper = mount(FdsTilbageLink)
      const svg = wrapper.find('svg')

      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })

    it('icon does not interfere with keyboard navigation', () => {
      const wrapper = mount(FdsTilbageLink)
      const svg = wrapper.find('svg')

      // SVG should not be focusable
      expect(svg.attributes('focusable')).toBe('false')

      // Link itself should be focusable (no tabindex=-1)
      const link = wrapper.find('a')
      expect(link.attributes('tabindex')).toBeUndefined()
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsTilbageLink />
          </main>
        `,
        components: { FdsTilbageLink },
      }

      await testAccessibility(TestWrapper)
    })

    it('passes accessibility tests with custom content', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsTilbageLink href="/forrige">
              Gå tilbage til forrige side
            </FdsTilbageLink>
          </main>
        `,
        components: { FdsTilbageLink },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined href gracefully', () => {
      const wrapper = mount(FdsTilbageLink, {
        props: { href: undefined },
      })
      expect(wrapper.find('a').attributes('href')).toBe('javascript:void(0);')
    })

    it('renders without any props or slots', () => {
      const wrapper = mount(FdsTilbageLink)
      expect(wrapper.find('.back-link').exists()).toBe(true)
      expect(wrapper.text()).toContain('Tilbage')
      expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('maintains structure with empty slot', () => {
      const wrapper = mount(FdsTilbageLink, {
        slots: { default: '' },
      })
      expect(wrapper.find('.back-link').exists()).toBe(true)
      expect(wrapper.find('svg').exists()).toBe(true)
    })
  })

  describe('Integration', () => {
    it('works as expected in a navigation context', async () => {
      const handleBack = vi.fn()

      const TestWrapper = {
        template: `
          <nav>
            <FdsTilbageLink @click="handleBack">
              Tilbage til oversigt
            </FdsTilbageLink>
          </nav>
        `,
        components: { FdsTilbageLink },
        methods: { handleBack },
      }

      const wrapper = mount(TestWrapper)
      await wrapper.find('.back-link').trigger('click')

      expect(handleBack).toHaveBeenCalledTimes(1)
    })

    it('can be used with router navigation', () => {
      const wrapper = mount(FdsTilbageLink, {
        props: { href: '/dashboard' },
      })

      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('/dashboard')
      expect(link.classes()).toContain('back-link')
    })

    it('supports multiple instances on same page', () => {
      const TestWrapper = {
        template: `
          <div>
            <FdsTilbageLink>Tilbage til start</FdsTilbageLink>
            <FdsTilbageLink href="/overview">Tilbage til oversigt</FdsTilbageLink>
          </div>
        `,
        components: { FdsTilbageLink },
      }

      const wrapper = mount(TestWrapper)
      const links = wrapper.findAll('.back-link')

      expect(links).toHaveLength(2)
      expect(links[0].text()).toContain('Tilbage til start')
      expect(links[1].text()).toContain('Tilbage til oversigt')
      expect(links[1].attributes('href')).toBe('/overview')
    })
  })
})
