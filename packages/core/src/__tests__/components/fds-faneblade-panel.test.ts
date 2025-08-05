import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsFanebladePanel from '../../components/fds-faneblade-panel.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsFanebladePanel', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as div element', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('applies correct CSS class', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      expect(wrapper.classes()).toContain('tab-panel')
    })

    it('generates correct id attribute', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'my-panel' }
      })
      expect(wrapper.attributes('id')).toBe('tabpanel-my-panel')
    })

    it('generates correct aria-labelledby attribute', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'my-panel' }
      })
      expect(wrapper.attributes('aria-labelledby')).toBe('tab-my-panel')
    })

    it('has role="tabpanel" attribute', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      expect(wrapper.attributes('role')).toBe('tabpanel')
    })
  })

  describe('Props', () => {
    it('sets tabindex based on active prop', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('sets negative tabindex when not active', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: false }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('defaults to negative tabindex when active prop not provided', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('is visible when active', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: true }
      })
      expect(wrapper.attributes('hidden')).toBeUndefined()
    })

    it('is hidden when not active', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: false }
      })
      expect(wrapper.attributes('hidden')).toBe('')
    })

    it('defaults to hidden when active prop not provided', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      expect(wrapper.attributes('hidden')).toBe('')
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' },
        slots: {
          default: '<p>Panel content goes here</p>'
        }
      })
      
      expect(wrapper.find('p').exists()).toBe(true)
      expect(wrapper.find('p').text()).toBe('Panel content goes here')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' },
        slots: {
          default: `
            <h2>Section Title</h2>
            <p>First paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          `
        }
      })
      
      expect(wrapper.find('h2').text()).toBe('Section Title')
      expect(wrapper.find('p').text()).toBe('First paragraph')
      expect(wrapper.findAll('li')).toHaveLength(2)
    })

    it('renders empty when no slot content', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      
      expect(wrapper.text()).toBe('')
    })

    it('maintains slot reactivity', async () => {
      const TestComponent = {
        template: `
          <FdsFanebladePanel id="test-panel">
            <p>Count: {{ count }}</p>
            <button @click="count++">Increment</button>
          </FdsFanebladePanel>
        `,
        components: { FdsFanebladePanel },
        data() {
          return { count: 0 }
        }
      }
      
      const wrapper = mount(TestComponent)
      expect(wrapper.find('p').text()).toBe('Count: 0')
      
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 1')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for tabpanel role', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' }
      })
      
      expect(wrapper.attributes('role')).toBe('tabpanel')
      expect(wrapper.attributes('aria-labelledby')).toBeDefined()
      expect(wrapper.attributes('tabindex')).toBeDefined()
    })

    it('is focusable when active', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: true }
      })
      
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('is not focusable when inactive', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: false }
      })
      
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <div class="tab-container">
              <div class="tab-list" role="tablist">
                <button id="tab-tab1" role="tab" aria-selected="true" aria-controls="tabpanel-tab1">
                  Tab 1
                </button>
                <button id="tab-tab2" role="tab" aria-selected="false" aria-controls="tabpanel-tab2">
                  Tab 2
                </button>
              </div>
              <FdsFanebladePanel id="tab1" :active="true">
                <p>Panel 1 content</p>
              </FdsFanebladePanel>
              <FdsFanebladePanel id="tab2" :active="false">
                <p>Panel 2 content</p>
              </FdsFanebladePanel>
            </div>
          </main>
        `,
        components: { FdsFanebladePanel }
      }
      
      await testAccessibility(TestWrapper)
    })

    it('maintains proper visibility state', async () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: false }
      })
      
      expect(wrapper.attributes('hidden')).toBe('')
      
      await wrapper.setProps({ active: true })
      expect(wrapper.attributes('hidden')).toBeUndefined()
      
      await wrapper.setProps({ active: false })
      expect(wrapper.attributes('hidden')).toBe('')
    })
  })

  describe('Edge Cases', () => {
    it('handles special characters in id', () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel-123_special' }
      })
      
      expect(wrapper.attributes('id')).toBe('tabpanel-test-panel-123_special')
      expect(wrapper.attributes('aria-labelledby')).toBe('tab-test-panel-123_special')
    })

    it('handles rapid visibility changes', async () => {
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel', active: false }
      })
      
      // Rapid changes
      await wrapper.setProps({ active: true })
      await wrapper.setProps({ active: false })
      await wrapper.setProps({ active: true })
      await wrapper.setProps({ active: false })
      
      expect(wrapper.attributes('hidden')).toBe('')
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('preserves content structure when toggling visibility', async () => {
      const TestComponent = {
        template: `
          <FdsFanebladePanel :id="id" :active="active">
            <input type="text" v-model="inputValue" />
            <p>{{ inputValue }}</p>
          </FdsFanebladePanel>
        `,
        components: { FdsFanebladePanel },
        props: ['id', 'active'],
        data() {
          return { inputValue: 'test value' }
        }
      }
      
      const wrapper = mount(TestComponent, {
        props: { id: 'test-panel', active: true }
      })
      
      const input = wrapper.find('input')
      expect(input.element.value).toBe('test value')
      expect(wrapper.find('p').text()).toBe('test value')
      
      // Change value
      await input.setValue('new value')
      expect(wrapper.find('p').text()).toBe('new value')
      
      // Hide and show panel
      await wrapper.setProps({ active: false })
      await wrapper.setProps({ active: true })
      
      // Component data should be preserved
      expect(wrapper.vm.inputValue).toBe('new value')
      expect(wrapper.find('p').text()).toBe('new value')
    })

    it('handles large content', () => {
      const largeContent = '<p>Large paragraph</p>'.repeat(100)
      const wrapper = mount(FdsFanebladePanel, {
        props: { id: 'test-panel' },
        slots: {
          default: largeContent
        }
      })
      
      expect(wrapper.findAll('p')).toHaveLength(100)
    })
  })

  describe('Integration', () => {
    it('works with multiple panels', () => {
      const TabPanelsWrapper = {
        template: `
          <div class="tab-container">
            <FdsFanebladePanel 
              v-for="panel in panels" 
              :key="panel.id"
              :id="panel.id"
              :active="panel.id === activePanel"
            >
              {{ panel.content }}
            </FdsFanebladePanel>
          </div>
        `,
        components: { FdsFanebladePanel },
        data() {
          return {
            activePanel: 'panel1',
            panels: [
              { id: 'panel1', content: 'Content 1' },
              { id: 'panel2', content: 'Content 2' },
              { id: 'panel3', content: 'Content 3' }
            ]
          }
        }
      }
      
      const wrapper = mount(TabPanelsWrapper)
      const panels = wrapper.findAll('.tab-panel')
      
      expect(panels).toHaveLength(3)
      expect(panels[0].attributes('hidden')).toBeUndefined()
      expect(panels[1].attributes('hidden')).toBe('')
      expect(panels[2].attributes('hidden')).toBe('')
    })

    it('updates visibility based on parent state', async () => {
      const ParentComponent = {
        template: `
          <div>
            <button @click="activeTab = 'tab1'">Show Tab 1</button>
            <button @click="activeTab = 'tab2'">Show Tab 2</button>
            <FdsFanebladePanel id="tab1" :active="activeTab === 'tab1'">
              Tab 1 Content
            </FdsFanebladePanel>
            <FdsFanebladePanel id="tab2" :active="activeTab === 'tab2'">
              Tab 2 Content
            </FdsFanebladePanel>
          </div>
        `,
        components: { FdsFanebladePanel },
        data() {
          return { activeTab: 'tab1' }
        }
      }
      
      const wrapper = mount(ParentComponent)
      const panels = wrapper.findAll('.tab-panel')
      const buttons = wrapper.findAll('button')
      
      // Initially tab1 is active
      expect(panels[0].attributes('hidden')).toBeUndefined()
      expect(panels[1].attributes('hidden')).toBe('')
      
      // Click to show tab2
      await buttons[1].trigger('click')
      
      expect(panels[0].attributes('hidden')).toBe('')
      expect(panels[1].attributes('hidden')).toBeUndefined()
    })

    it('works with dynamic content', async () => {
      const DynamicContent = {
        template: `
          <FdsFanebladePanel id="dynamic" :active="true">
            <div v-for="item in items" :key="item.id">
              {{ item.text }}
            </div>
          </FdsFanebladePanel>
        `,
        components: { FdsFanebladePanel },
        data() {
          return {
            items: [
              { id: 1, text: 'Item 1' },
              { id: 2, text: 'Item 2' }
            ]
          }
        }
      }
      
      const wrapper = mount(DynamicContent)
      expect(wrapper.findAll('.tab-panel > div')).toHaveLength(2)
      
      // Add an item
      wrapper.vm.items.push({ id: 3, text: 'Item 3' })
      await wrapper.vm.$nextTick()
      
      expect(wrapper.findAll('.tab-panel > div')).toHaveLength(3)
    })

    it('maintains form state when toggling', async () => {
      const FormPanel = {
        template: `
          <FdsFanebladePanel id="form-panel" :active="isActive">
            <form>
              <input v-model="formData.name" type="text" />
              <select v-model="formData.option">
                <option value="a">A</option>
                <option value="b">B</option>
              </select>
            </form>
          </FdsFanebladePanel>
        `,
        components: { FdsFanebladePanel },
        data() {
          return {
            isActive: true,
            formData: {
              name: '',
              option: 'a'
            }
          }
        }
      }
      
      const wrapper = mount(FormPanel)
      const input = wrapper.find('input')
      const select = wrapper.find('select')
      
      // Set form values
      await input.setValue('Test Name')
      await select.setValue('b')
      
      // Toggle panel visibility
      wrapper.vm.isActive = false
      await wrapper.vm.$nextTick()
      wrapper.vm.isActive = true
      await wrapper.vm.$nextTick()
      
      // Form state should be preserved
      expect(wrapper.vm.formData.name).toBe('Test Name')
      expect(wrapper.vm.formData.option).toBe('b')
    })
  })
})