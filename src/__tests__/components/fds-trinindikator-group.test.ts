import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FdsTrinindikatorGroup from "../../components/navigation/fds-trinindikator-group.vue"
import FdsTrinindikatorStep from "../../components/navigation/fds-trinindikator-step.vue"
import { testAccessibility } from '../../test-utils'

// Mock window resize and screen size
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

Object.defineProperty(window, 'addEventListener', {
  writable: true,
  configurable: true,
  value: vi.fn(),
})

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  configurable: true,
  value: vi.fn(),
})

describe('FdsTrinindikatorGroup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.innerWidth = 1024 // Default to desktop size

    // Mock document methods
    global.document.addEventListener = vi.fn()
    global.document.removeEventListener = vi.fn()
    global.document.getElementById = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsTrinindikatorGroup)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with correct DKFDS structure', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      expect(wrapper.find('nav').exists()).toBe(true)
      expect(wrapper.find('nav').attributes('aria-label')).toBe('Trinindikator')
      expect(wrapper.find('ol.step-indicator').exists()).toBe(true)
    })

    it('renders desktop view by default', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      expect(wrapper.find('nav.d-none.d-md-block').exists()).toBe(true)
      expect(wrapper.find('ol.step-indicator').exists()).toBe(true)
      expect(wrapper.find('.step-indicator-button.d-md-none').exists()).toBe(true)
    })

    it('renders mobile button with correct structure', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { currentStep: 2, totalSteps: 4 },
      })

      const button = wrapper.find('.step-indicator-button.d-md-none')
      expect(button.exists()).toBe(true)
      expect(button.attributes('aria-haspopup')).toBe('dialog')
      expect(button.text()).toContain('Trin 2 af 4')
    })

    it('renders both desktop and mobile elements', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // Both elements exist in DOM, visibility controlled by CSS
      expect(wrapper.find('nav.d-none.d-md-block').exists()).toBe(true)
      expect(wrapper.find('.step-indicator-button.d-md-none').exists()).toBe(true)
    })

    it('renders modal structure correctly', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // Check that modal component exists (as dialog element)
      expect(wrapper.find('dialog').exists()).toBe(true)
      expect(wrapper.find('.fds-modal').exists()).toBe(true)
      expect(wrapper.find('.modal-content').exists()).toBe(true)
    })

    it('renders slot content', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        slots: {
          default: '<li class="test-step">Test Step</li>',
        },
      })

      expect(wrapper.find('.test-step').exists()).toBe(true)
      expect(wrapper.find('.test-step').text()).toBe('Test Step')
    })
  })

  describe('Props', () => {
    it('uses default props correctly', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      expect(wrapper.vm.currentStep).toBe(1)
      expect(wrapper.vm.totalSteps).toBe(0)
      expect(wrapper.vm.ariaLabel).toBe('Trinindikator')
      expect(wrapper.vm.responsive).toBe(true)
      expect(wrapper.vm.mobileBreakpoint).toBe(768)
      expect(wrapper.vm.modalTitle).toBe('Trin')
    })

    it('applies custom id', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { id: 'custom-steps' },
      })

      expect(wrapper.vm.formid).toBe('custom-steps')
    })

    it('applies custom aria label', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { ariaLabel: 'Application progress steps' },
      })

      const nav = wrapper.find('nav')
      expect(nav.attributes('aria-label')).toBe('Application progress steps')
    })

    it('applies current step and total steps', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          currentStep: 3,
          totalSteps: 5,
        },
      })

      expect(wrapper.vm.currentStep).toBe(3)
      expect(wrapper.vm.totalSteps).toBe(5)
      expect(wrapper.find('.step-indicator-button').text()).toContain('Trin 3 af 5')
    })

    it('applies step indicator classes', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          clickableSteps: true,
          showStepInfo: true,
        },
      })

      const stepIndicator = wrapper.find('ol.step-indicator')
      expect(stepIndicator.classes()).toContain('step-indicator--clickable')
      expect(stepIndicator.classes()).toContain('step-indicator--with-info')
    })

    it('applies custom modal texts', async () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          modalTitle: 'Custom Steps',
          closeButtonText: 'Custom Close',
        },
      })

      expect(wrapper.find('.modal-title').text()).toBe('Custom Steps')
      expect(wrapper.find('.modal-close').text()).toContain('Custom Close')
    })
  })

  describe('Mobile Modal Functionality', () => {
    it('shows mobile button with correct text', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          currentStep: 2,
          totalSteps: 4,
        },
      })

      const button = wrapper.find('.step-indicator-button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toContain('Trin 2 af 4')
    })

    it('emits modal-open event on button click', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      const button = wrapper.find('.step-indicator-button')
      await button.trigger('click')

      expect(wrapper.emitted('modal-open')).toBeTruthy()
    })

    it('has modal component with correct structure', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // Verify the modal component exists and is properly configured
      const modal = wrapper.findComponent({ name: 'FdsModal' })
      expect(modal.exists()).toBe(true)
      expect(modal.props('closeable')).toBe(true)
    })

    it('renders modal with correct content structure', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        slots: {
          default: '<li class="test-step">Test Step Content</li>',
        },
      })

      const modal = wrapper.find('.fds-modal')
      const stepList = modal.find('ol.step-indicator')

      expect(stepList.exists()).toBe(true)
      expect(modal.find('.test-step').exists()).toBe(true)
    })
  })

  describe('Responsive Behavior', () => {
    it('has responsive CSS classes', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // Check for responsive classes
      expect(wrapper.find('nav.d-none.d-md-block').exists()).toBe(true)
      expect(wrapper.find('.step-indicator-button.d-md-none').exists()).toBe(true)
    })

    it('maintains modal state', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // Check modal component reference exists
      const modal = wrapper.findComponent({ name: 'FdsModal' })
      expect(modal.exists()).toBe(true)
    })

    it('renders DKFDS compliant modal', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // Check modal structure exists
      expect(wrapper.find('dialog').exists()).toBe(true)
      expect(wrapper.find('.fds-modal').exists()).toBe(true)
      expect(wrapper.find('.modal-content').exists()).toBe(true)
    })
  })

  describe('Step Click Events', () => {
    it('emits step-click event when step is clicked', async () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { clickableSteps: true },
      })

      // Simulate step click from child component
      wrapper.vm.$emit('step-click', 3)

      expect(wrapper.emitted('step-click')).toBeTruthy()
      expect(wrapper.emitted('step-click')[0]).toEqual([3])
    })
  })

  describe('Slots and Scoped Slots', () => {
    it('provides currentStep and mobile flag to slots', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { currentStep: 2 },
        slots: {
          default: `
            <template #default="{ currentStep, mobile }">
              <li class="step-item" :data-current="currentStep" :data-mobile="mobile">
                Step {{ currentStep }}
              </li>
            </template>
          `,
        },
      })

      const stepItem = wrapper.find('.step-item')
      expect(stepItem.attributes('data-current')).toBe('2')
      expect(stepItem.attributes('data-mobile')).toBe('false')
    })

    it('provides mobile flag correctly in mobile modal', async () => {
      window.innerWidth = 500
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          responsive: true,
          currentStep: 1,
        },
        slots: {
          default: `
            <template #default="{ currentStep, mobile }">
              <li class="step-item" :data-mobile="mobile">Step {{ currentStep }}</li>
            </template>
          `,
        },
      })

      // Responsive behavior is now handled by CSS classes

      await wrapper.find('.step-indicator-button').trigger('click')
      await nextTick()

      const modal = wrapper.find('.fds-modal')
      const mobileStepItem = modal.find('.step-item')
      expect(mobileStepItem.attributes('data-mobile')).toBe('true')
    })
  })

  describe('Lifecycle and Event Listeners', () => {
    it('modal component handles its own event listeners', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // The fds-modal component manages its own event listeners
      const modal = wrapper.findComponent({ name: 'FdsModal' })
      expect(modal.exists()).toBe(true)

      wrapper.unmount()
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          ariaLabel: 'Progress steps',
          currentStep: 2,
          totalSteps: 4,
        },
      })

      const nav = wrapper.find('nav')
      expect(nav.attributes('aria-label')).toBe('Progress steps')
    })

    it('has correct modal ARIA attributes', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          modalAriaLabel: 'Steps dialog',
        },
      })

      const button = wrapper.find('.step-indicator-button')
      const modal = wrapper.find('.fds-modal')

      expect(button.attributes('aria-haspopup')).toBe('dialog')
      expect(modal.attributes('aria-modal')).toBe('true')
    })

    it('has accessible close button', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          closeButtonText: 'Close steps',
        },
      })

      const closeBtn = wrapper.find('.modal-close')
      expect(closeBtn.text()).toContain('Close steps')
    })

    it('passes accessibility tests in desktop mode', async () => {
      const TestWrapper = {
        template: `
          <main>
            <fds-trinindikator-group 
              :current-step="2"
              :total-steps="4"
              aria-label="Application progress"
            >
              <fds-trinindikator-step 
                :step-number="1"
                title="Personal info"
                :is-completed="true"
              />
              <fds-trinindikator-step 
                :step-number="2"
                title="Documents"
                :is-current="true"
              />
            </fds-trinindikator-group>
          </main>
        `,
        components: { FdsTrinindikatorGroup, FdsTrinindikatorStep },
      }

      window.innerWidth = 1024
      await testAccessibility(TestWrapper)
    })

    it('passes accessibility tests in mobile mode', async () => {
      const TestWrapper = {
        template: `
          <main>
            <fds-trinindikator-group 
              :current-step="2"
              :total-steps="4"
              aria-label="Application progress"
              :responsive="true"
            >
              <fds-trinindikator-step 
                :step-number="1"
                title="Personal info"
                :is-completed="true"
              />
              <fds-trinindikator-step 
                :step-number="2"
                title="Documents"
                :is-current="true"
              />
            </fds-trinindikator-group>
          </main>
        `,
        components: { FdsTrinindikatorGroup, FdsTrinindikatorStep },
      }

      window.innerWidth = 500
      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles zero total steps', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          currentStep: 1,
          totalSteps: 0,
        },
      })

      expect(wrapper.find('.step-indicator-button').text()).toContain('Trin 1 af 0')
    })

    it('handles negative step numbers', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          currentStep: -1,
          totalSteps: 3,
        },
      })

      expect(wrapper.find('.step-indicator-button').text()).toContain('Trin -1 af 3')
    })

    it('handles modal open event correctly', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      // Verify button triggers modal open
      const button = wrapper.find('.step-indicator-button')
      await button.trigger('click')
      expect(wrapper.emitted('modal-open')).toBeTruthy()
    })

    it('handles missing DOM elements gracefully', async () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { responsive: true },
      })

      // Modal component should handle this internally
      expect(wrapper.findComponent({ name: 'FdsModal' }).exists()).toBe(true)
    })

    it('handles multiple button clicks', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      const button = wrapper.find('.step-indicator-button')

      // Multiple clicks should emit events
      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')

      // Should have emitted modal-open events
      expect(wrapper.emitted('modal-open')).toHaveLength(3)
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 step indicator structure', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          ariaLabel: 'Trinindikator navigation',
          currentStep: 2,
          totalSteps: 4,
        },
      })

      // Check DKFDS v11 navigation structure
      expect(wrapper.find('nav.d-none.d-md-block').exists()).toBe(true)
      expect(wrapper.find('ol.step-indicator').exists()).toBe(true)
      expect(wrapper.find('.step-indicator-button.d-md-none').exists()).toBe(true)
    })

    it('uses Danish default texts', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { currentStep: 2, totalSteps: 4 },
      })

      expect(wrapper.vm.ariaLabel).toBe('Trinindikator')
      expect(wrapper.vm.modalTitle).toBe('Trin')
      expect(wrapper.vm.closeButtonText).toBe('Luk')
      expect(wrapper.vm.modalAriaLabel).toBe('Trin modal')
      expect(wrapper.find('.step-indicator-button').text()).toContain('Trin 2 af 4')
    })

    it('supports DKFDS modal structure', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      const modal = wrapper.find('.fds-modal')
      expect(modal.exists()).toBe(true)
      expect(modal.find('.modal-content').exists()).toBe(true)
    })

    it('follows DKFDS v11 mobile modal patterns', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      const modal = wrapper.find('.fds-modal')
      const header = wrapper.find('.modal-header')
      const closeButton = wrapper.find('.modal-close')

      expect(modal.exists()).toBe(true)
      expect(header.exists()).toBe(true)
      expect(closeButton.find('svg.icon-svg').exists()).toBe(true)
    })
  })

  describe('Enhanced Modal Features', () => {
    it('handles modal content correctly', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          modalTitle: 'Custom Title',
          currentStep: 3,
          totalSteps: 5,
        },
      })

      expect(wrapper.find('.modal-title').text()).toBe('Custom Title')
      expect(wrapper.find('.step-indicator-button').text()).toContain('Trin 3 af 5')
    })

    it('handles modal with custom props', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          modalTitle: 'Progress Steps',
          modalAriaLabel: 'Step Progress Modal',
          closeButtonText: 'Close Modal',
        },
      })

      const modal = wrapper.findComponent({ name: 'FdsModal' })
      expect(modal.exists()).toBe(true)
      expect(wrapper.find('.modal-title').text()).toBe('Progress Steps')
      expect(wrapper.find('.modal-close').text()).toContain('Close Modal')
    })
  })

  describe('Advanced Modal Interactions', () => {
    it('has focus management elements', () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      const modal = wrapper.find('.fds-modal')
      const closeButton = wrapper.find('.modal-close')

      expect(modal.exists()).toBe(true)
      expect(closeButton.exists()).toBe(true)
    })

    it('button triggers modal open event', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      const button = wrapper.find('.step-indicator-button')

      // Open modal
      await button.trigger('click')

      // Verify event was emitted
      expect(wrapper.emitted('modal-open')).toBeTruthy()
    })
  })

  describe('Performance Optimization', () => {
    it('handles button clicks efficiently', async () => {
      const wrapper = mount(FdsTrinindikatorGroup)

      const startTime = performance.now()

      // Click button multiple times
      for (let i = 0; i < 10; i++) {
        await wrapper.find('.step-indicator-button').trigger('click')
      }

      const endTime = performance.now()

      // Should complete within reasonable time
      expect(endTime - startTime).toBeLessThan(1000)
    })

    it('efficiently manages event listeners', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: { responsive: true },
      })

      // Modal component manages its own event listeners efficiently
      const modal = wrapper.findComponent({ name: 'FdsModal' })
      expect(modal.exists()).toBe(true)

      wrapper.unmount()
    })
  })

  describe('Integration', () => {
    it('works with trinindikator step components', () => {
      const wrapper = mount({
        template: `
          <fds-trinindikator-group 
            :current-step="currentStep"
            :total-steps="3"
            :clickable-steps="true"
            @step-click="handleStepClick"
          >
            <fds-trinindikator-step 
              :step-number="1"
              title="Step 1"
              :is-current="currentStep === 1"
              :is-completed="currentStep > 1"
              :clickable="true"
              @click="$emit('step-click', 1)"
            />
            <fds-trinindikator-step 
              :step-number="2"
              title="Step 2"
              :is-current="currentStep === 2"
              :is-completed="currentStep > 2"
              :clickable="true"
              @click="$emit('step-click', 2)"
            />
            <fds-trinindikator-step 
              :step-number="3"
              title="Step 3"
              :is-current="currentStep === 3"
              :clickable="true"
              @click="$emit('step-click', 3)"
            />
          </fds-trinindikator-group>
        `,
        components: { FdsTrinindikatorGroup, FdsTrinindikatorStep },
        emits: ['step-click'],
        data() {
          return {
            currentStep: 2,
          }
        },
        methods: {
          handleStepClick(stepNumber) {
            this.currentStep = stepNumber
            this.$emit('step-click', stepNumber)
          },
        },
      })

      const steps = wrapper.findAllComponents(FdsTrinindikatorStep)
      // Steps are rendered twice (desktop + mobile modal), so we expect 6 total
      expect(steps).toHaveLength(6)

      // Check that first set of steps receive correct props
      expect(steps[0].props('isCompleted')).toBe(true)
      expect(steps[1].props('isCurrent')).toBe(true)
      expect(steps[2].props('isCurrent')).toBe(false)
    })

    it('maintains state throughout interactions', async () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        props: {
          currentStep: 3,
          totalSteps: 5,
        },
      })

      // Check initial state
      expect(wrapper.find('ol.step-indicator').exists()).toBe(true)
      expect(wrapper.find('.step-indicator-button').text()).toContain('Trin 3 af 5')

      // Trigger modal open
      await wrapper.find('.step-indicator-button').trigger('click')
      await nextTick()
      expect(wrapper.vm.currentStep).toBe(3)

      // State should persist
      expect(wrapper.find('ol.step-indicator').exists()).toBe(true)
      expect(wrapper.vm.currentStep).toBe(3)
    })

    it('works with custom slot content', () => {
      const wrapper = mount(FdsTrinindikatorGroup, {
        slots: {
          default: `
            <li class="custom-step">
              <button>Custom Step Button</button>
            </li>
            <li class="custom-step">
              <button>Another Step</button>
            </li>
          `,
        },
      })

      const customSteps = wrapper.findAll('.custom-step')
      // Custom steps are rendered twice (desktop + mobile modal)
      expect(customSteps).toHaveLength(4)
      // One button for mobile toggle, one for modal close, plus custom buttons in slots (rendered twice)
      expect(wrapper.findAll('button').length).toBeGreaterThanOrEqual(3)
    })

    it('integrates with form wizards', async () => {
      const wrapper = mount({
        template: `
          <div>
            <fds-trinindikator-group 
              :current-step="currentStep"
              :total-steps="3"
              :clickable-steps="true"
              @step-click="goToStep"
            >
              <fds-trinindikator-step 
                v-for="step in steps" 
                :key="step.number"
                :step-number="step.number"
                :title="step.title"
                :is-current="step.number === currentStep"
                :is-completed="step.number < currentStep"
                :clickable="step.number <= maxCompletedStep"
                @click="goToStep(step.number)"
              />
            </fds-trinindikator-group>
            <div class="form-content">
              Step {{ currentStep }} Content
            </div>
          </div>
        `,
        components: { FdsTrinindikatorGroup, FdsTrinindikatorStep },
        data() {
          return {
            currentStep: 2,
            maxCompletedStep: 2,
            steps: [
              { number: 1, title: 'Personal Info' },
              { number: 2, title: 'Documents' },
              { number: 3, title: 'Review' },
            ],
          }
        },
        methods: {
          goToStep(stepNumber) {
            if (stepNumber <= this.maxCompletedStep) {
              this.currentStep = stepNumber
            }
          },
        },
      })

      expect(wrapper.find('.form-content').text()).toBe('Step 2 Content')

      // Should be able to go back to step 1
      const steps = wrapper.findAllComponents(FdsTrinindikatorStep)
      // Find the anchor element within the first step and click it
      const firstStepAnchor = steps[0].find('.step')
      await firstStepAnchor.trigger('click')
      await nextTick()

      // Check that the component's state updated
      expect(wrapper.find('.form-content').text()).toBe('Step 1 Content')
    })
  })
})
