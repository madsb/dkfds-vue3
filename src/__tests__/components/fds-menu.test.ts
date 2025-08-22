import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsMenu from '../../components/navigation/fds-menu.vue'
import { testAccessibility } from '../../test-utils'

describe('FdsMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsMenu)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as nav element', () => {
      const wrapper = mount(FdsMenu)
      expect(wrapper.element.tagName).toBe('NAV')
    })

    it('contains ul element with sidemenu class', () => {
      const wrapper = mount(FdsMenu)
      const ul = wrapper.find('ul')
      expect(ul.exists()).toBe(true)
      expect(ul.classes()).toContain('sidemenu')
    })

    it('has correct DKFDS structure', () => {
      const wrapper = mount(FdsMenu)

      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(wrapper.find('ul').classes()).toContain('sidemenu')
    })
  })

  describe('Props', () => {
    describe('variant prop', () => {
      it('defaults to "sidemenu"', () => {
        const wrapper = mount(FdsMenu)
        expect(wrapper.find('ul').classes()).toContain('sidemenu')
      })

      it('applies sidemenu variant class', () => {
        const wrapper = mount(FdsMenu, {
          props: { variant: 'sidemenu' },
        })
        expect(wrapper.find('ul').classes()).toContain('sidemenu')
      })

      it('applies submenu variant class', () => {
        const wrapper = mount(FdsMenu, {
          props: { variant: 'submenu' },
        })
        // Submenu variant should not have any class
        expect(wrapper.find('ul').classes()).not.toContain('sidemenu')
        expect(wrapper.find('ul').classes()).toEqual([])
      })

      it('handles undefined variant', () => {
        const wrapper = mount(FdsMenu, {
          props: { variant: undefined },
        })
        expect(wrapper.find('ul').classes()).toContain('sidemenu')
      })
    })

    describe('ariaLabel prop', () => {
      it('has no default aria-label', () => {
        const wrapper = mount(FdsMenu)
        // The component doesn't have a default aria-label
        expect(wrapper.attributes('aria-label')).toBeUndefined()
      })

      it('accepts custom aria-label', () => {
        const wrapper = mount(FdsMenu, {
          props: { ariaLabel: 'Main menu' },
        })
        expect(wrapper.attributes('aria-label')).toBe('Main menu')
      })

      it('handles Danish text', () => {
        const wrapper = mount(FdsMenu, {
          props: { ariaLabel: 'Hovedmenu' },
        })
        expect(wrapper.attributes('aria-label')).toBe('Hovedmenu')
      })

      it('handles empty string aria-label', () => {
        const wrapper = mount(FdsMenu, {
          props: { ariaLabel: '' },
        })
        expect(wrapper.attributes('aria-label')).toBe('')
      })

      it('handles special characters in aria-label', () => {
        const wrapper = mount(FdsMenu, {
          props: { ariaLabel: 'Navigation - Hovedmenu & sidemenu' },
        })
        expect(wrapper.attributes('aria-label')).toBe('Navigation - Hovedmenu & sidemenu')
      })
    })

    describe('combined props', () => {
      it('handles both props together', () => {
        const wrapper = mount(FdsMenu, {
          props: {
            variant: 'submenu',
            ariaLabel: 'Submenu navigation',
          },
        })

        // Submenu variant renders as ul without nav wrapper, so no aria-label on root
        expect(wrapper.element.tagName).toBe('UL')
        expect(wrapper.classes()).not.toContain('sidemenu')
      })
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsMenu, {
        slots: {
          default: '<li>Menu Item 1</li><li>Menu Item 2</li>',
        },
      })

      const ul = wrapper.find('ul')
      expect(ul.html()).toContain('<li>Menu Item 1</li>')
      expect(ul.html()).toContain('<li>Menu Item 2</li>')
    })

    it('renders multiple menu items', () => {
      const wrapper = mount(FdsMenu, {
        slots: {
          default: `
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          `,
        },
      })

      const links = wrapper.findAll('a')
      expect(links).toHaveLength(3)
      expect(links[0].text()).toBe('Home')
      expect(links[1].text()).toBe('About')
      expect(links[2].text()).toBe('Contact')
    })

    it('handles empty slot content', () => {
      const wrapper = mount(FdsMenu)
      const ul = wrapper.find('ul')
      expect(ul.text().trim()).toBe('')
    })

    it('renders complex nested content', () => {
      const wrapper = mount(FdsMenu, {
        slots: {
          default: `
            <li>
              <a href="/parent">Parent Item</a>
              <ul>
                <li><a href="/child">Child Item</a></li>
              </ul>
            </li>
          `,
        },
      })

      expect(wrapper.find('a[href="/parent"]').exists()).toBe(true)
      expect(wrapper.find('a[href="/child"]').exists()).toBe(true)
      expect(wrapper.findAll('ul')).toHaveLength(2) // Main ul + nested ul
    })

    it('preserves slot content structure', () => {
      const slotContent = `
        <li class="menu-item active">
          <a href="/current" aria-current="page">Current Page</a>
        </li>
        <li class="menu-item">
          <a href="/other">Other Page</a>
        </li>
      `

      const wrapper = mount(FdsMenu, {
        slots: { default: slotContent },
      })

      expect(wrapper.find('.menu-item.active').exists()).toBe(true)
      expect(wrapper.find('[aria-current="page"]').exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has nav element with aria-label', () => {
      const wrapper = mount(FdsMenu, {
        props: { ariaLabel: 'Main navigation' },
      })

      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.attributes('aria-label')).toBe('Main navigation')
    })

    it('provides semantic navigation structure', () => {
      const wrapper = mount(FdsMenu, {
        slots: {
          default: '<li><a href="/page">Link</a></li>',
        },
      })

      // nav > ul > li > a structure
      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(wrapper.find('li').exists()).toBe(true)
      expect(wrapper.find('a').exists()).toBe(true)
    })

    it('supports keyboard navigation', () => {
      const wrapper = mount(FdsMenu, {
        slots: {
          default: `
            <li><a href="/1">Item 1</a></li>
            <li><a href="/2">Item 2</a></li>
            <li><a href="/3">Item 3</a></li>
          `,
        },
      })

      const links = wrapper.findAll('a')
      // All links should be keyboard focusable
      links.forEach((link) => {
        expect(link.element.tagName).toBe('A')
        expect(link.attributes('href')).toBeTruthy()
      })
    })

    it('works with ARIA attributes in slot content', () => {
      const wrapper = mount(FdsMenu, {
        slots: {
          default: `
            <li><a href="/current" aria-current="page">Current</a></li>
            <li><a href="/other" aria-describedby="help">Other</a></li>
          `,
        },
      })

      expect(wrapper.find('[aria-current="page"]').exists()).toBe(true)
      expect(wrapper.find('[aria-describedby="help"]').exists()).toBe(true)
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <FdsMenu aria-label="Main navigation">
            <li><a href="/home">Home</a></li>
            <li><a href="/about" aria-current="page">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </FdsMenu>
        `,
        components: { FdsMenu },
      }

      await testAccessibility(TestWrapper)
    })

    it('passes accessibility tests for submenu variant', async () => {
      const TestWrapper = {
        template: `
          <nav aria-label="Parent navigation">
            <ul>
              <li>
                <a href="/parent">Parent</a>
                <FdsMenu variant="submenu">
                  <li><a href="/sub1">Subitem 1</a></li>
                  <li><a href="/sub2">Subitem 2</a></li>
                </FdsMenu>
              </li>
            </ul>
          </nav>
        `,
        components: { FdsMenu },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      const wrapper = mount(FdsMenu, {
        props: {
          variant: undefined,
          ariaLabel: undefined,
        },
      })

      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.attributes('aria-label')).toBeUndefined() // no default
      expect(wrapper.find('ul').classes()).toContain('sidemenu')
    })

    it('handles null props', () => {
      const wrapper = mount(FdsMenu, {
        props: {
          variant: null,
          ariaLabel: null,
        },
      })

      // null variant doesn't match 'sidemenu', so renders as ul
      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.classes()).toContain('sidemenu')
    })

    it('maintains structure with no slot content', () => {
      const wrapper = mount(FdsMenu)

      expect(wrapper.element.tagName).toBe('NAV')
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(wrapper.find('ul').classes()).toContain('sidemenu')
    })

    it('handles prop changes dynamically', async () => {
      const wrapper = mount(FdsMenu, {
        props: { ariaLabel: 'Initial label' },
      })

      expect(wrapper.attributes('aria-label')).toBe('Initial label')

      await wrapper.setProps({ ariaLabel: 'Updated label' })
      expect(wrapper.attributes('aria-label')).toBe('Updated label')
    })

    it('handles very long aria-label text', () => {
      const longLabel =
        'Very long navigation label that contains many words and should still work correctly without breaking the component functionality'
      const wrapper = mount(FdsMenu, {
        props: { ariaLabel: longLabel },
      })

      expect(wrapper.attributes('aria-label')).toBe(longLabel)
    })

    it('handles special characters in aria-label', () => {
      const specialLabel = 'Navigation <>&"\''
      const wrapper = mount(FdsMenu, {
        props: { ariaLabel: specialLabel },
      })

      expect(wrapper.attributes('aria-label')).toBe(specialLabel)
    })
  })

  describe('Integration', () => {
    it('works as main navigation menu', () => {
      const MainNavWrapper = {
        template: `
          <FdsMenu aria-label="Hovedmenu">
            <li><a href="/">Forside</a></li>
            <li><a href="/tjenester" aria-current="page">Tjenester</a></li>
            <li><a href="/om-os">Om os</a></li>
            <li><a href="/kontakt">Kontakt</a></li>
          </FdsMenu>
        `,
        components: { FdsMenu },
      }

      const wrapper = mount(MainNavWrapper)
      const menu = wrapper.findComponent(FdsMenu)

      expect(menu.attributes('aria-label')).toBe('Hovedmenu')
      expect(wrapper.findAll('li')).toHaveLength(4)
      expect(wrapper.find('[aria-current="page"]').text()).toBe('Tjenester')
    })

    it('works as sidebar navigation', () => {
      const SidebarWrapper = {
        template: `
          <div class="sidebar">
            <FdsMenu variant="sidemenu" aria-label="Sidemenu">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/settings">Settings</a></li>
            </FdsMenu>
          </div>
        `,
        components: { FdsMenu },
      }

      const wrapper = mount(SidebarWrapper)
      const menu = wrapper.findComponent(FdsMenu)

      expect(menu.find('ul').classes()).toContain('sidemenu')
      expect(wrapper.findAll('a')).toHaveLength(3)
    })

    it('works with nested submenu', () => {
      const NestedMenuWrapper = {
        template: `
          <FdsMenu aria-label="Main menu">
            <li>
              <a href="/parent">Parent Item</a>
              <FdsMenu variant="submenu">
                <li><a href="/child1">Child 1</a></li>
                <li><a href="/child2">Child 2</a></li>
              </FdsMenu>
            </li>
          </FdsMenu>
        `,
        components: { FdsMenu },
      }

      const wrapper = mount(NestedMenuWrapper)
      const menus = wrapper.findAllComponents(FdsMenu)

      expect(menus).toHaveLength(2)
      expect(menus[0].attributes('aria-label')).toBe('Main menu')
      // Submenu variant renders as ul, so no aria-label attribute
      expect(menus[1].element.tagName).toBe('UL')
    })

    it('follows DKFDS menu patterns', () => {
      const DKFDSMenuWrapper = {
        template: `
          <FdsMenu aria-label="Hovednavigation">
            <li class="active current">
              <a href="/aktuel-side" aria-current="page">Aktuel side</a>
            </li>
            <li>
              <a href="/anden-side">Anden side</a>
            </li>
            <li>
              <a href="/tredje-side">Tredje side</a>
              <FdsMenu variant="submenu" aria-label="Undermenu">
                <li><a href="/under1">Underside 1</a></li>
                <li><a href="/under2">Underside 2</a></li>
              </FdsMenu>
            </li>
          </FdsMenu>
        `,
        components: { FdsMenu },
      }

      const wrapper = mount(DKFDSMenuWrapper)

      // Verify DKFDS structure and conventions
      expect(wrapper.find('.active.current').exists()).toBe(true)
      expect(wrapper.find('[aria-current="page"]').exists()).toBe(true)
      expect(wrapper.findAllComponents(FdsMenu)).toHaveLength(2)
    })

    it('works with dynamic menu items', async () => {
      const DynamicMenuWrapper = {
        template: `
          <FdsMenu aria-label="Dynamic menu">
            <li v-for="item in menuItems" :key="item.id">
              <a :href="item.href" :aria-current="item.current ? 'page' : undefined">
                {{ item.title }}
              </a>
            </li>
          </FdsMenu>
        `,
        components: { FdsMenu },
        data() {
          return {
            menuItems: [
              { id: 1, href: '/home', title: 'Home', current: false },
              { id: 2, href: '/about', title: 'About', current: true },
            ],
          }
        },
      }

      const wrapper = mount(DynamicMenuWrapper)

      expect(wrapper.findAll('li')).toHaveLength(2)
      expect(wrapper.find('[aria-current="page"]').text()).toBe('About')

      // Update menu items
      await wrapper.setData({
        menuItems: [
          { id: 1, href: '/home', title: 'Home', current: true },
          { id: 2, href: '/about', title: 'About', current: false },
          { id: 3, href: '/contact', title: 'Contact', current: false },
        ],
      })

      expect(wrapper.findAll('li')).toHaveLength(3)
      expect(wrapper.find('[aria-current="page"]').text()).toBe('Home')
    })
  })
})
