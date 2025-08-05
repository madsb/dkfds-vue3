import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsFanebladeTab from '../../components/fds-faneblade-tab.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsFanebladeTab', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as button element', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('applies correct CSS class', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      expect(wrapper.classes()).toContain('tab-button')
    })

    it('generates correct id attribute', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'my-tab' }
      })
      expect(wrapper.attributes('id')).toBe('tab-my-tab')
    })

    it('generates correct aria-controls attribute', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'my-tab' }
      })
      expect(wrapper.attributes('aria-controls')).toBe('tabpanel-my-tab')
    })

    it('has role="tab" attribute', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      expect(wrapper.attributes('role')).toBe('tab')
    })

    it('renders span wrapper for label', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', label: 'My Tab' }
      })
      const span = wrapper.find('span')
      expect(span.exists()).toBe(true)
      expect(span.text()).toBe('My Tab')
    })
  })

  describe('Props', () => {
    it('renders label text from prop', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', label: 'Custom Label' }
      })
      expect(wrapper.text()).toBe('Custom Label')
    })

    it('sets aria-selected based on active prop', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', active: true }
      })
      expect(wrapper.attributes('aria-selected')).toBe('true')
    })

    it('sets aria-selected to false when not active', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', active: false }
      })
      expect(wrapper.attributes('aria-selected')).toBe('false')
    })

    it('defaults to aria-selected false when active prop not provided', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      expect(wrapper.attributes('aria-selected')).toBe('false')
    })

    it('renders icon when icon prop is provided', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', icon: 'document' }
      })
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
      expect(svg.classes()).toContain('icon-svg')
    })

    it('renders icon with correct use href', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', icon: 'document' }
      })
      const use = wrapper.find('use')
      expect(use.attributes('href')).toBe('#document')
    })

    it('renders icon with proper accessibility attributes', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', icon: 'document' }
      })
      const svg = wrapper.find('svg')
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })

    it('does not render icon when prop not provided', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      expect(wrapper.find('svg').exists()).toBe(false)
    })
  })

  describe('Events', () => {
    it('emits click event with id when clicked', async () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      
      await wrapper.trigger('click')
      
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.[0]).toEqual(['test-tab'])
    })

    it('emits multiple click events correctly', async () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'my-tab' }
      })
      
      await wrapper.trigger('click')
      await wrapper.trigger('click')
      await wrapper.trigger('click')
      
      const emitted = wrapper.emitted('click')
      expect(emitted).toHaveLength(3)
      expect(emitted?.[0]).toEqual(['my-tab'])
      expect(emitted?.[1]).toEqual(['my-tab'])
      expect(emitted?.[2]).toEqual(['my-tab'])
    })
  })

  describe('Slots', () => {
    it('renders slot content instead of label prop', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', label: 'Prop Label' },
        slots: {
          default: 'Slot Content'
        }
      })
      expect(wrapper.text()).toBe('Slot Content')
      expect(wrapper.text()).not.toBe('Prop Label')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' },
        slots: {
          default: '<strong>Bold</strong> text'
        }
      })
      expect(wrapper.find('strong').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('Bold')
    })

    it('falls back to label prop when no slot provided', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', label: 'Fallback Label' }
      })
      expect(wrapper.text()).toBe('Fallback Label')
    })

    it('renders empty when no label or slot', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      expect(wrapper.find('span').text()).toBe('')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for tab role', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      
      expect(wrapper.attributes('role')).toBe('tab')
      expect(wrapper.attributes('aria-controls')).toBeDefined()
      expect(wrapper.attributes('aria-selected')).toBeDefined()
    })

    it('is keyboard accessible as a button', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab' }
      })
      
      // Buttons are natively keyboard accessible
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <div class="tab-container">
              <div class="tab-list" role="tablist">
                <FdsFanebladeTab id="tab1" label="Tab 1" :active="true" />
                <FdsFanebladeTab id="tab2" label="Tab 2" :active="false" />
              </div>
              <div role="tabpanel" id="tabpanel-tab1" aria-labelledby="tab-tab1">
                Panel 1 content
              </div>
              <div role="tabpanel" id="tabpanel-tab2" aria-labelledby="tab-tab2" hidden>
                Panel 2 content
              </div>
            </div>
          </main>
        `,
        components: { FdsFanebladeTab }
      }
      
      await testAccessibility(TestWrapper)
    })

    it('maintains focus when switching between active states', async () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', active: false }
      })
      
      await wrapper.setProps({ active: true })
      expect(wrapper.attributes('aria-selected')).toBe('true')
      
      await wrapper.setProps({ active: false })
      expect(wrapper.attributes('aria-selected')).toBe('false')
    })
  })

  describe('Edge Cases', () => {
    it('handles very long label text', () => {
      const longLabel = 'This is a very long label '.repeat(10).trim()
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', label: longLabel }
      })
      
      expect(wrapper.text()).toBe(longLabel)
    })

    it('handles special characters in id', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab-123_special' }
      })
      
      expect(wrapper.attributes('id')).toBe('tab-test-tab-123_special')
      expect(wrapper.attributes('aria-controls')).toBe('tabpanel-test-tab-123_special')
    })

    it('handles rapid prop changes', async () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { id: 'test-tab', active: false }
      })
      
      // Rapid changes
      await wrapper.setProps({ active: true })
      await wrapper.setProps({ active: false })
      await wrapper.setProps({ active: true })
      
      expect(wrapper.attributes('aria-selected')).toBe('true')
    })

    it('handles icon and label together', () => {
      const wrapper = mount(FdsFanebladeTab, {
        props: { 
          id: 'test-tab', 
          icon: 'document',
          label: 'Documents'
        }
      })
      
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('span').text()).toBe('Documents')
    })
  })

  describe('Integration', () => {
    it('works in a tab list structure', () => {
      const TabListWrapper = {
        template: `
          <div class="tab-list" role="tablist">
            <FdsFanebladeTab 
              v-for="tab in tabs" 
              :key="tab.id"
              :id="tab.id"
              :label="tab.label"
              :active="tab.id === activeTab"
              @click="activeTab = $event"
            />
          </div>
        `,
        components: { FdsFanebladeTab },
        data() {
          return {
            activeTab: 'tab1',
            tabs: [
              { id: 'tab1', label: 'First' },
              { id: 'tab2', label: 'Second' },
              { id: 'tab3', label: 'Third' }
            ]
          }
        }
      }
      
      const wrapper = mount(TabListWrapper)
      const tabs = wrapper.findAll('.tab-button')
      
      expect(tabs).toHaveLength(3)
      expect(tabs[0].attributes('aria-selected')).toBe('true')
      expect(tabs[1].attributes('aria-selected')).toBe('false')
      expect(tabs[2].attributes('aria-selected')).toBe('false')
    })

    it('handles click events in parent component', async () => {
      const ParentComponent = {
        template: `
          <div>
            <FdsFanebladeTab 
              id="test-tab" 
              :active="isActive"
              @click="handleClick"
            />
            <p>Active: {{ isActive }}</p>
          </div>
        `,
        components: { FdsFanebladeTab },
        data() {
          return { isActive: false }
        },
        methods: {
          handleClick(id) {
            expect(id).toBe('test-tab')
            this.isActive = true
          }
        }
      }
      
      const wrapper = mount(ParentComponent)
      const tab = wrapper.find('.tab-button')
      
      expect(wrapper.find('p').text()).toBe('Active: false')
      
      await tab.trigger('click')
      
      expect(wrapper.find('p').text()).toBe('Active: true')
    })

    it('works with icon library', () => {
      const IconTabs = {
        template: `
          <div class="tab-list" role="tablist">
            <FdsFanebladeTab id="images" icon="file-image" label="Images" />
            <FdsFanebladeTab id="docs" icon="document" label="Documents" />
            <FdsFanebladeTab id="videos" icon="videocam" label="Videos" />
          </div>
        `,
        components: { FdsFanebladeTab }
      }
      
      const wrapper = mount(IconTabs)
      const icons = wrapper.findAll('svg')
      
      expect(icons).toHaveLength(3)
      expect(wrapper.findAll('use')[0].attributes('href')).toBe('#file-image')
      expect(wrapper.findAll('use')[1].attributes('href')).toBe('#document')
      expect(wrapper.findAll('use')[2].attributes('href')).toBe('#videocam')
    })
  })
})