import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import FdsLabel from '../../components/forms/fds-label.vue'

// Mock the formId utility
vi.mock('../../composables/formId', () => ({
  default: (id?: string | null, _autogenId = false) => ({
    formid: ref(id || 'generated-form-id'),
  }),
}))

describe('FdsLabel', () => {
  describe('Rendering', () => {
    it('renders label element with correct DKFDS class', () => {
      const wrapper = mount(FdsLabel)

      const label = wrapper.find('label')
      expect(label.exists()).toBe(true)
      expect(label.classes()).toContain('form-label')
    })

    it('renders without errors', () => {
      expect(() => mount(FdsLabel)).not.toThrow()
    })

    it('applies for attribute correctly', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'test-input',
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('test-input')
    })

    it('generates for attribute using formId composable when forId not provided', () => {
      const wrapper = mount(FdsLabel)

      expect(wrapper.find('label').attributes('for')).toBe('generated-form-id')
    })
  })

  describe('Props', () => {
    it('accepts forId prop and applies it to for attribute', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'custom-input-id',
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('custom-input-id')
    })

    it('handles null forId prop', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: null,
        },
      })

      // Should use formId composable result
      expect(wrapper.find('label').attributes('for')).toBe('generated-form-id')
    })

    it('applies required prop correctly', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
      })

      const marker = wrapper.find('.form-required-marker')
      expect(marker.exists()).toBe(true)
      expect(marker.text()).toBe('(skal udfyldes)')
    })

    it('does not show required marker when required is false', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: false,
        },
      })

      expect(wrapper.find('.form-required-marker').exists()).toBe(false)
    })

    it('shows required marker by default when required is true', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
      })

      expect(wrapper.find('.form-required-marker').exists()).toBe(true)
    })

    it('hides required marker when showRequired is false', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
          showRequired: false,
        },
      })

      expect(wrapper.find('.form-required-marker').exists()).toBe(false)
    })

    it('shows required marker when showRequired is true', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
          showRequired: true,
        },
      })

      expect(wrapper.find('.form-required-marker').exists()).toBe(true)
    })

    it('uses custom required text when provided', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
          requiredText: 'Custom required text',
        },
      })

      const marker = wrapper.find('.form-required-marker')
      expect(marker.exists()).toBe(true)
      expect(marker.text()).toBe('Custom required text')
    })

    it('uses default Danish required text', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
      })

      expect(wrapper.find('.form-required-marker').text()).toBe('(skal udfyldes)')
    })
  })

  describe('Required Field Indication', () => {
    it('shows required marker only when both required is true and showRequired is true', () => {
      const testCases = [
        { required: false, showRequired: false, expected: false },
        { required: false, showRequired: true, expected: false },
        { required: true, showRequired: false, expected: false },
        { required: true, showRequired: true, expected: true },
      ]

      testCases.forEach(({ required, showRequired, expected }) => {
        const wrapper = mount(FdsLabel, {
          props: { required, showRequired },
        })

        expect(wrapper.find('.form-required-marker').exists()).toBe(expected)
      })
    })

    it('supports different required text variations', () => {
      const requiredTexts = ['(obligatorisk)', '(påkrævet)', '(skal angives)', '(required)', '*']

      requiredTexts.forEach((requiredText) => {
        const wrapper = mount(FdsLabel, {
          props: {
            required: true,
            requiredText,
          },
        })

        expect(wrapper.find('.form-required-marker').text()).toBe(requiredText)
      })
    })
  })

  describe('Slots', () => {
    it('renders slot content', () => {
      const wrapper = mount(FdsLabel, {
        slots: {
          default: 'Label text content',
        },
      })

      expect(wrapper.text()).toContain('Label text content')
    })

    it('renders HTML slot content', () => {
      const wrapper = mount(FdsLabel, {
        slots: {
          default: '<strong>Bold label</strong>',
        },
      })

      expect(wrapper.find('strong').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('Bold label')
    })

    it('renders slot content before required marker', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
        slots: {
          default: 'Label text',
        },
      })

      const labelText = wrapper.text()
      const labelIndex = labelText.indexOf('Label text')
      const markerIndex = labelText.indexOf('(skal udfyldes)')

      expect(labelIndex).toBeLessThan(markerIndex)
    })

    it('handles empty slot content gracefully', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
        slots: {
          default: '',
        },
      })

      expect(wrapper.text()).toBe('(skal udfyldes)')
    })
  })

  describe('Formgroup Integration', () => {
    it('uses injected formid from formgroup when available', () => {
      const wrapper = mount(FdsLabel, {
        global: {
          provide: {
            formid: 'injected-form-id',
          },
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('injected-form-id')
    })

    it('uses injected ref formid from formgroup when available', () => {
      const injectedFormId = ref('ref-form-id')

      const wrapper = mount(FdsLabel, {
        global: {
          provide: {
            formid: injectedFormId,
          },
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('ref-form-id')
    })

    it('prioritizes injected formid over forId prop', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'prop-id',
        },
        global: {
          provide: {
            formid: 'injected-id',
          },
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('injected-id')
    })

    it('falls back to formId composable when no injection', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'fallback-id',
        },
      })

      // Due to mock, should use the fallback-id passed to formId
      expect(wrapper.find('label').attributes('for')).toBe('fallback-id')
    })

    it('updates for attribute when injected formid changes', async () => {
      const injectedFormId = ref('initial-id')

      const wrapper = mount(FdsLabel, {
        global: {
          provide: {
            formid: injectedFormId,
          },
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('initial-id')

      // Change the injected ref value
      injectedFormId.value = 'updated-id'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('label').attributes('for')).toBe('updated-id')
    })
  })

  describe('Accessibility', () => {
    it('has correct semantic structure for screen readers', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'input-field',
          required: true,
        },
        slots: {
          default: 'Username',
        },
      })

      const label = wrapper.find('label')
      expect(label.attributes('for')).toBe('input-field')
      expect(label.text()).toContain('Username')
      expect(label.text()).toContain('(skal udfyldes)')
    })

    it('provides proper association between label and form control', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'password-input',
        },
        slots: {
          default: 'Password',
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('password-input')
    })

    it('indicates required fields to assistive technology', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
        slots: {
          default: 'Email address',
        },
      })

      // Required marker should be present for screen readers
      const marker = wrapper.find('.form-required-marker')
      expect(marker.exists()).toBe(true)
      expect(marker.text()).toBe('(skal udfyldes)')
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined forId gracefully', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: undefined,
        },
      })

      // Should fall back to formId composable
      expect(wrapper.find('label').attributes('for')).toBeTruthy()
    })

    it('handles empty string forId', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: '',
        },
      })

      // Empty string should be passed to formId composable
      expect(wrapper.find('label').attributes('for')).toBeTruthy()
    })

    it('handles empty required text', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
          requiredText: '',
        },
      })

      const marker = wrapper.find('.form-required-marker')
      expect(marker.exists()).toBe(true)
      expect(marker.text()).toBe('')
    })

    it('handles special characters in required text', () => {
      const specialText = '* (required) 必須 مطلوب'
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
          requiredText: specialText,
        },
      })

      expect(wrapper.find('.form-required-marker').text()).toBe(specialText)
    })
  })

  describe('Integration Scenarios', () => {
    it('works correctly with form input components', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'username-input',
          required: true,
        },
        slots: {
          default: 'Username',
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('username-input')
      expect(wrapper.text()).toBe('Username(skal udfyldes)')
    })

    it('integrates with formgroup provide/inject pattern', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
        slots: {
          default: 'Field label',
        },
        global: {
          provide: {
            formid: 'provided-field-id',
          },
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('provided-field-id')
      expect(wrapper.text()).toContain('Field label')
      expect(wrapper.find('.form-required-marker').exists()).toBe(true)
    })

    it('maintains reactivity with required prop changes', async () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'static-id',
          required: false,
          requiredText: 'Initial text',
        },
        slots: {
          default: 'Dynamic label',
        },
      })

      expect(wrapper.find('label').attributes('for')).toBe('static-id')
      expect(wrapper.find('.form-required-marker').exists()).toBe(false)

      await wrapper.setProps({
        required: true,
        requiredText: 'Updated text',
      })

      expect(wrapper.find('label').attributes('for')).toBe('static-id')
      expect(wrapper.find('.form-required-marker').exists()).toBe(true)
      expect(wrapper.find('.form-required-marker').text()).toBe('Updated text')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 label structure', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'compliant-input',
          required: true,
        },
        slots: {
          default: 'DKFDS Label',
        },
      })

      const label = wrapper.find('label')
      expect(label.classes()).toContain('form-label')
      expect(label.attributes('for')).toBe('compliant-input')
      expect(wrapper.find('.form-required-marker').exists()).toBe(true)
    })

    it('uses correct Danish required text by default', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
        },
      })

      expect(wrapper.find('.form-required-marker').text()).toBe('(skal udfyldes)')
    })

    it('maintains semantic structure for accessibility compliance', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          forId: 'accessible-field',
        },
        slots: {
          default: 'Accessible label',
        },
      })

      const label = wrapper.find('label')
      expect(label.element.tagName).toBe('LABEL')
      expect(label.attributes('for')).toBe('accessible-field')
      expect(label.classes()).toContain('form-label')
    })

    it('supports DKFDS required field pattern', () => {
      const wrapper = mount(FdsLabel, {
        props: {
          required: true,
          showRequired: true,
        },
        slots: {
          default: 'Required field',
        },
      })

      const marker = wrapper.find('.form-required-marker')
      expect(marker.exists()).toBe(true)
      expect(marker.classes()).toContain('form-required-marker')
      expect(marker.text()).toBe('(skal udfyldes)')
    })
  })
})
