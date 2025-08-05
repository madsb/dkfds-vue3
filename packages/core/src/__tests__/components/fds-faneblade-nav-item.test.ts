import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsFanebladeNavItem from '../../components/fds-faneblade-nav-item.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsFanebladeNavItem', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as li element', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      expect(wrapper.element.tagName).toBe('LI')
    })

    it('renders anchor element with correct class', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      const anchor = wrapper.find('a')
      expect(anchor.exists()).toBe(true)
      expect(anchor.classes()).toContain('tab-button')
    })

    it('renders span wrapper for label', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', label: 'Test Link' }
      })
      const span = wrapper.find('span')
      expect(span.exists()).toBe(true)
      expect(span.text()).toBe('Test Link')
    })
  })

  describe('Props', () => {
    it('sets href attribute from prop', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#section1' }
      })
      expect(wrapper.find('a').attributes('href')).toBe('#section1')
    })

    it('renders label text from prop', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', label: 'Navigation Label' }
      })
      expect(wrapper.text()).toBe('Navigation Label')
    })

    it('sets aria-current when active', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', active: true }
      })
      expect(wrapper.find('a').attributes('aria-current')).toBe('true')
    })

    it('has no aria-current when not active', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', active: false }
      })
      expect(wrapper.find('a').attributes('aria-current')).toBeUndefined()
    })

    it('renders icon when icon prop is provided', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', icon: 'document' }
      })
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
      expect(svg.classes()).toContain('icon-svg')
    })

    it('renders icon with correct use href', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', icon: 'document' }
      })
      const use = wrapper.find('use')
      expect(use.attributes('href')).toBe('#document')
    })

    it('renders icon with proper accessibility attributes', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', icon: 'document' }
      })
      const svg = wrapper.find('svg')
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })

    it('does not render icon when prop not provided', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      expect(wrapper.find('svg').exists()).toBe(false)
    })
  })

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      
      await wrapper.find('a').trigger('click')
      
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(MouseEvent)
    })

    it('can prevent default behavior', async () => {
      const handleClick = vi.fn((event: MouseEvent) => {
        event.preventDefault()
      })
      
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' },
        attrs: {
          onClick: handleClick
        }
      })
      
      await wrapper.find('a').trigger('click')
      
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('Slots', () => {
    it('renders slot content instead of label prop', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', label: 'Prop Label' },
        slots: {
          default: 'Slot Content'
        }
      })
      expect(wrapper.text()).toBe('Slot Content')
      expect(wrapper.text()).not.toBe('Prop Label')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' },
        slots: {
          default: '<strong>Bold</strong> navigation'
        }
      })
      expect(wrapper.find('strong').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('Bold')
    })

    it('falls back to label prop when no slot provided', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', label: 'Fallback Label' }
      })
      expect(wrapper.text()).toBe('Fallback Label')
    })

    it('renders empty when no label or slot', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      expect(wrapper.find('span').text()).toBe('')
    })
  })

  describe('Accessibility', () => {
    it('has proper structure for navigation', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      
      expect(wrapper.element.tagName).toBe('LI')
      expect(wrapper.find('a').exists()).toBe(true)
    })

    it('is keyboard accessible as a link', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test' }
      })
      
      // Links are natively keyboard accessible
      expect(wrapper.find('a').element.tagName).toBe('A')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <nav class="tab-container" aria-label="Main navigation">
              <ul class="tab-list">
                <FdsFanebladeNavItem href="#home" label="Home" :active="true" />
                <FdsFanebladeNavItem href="#about" label="About" :active="false" />
                <FdsFanebladeNavItem href="#contact" label="Contact" :active="false" />
              </ul>
            </nav>
          </main>
        `,
        components: { FdsFanebladeNavItem }
      }
      
      await testAccessibility(TestWrapper)
    })

    it('maintains proper aria-current state', async () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', active: false }
      })
      
      expect(wrapper.find('a').attributes('aria-current')).toBeUndefined()
      
      await wrapper.setProps({ active: true })
      expect(wrapper.find('a').attributes('aria-current')).toBe('true')
      
      await wrapper.setProps({ active: false })
      expect(wrapper.find('a').attributes('aria-current')).toBeUndefined()
    })
  })

  describe('Edge Cases', () => {
    it('handles external URLs', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: 'https://example.com' }
      })
      
      expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
    })

    it('handles special characters in href', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#section-with-special-chars_123' }
      })
      
      expect(wrapper.find('a').attributes('href')).toBe('#section-with-special-chars_123')
    })

    it('handles icon and label together', () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { 
          href: '#test',
          icon: 'document',
          label: 'Documents'
        }
      })
      
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('span').text()).toBe('Documents')
    })

    it('handles rapid prop changes', async () => {
      const wrapper = mount(FdsFanebladeNavItem, {
        props: { href: '#test', active: false }
      })
      
      // Rapid changes
      await wrapper.setProps({ active: true })
      await wrapper.setProps({ active: false })
      await wrapper.setProps({ active: true })
      
      expect(wrapper.find('a').attributes('aria-current')).toBe('true')
    })
  })

  describe('Integration', () => {
    it('works in a navigation list structure', () => {
      const NavListWrapper = {
        template: `
          <nav>
            <ul>
              <FdsFanebladeNavItem 
                v-for="item in navItems" 
                :key="item.href"
                :href="item.href"
                :label="item.label"
                :active="item.href === activeHref"
                @click="handleClick($event, item.href)"
              />
            </ul>
          </nav>
        `,
        components: { FdsFanebladeNavItem },
        data() {
          return {
            activeHref: '#home',
            navItems: [
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' }
            ]
          }
        },
        methods: {
          handleClick(event: MouseEvent, href: string) {
            event.preventDefault()
            this.activeHref = href
          }
        }
      }
      
      const wrapper = mount(NavListWrapper)
      const items = wrapper.findAll('li')
      
      expect(items).toHaveLength(3)
      expect(items[0].find('a').attributes('aria-current')).toBe('true')
      expect(items[1].find('a').attributes('aria-current')).toBeUndefined()
      expect(items[2].find('a').attributes('aria-current')).toBeUndefined()
    })

    it('handles navigation with preventDefault', async () => {
      const NavigationComponent = {
        template: `
          <div>
            <FdsFanebladeNavItem 
              :href="href"
              label="Navigate"
              @click="handleClick"
            />
            <p>Current: {{ currentSection }}</p>
          </div>
        `,
        components: { FdsFanebladeNavItem },
        data() {
          return { 
            href: '#section1',
            currentSection: 'none'
          }
        },
        methods: {
          handleClick(event: MouseEvent) {
            event.preventDefault()
            this.currentSection = 'section1'
          }
        }
      }
      
      const wrapper = mount(NavigationComponent)
      const link = wrapper.find('a')
      
      expect(wrapper.find('p').text()).toBe('Current: none')
      
      await link.trigger('click')
      
      expect(wrapper.find('p').text()).toBe('Current: section1')
    })

    it('works with icon navigation', () => {
      const IconNav = {
        template: `
          <ul>
            <FdsFanebladeNavItem href="#images" icon="file-image" label="Images" />
            <FdsFanebladeNavItem href="#docs" icon="document" label="Documents" />
            <FdsFanebladeNavItem href="#videos" icon="videocam" label="Videos" />
          </ul>
        `,
        components: { FdsFanebladeNavItem }
      }
      
      const wrapper = mount(IconNav)
      const icons = wrapper.findAll('svg')
      
      expect(icons).toHaveLength(3)
      expect(wrapper.findAll('use')[0].attributes('href')).toBe('#file-image')
      expect(wrapper.findAll('use')[1].attributes('href')).toBe('#document')
      expect(wrapper.findAll('use')[2].attributes('href')).toBe('#videocam')
    })
  })
})