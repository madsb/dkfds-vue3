import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsRadioGroup from "../../components/input/fds-radio-group.vue"
import FdsRadioItem from "../../components/input/fds-radio-item.vue"

describe('FdsRadioGroup', () => {
  describe('Rendering', () => {
    it('renders fieldset element', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: { label: 'Radio Group' },
      })

      expect(wrapper.find('fieldset').exists()).toBe(true)
    })

    it('renders legend with label', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: { label: 'Select an option' },
      })

      const legend = wrapper.find('legend')
      expect(legend.exists()).toBe(true)
      expect(legend.text()).toBe('Select an option')
      expect(legend.classes()).toContain('form-label')
    })

    it('renders label slot content', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: { label: 'Default label' },
        slots: {
          label: '<strong>Custom Label</strong>',
        },
      })

      const legend = wrapper.find('legend')
      expect(legend.find('strong').exists()).toBe(true)
      expect(legend.text()).toBe('Custom Label')
    })

    it('renders help text when provided', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          helpText: 'Choose one option',
        },
      })

      const hint = wrapper.find('.form-hint')
      expect(hint.exists()).toBe(true)
      expect(hint.text()).toBe('Choose one option')
    })

    it('renders help slot content', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: { label: 'Radio Group' },
        slots: {
          help: '<em>Custom help text</em>',
        },
      })

      const hint = wrapper.find('.form-hint')
      expect(hint.exists()).toBe(true)
      expect(hint.find('em').text()).toBe('Custom help text')
    })
  })

  describe('Props', () => {
    it('generates unique id when not provided', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: { label: 'Radio Group' },
      })

      const radiogroup = wrapper.find('[role="radiogroup"]')
      expect(radiogroup.attributes('id')).toBeTruthy()
    })

    it('uses provided id', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          id: 'custom-group',
        },
      })

      const radiogroup = wrapper.find('[role="radiogroup"]')
      expect(radiogroup.attributes('id')).toBe('custom-group')
    })

    it('accepts different value types', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          modelValue: 'option1',
        },
      })

      expect(wrapper.props('modelValue')).toBe('option1')
    })

    it('handles number values', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          modelValue: 42,
        },
      })

      expect(wrapper.props('modelValue')).toBe(42)
    })

    it('handles boolean values', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          modelValue: true,
        },
      })

      expect(wrapper.props('modelValue')).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          helpText: 'Help text',
        },
      })

      const fieldset = wrapper.find('fieldset')
      const legend = wrapper.find('legend')
      const hint = wrapper.find('.form-hint')

      expect(fieldset.attributes('aria-labelledby')).toBe(legend.attributes('id'))
      expect(fieldset.attributes('aria-describedby')).toBe(hint.attributes('id'))
    })

    it('has role="radiogroup"', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: { label: 'Radio Group' },
      })

      expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true)
    })

    it('generates accessible IDs', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          helpText: 'Help text',
          id: 'test-group',
        },
      })

      const legend = wrapper.find('legend')
      const hint = wrapper.find('.form-hint')

      expect(legend.attributes('id')).toContain('test-group')
      expect(legend.attributes('id')).toContain('legend')
      expect(hint.attributes('id')).toContain('test-group')
      expect(hint.attributes('id')).toContain('help')
    })

    it('omits aria-describedby when no help text', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: { label: 'Radio Group' },
      })

      const fieldset = wrapper.find('fieldset')
      expect(fieldset.attributes('aria-describedby')).toBeUndefined()
    })
  })

  describe('v-model Integration', () => {
    it('provides modelValue to children', () => {
      const TestComponent = {
        template: `
          <FdsRadioGroup v-model="value" label="Test Group">
            <FdsRadioItem value="option1">Option 1</FdsRadioItem>
            <FdsRadioItem value="option2">Option 2</FdsRadioItem>
          </FdsRadioGroup>
        `,
        components: { FdsRadioGroup, FdsRadioItem },
        data() {
          return { value: 'option1' }
        },
      }

      const wrapper = mount(TestComponent)
      const radios = wrapper.findAll('input[type="radio"]')

      expect(radios[0].element.checked).toBe(true)
      expect(radios[1].element.checked).toBe(false)
    })

    it('emits update:modelValue when selection changes', async () => {
      const TestComponent = {
        template: `
          <FdsRadioGroup v-model="value" label="Test Group">
            <FdsRadioItem value="option1">Option 1</FdsRadioItem>
            <FdsRadioItem value="option2">Option 2</FdsRadioItem>
          </FdsRadioGroup>
        `,
        components: { FdsRadioGroup, FdsRadioItem },
        data() {
          return { value: 'option1' }
        },
      }

      const wrapper = mount(TestComponent)
      const radios = wrapper.findAll('input[type="radio"]')

      await radios[1].trigger('change')

      expect(wrapper.vm.value).toBe('option2')
    })
  })

  describe('Provides to Children', () => {
    it('provides group name to radio items', () => {
      const TestComponent = {
        template: `
          <FdsRadioGroup label="Test Group" name="test-radios">
            <FdsRadioItem value="option1">Option 1</FdsRadioItem>
          </FdsRadioGroup>
        `,
        components: { FdsRadioGroup, FdsRadioItem },
      }

      const wrapper = mount(TestComponent)
      const radio = wrapper.find('input[type="radio"]')

      expect(radio.attributes('name')).toBe('test-radios')
    })

    it('generates group name when not provided', () => {
      const TestComponent = {
        template: `
          <FdsRadioGroup label="Test Group">
            <FdsRadioItem value="option1">Option 1</FdsRadioItem>
          </FdsRadioGroup>
        `,
        components: { FdsRadioGroup, FdsRadioItem },
      }

      const wrapper = mount(TestComponent)
      const radio = wrapper.find('input[type="radio"]')

      expect(radio.attributes('name')).toContain('radio-')
    })

    it('provides aria-describedby when help text exists', () => {
      const TestComponent = {
        template: `
          <FdsRadioGroup label="Test Group" help-text="Select one">
            <FdsRadioItem value="option1">Option 1</FdsRadioItem>
          </FdsRadioGroup>
        `,
        components: { FdsRadioGroup, FdsRadioItem },
      }

      const wrapper = mount(TestComponent)
      const radio = wrapper.find('input[type="radio"]')

      expect(radio.attributes('aria-describedby')).toBeTruthy()
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 structure', () => {
      const wrapper = mount(FdsRadioGroup, {
        props: {
          label: 'Radio Group',
          helpText: 'Help text',
        },
      })

      // Check fieldset structure
      expect(wrapper.find('fieldset').exists()).toBe(true)
      expect(wrapper.find('legend.form-label').exists()).toBe(true)
      expect(wrapper.find('.form-hint').exists()).toBe(true)
      expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true)
    })

    it('integrates with radio items correctly', () => {
      const TestComponent = {
        template: `
          <FdsRadioGroup v-model="value" label="Choose option" help-text="Select one option">
            <FdsRadioItem value="yes">Yes</FdsRadioItem>
            <FdsRadioItem value="no">No</FdsRadioItem>
            <FdsRadioItem value="maybe">Maybe</FdsRadioItem>
          </FdsRadioGroup>
        `,
        components: { FdsRadioGroup, FdsRadioItem },
        data() {
          return { value: 'no' }
        },
      }

      const wrapper = mount(TestComponent)

      // Check overall structure
      expect(wrapper.find('fieldset').exists()).toBe(true)
      expect(wrapper.find('legend').text()).toBe('Choose option')
      expect(wrapper.find('.form-hint').text()).toBe('Select one option')

      // Check radio items
      const radios = wrapper.findAll('input[type="radio"]')
      expect(radios).toHaveLength(3)
      expect(radios[1].element.checked).toBe(true) // 'no' is selected
    })
  })
})
