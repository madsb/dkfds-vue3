import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsFormgroup from '../../components/fds-formgroup.vue'

describe('FdsFormgroup', () => {
  describe('Basic Rendering', () => {
    it('should render form group with correct CSS classes', () => {
      const wrapper = mount(FdsFormgroup)
      const formGroup = wrapper.find('.form-group')

      expect(formGroup.exists()).toBe(true)
      expect(formGroup.classes()).toContain('form-group')
      expect(formGroup.classes()).not.toContain('form-error')
    })

    it('should generate unique form ID when no ID provided', () => {
      const wrapper = mount(FdsFormgroup, {
        slots: {
          default: ({ formid }) => `<input id="${formid}">`,
        },
      })

      // Access the provided values through the component's provides
      const formid = wrapper.vm.$.provides.formid.value
      // The formId utility generates IDs with the pattern fid_<uuid without dashes>
      expect(formid).toMatch(/^fid_[a-z0-9]+$/)
      expect(formid.length).toBeGreaterThan(4) // At least 'fid_' plus some characters
    })

    it('should use provided ID when specified', () => {
      const customId = 'custom-form-id'
      const wrapper = mount(FdsFormgroup, {
        props: { id: customId },
        slots: {
          default: ({ formid }) => `<span>${formid}</span>`,
        },
      })

      // Access the provided values through the component's provides
      const formid = wrapper.vm.$.provides.formid.value
      expect(formid).toBe(customId)
    })
  })

  describe('DKFDS v11 Error State Handling', () => {
    it('should apply form-error class when isValid is false', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { isValid: false },
      })

      const formGroup = wrapper.find('.form-group')
      expect(formGroup.classes()).toContain('form-error')
    })

    it('should set aria-invalid when isValid is false', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { isValid: false },
      })

      const formGroup = wrapper.find('.form-group')
      expect(formGroup.attributes('aria-invalid')).toBe('true')
    })

    it('should not set aria-invalid when isValid is true', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { isValid: true },
      })

      const formGroup = wrapper.find('.form-group')
      expect(formGroup.attributes('aria-invalid')).toBeUndefined()
    })

    it('should remove form-error class when isValid changes to true', async () => {
      const wrapper = mount(FdsFormgroup, {
        props: { isValid: false },
      })

      expect(wrapper.find('.form-group').classes()).toContain('form-error')

      await wrapper.setProps({ isValid: true })
      expect(wrapper.find('.form-group').classes()).not.toContain('form-error')
    })
  })

  describe('DKFDS v11 Accessibility Integration', () => {
    it('should provide correct aria-describedby with hint ID', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { id: 'test-field' },
        slots: {
          default: ({ ariaDescribedby }) => `<span>${ariaDescribedby}</span>`,
        },
      })

      // Access the provided values through the component's provides
      const ariaDescribedby = wrapper.vm.$.provides.ariaDescribedby.value
      expect(ariaDescribedby).toBe('test-field-hint')
    })

    it('should include error ID in aria-describedby when invalid', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { id: 'test-field', isValid: false },
        slots: {
          default: ({ ariaDescribedby }) => `<span>${ariaDescribedby}</span>`,
        },
      })

      // Access the provided values through the component's provides
      const ariaDescribedby = wrapper.vm.$.provides.ariaDescribedby.value
      expect(ariaDescribedby).toBe('test-field-hint test-field-error')
    })

    it('should provide isValid state to slot', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { isValid: false },
        slots: {
          default: ({ isValid }) => `<span>${isValid}</span>`,
        },
      })

      // Access the provided values through the component's provides
      const isValid = wrapper.vm.$.provides.isValid.value
      expect(isValid).toBe(false)
    })
  })

  describe('Provide/Inject Pattern', () => {
    it('should provide formid for child components', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { id: 'test-provide' },
      })

      const providedFormId = wrapper.vm.$.provides.formid
      expect(providedFormId.value).toBe('test-provide')
    })

    it('should provide hintId and errorId for child components', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { id: 'test-provide' },
      })

      expect(wrapper.vm.$.provides.hintId.value).toBe('test-provide-hint')
      expect(wrapper.vm.$.provides.errorId.value).toBe('test-provide-error')
    })

    it('should provide isValid computed for child components', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { isValid: false },
      })

      expect(wrapper.vm.$.provides.isValid.value).toBe(false)
    })

    it('should provide ariaDescribedby for child components', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { id: 'test-provide', isValid: false },
      })

      expect(wrapper.vm.$.provides.ariaDescribedby.value).toBe(
        'test-provide-hint test-provide-error',
      )
    })
  })

  describe('Integration with Parent Forms', () => {
    it('should prioritize injected isValid over prop', () => {
      const ParentComponent = {
        template: '<fds-formgroup :is-valid="true"><span>test</span></fds-formgroup>',
        components: { FdsFormgroup },
        provide: {
          provideIsValid: false,
        },
      }

      const wrapper = mount(ParentComponent)
      const formGroup = wrapper.find('.form-group')
      expect(formGroup.classes()).toContain('form-error')
    })

    it('should use prop isValid when no injection available', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { isValid: true },
      })

      const formGroup = wrapper.find('.form-group')
      expect(formGroup.classes()).not.toContain('form-error')
    })
  })

  describe('DKFDS v11 Component Key Management', () => {
    it('should use formid as component key for proper reactivity', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { id: 'test-key' },
      })

      // The key is used internally by Vue for reactivity
      // We can verify it through the provided formid value
      const formid = wrapper.vm.$.provides.formid.value
      expect(formid).toBe('test-key')
    })

    it('should maintain consistent formid during component lifecycle', () => {
      const wrapper = mount(FdsFormgroup, {
        props: { id: 'consistent-key' },
      })

      const formid = wrapper.vm.$.provides.formid.value
      expect(formid).toBe('consistent-key')
      
      // The formid should remain consistent for the lifecycle of the component
      // This ensures proper form control associations
      const formidAgain = wrapper.vm.$.provides.formid.value
      expect(formidAgain).toBe(formid)
    })
  })
})
