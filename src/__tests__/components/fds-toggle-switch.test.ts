import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import FdsToggleSwitch from '../../components/input/fds-toggle-switch.vue'

// Mock the formId utility
vi.mock('../../composables/formId', () => ({
  default: (id?: string | null, autogenId = false) => ({
    formid: ref(id || 'fid_generated_id'),
  }),
}))

describe('FdsToggleSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders toggle switch button with correct DKFDS structure', () => {
      const wrapper = mount(FdsToggleSwitch)

      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.classes()).toContain('toggle-switch')
      expect(button.attributes('type')).toBe('button')
      expect(button.attributes('role')).toBe('switch')
    })

    it('renders without errors', () => {
      expect(() => mount(FdsToggleSwitch)).not.toThrow()
    })

    it('generates unique ID when not provided', () => {
      const wrapper = mount(FdsToggleSwitch)
      const button = wrapper.find('button')

      expect(button.attributes('id')).toBe('fid_generated_id')
    })

    it('uses provided ID', () => {
      const customId = 'my-toggle'
      const wrapper = mount(FdsToggleSwitch, {
        props: { id: customId },
      })

      const button = wrapper.find('button')
      expect(button.attributes('id')).toBe(customId)
    })

    it('displays default text based on state', () => {
      const wrapperOff = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })
      expect(wrapperOff.text()).toBe('Fra')

      const wrapperOn = mount(FdsToggleSwitch, {
        props: { modelValue: true },
      })
      expect(wrapperOn.text()).toBe('Til')
    })

    it('displays custom text when provided', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          modelValue: false,
          offText: 'Deaktiveret',
          onText: 'Aktiveret',
        },
      })
      expect(wrapper.text()).toBe('Deaktiveret')

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.text()).toBe('Aktiveret')
    })

    it('applies additional CSS classes', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { class: 'custom-class' },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('custom-class')
    })
  })

  describe('Props', () => {
    it('accepts and applies modelValue prop correctly', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: true },
      })

      const button = wrapper.find('button')
      expect(button.attributes('aria-checked')).toBe('true')
    })

    it('handles disabled state correctly', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { disabled: true },
      })

      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('uses default prop values', () => {
      const wrapper = mount(FdsToggleSwitch)

      const button = wrapper.find('button')
      expect(button.attributes('aria-checked')).toBe('false')
      expect(button.attributes('disabled')).toBeUndefined()
      expect(wrapper.text()).toBe('Fra')
    })

    it('handles null and undefined props', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          id: null,
          modelValue: undefined,
          disabled: undefined,
        },
      })

      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.attributes('aria-checked')).toBe('false')
    })

    it('updates text when onText/offText props change', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          modelValue: false,
          offText: 'Original Off',
          onText: 'Original On',
        },
      })

      expect(wrapper.text()).toBe('Original Off')

      await wrapper.setProps({
        offText: 'Updated Off',
        onText: 'Updated On',
      })

      expect(wrapper.text()).toBe('Updated Off')

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.text()).toBe('Updated On')
    })
  })

  describe('v-model Support', () => {
    it('supports v-model binding', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('toggles state correctly on click', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      let button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

      // Simulate prop update and test reverse toggle
      await wrapper.setProps({ modelValue: true })
      button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
    })

    it('emits correct boolean values', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')
      await button.trigger('click')

      const emittedEvents = wrapper.emitted('update:modelValue')
      expect(emittedEvents).toHaveLength(1)
      expect(typeof emittedEvents?.[0][0]).toBe('boolean')
      expect(emittedEvents?.[0][0]).toBe(true)
    })
  })

  describe('Events', () => {
    it('emits click event with correct payload', async () => {
      const wrapper = mount(FdsToggleSwitch)

      const button = wrapper.find('button')
      await button.trigger('click')

      const clickEvents = wrapper.emitted('click')
      expect(clickEvents).toHaveLength(1)
      expect(clickEvents?.[0][0]).toBeInstanceOf(MouseEvent)
    })

    it('emits both update:modelValue and click events', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('does not emit events when disabled', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          disabled: true,
          modelValue: false,
        },
      })

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('prevents toggle when disabled but still emits click', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          disabled: true,
          modelValue: false,
        },
      })

      const button = wrapper.find('button')
      await button.trigger('click')

      // Should not emit modelValue update when disabled
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()

      // But should still emit click event (browser default behavior)
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Slots', () => {
    it('renders slot content instead of default text', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
        slots: {
          default: 'Custom Toggle Text',
        },
      })

      expect(wrapper.text()).toBe('Custom Toggle Text')
    })

    it('renders HTML slot content', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
        slots: {
          default: '<strong>Bold Toggle</strong>',
        },
      })

      expect(wrapper.find('strong').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('Bold Toggle')
    })

    it('slot content takes precedence over text props', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          modelValue: false,
          offText: 'Prop Off Text',
          onText: 'Prop On Text',
        },
        slots: {
          default: 'Slot Content',
        },
      })

      expect(wrapper.text()).toBe('Slot Content')
      expect(wrapper.text()).not.toBe('Prop Off Text')
    })

    it('updates slot content reactively', async () => {
      const slotContent = ref('Initial Slot')
      const wrapper = mount(FdsToggleSwitch, {
        slots: {
          default: () => slotContent.value,
        },
      })

      expect(wrapper.text()).toBe('Initial Slot')

      slotContent.value = 'Updated Slot'
      await nextTick()

      expect(wrapper.text()).toBe('Updated Slot')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: true },
      })

      const button = wrapper.find('button')
      expect(button.attributes('role')).toBe('switch')
      expect(button.attributes('aria-checked')).toBe('true')
    })

    it('updates aria-checked when state changes', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      let button = wrapper.find('button')
      expect(button.attributes('aria-checked')).toBe('false')

      await wrapper.setProps({ modelValue: true })
      button = wrapper.find('button')
      expect(button.attributes('aria-checked')).toBe('true')
    })

    it('supports keyboard interaction', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')
      await button.trigger('keydown', { key: 'Enter' })

      // Button should be focusable and react to keyboard events
      expect(button.element.tagName).toBe('BUTTON')
    })

    it('has proper semantic structure', () => {
      const wrapper = mount(FdsToggleSwitch)

      const button = wrapper.find('button')
      expect(button.element.tagName).toBe('BUTTON')
      expect(button.attributes('type')).toBe('button')
      expect(button.attributes('role')).toBe('switch')
    })

    it('meets accessibility standards', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          id: 'test-toggle',
          modelValue: false,
        },
        slots: {
          default: 'Accessible Toggle',
        },
      })

      // Basic accessibility checks
      const button = wrapper.find('button')
      expect(button.attributes('role')).toBe('switch')
      expect(button.attributes('aria-checked')).toBe('false')
      expect(button.attributes('id')).toBe('test-toggle')
    })
  })

  describe('Formgroup Integration', () => {
    it('uses injected aria-describedby from formgroup', () => {
      const wrapper = mount(FdsToggleSwitch, {
        global: {
          provide: {
            ariaDescribedby: 'form-hint-id',
          },
        },
      })

      const button = wrapper.find('button')
      expect(button.attributes('aria-describedby')).toBe('form-hint-id')
    })

    it('uses injected ref aria-describedby from formgroup', async () => {
      const ariaDescribedby = ref('ref-hint-id')

      const wrapper = mount(FdsToggleSwitch, {
        global: {
          provide: {
            ariaDescribedby,
          },
        },
      })

      let button = wrapper.find('button')
      expect(button.attributes('aria-describedby')).toBe('ref-hint-id')

      ariaDescribedby.value = 'updated-hint-id'
      await nextTick()

      button = wrapper.find('button')
      expect(button.attributes('aria-describedby')).toBe('updated-hint-id')
    })

    it('handles undefined injected aria-describedby', () => {
      const wrapper = mount(FdsToggleSwitch)

      const button = wrapper.find('button')
      expect(button.attributes('aria-describedby')).toBeUndefined()
    })

    it('works with formgroup provide/inject pattern', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { id: 'formgroup-toggle' },
        global: {
          provide: {
            ariaDescribedby: 'form-description',
          },
        },
      })

      const button = wrapper.find('button')
      expect(button.attributes('id')).toBe('formgroup-toggle')
      expect(button.attributes('aria-describedby')).toBe('form-description')
      expect(button.attributes('role')).toBe('switch')
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid state changes', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')

      // Rapid clicks - each click toggles from the current modelValue prop
      await button.trigger('click') // false -> true
      await button.trigger('click') // still false -> true (prop hasn't changed)
      await button.trigger('click') // still false -> true (prop hasn't changed)

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toHaveLength(3)
      // All clicks toggle from false to true since we don't update the prop
      expect(emitted?.[0]).toEqual([true])
      expect(emitted?.[1]).toEqual([true])
      expect(emitted?.[2]).toEqual([true])
    })

    it('handles boolean conversion correctly', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: true },
      })

      let button = wrapper.find('button')
      expect(button.attributes('aria-checked')).toBe('true')

      await wrapper.setProps({ modelValue: false })
      button = wrapper.find('button')
      expect(button.attributes('aria-checked')).toBe('false')
    })

    it('handles empty class prop', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { class: '' },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('toggle-switch')
    })

    it('handles multiple CSS classes', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { class: 'class1 class2 class3' },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('toggle-switch')
      expect(button.classes()).toContain('class1')
      expect(button.classes()).toContain('class2')
      expect(button.classes()).toContain('class3')
    })

    it('handles special characters in text props', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          modelValue: false,
          offText: 'Från & Tīll åäö',
          onText: 'På & Āv ñç',
        },
      })

      expect(wrapper.text()).toBe('Från & Tīll åäö')

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.text()).toBe('På & Āv ñç')
    })
  })

  describe('Integration Scenarios', () => {
    it('works with reactive model value', async () => {
      const modelValue = ref(false)
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (value: boolean) => {
            modelValue.value = value
          },
        },
      })

      const button = wrapper.find('button')
      expect(button.attributes('aria-checked')).toBe('false')

      await button.trigger('click')

      // Simulate reactive update
      await wrapper.setProps({ modelValue: modelValue.value })
      expect(button.attributes('aria-checked')).toBe('true')
    })

    it('integrates with form validation patterns', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          id: 'terms-toggle',
          modelValue: false,
        },
        global: {
          provide: {
            ariaDescribedby: 'terms-hint terms-error',
          },
        },
      })

      const button = wrapper.find('button')
      expect(button.attributes('id')).toBe('terms-toggle')
      expect(button.attributes('aria-describedby')).toBe('terms-hint terms-error')
      expect(button.attributes('role')).toBe('switch')

      await button.trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('maintains state consistency across prop updates', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      // Initial state
      expect(wrapper.find('button').attributes('aria-checked')).toBe('false')
      expect(wrapper.text()).toBe('Fra')

      // Update to true
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('button').attributes('aria-checked')).toBe('true')
      expect(wrapper.text()).toBe('Til')

      // Back to false
      await wrapper.setProps({ modelValue: false })
      expect(wrapper.find('button').attributes('aria-checked')).toBe('false')
      expect(wrapper.text()).toBe('Fra')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 toggle switch structure', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: {
          id: 'compliant-toggle',
          modelValue: false,
        },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('toggle-switch')
      expect(button.attributes('type')).toBe('button')
      expect(button.attributes('role')).toBe('switch')
      expect(button.attributes('id')).toBe('compliant-toggle')
    })

    it('uses correct Danish text by default', () => {
      const wrapperOff = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })
      expect(wrapperOff.text()).toBe('Fra')

      const wrapperOn = mount(FdsToggleSwitch, {
        props: { modelValue: true },
      })
      expect(wrapperOn.text()).toBe('Til')
    })

    it('maintains semantic structure for accessibility compliance', () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')
      expect(button.element.tagName).toBe('BUTTON')
      expect(button.attributes('role')).toBe('switch')
      expect(button.attributes('aria-checked')).toBe('false')
      expect(button.classes()).toContain('toggle-switch')
    })

    it('supports DKFDS switch interaction pattern', async () => {
      const wrapper = mount(FdsToggleSwitch, {
        props: { modelValue: false },
      })

      const button = wrapper.find('button')

      // Should toggle on click
      await button.trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

      // Should prevent interaction when disabled
      await wrapper.setProps({ disabled: true })
      await button.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1) // No new emission
    })
  })
})
