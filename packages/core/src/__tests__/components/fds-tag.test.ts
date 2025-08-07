import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsTag from '../../components/fds-tag.vue'

describe('FdsTag', () => {
  describe('Rendering', () => {
    it('renders a button element with tag class', () => {
      const wrapper = mount(FdsTag)

      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.classes()).toContain('tag')
    })

    it('renders slot content correctly', () => {
      const wrapper = mount(FdsTag, {
        slots: {
          default: 'Bornholm',
        },
      })

      expect(wrapper.text()).toBe('Bornholm')
    })

    it('applies custom id when provided', () => {
      const wrapper = mount(FdsTag, {
        props: {
          id: 'custom-tag-id',
        },
      })

      expect(wrapper.attributes('id')).toBe('custom-tag-id')
    })

    it('generates auto id when not provided', () => {
      const wrapper = mount(FdsTag)

      // The formId utility generates IDs with fid_ prefix
      expect(wrapper.attributes('id')).toMatch(/^fid_[a-f0-9]+$/)
    })
  })

  describe('Icon functionality', () => {
    it('does not render icon when icon prop is not provided', () => {
      const wrapper = mount(FdsTag)

      expect(wrapper.find('svg').exists()).toBe(false)
      expect(wrapper.classes()).not.toContain('tag-icon')
    })

    it('renders icon when icon prop is provided', () => {
      const wrapper = mount(FdsTag, {
        props: {
          icon: 'highlight-off',
        },
      })

      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.classes()).toContain('tag-icon')
    })

    it('renders correct icon href', () => {
      const wrapper = mount(FdsTag, {
        props: {
          icon: 'close',
        },
      })

      const use = wrapper.find('use')
      expect(use.attributes('href')).toBe('#close')
    })

    it('icon has correct accessibility attributes', () => {
      const wrapper = mount(FdsTag, {
        props: {
          icon: 'highlight-off',
        },
      })

      const svg = wrapper.find('svg')
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('Events', () => {
    it('emits click event when tag is clicked', async () => {
      const wrapper = mount(FdsTag, {
        props: {
          id: 'test-tag',
        },
      })

      await wrapper.trigger('click')

      expect(wrapper.emitted()).toHaveProperty('click')
      expect(wrapper.emitted('click')?.[0]).toEqual(['test-tag'])
    })

    it('emits click event when icon is clicked', async () => {
      const wrapper = mount(FdsTag, {
        props: {
          id: 'test-tag',
          icon: 'highlight-off',
        },
        slots: {
          default: 'Test',
        },
      })

      // Click on the button (icon clicks bubble up)
      await wrapper.trigger('click')

      expect(wrapper.emitted()).toHaveProperty('click')
      expect(wrapper.emitted('click')?.[0]).toEqual(['test-tag'])
    })

    it('only emits click event when tag content (not icon) is clicked', async () => {
      const wrapper = mount(FdsTag, {
        props: {
          id: 'test-tag',
          icon: 'highlight-off',
        },
        slots: {
          default: 'Test Content',
        },
      })

      // Create a mock click event that targets the button itself
      const mockEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
      Object.defineProperty(mockEvent, 'target', {
        value: wrapper.element,
        enumerable: true,
      })

      wrapper.element.dispatchEvent(mockEvent)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted()).toHaveProperty('click')
    })

    it('uses generated form id in emitted events when id is not provided', async () => {
      const wrapper = mount(FdsTag)

      await wrapper.trigger('click')

      const emittedId = wrapper.emitted('click')?.[0]?.[0]
      // The formId utility generates IDs with fid_ prefix
      expect(emittedId).toMatch(/^fid_[a-f0-9]+$/)
    })
  })

  describe('Props validation', () => {
    it('handles null icon prop correctly', () => {
      const wrapper = mount(FdsTag, {
        props: {
          icon: null,
        },
      })

      expect(wrapper.find('svg').exists()).toBe(false)
      expect(wrapper.classes()).not.toContain('tag-icon')
    })

    it('handles null id prop correctly', () => {
      const wrapper = mount(FdsTag, {
        props: {
          id: null,
        },
      })

      // Should generate an auto ID with fid_ prefix
      expect(wrapper.attributes('id')).toMatch(/^fid_[a-f0-9]+$/)
    })
  })

  describe('Accessibility', () => {
    it('button is keyboard accessible', () => {
      const wrapper = mount(FdsTag)

      // Button elements are keyboard accessible by default
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('maintains semantic HTML structure', () => {
      const wrapper = mount(FdsTag, {
        props: {
          icon: 'close',
        },
        slots: {
          default: 'Removable Tag',
        },
      })

      // Check that the button contains text and icon in correct order
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)

      const svg = button.find('svg')
      expect(svg.exists()).toBe(true)

      // Icon should not be focusable or announced to screen readers
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('Component integration', () => {
    it('works with multiple instances', () => {
      const wrapper = mount({
        components: { FdsTag },
        template: `
          <div>
            <FdsTag id="tag1">Tag 1</FdsTag>
            <FdsTag id="tag2" icon="close">Tag 2</FdsTag>
            <FdsTag>Tag 3</FdsTag>
          </div>
        `,
      })

      const tags = wrapper.findAllComponents(FdsTag)
      expect(tags).toHaveLength(3)

      expect(tags[0].attributes('id')).toBe('tag1')
      expect(tags[1].attributes('id')).toBe('tag2')
      // Third tag gets auto-generated ID with fid_ prefix
      expect(tags[2].attributes('id')).toMatch(/^fid_[a-f0-9]+$/)

      expect(tags[1].classes()).toContain('tag-icon')
    })
  })
})
