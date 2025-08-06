import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsFanebladeNav from '../../components/fds-faneblade-nav.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsFanebladeNav', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsFanebladeNav)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as nav element', () => {
      const wrapper = mount(FdsFanebladeNav)
      expect(wrapper.element.tagName).toBe('NAV')
    })

    it('applies correct CSS class', () => {
      const wrapper = mount(FdsFanebladeNav)
      expect(wrapper.classes()).toContain('tab-container')
    })

    it('renders ul element with tab-list class', () => {
      const wrapper = mount(FdsFanebladeNav)
      const ul = wrapper.find('ul')
      expect(ul.exists()).toBe(true)
      expect(ul.classes()).toContain('tab-list')
    })

    it('renders with correct DOM structure', () => {
      const wrapper = mount(FdsFanebladeNav)
      expect(wrapper.find('nav.tab-container').exists()).toBe(true)
      expect(wrapper.find('nav > ul.tab-list').exists()).toBe(true)
    })
  })

  describe('Props', () => {
    it('sets aria-label when provided', () => {
      const wrapper = mount(FdsFanebladeNav, {
        props: { ariaLabel: 'Main navigation' },
      })
      expect(wrapper.attributes('aria-label')).toBe('Main navigation')
    })

    it('has no aria-label when not provided', () => {
      const wrapper = mount(FdsFanebladeNav)
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsFanebladeNav, {
        slots: {
          default: '<li>Navigation item</li>',
        },
      })

      expect(wrapper.find('li').exists()).toBe(true)
      expect(wrapper.find('li').text()).toBe('Navigation item')
    })

    it('renders multiple slot children', () => {
      const wrapper = mount(FdsFanebladeNav, {
        slots: {
          default: `
            <li class="nav-1">Nav 1</li>
            <li class="nav-2">Nav 2</li>
            <li class="nav-3">Nav 3</li>
          `,
        },
      })

      expect(wrapper.findAll('li')).toHaveLength(3)
      expect(wrapper.find('.nav-1').text()).toBe('Nav 1')
      expect(wrapper.find('.nav-2').text()).toBe('Nav 2')
      expect(wrapper.find('.nav-3').text()).toBe('Nav 3')
    })

    it('handles empty slot', () => {
      const wrapper = mount(FdsFanebladeNav)
      expect(wrapper.find('ul').element.children).toHaveLength(0)
    })
  })

  describe('Accessibility', () => {
    it('has semantic navigation structure', () => {
      const wrapper = mount(FdsFanebladeNav)
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.find('ul').exists()).toBe(true)
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsFanebladeNav aria-label="Site navigation">
              <li>
                <a href="#home" class="tab-button" aria-current="true">
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" class="tab-button">
                  <span>About</span>
                </a>
              </li>
              <li>
                <a href="#contact" class="tab-button">
                  <span>Contact</span>
                </a>
              </li>
            </FdsFanebladeNav>
          </main>
        `,
        components: { FdsFanebladeNav },
      }

      await testAccessibility(TestWrapper)
    })

    it('works with aria-label for screen readers', () => {
      const wrapper = mount(FdsFanebladeNav, {
        props: { ariaLabel: 'Section navigation' },
      })

      expect(wrapper.attributes('aria-label')).toBe('Section navigation')
    })
  })

  describe('Edge Cases', () => {
    it('handles text nodes in slot', () => {
      const wrapper = mount(FdsFanebladeNav, {
        slots: {
          default: 'Just text content',
        },
      })

      expect(wrapper.find('ul').text()).toBe('Just text content')
    })

    it('preserves custom attributes on root element', () => {
      const wrapper = mount(FdsFanebladeNav, {
        attrs: {
          'data-testid': 'my-navigation',
          id: 'main-nav',
        },
      })

      expect(wrapper.attributes('data-testid')).toBe('my-navigation')
      expect(wrapper.attributes('id')).toBe('main-nav')
    })
  })

  describe('Integration', () => {
    it('works as navigation container', () => {
      const NavigationWrapper = {
        template: `
          <FdsFanebladeNav aria-label="Page sections">
            <li v-for="item in navItems" :key="item.id">
              <a :href="item.href" class="tab-button" :aria-current="item.active ? 'true' : undefined">
                <span>{{ item.label }}</span>
              </a>
            </li>
          </FdsFanebladeNav>
        `,
        components: { FdsFanebladeNav },
        data() {
          return {
            navItems: [
              { id: 1, href: '#section1', label: 'Section 1', active: true },
              { id: 2, href: '#section2', label: 'Section 2', active: false },
              { id: 3, href: '#section3', label: 'Section 3', active: false },
            ],
          }
        },
      }

      const wrapper = mount(NavigationWrapper)
      const links = wrapper.findAll('a')

      expect(links).toHaveLength(3)
      expect(links[0].attributes('aria-current')).toBe('true')
      expect(links[1].attributes('aria-current')).toBeUndefined()
      expect(links[2].attributes('aria-current')).toBeUndefined()
    })

    it('maintains reactivity', async () => {
      const ReactiveNav = {
        template: `
          <FdsFanebladeNav>
            <li v-for="section in sections" :key="section">
              <a href="#">{{ section }}</a>
            </li>
          </FdsFanebladeNav>
        `,
        components: { FdsFanebladeNav },
        data() {
          return {
            sections: ['Home', 'About'],
          }
        },
      }

      const wrapper = mount(ReactiveNav)
      expect(wrapper.findAll('li')).toHaveLength(2)

      // Add a section
      wrapper.vm.sections.push('Contact')
      await wrapper.vm.$nextTick()

      expect(wrapper.findAll('li')).toHaveLength(3)
    })

    it('works with conditional rendering', async () => {
      const ConditionalNav = {
        template: `
          <FdsFanebladeNav v-if="showNav" aria-label="Navigation">
            <li><a href="#home">Home</a></li>
          </FdsFanebladeNav>
        `,
        components: { FdsFanebladeNav },
        data() {
          return { showNav: true }
        },
      }

      const wrapper = mount(ConditionalNav)
      expect(wrapper.find('nav').exists()).toBe(true)

      // Hide navigation
      wrapper.vm.showNav = false
      await wrapper.vm.$nextTick()

      expect(wrapper.find('nav').exists()).toBe(false)
    })
  })
})
