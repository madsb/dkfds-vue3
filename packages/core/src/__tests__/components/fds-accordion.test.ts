import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsAccordion from '../../components/fds-accordion.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsAccordion', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as div by default when not in group', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('accordion')
    })

    it('renders default header tag as h2', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.find('h2').exists()).toBe(true)
    })

    it('renders accordion button with correct attributes', () => {
      const wrapper = mount(FdsAccordion)
      const button = wrapper.find('button.accordion-button')

      expect(button.exists()).toBe(true)
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(button.attributes('aria-controls')).toMatch(/^acc_/)
      expect(button.attributes('id')).toBeDefined()
    })

    it('renders accordion content region with correct attributes', () => {
      const wrapper = mount(FdsAccordion)
      const content = wrapper.find('.accordion-content')
      const buttonId = wrapper.find('button').attributes('id')

      expect(content.exists()).toBe(true)
      expect(content.attributes('role')).toBe('region')
      expect(content.attributes('aria-hidden')).toBe('true')
      expect(content.attributes('aria-labelledby')).toBe(buttonId)
      expect(content.attributes('id')).toBe(`acc_${buttonId}`)
    })
  })

  describe('Props', () => {
    it('renders header text when provided', () => {
      const wrapper = mount(FdsAccordion, {
        props: { header: 'Test Accordion Header' },
      })

      expect(wrapper.find('button').text()).toContain('Test Accordion Header')
    })

    it('handles null header prop', () => {
      const wrapper = mount(FdsAccordion, {
        props: { header: null },
      })

      expect(wrapper.find('button').text()).toBe('')
    })

    it('renders accordion as expanded when expanded prop is true', () => {
      const wrapper = mount(FdsAccordion, {
        props: { expanded: true },
      })

      const button = wrapper.find('button')
      const content = wrapper.find('.accordion-content')

      expect(button.attributes('aria-expanded')).toBe('true')
      expect(content.attributes('aria-hidden')).toBe('false')
    })

    it('renders with custom header tag', () => {
      const wrapper = mount(FdsAccordion, {
        props: { headerTag: 'h4' },
      })

      expect(wrapper.find('h4').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(false)
    })

    it('renders success variant with icon', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'success',
          header: 'Success Header',
        },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('accordion-success')

      const icon = wrapper.find('.accordion-icon')
      expect(icon.exists()).toBe(true)

      const svg = icon.find('svg')
      expect(svg.find('use').attributes('href')).toBe('#check-circle')
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })

    it('renders warning variant with icon', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'warning',
          header: 'Warning Header',
        },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('accordion-warning')

      const use = wrapper.find('use')
      expect(use.attributes('href')).toBe('#report-problem')
    })

    it('renders error variant with icon', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'error',
          header: 'Error Header',
        },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('accordion-error')

      const use = wrapper.find('use')
      expect(use.attributes('href')).toBe('#highlight-off')
    })

    it('renders default variant text when variant is set', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'warning',
          header: 'Test',
        },
      })

      const iconText = wrapper.find('.icon_text')
      expect(iconText.text()).toBe('Advarsel')
    })

    it('renders custom variant text', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'error',
          variantText: 'Custom Error Text',
          header: 'Test',
        },
      })

      const iconText = wrapper.find('.icon_text')
      expect(iconText.text()).toBe('Custom Error Text')
    })

    it('does not render icon for null variant', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: null,
          header: 'Test Header',
        },
      })

      expect(wrapper.find('.accordion-icon').exists()).toBe(false)
    })
  })

  describe('Events', () => {
    it('toggles expanded state when button is clicked', async () => {
      const wrapper = mount(FdsAccordion, {
        props: { expanded: false },
      })

      const button = wrapper.find('button')

      // Initial state
      expect(button.attributes('aria-expanded')).toBe('false')

      // Click to expand
      await button.trigger('click')
      expect(button.attributes('aria-expanded')).toBe('true')
      expect(wrapper.find('.accordion-content').attributes('aria-hidden')).toBe('false')

      // Click to collapse
      await button.trigger('click')
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(wrapper.find('.accordion-content').attributes('aria-hidden')).toBe('true')
    })

    it('emits accordion-toggle event with correct payload', async () => {
      const wrapper = mount(FdsAccordion, {
        props: { expanded: false },
      })

      const button = wrapper.find('button')

      // Click to expand
      await button.trigger('click')
      expect(wrapper.emitted('accordion-toggle')?.[0]).toEqual([true])

      // Click to collapse
      await button.trigger('click')
      expect(wrapper.emitted('accordion-toggle')?.[1]).toEqual([false])
    })
  })

  describe('Slots', () => {
    it('renders default slot content in accordion content area', () => {
      const wrapper = mount(FdsAccordion, {
        slots: {
          default: '<p>Accordion content goes here</p>',
        },
      })

      const content = wrapper.find('.accordion-content')
      expect(content.find('p').text()).toBe('Accordion content goes here')
    })

    it('renders header slot content', () => {
      const wrapper = mount(FdsAccordion, {
        slots: {
          header: '<span class="custom-header">Custom Header Content</span>',
        },
      })

      const button = wrapper.find('button')
      expect(button.find('.custom-header').text()).toBe('Custom Header Content')
    })

    it('prioritizes header slot over header prop', () => {
      const wrapper = mount(FdsAccordion, {
        props: { header: 'Prop Header' },
        slots: {
          header: '<span>Slot Header</span>',
        },
      })

      const button = wrapper.find('button')
      expect(button.text()).toContain('Slot Header')
      expect(button.text()).not.toContain('Prop Header')
    })
  })

  describe('Accessibility', () => {
    it('maintains correct ARIA attributes for collapsed state', () => {
      const wrapper = mount(FdsAccordion, {
        props: { expanded: false },
      })

      const button = wrapper.find('button')
      const content = wrapper.find('.accordion-content')

      expect(button.attributes('aria-expanded')).toBe('false')
      expect(content.attributes('aria-hidden')).toBe('true')
    })

    it('maintains correct ARIA attributes for expanded state', () => {
      const wrapper = mount(FdsAccordion, {
        props: { expanded: true },
      })

      const button = wrapper.find('button')
      const content = wrapper.find('.accordion-content')

      expect(button.attributes('aria-expanded')).toBe('true')
      expect(content.attributes('aria-hidden')).toBe('false')
    })

    it('links button and content region with ARIA attributes', () => {
      const wrapper = mount(FdsAccordion)

      const button = wrapper.find('button')
      const content = wrapper.find('.accordion-content')
      const buttonId = button.attributes('id')

      expect(button.attributes('aria-controls')).toBe(`acc_${buttonId}`)
      expect(content.attributes('id')).toBe(`acc_${buttonId}`)
      expect(content.attributes('aria-labelledby')).toBe(buttonId)
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsAccordion header="Test Accordion" expanded>
              <p>Accordion content for testing</p>
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

      expect(wrapper.find('button').text()).toBe('')
    })

    it('handles empty string variantText', () => {
      const wrapper = mount(FdsAccordion, {
        props: {
          variant: 'success',
          variantText: '',
          header: 'Test',
        },
      })

      // Should fall back to default text
      const iconText = wrapper.find('.icon_text')
      expect(iconText.text()).toBe('Success')
    })

    it('handles undefined header prop (default)', () => {
      const wrapper = mount(FdsAccordion)
      expect(wrapper.find('button').text()).toBe('')
    })

    it('generates unique IDs for multiple instances', () => {
      const wrapper1 = mount(FdsAccordion)
      const wrapper2 = mount(FdsAccordion)

      const id1 = wrapper1.find('button').attributes('id')
      const id2 = wrapper2.find('button').attributes('id')

      expect(id1).toBeDefined()
      expect(id2).toBeDefined()
      expect(id1).not.toBe(id2)
    })
  })

  describe('Integration', () => {
    it('works within accordion group context', async () => {
      const { ref } = await import('vue')
      const groupExpanded = ref(false)

      const wrapper = mount(FdsAccordion, {
        global: {
          provide: {
            provideGroupExpanded: groupExpanded,
          },
        },
      })

      // Should render as li when in group
      expect(wrapper.element.tagName).toBe('LI')
      expect(wrapper.classes()).not.toContain('accordion')
    })

    it('responds to group expand/collapse signals', async () => {
      const { ref, nextTick } = await import('vue')
      const groupExpanded = ref(false)

      const wrapper = mount(FdsAccordion, {
        props: { expanded: false },
        global: {
          provide: {
            provideGroupExpanded: groupExpanded,
          },
        },
      })

      const button = wrapper.find('button')

      // Initial state
      expect(button.attributes('aria-expanded')).toBe('false')

      // Group expands all
      groupExpanded.value = true
      await nextTick()

      expect(button.attributes('aria-expanded')).toBe('true')
      expect(wrapper.emitted('accordion-toggle')?.[0]).toEqual([true])
    })

    it('works in a form context', () => {
      const FormWrapper = {
        template: `
          <form>
            <FdsAccordion header="Form Section">
              <input type="text" name="test" />
              <button type="submit">Submit</button>
            </FdsAccordion>
          </form>
        `,
        components: { FdsAccordion },
      }

      const wrapper = mount(FormWrapper)
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.find('.accordion-content input').exists()).toBe(true)
    })
  })
})
