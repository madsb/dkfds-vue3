import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick, inject, computed } from 'vue'
import FdsAccordionGroup from '../../components/fds-accordion-group.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsAccordionGroup', () => {
  describe('Rendering', () => {
    it('renders container with accordion list', () => {
      const wrapper = mount(FdsAccordionGroup)

      expect(wrapper.find('div').exists()).toBe(true)
      expect(wrapper.find('ul.accordion').exists()).toBe(true)
    })

    it('renders bulk control button by default', () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button.accordion-bulk-button')

      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Åbn alle')
    })

    it('renders slot content in accordion list', () => {
      const wrapper = mount(FdsAccordionGroup, {
        slots: {
          default: '<li>Accordion Item</li>',
        },
      })

      expect(wrapper.find('ul.accordion').html()).toContain('<li>Accordion Item</li>')
    })

    it('does not render bulk control button when showBulkControls is false', () => {
      const wrapper = mount(FdsAccordionGroup, {
        props: {
          showBulkControls: false,
        },
      })

      expect(wrapper.find('button.accordion-bulk-button').exists()).toBe(false)
    })
  })

  describe('Props', () => {
    it('uses default text values', () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button.accordion-bulk-button')

      expect(button.text()).toBe('Åbn alle')
    })

    it('respects custom collapsedText prop', () => {
      const wrapper = mount(FdsAccordionGroup, {
        props: {
          collapsedText: 'Vis alle',
        },
      })

      expect(wrapper.find('button').text()).toBe('Vis alle')
    })

    it('respects custom expandedText prop', async () => {
      const wrapper = mount(FdsAccordionGroup, {
        props: {
          expandedText: 'Skjul alle',
        },
      })

      // Click to expand
      await wrapper.find('button').trigger('click')

      expect(wrapper.find('button').text()).toBe('Skjul alle')
    })

    it('handles all props together', () => {
      const wrapper = mount(FdsAccordionGroup, {
        props: {
          collapsedText: 'Open',
          expandedText: 'Close',
          showBulkControls: true,
        },
      })

      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Open')
    })
  })

  describe('Events', () => {
    it('emits toggle-all event when bulk button is clicked', async () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button')

      await button.trigger('click')

      expect(wrapper.emitted('toggle-all')).toBeTruthy()
      expect(wrapper.emitted('toggle-all')![0]).toEqual([true])
    })

    it('emits correct expanded state on subsequent clicks', async () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button')

      // First click - expand
      await button.trigger('click')
      expect(wrapper.emitted('toggle-all')![0]).toEqual([true])

      // Second click - collapse
      await button.trigger('click')
      expect(wrapper.emitted('toggle-all')![1]).toEqual([false])

      // Third click - expand again
      await button.trigger('click')
      expect(wrapper.emitted('toggle-all')![2]).toEqual([true])
    })

    it('does not emit events when showBulkControls is false', async () => {
      const wrapper = mount(FdsAccordionGroup, {
        props: {
          showBulkControls: false,
        },
      })

      // No button to click
      expect(wrapper.find('button').exists()).toBe(false)
      expect(wrapper.emitted('toggle-all')).toBeFalsy()
    })
  })

  describe('Slots', () => {
    it('renders default slot with scoped prop', async () => {
      // Create a test component that will receive the scoped slot data
      const SlotConsumer = {
        template: '<li :class="{ active: groupActive }">Item</li>',
        props: ['groupActive'],
      }

      const wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <template #default="{ groupActive }">
              <SlotConsumer :group-active="groupActive" />
            </template>
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, SlotConsumer },
      })

      // Initially not active
      expect(wrapper.find('li.active').exists()).toBe(false)

      // Click to expand
      await wrapper.find('button').trigger('click')

      // Now should be active
      expect(wrapper.find('li.active').exists()).toBe(true)
    })

    it('renders custom header slot', () => {
      const wrapper = mount(FdsAccordionGroup, {
        slots: {
          header: '<div class="custom-header">Custom Controls</div>',
        },
      })

      expect(wrapper.find('.custom-header').exists()).toBe(true)
      expect(wrapper.find('.custom-header').text()).toBe('Custom Controls')
      expect(wrapper.find('button.accordion-bulk-button').exists()).toBe(false)
    })

    it('allows complex header slot content', () => {
      const wrapper = mount(FdsAccordionGroup, {
        slots: {
          header: `
            <div class="header-wrapper">
              <h3>Accordion Group</h3>
              <button class="custom-toggle">Toggle</button>
            </div>
          `,
        },
      })

      expect(wrapper.find('.header-wrapper h3').text()).toBe('Accordion Group')
      expect(wrapper.find('.custom-toggle').exists()).toBe(true)
    })
  })

  describe('State Management', () => {
    it('toggles expanded state correctly', async () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button')

      // Initially collapsed
      expect(button.attributes('data-accordion-bulk-expand')).toBe('true')
      expect(button.text()).toBe('Åbn alle')

      // Click to expand
      await button.trigger('click')
      expect(button.attributes('data-accordion-bulk-expand')).toBe('false')
      expect(button.text()).toBe('Luk alle')

      // Click to collapse
      await button.trigger('click')
      expect(button.attributes('data-accordion-bulk-expand')).toBe('true')
      expect(button.text()).toBe('Åbn alle')
    })

    it('provides expanded state to children via injection', async () => {
      // Create a test component that consumes the provided value
      const TestChild = {
        template: '<div>{{ expanded ? "expanded" : "collapsed" }}</div>',
        setup() {
          const expanded = inject('provideGroupExpanded', ref(false))
          return { expanded }
        },
      }

      const wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <TestChild />
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, TestChild },
      })

      // Find the child div inside the accordion list
      const child = wrapper.find('ul.accordion div')
      expect(child.text()).toBe('collapsed')

      // Click bulk button to expand
      await wrapper.find('button').trigger('click')
      expect(child.text()).toBe('expanded')
    })
  })

  describe('Accessibility', () => {
    it('sets correct data attribute for bulk expand button', () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button')

      // Initially should indicate it will expand (not expanded yet)
      expect(button.attributes('data-accordion-bulk-expand')).toBe('true')
    })

    it('maintains semantic HTML structure', () => {
      const wrapper = mount(FdsAccordionGroup, {
        slots: {
          default: '<li>Item 1</li><li>Item 2</li>',
        },
      })

      // Check for proper list structure
      const list = wrapper.find('ul.accordion')
      expect(list.exists()).toBe(true)
      expect(list.findAll('li')).toHaveLength(2)
    })

    it('button text clearly indicates action', async () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button')

      // Collapsed state - button says what will happen
      expect(button.text()).toBe('Åbn alle')

      // Expanded state - button says what will happen
      await button.trigger('click')
      expect(button.text()).toBe('Luk alle')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty accordion group', () => {
      const wrapper = mount(FdsAccordionGroup)

      expect(wrapper.find('ul.accordion').exists()).toBe(true)
      expect(wrapper.find('ul.accordion').text()).toBe('')
    })

    it('handles rapid clicks correctly', async () => {
      const wrapper = mount(FdsAccordionGroup)
      const button = wrapper.find('button')

      // Rapid clicks
      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')

      const emissions = wrapper.emitted('toggle-all')!
      expect(emissions).toHaveLength(3)
      expect(emissions[0]).toEqual([true])
      expect(emissions[1]).toEqual([false])
      expect(emissions[2]).toEqual([true])
    })

    it('maintains reactivity when props change', async () => {
      const wrapper = mount(FdsAccordionGroup, {
        props: {
          collapsedText: 'Open All',
          expandedText: 'Close All',
        },
      })

      expect(wrapper.find('button').text()).toBe('Open All')

      await wrapper.setProps({
        collapsedText: 'Expand Everything',
        expandedText: 'Collapse Everything',
      })

      expect(wrapper.find('button').text()).toBe('Expand Everything')

      // Click to expand and verify new expanded text
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').text()).toBe('Collapse Everything')
    })

    it('handles missing default props gracefully', () => {
      const wrapper = mount(FdsAccordionGroup, {
        props: {
          collapsedText: undefined,
          expandedText: undefined,
          showBulkControls: undefined,
        },
      })

      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Åbn alle')
    })
  })

  describe('Integration', () => {
    it('works with accordion items', async () => {
      // Simulate accordion items that would consume the provided state
      const AccordionItem = {
        template: `
          <li>
            <button @click="toggle">{{ expanded ? 'Collapse' : 'Expand' }} Item</button>
            <div v-if="expanded">Content</div>
          </li>
        `,
        setup() {
          const groupExpanded = inject('provideGroupExpanded', ref(false))
          const localExpanded = ref(false)
          const expanded = computed(() => groupExpanded.value || localExpanded.value)

          const toggle = () => {
            localExpanded.value = !localExpanded.value
          }

          return { expanded, toggle }
        },
      }

      const wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <AccordionItem />
            <AccordionItem />
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup, AccordionItem },
      })

      const items = wrapper.findAll('li')

      // Initially all collapsed
      items.forEach((item) => {
        expect(item.text()).toContain('Expand Item')
      })

      // Click bulk expand
      await wrapper.find('button.accordion-bulk-button').trigger('click')

      // All should show as expanded
      items.forEach((item) => {
        expect(item.text()).toContain('Collapse Item')
      })
    })

    it('integrates with parent form components', () => {
      const wrapper = mount({
        template: `
          <form>
            <FdsAccordionGroup @toggle-all="handleToggle">
              <li>Form Section 1</li>
              <li>Form Section 2</li>
            </FdsAccordionGroup>
          </form>
        `,
        components: { FdsAccordionGroup },
        setup() {
          const handleToggle = vi.fn()
          return { handleToggle }
        },
      })

      const accordionGroup = wrapper.findComponent(FdsAccordionGroup)
      expect(accordionGroup.exists()).toBe(true)

      // Verify it's properly nested in form
      expect(wrapper.find('form').find('ul.accordion').exists()).toBe(true)
    })

    it('supports dynamic accordion items', async () => {
      const wrapper = mount({
        template: `
          <FdsAccordionGroup>
            <li v-for="item in items" :key="item">{{ item }}</li>
          </FdsAccordionGroup>
        `,
        components: { FdsAccordionGroup },
        setup() {
          const items = ref(['Item 1', 'Item 2'])
          return { items }
        },
      })

      expect(wrapper.findAll('li')).toHaveLength(2)

      // Add item
      await wrapper.vm.items.push('Item 3')
      await nextTick()
      expect(wrapper.findAll('li')).toHaveLength(3)

      // Remove item
      await wrapper.vm.items.pop()
      await nextTick()
      expect(wrapper.findAll('li')).toHaveLength(2)
    })
  })

  describe('Accessibility', () => {
    it('meets WCAG accessibility standards', async () => {
      // Wrap in main landmark to satisfy axe region rule
      const TestWrapper = {
        template: `
          <main>
            <FdsAccordionGroup>
              <li>Test accordion item</li>
            </FdsAccordionGroup>
          </main>
        `,
        components: { FdsAccordionGroup },
      }

      await testAccessibility(TestWrapper)
    })
  })
})
