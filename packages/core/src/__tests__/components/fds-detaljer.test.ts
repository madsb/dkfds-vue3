import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsDetaljer from '../../components/fds-detaljer.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsDetaljer', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsDetaljer)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as details element', () => {
      const wrapper = mount(FdsDetaljer)
      expect(wrapper.element.tagName).toBe('DETAILS')
    })

    it('applies correct CSS class', () => {
      const wrapper = mount(FdsDetaljer)
      expect(wrapper.classes()).toContain('details')
    })

    it('renders summary element with correct class', () => {
      const wrapper = mount(FdsDetaljer)
      const summary = wrapper.find('summary')

      expect(summary.exists()).toBe(true)
      expect(summary.classes()).toContain('details-summary')
    })

    it('renders content wrapper with correct class', () => {
      const wrapper = mount(FdsDetaljer)
      const content = wrapper.find('.details-text')

      expect(content.exists()).toBe(true)
    })

    it('has default collapsed state', () => {
      const wrapper = mount(FdsDetaljer)
      const details = wrapper.find('details')

      // Details element should not have 'open' attribute by default
      expect(details.attributes('open')).toBeUndefined()
    })
  })

  describe('Props', () => {
    it('renders default header text when no prop provided', () => {
      const wrapper = mount(FdsDetaljer)
      const summary = wrapper.find('summary')

      expect(summary.text()).toBe('Mere information')
    })

    it('renders custom header text from prop', () => {
      const wrapper = mount(FdsDetaljer, {
        props: { header: 'Vigtig information' },
      })
      const summary = wrapper.find('summary')

      expect(summary.text()).toBe('Vigtig information')
    })

    it('handles empty string header prop', () => {
      const wrapper = mount(FdsDetaljer, {
        props: { header: '' },
      })
      const summary = wrapper.find('summary')

      expect(summary.text()).toBe('')
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsDetaljer, {
        slots: {
          default: '<p>Dette er indhold i detaljer</p>',
        },
      })
      const content = wrapper.find('.details-text')

      expect(content.html()).toContain('<p>Dette er indhold i detaljer</p>')
    })

    it('renders header slot content', () => {
      const wrapper = mount(FdsDetaljer, {
        slots: {
          header: '<span class="custom-header">Custom Header</span>',
        },
      })
      const summary = wrapper.find('summary')

      expect(summary.find('.custom-header').exists()).toBe(true)
      expect(summary.text()).toBe('Custom Header')
    })

    it('header slot takes precedence over header prop', () => {
      const wrapper = mount(FdsDetaljer, {
        props: { header: 'Prop header' },
        slots: {
          header: 'Slot header',
        },
      })
      const summary = wrapper.find('summary')

      expect(summary.text()).toBe('Slot header')
      expect(summary.text()).not.toBe('Prop header')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsDetaljer, {
        slots: {
          header: `
            <span class="icon">📋</span>
            <span class="text">Complex Header</span>
          `,
          default: `
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          `,
        },
      })

      expect(wrapper.find('.icon').exists()).toBe(true)
      expect(wrapper.find('.text').text()).toBe('Complex Header')
      expect(wrapper.findAll('li')).toHaveLength(2)
    })

    it('handles empty slots gracefully', () => {
      const wrapper = mount(FdsDetaljer, {
        props: { header: '' },
        slots: {
          header: '',
          default: '',
        },
      })

      expect(wrapper.find('summary').text()).toBe('')
      expect(wrapper.find('.details-text').text()).toBe('')
    })
  })

  describe('User Interactions', () => {
    it('can be opened by clicking summary', async () => {
      const wrapper = mount(FdsDetaljer)
      const details = wrapper.find('details')
      const summary = wrapper.find('summary')

      // Initially closed
      expect(details.element.open).toBe(false)

      // Click to open
      await summary.trigger('click')

      // Should be open
      expect(details.element.open).toBe(true)
    })

    it('can be closed by clicking summary again', async () => {
      const wrapper = mount(FdsDetaljer)
      const details = wrapper.find('details')
      const summary = wrapper.find('summary')

      // Open it first
      await summary.trigger('click')
      expect(details.element.open).toBe(true)

      // Click to close
      await summary.trigger('click')
      expect(details.element.open).toBe(false)
    })

    it('maintains state through prop changes', async () => {
      const wrapper = mount(FdsDetaljer, {
        props: { header: 'Original header' },
      })
      const details = wrapper.find('details')
      const summary = wrapper.find('summary')

      // Open the details
      await summary.trigger('click')
      expect(details.element.open).toBe(true)

      // Change the header prop
      await wrapper.setProps({ header: 'New header' })

      // Should remain open
      expect(details.element.open).toBe(true)
      expect(summary.text()).toBe('New header')
    })

    it('supports keyboard interaction', async () => {
      const wrapper = mount(FdsDetaljer)
      const summary = wrapper.find('summary')

      // Summary should be focusable
      expect(summary.element.tabIndex).toBe(0)

      // Space or Enter key should toggle (browser native behavior)
      // We can't fully test this as it's browser-native, but we can verify the element is set up correctly
      expect(summary.element.tagName).toBe('SUMMARY')
    })
  })

  describe('Accessibility', () => {
    it('has semantic HTML structure', () => {
      const wrapper = mount(FdsDetaljer)

      expect(wrapper.element.tagName).toBe('DETAILS')
      expect(wrapper.find('summary').exists()).toBe(true)
    })

    it('summary is keyboard accessible', () => {
      const wrapper = mount(FdsDetaljer)
      const summary = wrapper.find('summary')

      // Summary elements are natively focusable
      expect(summary.element.tabIndex).toBe(0)
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsDetaljer header="Yderligere oplysninger">
              <p>Her er nogle detaljer om emnet.</p>
              <ul>
                <li>Punkt 1</li>
                <li>Punkt 2</li>
              </ul>
            </FdsDetaljer>
          </main>
        `,
        components: { FdsDetaljer },
      }

      await testAccessibility(TestWrapper)
    })

    it('works well with screen readers', () => {
      const wrapper = mount(FdsDetaljer, {
        props: { header: 'Læs mere om dette emne' },
        slots: {
          default: 'Detaljeret information her',
        },
      })

      // Details/summary elements have built-in ARIA semantics
      // The browser automatically handles aria-expanded on the summary
      const summary = wrapper.find('summary')
      expect(summary.text()).toBe('Læs mere om dette emne')
    })
  })

  describe('Edge Cases', () => {
    it('handles very long header text', () => {
      const longHeader = 'Dette er en meget lang overskrift '.repeat(10).trim()
      const wrapper = mount(FdsDetaljer, {
        props: { header: longHeader },
      })

      expect(wrapper.find('summary').text()).toBe(longHeader)
    })

    it('handles special characters in header', () => {
      const specialHeader = 'Header with <script>alert("xss")</script> & special © chars'
      const wrapper = mount(FdsDetaljer, {
        props: { header: specialHeader },
      })

      // Vue should escape the content properly
      expect(wrapper.find('summary').text()).toBe(specialHeader)
      expect(wrapper.html()).not.toContain('<script>')
    })

    it('handles reactive slot content', async () => {
      const TestComponent = {
        template: `
          <FdsDetaljer>
            <template #header>Count: {{ count }}</template>
            <button @click="count++">Increment</button>
          </FdsDetaljer>
        `,
        components: { FdsDetaljer },
        data() {
          return { count: 0 }
        },
      }

      const wrapper = mount(TestComponent)
      const summary = wrapper.find('summary')
      const button = wrapper.find('button')

      expect(summary.text()).toBe('Count: 0')

      await button.trigger('click')
      expect(summary.text()).toBe('Count: 1')
    })

    it('preserves content when toggling', async () => {
      const wrapper = mount(FdsDetaljer, {
        slots: {
          default: '<input type="text" value="test" />',
        },
      })

      const summary = wrapper.find('summary')
      const input = wrapper.find('input')

      // Change input value
      await input.setValue('new value')

      // Toggle details closed and open
      await summary.trigger('click') // open
      await summary.trigger('click') // close
      await summary.trigger('click') // open again

      // Input value should be preserved
      expect(wrapper.find('input').element.value).toBe('new value')
    })
  })

  describe('Integration', () => {
    it('works in a form context', () => {
      const FormWrapper = {
        template: `
          <form>
            <FdsDetaljer header="Hjælp til udfyldning">
              <p>Her er nogle tips til at udfylde formularen korrekt.</p>
            </FdsDetaljer>
            <input type="text" name="field" />
          </form>
        `,
        components: { FdsDetaljer },
      }

      const wrapper = mount(FormWrapper)
      expect(wrapper.find('details').exists()).toBe(true)
      expect(wrapper.find('input[name="field"]').exists()).toBe(true)
    })

    it('can be nested', () => {
      const NestedWrapper = {
        template: `
          <FdsDetaljer header="Niveau 1">
            <p>Indhold niveau 1</p>
            <FdsDetaljer header="Niveau 2">
              <p>Indhold niveau 2</p>
            </FdsDetaljer>
          </FdsDetaljer>
        `,
        components: { FdsDetaljer },
      }

      const wrapper = mount(NestedWrapper)
      const allDetails = wrapper.findAll('details')
      const allSummaries = wrapper.findAll('summary')

      expect(allDetails).toHaveLength(2)
      expect(allSummaries).toHaveLength(2)
      expect(allSummaries[0].text()).toBe('Niveau 1')
      expect(allSummaries[1].text()).toBe('Niveau 2')
    })

    it('works with v-for loops', () => {
      const ListWrapper = {
        template: `
          <div>
            <FdsDetaljer 
              v-for="(item, index) in items" 
              :key="index"
              :header="item.title"
            >
              {{ item.content }}
            </FdsDetaljer>
          </div>
        `,
        components: { FdsDetaljer },
        data() {
          return {
            items: [
              { title: 'Første', content: 'Indhold 1' },
              { title: 'Anden', content: 'Indhold 2' },
              { title: 'Tredje', content: 'Indhold 3' },
            ],
          }
        },
      }

      const wrapper = mount(ListWrapper)
      const allDetails = wrapper.findAll('details')

      expect(allDetails).toHaveLength(3)
      expect(allDetails[0].find('summary').text()).toBe('Første')
      expect(allDetails[1].find('summary').text()).toBe('Anden')
      expect(allDetails[2].find('summary').text()).toBe('Tredje')
    })

    it('can contain interactive elements', async () => {
      const InteractiveWrapper = {
        template: `
          <FdsDetaljer header="Interaktivt indhold">
            <button @click="handleClick">Klik mig</button>
            <p v-if="clicked">Du klikkede!</p>
          </FdsDetaljer>
        `,
        components: { FdsDetaljer },
        data() {
          return { clicked: false }
        },
        methods: {
          handleClick() {
            this.clicked = true
          },
        },
      }

      const wrapper = mount(InteractiveWrapper)
      const summary = wrapper.find('summary')

      // Open details first
      await summary.trigger('click')

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.find('p').text()).toBe('Du klikkede!')
    })
  })
})
