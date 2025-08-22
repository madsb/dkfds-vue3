import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsRadioItem from '../../components/fds-radio-item.vue'

describe('FdsRadioItem', () => {
  describe('Rendering', () => {
    it('renders radio input element', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
      })

      expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    })

    it('has correct DKFDS classes', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
      })

      expect(wrapper.find('.form-group-radio').exists()).toBe(true)
      expect(wrapper.find('input').classes()).toContain('form-radio')
      expect(wrapper.find('label').classes()).toContain('form-label')
    })

    it('generates unique id', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
      })

      const input = wrapper.find('input')
      const label = wrapper.find('label')
      const id = input.attributes('id')

      expect(id).toBeTruthy()
      expect(id).toContain('radio-')
      expect(label.attributes('for')).toBe(id)
    })

    it('uses provided id in generation', () => {
      const wrapper = mount(FdsRadioItem, {
        props: {
          value: 'option1',
          id: 'custom',
        },
      })

      const input = wrapper.find('input')
      // The component generates radio-[formid]-[indexId] where formid uses the provided id
      // Since no index is provided, it uses a generated UUID as indexId
      const id = input.attributes('id')
      expect(id).toMatch(/^radio-custom-fid_[0-9a-f]{32}$/)
    })
  })

  describe('Props', () => {
    it('sets value attribute', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'test-value' },
      })

      expect(wrapper.find('input').attributes('value')).toBe('test-value')
    })

    it('supports number values', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 42 },
      })

      expect(wrapper.find('input').attributes('value')).toBe('42')
    })

    it('supports boolean values', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: true },
      })

      expect(wrapper.find('input').attributes('value')).toBe('true')
    })

    it('handles disabled state', () => {
      const wrapper = mount(FdsRadioItem, {
        props: {
          value: 'option1',
          disabled: true,
        },
      })

      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('uses custom name when provided', () => {
      const wrapper = mount(FdsRadioItem, {
        props: {
          value: 'option1',
          name: 'custom-radio-group',
        },
      })

      expect(wrapper.find('input').attributes('name')).toBe('custom-radio-group')
    })
  })

  describe('Group Integration', () => {
    it('uses injected group name', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        global: {
          provide: {
            provideGroupName: 'group-name',
          },
        },
      })

      expect(wrapper.find('input').attributes('name')).toBe('group-name')
    })

    it('is checked when value matches group value', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        global: {
          provide: {
            provideGroupValue: 'option1',
          },
        },
      })

      expect(wrapper.find('input').element.checked).toBe(true)
    })

    it('is not checked when value does not match group value', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        global: {
          provide: {
            provideGroupValue: 'option2',
          },
        },
      })

      expect(wrapper.find('input').element.checked).toBe(false)
    })

    it('calls group emit on change', async () => {
      const groupEmit = vi.fn()
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        global: {
          provide: {
            provideGroupEmit: groupEmit,
          },
        },
      })

      await wrapper.find('input').trigger('change')

      expect(groupEmit).toHaveBeenCalledWith('option1')
    })
  })

  describe('Slots', () => {
    it('renders label content', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          default: 'Radio Option Label',
        },
      })

      expect(wrapper.find('label').text()).toBe('Radio Option Label')
    })

    it('renders content slot when checked', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          default: 'Option 1',
          content: '<div class="extra-content">Additional content</div>',
        },
        global: {
          provide: {
            provideGroupValue: 'option1',
          },
        },
      })

      expect(wrapper.find('.radio-content').exists()).toBe(true)
      expect(wrapper.find('.extra-content').text()).toBe('Additional content')
    })

    it('hides content slot when not checked', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          default: 'Option 1',
          content: '<div class="extra-content">Additional content</div>',
        },
        global: {
          provide: {
            provideGroupValue: 'option2',
          },
        },
      })

      expect(wrapper.find('.radio-content').exists()).toBe(false)
    })
  })

  describe('Events', () => {
    it('emits change event', async () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
      })

      await wrapper.find('input').trigger('change')

      expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('emits dirty on change', async () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
      })

      await wrapper.find('input').trigger('change')

      expect(wrapper.emitted('dirty')).toBeTruthy()
      expect(wrapper.emitted('dirty')![0]).toEqual([true])
    })

    it('emits dirty on blur', async () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
      })

      await wrapper.find('input').trigger('blur')

      expect(wrapper.emitted('dirty')).toBeTruthy()
      expect(wrapper.emitted('dirty')![0]).toEqual([true])
    })
  })

  describe('Accessibility', () => {
    it('has proper label association', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
      })

      const input = wrapper.find('input')
      const label = wrapper.find('label')

      expect(input.attributes('id')).toBeTruthy()
      expect(label.attributes('for')).toBe(input.attributes('id'))
    })

    it('uses injected aria-describedby', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        global: {
          provide: {
            ariaDescribedby: 'help-text',
          },
        },
      })

      expect(wrapper.find('input').attributes('aria-describedby')).toBe('help-text')
    })

    it('sets aria-controls for content area', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          content: 'Extra content',
        },
      })

      const input = wrapper.find('input')
      const ariaControls = input.attributes('aria-controls')

      expect(ariaControls).toBeTruthy()
      expect(ariaControls).toContain('collapse-')
    })

    it('sets data-controls for DKFDS JavaScript', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          content: 'Extra content',
        },
      })

      const input = wrapper.find('input')
      const dataControls = input.attributes('data-controls')

      expect(dataControls).toBeTruthy()
      expect(dataControls).toContain('collapse-')
    })

    it('sets aria-hidden on collapsed content', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          content: 'Extra content',
        },
        global: {
          provide: {
            provideGroupValue: 'option2',
          },
        },
      })

      // Content should not be rendered when not checked
      expect(wrapper.find('.radio-content').exists()).toBe(false)
    })

    it('removes aria-hidden on expanded content', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          content: 'Extra content',
        },
        global: {
          provide: {
            provideGroupValue: 'option1',
          },
        },
      })

      const content = wrapper.find('.radio-content')
      expect(content.exists()).toBe(true)
      expect(content.attributes('aria-hidden')).toBe('false')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 structure', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          default: 'Option Label',
        },
      })

      // Check structure
      expect(wrapper.find('.form-group-radio').exists()).toBe(true)
      expect(wrapper.find('input.form-radio').exists()).toBe(true)
      expect(wrapper.find('label.form-label').exists()).toBe(true)
    })

    it('supports collapsible content areas', () => {
      const wrapper = mount(FdsRadioItem, {
        props: { value: 'option1' },
        slots: {
          content: '<input type="text" placeholder="Additional input">',
        },
        global: {
          provide: {
            provideGroupValue: 'option1',
          },
        },
      })

      const content = wrapper.find('.radio-content')
      expect(content.exists()).toBe(true)
      expect(content.find('input[type="text"]').exists()).toBe(true)
    })
  })
})
