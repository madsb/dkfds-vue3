import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import FdsHint from '../../components/forms/fds-hint.vue'
import { testAccessibility } from '../../test-utils'

describe('FdsHint', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      expect(() => mount(FdsHint)).not.toThrow()
    })

    it('renders as span element with correct DKFDS structure', () => {
      const wrapper = mount(FdsHint)

      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.classes()).toContain('form-hint')
    })

    it('renders with form-hint class by default', () => {
      const wrapper = mount(FdsHint)

      expect(wrapper.classes()).toContain('form-hint')
    })

    it('renders without id attribute when no id provided and no injection', () => {
      const wrapper = mount(FdsHint)

      expect(wrapper.attributes('id')).toBeUndefined()
    })
  })

  describe('Props', () => {
    describe('id prop', () => {
      it('uses provided id when specified', () => {
        const wrapper = mount(FdsHint, {
          props: { id: 'custom-hint-id' },
        })

        expect(wrapper.attributes('id')).toBe('custom-hint-id')
      })

      it('handles empty string id prop', () => {
        const wrapper = mount(FdsHint, {
          props: { id: '' },
        })

        // Vue Test Utils removes empty id attributes
        expect(wrapper.attributes('id')).toBeUndefined()
      })

      it('uses explicit id prop even when injection is available', () => {
        const ParentComponent = {
          template: '<fds-hint id="explicit-id" />',
          components: { FdsHint },
          provide: {
            hintId: 'injected-id',
          },
        }

        const wrapper = mount(ParentComponent)
        const hint = wrapper.findComponent(FdsHint)

        expect(hint.attributes('id')).toBe('explicit-id')
      })

      it('handles undefined id prop correctly', () => {
        const wrapper = mount(FdsHint, {
          props: { id: undefined },
        })

        expect(wrapper.attributes('id')).toBeUndefined()
      })
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsHint, {
        slots: {
          default: 'This is a hint text',
        },
      })

      expect(wrapper.text()).toBe('This is a hint text')
    })

    it('renders HTML content in slot', () => {
      const wrapper = mount(FdsHint, {
        slots: {
          default: '<strong>Important:</strong> This is a hint',
        },
      })

      expect(wrapper.find('strong').text()).toBe('Important:')
      expect(wrapper.text()).toBe('Important: This is a hint')
    })

    it('handles empty slot content', () => {
      const wrapper = mount(FdsHint)

      expect(wrapper.text()).toBe('')
    })

    it('renders multiline hint content', () => {
      const wrapper = mount(FdsHint, {
        slots: {
          default: `Line 1
Line 2
Line 3`,
        },
      })

      expect(wrapper.text()).toContain('Line 1')
      expect(wrapper.text()).toContain('Line 2')
      expect(wrapper.text()).toContain('Line 3')
    })
  })

  describe('Integration with formgroup', () => {
    it('uses injected hintId from formgroup when no id prop provided', () => {
      const ParentComponent = {
        template: '<fds-hint />',
        components: { FdsHint },
        provide: {
          hintId: 'form-123-hint',
        },
      }

      const wrapper = mount(ParentComponent)
      const hint = wrapper.findComponent(FdsHint)

      expect(hint.attributes('id')).toBe('form-123-hint')
    })

    it('uses injected reactive hintId from formgroup', async () => {
      const hintIdRef = ref('reactive-hint-id')

      const ParentComponent = {
        template: '<fds-hint />',
        components: { FdsHint },
        provide: {
          hintId: hintIdRef,
        },
      }

      const wrapper = mount(ParentComponent)
      const hint = wrapper.findComponent(FdsHint)

      expect(hint.attributes('id')).toBe('reactive-hint-id')

      // Test reactivity
      hintIdRef.value = 'updated-hint-id'
      await wrapper.vm.$nextTick()

      expect(hint.attributes('id')).toBe('updated-hint-id')
    })

    it('handles undefined injected hintId', () => {
      const ParentComponent = {
        template: '<fds-hint />',
        components: { FdsHint },
        provide: {
          hintId: undefined,
        },
      }

      const wrapper = mount(ParentComponent)
      const hint = wrapper.findComponent(FdsHint)

      expect(hint.attributes('id')).toBeUndefined()
    })

    it('works correctly inside fds-formgroup component', () => {
      // Mock the formgroup component behavior
      const FormGroupWrapper = {
        template: `
          <div class="form-group">
            <fds-hint>This is helpful hint text</fds-hint>
          </div>
        `,
        components: { FdsHint },
        provide: {
          hintId: 'formgroup-hint-id',
        },
      }

      const wrapper = mount(FormGroupWrapper)
      const hint = wrapper.findComponent(FdsHint)

      expect(hint.attributes('id')).toBe('formgroup-hint-id')
      expect(hint.text()).toBe('This is helpful hint text')
      expect(hint.classes()).toContain('form-hint')
    })
  })

  describe('Accessibility', () => {
    it('provides correct semantic structure for screen readers', () => {
      const wrapper = mount(FdsHint, {
        props: { id: 'hint-test' },
        slots: { default: 'Helpful hint text' },
      })

      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.attributes('id')).toBe('hint-test')
      expect(wrapper.text()).toBe('Helpful hint text')
    })

    it('can be referenced by aria-describedby', () => {
      const FormWrapper = {
        template: `
          <div>
            <input aria-describedby="helpful-hint" />
            <fds-hint id="helpful-hint">Enter your full name</fds-hint>
          </div>
        `,
        components: { FdsHint },
      }

      const wrapper = mount(FormWrapper)
      const input = wrapper.find('input')
      const hint = wrapper.findComponent(FdsHint)

      expect(input.attributes('aria-describedby')).toBe('helpful-hint')
      expect(hint.attributes('id')).toBe('helpful-hint')
    })

    it('passes accessibility tests', async () => {
      const AccessibilityWrapper = {
        template: `
          <main>
            <form>
              <div class="form-group">
                <label for="email-input">Email address</label>
                <input id="email-input" type="email" aria-describedby="email-hint" />
                <fds-hint id="email-hint">We'll never share your email</fds-hint>
              </div>
            </form>
          </main>
        `,
        components: { FdsHint },
      }

      await testAccessibility(AccessibilityWrapper)
    })

    it('works with multiple hints for different form controls', async () => {
      const MultiHintWrapper = {
        template: `
          <main>
            <form>
              <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" aria-describedby="pwd-hint" />
                <fds-hint id="pwd-hint">Must be at least 8 characters</fds-hint>
              </div>
              <div class="form-group">
                <label for="confirm">Confirm Password</label>
                <input id="confirm" type="password" aria-describedby="confirm-hint" />
                <fds-hint id="confirm-hint">Enter the same password</fds-hint>
              </div>
            </form>
          </main>
        `,
        components: { FdsHint },
      }

      await testAccessibility(MultiHintWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles both id prop and injection gracefully', () => {
      const ParentComponent = {
        template: '<fds-hint id="prop-id">Test content</fds-hint>',
        components: { FdsHint },
        provide: {
          hintId: 'injected-id',
        },
      }

      const wrapper = mount(ParentComponent)
      const hint = wrapper.findComponent(FdsHint)

      // Props should take precedence over injection
      expect(hint.attributes('id')).toBe('prop-id')
      expect(hint.text()).toBe('Test content')
    })

    it('handles reactive injection changes', async () => {
      const hintIdRef = ref('initial-id')

      const ParentComponent = {
        template: '<fds-hint>Reactive hint</fds-hint>',
        components: { FdsHint },
        provide: {
          hintId: hintIdRef,
        },
      }

      const wrapper = mount(ParentComponent)
      const hint = wrapper.findComponent(FdsHint)

      expect(hint.attributes('id')).toBe('initial-id')

      hintIdRef.value = 'updated-id'
      await wrapper.vm.$nextTick()

      expect(hint.attributes('id')).toBe('updated-id')
    })

    it('handles string injection correctly', () => {
      const ParentComponent = {
        template: '<fds-hint />',
        components: { FdsHint },
        provide: {
          hintId: 'string-hint-id',
        },
      }

      const wrapper = mount(ParentComponent)
      const hint = wrapper.findComponent(FdsHint)

      expect(hint.attributes('id')).toBe('string-hint-id')
    })

    it('maintains structure when id changes', async () => {
      const wrapper = mount(FdsHint, {
        props: { id: 'initial-id' },
        slots: { default: 'Hint text' },
      })

      expect(wrapper.attributes('id')).toBe('initial-id')
      expect(wrapper.classes()).toContain('form-hint')

      await wrapper.setProps({ id: 'changed-id' })

      expect(wrapper.attributes('id')).toBe('changed-id')
      expect(wrapper.classes()).toContain('form-hint')
      expect(wrapper.text()).toBe('Hint text')
    })

    it('handles null and empty values appropriately', () => {
      const testCases = [
        { id: null, expected: undefined },
        { id: '', expected: undefined }, // Vue Test Utils removes empty id attributes
        { id: '0', expected: '0' },
        { id: 'false', expected: 'false' },
      ]

      testCases.forEach(({ id, expected }) => {
        const wrapper = mount(FdsHint, {
          props: { id: id as any },
        })

        if (expected === undefined) {
          expect(wrapper.attributes('id')).toBeUndefined()
        } else {
          expect(wrapper.attributes('id')).toBe(expected)
        }
      })
    })
  })

  describe('Integration', () => {
    it('works in real-world form scenarios', () => {
      const RealWorldForm = {
        template: `
          <form>
            <fieldset>
              <legend>Personal Information</legend>
              
              <div class="form-group">
                <label for="first-name">First Name</label>
                <input id="first-name" aria-describedby="fname-hint" />
                <fds-hint id="fname-hint">Enter your legal first name</fds-hint>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input id="phone" type="tel" aria-describedby="phone-hint" />
                <fds-hint id="phone-hint">Format: +45 12 34 56 78</fds-hint>
              </div>
              
              <div class="form-group">
                <label for="comments">Additional Comments</label>
                <textarea id="comments" aria-describedby="comments-hint"></textarea>
                <fds-hint id="comments-hint">Optional: Any additional information you'd like to share</fds-hint>
              </div>
            </fieldset>
          </form>
        `,
        components: { FdsHint },
      }

      const wrapper = mount(RealWorldForm)
      const hints = wrapper.findAllComponents(FdsHint)

      expect(hints).toHaveLength(3)
      expect(hints[0].attributes('id')).toBe('fname-hint')
      expect(hints[1].attributes('id')).toBe('phone-hint')
      expect(hints[2].attributes('id')).toBe('comments-hint')

      expect(hints[0].text()).toContain('legal first name')
      expect(hints[1].text()).toContain('+45 12 34 56 78')
      expect(hints[2].text()).toContain('Optional:')
    })

    it('integrates properly with validation states', () => {
      const ValidationWrapper = {
        template: `
          <div class="form-group" :class="{ 'form-error': hasError }">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              :aria-describedby="hasError ? 'email-hint email-error' : 'email-hint'"
            />
            <fds-hint id="email-hint">We'll use this to contact you</fds-hint>
            <span v-if="hasError" id="email-error" class="form-error-message">
              Please enter a valid email address
            </span>
          </div>
        `,
        components: { FdsHint },
        data() {
          return { hasError: false }
        },
      }

      const wrapper = mount(ValidationWrapper)
      const hint = wrapper.findComponent(FdsHint)
      const input = wrapper.find('input')

      expect(hint.attributes('id')).toBe('email-hint')
      expect(input.attributes('aria-describedby')).toBe('email-hint')

      wrapper.vm.hasError = true
      wrapper.vm.$nextTick(() => {
        expect(input.attributes('aria-describedby')).toBe('email-hint email-error')
      })
    })

    it('supports Danish language content', () => {
      const DanishWrapper = {
        template: `
          <div class="form-group">
            <label for="cpr">CPR-nummer</label>
            <input id="cpr" aria-describedby="cpr-hint" />
            <fds-hint id="cpr-hint">Indtast dit 10-cifrede CPR-nummer (DDMMÅÅ-XXXX)</fds-hint>
          </div>
        `,
        components: { FdsHint },
      }

      const wrapper = mount(DanishWrapper)
      const hint = wrapper.findComponent(FdsHint)

      expect(hint.text()).toContain('CPR-nummer')
      expect(hint.text()).toContain('DDMMÅÅ-XXXX')
      expect(hint.attributes('id')).toBe('cpr-hint')
    })

    it('works with multiple hints per form control', () => {
      const MultipleHintsWrapper = {
        template: `
          <div class="form-group">
            <label for="password">Choose Password</label>
            <input 
              id="password" 
              type="password" 
              aria-describedby="pwd-requirements pwd-security"
            />
            <fds-hint id="pwd-requirements">Must be 8+ characters with numbers and symbols</fds-hint>
            <fds-hint id="pwd-security">Avoid common words or personal information</fds-hint>
          </div>
        `,
        components: { FdsHint },
      }

      const wrapper = mount(MultipleHintsWrapper)
      const hints = wrapper.findAllComponents(FdsHint)
      const input = wrapper.find('input')

      expect(hints).toHaveLength(2)
      expect(hints[0].attributes('id')).toBe('pwd-requirements')
      expect(hints[1].attributes('id')).toBe('pwd-security')
      expect(input.attributes('aria-describedby')).toBe('pwd-requirements pwd-security')
    })
  })
})
