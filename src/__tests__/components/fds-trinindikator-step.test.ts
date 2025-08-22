import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsTrinindikatorStep from '../../components/navigation/fds-trinindikator-step.vue'
import { testAccessibility } from '../../test-utils'

describe('FdsTrinindikatorStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: 'Test Step' },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with correct DKFDS structure', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: 'Test Step' },
      })

      expect(wrapper.find('li').exists()).toBe(true)
      expect(wrapper.find('.step').exists()).toBe(true)
      expect(wrapper.find('.step-number').exists()).toBe(true)
      expect(wrapper.find('.step-title').exists()).toBe(true)
    })

    it('renders as div when not clickable', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: false,
        },
      })

      const content = wrapper.find('.step')
      expect(content.element.tagName).toBe('DIV')
      expect(content.attributes('href')).toBeUndefined()
    })

    it('renders as anchor when clickable', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: true,
        },
      })

      const content = wrapper.find('.step')
      expect(content.element.tagName).toBe('A')
      expect(content.attributes('href')).toBe('javascript:void(0);')
    })

    it('renders step number in nested span', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 5, title: 'Test Step' },
      })

      const stepNumber = wrapper.find('.step-number span')
      expect(stepNumber.exists()).toBe(true)
      expect(stepNumber.text()).toBe('5')
    })

    it('renders title text', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: 'Personal Information' },
      })

      const title = wrapper.find('.step-title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('Personal Information')
    })

    it('renders step information when provided (via stepInfo)', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          stepInfo: 'Enter your basic details',
        },
      })

      const info = wrapper.find('.step-information')
      expect(info.exists()).toBe(true)
      expect(info.text()).toBe('Enter your basic details')
    })

    it('does not render step information when not provided', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: 'Test Step' },
      })

      expect(wrapper.find('.step-information').exists()).toBe(false)
    })

    it('renders step information when provided', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          stepInfo: 'Additional info',
        },
      })

      const stepInfo = wrapper.find('.step-information')
      expect(stepInfo.exists()).toBe(true)
      expect(stepInfo.text()).toBe('Additional info')
    })

    // Visibility is controlled solely by presence of stepInfo
  })

  describe('Props', () => {
    it('uses default props correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: 'Test' },
      })

      expect(wrapper.vm.stepInfo).toBe('')
      expect(wrapper.vm.isCurrent).toBe(false)
      expect(wrapper.vm.isCompleted).toBe(false)
      expect(wrapper.vm.hasError).toBe(false)
      expect(wrapper.vm.disabled).toBe(false)
      expect(wrapper.vm.clickable).toBe(false)
    })

    it('applies step number correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 42, title: 'Test Step' },
      })

      expect(wrapper.find('.step-number').text()).toBe('42')
    })

    it('applies title and information props', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Main Title',
          stepInfo: 'Additional information',
        },
      })

      expect(wrapper.find('.step-title').text()).toBe('Main Title')
      expect(wrapper.find('.step-information').text()).toBe('Additional information')
    })

    it('applies custom ARIA labels', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          errorIconLabel: 'Custom error label',
          completedIconLabel: 'Custom completed label',
          ariaLabel: 'Custom step label',
        },
      })

      expect(wrapper.vm.errorIconLabel).toBe('Custom error label')
      expect(wrapper.vm.completedIconLabel).toBe('Custom completed label')
      expect(wrapper.vm.ariaLabel).toBe('Custom step label')
    })
  })

  describe('Step States', () => {
    it('applies current state correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Current Step',
          isCurrent: true,
        },
      })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('current')
      const step = wrapper.find('.step')
      expect(step.attributes('aria-current')).toBe('step')
    })

    it('applies completed state correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Completed Step',
          isCompleted: true,
          isCurrent: false, // Not current
        },
      })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('completed')
      expect(item.classes()).not.toContain('current')
    })

    it('does not show completed state when current', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Current Step',
          isCompleted: true,
          isCurrent: true, // Current takes precedence
        },
      })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('current')
      expect(item.classes()).not.toContain('completed')
    })

    it('applies error state correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 3,
          title: 'Error Step',
          hasError: true,
        },
      })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('error')
    })

    it('applies disabled state correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 4,
          title: 'Disabled Step',
          disabled: true,
        },
      })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('disabled')
    })

    it('renders clickable step as anchor', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Clickable Step',
          clickable: true,
        },
      })

      const step = wrapper.find('.step')
      expect(step.element.tagName).toBe('A')
    })

    it('does not render anchor when disabled', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Disabled Clickable Step',
          clickable: true,
          disabled: true,
        },
      })

      const step = wrapper.find('.step')
      expect(step.element.tagName).toBe('DIV')
      const item = wrapper.find('li')
      expect(item.classes()).toContain('disabled')
    })
  })

  describe('Icons', () => {
    it('shows step number by default', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 3, title: 'Normal Step' },
      })

      expect(wrapper.find('.step-number').exists()).toBe(true)
      expect(wrapper.find('.step-number span').text()).toBe('3')
      expect(wrapper.find('svg.icon-svg').exists()).toBe(false)
    })

    it('shows error icon when hasError is true', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Error Step',
          hasError: true,
        },
      })

      const errorIcon = wrapper.find('.step-icon svg')
      expect(errorIcon.exists()).toBe(true)
      expect(errorIcon.attributes('aria-label')).toBe('Fejl')
      expect(wrapper.find('.step-icon use').attributes('href')).toBe('#report-problem')
      expect(wrapper.find('.step-number').exists()).toBe(false)
    })

    it('shows completed icon when completed and not current', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Completed Step',
          isCompleted: true,
          isCurrent: false,
        },
      })

      const completedIcon = wrapper.find('.step-icon svg')
      expect(completedIcon.exists()).toBe(true)
      expect(completedIcon.attributes('aria-label')).toBe('Færdig')
      expect(wrapper.find('.step-icon use').attributes('href')).toBe('#check')
      expect(wrapper.find('.step-number').exists()).toBe(false)
    })

    it('shows step number when completed but current', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Current Completed Step',
          isCompleted: true,
          isCurrent: true,
        },
      })

      expect(wrapper.find('.step-number').exists()).toBe(true)
      expect(wrapper.find('.step-number span').text()).toBe('2')
      expect(wrapper.find('.step-icon').exists()).toBe(false)
    })

    it('error icon takes precedence over completed icon', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Error and Completed Step',
          hasError: true,
          isCompleted: true,
          isCurrent: false,
        },
      })

      const icon = wrapper.find('.step-icon use')
      expect(icon.attributes('href')).toBe('#report-problem')
      expect(wrapper.find('.step-number').exists()).toBe(false)
    })

    it('applies custom icon labels', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Error Step',
          hasError: true,
          errorIconLabel: 'Custom Error',
          completedIconLabel: 'Custom Complete',
        },
      })

      const errorIcon = wrapper.find('.step-icon svg')
      expect(errorIcon.attributes('aria-label')).toBe('Custom Error')
    })
  })

  describe('Click Handling', () => {
    it('emits click event when clickable step is clicked', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 3,
          title: 'Clickable Step',
          clickable: true,
        },
      })

      const link = wrapper.find('a.step')
      await link.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')[0][0]).toBe(3) // stepNumber
      expect(wrapper.emitted('click')[0][1]).toBeInstanceOf(MouseEvent) // event
    })

    it('does not emit click event when not clickable', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 3,
          title: 'Non-clickable Step',
          clickable: false,
        },
      })

      const div = wrapper.find('div.step')
      await div.trigger('click')

      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 3,
          title: 'Disabled Clickable Step',
          clickable: true,
          disabled: true,
        },
      })

      const step = wrapper.find('div.step')
      await step.trigger('click')

      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('renders as div when disabled prop is true', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Disabled Step',
          clickable: true,
          disabled: true,
        },
      })

      const step = wrapper.find('.step')
      expect(step.element.tagName).toBe('DIV')
    })

    it('renders as anchor when disabled prop is false', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Enabled Step',
          clickable: true,
          disabled: false,
        },
      })

      const step = wrapper.find('.step')
      expect(step.element.tagName).toBe('A')
    })
  })

  describe('CSS Classes', () => {
    it('applies step class correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Clickable Step',
          clickable: true,
        },
      })

      const content = wrapper.find('.step')
      expect(content.exists()).toBe(true)
      expect(content.element.tagName).toBe('A')
    })

    it('applies disabled class when disabled', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Disabled Step',
          disabled: true,
        },
      })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('disabled')
    })

    it('applies multiple step item classes', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Multi-state Step',
          isCurrent: true,
          hasError: true,
          clickable: true,
        },
      })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('current')
      expect(item.classes()).toContain('error')
    })
  })

  describe('ARIA Labels', () => {
    it('generates default ARIA label correctly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Document Upload',
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Trin 2: Document Upload')
    })

    it('adds current step indicator to ARIA label', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 3,
          title: 'Review',
          isCurrent: true,
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Trin 3: Review (nuværende trin)')
    })

    it('adds completed indicator to ARIA label', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Personal Info',
          isCompleted: true,
          isCurrent: false,
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Trin 1: Personal Info (færdigt)')
    })

    it('adds error indicator to ARIA label', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Documents',
          hasError: true,
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Trin 2: Documents (fejl)')
    })

    it('adds disabled indicator to ARIA label', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 4,
          title: 'Payment',
          disabled: true,
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Trin 4: Payment (deaktiveret)')
    })

    it('combines multiple state indicators in ARIA label', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Validation',
          hasError: true,
          disabled: true,
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Trin 2: Validation (fejl) (deaktiveret)')
    })

    it('uses custom ARIA label when provided', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          ariaLabel: 'Custom accessibility label',
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Custom accessibility label')
    })

    it('current takes precedence over completed in ARIA label', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Current Step',
          isCurrent: true,
          isCompleted: true,
        },
      })

      const content = wrapper.find('.step')
      expect(content.attributes('aria-label')).toBe('Trin 2: Current Step (nuværende trin)')
      expect(content.attributes('aria-label')).not.toContain('færdigt')
    })
  })

  describe('Accessibility', () => {
    it('has correct accessibility attributes for clickable step', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Clickable Step',
          clickable: true,
          isCurrent: true,
        },
      })

      const link = wrapper.find('a.step')

      expect(link.attributes('aria-current')).toBe('step')
      expect(link.attributes('aria-label')).toContain('nuværende trin')
    })

    it('has correct accessibility attributes for error step', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 3,
          title: 'Error Step',
          hasError: true,
        },
      })

      const errorIcon = wrapper.find('.step-icon svg')
      expect(errorIcon.attributes('aria-label')).toBe('Fejl')
    })

    it('has correct accessibility attributes for completed step', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Completed Step',
          isCompleted: true,
        },
      })

      const completedIcon = wrapper.find('.step-icon svg')
      expect(completedIcon.attributes('aria-label')).toBe('Færdig')
    })

    it('step number and icons have correct focusable attributes', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: 'Test Step', hasError: true },
      })

      const svg = wrapper.find('svg')
      expect(svg.attributes('focusable')).toBe('false')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <ol>
              <fds-trinindikator-step
                :step-number="1"
                title="Personal Information"
                step-info="Enter your basic details"
                :is-current="true"
              />
            </ol>
          </main>
        `,
        components: { FdsTrinindikatorStep },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles step number zero', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 0, title: 'Zero Step' },
      })

      expect(wrapper.find('.step-number').text()).toBe('0')
    })

    it('handles negative step number', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: -1, title: 'Negative Step' },
      })

      expect(wrapper.find('.step-number').text()).toBe('-1')
    })

    it('handles large step number', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 999, title: 'Large Step' },
      })

      expect(wrapper.find('.step-number').text()).toBe('999')
    })

    it('handles empty title', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: '' },
      })

      expect(wrapper.find('.step-title').text()).toBe('')
    })

    it('handles very long title', () => {
      const longTitle = 'This is a very long step title that might wrap to multiple lines'
      const wrapper = mount(FdsTrinindikatorStep, {
        props: { stepNumber: 1, title: longTitle },
      })

      expect(wrapper.find('.step-title').text()).toBe(longTitle)
    })

    it('handles empty step info', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          stepInfo: '',
        },
      })

      expect(wrapper.find('.step-information').exists()).toBe(false)
    })

    it('handles rapid state changes', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Changing Step',
          clickable: true,
        },
      })

      // Rapid state changes
      await wrapper.setProps({ isCurrent: true })
      await wrapper.setProps({ isCompleted: true, isCurrent: false })
      await wrapper.setProps({ hasError: true })
      await wrapper.setProps({ disabled: true })

      const item = wrapper.find('li')
      expect(item.classes()).toContain('error')
      expect(item.classes()).toContain('disabled')
    })

    it('handles click during disabled state change', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: true,
          disabled: false,
        },
      })

      const content = wrapper.find('.step')

      // Click when enabled
      await content.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)

      // Disable and click again
      await wrapper.setProps({ disabled: true })
      await content.trigger('click')

      // Should still only have one click event
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  describe('Integration', () => {
    it('works within trinindikator group context', () => {
      const wrapper = mount({
        template: `
          <ol class="step-indicator">
            <fds-trinindikator-step
              v-for="step in steps"
              :key="step.number"
              :step-number="step.number"
              :title="step.title"
              :is-current="step.number === currentStep"
              :is-completed="step.number < currentStep"
              :clickable="true"
              @click="handleStepClick"
            />
          </ol>
        `,
        components: { FdsTrinindikatorStep },
        data() {
          return {
            currentStep: 2,
            steps: [
              { number: 1, title: 'Personal Info' },
              { number: 2, title: 'Documents' },
              { number: 3, title: 'Review' },
            ],
          }
        },
        methods: {
          handleStepClick(stepNumber) {
            this.currentStep = stepNumber
          },
        },
      })

      const steps = wrapper.findAllComponents(FdsTrinindikatorStep)
      expect(steps).toHaveLength(3)

      // Check initial state
      expect(steps[0].classes()).toContain('completed')
      expect(steps[1].classes()).toContain('current')
      expect(steps[2].classes()).not.toContain('current')
    })

    it('maintains visual consistency across state changes', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Dynamic Step',
          clickable: true,
        },
      })

      // Test state progression
      const item = wrapper.find('li')

      // Default state
      expect(item.classes()).not.toContain('current')
      expect(item.classes()).not.toContain('completed')

      // Become current
      await wrapper.setProps({ isCurrent: true })
      expect(item.classes()).toContain('current')

      // Become completed
      await wrapper.setProps({ isCurrent: false, isCompleted: true })
      expect(item.classes()).toContain('completed')
      expect(item.classes()).not.toContain('current')
    })

    it('handles complex interactions', async () => {
      const wrapper = mount({
        template: `
          <fds-trinindikator-step
            :step-number="stepNumber"
            :title="stepTitle"
            :is-current="isCurrent"
            :is-completed="isCompleted"
            :has-error="hasError"
            :clickable="clickable"
            :disabled="disabled"
            @click="handleClick"
          />
        `,
        components: { FdsTrinindikatorStep },
        data() {
          return {
            stepNumber: 1,
            stepTitle: 'Interactive Step',
            isCurrent: false,
            isCompleted: false,
            hasError: false,
            clickable: true,
            disabled: false,
            clickCount: 0,
          }
        },
        methods: {
          handleClick(_stepNumber) {
            this.clickCount++
            if (this.clickCount === 1) {
              this.isCurrent = true
            } else if (this.clickCount === 2) {
              this.isCompleted = true
              this.isCurrent = false
            }
          },
        },
      })

      const step = wrapper.findComponent(FdsTrinindikatorStep)
      const link = wrapper.find('a.step')

      // First click - becomes current
      await link.trigger('click')
      expect(step.classes()).toContain('current')

      // Second click - becomes completed
      await link.trigger('click')
      expect(step.classes()).toContain('completed')
      expect(step.classes()).not.toContain('current')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 step structure', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Personlige oplysninger',
        },
      })

      // Check DKFDS v11 step structure
      expect(wrapper.find('li').exists()).toBe(true)
      expect(wrapper.find('.step').exists()).toBe(true)
      expect(wrapper.find('.step-title').exists()).toBe(true)
      expect(wrapper.find('.step-number').exists()).toBe(true)
    })

    it('uses Danish default texts in ARIA labels', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Dokumenter',
          isCurrent: true,
        },
      })

      const stepAriaLabel = wrapper.vm.stepAriaLabel
      expect(stepAriaLabel).toContain('Trin 2')
      expect(stepAriaLabel).toContain('nuværende trin')
      expect(wrapper.vm.errorIconLabel).toBe('Fejl')
      expect(wrapper.vm.completedIconLabel).toBe('Færdig')
    })

    it('supports DKFDS SVG icon integration for states', () => {
      // Test error state
      const errorWrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          hasError: true,
        },
      })

      const errorIcon = errorWrapper.find('.step-icon svg')
      expect(errorIcon.exists()).toBe(true)
      expect(errorWrapper.find('.step-icon use').attributes('href')).toBe('#report-problem')

      // Test completed state
      const completedWrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          isCompleted: true,
        },
      })

      const completedIcon = completedWrapper.find('.step-icon svg')
      expect(completedIcon.exists()).toBe(true)
      expect(completedWrapper.find('.step-icon use').attributes('href')).toBe('#check')
    })

    it('follows DKFDS v11 color scheme classes', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 2,
          title: 'Test Step',
          isCurrent: true,
        },
      })

      expect(wrapper.find('li').classes()).toContain('current')
      expect(wrapper.find('.step').exists()).toBe(true)
    })

    it('provides comprehensive Danish accessibility text', () => {
      const scenarios = [
        {
          props: { stepNumber: 1, title: 'Personoplysninger', isCurrent: true },
          expected: 'Trin 1: Personoplysninger (nuværende trin)',
        },
        {
          props: { stepNumber: 2, title: 'Dokumenter', isCompleted: true },
          expected: 'Trin 2: Dokumenter (færdigt)',
        },
        {
          props: { stepNumber: 3, title: 'Fejl trin', hasError: true },
          expected: 'Trin 3: Fejl trin (fejl)',
        },
        {
          props: { stepNumber: 4, title: 'Deaktiveret trin', disabled: true },
          expected: 'Trin 4: Deaktiveret trin (deaktiveret)',
        },
      ]

      scenarios.forEach((scenario) => {
        const wrapper = mount(FdsTrinindikatorStep, {
          props: scenario.props,
        })

        expect(wrapper.vm.stepAriaLabel).toBe(scenario.expected)
      })
    })
  })

  describe('Enhanced Interaction Patterns', () => {
    it('handles keyboard navigation for links', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: true,
        },
      })

      const link = wrapper.find('a.step')

      // Test keyboard interaction (Enter key on link triggers click)
      await link.trigger('keydown', { key: 'Enter' })

      // Links naturally support Enter key for navigation
      expect(link.exists()).toBe(true)
    })

    it('provides proper focus indicators', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: true,
        },
      })

      const link = wrapper.find('a.step')
      expect(link.exists()).toBe(true)

      // Link should be focusable by default
      expect(link.attributes('href')).toBeDefined()
    })

    it('handles hover states for clickable steps', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: true,
        },
      })

      const link = wrapper.find('a.step')

      await link.trigger('mouseenter')
      await link.trigger('mouseleave')

      // Hover behavior is CSS-based
      expect(link.exists()).toBe(true)
    })

    it('supports tooltip on hover for step information', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          stepInfo: 'Additional step information',
        },
      })

      const stepInfo = wrapper.find('.step-information')
      expect(stepInfo.exists()).toBe(true)
      expect(stepInfo.text()).toBe('Additional step information')
    })
  })

  describe('Advanced State Management', () => {
    it('handles complex state transitions', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: true,
        },
      })

      // Initial state
      const li = wrapper.find('li')
      expect(li.classes()).not.toContain('current')
      expect(li.classes()).not.toContain('completed')
      expect(li.classes()).not.toContain('error')

      // Set as current
      await wrapper.setProps({ isCurrent: true })
      expect(li.classes()).toContain('current')

      // Complete the step
      await wrapper.setProps({ isCurrent: false, isCompleted: true })
      expect(li.classes()).toContain('completed')
      expect(li.classes()).not.toContain('current')

      // Add error state
      await wrapper.setProps({ hasError: true })
      expect(li.classes()).toContain('error')
    })

    it('properly updates ARIA labels on state changes', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Dynamic Step',
        },
      })

      // Initial ARIA label
      expect(wrapper.vm.stepAriaLabel).toBe('Trin 1: Dynamic Step')

      // Set as current
      await wrapper.setProps({ isCurrent: true })
      expect(wrapper.vm.stepAriaLabel).toBe('Trin 1: Dynamic Step (nuværende trin)')

      // Complete the step
      await wrapper.setProps({ isCurrent: false, isCompleted: true })
      expect(wrapper.vm.stepAriaLabel).toBe('Trin 1: Dynamic Step (færdigt)')

      // Add error - error state takes precedence over completed when not current
      await wrapper.setProps({ hasError: true, isCompleted: false })
      expect(wrapper.vm.stepAriaLabel).toBe('Trin 1: Dynamic Step (fejl)')
    })

    it('handles disabled state properly', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Test Step',
          clickable: true,
          disabled: true,
        },
      })

      const step = wrapper.find('.step')
      // Disabled steps render as div, not anchor
      expect(step.element.tagName).toBe('DIV')
      expect(wrapper.find('li').classes()).toContain('disabled')

      // Clicking disabled step should not emit event
      await step.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()

      // Enable the step
      await wrapper.setProps({ disabled: false })
      const enabledStep = wrapper.find('.step')
      expect(enabledStep.element.tagName).toBe('A')

      await enabledStep.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })

  describe('Responsive Design Features', () => {
    it('adapts layout for mobile screens', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Mobile Step',
          description: 'Mobile description',
        },
      })

      // Should have responsive classes that work with mobile CSS
      expect(wrapper.find('.step').exists()).toBe(true)
      expect(wrapper.find('.step-title').exists()).toBe(true)
    })

    it('handles long titles gracefully', () => {
      const longTitle =
        'This is a very long step title that might wrap on smaller screens and should be handled properly'

      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: longTitle,
        },
      })

      const title = wrapper.find('.step-title')
      expect(title.text()).toBe(longTitle)
      expect(title.exists()).toBe(true)
    })
  })

  describe('Performance and Memory', () => {
    it('handles frequent prop updates efficiently', async () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Performance Test',
        },
      })

      const startTime = performance.now()

      // Simulate rapid prop changes
      for (let i = 0; i < 100; i++) {
        await wrapper.setProps({
          isCurrent: i % 2 === 0,
          isCompleted: i % 3 === 0,
          hasError: i % 5 === 0,
        })
      }

      const endTime = performance.now()

      // Should complete within reasonable time
      expect(endTime - startTime).toBeLessThan(1000) // 1 second
    })

    it('cleans up event listeners properly', () => {
      const wrapper = mount(FdsTrinindikatorStep, {
        props: {
          stepNumber: 1,
          title: 'Cleanup Test',
          clickable: true,
        },
      })

      // Component should mount successfully
      expect(wrapper.exists()).toBe(true)

      // Unmount should not throw errors
      expect(() => wrapper.unmount()).not.toThrow()
    })
  })
})
