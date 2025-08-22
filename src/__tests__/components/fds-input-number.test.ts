import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import FdsInputNumber from "../../components/input/fds-input-number.vue"

// Mock the formId utility
vi.mock('../../composables/formId', () => ({
  default: (id?: string | null, autogenId = false) => ({
    formid: ref(id || 'fid_generated_id'),
  }),
}))

describe('FdsInputNumber', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders number input with correct DKFDS structure', () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('number')
      expect(input.classes()).toContain('form-input')
    })

    it('renders without errors', () => {
      expect(() => mount(FdsInputNumber)).not.toThrow()
    })

    it('generates unique ID when not provided', () => {
      const wrapper = mount(FdsInputNumber)
      const input = wrapper.find('input')

      expect(input.attributes('id')).toBe('fid_generated_id')
      expect(input.attributes('name')).toBe('fid_generated_id')
    })

    it('uses provided ID', () => {
      const customId = 'my-number-input'
      const wrapper = mount(FdsInputNumber, {
        props: { id: customId },
      })

      const input = wrapper.find('input')
      expect(input.attributes('id')).toBe(customId)
      expect(input.attributes('name')).toBe(customId)
    })

    it('renders without wrapper when no prefix or suffix', () => {
      const wrapper = mount(FdsInputNumber)

      expect(wrapper.find('.form-input-wrapper').exists()).toBe(false)
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('renders with wrapper when prefix is provided', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { prefix: 'DKK' },
      })

      expect(wrapper.find('.form-input-wrapper').exists()).toBe(true)
      expect(wrapper.find('.form-input-wrapper--prefix').exists()).toBe(true)
      expect(wrapper.find('.form-input-prefix').text()).toBe('DKK')
    })

    it('renders with wrapper when suffix is provided', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { suffix: 'kr' },
      })

      expect(wrapper.find('.form-input-wrapper').exists()).toBe(true)
      expect(wrapper.find('.form-input-wrapper--suffix').exists()).toBe(true)
      expect(wrapper.find('.form-input-suffix').text()).toBe('kr')
    })

    it('applies width class correctly', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { widthClass: 'input-width-s' },
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain('input-width-s')
    })
  })

  describe('Props', () => {
    it('accepts and applies modelValue prop correctly', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: 42 },
      })

      const input = wrapper.find('input')
      expect(input.element.value).toBe('42')
    })

    it('handles string modelValue', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: '123' },
      })

      const input = wrapper.find('input')
      expect(input.element.value).toBe('123')
    })

    it('handles empty string modelValue', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: '' },
      })

      const input = wrapper.find('input')
      expect(input.element.value).toBe('')
    })

    it('applies min attribute correctly', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { min: 0 },
      })

      const input = wrapper.find('input')
      expect(input.attributes('min')).toBe('0')
    })

    it('applies max attribute correctly', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { max: 100 },
      })

      const input = wrapper.find('input')
      expect(input.attributes('max')).toBe('100')
    })

    it('applies step attribute correctly', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { step: 0.1 },
      })

      const input = wrapper.find('input')
      expect(input.attributes('step')).toBe('0.1')
    })

    it('handles string step attribute', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { step: 'any' },
      })

      const input = wrapper.find('input')
      expect(input.attributes('step')).toBe('any')
    })

    it('uses default prop values', () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      expect(input.element.value).toBe('')
      expect(input.attributes('min')).toBeUndefined()
      expect(input.attributes('max')).toBeUndefined()
      expect(input.attributes('step')).toBeUndefined()
    })

    it('handles null props gracefully', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          id: null,
          prefix: null,
          suffix: null,
        },
      })

      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(wrapper.find('.form-input-prefix').exists()).toBe(false)
      expect(wrapper.find('.form-input-suffix').exists()).toBe(false)
    })

    it('handles both prefix and suffix (suffix takes precedence for wrapper class)', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          prefix: 'DKK',
          suffix: 'kr',
        },
      })

      expect(wrapper.find('.form-input-wrapper--suffix').exists()).toBe(true)
      expect(wrapper.find('.form-input-wrapper--prefix').exists()).toBe(false)
      expect(wrapper.find('.form-input-prefix').text()).toBe('DKK')
      expect(wrapper.find('.form-input-suffix').text()).toBe('kr')
    })
  })

  describe('v-model Support', () => {
    it('supports v-model binding', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: '' },
      })

      const input = wrapper.find('input')
      await input.setValue('123')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([123])
    })

    it('updates input value when modelValue changes', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: 42 },
      })

      let input = wrapper.find('input')
      expect(input.element.value).toBe('42')

      await wrapper.setProps({ modelValue: 100 })
      input = wrapper.find('input')
      expect(input.element.value).toBe('100')
    })

    it('handles number to string conversion', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: 42 },
      })

      const input = wrapper.find('input')
      await input.setValue('123')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted?.[0]).toEqual([123])
      expect(typeof emitted?.[0][0]).toBe('number')
    })

    it('preserves decimal values', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: 0 },
      })

      const input = wrapper.find('input')
      await input.setValue('123.45')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([123.45])
    })
  })

  describe('Events', () => {
    it('emits input event with correct payload', async () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      await input.trigger('input')

      const inputEvents = wrapper.emitted('input')
      expect(inputEvents).toHaveLength(1)
      expect(inputEvents?.[0][0]).toBeInstanceOf(Event)
    })

    it('emits dirty event on blur', async () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      await input.trigger('blur')

      expect(wrapper.emitted('dirty')?.[0]).toEqual([true])
    })

    it('selects all text on focus', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: '123' },
      })

      const input = wrapper.find('input')
      const selectSpy = vi.fn()
      input.element.select = selectSpy

      await input.trigger('focus')

      expect(selectSpy).toHaveBeenCalledOnce()
    })

    it('emits both update:modelValue and input events on input', async () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      await input.setValue('123')

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('input')).toHaveLength(1)
    })

    it('handles rapid input changes', async () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      await input.setValue('1')
      await input.setValue('12')
      await input.setValue('123')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toHaveLength(3)
      expect(emitted?.[0]).toEqual([1])
      expect(emitted?.[1]).toEqual([12])
      expect(emitted?.[2]).toEqual([123])
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { id: 'test-number' },
      })

      const input = wrapper.find('input')
      expect(input.element.tagName).toBe('INPUT')
      expect(input.attributes('type')).toBe('number')
      expect(input.attributes('id')).toBe('test-number')
      expect(input.attributes('name')).toBe('test-number')
    })

    it('supports aria-describedby attribute', () => {
      const wrapper = mount(FdsInputNumber, {
        attrs: {
          'aria-describedby': 'number-hint',
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('number-hint')
    })

    it('handles prefix and suffix aria-hidden correctly', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          prefix: 'DKK',
          suffix: 'kr',
        },
      })

      const prefix = wrapper.find('.form-input-prefix')
      const suffix = wrapper.find('.form-input-suffix')

      expect(prefix.attributes('aria-hidden')).toBe('true')
      expect(suffix.attributes('aria-hidden')).toBe('true')
    })

    it('meets accessibility standards', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          id: 'test-input',
          modelValue: 42,
        },
      })

      const input = wrapper.find('input')
      expect(input.element.tagName).toBe('INPUT')
      expect(input.attributes('type')).toBe('number')
      expect(input.attributes('id')).toBe('test-input')
    })

    it('meets accessibility standards with prefix and suffix', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          id: 'price-input',
          modelValue: 100,
          prefix: 'DKK',
          suffix: 'kr',
        },
      })

      const input = wrapper.find('input')
      expect(input.element.tagName).toBe('INPUT')
      expect(input.attributes('type')).toBe('number')
      expect(input.attributes('id')).toBe('price-input')

      const prefix = wrapper.find('.form-input-prefix')
      const suffix = wrapper.find('.form-input-suffix')
      expect(prefix.attributes('aria-hidden')).toBe('true')
      expect(suffix.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('Formgroup Integration', () => {
    it('uses injected aria-describedby from formgroup', () => {
      const wrapper = mount(FdsInputNumber, {
        global: {
          provide: {
            ariaDescribedby: 'form-hint-id',
          },
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('form-hint-id')
    })

    it('prioritizes explicit aria-describedby over injected', () => {
      const wrapper = mount(FdsInputNumber, {
        attrs: {
          'aria-describedby': 'explicit-hint',
        },
        global: {
          provide: {
            ariaDescribedby: 'injected-hint',
          },
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('explicit-hint')
    })

    it('uses injected ref aria-describedby from formgroup', async () => {
      const ariaDescribedby = ref('ref-hint-id')

      const wrapper = mount(FdsInputNumber, {
        global: {
          provide: {
            ariaDescribedby,
          },
        },
      })

      let input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('ref-hint-id')

      ariaDescribedby.value = 'updated-hint-id'
      await nextTick()

      input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('updated-hint-id')
    })

    it('handles undefined injected aria-describedby', () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBeUndefined()
    })

    it('works with formgroup provide/inject pattern', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          id: 'formgroup-input',
          modelValue: 50,
        },
        global: {
          provide: {
            ariaDescribedby: 'form-description',
          },
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('id')).toBe('formgroup-input')
      expect(input.attributes('aria-describedby')).toBe('form-description')
      expect(input.element.value).toBe('50')
    })
  })

  describe('Edge Cases', () => {
    it('handles negative numbers', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { min: -100 },
      })

      const input = wrapper.find('input')
      await input.setValue('-50')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([-50])
    })

    it('handles decimal numbers with step', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          step: 0.01,
          modelValue: 0,
        },
      })

      const input = wrapper.find('input')
      await input.setValue('123.45')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([123.45])
    })

    it('handles empty to number conversion', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: { modelValue: 123 },
      })

      const input = wrapper.find('input')
      await input.setValue('')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    })

    it('handles very large numbers', async () => {
      const largeNumber = '9999999999999999'
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      await input.setValue(largeNumber)

      // JavaScript converts large numbers, so we expect the numeric conversion
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10000000000000000])
    })

    it('handles scientific notation', async () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')
      await input.setValue('1e10')

      // JavaScript converts scientific notation to numeric value
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10000000000])
    })

    it('handles invalid number input gracefully', async () => {
      const wrapper = mount(FdsInputNumber)

      const input = wrapper.find('input')

      // Browser will filter invalid characters for type="number"
      // but we should still handle the event
      await input.setValue('abc')

      // Browser behavior may vary, but event should still be emitted
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('handles multiple width classes', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { widthClass: 'input-width-s input-width-custom' },
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain('input-width-s')
      expect(input.classes()).toContain('input-width-custom')
    })

    it('handles empty width class', () => {
      const wrapper = mount(FdsInputNumber, {
        props: { widthClass: '' },
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain('form-input')
    })
  })

  describe('Integration Scenarios', () => {
    it('works with reactive model value', async () => {
      const modelValue = ref(100)
      const wrapper = mount(FdsInputNumber, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (value: number | string) => {
            modelValue.value = value
          },
        },
      })

      let input = wrapper.find('input')
      expect(input.element.value).toBe('100')

      await input.setValue('200')

      // Simulate reactive update
      await wrapper.setProps({ modelValue: modelValue.value })
      input = wrapper.find('input')
      expect(input.element.value).toBe('200')
    })

    it('integrates with form validation patterns', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          id: 'age-input',
          min: 18,
          max: 100,
          modelValue: '',
        },
        attrs: {
          'aria-describedby': 'age-hint age-error',
          required: true,
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('id')).toBe('age-input')
      expect(input.attributes('min')).toBe('18')
      expect(input.attributes('max')).toBe('100')
      expect(input.attributes('aria-describedby')).toBe('age-hint age-error')
      expect(input.attributes('required')).toBeDefined()

      await input.setValue('25')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([25])

      await input.trigger('blur')
      expect(wrapper.emitted('dirty')?.[0]).toEqual([true])
    })

    it('works with currency formatting', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          prefix: 'DKK',
          suffix: '.00',
          modelValue: 1500,
          step: 0.01,
          min: 0,
        },
      })

      expect(wrapper.find('.form-input-prefix').text()).toBe('DKK')
      expect(wrapper.find('.form-input-suffix').text()).toBe('.00')

      const input = wrapper.find('input')
      expect(input.element.value).toBe('1500')
      expect(input.attributes('step')).toBe('0.01')
      expect(input.attributes('min')).toBe('0')
    })

    it('maintains consistency across prop updates', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          modelValue: 50,
          min: 0,
          max: 100,
        },
      })

      let input = wrapper.find('input')
      expect(input.element.value).toBe('50')
      expect(input.attributes('min')).toBe('0')
      expect(input.attributes('max')).toBe('100')

      // Update constraints
      await wrapper.setProps({ min: 10, max: 200 })
      input = wrapper.find('input')
      expect(input.attributes('min')).toBe('10')
      expect(input.attributes('max')).toBe('200')

      // Value should remain unchanged
      expect(input.element.value).toBe('50')
    })
  })

  describe('Browser Attribute Handling', () => {
    it('passes through additional HTML attributes', () => {
      const wrapper = mount(FdsInputNumber, {
        attrs: {
          placeholder: 'Enter a number',
          autocomplete: 'off',
          required: true,
          readonly: true,
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Enter a number')
      expect(input.attributes('autocomplete')).toBe('off')
      expect(input.attributes('required')).toBeDefined()
      expect(input.attributes('readonly')).toBeDefined()
    })

    it('maintains input type as number', () => {
      const wrapper = mount(FdsInputNumber, {
        attrs: {
          type: 'text', // Should be overridden
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('number')
    })

    it('handles browser-specific number validation', async () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          min: 0,
          max: 100,
          step: 1,
        },
      })

      const input = wrapper.find('input')

      // These attributes should be present for browser validation
      expect(input.attributes('min')).toBe('0')
      expect(input.attributes('max')).toBe('100')
      expect(input.attributes('step')).toBe('1')

      await input.setValue('50')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([50])
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 number input structure', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          id: 'compliant-number',
          modelValue: 42,
        },
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain('form-input')
      expect(input.attributes('type')).toBe('number')
      expect(input.attributes('id')).toBe('compliant-number')
      expect(input.attributes('name')).toBe('compliant-number')
    })

    it('supports DKFDS prefix/suffix pattern', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          prefix: 'DKK',
          suffix: 'kr',
        },
      })

      expect(wrapper.find('.form-input-wrapper').exists()).toBe(true)
      expect(wrapper.find('.form-input-wrapper--suffix').exists()).toBe(true)
      expect(wrapper.find('.form-input-prefix').exists()).toBe(true)
      expect(wrapper.find('.form-input-suffix').exists()).toBe(true)

      // Accessibility attributes
      expect(wrapper.find('.form-input-prefix').attributes('aria-hidden')).toBe('true')
      expect(wrapper.find('.form-input-suffix').attributes('aria-hidden')).toBe('true')
    })

    it('maintains semantic structure for accessibility compliance', () => {
      const wrapper = mount(FdsInputNumber, {
        props: {
          id: 'accessible-number',
          modelValue: 100,
        },
        attrs: {
          'aria-describedby': 'number-hint',
        },
      })

      const input = wrapper.find('input')
      expect(input.element.tagName).toBe('INPUT')
      expect(input.attributes('type')).toBe('number')
      expect(input.attributes('id')).toBe('accessible-number')
      expect(input.attributes('aria-describedby')).toBe('number-hint')
      expect(input.classes()).toContain('form-input')
    })

    it('supports DKFDS width sizing classes', () => {
      const widthClasses = ['input-width-xs', 'input-width-s', 'input-width-m', 'input-width-l']

      widthClasses.forEach((widthClass) => {
        const wrapper = mount(FdsInputNumber, {
          props: { widthClass },
        })

        const input = wrapper.find('input')
        expect(input.classes()).toContain(widthClass)
        expect(input.classes()).toContain('form-input')
      })
    })
  })
})
