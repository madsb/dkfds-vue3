import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { provide, ref, nextTick } from 'vue'
import FdsFejlmeddelelse from '../../components/fds-fejlmeddelelse.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsFejlmeddelelse', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsFejlmeddelelse)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders span with correct class when error shown', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Error message',
          },
        },
      })
      expect(wrapper.find('.form-error-message').exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('does not render when valid', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: true,
            provideErrorMessage: 'Error message',
          },
        },
      })
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })

    it('renders injected error message with sr-only prefix', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'This field is required',
          },
        },
      })
      expect(wrapper.text()).toBe('Fejl: This field is required')
      expect(wrapper.find('.sr-only').text()).toBe('Fejl:')
    })
  })

  describe('Props', () => {
    it('respects auto prop when true', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        props: { auto: true },
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Auto error',
          },
        },
      })
      expect(wrapper.text()).toBe('Fejl: Auto error')
    })

    it('does not show injected error when auto is false', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        props: { auto: false },
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Should not show',
          },
        },
      })
      // The component still renders the div, but without content from injection
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })

    it('defaults auto to true', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Default auto',
          },
        },
      })
      expect(wrapper.text()).toBe('Fejl: Default auto')
    })

    it('shows slot content when auto is false', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        props: { auto: false },
        slots: {
          default: 'Slot error message',
        },
      })
      expect(wrapper.text()).toBe('Fejl: Slot error message')
    })
  })

  describe('Slots', () => {
    it('renders slot content instead of computed error', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Injected error',
          },
        },
        slots: {
          default: 'Slot error content',
        },
      })
      expect(wrapper.text()).toBe('Fejl: Slot error content')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        slots: {
          default: '<strong>Error:</strong> Custom message',
        },
      })
      expect(wrapper.find('strong').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('Error:')
      expect(wrapper.text()).toContain('Fejl: Error: Custom message')
    })

    it('renders empty slot', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        slots: {
          default: '',
        },
      })
      // Empty slot doesn't render
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })

    it('does not render when no slot and no computed error', () => {
      const wrapper = mount(FdsFejlmeddelelse)
      // No slot and default inject values mean no error shown
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })
  })

  describe('Inject/Provide Pattern', () => {
    it('works without provided values', () => {
      const wrapper = mount(FdsFejlmeddelelse)
      // Without provide, isValid defaults to true, so no error shown
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })

    it('handles null error message', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: null,
          },
        },
      })
      // With null message, compErrorMessage is null, so showError is false
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })

    it('handles empty string error message', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: '',
          },
        },
      })
      // Empty string is falsy for display purposes
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })

    it('reacts to provided value changes', async () => {
      const isValid = ref(true)
      const errorMessage = ref('Initial error')

      const ParentComponent = {
        template: '<FdsFejlmeddelelse />',
        components: { FdsFejlmeddelelse },
        setup() {
          provide('provideIsValid', isValid)
          provide('provideErrorMessage', errorMessage)
          return { isValid, errorMessage }
        },
      }

      const wrapper = mount(ParentComponent)

      // Initially valid - no error shown
      expect(wrapper.find('.form-error-message').exists()).toBe(false)

      // Make invalid
      isValid.value = false
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.form-error-message').exists()).toBe(true)
      expect(wrapper.text()).toBe('Fejl: Initial error')

      // Change error message
      errorMessage.value = 'Updated error'
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toBe('Fejl: Updated error')

      // Make valid again
      isValid.value = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })
  })

  describe('Computed Properties', () => {
    it('computes error message correctly with auto true', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        props: { auto: true },
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Computed error',
          },
        },
      })
      expect(wrapper.vm.compErrorMessage).toBe('Computed error')
    })

    it('computes null message with auto false', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        props: { auto: false },
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Should be null',
          },
        },
      })
      expect(wrapper.vm.compErrorMessage).toBe(null)
    })

    it('computes null message when valid', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        props: { auto: true },
        global: {
          provide: {
            provideIsValid: true,
            provideErrorMessage: 'Should be null',
          },
        },
      })
      expect(wrapper.vm.compErrorMessage).toBe(null)
    })

    it('shows error based on slot or computed message', () => {
      // showError is a computed property that checks slots.default || compErrorMessage
      const wrapper = mount(FdsFejlmeddelelse, {
        props: { auto: false },
      })
      // With auto: false and no slot, showError should be falsy
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('handles special characters in error message', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Error: <script>alert("XSS")</script>',
          },
        },
      })
      expect(wrapper.text()).toBe('Fejl: Error: <script>alert("XSS")</script>')
    })

    it('handles very long error messages', () => {
      const longMessage = 'This is a very long error message '.repeat(10).trim()
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: longMessage,
          },
        },
      })
      expect(wrapper.text()).toBe('Fejl: ' + longMessage)
    })

    it('handles rapid validity changes', async () => {
      const isValid = ref(true)

      const ParentComponent = {
        template: '<FdsFejlmeddelelse />',
        components: { FdsFejlmeddelelse },
        setup() {
          provide('provideIsValid', isValid)
          provide('provideErrorMessage', 'Error')
        },
      }

      const wrapper = mount(ParentComponent)

      // Rapid changes
      isValid.value = false
      await wrapper.vm.$nextTick()
      isValid.value = true
      await wrapper.vm.$nextTick()
      isValid.value = false
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.form-error-message').exists()).toBe(true)
    })

    it('handles undefined as error message', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: undefined,
          },
        },
      })
      // undefined is falsy, so no error shown
      expect(wrapper.find('.form-error-message').exists()).toBe(false)
    })

    it('maintains display when switching between slot and computed', async () => {
      const SlotSwitchComponent = {
        template: `
          <FdsFejlmeddelelse :auto="useAuto">
            <span v-if="showSlot">Slot error</span>
          </FdsFejlmeddelelse>
        `,
        components: { FdsFejlmeddelelse },
        data() {
          return {
            useAuto: true,
            showSlot: false,
          }
        },
        setup() {
          provide('provideIsValid', false)
          provide('provideErrorMessage', 'Injected error')
        },
      }

      const wrapper = mount(SlotSwitchComponent)

      // Initially shows injected error
      expect(wrapper.text()).toBe('Fejl: Injected error')

      // Switch to slot
      wrapper.vm.showSlot = true
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toBe('Fejl: Slot error')

      // Disable auto
      wrapper.vm.useAuto = false
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toBe('Fejl: Slot error')
    })
  })

  describe('Integration', () => {
    it('works in a form context', () => {
      const FormComponent = {
        template: `
          <form>
            <label for="field">Field:</label>
            <input id="field" :class="{ error: !isValid }" />
            <FdsFejlmeddelelse />
          </form>
        `,
        components: { FdsFejlmeddelelse },
        data() {
          return {
            isValid: false,
            errorMessage: 'Field is required',
          }
        },
        setup() {
          const isValid = ref(false)
          const errorMessage = ref('Field is required')
          provide('provideIsValid', isValid)
          provide('provideErrorMessage', errorMessage)
          return { isValid, errorMessage }
        },
      }

      const wrapper = mount(FormComponent)
      expect(wrapper.find('.form-error-message').exists()).toBe(true)
      expect(wrapper.find('.form-error-message').text()).toBe('Fejl: Field is required')
    })

    it('works with multiple error components', () => {
      const MultiErrorComponent = {
        template: `
          <div>
            <FdsFejlmeddelelse />
            <FdsFejlmeddelelse :auto="false">
              <span>Custom error</span>
            </FdsFejlmeddelelse>
          </div>
        `,
        components: { FdsFejlmeddelelse },
        setup() {
          provide('provideIsValid', false)
          provide('provideErrorMessage', 'Shared error')
        },
      }

      const wrapper = mount(MultiErrorComponent)
      const errors = wrapper.findAll('.form-error-message')
      expect(errors).toHaveLength(2)
      expect(errors[0].text()).toBe('Fejl: Shared error')
      expect(errors[1].text()).toBe('Fejl: Custom error')
    })

    it('handles dynamic error messages', async () => {
      const DynamicErrorComponent = {
        template: `
          <div>
            <button @click="changeError">Change Error</button>
            <FdsFejlmeddelelse />
          </div>
        `,
        components: { FdsFejlmeddelelse },
        setup() {
          const errorMessage = ref('Initial error')
          const isValid = ref(false)

          provide('provideIsValid', isValid)
          provide('provideErrorMessage', errorMessage)

          const changeError = () => {
            errorMessage.value = 'Changed error'
          }

          return { changeError }
        },
      }

      const wrapper = mount(DynamicErrorComponent)
      expect(wrapper.find('.form-error-message').text()).toBe('Fejl: Initial error')

      await wrapper.find('button').trigger('click')
      expect(wrapper.find('.form-error-message').text()).toBe('Fejl: Changed error')
    })
  })

  describe('Error Registration with Fejlopsummering', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('registers error when shown', async () => {
      const registerError = vi.fn()
      const unregisterError = vi.fn()

      const wrapper = mount(FdsFejlmeddelelse, {
        slots: {
          default: 'Test error message',
        },
        global: {
          provide: {
            formid: 'test-field-id',
            errorSummary: {
              registerError,
              unregisterError,
              clearErrors: vi.fn(),
            },
          },
        },
      })

      await nextTick()
      expect(registerError).toHaveBeenCalledWith('test-field-id', 'Test error message')
    })

    it('unregisters error when hidden', async () => {
      const registerError = vi.fn()
      const unregisterError = vi.fn()
      const isValid = ref(false)

      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            formid: 'test-field',
            provideIsValid: isValid,
            provideErrorMessage: 'Error message',
            errorSummary: {
              registerError,
              unregisterError,
              clearErrors: vi.fn(),
            },
          },
        },
      })

      await nextTick()
      expect(registerError).toHaveBeenCalledWith('test-field', 'Error message')

      // Hide the error
      isValid.value = true
      await nextTick()
      expect(unregisterError).toHaveBeenCalledWith('test-field')
    })

    it('handles reactive formid', async () => {
      const registerError = vi.fn()
      const formid = ref('field-1')

      const wrapper = mount(FdsFejlmeddelelse, {
        slots: {
          default: 'Test error',
        },
        global: {
          provide: {
            formid,
            errorSummary: {
              registerError,
              unregisterError: vi.fn(),
              clearErrors: vi.fn(),
            },
          },
        },
      })

      await nextTick()
      expect(registerError).toHaveBeenCalledWith('field-1', 'Test error')
    })

    it('does not register if no formid', async () => {
      const registerError = vi.fn()

      const wrapper = mount(FdsFejlmeddelelse, {
        slots: {
          default: 'Test error',
        },
        global: {
          provide: {
            errorSummary: {
              registerError,
              unregisterError: vi.fn(),
              clearErrors: vi.fn(),
            },
          },
        },
      })

      await nextTick()
      expect(registerError).not.toHaveBeenCalled()
    })

    it('does not register if no errorSummary', async () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        slots: {
          default: 'Test error',
        },
        global: {
          provide: {
            formid: 'test-field',
          },
        },
      })

      // Should not throw
      await nextTick()
      expect(wrapper.find('.form-error-message').exists()).toBe(true)
    })

    it('unregisters on unmount', async () => {
      const unregisterError = vi.fn()

      const wrapper = mount(FdsFejlmeddelelse, {
        slots: {
          default: 'Test error',
        },
        global: {
          provide: {
            formid: 'test-field',
            errorSummary: {
              registerError: vi.fn(),
              unregisterError,
              clearErrors: vi.fn(),
            },
          },
        },
      })

      await nextTick()
      wrapper.unmount()
      expect(unregisterError).toHaveBeenCalledWith('test-field')
    })

    it('updates registration when error message changes', async () => {
      const registerError = vi.fn()
      const unregisterError = vi.fn()
      const errorMessage = ref('Initial error')

      const ParentComponent = {
        template: '<FdsFejlmeddelelse />',
        components: { FdsFejlmeddelelse },
        setup() {
          provide('formid', 'test-field')
          provide('provideIsValid', false)
          provide('provideErrorMessage', errorMessage)
          provide('errorSummary', {
            registerError,
            unregisterError,
            clearErrors: vi.fn(),
          })
          return { errorMessage }
        },
      }

      const wrapper = mount(ParentComponent)
      await nextTick()
      expect(registerError).toHaveBeenCalledWith('test-field', 'Initial error')

      // Change error message
      errorMessage.value = 'Updated error'
      await nextTick()
      // Should unregister old and register new
      expect(unregisterError).toHaveBeenCalled()
      expect(registerError).toHaveBeenCalledWith('test-field', 'Updated error')
    })
  })

  describe('Accessibility', () => {
    it('renders semantic HTML for error messages', () => {
      const wrapper = mount(FdsFejlmeddelelse, {
        global: {
          provide: {
            provideIsValid: false,
            provideErrorMessage: 'Accessibility error',
          },
        },
      })

      const errorSpan = wrapper.find('.form-error-message')
      expect(errorSpan.element.tagName).toBe('SPAN')
      expect(wrapper.find('.sr-only').exists()).toBe(true)
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <form>
              <label for="test-input">Test Input</label>
              <input id="test-input" aria-describedby="test-error" aria-invalid="true" />
              <div id="test-error">
                <FdsFejlmeddelelse />
              </div>
            </form>
          </main>
        `,
        components: { FdsFejlmeddelelse },
        setup() {
          provide('provideIsValid', false)
          provide('provideErrorMessage', 'This field has an error')
        },
      }

      await testAccessibility(TestWrapper)
    })

    it('maintains proper error association', () => {
      const AccessibleForm = {
        template: `
          <form>
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email"
              :aria-invalid="!isValid"
              aria-describedby="email-error"
            />
            <div id="email-error">
              <FdsFejlmeddelelse />
            </div>
          </form>
        `,
        components: { FdsFejlmeddelelse },
        setup() {
          const isValid = ref(false)
          provide('provideIsValid', isValid)
          provide('provideErrorMessage', 'Please enter a valid email')
          return { isValid }
        },
      }

      const wrapper = mount(AccessibleForm)
      const input = wrapper.find('input')
      const errorContainer = wrapper.find('#email-error')

      expect(input.attributes('aria-describedby')).toBe('email-error')
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(errorContainer.find('.form-error-message').exists()).toBe(true)
    })
  })
})
