<template>
  <div>
    <!-- Desktop view -->
    <nav :aria-label="ariaLabel" class="d-none d-md-block">
      <ol class="step-indicator" :class="stepIndicatorClasses">
        <slot :current-step="currentStep" :mobile="false" />
      </ol>
    </nav>

    <!-- Mobile view: Button to show step modal -->
    <button
      type="button"
      class="step-indicator-button d-md-none"
      aria-haspopup="dialog"
      @click="openMobileModal"
    >
      <span
        >Trin <strong>{{ currentStep }}</strong> af {{ totalSteps }}</span
      >
    </button>

    <!-- Mobile modal using fds-modal component -->
    <fds-modal
      :id="`modal-${formid}`"
      ref="mobileModal"
      :header="modalTitle"
      :closeable="true"
      @close="closeMobileModal"
    >
      <template #header>
        <h2 class="modal-title">{{ modalTitle }}</h2>
        <button class="modal-close function-link" @click="closeMobileModal">
          <svg class="icon-svg" aria-hidden="true" focusable="false">
            <use href="#close"></use>
          </svg>
          {{ closeButtonText }}
        </button>
      </template>

      <ol class="step-indicator">
        <slot :current-step="currentStep" :mobile="true" />
      </ol>

      <template #footer>
        <!-- No footer for step indicator modal -->
      </template>
    </fds-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { formId } from '../../composables'
import FdsModal from '../feedback/fds-modal.vue'

/**
 * Step indicator group component implementing DKFDS v11 specifications.
 * 
 * Provides responsive step navigation with desktop and mobile views. Desktop shows
 * full step indicator with all steps visible. Mobile shows a compact button that
 * opens a modal with the full step list. Supports clickable steps, error states,
 * and progress tracking with accessibility features.
 * 
 * @component
 * @example Basic step indicator
 * ```vue
 * <fds-trinindikator-group
 *   :current-step="2"
 *   :total-steps="4"
 *   aria-label="Application progress"
 * >
 *   <fds-trinindikator-step
 *     v-for="step in steps"
 *     :key="step.id"
 *     :step-number="step.number"
 *     :title="step.title"
 *     :is-current="step.number === currentStep"
 *     :is-completed="step.number < currentStep"
 *   />
 * </fds-trinindikator-group>
 * ```
 * 
 * @example Interactive steps with click handling
 * ```vue
 * <fds-trinindikator-group
 *   :current-step="currentStep"
 *   :total-steps="steps.length"
 *   :clickable-steps="true"
 *   @step-click="navigateToStep"
 *   @modal-open="trackModalOpen"
 * >
 *   <fds-trinindikator-step
 *     v-for="step in steps"
 *     :key="step.id"
 *     :step-number="step.number"
 *     :title="step.title"
 *     :step-info="step.description"
 *     :is-current="step.number === currentStep"
 *     :is-completed="step.number < currentStep"
 *     :has-error="step.hasValidationError"
 *     :clickable="step.number <= maxCompletedStep"
 *     @click="handleStepClick"
 *   />
 * </fds-trinindikator-group>
 * ```
 * 
 * @example Custom mobile configuration
 * ```vue
 * <fds-trinindikator-group
 *   :current-step="currentStep"
 *   :total-steps="steps.length"
 *   modal-title="Ansøgningsproces"
 *   close-button-text="Tilbage"
 *   :show-step-info="true"
 * >
 *   <!-- steps -->
 * </fds-trinindikator-group>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/trinindikatorer/} DKFDS Step Indicator Documentation
 */

export interface FdsTrinindikatorGroupProps {
  /** 
   * Unique identifier for the step indicator
   * Auto-generated if not provided. Used for modal and accessibility features.
   */
  id?: string
  /** 
   * Current active step (1-based)
   * Indicates which step is currently active in the process.
   * @default 1
   */
  currentStep?: number
  /** 
   * Total number of steps
   * Used for mobile display "Step X of Y". Should match number of child step components.
   * @default 0
   */
  totalSteps?: number
  /** 
   * ARIA label for navigation
   * Provides accessibility context for the step indicator navigation.
   * @default 'Trinindikator'
   */
  ariaLabel?: string
  /** 
   * Show mobile responsive behavior
   * Enables responsive design with button/modal pattern on mobile.
   * @default true
   */
  responsive?: boolean
  /** 
   * Mobile breakpoint in pixels
   * Screen width at which mobile behavior activates.
   * @default 768
   */
  mobileBreakpoint?: number
  /** 
   * Show extra step information
   * Enables display of additional step details in step components.
   * @default false
   */
  showStepInfo?: boolean
  /** 
   * Enable clickable steps
   * Allows users to click on steps for navigation (if step allows it).
   * @default false
   */
  clickableSteps?: boolean
  /** 
   * Modal title for mobile view
   * Title displayed in the mobile modal header.
   * @default 'Trin'
   */
  modalTitle?: string
  /** 
   * ARIA label for mobile modal
   * Accessibility label for the mobile modal dialog.
   * @default 'Trin modal'
   */
  modalAriaLabel?: string
  /** 
   * Close button text for mobile modal
   * Text displayed on the modal close button.
   * @default 'Luk'
   */
  closeButtonText?: string
}

const {
  id,
  currentStep = 1,
  totalSteps = 0,
  ariaLabel = 'Trinindikator',
  responsive: _responsive = true,
  mobileBreakpoint: _mobileBreakpoint = 768,
  showStepInfo = false,
  clickableSteps = false,
  modalTitle = 'Trin',
  modalAriaLabel: _modalAriaLabel = 'Trin modal',
  closeButtonText = 'Luk',
} = defineProps<FdsTrinindikatorGroupProps>()

const emit = defineEmits<{
  /**
   * Emitted when a step is clicked (if clickable)
   * Fired when clickableSteps is true and user clicks on a clickable step.
   * 
   * @param stepNumber - The number of the clicked step (1-based)
   */
  'step-click': [stepNumber: number]
  /**
   * Emitted when mobile modal opens
   * Triggered when user taps the mobile step indicator button.
   */
  'modal-open': []
  /**
   * Emitted when mobile modal closes
   * Triggered when user closes the mobile step indicator modal.
   */
  'modal-close': []
}>()

const { formid } = formId(id, true)
const mobileModal = ref<InstanceType<typeof FdsModal> | null>(null)

const stepIndicatorClasses = computed(() => ({
  'step-indicator--clickable': clickableSteps,
  'step-indicator--with-info': showStepInfo,
}))

const openMobileModal = () => {
  mobileModal.value?.showModal()
  emit('modal-open')
}

const closeMobileModal = () => {
  mobileModal.value?.hideModal()
  emit('modal-close')
}
</script>
