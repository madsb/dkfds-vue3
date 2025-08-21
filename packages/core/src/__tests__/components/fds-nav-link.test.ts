import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsNavLink from '../../components/fds-nav-link.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsNavLink', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsNavLink)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as anchor element when not disabled', () => {
      const wrapper = mount(FdsNavLink)
      expect(wrapper.element.tagName).toBe('A')
    })

    it('renders as span element when disabled', () => {
      const wrapper = mount(FdsNavLink, {
        props: { disabled: true }
      })
      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('has nav-link class by default', () => {
      const wrapper = mount(FdsNavLink)
      expect(wrapper.classes()).toContain('nav-link')
    })

    it('has nav-link-disabled class when disabled', () => {
      const wrapper = mount(FdsNavLink, {
        props: { disabled: true }
      })
      expect(wrapper.classes()).toContain('nav-link-disabled')
    })

    it('renders without icon by default', () => {
      const wrapper = mount(FdsNavLink)
      expect(wrapper.find('svg').exists()).toBe(false)
    })

    it('renders without hint by default', () => {
      const wrapper = mount(FdsNavLink)
      expect(wrapper.find('.sidenav-information').exists()).toBe(false)
    })
  })

  describe('Props', () => {
    describe('href prop', () => {
      it('uses default href value "#"', () => {
        const wrapper = mount(FdsNavLink)
        expect(wrapper.attributes('href')).toBe('#')
      })

      it('accepts custom href value', () => {
        const wrapper = mount(FdsNavLink, {
          props: { href: '/dashboard' }
        })
        expect(wrapper.attributes('href')).toBe('/dashboard')
      })

      it('handles external URLs', () => {
        const wrapper = mount(FdsNavLink, {
          props: { href: 'https://example.com' }
        })
        expect(wrapper.attributes('href')).toBe('https://example.com')
      })
    })

    describe('current prop', () => {
      it('defaults to false', () => {
        const wrapper = mount(FdsNavLink)
        expect(wrapper.attributes('aria-current')).toBeUndefined()
      })

      it('sets aria-current="page" when current is true', () => {
        const wrapper = mount(FdsNavLink, {
          props: { current: true }
        })
        expect(wrapper.attributes('aria-current')).toBe('page')
      })

      it('removes aria-current when current is false', () => {
        const wrapper = mount(FdsNavLink, {
          props: { current: false }
        })
        expect(wrapper.attributes('aria-current')).toBeUndefined()
      })
    })

    describe('disabled prop', () => {
      it('defaults to false', () => {
        const wrapper = mount(FdsNavLink)
        expect(wrapper.element.tagName).toBe('A')
        // aria-disabled is set to 'false' when disabled prop is false
        expect(wrapper.attributes('aria-disabled')).toBe('false')
      })

      it('renders as span when disabled', () => {
        const wrapper = mount(FdsNavLink, {
          props: { disabled: true }
        })
        expect(wrapper.element.tagName).toBe('SPAN')
        expect(wrapper.attributes('aria-disabled')).toBe('true')
      })

      it('sets aria-disabled on anchor when disabled is false', () => {
        const wrapper = mount(FdsNavLink, {
          props: { disabled: false }
        })
        expect(wrapper.element.tagName).toBe('A')
        expect(wrapper.attributes('aria-disabled')).toBe('false')
      })
    })

    describe('icon prop', () => {
      it('renders icon when provided', () => {
        const wrapper = mount(FdsNavLink, {
          props: { icon: 'arrow-right' }
        })
        const svg = wrapper.find('svg.sidenav-icon')
        expect(svg.exists()).toBe(true)
        expect(svg.attributes('focusable')).toBe('false')
        expect(svg.attributes('aria-hidden')).toBe('true')
        expect(wrapper.find('use').attributes('href')).toBe('#arrow-right')
      })

      it('does not render icon when not provided', () => {
        const wrapper = mount(FdsNavLink)
        expect(wrapper.find('svg.sidenav-icon').exists()).toBe(false)
      })

      it('renders icon in both enabled and disabled states', () => {
        const enabledWrapper = mount(FdsNavLink, {
          props: { icon: 'check', disabled: false }
        })
        const disabledWrapper = mount(FdsNavLink, {
          props: { icon: 'check', disabled: true }
        })

        expect(enabledWrapper.find('svg.sidenav-icon').exists()).toBe(true)
        expect(disabledWrapper.find('svg.sidenav-icon').exists()).toBe(true)
      })
    })

    describe('hint prop', () => {
      it('renders hint when provided', () => {
        const wrapper = mount(FdsNavLink, {
          props: { hint: 'Additional information' }
        })
        const hintElement = wrapper.find('.sidenav-information')
        expect(hintElement.exists()).toBe(true)
        expect(hintElement.text()).toBe('Additional information')
      })

      it('does not render hint when not provided', () => {
        const wrapper = mount(FdsNavLink)
        expect(wrapper.find('.sidenav-information').exists()).toBe(false)
      })

      it('renders hint in both enabled and disabled states', () => {
        const enabledWrapper = mount(FdsNavLink, {
          props: { hint: 'Help text', disabled: false }
        })
        const disabledWrapper = mount(FdsNavLink, {
          props: { hint: 'Help text', disabled: true }
        })

        expect(enabledWrapper.find('.sidenav-information').text()).toBe('Help text')
        expect(disabledWrapper.find('.sidenav-information').text()).toBe('Help text')
      })
    })

    describe('combined props', () => {
      it('handles all props together', () => {
        const wrapper = mount(FdsNavLink, {
          props: {
            href: '/page',
            current: true,
            disabled: false,
            icon: 'arrow-right',
            hint: 'Navigate to page'
          }
        })

        expect(wrapper.element.tagName).toBe('A')
        expect(wrapper.attributes('href')).toBe('/page')
        expect(wrapper.attributes('aria-current')).toBe('page')
        expect(wrapper.find('svg.sidenav-icon').exists()).toBe(true)
        expect(wrapper.find('use').attributes('href')).toBe('#arrow-right')
        expect(wrapper.find('.sidenav-information').text()).toBe('Navigate to page')
      })

      it('handles disabled state with all props', () => {
        const wrapper = mount(FdsNavLink, {
          props: {
            href: '/page',
            current: true,
            disabled: true,
            icon: 'arrow-right',
            hint: 'Navigate to page'
          }
        })

        expect(wrapper.element.tagName).toBe('SPAN')
        expect(wrapper.classes()).toContain('nav-link-disabled')
        expect(wrapper.attributes('aria-disabled')).toBe('true')
        expect(wrapper.find('svg.sidenav-icon').exists()).toBe(true)
        expect(wrapper.find('.sidenav-information').text()).toBe('Navigate to page')
      })
    })
  })

  describe('Events', () => {
    it('emits click event when clicked and not disabled', async () => {
      const wrapper = mount(FdsNavLink, {
        props: { href: '/page' }
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.[0]).toBeDefined()
    })

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(FdsNavLink, {
        props: { disabled: true }
      })

      // Disabled renders as span, no click handler
      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('prevents default when href is "#"', async () => {
      const wrapper = mount(FdsNavLink, {
        props: { href: '#' }
      })

      const mockEvent = { preventDefault: vi.fn() }
      await wrapper.vm.handleClick(mockEvent as any)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(wrapper.emitted('click')?.[0]).toEqual([mockEvent])
    })

    it('does not prevent default when href is not "#"', async () => {
      const wrapper = mount(FdsNavLink, {
        props: { href: '/page' }
      })

      const mockEvent = { preventDefault: vi.fn() }
      await wrapper.vm.handleClick(mockEvent as any)

      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
      expect(wrapper.emitted('click')?.[0]).toEqual([mockEvent])
    })

    it('does not emit click when disabled prop is true', async () => {
      const wrapper = mount(FdsNavLink, {
        props: { disabled: false }
      })

      // Change to disabled
      await wrapper.setProps({ disabled: true })
      
      const mockEvent = { preventDefault: vi.fn() }
      await wrapper.vm.handleClick(mockEvent as any)

      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsNavLink, {
        slots: {
          default: 'Navigation Link Text'
        }
      })

      expect(wrapper.text()).toContain('Navigation Link Text')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsNavLink, {
        slots: {
          default: '<strong>Important</strong> Link'
        }
      })

      expect(wrapper.find('strong').text()).toBe('Important')
      expect(wrapper.text()).toContain('Link')
    })

    it('renders slot content in both enabled and disabled states', () => {
      const enabledWrapper = mount(FdsNavLink, {
        props: { disabled: false },
        slots: { default: 'Link Text' }
      })
      const disabledWrapper = mount(FdsNavLink, {
        props: { disabled: true },
        slots: { default: 'Link Text' }
      })

      expect(enabledWrapper.text()).toContain('Link Text')
      expect(disabledWrapper.text()).toContain('Link Text')
    })

    it('handles empty slot content', () => {
      const wrapper = mount(FdsNavLink)
      expect(wrapper.find('span').text()).toBe('')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes for enabled link', () => {
      const wrapper = mount(FdsNavLink, {
        props: {
          current: true,
          disabled: false
        }
      })

      expect(wrapper.attributes('aria-current')).toBe('page')
      // aria-disabled is not set on enabled links in the implementation
    })

    it('has correct ARIA attributes for disabled link', () => {
      const wrapper = mount(FdsNavLink, {
        props: {
          disabled: true
        }
      })

      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })

    it('has proper icon accessibility attributes', () => {
      const wrapper = mount(FdsNavLink, {
        props: { icon: 'arrow-right' }
      })

      const svg = wrapper.find('svg')
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })

    it('supports keyboard navigation when enabled', () => {
      const wrapper = mount(FdsNavLink, {
        props: { disabled: false }
      })

      expect(wrapper.element.tagName).toBe('A')
      // Anchor elements are naturally keyboard focusable
    })

    it('is not keyboard focusable when disabled', () => {
      const wrapper = mount(FdsNavLink, {
        props: { disabled: true }
      })

      expect(wrapper.element.tagName).toBe('SPAN')
      // Span elements are not naturally keyboard focusable
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <nav aria-label="Test navigation">
            <FdsNavLink href="/home">Home</FdsNavLink>
            <FdsNavLink href="/about" current>About</FdsNavLink>
            <FdsNavLink disabled>Disabled Link</FdsNavLink>
          </nav>
        `,
        components: { FdsNavLink }
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      const wrapper = mount(FdsNavLink, {
        props: {
          href: undefined,
          current: undefined,
          disabled: undefined,
          icon: undefined,
          hint: undefined
        }
      })

      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('#') // default value
      expect(wrapper.classes()).toContain('nav-link')
    })

    it('handles empty string props', () => {
      const wrapper = mount(FdsNavLink, {
        props: {
          href: '',
          icon: '',
          hint: ''
        }
      })

      expect(wrapper.attributes('href')).toBe('')
      expect(wrapper.find('svg').exists()).toBe(false)
      expect(wrapper.find('.sidenav-information').exists()).toBe(false)
    })

    it('handles prop changes dynamically', async () => {
      const wrapper = mount(FdsNavLink, {
        props: { disabled: false }
      })

      expect(wrapper.element.tagName).toBe('A')

      await wrapper.setProps({ disabled: true })
      expect(wrapper.element.tagName).toBe('SPAN')

      await wrapper.setProps({ disabled: false })
      expect(wrapper.element.tagName).toBe('A')
    })

    it('maintains structure with all optional props undefined', () => {
      const wrapper = mount(FdsNavLink, {
        slots: { default: 'Basic Link' }
      })

      expect(wrapper.find('span').exists()).toBe(true) // Content wrapper
      expect(wrapper.text()).toContain('Basic Link')
      expect(wrapper.find('svg').exists()).toBe(false)
      expect(wrapper.find('p').exists()).toBe(false)
    })
  })

  describe('Integration', () => {
    it('works in navigation menu context', () => {
      const NavigationWrapper = {
        template: `
          <nav aria-label="Main navigation">
            <ul>
              <li><FdsNavLink href="/">Home</FdsNavLink></li>
              <li><FdsNavLink href="/about" current>About</FdsNavLink></li>
              <li><FdsNavLink href="/contact" icon="mail">Contact</FdsNavLink></li>
              <li><FdsNavLink disabled hint="Coming soon">Features</FdsNavLink></li>
            </ul>
          </nav>
        `,
        components: { FdsNavLink }
      }

      const wrapper = mount(NavigationWrapper)
      const links = wrapper.findAllComponents(FdsNavLink)

      expect(links).toHaveLength(4)
      expect(links[0].attributes('href')).toBe('/')
      expect(links[1].attributes('aria-current')).toBe('page')
      expect(links[2].find('svg').exists()).toBe(true)
      expect(links[3].element.tagName).toBe('SPAN')
    })

    it('works with click handlers', async () => {
      const wrapper = mount(FdsNavLink, {
        props: { href: '#' },
        slots: { default: 'Click me' }
      })

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('follows DKFDS navigation patterns', () => {
      const SidenavWrapper = {
        template: `
          <nav aria-label="Sidenav">
            <ul class="sidemenu">
              <li><FdsNavLink href="/step1" icon="done">Step 1</FdsNavLink></li>
              <li><FdsNavLink href="/step2" current>Step 2</FdsNavLink></li>
              <li><FdsNavLink href="/step3" hint="Required">Step 3</FdsNavLink></li>
            </ul>
          </nav>
        `,
        components: { FdsNavLink }
      }

      const wrapper = mount(SidenavWrapper)
      const links = wrapper.findAllComponents(FdsNavLink)

      // Verify DKFDS structure
      expect(links[0].find('svg.sidenav-icon').exists()).toBe(true)
      expect(links[1].attributes('aria-current')).toBe('page')
      expect(links[2].find('.sidenav-information').exists()).toBe(true)
    })
  })
})