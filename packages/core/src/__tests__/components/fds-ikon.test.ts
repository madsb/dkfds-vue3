import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsIkon from '../../components/fds-ikon.vue'

describe('FdsIkon', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(FdsIkon)
      const svg = wrapper.find('svg')

      expect(svg.exists()).toBe(true)
      expect(svg.classes()).toContain('icon-svg')
      expect(svg.attributes('focusable')).toBe('false')
      // Check if the HTML contains aria-hidden
      expect(wrapper.html()).toContain('aria-hidden')

      const use = svg.find('use')
      expect(use.attributes('href')).toBe('#home')
    })

    it('renders with custom icon', () => {
      const wrapper = mount(FdsIkon, {
        props: {
          icon: 'search',
        },
      })

      const use = wrapper.find('use')
      expect(use.attributes('href')).toBe('#search')
    })
  })

  describe('inline variant', () => {
    it('renders without inline class by default', () => {
      const wrapper = mount(FdsIkon)

      const svg = wrapper.find('svg')
      expect(svg.classes()).toContain('icon-svg')
      expect(svg.classes()).not.toContain('inline-svg')
    })

    it('renders with inline class when inline prop is true', () => {
      const wrapper = mount(FdsIkon, {
        props: {
          inline: true,
        },
      })

      const svg = wrapper.find('svg')
      expect(svg.classes()).toContain('icon-svg')
      expect(svg.classes()).toContain('inline-svg')
    })
  })

  describe('accessibility', () => {
    it('is decorative by default', () => {
      const wrapper = mount(FdsIkon)
      const svg = wrapper.find('svg')

      // Check HTML contains aria-hidden
      expect(wrapper.html()).toContain('aria-hidden')
      expect(svg.attributes('aria-label')).toBeUndefined()
      expect(svg.attributes('role')).toBeUndefined()
    })

    it('can be non-decorative with aria-label', () => {
      const wrapper = mount(FdsIkon, {
        props: {
          decorative: false,
          ariaLabel: 'Søg ikon',
        },
      })

      const svg = wrapper.find('svg')
      expect(wrapper.html()).not.toContain('aria-hidden')
      expect(svg.attributes('aria-label')).toBe('Søg ikon')
      expect(svg.attributes('role')).toBe('img')
    })

    it('remains without aria-hidden when decorative is false without aria-label', () => {
      const wrapper = mount(FdsIkon, {
        props: {
          decorative: false,
        },
      })

      const svg = wrapper.find('svg')
      expect(wrapper.html()).not.toContain('aria-hidden')
      expect(svg.attributes('role')).toBeUndefined()
    })

    it('always has focusable="false" for IE compatibility', () => {
      const wrapper = mount(FdsIkon)
      const svg = wrapper.find('svg')

      expect(svg.attributes('focusable')).toBe('false')
    })
  })

  describe('prop validation', () => {
    it('accepts all valid props', () => {
      const wrapper = mount(FdsIkon, {
        props: {
          icon: 'visibility',
          inline: true,
          ariaLabel: 'Vis indhold',
          decorative: false,
        },
      })

      expect(wrapper.find('use').attributes('href')).toBe('#visibility')
      expect(wrapper.find('svg').classes()).toContain('inline-svg')
      expect(wrapper.find('svg').attributes('aria-label')).toBe('Vis indhold')
    })
  })

  describe('HTML structure', () => {
    it('follows DKFDS v11 structure', () => {
      const wrapper = mount(FdsIkon, {
        props: {
          icon: 'print',
        },
      })

      const html = wrapper.html()
      expect(html).toContain('<svg')
      expect(html).toContain('class="icon-svg"')
      expect(html).toContain('focusable="false"')
      expect(html).toContain('<use')
      expect(html).toContain('href="#print"')
    })
  })
})
