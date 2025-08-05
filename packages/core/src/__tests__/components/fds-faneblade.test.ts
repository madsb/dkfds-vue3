import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsFaneblade from '../../components/fds-faneblade.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsFaneblade', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsFaneblade)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as div element with tab-container class', () => {
      const wrapper = mount(FdsFaneblade)
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('tab-container')
    })

    it('renders tab-list with tablist role', () => {
      const wrapper = mount(FdsFaneblade)
      const tabList = wrapper.find('.tab-list')
      expect(tabList.exists()).toBe(true)
      expect(tabList.attributes('role')).toBe('tablist')
    })

    it('renders with correct DOM structure', () => {
      const wrapper = mount(FdsFaneblade)
      expect(wrapper.find('.tab-container').exists()).toBe(true)
      expect(wrapper.find('.tab-container > .tab-list').exists()).toBe(true)
    })
  })

  describe('Slots', () => {
    it('renders tabs slot content', () => {
      const wrapper = mount(FdsFaneblade, {
        slots: {
          tabs: '<button class="test-tab">Tab 1</button>'
        }
      })
      
      expect(wrapper.find('.tab-list .test-tab').exists()).toBe(true)
      expect(wrapper.find('.test-tab').text()).toBe('Tab 1')
    })

    it('renders panels slot content', () => {
      const wrapper = mount(FdsFaneblade, {
        slots: {
          panels: '<div class="test-panel">Panel content</div>'
        }
      })
      
      expect(wrapper.find('.tab-container > .test-panel').exists()).toBe(true)
      expect(wrapper.find('.test-panel').text()).toBe('Panel content')
    })

    it('renders both tabs and panels slots', () => {
      const wrapper = mount(FdsFaneblade, {
        slots: {
          tabs: `
            <button class="tab-1">Tab 1</button>
            <button class="tab-2">Tab 2</button>
          `,
          panels: `
            <div class="panel-1">Panel 1</div>
            <div class="panel-2">Panel 2</div>
          `
        }
      })
      
      expect(wrapper.find('.tab-list .tab-1').exists()).toBe(true)
      expect(wrapper.find('.tab-list .tab-2').exists()).toBe(true)
      expect(wrapper.find('.tab-container > .panel-1').exists()).toBe(true)
      expect(wrapper.find('.tab-container > .panel-2').exists()).toBe(true)
    })

    it('handles empty slots gracefully', () => {
      const wrapper = mount(FdsFaneblade)
      expect(wrapper.find('.tab-list').element.children).toHaveLength(0)
    })

    it('maintains slot reactivity', async () => {
      const TestComponent = {
        template: `
          <FdsFaneblade>
            <template #tabs>
              <button v-for="tab in tabs" :key="tab">{{ tab }}</button>
            </template>
          </FdsFaneblade>
        `,
        components: { FdsFaneblade },
        data() {
          return { tabs: ['Tab 1', 'Tab 2'] }
        }
      }
      
      const wrapper = mount(TestComponent)
      expect(wrapper.findAll('.tab-list > button')).toHaveLength(2)
      
      // Add a tab
      wrapper.vm.tabs.push('Tab 3')
      await wrapper.vm.$nextTick()
      
      expect(wrapper.findAll('.tab-list > button')).toHaveLength(3)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA role for tab navigation', () => {
      const wrapper = mount(FdsFaneblade)
      const tabList = wrapper.find('.tab-list')
      expect(tabList.attributes('role')).toBe('tablist')
    })

    it('provides semantic structure for tab components', () => {
      const TestWrapper = {
        template: `
          <FdsFaneblade>
            <template #tabs>
              <button role="tab" aria-selected="true">Active Tab</button>
              <button role="tab" aria-selected="false">Inactive Tab</button>
            </template>
            <template #panels>
              <div role="tabpanel">Panel 1</div>
              <div role="tabpanel">Panel 2</div>
            </template>
          </FdsFaneblade>
        `,
        components: { FdsFaneblade }
      }
      
      const wrapper = mount(TestWrapper)
      const tablist = wrapper.find('[role="tablist"]')
      const tabs = wrapper.findAll('[role="tab"]')
      const panels = wrapper.findAll('[role="tabpanel"]')
      
      expect(tablist.exists()).toBe(true)
      expect(tabs).toHaveLength(2)
      expect(panels).toHaveLength(2)
      expect(tabs[0].attributes('aria-selected')).toBe('true')
      expect(tabs[1].attributes('aria-selected')).toBe('false')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsFaneblade>
              <template #tabs>
                <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
                  Tab 1
                </button>
                <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
                  Tab 2
                </button>
              </template>
              <template #panels>
                <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
                  Panel 1 content
                </div>
                <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
                  Panel 2 content
                </div>
              </template>
            </FdsFaneblade>
          </main>
        `,
        components: { FdsFaneblade }
      }
      
      await testAccessibility(TestWrapper)
    })

    it('maintains proper document structure', () => {
      const wrapper = mount(FdsFaneblade)
      
      // Component should not have any focusable elements itself
      // Focus management should be handled by child tab components
      expect(wrapper.element.tabIndex).toBe(-1)
    })
  })

  describe('Edge Cases', () => {
    it('handles text nodes in slot', () => {
      const wrapper = mount(FdsFaneblade, {
        slots: {
          tabs: 'Just text content'
        }
      })
      
      expect(wrapper.find('.tab-list').text()).toBe('Just text content')
    })

    it('handles conditional slot content', async () => {
      const ConditionalWrapper = {
        template: `
          <FdsFaneblade>
            <template #tabs>
              <button v-if="showTab1">Tab 1</button>
              <button v-if="showTab2">Tab 2</button>
            </template>
          </FdsFaneblade>
        `,
        components: { FdsFaneblade },
        data() {
          return { showTab1: true, showTab2: false }
        }
      }
      
      const wrapper = mount(ConditionalWrapper)
      expect(wrapper.findAll('.tab-list > button')).toHaveLength(1)
      
      // Show second tab
      wrapper.vm.showTab2 = true
      await wrapper.vm.$nextTick()
      
      expect(wrapper.findAll('.tab-list > button')).toHaveLength(2)
    })

    it('preserves custom attributes on root element', () => {
      const wrapper = mount(FdsFaneblade, {
        attrs: {
          'data-testid': 'my-tabs',
          'aria-label': 'Main navigation tabs'
        }
      })
      
      expect(wrapper.attributes('data-testid')).toBe('my-tabs')
      expect(wrapper.attributes('aria-label')).toBe('Main navigation tabs')
    })
  })

  describe('Integration', () => {
    it('works as a container for tab navigation', () => {
      const TabsWrapper = {
        template: `
          <div>
            <FdsFaneblade>
              <template #tabs>
                <button role="tab" @click="activeTab = 1" :aria-selected="activeTab === 1">
                  Tab 1
                </button>
                <button role="tab" @click="activeTab = 2" :aria-selected="activeTab === 2">
                  Tab 2
                </button>
              </template>
              <template #panels>
                <div v-if="activeTab === 1" role="tabpanel">Content 1</div>
                <div v-if="activeTab === 2" role="tabpanel">Content 2</div>
              </template>
            </FdsFaneblade>
          </div>
        `,
        components: { FdsFaneblade },
        data() {
          return { activeTab: 1 }
        }
      }
      
      const wrapper = mount(TabsWrapper)
      const tabs = wrapper.findAll('[role="tab"]')
      
      expect(tabs[0].attributes('aria-selected')).toBe('true')
      expect(tabs[1].attributes('aria-selected')).toBe('false')
    })

    it('can be used with v-for for dynamic tabs', () => {
      const DynamicTabs = {
        template: `
          <FdsFaneblade>
            <template #tabs>
              <button
                v-for="(tab, index) in tabs"
                :key="tab.id"
                role="tab"
                :aria-selected="index === activeIndex"
              >
                {{ tab.label }}
              </button>
            </template>
            <template #panels>
              <div
                v-for="(tab, index) in tabs"
                :key="tab.id"
                role="tabpanel"
                :hidden="index !== activeIndex"
              >
                Content for {{ tab.label }}
              </div>
            </template>
          </FdsFaneblade>
        `,
        components: { FdsFaneblade },
        data() {
          return {
            activeIndex: 0,
            tabs: [
              { id: 1, label: 'First' },
              { id: 2, label: 'Second' },
              { id: 3, label: 'Third' }
            ]
          }
        }
      }
      
      const wrapper = mount(DynamicTabs)
      const tabs = wrapper.findAll('[role="tab"]')
      const panels = wrapper.findAll('[role="tabpanel"]')
      
      expect(tabs).toHaveLength(3)
      expect(panels).toHaveLength(3)
      expect(tabs[0].text()).toBe('First')
      expect(tabs[1].text()).toBe('Second')
      expect(tabs[2].text()).toBe('Third')
    })

    it('supports nested component composition', () => {
      const NestedWrapper = {
        template: `
          <FdsFaneblade>
            <template #tabs>
              <template v-for="section in sections" :key="section">
                <button role="tab">{{ section }}</button>
              </template>
            </template>
            <template #panels>
              <template v-for="section in sections" :key="section">
                <div role="tabpanel">Panel for {{ section }}</div>
              </template>
            </template>
          </FdsFaneblade>
        `,
        components: { FdsFaneblade },
        data() {
          return {
            sections: ['Overview', 'Details', 'Settings']
          }
        }
      }
      
      const wrapper = mount(NestedWrapper)
      expect(wrapper.findAll('[role="tab"]')).toHaveLength(3)
      expect(wrapper.findAll('[role="tabpanel"]')).toHaveLength(3)
    })
  })
})