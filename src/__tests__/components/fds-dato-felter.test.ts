import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsDatoFelter from '../../components/fds-dato-felter.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsDatoFelter', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsDatoFelter)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders date group container', () => {
      const wrapper = mount(FdsDatoFelter)
      expect(wrapper.find('.date-group').exists()).toBe(true)
      expect(wrapper.find('.js-calendar-group').exists()).toBe(true)
    })

    it('renders three input fields for day, month, and year', () => {
      const wrapper = mount(FdsDatoFelter)

      expect(wrapper.find('.form-group-day').exists()).toBe(true)
      expect(wrapper.find('.form-group-month').exists()).toBe(true)
      expect(wrapper.find('.form-group-year').exists()).toBe(true)

      const inputs = wrapper.findAll('input')
      expect(inputs).toHaveLength(3)
    })

    it('renders labels with correct Danish text', () => {
      const wrapper = mount(FdsDatoFelter)
      const labels = wrapper.findAll('label')

      expect(labels[0].text()).toBe('Dag')
      expect(labels[1].text()).toBe('Måned')
      expect(labels[2].text()).toBe('År')
    })

    it('assigns unique IDs to inputs and labels', () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const dayLabel = wrapper.find('.form-group-day label')

      expect(dayInput.attributes('id')).toBeDefined()
      expect(dayLabel.attributes('for')).toBe(dayInput.attributes('id'))
    })
  })

  describe('Props', () => {
    it('uses custom id when provided', () => {
      const wrapper = mount(FdsDatoFelter, {
        props: { id: 'custom-date' },
      })

      const dayInput = wrapper.find('.js-calendar-day-input')
      expect(dayInput.attributes('id')).toContain('custom-date')
    })

    it('parses initial modelValue correctly', () => {
      const wrapper = mount(FdsDatoFelter, {
        props: { modelValue: '2024-03-15' },
      })

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      expect(dayInput.element.value).toBe('15')
      expect(monthInput.element.value).toBe('3') // March is month 3 (1-indexed)
      expect(yearInput.element.value).toBe('2024')
    })

    it('handles empty modelValue', () => {
      const wrapper = mount(FdsDatoFelter, {
        props: { modelValue: '' },
      })

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      expect(dayInput.element.value).toBe('')
      expect(monthInput.element.value).toBe('')
      expect(yearInput.element.value).toBe('')
    })

    it('handles invalid modelValue', () => {
      const wrapper = mount(FdsDatoFelter, {
        props: { modelValue: 'invalid-date' },
      })

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      expect(dayInput.element.value).toBe('')
      expect(monthInput.element.value).toBe('')
      expect(yearInput.element.value).toBe('')
    })
  })

  describe('Events', () => {
    it('emits update:modelValue when day is changed', async () => {
      const wrapper = mount(FdsDatoFelter)
      const dayInput = wrapper.find('.js-calendar-day-input')

      await dayInput.setValue('15')
      await dayInput.trigger('input')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['--15'])
    })

    it('emits update:modelValue when month is changed', async () => {
      const wrapper = mount(FdsDatoFelter)
      const monthInput = wrapper.find('.js-calendar-month-input')

      await monthInput.setValue('03')
      await monthInput.trigger('input')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['-03-'])
    })

    it('emits update:modelValue when year is changed', async () => {
      const wrapper = mount(FdsDatoFelter)
      const yearInput = wrapper.find('.js-calendar-year-input')

      await yearInput.setValue('2024')
      await yearInput.trigger('input')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2024--'])
    })

    it('emits dirty event on blur', async () => {
      const wrapper = mount(FdsDatoFelter)
      const dayInput = wrapper.find('.js-calendar-day-input')

      await dayInput.trigger('blur')

      expect(wrapper.emitted('dirty')).toBeTruthy()
      expect(wrapper.emitted('dirty')?.[0]).toEqual([true])
    })

    it('emits valid event when date changes', async () => {
      const wrapper = mount(FdsDatoFelter, {
        props: { modelValue: '2024-03-15' },
      })

      const dayInput = wrapper.find('.js-calendar-day-input')
      await dayInput.setValue('20')
      await dayInput.trigger('input')

      expect(wrapper.emitted('valid')).toBeTruthy()
    })

    it('emits complete date when all fields are filled', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      await dayInput.setValue('15')
      await monthInput.setValue('03')
      await yearInput.setValue('2024')
      await yearInput.trigger('input')

      const emitted = wrapper.emitted('update:modelValue')
      const lastEmit = emitted?.[emitted.length - 1]
      expect(lastEmit).toEqual(['2024-03-15'])
    })
  })

  describe('User Interactions', () => {
    it('auto-focuses next field when day is complete', async () => {
      const wrapper = mount(FdsDatoFelter)
      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')

      // Mock focus method
      const focusSpy = vi.spyOn(monthInput.element, 'focus')

      // Set selection range
      Object.defineProperty(dayInput.element, 'selectionEnd', {
        writable: true,
        value: 2,
      })

      await dayInput.setValue('15')
      await dayInput.trigger('input')

      expect(focusSpy).toHaveBeenCalled()
    })

    it('auto-focuses year field when month is complete', async () => {
      const wrapper = mount(FdsDatoFelter)
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      // Mock focus method
      const focusSpy = vi.spyOn(yearInput.element, 'focus')

      // Set selection range
      Object.defineProperty(monthInput.element, 'selectionEnd', {
        writable: true,
        value: 2,
      })

      await monthInput.setValue('03')
      await monthInput.trigger('input')

      expect(focusSpy).toHaveBeenCalled()
    })

    it('selects input content on focus', async () => {
      const wrapper = mount(FdsDatoFelter, {
        props: { modelValue: '2024-03-15' },
      })

      const dayInput = wrapper.find('.js-calendar-day-input')
      const selectSpy = vi.fn()
      dayInput.element.select = selectSpy

      await dayInput.trigger('focus')

      expect(selectSpy).toHaveBeenCalled()
    })

    it('does not auto-focus when cursor is at beginning', async () => {
      const wrapper = mount(FdsDatoFelter)
      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')

      const focusSpy = vi.spyOn(monthInput.element, 'focus')

      // Set selection at beginning
      Object.defineProperty(dayInput.element, 'selectionEnd', {
        writable: true,
        value: 1,
      })

      await dayInput.setValue('1')
      await dayInput.trigger('input')

      expect(focusSpy).not.toHaveBeenCalled()
    })
  })

  describe('Input Validation', () => {
    it('day input has correct validation attributes', () => {
      const wrapper = mount(FdsDatoFelter)
      const dayInput = wrapper.find('.js-calendar-day-input')

      expect(dayInput.attributes('type')).toBe('tel')
      expect(dayInput.attributes('data-min')).toBe('1')
      expect(dayInput.attributes('data-max')).toBe('31')
      expect(dayInput.attributes('maxlength')).toBe('2')
      expect(dayInput.attributes('pattern')).toBe('^[0-9]{0,2}$')
      expect(dayInput.attributes('title')).toBe('Indskriv dag på måneden som tal')
    })

    it('month input has correct validation attributes', () => {
      const wrapper = mount(FdsDatoFelter)
      const monthInput = wrapper.find('.js-calendar-month-input')

      expect(monthInput.attributes('type')).toBe('tel')
      expect(monthInput.attributes('data-min')).toBe('1')
      expect(monthInput.attributes('data-max')).toBe('12')
      expect(monthInput.attributes('maxlength')).toBe('2')
      expect(monthInput.attributes('pattern')).toBe('^[0-9]{0,2}$')
      expect(monthInput.attributes('title')).toBe('Indskriv månedens nummer')
    })

    it('year input has correct validation attributes', () => {
      const wrapper = mount(FdsDatoFelter)
      const yearInput = wrapper.find('.js-calendar-year-input')

      expect(yearInput.attributes('type')).toBe('tel')
      expect(yearInput.attributes('data-min')).toBe('1900')
      expect(yearInput.attributes('data-max')).toBe('3000')
      expect(yearInput.attributes('maxlength')).toBe('4')
      expect(yearInput.attributes('pattern')).toBe('^[0-9]{0,4}$')
      expect(yearInput.attributes('title')).toBe('Indskriv årstal')
    })
  })

  describe('Accessibility', () => {
    it('has proper label-input associations', () => {
      const wrapper = mount(FdsDatoFelter)

      const dayLabel = wrapper.find('.form-group-day label')
      const dayInput = wrapper.find('.js-calendar-day-input')
      expect(dayLabel.attributes('for')).toBe(dayInput.attributes('id'))

      const monthLabel = wrapper.find('.form-group-month label')
      const monthInput = wrapper.find('.js-calendar-month-input')
      expect(monthLabel.attributes('for')).toBe(monthInput.attributes('id'))

      const yearLabel = wrapper.find('.form-group-year label')
      const yearInput = wrapper.find('.js-calendar-year-input')
      expect(yearLabel.attributes('for')).toBe(yearInput.attributes('id'))
    })

    it('has descriptive titles for screen readers', () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      expect(dayInput.attributes('title')).toBeTruthy()
      expect(monthInput.attributes('title')).toBeTruthy()
      expect(yearInput.attributes('title')).toBeTruthy()
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <form>
              <fieldset>
                <legend>Vælg dato</legend>
                <FdsDatoFelter modelValue="2024-03-15" />
              </fieldset>
            </form>
          </main>
        `,
        components: { FdsDatoFelter },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles short input values without auto-advance', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')

      // Simulate typing single digit (cursor at position 1)
      Object.defineProperty(dayInput.element, 'selectionEnd', {
        writable: true,
        value: 1,
      })

      await dayInput.setValue('5')
      await dayInput.trigger('input')

      // Should not focus next field
      const focusSpy = vi.spyOn(monthInput.element, 'focus')
      expect(focusSpy).not.toHaveBeenCalled()
    })

    it('handles partial date entries', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      await dayInput.setValue('15')
      await yearInput.setValue('2024')
      await yearInput.trigger('input')

      const emitted = wrapper.emitted('update:modelValue')
      const lastEmit = emitted?.[emitted.length - 1]
      expect(lastEmit).toEqual(['2024--15'])
    })

    it('handles single digit inputs', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')

      // For single digits, no auto-advance happens
      await dayInput.setValue('5')
      await monthInput.setValue('3')

      // Set selection end to trigger onInput
      Object.defineProperty(monthInput.element, 'selectionEnd', {
        writable: true,
        value: 2,
      })

      await monthInput.trigger('input')

      const emitted = wrapper.emitted('update:modelValue')
      const lastEmit = emitted?.[emitted.length - 1]
      expect(lastEmit).toEqual(['-03-05'])
    })
  })

  describe('Date Validation', () => {
    it('validates November 31 as invalid', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      await dayInput.setValue('31')
      await monthInput.setValue('11')
      await yearInput.setValue('2025')

      // Set selectionEnd to trigger emit
      Object.defineProperty(yearInput.element, 'selectionEnd', {
        writable: true,
        value: 4,
      })

      await yearInput.trigger('input')

      expect(wrapper.emitted('valid')?.[wrapper.emitted('valid')!.length - 1]).toEqual([false])
    })

    it('validates November 30 as valid', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      await dayInput.setValue('30')
      await monthInput.setValue('11')
      await yearInput.setValue('2025')

      // Set selectionEnd to trigger emit
      Object.defineProperty(yearInput.element, 'selectionEnd', {
        writable: true,
        value: 4,
      })

      await yearInput.trigger('input')

      expect(wrapper.emitted('valid')?.[wrapper.emitted('valid')!.length - 1]).toEqual([true])
    })

    it('validates February 29 correctly for leap years', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      // 2024 is a leap year
      await dayInput.setValue('29')
      await monthInput.setValue('2')
      await yearInput.setValue('2024')

      Object.defineProperty(yearInput.element, 'selectionEnd', {
        writable: true,
        value: 4,
      })

      await yearInput.trigger('input')

      expect(wrapper.emitted('valid')?.[wrapper.emitted('valid')!.length - 1]).toEqual([true])
    })

    it('validates February 29 as invalid for non-leap years', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      // 2023 is not a leap year
      await dayInput.setValue('29')
      await monthInput.setValue('2')
      await yearInput.setValue('2023')

      Object.defineProperty(yearInput.element, 'selectionEnd', {
        writable: true,
        value: 4,
      })

      await yearInput.trigger('input')

      expect(wrapper.emitted('valid')?.[wrapper.emitted('valid')!.length - 1]).toEqual([false])
    })

    it('validates month 13 as invalid', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      await dayInput.setValue('15')
      await monthInput.setValue('13')
      await yearInput.setValue('2025')

      Object.defineProperty(yearInput.element, 'selectionEnd', {
        writable: true,
        value: 4,
      })

      await yearInput.trigger('input')

      expect(wrapper.emitted('valid')?.[wrapper.emitted('valid')!.length - 1]).toEqual([false])
    })

    it('validates day 0 as invalid', async () => {
      const wrapper = mount(FdsDatoFelter)

      const dayInput = wrapper.find('.js-calendar-day-input')
      const monthInput = wrapper.find('.js-calendar-month-input')
      const yearInput = wrapper.find('.js-calendar-year-input')

      await dayInput.setValue('0')
      await monthInput.setValue('11')
      await yearInput.setValue('2025')

      Object.defineProperty(yearInput.element, 'selectionEnd', {
        writable: true,
        value: 4,
      })

      await yearInput.trigger('input')

      expect(wrapper.emitted('valid')?.[wrapper.emitted('valid')!.length - 1]).toEqual([false])
    })
  })

  describe('Integration', () => {
    it('works with v-model binding', async () => {
      const ParentComponent = {
        template: `
          <div>
            <FdsDatoFelter v-model="date" />
            <p>Selected: {{ date }}</p>
          </div>
        `,
        components: { FdsDatoFelter },
        data() {
          return { date: '2024-03-15' }
        },
      }

      const wrapper = mount(ParentComponent)
      const datePicker = wrapper.findComponent(FdsDatoFelter)

      expect(wrapper.find('p').text()).toBe('Selected: 2024-03-15')

      const dayInput = datePicker.find('.js-calendar-day-input')
      await dayInput.setValue('20')
      await dayInput.trigger('input')

      // Date should update to March 20th
      expect(wrapper.vm.date).toBe('2024-03-20')
    })

    it('integrates with form validation', async () => {
      const FormWrapper = {
        template: `
          <form @submit.prevent="handleSubmit">
            <FdsDatoFelter 
              v-model="birthDate" 
              @valid="isValid = $event"
              @dirty="isDirty = $event"
            />
            <button type="submit" :disabled="!isValid || !isDirty">Submit</button>
          </form>
        `,
        components: { FdsDatoFelter },
        data() {
          return {
            birthDate: '',
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

      // Initially disabled
      expect(submitButton.attributes('disabled')).toBeDefined()

      // Fill in date
      const datePicker = wrapper.findComponent(FdsDatoFelter)
      const dayInput = datePicker.find('.js-calendar-day-input')

      await dayInput.setValue('15')
      await dayInput.trigger('blur')

      expect(wrapper.vm.isDirty).toBe(true)
    })
  })
})
