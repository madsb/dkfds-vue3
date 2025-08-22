import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsListItem from '../../components/fds-list-item.vue'

describe('FdsListItem', () => {
  describe('Rendering', () => {
    it('renders list item element correctly', () => {
      const wrapper = mount(FdsListItem)

      expect(wrapper.element.tagName).toBe('LI')
    })

    it('renders without errors', () => {
      expect(() => mount(FdsListItem)).not.toThrow()
    })

    it('renders slot content correctly', () => {
      const wrapper = mount(FdsListItem, {
        slots: {
          default: 'Test list item content',
        },
      })

      expect(wrapper.text()).toBe('Test list item content')
    })

    it('renders with complex slot content', () => {
      const wrapper = mount(FdsListItem, {
        slots: {
          default: `
            <a href="/test">Test link</a>
            <span class="badge">New</span>
          `,
        },
      })

      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a').attributes('href')).toBe('/test')
      expect(wrapper.find('.badge').exists()).toBe(true)
      expect(wrapper.find('.badge').text()).toBe('New')
    })

    it('renders HTML content in slot correctly', () => {
      const wrapper = mount(FdsListItem, {
        slots: {
          default: '<strong>Bold content</strong> and <em>italic content</em>',
        },
      })

      expect(wrapper.find('strong').exists()).toBe(true)
      expect(wrapper.find('em').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('Bold content')
      expect(wrapper.find('em').text()).toBe('italic content')
    })
  })

  describe('Variant Props', () => {
    const variants = ['current', 'active', 'disabled']

    variants.forEach((variant) => {
      it(`applies ${variant} variant class correctly`, () => {
        const wrapper = mount(FdsListItem, {
          props: { variant: variant as any },
        })

        expect(wrapper.classes()).toContain(variant)
      })
    })

    it('does not apply variant class when variant is null', () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: null },
      })

      const classes = wrapper.classes()
      expect(classes).not.toContain('current')
      expect(classes).not.toContain('active')
      expect(classes).not.toContain('disabled')
    })

    it('can change variant dynamically', async () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: 'current' },
      })

      expect(wrapper.classes()).toContain('current')

      await wrapper.setProps({ variant: 'active' })
      expect(wrapper.classes()).not.toContain('current')
      expect(wrapper.classes()).toContain('active')

      await wrapper.setProps({ variant: null })
      expect(wrapper.classes()).not.toContain('active')
    })

    it('handles undefined variant gracefully', () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: undefined },
      })

      const classes = wrapper.classes()
      expect(classes).not.toContain('current')
      expect(classes).not.toContain('active')
      expect(classes).not.toContain('disabled')
    })
  })

  describe('Role Props', () => {
    it('applies none role correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: { role: 'none' },
      })

      expect(wrapper.attributes('role')).toBe('none')
    })

    it('does not apply role attribute when role is null', () => {
      const wrapper = mount(FdsListItem, {
        props: { role: null },
      })

      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('uses default li role by default', () => {
      const wrapper = mount(FdsListItem)

      // Native li elements have implicit role="listitem"
      expect(wrapper.element.tagName).toBe('LI')
    })

    it('can change role dynamically', async () => {
      const wrapper = mount(FdsListItem, {
        props: { role: null },
      })

      expect(wrapper.attributes('role')).toBeUndefined()

      await wrapper.setProps({ role: 'none' })
      expect(wrapper.attributes('role')).toBe('none')

      await wrapper.setProps({ role: null })
      expect(wrapper.attributes('role')).toBeUndefined()
    })
  })

  describe('Flex Layout Props', () => {
    it('applies flex class when flex is true', () => {
      const wrapper = mount(FdsListItem, {
        props: { flex: true },
      })

      expect(wrapper.classes()).toContain('d-flex')
    })

    it('applies justify-between class when justifyBetween is true', () => {
      const wrapper = mount(FdsListItem, {
        props: { justifyBetween: true },
      })

      expect(wrapper.classes()).toContain('justify-content-between')
    })

    it('applies both flex classes when both props are true', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          flex: true,
          justifyBetween: true,
        },
      })

      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).toContain('justify-content-between')
    })

    it('does not apply flex classes by default', () => {
      const wrapper = mount(FdsListItem)

      expect(wrapper.classes()).not.toContain('d-flex')
      expect(wrapper.classes()).not.toContain('justify-content-between')
    })

    it('can toggle flex classes dynamically', async () => {
      const wrapper = mount(FdsListItem, {
        props: {
          flex: false,
          justifyBetween: false,
        },
      })

      expect(wrapper.classes()).not.toContain('d-flex')
      expect(wrapper.classes()).not.toContain('justify-content-between')

      await wrapper.setProps({ flex: true })
      expect(wrapper.classes()).toContain('d-flex')

      await wrapper.setProps({ justifyBetween: true })
      expect(wrapper.classes()).toContain('justify-content-between')

      await wrapper.setProps({ flex: false, justifyBetween: false })
      expect(wrapper.classes()).not.toContain('d-flex')
      expect(wrapper.classes()).not.toContain('justify-content-between')
    })
  })

  describe('Class Computation', () => {
    it('combines multiple classes correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          variant: 'current',
          flex: true,
          justifyBetween: true,
        },
      })

      const classes = wrapper.classes()
      expect(classes).toContain('current')
      expect(classes).toContain('d-flex')
      expect(classes).toContain('justify-content-between')
    })

    it('returns undefined for class when no props are set', () => {
      const wrapper = mount(FdsListItem)

      // When no classes are applied, the class attribute should be undefined or empty
      const classAttribute = wrapper.attributes('class')
      expect(classAttribute === '' || classAttribute === undefined).toBe(true)
    })

    it('handles only variant class correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: 'disabled' },
      })

      expect(wrapper.classes()).toContain('disabled')
      expect(wrapper.classes()).not.toContain('d-flex')
      expect(wrapper.classes()).not.toContain('justify-content-between')
    })

    it('handles only flex classes correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: { flex: true },
      })

      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).not.toContain('current')
      expect(wrapper.classes()).not.toContain('active')
      expect(wrapper.classes()).not.toContain('disabled')
    })

    it('maintains correct class order', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          variant: 'active',
          flex: true,
          justifyBetween: true,
        },
      })

      const classString = wrapper.attributes('class')
      expect(classString).toBe('active d-flex justify-content-between')
    })
  })

  describe('Attributes', () => {
    it('passes through native li attributes', () => {
      const wrapper = mount(FdsListItem, {
        attrs: {
          id: 'test-item',
          'data-testid': 'list-item-component',
          'aria-label': 'Test item',
        },
      })

      expect(wrapper.attributes('id')).toBe('test-item')
      expect(wrapper.attributes('data-testid')).toBe('list-item-component')
      expect(wrapper.attributes('aria-label')).toBe('Test item')
    })

    it('combines role prop with other attributes', () => {
      const wrapper = mount(FdsListItem, {
        props: { role: 'none' },
        attrs: {
          'aria-hidden': 'true',
          'data-category': 'navigation',
        },
      })

      expect(wrapper.attributes('role')).toBe('none')
      expect(wrapper.attributes('aria-hidden')).toBe('true')
      expect(wrapper.attributes('data-category')).toBe('navigation')
    })

    it('handles custom event listeners', async () => {
      const clickHandler = vi.fn()
      const wrapper = mount(FdsListItem, {
        attrs: {
          onClick: clickHandler,
        },
      })

      await wrapper.trigger('click')
      expect(clickHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('maintains proper listitem role by default', () => {
      const wrapper = mount(FdsListItem)

      // Native li elements have implicit role="listitem"
      expect(wrapper.element.tagName).toBe('LI')
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('removes list semantics with role="none"', () => {
      const wrapper = mount(FdsListItem, {
        props: { role: 'none' },
      })

      expect(wrapper.attributes('role')).toBe('none')
    })

    it('supports ARIA attributes for enhanced accessibility', () => {
      const wrapper = mount(FdsListItem, {
        attrs: {
          'aria-current': 'page',
          'aria-describedby': 'item-description',
          'aria-expanded': 'false',
        },
      })

      expect(wrapper.attributes('aria-current')).toBe('page')
      expect(wrapper.attributes('aria-describedby')).toBe('item-description')
      expect(wrapper.attributes('aria-expanded')).toBe('false')
    })

    it('works correctly in navigation menus', () => {
      const wrapper = mount(FdsListItem, {
        props: { role: 'none' },
        attrs: {
          'aria-label': 'Navigation item',
        },
        slots: {
          default: '<a href="#" role="menuitem">Menu Item</a>',
        },
      })

      expect(wrapper.attributes('role')).toBe('none')
      expect(wrapper.attributes('aria-label')).toBe('Navigation item')
      expect(wrapper.find('a').attributes('role')).toBe('menuitem')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slot gracefully', () => {
      const wrapper = mount(FdsListItem, {
        slots: { default: '' },
      })

      expect(wrapper.element.tagName).toBe('LI')
      expect(wrapper.text()).toBe('')
    })

    it('handles boolean props correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          flex: true,
          justifyBetween: false,
        },
      })

      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).not.toContain('justify-content-between')
    })

    it('handles all props set to default values', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          variant: null,
          role: null,
          flex: false,
          justifyBetween: false,
        },
      })

      expect(wrapper.element.tagName).toBe('LI')
      expect(wrapper.attributes('role')).toBeUndefined()

      const classes = wrapper.classes()
      expect(classes).not.toContain('current')
      expect(classes).not.toContain('active')
      expect(classes).not.toContain('disabled')
      expect(classes).not.toContain('d-flex')
      expect(classes).not.toContain('justify-content-between')
    })

    it('maintains reactivity when all props change', async () => {
      const wrapper = mount(FdsListItem, {
        props: {
          variant: 'current',
          role: null,
          flex: false,
          justifyBetween: false,
        },
      })

      expect(wrapper.classes()).toContain('current')
      expect(wrapper.attributes('role')).toBeUndefined()

      await wrapper.setProps({
        variant: 'disabled',
        role: 'none',
        flex: true,
        justifyBetween: true,
      })

      expect(wrapper.classes()).not.toContain('current')
      expect(wrapper.classes()).toContain('disabled')
      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).toContain('justify-content-between')
      expect(wrapper.attributes('role')).toBe('none')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('applies DKFDS current state correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: 'current' },
      })

      expect(wrapper.classes()).toContain('current')
    })

    it('applies DKFDS active state correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: 'active' },
      })

      expect(wrapper.classes()).toContain('active')
    })

    it('applies DKFDS disabled state correctly', () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: 'disabled' },
      })

      expect(wrapper.classes()).toContain('disabled')
    })

    it('supports DKFDS flexbox utilities', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          flex: true,
          justifyBetween: true,
        },
      })

      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).toContain('justify-content-between')
    })

    it('supports removing list semantics with role="none"', () => {
      const wrapper = mount(FdsListItem, {
        props: { role: 'none' },
      })

      expect(wrapper.attributes('role')).toBe('none')
    })
  })

  describe('Integration Scenarios', () => {
    it('works correctly in navigation lists', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          role: 'none',
          variant: 'current',
        },
        slots: {
          default: '<a href="/current" aria-current="page">Current Page</a>',
        },
      })

      expect(wrapper.attributes('role')).toBe('none')
      expect(wrapper.classes()).toContain('current')

      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('/current')
      expect(link.attributes('aria-current')).toBe('page')
      expect(link.text()).toBe('Current Page')
    })

    it('works correctly in content lists with flex layout', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          flex: true,
          justifyBetween: true,
          variant: 'active',
        },
        slots: {
          default: `
            <span>Item name</span>
            <span class="item-action">
              <button>Edit</button>
            </span>
          `,
        },
      })

      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).toContain('justify-content-between')
      expect(wrapper.classes()).toContain('active')

      const spans = wrapper.findAll('span')
      expect(spans).toHaveLength(2)
      expect(spans[0].text()).toBe('Item name')
      expect(wrapper.find('button').text()).toBe('Edit')
    })

    it('works correctly in step lists', () => {
      const wrapper = mount(FdsListItem, {
        props: { variant: 'disabled' },
        attrs: {
          'aria-disabled': 'true',
          'aria-describedby': 'step-help',
        },
        slots: {
          default: 'Step 3: Complete final review (not yet available)',
        },
      })

      expect(wrapper.classes()).toContain('disabled')
      expect(wrapper.attributes('aria-disabled')).toBe('true')
      expect(wrapper.attributes('aria-describedby')).toBe('step-help')
      expect(wrapper.text()).toContain('Step 3: Complete final review')
    })

    it('works with interactive content', async () => {
      const buttonClick = vi.fn()
      const linkClick = vi.fn()

      const wrapper = mount(FdsListItem, {
        props: {
          flex: true,
          justifyBetween: true,
        },
        slots: {
          default: `
            <a href="/item" @click="linkClick">View Item</a>
            <button @click="buttonClick">Delete</button>
          `,
        },
        global: {
          mocks: {
            linkClick,
            buttonClick,
          },
        },
      })

      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).toContain('justify-content-between')

      const link = wrapper.find('a')
      const button = wrapper.find('button')

      expect(link.text()).toBe('View Item')
      expect(button.text()).toBe('Delete')

      // Test that interactive elements are accessible
      expect(link.attributes('href')).toBe('/item')
    })
  })

  describe('Real-world Usage Patterns', () => {
    it('works as breadcrumb item', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          role: 'none',
          flex: true,
        },
        slots: {
          default: `
            <a href="/level1">Level 1</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Current Page</span>
          `,
        },
      })

      expect(wrapper.attributes('role')).toBe('none')
      expect(wrapper.classes()).toContain('d-flex')

      const link = wrapper.find('a')
      const currentSpan = wrapper.find('[aria-current="page"]')

      expect(link.text()).toBe('Level 1')
      expect(currentSpan.text()).toBe('Current Page')
    })

    it('works as file list item with metadata', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          flex: true,
          justifyBetween: true,
        },
        slots: {
          default: `
            <div>
              <strong>document.pdf</strong>
              <br>
              <small class="text-muted">Added 2 days ago</small>
            </div>
            <div class="file-actions">
              <span class="file-size">2.5 MB</span>
              <button aria-label="Download document.pdf">⬇️</button>
            </div>
          `,
        },
      })

      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).toContain('justify-content-between')

      expect(wrapper.find('strong').text()).toBe('document.pdf')
      expect(wrapper.find('.text-muted').text()).toBe('Added 2 days ago')
      expect(wrapper.find('.file-size').text()).toBe('2.5 MB')
      expect(wrapper.find('button').attributes('aria-label')).toBe('Download document.pdf')
    })

    it('works as status list item', () => {
      const wrapper = mount(FdsListItem, {
        props: {
          variant: 'current',
          flex: true,
          justifyBetween: true,
        },
        attrs: {
          'aria-current': 'step',
        },
        slots: {
          default: `
            <div>
              <strong>Step 2: Review Information</strong>
              <div class="step-description">Please review the information you provided</div>
            </div>
            <div class="step-status">
              <span class="badge badge-info">Current</span>
            </div>
          `,
        },
      })

      expect(wrapper.classes()).toContain('current')
      expect(wrapper.classes()).toContain('d-flex')
      expect(wrapper.classes()).toContain('justify-content-between')
      expect(wrapper.attributes('aria-current')).toBe('step')

      expect(wrapper.find('strong').text()).toBe('Step 2: Review Information')
      expect(wrapper.find('.step-description').text()).toBe(
        'Please review the information you provided',
      )
      expect(wrapper.find('.badge').text()).toBe('Current')
    })
  })
})
