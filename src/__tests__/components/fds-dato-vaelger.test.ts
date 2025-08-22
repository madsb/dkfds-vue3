import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsDatoVaelger from '../../components/input/fds-dato-vaelger.vue'
import { testAccessibility } from '../../test-utils'

describe('FdsDatoVaelger', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsDatoVaelger)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders native HTML5 date input', () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('date')
    })

    it('applies correct CSS classes', () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      expect(input.classes()).toContain('form-input')
      expect(input.classes()).toContain('form-input-date')
    })

    it('generates unique ID when not provided', () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      expect(input.attributes('id')).toBeDefined()
      expect(input.attributes('name')).toBe(input.attributes('id'))
    })
  })

  describe('Props', () => {
    it('uses custom id when provided', () => {
      const wrapper = mount(FdsDatoVaelger, {
        props: { id: 'custom-date-picker' },
      })

      const input = wrapper.find('input')
      expect(input.attributes('id')).toContain('custom-date-picker')
    })

    it('accepts initial modelValue', () => {
      const wrapper = mount(FdsDatoVaelger, {
        props: { modelValue: '2024-03-15' },
      })

      const input = wrapper.find('input')
      expect(input.element.value).toBe('2024-03-15')
    })

    it('handles empty modelValue', () => {
      const wrapper = mount(FdsDatoVaelger, {
        props: { modelValue: '' },
      })

      const input = wrapper.find('input')
      expect(input.element.value).toBe('')
    })

    it('handles undefined modelValue', () => {
      const wrapper = mount(FdsDatoVaelger)

      const input = wrapper.find('input')
      expect(input.element.value).toBe('')
    })
  })

  describe('Events', () => {
    it('emits update:modelValue on input', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-03-15')
      await input.trigger('input')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2024-03-15'])
    })

    it('emits dirty event on blur', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.trigger('blur')

      expect(wrapper.emitted('dirty')).toBeTruthy()
      expect(wrapper.emitted('dirty')?.[0]).toEqual([true])
    })

    it('emits valid event on input with correct validation status', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-03-15')
      await input.trigger('input')

      expect(wrapper.emitted('valid')).toBeTruthy()
      expect(wrapper.emitted('valid')?.[0]).toEqual([true])
    })

    it('emits valid false for invalid date', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('invalid-date')
      await input.trigger('input')

      expect(wrapper.emitted('valid')).toBeTruthy()
      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('emits events in correct order on input', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-03-15')
      await input.trigger('input')

      const events = Object.keys(wrapper.emitted())
      const validIndex = events.indexOf('valid')
      const updateIndex = events.indexOf('update:modelValue')

      // valid should be emitted before update:modelValue
      expect(validIndex).toBeLessThan(updateIndex)
    })
  })

  describe('Date Validation', () => {
    it('validates November 31 as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2025-11-31')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates November 30 as valid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2025-11-30')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([true])
    })

    it('validates February 29 correctly for leap years', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // 2024 is a leap year
      await input.setValue('2024-02-29')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([true])
    })

    it('validates February 29 as invalid for non-leap years', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // 2023 is not a leap year
      await input.setValue('2023-02-29')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates February 30 as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-02-30')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates April 31 as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // April has 30 days
      await input.setValue('2024-04-31')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates December 31 as valid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-12-31')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([true])
    })

    it('validates month 13 as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-13-15')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates month 0 as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-00-15')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates day 0 as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-03-00')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates day 32 as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-01-32')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates empty date as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('')
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates malformed date as invalid', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      await input.setValue('2024-3-15') // Missing leading zeros
      await input.trigger('input')

      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('validates dates with special leap year rules', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // 2000 is a leap year (divisible by 400)
      await input.setValue('2000-02-29')
      await input.trigger('input')
      expect(wrapper.emitted('valid')?.[0]).toEqual([true])

      // Clear emitted events
      wrapper.emitted('valid')!.length = 0

      // 1900 is not a leap year (divisible by 100 but not by 400)
      await input.setValue('1900-02-29')
      await input.trigger('input')
      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })
  })

  describe('Browser Behavior', () => {
    it('allows browser to handle date picker UI', () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // Should not have any custom date picker implementation
      expect(input.attributes('type')).toBe('date')
      expect(wrapper.find('.calendar-widget').exists()).toBe(false)
    })

    it('relies on browser for input format validation', () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // HTML5 date input expects yyyy-mm-dd format
      expect(input.attributes('pattern')).toBeUndefined()
      expect(input.attributes('placeholder')).toBeUndefined()
    })
  })

  describe('Accessibility', () => {
    it('has proper form control attributes', () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      expect(input.attributes('id')).toBeDefined()
      expect(input.attributes('name')).toBeDefined()
      expect(input.attributes('type')).toBe('date')
    })

    it('can be labeled externally', () => {
      const TestWrapper = {
        template: `
          <div>
            <label for="birth-date">Fødselsdato</label>
            <FdsDatoVaelger id="birth-date" />
          </div>
        `,
        components: { FdsDatoVaelger },
      }

      const wrapper = mount(TestWrapper)
      const label = wrapper.find('label')
      const input = wrapper.find('input')

      expect(label.attributes('for')).toBe(input.attributes('id'))
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <form>
              <div class="form-group">
                <label for="appointment-date">Vælg dato for aftale</label>
                <FdsDatoVaelger id="appointment-date" modelValue="2024-03-15" />
              </div>
            </form>
          </main>
        `,
        components: { FdsDatoVaelger },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Integration', () => {
    it('works with v-model binding', async () => {
      const ParentComponent = {
        template: `
          <div>
            <FdsDatoVaelger v-model="selectedDate" />
            <p>Selected: {{ selectedDate }}</p>
          </div>
        `,
        components: { FdsDatoVaelger },
        data() {
          return { selectedDate: '2024-03-15' }
        },
      }

      const wrapper = mount(ParentComponent)
      const input = wrapper.find('input')

      expect(wrapper.find('p').text()).toBe('Selected: 2024-03-15')

      await input.setValue('2024-03-20')
      await input.trigger('input')

      expect(wrapper.vm.selectedDate).toBe('2024-03-20')
      expect(wrapper.find('p').text()).toBe('Selected: 2024-03-20')
    })

    it('integrates with form validation', async () => {
      const FormWrapper = {
        template: `
          <form @submit.prevent="handleSubmit">
            <FdsDatoVaelger 
              v-model="deadline" 
              @valid="isValid = $event"
              @dirty="isDirty = $event"
            />
            <button type="submit" :disabled="!isValid || !isDirty">Submit</button>
          </form>
        `,
        components: { FdsDatoVaelger },
        data() {
          return {
            deadline: '',
            isValid: false,
            isDirty: false,
          }
        },
        methods: {
          handleSubmit() {
            // Handle form submission
          },
        },
      }

      const wrapper = mount(FormWrapper)
      const submitButton = wrapper.find('button[type="submit"]')
      const input = wrapper.find('input')

      // Initially disabled
      expect(submitButton.attributes('disabled')).toBeDefined()

      // Enter valid date
      await input.setValue('2024-03-15')
      await input.trigger('input')
      await input.trigger('blur')

      expect(wrapper.vm.isValid).toBe(true)
      expect(wrapper.vm.isDirty).toBe(true)
      expect(submitButton.attributes('disabled')).toBeUndefined()

      // Enter invalid date
      await input.setValue('2024-02-30')
      await input.trigger('input')

      expect(wrapper.vm.isValid).toBe(false)
      expect(submitButton.attributes('disabled')).toBeDefined()
    })

    it('can be used with custom validation messages', async () => {
      const ValidationWrapper = {
        template: `
          <div>
            <FdsDatoVaelger 
              v-model="date" 
              @valid="isValid = $event"
            />
            <p v-if="!isValid && attempted" class="error">
              Ugyldig dato - kontroller venligst datoen
            </p>
          </div>
        `,
        components: { FdsDatoVaelger },
        data() {
          return {
            date: '2024-03-15', // Start with valid date
            isValid: true,
            attempted: false,
          }
        },
      }

      const wrapper = mount(ValidationWrapper)
      const component = wrapper.findComponent(FdsDatoVaelger)

      // No error initially (valid date)
      expect(wrapper.find('.error').exists()).toBe(false)
      expect(wrapper.vm.isValid).toBe(true)

      // Simulate typing an invalid date through the component
      // Since HTML5 date input may reject invalid dates, we'll test through component directly
      component.vm.refValue = 'invalid-date'
      component.vm.onInput()
      wrapper.vm.attempted = true

      await wrapper.vm.$nextTick()

      // Check validation
      expect(component.emitted('valid')?.[0]).toEqual([false])
      expect(wrapper.vm.isValid).toBe(false)

      // Error message should now be visible
      expect(wrapper.find('.error').exists()).toBe(true)
      expect(wrapper.find('.error').text()).toBe('Ugyldig dato - kontroller venligst datoen')
    })
  })

  describe('Edge Cases', () => {
    it('handles date boundaries correctly', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // Test minimum reasonable date (year 1900)
      await input.setValue('1900-01-01')
      await input.trigger('input')
      expect(wrapper.emitted('valid')?.[0]).toEqual([true])

      // Test maximum reasonable date
      await input.setValue('2999-12-31')
      await input.trigger('input')
      expect(wrapper.emitted('valid')?.[1]).toEqual([true])
    })

    it('handles browser date input clearing', async () => {
      const wrapper = mount(FdsDatoVaelger, {
        props: { modelValue: '2024-03-15' },
      })
      const input = wrapper.find('input')

      // Clear the input
      await input.setValue('')
      await input.trigger('input')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
      expect(wrapper.emitted('valid')?.[0]).toEqual([false])
    })

    it('maintains internal state consistency', async () => {
      const wrapper = mount(FdsDatoVaelger)
      const input = wrapper.find('input')

      // Rapid changes
      await input.setValue('2024-03-15')
      await input.setValue('2024-03-16')
      await input.setValue('2024-03-17')
      await input.trigger('input')

      // Should emit the final value
      const emitted = wrapper.emitted('update:modelValue')
      const lastEmit = emitted?.[emitted.length - 1]
      expect(lastEmit).toEqual(['2024-03-17'])
    })
  })
})
