import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsList from '../../components/fds-list.vue'
import FdsListItem from '../../components/fds-list-item.vue'

describe('FdsList', () => {
  describe('Rendering', () => {
    it('renders unordered list by default', () => {
      const wrapper = mount(FdsList)

      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.find('ol').exists()).toBe(false)
    })

    it('renders without errors', () => {
      expect(() => mount(FdsList)).not.toThrow()
    })

    it('renders slot content correctly', () => {
      const wrapper = mount(FdsList, {
        slots: {
          default: '<li>Test item</li>',
        },
      })

      expect(wrapper.html()).toContain('<li>Test item</li>')
    })

    it('renders with complex slot content', () => {
      const wrapper = mount(FdsList, {
        slots: {
          default: `
            <li>Item 1</li>
            <li>Item 2</li>
            <li><strong>Bold item</strong></li>
          `,
        },
      })

      expect(wrapper.text()).toContain('Item 1')
      expect(wrapper.text()).toContain('Item 2')
      expect(wrapper.find('strong').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('Bold item')
    })
  })

  describe('Ordered Lists', () => {
    it('renders ordered list when ordered prop is true', () => {
      const wrapper = mount(FdsList, {
        props: { ordered: true },
      })

      expect(wrapper.element.tagName).toBe('OL')
      expect(wrapper.find('ul').exists()).toBe(false)
    })

    it('renders unordered list when ordered prop is false', () => {
      const wrapper = mount(FdsList, {
        props: { ordered: false },
      })

      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.find('ol').exists()).toBe(false)
    })

    it('can toggle between ordered and unordered dynamically', async () => {
      const wrapper = mount(FdsList, {
        props: { ordered: false },
      })

      expect(wrapper.element.tagName).toBe('UL')

      await wrapper.setProps({ ordered: true })
      expect(wrapper.element.tagName).toBe('OL')

      await wrapper.setProps({ ordered: false })
      expect(wrapper.element.tagName).toBe('UL')
    })
  })

  describe('Variant Props', () => {
    const variants = ['bordered', 'unstyled', 'nobullet', 'overflow']

    variants.forEach((variant) => {
      it(`applies ${variant} variant class correctly`, () => {
        const wrapper = mount(FdsList, {
          props: { variant: variant as any },
        })

        expect(wrapper.classes()).toContain(`${variant}-list`)
      })
    })

    it('does not apply variant class when variant is null', () => {
      const wrapper = mount(FdsList, {
        props: { variant: null },
      })

      const classes = wrapper.classes()
      expect(classes.some((cls) => cls.endsWith('-list'))).toBe(false)
    })

    it('can change variant dynamically', async () => {
      const wrapper = mount(FdsList, {
        props: { variant: 'bordered' },
      })

      expect(wrapper.classes()).toContain('bordered-list')

      await wrapper.setProps({ variant: 'unstyled' })
      expect(wrapper.classes()).not.toContain('bordered-list')
      expect(wrapper.classes()).toContain('unstyled-list')

      await wrapper.setProps({ variant: null })
      expect(wrapper.classes()).not.toContain('unstyled-list')
    })
  })

  describe('Margin Props', () => {
    it('applies margin top 0 class when noTopMargin is true', () => {
      const wrapper = mount(FdsList, {
        props: { noTopMargin: true },
      })

      expect(wrapper.classes()).toContain('mt-0')
    })

    it('applies margin bottom 0 class when noBottomMargin is true', () => {
      const wrapper = mount(FdsList, {
        props: { noBottomMargin: true },
      })

      expect(wrapper.classes()).toContain('mb-0')
    })

    it('applies both margin classes when both props are true', () => {
      const wrapper = mount(FdsList, {
        props: {
          noTopMargin: true,
          noBottomMargin: true,
        },
      })

      expect(wrapper.classes()).toContain('mt-0')
      expect(wrapper.classes()).toContain('mb-0')
    })

    it('does not apply margin classes by default', () => {
      const wrapper = mount(FdsList)

      expect(wrapper.classes()).not.toContain('mt-0')
      expect(wrapper.classes()).not.toContain('mb-0')
    })

    it('can toggle margin classes dynamically', async () => {
      const wrapper = mount(FdsList, {
        props: {
          noTopMargin: false,
          noBottomMargin: false,
        },
      })

      expect(wrapper.classes()).not.toContain('mt-0')
      expect(wrapper.classes()).not.toContain('mb-0')

      await wrapper.setProps({ noTopMargin: true })
      expect(wrapper.classes()).toContain('mt-0')

      await wrapper.setProps({ noBottomMargin: true })
      expect(wrapper.classes()).toContain('mb-0')

      await wrapper.setProps({ noTopMargin: false, noBottomMargin: false })
      expect(wrapper.classes()).not.toContain('mt-0')
      expect(wrapper.classes()).not.toContain('mb-0')
    })
  })

  describe('Class Computation', () => {
    it('combines multiple classes correctly', () => {
      const wrapper = mount(FdsList, {
        props: {
          variant: 'bordered',
          noTopMargin: true,
          noBottomMargin: true,
        },
      })

      const classes = wrapper.classes()
      expect(classes).toContain('bordered-list')
      expect(classes).toContain('mt-0')
      expect(classes).toContain('mb-0')
    })

    it('handles empty class string when no props are set', () => {
      const wrapper = mount(FdsList)

      // The class attribute should either be empty or not present
      const classAttribute = wrapper.attributes('class')
      expect(classAttribute === '' || classAttribute === undefined).toBe(true)
    })

    it('maintains correct class order', () => {
      const wrapper = mount(FdsList, {
        props: {
          variant: 'overflow',
          noTopMargin: true,
          noBottomMargin: true,
        },
      })

      const classString = wrapper.attributes('class')
      expect(classString).toBe('overflow-list mt-0 mb-0')
    })
  })

  describe('Attributes', () => {
    it('passes through native list attributes', () => {
      const wrapper = mount(FdsList, {
        attrs: {
          id: 'test-list',
          'data-testid': 'list-component',
          role: 'list',
        },
      })

      expect(wrapper.attributes('id')).toBe('test-list')
      expect(wrapper.attributes('data-testid')).toBe('list-component')
      expect(wrapper.attributes('role')).toBe('list')
    })

    it('passes attributes to ordered list correctly', () => {
      const wrapper = mount(FdsList, {
        props: { ordered: true },
        attrs: {
          start: '5',
          type: 'A',
          'aria-label': 'Ordered list',
        },
      })

      expect(wrapper.attributes('start')).toBe('5')
      expect(wrapper.attributes('type')).toBe('A')
      expect(wrapper.attributes('aria-label')).toBe('Ordered list')
    })

    it('passes attributes to unordered list correctly', () => {
      const wrapper = mount(FdsList, {
        props: { ordered: false },
        attrs: {
          'aria-labelledby': 'list-heading',
          'data-category': 'navigation',
        },
      })

      expect(wrapper.attributes('aria-labelledby')).toBe('list-heading')
      expect(wrapper.attributes('data-category')).toBe('navigation')
    })
  })

  describe('Accessibility', () => {
    it('maintains proper list semantics for unordered lists', () => {
      const wrapper = mount(FdsList)

      expect(wrapper.element.tagName).toBe('UL')
      // Native ul elements have implicit role="list"
    })

    it('maintains proper list semantics for ordered lists', () => {
      const wrapper = mount(FdsList, {
        props: { ordered: true },
      })

      expect(wrapper.element.tagName).toBe('OL')
      // Native ol elements have implicit role="list"
    })

    it('supports custom ARIA attributes', () => {
      const wrapper = mount(FdsList, {
        attrs: {
          'aria-label': 'Navigation menu',
          'aria-describedby': 'menu-description',
          role: 'menu',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Navigation menu')
      expect(wrapper.attributes('aria-describedby')).toBe('menu-description')
      expect(wrapper.attributes('role')).toBe('menu')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slot gracefully', () => {
      const wrapper = mount(FdsList, {
        slots: { default: '' },
      })

      expect(wrapper.element.tagName).toBe('UL')
      expect(wrapper.text()).toBe('')
    })

    it('handles undefined variant gracefully', () => {
      const wrapper = mount(FdsList, {
        props: { variant: undefined },
      })

      expect(wrapper.classes().some((cls) => cls.endsWith('-list'))).toBe(false)
    })

    it('handles boolean props correctly', () => {
      const wrapper = mount(FdsList, {
        props: {
          ordered: true,
          noTopMargin: true,
          noBottomMargin: false,
        },
      })

      expect(wrapper.element.tagName).toBe('OL')
      expect(wrapper.classes()).toContain('mt-0')
      expect(wrapper.classes()).not.toContain('mb-0')
    })
  })

  describe('Integration with FdsListItem', () => {
    it('works correctly with FdsListItem components', () => {
      const wrapper = mount(FdsList, {
        slots: {
          default: `
            <FdsListItem>Item 1</FdsListItem>
            <FdsListItem variant="current">Current item</FdsListItem>
            <FdsListItem variant="disabled">Disabled item</FdsListItem>
          `,
        },
        global: {
          components: {
            FdsListItem,
          },
        },
      })

      const listItems = wrapper.findAllComponents(FdsListItem)
      expect(listItems).toHaveLength(3)
      expect(listItems[0].text()).toBe('Item 1')
      expect(listItems[1].text()).toBe('Current item')
      expect(listItems[2].text()).toBe('Disabled item')
    })

    it('supports nested lists with list items', () => {
      const wrapper = mount({
        template: `
          <FdsList variant="bordered">
            <FdsListItem>
              Top level item
              <FdsList>
                <FdsListItem>Nested item 1</FdsListItem>
                <FdsListItem>Nested item 2</FdsListItem>
              </FdsList>
            </FdsListItem>
            <FdsListItem>Another top level</FdsListItem>
          </FdsList>
        `,
        components: {
          FdsList,
          FdsListItem,
        },
      })

      expect(wrapper.text()).toContain('Top level item')
      expect(wrapper.text()).toContain('Nested item 1')
      expect(wrapper.text()).toContain('Nested item 2')
      expect(wrapper.text()).toContain('Another top level')

      // Check for nested list structure
      const nestedList = wrapper.find('ul ul')
      expect(nestedList.exists()).toBe(true)
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('applies DKFDS bordered list styling correctly', () => {
      const wrapper = mount(FdsList, {
        props: { variant: 'bordered' },
      })

      expect(wrapper.classes()).toContain('bordered-list')
    })

    it('applies DKFDS unstyled list correctly', () => {
      const wrapper = mount(FdsList, {
        props: { variant: 'unstyled' },
      })

      expect(wrapper.classes()).toContain('unstyled-list')
    })

    it('applies DKFDS nobullet list correctly', () => {
      const wrapper = mount(FdsList, {
        props: { variant: 'nobullet' },
      })

      expect(wrapper.classes()).toContain('nobullet-list')
    })

    it('applies DKFDS overflow menu list correctly', () => {
      const wrapper = mount(FdsList, {
        props: { variant: 'overflow' },
      })

      expect(wrapper.classes()).toContain('overflow-list')
    })

    it('supports DKFDS margin utilities', () => {
      const wrapper = mount(FdsList, {
        props: {
          noTopMargin: true,
          noBottomMargin: true,
        },
      })

      expect(wrapper.classes()).toContain('mt-0')
      expect(wrapper.classes()).toContain('mb-0')
    })
  })

  describe('Real-world Usage Scenarios', () => {
    it('works as navigation menu', () => {
      const wrapper = mount(FdsList, {
        props: { variant: 'unstyled' },
        attrs: {
          role: 'menu',
          'aria-label': 'Main navigation',
        },
        slots: {
          default: `
            <FdsListItem role="none">
              <a href="#" role="menuitem">Home</a>
            </FdsListItem>
            <FdsListItem role="none">
              <a href="#" role="menuitem">About</a>
            </FdsListItem>
            <FdsListItem role="none">
              <a href="#" role="menuitem">Contact</a>
            </FdsListItem>
          `,
        },
        global: {
          components: { FdsListItem },
        },
      })

      expect(wrapper.attributes('role')).toBe('menu')
      expect(wrapper.attributes('aria-label')).toBe('Main navigation')
      expect(wrapper.classes()).toContain('unstyled-list')

      const links = wrapper.findAll('a')
      expect(links).toHaveLength(3)
      links.forEach((link) => {
        expect(link.attributes('role')).toBe('menuitem')
      })
    })

    it('works as ordered procedure list', () => {
      const wrapper = mount(FdsList, {
        props: {
          ordered: true,
          variant: 'bordered',
        },
        attrs: {
          'aria-label': 'Step-by-step procedure',
        },
        slots: {
          default: `
            <FdsListItem>First, gather all materials</FdsListItem>
            <FdsListItem variant="current">Next, prepare the workspace (current step)</FdsListItem>
            <FdsListItem variant="disabled">Finally, complete the task (not yet available)</FdsListItem>
          `,
        },
        global: {
          components: { FdsListItem },
        },
      })

      expect(wrapper.element.tagName).toBe('OL')
      expect(wrapper.classes()).toContain('bordered-list')
      expect(wrapper.attributes('aria-label')).toBe('Step-by-step procedure')

      const items = wrapper.findAllComponents(FdsListItem)
      expect(items[1].vm.variant).toBe('current')
      expect(items[2].vm.variant).toBe('disabled')
    })

    it('works as content list with mixed formatting', () => {
      const wrapper = mount(FdsList, {
        props: {
          variant: 'nobullet',
          noTopMargin: true,
        },
        slots: {
          default: `
            <FdsListItem flex justifyBetween>
              <span>Document 1</span>
              <span>2.5 MB</span>
            </FdsListItem>
            <FdsListItem flex justifyBetween>
              <span>Document 2</span>
              <span>1.8 MB</span>
            </FdsListItem>
            <FdsListItem flex justifyBetween variant="active">
              <span>Document 3 (Selected)</span>
              <span>3.2 MB</span>
            </FdsListItem>
          `,
        },
        global: {
          components: { FdsListItem },
        },
      })

      expect(wrapper.classes()).toContain('nobullet-list')
      expect(wrapper.classes()).toContain('mt-0')

      const flexItems = wrapper.findAllComponents(FdsListItem)
      expect(flexItems).toHaveLength(3)
      flexItems.forEach((item) => {
        expect(item.props('flex')).toBe(true)
        expect(item.props('justifyBetween')).toBe(true)
      })
      expect(flexItems[2].props('variant')).toBe('active')
    })
  })
})
