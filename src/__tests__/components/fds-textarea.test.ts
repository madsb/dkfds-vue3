import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsTextarea from '../../components/input/fds-textarea.vue'

describe('FdsTextarea', () => {
  describe('Rendering', () => {
    it('renders textarea element', () => {
      const wrapper = mount(FdsTextarea, {
        props: { modelValue: '' },
      })

      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('has correct DKFDS class', () => {
      const wrapper = mount(FdsTextarea, {
        props: { modelValue: '' },
      })

      expect(wrapper.find('textarea').classes()).toContain('form-input')
    })

    it('generates unique id when not provided', () => {
      const wrapper = mount(FdsTextarea, {
        props: { modelValue: '' },
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('id')).toBeTruthy()
      expect(textarea.attributes('name')).toBe(textarea.attributes('id'))
    })

    it('uses provided id', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
          id: 'custom-textarea',
        },
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('id')).toBe('custom-textarea')
      expect(textarea.attributes('name')).toBe('custom-textarea')
    })
  })

  describe('Props', () => {
    it('displays initial value', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: 'Initial text content',
        },
      })

      expect(wrapper.find('textarea').element.value).toBe('Initial text content')
    })

    it('sets initial rows', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
          rows: 8,
        },
      })

      expect(wrapper.find('textarea').attributes('rows')).toBe('8')
    })

    it('sets maxlength attribute', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
          maxlength: 500,
        },
      })

      expect(wrapper.find('textarea').attributes('maxlength')).toBe('500')
    })

    it('applies width class when provided', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
          widthClass: 'input-width-xl',
        },
      })

      expect(wrapper.find('textarea').classes()).toContain('input-width-xl')
    })

    it('passes through additional attributes', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
        },
        attrs: {
          placeholder: 'Enter text here',
          'data-testid': 'test-textarea',
        },
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('placeholder')).toBe('Enter text here')
      expect(textarea.attributes('data-testid')).toBe('test-textarea')
    })
  })

  describe('Auto-resize', () => {
    it('maintains minimum rows', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: 'Short text',
          rows: 5,
        },
      })

      expect(wrapper.find('textarea').attributes('rows')).toBe('5')
    })

    it('increases rows with content', async () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
          rows: 3,
          rowlength: 20,
        },
      })

      // Add content that would require more rows
      const longText = 'This is a long text that should increase the number of rows automatically'
      await wrapper.setProps({ modelValue: longText })

      expect(Number(wrapper.find('textarea').attributes('rows'))).toBeGreaterThan(3)
    })

    it('respects maxRows limit', async () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
          rows: 3,
          maxRows: 5,
          rowlength: 10,
        },
      })

      // Add very long content
      const veryLongText = 'a'.repeat(200)
      await wrapper.setProps({ modelValue: veryLongText })

      expect(wrapper.find('textarea').attributes('rows')).toBe('5')
    })

    it('handles newlines in content', async () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5',
          rows: 3,
        },
      })

      // Should adjust to number of lines
      expect(Number(wrapper.find('textarea').attributes('rows'))).toBe(5)
    })
  })

  describe('v-model', () => {
    it('emits update:modelValue on input', async () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
        },
      })

      const textarea = wrapper.find('textarea')
      textarea.element.value = 'New text'
      await textarea.trigger('input')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New text'])
    })

    it('emits input event', async () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
        },
      })

      await wrapper.find('textarea').trigger('input')

      expect(wrapper.emitted('input')).toBeTruthy()
    })

    it('updates when modelValue prop changes', async () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: 'Initial',
        },
      })

      await wrapper.setProps({ modelValue: 'Updated' })

      expect(wrapper.find('textarea').element.value).toBe('Updated')
    })
  })

  describe('Events', () => {
    it('emits dirty on blur', async () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
        },
      })

      await wrapper.find('textarea').trigger('blur')

      expect(wrapper.emitted('dirty')).toBeTruthy()
      expect(wrapper.emitted('dirty')![0]).toEqual([true])
    })
  })

  describe('Accessibility', () => {
    it('has id and name attributes', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
          id: 'message-textarea',
        },
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('id')).toBe('message-textarea')
      expect(textarea.attributes('name')).toBe('message-textarea')
    })

    it('uses injected aria-describedby when available', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
        },
        global: {
          provide: {
            ariaDescribedby: 'help-text-id',
          },
        },
      })

      expect(wrapper.find('textarea').attributes('aria-describedby')).toBe('help-text-id')
    })

    it('uses explicit aria-describedby over injected', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: '',
        },
        attrs: {
          'aria-describedby': 'explicit-help',
        },
        global: {
          provide: {
            ariaDescribedby: 'injected-help',
          },
        },
      })

      expect(wrapper.find('textarea').attributes('aria-describedby')).toBe('explicit-help')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 textarea structure', () => {
      const wrapper = mount(FdsTextarea, {
        props: {
          modelValue: 'Content',
          rows: 5,
        },
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('form-input')
      expect(textarea.attributes('rows')).toBe('5')
    })

    it('supports width classes from DKFDS v11', () => {
      const widthClasses = [
        'input-width-xs',
        'input-width-s',
        'input-width-m',
        'input-width-l',
        'input-width-xl',
      ]

      widthClasses.forEach((widthClass) => {
        const wrapper = mount(FdsTextarea, {
          props: {
            modelValue: '',
            widthClass,
          },
        })

        expect(wrapper.find('textarea').classes()).toContain(widthClass)
      })
    })
  })
})
