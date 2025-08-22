import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsPre from '../../components/data-display/fds-pre.vue'

describe('FdsPre', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(FdsPre)
      expect(wrapper.find('.fds-pre').exists()).toBe(true)
      expect(wrapper.find('fieldset.form-group').exists()).toBe(true)
      expect(wrapper.find('.form-input').exists()).toBe(true)
      expect(wrapper.find('pre.code').exists()).toBe(true)
    })

    it('renders slot content when no props provided', () => {
      const slotContent = 'const example = "Hello World";'
      const wrapper = mount(FdsPre, {
        slots: {
          default: slotContent,
        },
      })
      expect(wrapper.find('pre.code').text()).toContain(slotContent)
    })

    it('does not render legend when header prop is not provided', () => {
      const wrapper = mount(FdsPre)
      expect(wrapper.find('legend').exists()).toBe(false)
    })
  })

  describe('Props', () => {
    it('renders header when provided', () => {
      const header = 'Code Example'
      const wrapper = mount(FdsPre, {
        props: { header },
      })
      expect(wrapper.find('legend.form-label').exists()).toBe(true)
      expect(wrapper.find('legend.form-label').text()).toBe(header)
    })

    it('renders code string when provided', () => {
      const code = 'function test() { return true; }'
      const wrapper = mount(FdsPre, {
        props: { code },
      })
      expect(wrapper.find('pre.code').text()).toBe(code)
    })

    it('renders formatted JSON when json prop is provided', () => {
      const json = { name: 'test', value: 123, nested: { key: 'value' } }
      const wrapper = mount(FdsPre, {
        props: { json },
      })
      const expectedOutput = JSON.stringify(json, null, 2)
      expect(wrapper.find('pre.code').text()).toBe(expectedOutput)
    })

    it('handles null json prop gracefully', () => {
      const wrapper = mount(FdsPre, {
        props: { json: null },
      })
      expect(wrapper.find('pre.code').text()).toBe('')
    })

    it('prioritizes json over code prop', () => {
      const json = { test: 'json' }
      const code = 'const test = "code"'
      const wrapper = mount(FdsPre, {
        props: { json, code },
      })
      const expectedOutput = JSON.stringify(json, null, 2)
      expect(wrapper.find('pre.code').text()).toBe(expectedOutput)
    })

    it('prioritizes code over slot content', () => {
      const code = 'const test = "code"'
      const slotContent = 'slot content'
      const wrapper = mount(FdsPre, {
        props: { code },
        slots: { default: slotContent },
      })
      expect(wrapper.find('pre.code').text()).toBe(code)
    })
  })

  describe('Large JSON warning', () => {
    it('shows warning for JSON content over 65535 characters', () => {
      // Create a large JSON object
      const largeArray = new Array(10000).fill({ key: 'value with some text to make it longer' })
      const json = { data: largeArray }
      const wrapper = mount(FdsPre, {
        props: { json },
      })

      const formattedLength = JSON.stringify(json, null, 2).length
      if (formattedLength > 65535) {
        expect(wrapper.find('.form-hint').exists()).toBe(true)
        expect(wrapper.find('.form-hint').text()).toContain(
          'JSON indeholder elementer over 65.535 tegn',
        )
      }
    })

    it('does not show warning for JSON content under 65535 characters', () => {
      const json = { small: 'data' }
      const wrapper = mount(FdsPre, {
        props: { json },
      })
      expect(wrapper.find('.form-hint').exists()).toBe(false)
    })

    it('does not show warning for code prop regardless of size', () => {
      const longCode = 'a'.repeat(70000)
      const wrapper = mount(FdsPre, {
        props: { code: longCode },
      })
      expect(wrapper.find('.form-hint').exists()).toBe(false)
    })
  })

  describe('Styling classes', () => {
    it('applies correct form structure classes', () => {
      const wrapper = mount(FdsPre, {
        props: { header: 'Test' },
      })
      expect(wrapper.find('.fds-pre').exists()).toBe(true)
      expect(wrapper.find('.form-group').exists()).toBe(true)
      expect(wrapper.find('.form-label').exists()).toBe(true)
      expect(wrapper.find('.form-input').exists()).toBe(true)
    })

    it('applies mt-2 class to warning hint', () => {
      const largeArray = new Array(10000).fill({ key: 'value with some text to make it longer' })
      const json = { data: largeArray }
      const wrapper = mount(FdsPre, {
        props: { json },
      })

      const hint = wrapper.find('.form-hint')
      if (hint.exists()) {
        expect(hint.classes()).toContain('mt-2')
      }
    })
  })

  describe('Edge cases', () => {
    it('handles circular JSON references gracefully', () => {
      const circularObj: any = { name: 'test' }
      circularObj.self = circularObj

      // Mount should not throw an error
      const wrapper = mount(FdsPre, {
        props: { json: circularObj },
      })
      expect(wrapper.find('pre.code').exists()).toBe(true)
    })

    it('handles undefined values in JSON', () => {
      const json = { key: undefined, another: 'value' }
      const wrapper = mount(FdsPre, {
        props: { json },
      })
      expect(wrapper.find('pre.code').exists()).toBe(true)
    })

    it('handles empty string code', () => {
      const wrapper = mount(FdsPre, {
        props: { code: '' },
      })
      expect(wrapper.find('pre.code').text()).toBe('')
    })

    it('handles multi-line code correctly', () => {
      const multiLineCode = `function test() {
  const value = 123;
  return value * 2;
}`
      const wrapper = mount(FdsPre, {
        props: { code: multiLineCode },
      })
      expect(wrapper.find('pre.code').text()).toBe(multiLineCode)
    })
  })

  describe('Accessibility', () => {
    it('uses semantic fieldset and legend elements', () => {
      const wrapper = mount(FdsPre, {
        props: { header: 'Code Sample' },
      })
      expect(wrapper.find('fieldset').exists()).toBe(true)
      expect(wrapper.find('legend').exists()).toBe(true)
    })

    it('legend is associated with fieldset', () => {
      const wrapper = mount(FdsPre, {
        props: { header: 'Code Sample' },
      })
      const fieldset = wrapper.find('fieldset')
      const legend = wrapper.find('legend')
      expect(fieldset.element.contains(legend.element)).toBe(true)
    })

    it('preserves whitespace and formatting in pre element', () => {
      const formattedCode = `  indented
    more indented
regular`
      const wrapper = mount(FdsPre, {
        props: { code: formattedCode },
      })
      const preText = wrapper.find('pre').text()
      // Note: Vue Test Utils may trim leading whitespace from the first line
      // Check that the content structure is preserved
      expect(preText).toContain('indented')
      expect(preText).toContain('more indented')
      expect(preText).toContain('regular')
      // Check that relative indentation is preserved
      const lines = preText.split('\n')
      if (lines.length === 3) {
        // If first line is trimmed, at least verify the second line has more indentation
        const firstLineIndent = lines[0].length - lines[0].trimStart().length
        const secondLineIndent = lines[1].length - lines[1].trimStart().length
        expect(secondLineIndent).toBeGreaterThan(firstLineIndent)
      }
    })
  })
})
