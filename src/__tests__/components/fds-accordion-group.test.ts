import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref, inject, onMounted } from 'vue'
import FdsAccordionGroup from "../../components/data-display/fds-accordion-group.vue"
import FdsAccordion from "../../components/data-display/fds-accordion.vue"
import { testAccessibility } from '../../test-utils'

describe('FdsAccordionGroup', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const _wrapper = mount(FdsAccordionGroup)
      expect(_wrapper.exists()).toBe(true)
    })

    it('renders with accordion-group class', () => {
      const _wrapper = mount(FdsAccordionGroup)
      expect(_wrapper.find('.accordion-group').exists()).toBe(true)
    })

    it('renders ul element with accordion class', () => {
      const _wrapper = mount(FdsAccordionGroup)
      const ul = _wrapper.find('ul')

      expect(ul.exists()).toBe(true)
      expect(ul.classes()).toContain('accordion')
    })

    it('renders bulk button by default', () => {
      const _wrapper = mount(FdsAccordionGroup)
      const button = _wrapper.find('button.accordion-bulk-button')

      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Åbn alle')
    })

    it('does not render bulk button when showBulkButton is false', () => {
      const _wrapper = mount(FdsAccordionGroup, {
        props: { showBulkButton: false },
      })

      expect(_wrapper.find('button.accordion-bulk-button').exists()).toBe(false)
    })

    it('renders slot content inside ul', () => {
      const _wrapper = mount(FdsAccordionGroup, {
        slots: {
          default: '<li>Test Item</li>',
        },
      })

      expect(_wrapper.find('ul.accordion').html()).toContain('<li>Test Item</li>')
    })
  })

  describe('Props', () => {
    it('respects custom collapsedText prop', () => {
      const _wrapper = mount(FdsAccordionGroup, {
        props: {
          collapsedText: 'Custom Open Text',
        },
      })

      expect(_wrapper.find('button').text()).toBe('Custom Open Text')
    })

    it('respects custom expandedText prop', async () => {
      const _wrapper = mount({
        template: `
          <FdsAccordionGroup :expandedText="'Custom Close Text'">
            <FdsAccordion header="Test">Content</FdsAccordion>
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, FdsAccordion },
      })

      // Click to expand all
      await _wrapper.find('button').trigger('click')
      await nextTick()

      expect(_wrapper.find('button').text()).toBe('Custom Close Text')
    })

    it('uses default text when props not provided', () => {
      const _wrapper = mount(FdsAccordionGroup)
      const button = _wrapper.find('button')

      expect(button.text()).toBe('Åbn alle')
    })

    it('handles empty string props', async () => {
      const _wrapper = mount(FdsAccordionGroup, {
        props: {
          collapsedText: '',
          expandedText: '',
        },
      })

      const button = _wrapper.find('button')
      // Empty strings should show empty text, not default values
      expect(button.text()).toBe('')

      await button.trigger('click')
      expect(button.text()).toBe('')
    })
  })

  describe('Bulk Button Behavior', () => {
    it('toggles button text when clicked', async () => {
      const _wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <FdsAccordion header="Test 1">Content 1</FdsAccordion>
            <FdsAccordion header="Test 2">Content 2</FdsAccordion>
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, FdsAccordion },
      })
      const button = _wrapper.find('button')

      expect(button.text()).toBe('Åbn alle')

      await button.trigger('click')
      await nextTick()
      expect(button.text()).toBe('Luk alle')

      await button.trigger('click')
      await nextTick()
      expect(button.text()).toBe('Åbn alle')
    })

    it('updates aria-expanded attribute', async () => {
      const _wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <FdsAccordion header="Test 1">Content 1</FdsAccordion>
            <FdsAccordion header="Test 2">Content 2</FdsAccordion>
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, FdsAccordion },
      })
      const button = _wrapper.find('button')

      expect(button.attributes('aria-expanded')).toBe('false')

      await button.trigger('click')
      await nextTick()
      expect(button.attributes('aria-expanded')).toBe('true')

      await button.trigger('click')
      await nextTick()
      expect(button.attributes('aria-expanded')).toBe('false')
    })
  })

  describe('Slots', () => {
    it('renders header slot content', () => {
      const _wrapper = mount(FdsAccordionGroup, {
        slots: {
          header: '<div class="custom-header">Custom Header</div>',
        },
      })

      expect(_wrapper.find('.custom-header').exists()).toBe(true)
      expect(_wrapper.find('.custom-header').text()).toBe('Custom Header')
      expect(_wrapper.find('button.accordion-bulk-button').exists()).toBe(false)
    })

    it('renders default slot content in ul', () => {
      const _wrapper = mount(FdsAccordionGroup, {
        slots: {
          default: '<li class="test-item">Test Content</li>',
        },
      })

      const ul = _wrapper.find('ul.accordion')
      expect(ul.find('.test-item').exists()).toBe(true)
      expect(ul.find('.test-item').text()).toBe('Test Content')
    })
  })

  describe('Integration with Accordions', () => {
    it('works with fds-accordion components', async () => {
      const _wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <FdsAccordion header="Item 1" v-model="expanded1">Content 1</FdsAccordion>
            <FdsAccordion header="Item 2" v-model="expanded2">Content 2</FdsAccordion>
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, FdsAccordion },
        data() {
          return {
            expanded1: false,
            expanded2: false,
          }
        },
      })

      // Initially collapsed
      expect(_wrapper.vm.expanded1).toBe(false)
      expect(_wrapper.vm.expanded2).toBe(false)

      // Click bulk expand
      await _wrapper.find('button.accordion-bulk-button').trigger('click')
      await nextTick()

      // Should expand all accordions via provide/inject
      const accordions = _wrapper.findAllComponents(FdsAccordion)
      expect(accordions).toHaveLength(2)
    })

    it('provides API to child accordions', async () => {
      const registeredRef = ref(false)
      const TestAccordion = {
        template: '<li>{{ registered ? "Registered" : "Not registered" }}</li>',
        inject: {
          'accordion-group-api': {
            default: null,
          },
        },
        setup() {
          const api = inject('accordion-group-api', null)
          const registered = ref(false)

          onMounted(() => {
            if (api) {
              registered.value = true
              registeredRef.value = true
            }
          })

          return { registered }
        },
      }

      const _wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <TestAccordion />
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, TestAccordion },
      })

      await nextTick()
      expect(registeredRef.value).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty accordion group', () => {
      const _wrapper = mount(FdsAccordionGroup)

      expect(_wrapper.find('ul.accordion').exists()).toBe(true)
      expect(_wrapper.find('ul.accordion').text()).toBe('')
    })

    it('handles prop changes reactively', async () => {
      const _wrapper = mount(FdsAccordionGroup, {
        props: {
          collapsedText: 'Open',
          expandedText: 'Close',
        },
      })

      expect(_wrapper.find('button').text()).toBe('Open')

      await _wrapper.setProps({
        collapsedText: 'Expand',
        expandedText: 'Collapse',
      })

      expect(_wrapper.find('button').text()).toBe('Expand')
    })
  })

  describe('Accessibility', () => {
    it('maintains semantic HTML structure', () => {
      const _wrapper = mount(FdsAccordionGroup, {
        slots: {
          default: '<li>Item 1</li><li>Item 2</li>',
        },
      })

      const ul = _wrapper.find('ul.accordion')
      expect(ul.exists()).toBe(true)
      expect(ul.findAll('li')).toHaveLength(2)
    })

    it('button has correct aria-expanded state', async () => {
      const _wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <FdsAccordion header="Test">Content</FdsAccordion>
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, FdsAccordion },
      })
      const button = _wrapper.find('button')

      expect(button.attributes('aria-expanded')).toBe('false')

      await button.trigger('click')
      await nextTick()
      expect(button.attributes('aria-expanded')).toBe('true')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsAccordionGroup>
              <FdsAccordion header="Test Item">Test Content</FdsAccordion>
            </FdsAccordionGroup>
          </main>
        `,
        components: { FdsAccordionGroup, FdsAccordion },
      }

      await testAccessibility(TestWrapper)
    })
  })
})
