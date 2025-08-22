import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import FdsInputLimit from "../../components/input/fds-input-limit.vue"

describe('FdsInputLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders character limit display with correct DKFDS structure', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: '',
        },
      })

      const initialMessage = wrapper.find('#character-limit-initial')
      expect(initialMessage.exists()).toBe(true)
      expect(initialMessage.classes()).toContain('sr-only')
      expect(initialMessage.text()).toBe('Du kan indtaste op til 100 tegn')
    })

    it('renders without errors', () => {
      expect(() => mount(FdsInputLimit, { props: { limit: 100 } })).not.toThrow()
    })

    it('uses provided ID', () => {
      const customId = 'my-limit'
      const wrapper = mount(FdsInputLimit, {
        props: {
          id: customId,
          limit: 50,
          modelValue: 'test',
        },
      })

      expect(wrapper.find(`#${customId}`).exists()).toBe(true)
      expect(wrapper.find(`#${customId}-initial`).exists()).toBe(true)
    })

    it('generates default ID when not provided', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'test',
        },
      })

      expect(wrapper.find('#character-limit').exists()).toBe(true)
      expect(wrapper.find('#character-limit-initial').exists()).toBe(true)
    })

    it('does not display message when input is empty', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: '',
        },
      })

      const dynamicMessage = wrapper.find('#character-limit')
      expect(dynamicMessage.exists()).toBe(false)
    })

    it('displays remaining characters message when input has content', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'Hello world',
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.exists()).toBe(true)
      expect(message.text()).toBe('Du har 89 tegn tilbage')
      expect(message.classes()).toContain('form-hint')
      expect(message.classes()).toContain('character-limit')
    })

    it('displays warning message when approaching limit', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A'.repeat(85), // 85% of limit
          warningThreshold: 0.8,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.exists()).toBe(true)
      expect(message.text()).toBe('Du har 15 tegn tilbage')
      expect(message.classes()).toContain('limit-warning')
    })

    it('displays exceeded message when over limit', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A'.repeat(105),
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.exists()).toBe(true)
      expect(message.text()).toBe('Du har 5 tegn for meget')
      expect(message.classes()).toContain('limit-exceeded')
    })
  })

  describe('Props', () => {
    it('handles limit prop correctly', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: 'test',
        },
      })

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.text()).toContain('50 tegn')

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 46 tegn tilbage')
    })

    it('handles null modelValue', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: null,
        },
      })

      expect(wrapper.find('#character-limit').exists()).toBe(false)

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.exists()).toBe(true)
    })

    it('handles empty string modelValue', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: '',
        },
      })

      expect(wrapper.find('#character-limit').exists()).toBe(false)
    })

    it('uses custom warning threshold', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A'.repeat(70), // 70% of limit
          warningThreshold: 0.6, // Warning at 60%
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('limit-warning')
      expect(message.text()).toBe('Du har 30 tegn tilbage')
    })

    it('uses custom messages', () => {
      const customMessages = {
        initial: 'Maximum {limit} characters allowed',
        remaining: '{remaining} characters left',
        warning: 'Warning: {remaining} characters remaining',
        exceeded: 'Over limit by {exceeded} characters',
      }

      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: 'A'.repeat(55),
          messages: customMessages,
        },
      })

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.text()).toBe('Maximum 50 characters allowed')

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Over limit by 5 characters')
    })

    it('falls back to default messages when custom messages are incomplete', () => {
      const partialMessages = {
        initial: 'Custom initial message with {limit} chars',
      }

      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'test content',
          messages: partialMessages,
        },
      })

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.text()).toBe('Custom initial message with 100 chars')

      const message = wrapper.find('#character-limit')
      // Should fall back to default remaining message
      expect(message.text()).toBe('Du har 88 tegn tilbage')
    })

    it('handles zero limit', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 0,
          modelValue: 'any text',
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.exists()).toBe(true)
      expect(message.text()).toBe('Du har 8 tegn for meget')
      expect(message.classes()).toContain('limit-exceeded')
    })

    it('handles very large limit', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 999999,
          modelValue: 'short text',
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 999989 tegn tilbage')
    })
  })

  describe('Character Counting Logic', () => {
    it('counts characters correctly', () => {
      const testCases = [
        { input: '', expected: 0 },
        { input: 'a', expected: 1 },
        { input: 'hello', expected: 5 },
        { input: 'hello world', expected: 11 },
        { input: 'åäö', expected: 3 },
        { input: '🚀🎉', expected: 4 }, // Emoji count as 2 characters each
        { input: 'line1\nline2', expected: 11 },
        { input: 'tab\there', expected: 8 },
        { input: '   spaces   ', expected: 12 },
      ]

      testCases.forEach(({ input, expected }) => {
        const wrapper = mount(FdsInputLimit, {
          props: {
            limit: 100,
            modelValue: input,
          },
        })

        if (expected === 0) {
          expect(wrapper.find('#character-limit').exists()).toBe(false)
        } else {
          const remaining = 100 - expected
          const message = wrapper.find('#character-limit')
          expect(message.text()).toBe(`Du har ${remaining} tegn tilbage`)
        }
      })
    })

    it('calculates remaining characters correctly', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: 'Hello world!', // 12 characters
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 38 tegn tilbage') // 50 - 12 = 38
    })

    it('handles negative remaining characters (exceeded)', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 10,
          modelValue: 'This text is way too long', // 25 characters
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 15 tegn for meget') // 25 - 10 = 15 over
      expect(message.classes()).toContain('limit-exceeded')
    })
  })

  describe('State Management', () => {
    it('detects normal state correctly', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'Normal text', // 11 characters, well under limit
          warningThreshold: 0.8,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('form-hint')
      expect(message.classes()).toContain('character-limit')
      expect(message.classes()).not.toContain('limit-warning')
      expect(message.classes()).not.toContain('limit-exceeded')
    })

    it('detects warning state correctly', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A'.repeat(85), // 85% of limit
          warningThreshold: 0.8,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('limit-warning')
      expect(message.classes()).not.toContain('limit-exceeded')
    })

    it('detects exceeded state correctly', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: 'A'.repeat(60), // Over limit
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('limit-exceeded')
      expect(message.classes()).not.toContain('limit-warning')
    })

    it('transitions between states correctly', async () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 10,
          modelValue: 'short',
          warningThreshold: 0.8,
        },
      })

      // Normal state (5 chars, 50%)
      let message = wrapper.find('#character-limit')
      expect(message.classes()).not.toContain('limit-warning')
      expect(message.classes()).not.toContain('limit-exceeded')

      // Warning state (8 chars, 80%)
      await wrapper.setProps({ modelValue: 'A'.repeat(8) })
      message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('limit-warning')
      expect(message.classes()).not.toContain('limit-exceeded')

      // Exceeded state (12 chars, 120%)
      await wrapper.setProps({ modelValue: 'A'.repeat(12) })
      message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('limit-exceeded')
      expect(message.classes()).not.toContain('limit-warning')
    })

    it('handles exactly at limit', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 10,
          modelValue: 'A'.repeat(10), // Exactly at limit
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 0 tegn tilbage')
      expect(message.classes()).not.toContain('limit-exceeded')
    })

    it('handles exactly at warning threshold', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A'.repeat(80), // Exactly 80%
          warningThreshold: 0.8,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('limit-warning')
    })
  })

  describe('ARIA and Accessibility', () => {
    it('has correct ARIA live regions', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'test content',
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.attributes('aria-live')).toBe('polite')
    })

    it('uses assertive aria-live when exceeded', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 10,
          modelValue: 'This text exceeds the limit',
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.attributes('aria-live')).toBe('assertive')
      expect(message.classes()).toContain('limit-exceeded')
    })

    it('provides screen reader initial announcement', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 200,
          modelValue: '',
        },
      })

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.exists()).toBe(true)
      expect(initialMessage.text()).toBe('Du kan indtaste op til 200 tegn')
      expect(initialMessage.attributes('id')).toBe('character-limit-initial')
    })

    it('meets accessibility standards', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          id: 'accessible-limit',
          limit: 100,
          modelValue: 'Test content',
        },
      })

      const message = wrapper.find('#accessible-limit')
      expect(message.attributes('aria-live')).toBe('polite')
      expect(message.element.tagName).toBe('SPAN')

      const initialMessage = wrapper.find('#accessible-limit-initial')
      expect(initialMessage.classes()).toContain('sr-only')
    })

    it('meets accessibility standards when exceeded', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          id: 'exceeded-limit',
          limit: 10,
          modelValue: 'This text is too long for the limit',
        },
      })

      const message = wrapper.find('#exceeded-limit')
      expect(message.attributes('aria-live')).toBe('assertive')
      expect(message.classes()).toContain('limit-exceeded')
    })
  })

  describe('Formgroup Integration', () => {
    it('uses injected hintId from formgroup', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'test',
        },
        global: {
          provide: {
            hintId: 'form-hint',
          },
        },
      })

      expect(wrapper.find('#form-hint-limit').exists()).toBe(true)
      expect(wrapper.find('#form-hint-limit-initial').exists()).toBe(true)
    })

    it('uses injected ref hintId from formgroup', async () => {
      const hintId = ref('ref-hint')

      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'test',
        },
        global: {
          provide: {
            hintId,
          },
        },
      })

      expect(wrapper.find('#ref-hint-limit').exists()).toBe(true)

      hintId.value = 'updated-hint'
      await nextTick()

      expect(wrapper.find('#updated-hint-limit').exists()).toBe(true)
    })

    it('prioritizes explicit id over injected hintId', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          id: 'explicit-limit',
          limit: 100,
          modelValue: 'test',
        },
        global: {
          provide: {
            hintId: 'injected-hint',
          },
        },
      })

      expect(wrapper.find('#explicit-limit').exists()).toBe(true)
      expect(wrapper.find('#injected-hint-limit').exists()).toBe(false)
    })

    it('falls back to default ID when no injection', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'test',
        },
      })

      expect(wrapper.find('#character-limit').exists()).toBe(true)
      expect(wrapper.find('#character-limit-initial').exists()).toBe(true)
    })

    it('works with formgroup provide/inject pattern for input association', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 150,
          modelValue: 'Form content',
        },
        global: {
          provide: {
            hintId: 'form-input-hint',
          },
        },
      })

      const message = wrapper.find('#form-input-hint-limit')
      expect(message.exists()).toBe(true)
      expect(message.text()).toBe('Du har 138 tegn tilbage')

      const initialMessage = wrapper.find('#form-input-hint-limit-initial')
      expect(initialMessage.exists()).toBe(true)
      expect(initialMessage.text()).toBe('Du kan indtaste op til 150 tegn')
    })
  })

  describe('Message Templating', () => {
    it('replaces {limit} placeholder in initial message', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 75,
          messages: {
            initial: 'Maximum allowed: {limit} characters',
          },
        },
      })

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.text()).toBe('Maximum allowed: 75 characters')
    })

    it('replaces {remaining} placeholder in remaining message', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: 'Hello',
          messages: {
            remaining: 'You have {remaining} chars left',
          },
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('You have 45 chars left')
    })

    it('replaces {remaining} placeholder in warning message', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 20,
          modelValue: 'A'.repeat(18),
          warningThreshold: 0.8,
          messages: {
            warning: 'Warning: Only {remaining} characters remaining!',
          },
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Warning: Only 2 characters remaining!')
    })

    it('replaces {exceeded} placeholder in exceeded message', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 15,
          modelValue: 'This is way too long text',
          messages: {
            exceeded: 'Exceeded by {exceeded} chars!',
          },
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Exceeded by 10 chars!')
    })

    it('handles missing placeholders gracefully', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 30,
          modelValue: 'test',
          messages: {
            remaining: 'No placeholder here',
          },
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('No placeholder here')
    })

    it('handles multiple identical placeholders', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A'.repeat(105),
          messages: {
            exceeded: 'Error: {exceeded} over, that is {exceeded} too many!',
          },
        },
      })

      const message = wrapper.find('#character-limit')
      // JavaScript replace only replaces first occurrence
      expect(message.text()).toBe('Error: 5 over, that is {exceeded} too many!')
    })
  })

  describe('Edge Cases', () => {
    it('handles extremely long text gracefully', () => {
      const longText = 'A'.repeat(10000)
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: longText,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 9900 tegn for meget')
      expect(message.classes()).toContain('limit-exceeded')
    })

    it('handles limit of 1', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 1,
          modelValue: 'AB',
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 1 tegn for meget')
    })

    it('handles warning threshold of 0', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A',
          warningThreshold: 0,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.classes()).toContain('limit-warning')
    })

    it('handles warning threshold of 1', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'A'.repeat(99),
          warningThreshold: 1.0,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.classes()).not.toContain('limit-warning')
    })

    it('handles reactive prop changes', async () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: 'initial text',
        },
      })

      let message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 38 tegn tilbage')

      // Change limit
      await wrapper.setProps({ limit: 20 })
      message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 8 tegn tilbage')

      // Change model value
      await wrapper.setProps({ modelValue: 'much longer text content here' })
      message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 9 tegn for meget')
      expect(message.classes()).toContain('limit-exceeded')
    })

    it('handles undefined and null message properties', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: 'A'.repeat(60),
          messages: {
            exceeded: undefined,
          },
        },
      })

      const message = wrapper.find('#character-limit')
      // Should fall back to default
      expect(message.text()).toBe('Du har 10 tegn for meget')
    })

    it('preserves whitespace in character counting', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 20,
          modelValue: '  spaced  text  ', // 16 characters including spaces
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 4 tegn tilbage')
    })
  })

  describe('Integration Scenarios', () => {
    it('works with text input field integration', () => {
      // This would typically be used with an input field
      const inputValue = ref('Initial content')
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: inputValue.value,
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 85 tegn tilbage')

      // Simulate input change
      inputValue.value = 'Updated content'
      wrapper.setProps({ modelValue: inputValue.value })

      expect(wrapper.find('#character-limit').text()).toBe('Du har 85 tegn tilbage')
    })

    it('supports real-time character limit feedback', async () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 10,
          modelValue: '',
        },
      })

      // Initially empty - no message
      expect(wrapper.find('#character-limit').exists()).toBe(false)

      // Add some content
      await wrapper.setProps({ modelValue: 'Hello' })
      expect(wrapper.find('#character-limit').text()).toBe('Du har 5 tegn tilbage')

      // Approach warning
      await wrapper.setProps({ modelValue: 'Hello wo' })
      expect(wrapper.find('#character-limit').classes()).toContain('limit-warning')

      // Exceed limit
      await wrapper.setProps({ modelValue: 'Hello world!' })
      expect(wrapper.find('#character-limit').classes()).toContain('limit-exceeded')
      expect(wrapper.find('#character-limit').text()).toBe('Du har 2 tegn for meget')
    })

    it('integrates with textarea for multi-line content', () => {
      const multilineText = 'Line 1\nLine 2\nLine 3'
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 30,
          modelValue: multilineText, // 20 characters including newlines
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.text()).toBe('Du har 10 tegn tilbage')
    })

    it('works with form validation patterns', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          id: 'comment-limit',
          limit: 500,
          modelValue: 'User comment content that needs validation',
        },
        global: {
          provide: {
            hintId: 'comment-hint',
          },
        },
      })

      expect(wrapper.find('#comment-limit').exists()).toBe(true)
      expect(wrapper.find('#comment-limit').text()).toBe('Du har 458 tegn tilbage')
      expect(wrapper.find('#comment-limit-initial').exists()).toBe(true)
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 character limit structure', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          id: 'compliant-limit',
          limit: 200,
          modelValue: 'DKFDS compliant content',
        },
      })

      const message = wrapper.find('#compliant-limit')
      expect(message.classes()).toContain('form-hint')
      expect(message.classes()).toContain('character-limit')
      expect(message.attributes('aria-live')).toBe('polite')

      const initialMessage = wrapper.find('#compliant-limit-initial')
      expect(initialMessage.classes()).toContain('sr-only')
    })

    it('uses correct Danish messages by default', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 50,
          modelValue: '',
        },
      })

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.text()).toBe('Du kan indtaste op til 50 tegn')
    })

    it('follows DKFDS accessibility patterns', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 100,
          modelValue: 'Test content for accessibility',
        },
      })

      const message = wrapper.find('#character-limit')
      expect(message.attributes('aria-live')).toBe('polite')

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.exists()).toBe(true)
    })

    it('maintains semantic structure for screen readers', () => {
      const wrapper = mount(FdsInputLimit, {
        props: {
          limit: 150,
          modelValue: 'Content for screen reader testing',
        },
      })

      // Check for proper ARIA structure
      const message = wrapper.find('#character-limit')
      expect(message.element.tagName).toBe('SPAN')
      expect(message.attributes('aria-live')).toBe('polite')

      const initialMessage = wrapper.find('.sr-only')
      expect(initialMessage.element.tagName).toBe('SPAN')
      expect(initialMessage.classes()).toContain('sr-only')
    })

    it('supports DKFDS state styling classes', () => {
      const testCases = [
        {
          modelValue: 'normal text',
          expectedClasses: ['form-hint', 'character-limit'],
          notExpectedClasses: ['limit-warning', 'limit-exceeded'],
        },
        {
          modelValue: 'A'.repeat(45), // Warning state
          warningThreshold: 0.4,
          expectedClasses: ['form-hint', 'character-limit', 'limit-warning'],
          notExpectedClasses: ['limit-exceeded'],
        },
        {
          modelValue: 'A'.repeat(60), // Exceeded state
          expectedClasses: ['form-hint', 'character-limit', 'limit-exceeded'],
          notExpectedClasses: ['limit-warning'],
        },
      ]

      testCases.forEach(({ modelValue, warningThreshold, expectedClasses, notExpectedClasses }) => {
        const wrapper = mount(FdsInputLimit, {
          props: {
            limit: 50,
            modelValue,
            warningThreshold,
          },
        })

        const message = wrapper.find('#character-limit')
        expectedClasses.forEach((cls) => {
          expect(message.classes()).toContain(cls)
        })
        notExpectedClasses.forEach((cls) => {
          expect(message.classes()).not.toContain(cls)
        })
      })
    })
  })
})
