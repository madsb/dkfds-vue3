import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsOverflowMenu from '../../components/navigation/fds-overflow-menu.vue'
import { testAccessibility } from '../../test-utils'

describe('FdsOverflowMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock document event methods
    vi.spyOn(document, 'addEventListener')
    vi.spyOn(document, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsOverflowMenu)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with correct base structure', () => {
      const wrapper = mount(FdsOverflowMenu)

      expect(wrapper.find('.overflow-menu').exists()).toBe(true)
      expect(wrapper.find('button.button-overflow-menu').exists()).toBe(true)
      expect(wrapper.find('.overflow-menu-inner').exists()).toBe(true)
    })

    it('renders button with default header text', () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')
      expect(button.text()).toContain('Overflow menu')
    })

    it('renders with default icon', () => {
      const wrapper = mount(FdsOverflowMenu)
      const svg = wrapper.find('button svg')
      expect(svg.exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#more-vert')
    })

    it('is closed by default', () => {
      const wrapper = mount(FdsOverflowMenu)

      expect(wrapper.find('.overflow-menu-inner.collapsed').exists()).toBe(true)
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('renders ul element when slot content is provided', () => {
      const wrapper = mount(FdsOverflowMenu, {
        slots: { default: '<li>Item 1</li>' },
      })

      expect(wrapper.find('ul.overflow-list').exists()).toBe(true)
    })

    it('does not render ul when no slot content', () => {
      const wrapper = mount(FdsOverflowMenu)
      expect(wrapper.find('ul.overflow-list').exists()).toBe(false)
    })
  })

  describe('Props', () => {
    describe('header prop', () => {
      it('uses default header text', () => {
        const wrapper = mount(FdsOverflowMenu)
        expect(wrapper.find('button').text()).toContain('Overflow menu')
      })

      it('accepts custom header text', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { header: 'Custom Menu' },
        })
        expect(wrapper.find('button').text()).toContain('Custom Menu')
      })

      it('handles empty header', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { header: '' },
        })
        // When header is empty, it falls back to default text due to template logic
        expect(wrapper.find('button').text()).toContain('Overflow menu')
      })

      it('handles Danish text', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { header: 'Flere muligheder' },
        })
        expect(wrapper.find('button').text()).toContain('Flere muligheder')
      })
    })

    describe('id prop', () => {
      it('generates unique IDs when no id provided', () => {
        const wrapper1 = mount(FdsOverflowMenu)
        const wrapper2 = mount(FdsOverflowMenu)

        const button1Id = wrapper1.find('button').attributes('id')
        const button2Id = wrapper2.find('button').attributes('id')

        expect(button1Id).toBeTruthy()
        expect(button2Id).toBeTruthy()
        expect(button1Id).not.toBe(button2Id)
      })

      it('uses custom id when provided', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { id: 'custom-menu' },
        })

        expect(wrapper.find('button').attributes('id')).toBe('button_custom-menu')
        expect(wrapper.find('.overflow-menu-inner').attributes('id')).toBe('custom-menu')
      })

      it('creates correct aria-controls relationship', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { id: 'test-menu' },
        })

        const button = wrapper.find('button')
        const menu = wrapper.find('.overflow-menu-inner')

        expect(button.attributes('aria-controls')).toBe('test-menu')
        expect(menu.attributes('id')).toBe('test-menu')
      })
    })

    describe('icon prop', () => {
      it('uses default icon', () => {
        const wrapper = mount(FdsOverflowMenu)
        expect(wrapper.find('use').attributes('href')).toBe('#more-vert')
      })

      it('accepts custom icon', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { icon: 'menu' },
        })
        expect(wrapper.find('use').attributes('href')).toBe('#menu')
      })

      it('has correct icon accessibility attributes', () => {
        const wrapper = mount(FdsOverflowMenu)
        const svg = wrapper.find('svg')
        expect(svg.attributes('aria-hidden')).toBe('true')
        expect(svg.attributes('focusable')).toBe('false')
      })
    })

    describe('position prop', () => {
      it('defaults to right position', () => {
        const wrapper = mount(FdsOverflowMenu)
        expect(wrapper.find('.overflow-menu').classes()).toContain('overflow-menu--open-right')
      })

      it('applies right position class', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { position: 'right' },
        })
        expect(wrapper.find('.overflow-menu').classes()).toContain('overflow-menu--open-right')
      })

      it('applies left position class', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { position: 'left' },
        })
        expect(wrapper.find('.overflow-menu').classes()).toContain('overflow-menu--open-left')
      })
    })

    describe('iconPosition', () => {
      it('defaults to right position', () => {
        const wrapper = mount(FdsOverflowMenu)
        const button = wrapper.find('button')
        const icons = button.findAll('svg')

        // Should have one icon
        expect(icons).toHaveLength(1)

        // Icon should be after the text (right position)
        const buttonHTML = button.html()
        const iconIndex = buttonHTML.indexOf('<svg')
        const textIndex = buttonHTML.indexOf('Overflow menu')
        expect(iconIndex).toBeGreaterThan(textIndex)
      })

      it('positions icon on the left when specified', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { iconPosition: 'left' },
        })
        const button = wrapper.find('button')
        const icons = button.findAll('svg')

        // Should have one icon
        expect(icons).toHaveLength(1)

        // Icon should be before the text (left position)
        const buttonHTML = button.html()
        const iconIndex = buttonHTML.indexOf('<svg')
        const textIndex = buttonHTML.indexOf('Overflow menu')
        expect(iconIndex).toBeLessThan(textIndex)
      })

      it('positions icon on the right when explicitly set', () => {
        const wrapper = mount(FdsOverflowMenu, {
          props: { iconPosition: 'right' },
        })
        const button = wrapper.find('button')
        const icons = button.findAll('svg')

        // Should have one icon
        expect(icons).toHaveLength(1)

        // Icon should be after the text (right position)
        const buttonHTML = button.html()
        const iconIndex = buttonHTML.indexOf('<svg')
        const textIndex = buttonHTML.indexOf('Overflow menu')
        expect(iconIndex).toBeGreaterThan(textIndex)
      })
    })
  })

  describe('State Management', () => {
    it('starts in closed state', () => {
      const wrapper = mount(FdsOverflowMenu)

      expect(wrapper.vm.isOpen).toBe(false)
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
      expect(wrapper.find('.overflow-menu-inner').attributes('aria-hidden')).toBe('true')
      expect(wrapper.find('.overflow-menu-inner').classes()).toContain('collapsed')
    })

    it('opens when toggle is called', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.vm.open()

      expect(wrapper.vm.isOpen).toBe(true)
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
      expect(wrapper.find('.overflow-menu-inner').attributes('aria-hidden')).toBe('false')
      expect(wrapper.find('.overflow-menu-inner').classes()).not.toContain('collapsed')
    })

    it('closes when toggle is called again', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.vm.open()
      expect(wrapper.vm.isOpen).toBe(true)

      await wrapper.vm.close()
      expect(wrapper.vm.isOpen).toBe(false)
    })

    it('toggles between open and closed states', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.vm.toggle()
      expect(wrapper.vm.isOpen).toBe(true)

      await wrapper.vm.toggle()
      expect(wrapper.vm.isOpen).toBe(false)
    })
  })

  describe('Events', () => {
    it('emits open event when menu opens', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.vm.open()

      expect(wrapper.emitted('open')).toBeTruthy()
      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')?.[0]).toEqual([true])
    })

    it('emits close event when menu closes', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.vm.open()
      await wrapper.vm.close()

      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('toggle')?.[1]).toEqual([false])
    })

    it('emits toggle event with correct state', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.vm.toggle()
      expect(wrapper.emitted('toggle')?.[0]).toEqual([true])

      await wrapper.vm.toggle()
      expect(wrapper.emitted('toggle')?.[1]).toEqual([false])
    })

    it('handles button click to toggle menu', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.find('button').trigger('click')
      expect(wrapper.vm.isOpen).toBe(true)
      expect(wrapper.emitted('open')).toBeTruthy()

      await wrapper.find('button').trigger('click')
      expect(wrapper.vm.isOpen).toBe(false)
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  describe('Keyboard Navigation', () => {
    it('closes menu on Escape key when open', async () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')

      // Mock focus method
      const focusMock = vi.fn()
      button.element.focus = focusMock

      await wrapper.vm.open()
      expect(wrapper.vm.isOpen).toBe(true)

      await button.trigger('keydown', { key: 'Escape' })

      expect(wrapper.vm.isOpen).toBe(false)
      expect(focusMock).toHaveBeenCalled()
    })

    it('does not close menu on Escape when already closed', async () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')

      expect(wrapper.vm.isOpen).toBe(false)

      await button.trigger('keydown', { key: 'Escape' })

      expect(wrapper.vm.isOpen).toBe(false)
      expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('ignores other keyboard events', async () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')

      await wrapper.vm.open()
      expect(wrapper.vm.isOpen).toBe(true)

      await button.trigger('keydown', { key: 'Enter' })
      await button.trigger('keydown', { key: 'Space' })
      await button.trigger('keydown', { key: 'ArrowDown' })

      expect(wrapper.vm.isOpen).toBe(true) // Still open
    })

    it('has correct focus management attributes', () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')

      expect(button.attributes('aria-haspopup')).toBe('true')
      expect(button.attributes('aria-expanded')).toBe('false')
    })
  })

  describe('Click Outside Behavior', () => {
    it('sets up click outside listener on mount', () => {
      mount(FdsOverflowMenu)
      expect(document.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('removes click outside listener on unmount', () => {
      const wrapper = mount(FdsOverflowMenu)
      wrapper.unmount()
      expect(document.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('closes menu when clicking outside', async () => {
      const wrapper = mount(FdsOverflowMenu)

      await wrapper.vm.open()
      expect(wrapper.vm.isOpen).toBe(true)

      // Simulate click outside
      const outsideElement = document.createElement('div')
      const clickEvent = new Event('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: outsideElement })

      await wrapper.vm.handleClickOutside(clickEvent)

      expect(wrapper.vm.isOpen).toBe(false)
    })

    it('does not close when clicking inside button', async () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')

      await wrapper.vm.open()
      expect(wrapper.vm.isOpen).toBe(true)

      // Simulate click on button
      const clickEvent = new Event('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: button.element })

      await wrapper.vm.handleClickOutside(clickEvent)

      expect(wrapper.vm.isOpen).toBe(true)
    })

    it('does not close when clicking inside menu', async () => {
      const wrapper = mount(FdsOverflowMenu, {
        slots: { default: '<li><button>Menu Item</button></li>' },
      })
      const menuItem = wrapper.find('li button')

      await wrapper.vm.open()
      expect(wrapper.vm.isOpen).toBe(true)

      // Simulate click on menu item
      const clickEvent = new Event('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: menuItem.element })

      await wrapper.vm.handleClickOutside(clickEvent)

      expect(wrapper.vm.isOpen).toBe(true)
    })
  })

  describe('Slots', () => {
    it('renders slot content in overflow list', () => {
      const wrapper = mount(FdsOverflowMenu, {
        slots: {
          default: '<li><button>Action 1</button></li><li><button>Action 2</button></li>',
        },
      })

      const ul = wrapper.find('ul.overflow-list')
      expect(ul.exists()).toBe(true)
      expect(ul.html()).toContain('<li><button>Action 1</button></li>')
      expect(ul.html()).toContain('<li><button>Action 2</button></li>')
    })

    it('renders complex menu items', () => {
      const wrapper = mount(FdsOverflowMenu, {
        slots: {
          default: `
            <li><a href="/edit">Edit</a></li>
            <li><a href="/delete" class="text-danger">Delete</a></li>
            <li><button disabled>Disabled Action</button></li>
          `,
        },
      })

      const ul = wrapper.find('ul.overflow-list')
      expect(ul.find('a[href="/edit"]').exists()).toBe(true)
      expect(ul.find('a.text-danger').exists()).toBe(true)
      expect(ul.find('button[disabled]').exists()).toBe(true)
    })

    it('handles empty slot content', () => {
      const wrapper = mount(FdsOverflowMenu, {
        slots: { default: '' },
      })

      expect(wrapper.find('ul.overflow-list').exists()).toBe(true)
      expect(wrapper.find('ul.overflow-list').text().trim()).toBe('')
    })

    it('does not render ul when no slot provided', () => {
      const wrapper = mount(FdsOverflowMenu)
      expect(wrapper.find('ul.overflow-list').exists()).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(FdsOverflowMenu, {
        props: { id: 'test-menu' },
      })
      const button = wrapper.find('button')
      const menu = wrapper.find('.overflow-menu-inner')

      expect(button.attributes('aria-haspopup')).toBe('true')
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(button.attributes('aria-controls')).toBe('test-menu')
      expect(menu.attributes('aria-hidden')).toBe('true')
    })

    it('updates ARIA attributes when menu state changes', async () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')
      const menu = wrapper.find('.overflow-menu-inner')

      await wrapper.vm.open()

      expect(button.attributes('aria-expanded')).toBe('true')
      expect(menu.attributes('aria-hidden')).toBe('false')

      await wrapper.vm.close()

      expect(button.attributes('aria-expanded')).toBe('false')
      expect(menu.attributes('aria-hidden')).toBe('true')
    })

    it('has proper button labeling', () => {
      const wrapper = mount(FdsOverflowMenu, {
        props: { header: 'Actions menu' },
      })
      const button = wrapper.find('button')

      expect(button.text()).toContain('Actions menu')
    })

    it('has proper icon accessibility', () => {
      const wrapper = mount(FdsOverflowMenu)
      const svg = wrapper.find('svg.icon-svg')

      expect(svg.attributes('aria-hidden')).toBe('true')
      expect(svg.attributes('focusable')).toBe('false')
    })

    it('manages focus correctly on Escape', async () => {
      const wrapper = mount(FdsOverflowMenu)
      const button = wrapper.find('button')

      const focusMock = vi.fn()
      button.element.focus = focusMock

      await wrapper.vm.open()
      await button.trigger('keydown', { key: 'Escape' })

      expect(focusMock).toHaveBeenCalled()
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <div>
            <FdsOverflowMenu header="Actions">
              <li><button type="button">Edit</button></li>
              <li><button type="button">Share</button></li>
              <li><button type="button">Delete</button></li>
            </FdsOverflowMenu>
          </div>
        `,
        components: { FdsOverflowMenu },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      const wrapper = mount(FdsOverflowMenu, {
        props: {
          header: undefined,
          id: undefined,
          icon: undefined,
          position: undefined,
        },
      })

      expect(wrapper.find('button').text()).toContain('Overflow menu')
      expect(wrapper.find('use').attributes('href')).toBe('#more-vert')
      expect(wrapper.find('.overflow-menu').classes()).toContain('overflow-menu--open-right')
    })

    it('handles empty string props', () => {
      const wrapper = mount(FdsOverflowMenu, {
        props: {
          header: '',
          icon: '',
          id: '',
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('.overflow-menu-inner').exists()).toBe(true)
    })

    it('handles prop changes dynamically', async () => {
      const wrapper = mount(FdsOverflowMenu, {
        props: { position: 'right' },
      })

      expect(wrapper.find('.overflow-menu').classes()).toContain('overflow-menu--open-right')

      await wrapper.setProps({ position: 'left' })
      expect(wrapper.find('.overflow-menu').classes()).toContain('overflow-menu--open-left')
      expect(wrapper.find('.overflow-menu').classes()).not.toContain('overflow-menu--open-right')
    })

    it('handles multiple rapid toggle calls', async () => {
      const wrapper = mount(FdsOverflowMenu)

      // Rapid toggling
      await wrapper.vm.toggle()
      await wrapper.vm.toggle()
      await wrapper.vm.toggle()

      expect(wrapper.vm.isOpen).toBe(true)
      expect(wrapper.emitted('toggle')).toHaveLength(3)
    })

    it('handles missing DOM elements gracefully', async () => {
      const wrapper = mount(FdsOverflowMenu)

      // Remove refs to simulate edge case
      wrapper.vm.buttonRef = null
      wrapper.vm.menuRef = null

      const clickEvent = new Event('click')
      await wrapper.vm.handleClickOutside(clickEvent)

      // Should not throw error
      expect(wrapper.vm.isOpen).toBe(false)
    })

    it('maintains IDs when component is re-mounted', () => {
      const wrapper1 = mount(FdsOverflowMenu, {
        props: { id: 'persistent-menu' },
      })
      const id1 = wrapper1.find('button').attributes('id')
      wrapper1.unmount()

      const wrapper2 = mount(FdsOverflowMenu, {
        props: { id: 'persistent-menu' },
      })
      const id2 = wrapper2.find('button').attributes('id')

      expect(id1).toBe(id2)
    })
  })

  describe('Integration', () => {
    it('works in table action context', () => {
      const TableWrapper = {
        template: `
          <table>
            <tbody>
              <tr>
                <td>User 1</td>
                <td>
                  <FdsOverflowMenu header="Actions">
                    <li><button>Edit</button></li>
                    <li><button>Delete</button></li>
                  </FdsOverflowMenu>
                </td>
              </tr>
            </tbody>
          </table>
        `,
        components: { FdsOverflowMenu },
      }

      const wrapper = mount(TableWrapper)
      const menu = wrapper.findComponent(FdsOverflowMenu)

      expect(menu.exists()).toBe(true)
      expect(menu.find('ul.overflow-list').exists()).toBe(true)
    })

    it('works in card context', () => {
      const CardWrapper = {
        template: `
          <div class="card">
            <div class="card-header">
              <h3>Card Title</h3>
              <FdsOverflowMenu header="Card actions" position="left">
                <li><button>Edit card</button></li>
                <li><button>Share card</button></li>
                <li><button>Delete card</button></li>
              </FdsOverflowMenu>
            </div>
          </div>
        `,
        components: { FdsOverflowMenu },
      }

      const wrapper = mount(CardWrapper)
      const menu = wrapper.findComponent(FdsOverflowMenu)

      expect(menu.classes()).toContain('overflow-menu--open-left')
      expect(menu.find('ul li').exists()).toBe(true)
    })

    it('works with click handlers', async () => {
      const actionHandler = vi.fn()
      const ActionWrapper = {
        template: `
          <FdsOverflowMenu header="Test actions">
            <li><button @click="actionHandler('edit')">Edit</button></li>
            <li><button @click="actionHandler('delete')">Delete</button></li>
          </FdsOverflowMenu>
        `,
        components: { FdsOverflowMenu },
        methods: {
          actionHandler,
        },
      }

      const wrapper = mount(ActionWrapper)
      const overflowMenu = wrapper.findComponent(FdsOverflowMenu)
      await overflowMenu.vm.open() // Open menu

      await wrapper.findAll('li button')[0].trigger('click')
      expect(actionHandler).toHaveBeenCalledWith('edit')
    })

    it('follows DKFDS overflow menu patterns', () => {
      const DKFDSWrapper = {
        template: `
          <div class="overflow-menu-container">
            <FdsOverflowMenu header="Flere handlinger" position="right">
              <li><a href="/rediger">Rediger</a></li>
              <li><a href="/kopier">Kopier</a></li>
              <li><a href="/slet" class="text-error">Slet</a></li>
            </FdsOverflowMenu>
          </div>
        `,
        components: { FdsOverflowMenu },
      }

      const wrapper = mount(DKFDSWrapper)
      const menu = wrapper.findComponent(FdsOverflowMenu)

      expect(menu.find('button').text()).toContain('Flere handlinger')
      expect(menu.find('.overflow-menu').classes()).toContain('overflow-menu--open-right')
      expect(menu.find('a.text-error').text()).toBe('Slet')
    })

    it('handles dynamic menu items', async () => {
      const DynamicWrapper = {
        template: `
          <FdsOverflowMenu header="Dynamic menu">
            <li v-for="action in actions" :key="action.id">
              <button @click="handleAction(action)" :disabled="action.disabled">
                {{ action.title }}
              </button>
            </li>
          </FdsOverflowMenu>
        `,
        components: { FdsOverflowMenu },
        data() {
          return {
            actions: [
              { id: 'edit', title: 'Edit', disabled: false },
              { id: 'share', title: 'Share', disabled: false },
              { id: 'delete', title: 'Delete', disabled: true },
            ],
          }
        },
        methods: {
          handleAction(action: any) {
            this.actions = this.actions.filter((a) => a.id !== action.id)
          },
        },
      }

      const wrapper = mount(DynamicWrapper)
      const buttons = wrapper.findAll('button')

      expect(buttons).toHaveLength(4) // 3 actions + toggle button
      expect(buttons[3].attributes('disabled')).toBeDefined() // Delete is disabled

      // Simulate action
      await buttons[1].trigger('click') // Edit action

      expect(wrapper.findAll('li')).toHaveLength(2) // One action removed
    })
  })
})
