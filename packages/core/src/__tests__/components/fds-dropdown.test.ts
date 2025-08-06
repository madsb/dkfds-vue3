import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsDropdown from '../../components/fds-dropdown.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsDropdown', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsDropdown)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders as select element', () => {
      const wrapper = mount(FdsDropdown)
      expect(wrapper.element.tagName).toBe('SELECT')
    })

    it('applies correct CSS class', () => {
      const wrapper = mount(FdsDropdown)
      expect(wrapper.classes()).toContain('form-select')
    })

    it('generates unique ID when not provided', () => {
      const wrapper = mount(FdsDropdown)
      const select = wrapper.find('select')

      expect(select.attributes('id')).toBeDefined()
      expect(select.attributes('name')).toBe(select.attributes('id'))
    })

    it('renders with clean state initially', () => {
      const wrapper = mount(FdsDropdown)
      expect(wrapper.classes()).not.toContain('dirty')
    })
  })

  describe('Props', () => {
    it('uses custom id when provided', () => {
      const wrapper = mount(FdsDropdown, {
        props: { id: 'custom-dropdown' },
      })

      const select = wrapper.find('select')
      expect(select.attributes('id')).toContain('custom-dropdown')
    })

    it('sets initial value from modelValue prop', async () => {
      const wrapper = mount(FdsDropdown, {
        props: { modelValue: 'option2' },
        slots: {
          default: `
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          `,
        },
      })

      await wrapper.vm.$nextTick()
      const select = wrapper.find('select')
      expect(select.element.value).toBe('option2')
    })

    it('handles empty modelValue', () => {
      const wrapper = mount(FdsDropdown, {
        props: { modelValue: '' },
        slots: {
          default: '<option value="">Select...</option>',
        },
      })

      const select = wrapper.find('select')
      expect(select.element.value).toBe('')
    })

    it('handles undefined modelValue', () => {
      const wrapper = mount(FdsDropdown)
      const select = wrapper.find('select')
      expect(select.element.value).toBe('')
    })
  })

  describe('Events', () => {
    it('emits update:modelValue on change', async () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          `,
        },
      })

      const select = wrapper.find('select')
      await select.setValue('option2')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option2'])
    })

    it('emits dirty event on blur', async () => {
      const wrapper = mount(FdsDropdown)
      const select = wrapper.find('select')

      await select.trigger('blur')

      expect(wrapper.emitted('dirty')).toBeTruthy()
      expect(wrapper.emitted('dirty')?.[0]).toEqual([true])
    })

    it('adds dirty class after blur', async () => {
      const wrapper = mount(FdsDropdown)
      const select = wrapper.find('select')

      // Initially not dirty
      expect(wrapper.classes()).not.toContain('dirty')

      // Blur to make it dirty
      await select.trigger('blur')

      expect(wrapper.classes()).toContain('dirty')
    })

    it('emits change event on value change', async () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="a">A</option>
            <option value="b">B</option>
          `,
        },
      })

      const select = wrapper.find('select')
      await select.setValue('b')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0][0]).toBeInstanceOf(Event)
    })

    it('emits multiple change events correctly', async () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          `,
        },
      })

      const select = wrapper.find('select')

      await select.setValue('a')
      await select.setValue('b')
      await select.setValue('c')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toHaveLength(3)
      expect(emitted?.[0]).toEqual(['a'])
      expect(emitted?.[1]).toEqual(['b'])
      expect(emitted?.[2]).toEqual(['c'])
    })
  })

  describe('Slots', () => {
    it('renders option elements from default slot', () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="1">First</option>
            <option value="2">Second</option>
            <option value="3">Third</option>
          `,
        },
      })

      const options = wrapper.findAll('option')
      expect(options).toHaveLength(3)
      expect(options[0].text()).toBe('First')
      expect(options[1].text()).toBe('Second')
      expect(options[2].text()).toBe('Third')
    })

    it('renders optgroup elements', () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <optgroup label="Group 1">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </optgroup>
            <optgroup label="Group 2">
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </optgroup>
          `,
        },
      })

      const optgroups = wrapper.findAll('optgroup')
      expect(optgroups).toHaveLength(2)
      expect(optgroups[0].attributes('label')).toBe('Group 1')
      expect(optgroups[1].attributes('label')).toBe('Group 2')
    })

    it('handles empty slot', () => {
      const wrapper = mount(FdsDropdown)
      const select = wrapper.find('select')

      expect(select.element.children).toHaveLength(0)
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="" disabled>Choose an option</option>
            <option value="dk">Danmark</option>
            <option value="se">Sverige</option>
            <option value="no">Norge</option>
          `,
        },
      })

      const options = wrapper.findAll('option')
      expect(options[0].attributes('disabled')).toBeDefined()
      expect(options[0].text()).toBe('Choose an option')
    })
  })

  describe('v-model Integration', () => {
    it('supports v-model binding', async () => {
      const ParentComponent = {
        template: `
          <div>
            <FdsDropdown v-model="selected">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
            </FdsDropdown>
            <p>Selected: {{ selected }}</p>
          </div>
        `,
        components: { FdsDropdown },
        data() {
          return { selected: 'b' }
        },
      }

      const wrapper = mount(ParentComponent)
      await wrapper.vm.$nextTick()

      const select = wrapper.find('select')

      expect(select.element.value).toBe('b')
      expect(wrapper.find('p').text()).toBe('Selected: b')

      await select.setValue('c')

      expect(wrapper.vm.selected).toBe('c')
      expect(wrapper.find('p').text()).toBe('Selected: c')
    })

    it('updates when parent changes v-model value', async () => {
      const ParentComponent = {
        template: `
          <FdsDropdown v-model="selected">
            <option value="1">One</option>
            <option value="2">Two</option>
          </FdsDropdown>
        `,
        components: { FdsDropdown },
        data() {
          return { selected: '1' }
        },
      }

      const wrapper = mount(ParentComponent)
      const select = wrapper.find('select')

      expect(select.element.value).toBe('1')

      // Change parent data
      wrapper.vm.selected = '2'
      await wrapper.vm.$nextTick()

      expect(select.element.value).toBe('2')
    })
  })

  describe('Accessibility', () => {
    it('has proper form control attributes', () => {
      const wrapper = mount(FdsDropdown)
      const select = wrapper.find('select')

      expect(select.attributes('id')).toBeDefined()
      expect(select.attributes('name')).toBeDefined()
    })

    it('can be labeled externally', () => {
      const TestWrapper = {
        template: `
          <div>
            <label for="country-select">Vælg land</label>
            <FdsDropdown id="country-select">
              <option value="dk">Danmark</option>
              <option value="se">Sverige</option>
            </FdsDropdown>
          </div>
        `,
        components: { FdsDropdown },
      }

      const wrapper = mount(TestWrapper)
      const label = wrapper.find('label')
      const select = wrapper.find('select')

      expect(label.attributes('for')).toBe(select.attributes('id'))
    })

    it('supports keyboard navigation', () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          `,
        },
      })

      const select = wrapper.find('select')

      // Select elements are natively keyboard accessible
      expect(select.element.tagName).toBe('SELECT')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <form>
              <div class="form-group">
                <label for="test-dropdown">Vælg en mulighed</label>
                <FdsDropdown id="test-dropdown" modelValue="option1">
                  <option value="option1">Mulighed 1</option>
                  <option value="option2">Mulighed 2</option>
                  <option value="option3">Mulighed 3</option>
                </FdsDropdown>
              </div>
            </form>
          </main>
        `,
        components: { FdsDropdown },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles select with no valid selection', () => {
      const wrapper = mount(FdsDropdown, {
        props: { modelValue: 'nonexistent' },
        slots: {
          default: `
            <option value="a">A</option>
            <option value="b">B</option>
          `,
        },
      })

      const select = wrapper.find('select')
      // Browser will select first option if value doesn't exist
      expect(['', 'a']).toContain(select.element.value)
    })

    it('handles disabled options', async () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="1">Active 1</option>
            <option value="2" disabled>Disabled</option>
            <option value="3">Active 2</option>
          `,
        },
      })

      const options = wrapper.findAll('option')
      expect(options[1].attributes('disabled')).toBeDefined()
    })

    it('handles options with same values', async () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="same">First</option>
            <option value="same">Second</option>
            <option value="different">Third</option>
          `,
        },
      })

      const select = wrapper.find('select')
      await select.setValue('same')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['same'])
    })

    it('maintains dirty state through prop changes', async () => {
      const wrapper = mount(FdsDropdown, {
        props: { modelValue: 'a' },
        slots: {
          default: '<option value="a">A</option>',
        },
      })

      const select = wrapper.find('select')

      // Make it dirty
      await select.trigger('blur')
      expect(wrapper.classes()).toContain('dirty')

      // Change props
      await wrapper.setProps({ modelValue: 'b' })

      // Should still be dirty
      expect(wrapper.classes()).toContain('dirty')
    })

    it('handles rapid value changes', async () => {
      const wrapper = mount(FdsDropdown, {
        slots: {
          default: `
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          `,
        },
      })

      const select = wrapper.find('select')

      // Rapid changes
      await select.setValue('1')
      await select.setValue('2')
      await select.setValue('3')
      await select.setValue('2')
      await select.setValue('1')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toHaveLength(5)
      expect(emitted?.[4]).toEqual(['1'])
    })
  })

  describe('Integration', () => {
    it('works in a form with other inputs', () => {
      const FormWrapper = {
        template: `
          <form>
            <input type="text" name="name" />
            <FdsDropdown v-model="country">
              <option value="dk">Danmark</option>
              <option value="se">Sverige</option>
            </FdsDropdown>
            <button type="submit">Submit</button>
          </form>
        `,
        components: { FdsDropdown },
        data() {
          return { country: 'dk' }
        },
      }

      const wrapper = mount(FormWrapper)
      expect(wrapper.find('select').element.value).toBe('dk')
    })

    it('works with conditional rendering', async () => {
      const ConditionalWrapper = {
        template: `
          <div>
            <button @click="show = !show">Toggle</button>
            <FdsDropdown v-if="show" v-model="value">
              <option value="a">A</option>
              <option value="b">B</option>
            </FdsDropdown>
          </div>
        `,
        components: { FdsDropdown },
        data() {
          return {
            show: true,
            value: 'a',
          }
        },
      }

      const wrapper = mount(ConditionalWrapper)

      expect(wrapper.find('select').exists()).toBe(true)

      // Hide
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('select').exists()).toBe(false)

      // Show again
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('select').exists()).toBe(true)
      expect(wrapper.find('select').element.value).toBe('a')
    })

    it('works with dynamic options', async () => {
      const DynamicWrapper = {
        template: `
          <FdsDropdown v-model="selected">
            <option v-for="opt in options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </FdsDropdown>
        `,
        components: { FdsDropdown },
        data() {
          return {
            selected: '1',
            options: [
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ],
          }
        },
      }

      const wrapper = mount(DynamicWrapper)
      let options = wrapper.findAll('option')

      expect(options).toHaveLength(2)

      // Add new option
      wrapper.vm.options.push({ value: '3', label: 'Option 3' })
      await wrapper.vm.$nextTick()

      options = wrapper.findAll('option')
      expect(options).toHaveLength(3)
      expect(options[2].text()).toBe('Option 3')
    })

    it('handles form reset', async () => {
      const FormWrapper = {
        template: `
          <form>
            <FdsDropdown v-model="value" id="test-select">
              <option value="">None</option>
              <option value="a">A</option>
              <option value="b">B</option>
            </FdsDropdown>
            <button type="button" @click="handleReset">Reset</button>
          </form>
        `,
        components: { FdsDropdown },
        data() {
          return { value: 'a' }
        },
        methods: {
          handleReset() {
            this.value = ''
          },
        },
      }

      const wrapper = mount(FormWrapper)
      await wrapper.vm.$nextTick()

      const select = wrapper.find('select')

      expect(select.element.value).toBe('a')
      expect(wrapper.vm.value).toBe('a')

      // Change value through component
      await select.setValue('b')
      await wrapper.vm.$nextTick()

      expect(select.element.value).toBe('b')
      expect(wrapper.vm.value).toBe('b')

      // Click reset button
      await wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      // Check that the parent's value was reset
      expect(wrapper.vm.value).toBe('')

      // The select should also reflect the new value
      expect(select.element.value).toBe('')
    })
  })
})
