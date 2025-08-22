import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import FdsAccordion from "../../components/data-display/fds-accordion.vue"
import { testAccessibility } from '../../test-utils'

describe('FdsAccordion', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as ul element when standalone', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(wrapper.find('ul').classes()).toContain('accordion')
      expect(wrapper.find('li').exists()).toBe(true)
    })

    it('renders as li element when in group', () => {
      const wrapper = mount(FdsAccordion, {
        global: {
          provide: {
            'accordion-group-api': {
              register: () => {},
              unregister: () => {},
              getState: () => false,
            },
          },
        },
      })
      expect(wrapper.find('li').exists()).toBe(true)
      expect(wrapper.find('ul').exists()).toBe(false)
    })

    it('renders default header tag as h2', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.find('h2').exists()).toBe(true)
    })

    it('renders accordion button with correct attributes', () => {
      const wrapper = mount(FdsAccordion)
      const button = wrapper.find('button')

      expect(button.exists()).toBe(true)
      expect(button.classes()).toContain('accordion-button')
      expect(button.attributes('aria-expanded')).toBeDefined()
      expect(button.attributes('aria-controls')).toBeDefined()
      expect(button.attributes('id')).toBeDefined()
    })

    it('renders accordion content with correct attributes', () => {
      const wrapper = mount(FdsAccordion)
      const content = wrapper.find('.accordion-content')

      expect(content.exists()).toBe(true)
      expect(content.attributes('id')).toBeDefined()
      expect(content.attributes('aria-hidden')).toBeDefined()
    })

    it('renders accordion-title span', () => {
      const wrapper = mount(FdsAccordion, {
        props: { header: 'Test Header' },
      })
      const titleSpan = wrapper.find('.accordion-title')

      expect(titleSpan.exists()).toBe(true)
      expect(titleSpan.text()).toBe('Test Header')
    })
  })

  describe('Props', () => {
    it('renders header text when provided', () => {
      const wrapper = mount(FdsAccordion, {
        props: { header: 'Test Accordion Header' },
      })

      expect(wrapper.find('.accordion-title').text()).toBe('Test Accordion Header')
    })

    it('handles undefined header prop', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.find('.accordion-title').text()).toBe('')
    })

    it('respects modelValue for initial expanded state', () => {
      const wrapper = mount(FdsAccordion, {
        props: { modelValue: true },
      })

      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
      expect(wrapper.find('.accordion-content').attributes('aria-hidden')).toBe('false')
    })

    it('renders with custom header tag', () => {
      const wrapper = mount(FdsAccordion, {
        props: { headerTag: 'h3' },
      })

      expect(wrapper.find('h3').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(false)
    })

    it('renders success variant with icon', () => {
      const wrapper = mount(FdsAccordion, {
        props: { variant: 'success' },
      })

      const icon = wrapper.find('.accordion-icon')
      expect(icon.exists()).toBe(true)
      expect(wrapper.find('.accordion-button').classes()).toContain('accordion-success')
      expect(wrapper.find('use').attributes('href')).toBe('#check-circle')
    })

    it('renders warning variant with icon', () => {
      const wrapper = mount(FdsAccordion, {
        props: { variant: 'warning' },
      })

      expect(wrapper.find('.accordion-button').classes()).toContain('accordion-warning')
      expect(wrapper.find('use').attributes('href')).toBe('#report-problem')
    })

    it('renders error variant with icon', () => {
      const wrapper = mount(FdsAccordion, {
        props: { variant: 'error' },
      })

      expect(wrapper.find('.accordion-button').classes()).toContain('accordion-error')
      expect(wrapper.find('use').attributes('href')).toBe('#highlight-off')
    })

    it('renders default variant text when variant is set', () => {
      const wrapper = mount(FdsAccordion, {
        props: { variant: 'error' },
      })

      expect(wrapper.find('.icon_text').text()).toBe('Fejl')
    })

    it('renders custom variant text', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'success',
          variantText: 'Custom Success',
        },
      })

      expect(wrapper.find('.icon_text').text()).toBe('Custom Success')
    })

    it('does not render icon for null variant', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.find('.accordion-icon').exists()).toBe(false)
    })

    it('uses provided id for generating element ids', () => {
      const wrapper = mount(FdsAccordion, {
        props: { id: 'my-accordion' },
      })

      const button = wrapper.find('button')
      const panel = wrapper.find('.accordion-content')

      expect(button.attributes('id')).toContain('my-accordion')
      expect(panel.attributes('id')).toContain('my-accordion')
      expect(button.attributes('aria-controls')).toBe(panel.attributes('id'))
    })
  })

  describe('Events', () => {
    it('toggles expanded state when button is clicked', async () => {
      const wrapper = mount(FdsAccordion, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('emits fds.accordion.open event when opening', async () => {
      const wrapper = mount(FdsAccordion, {
        props: { modelValue: false },
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('fds.accordion.open')).toBeTruthy()
    })

    it('emits fds.accordion.close event when closing', async () => {
      const wrapper = mount(FdsAccordion, {
        props: { modelValue: true },
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('fds.accordion.close')).toBeTruthy()
    })
  })

  describe('v-model binding', () => {
    it('updates when v-model changes externally', async () => {
      const wrapper = mount(FdsAccordion, {
        props: { modelValue: false },
      })

      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')

      await wrapper.setProps({ modelValue: true })

      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('maintains two-way binding', async () => {
      const TestComponent = {
        template: `
          <ul class="accordion">
            <FdsAccordion v-model="expanded" header="Test" />
          </ul>
        `,
        components: { FdsAccordion },
        data() {
          return { expanded: false }
        },
      }

      const wrapper = mount(TestComponent)
      const button = wrapper.find('button')

      expect(wrapper.vm.expanded).toBe(false)

      await button.trigger('click')

      expect(wrapper.vm.expanded).toBe(true)
    })
  })

  describe('Slots', () => {
    it('renders default slot content in accordion content area', () => {
      const wrapper = mount(FdsAccordion, {
        slots: {
          default: '<p>Test content</p>',
        },
      })

      expect(wrapper.find('.accordion-content p').exists()).toBe(true)
      expect(wrapper.find('.accordion-content').text()).toBe('Test content')
    })

    it('renders header slot content', () => {
      const wrapper = mount(FdsAccordion, {
        slots: {
          header: '<span class="custom">Custom Header</span>',
        },
      })

      expect(wrapper.find('.accordion-title .custom').exists()).toBe(true)
      expect(wrapper.find('.accordion-title').text()).toBe('Custom Header')
    })

    it('prioritizes header slot over header prop', () => {
      const wrapper = mount(FdsAccordion, {
        props: { header: 'Prop Header' },
        slots: {
          header: 'Slot Header',
        },
      })

      expect(wrapper.find('.accordion-title').text()).toBe('Slot Header')
    })
  })

  describe('Accessibility', () => {
    it('maintains correct ARIA attributes for collapsed state', () => {
      const wrapper = mount(FdsAccordion, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')
      const content = wrapper.find('.accordion-content')

      expect(button.attributes('aria-expanded')).toBe('false')
      expect(content.attributes('aria-hidden')).toBe('true')
    })

    it('maintains correct ARIA attributes for expanded state', () => {
      const wrapper = mount(FdsAccordion, {
        props: { modelValue: true },
      })

      const button = wrapper.find('button')
      const content = wrapper.find('.accordion-content')

      expect(button.attributes('aria-expanded')).toBe('true')
      expect(content.attributes('aria-hidden')).toBe('false')
    })

    it('links button and content with ARIA attributes', () => {
      const wrapper = mount(FdsAccordion)

      const button = wrapper.find('button')
      const content = wrapper.find('.accordion-content')

      expect(button.attributes('aria-controls')).toBe(content.attributes('id'))
    })

    it('passes accessibility tests when used in proper structure', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsAccordion header="Accessible Accordion" :modelValue="true">
              <p>This is accessible content within the accordion.</p>
            </FdsAccordion>
          </main>
        `,
        components: { FdsAccordion },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty string header', () => {
      const wrapper = mount(FdsAccordion, {
        props: { header: '' },
      })

      expect(wrapper.find('.accordion-title').text()).toBe('')
    })

    it('handles empty string variantText', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'success',
          variantText: '',
        },
      })

      expect(wrapper.find('.icon_text').text()).toBe('Success')
    })

    it('generates unique IDs for multiple instances', () => {
      const wrapper1 = mount(FdsAccordion)
      const wrapper2 = mount(FdsAccordion)

      const id1 = wrapper1.find('button').attributes('id')
      const id2 = wrapper2.find('button').attributes('id')

      expect(id1).not.toBe(id2)
    })
  })

  describe('Integration with Accordion Group', () => {
    it('registers with group API when mounted', async () => {
      const registerFn = vi.fn()
      const unregisterFn = vi.fn()

      const wrapper = mount(FdsAccordion, {
        props: {
          header: 'Test Accordion',
          modelValue: false,
        },
        global: {
          provide: {
            'accordion-group-api': {
              register: registerFn,
              unregister: unregisterFn,
              getState: () => false,
            },
          },
        },
      })

      // Should have called register on mount
      expect(registerFn).toHaveBeenCalled()

      // Unmount and check unregister was called
      wrapper.unmount()
      expect(unregisterFn).toHaveBeenCalled()
    })

    it('uses group state when available', async () => {
      const groupState = ref(true)

      const wrapper = mount(FdsAccordion, {
        props: {
          header: 'Test Accordion',
          modelValue: false,
        },
        global: {
          provide: {
            'accordion-group-api': {
              register: () => {},
              unregister: () => {},
              getState: () => groupState.value,
            },
          },
        },
      })

      // Should use group state instead of local state
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })
  })
})
