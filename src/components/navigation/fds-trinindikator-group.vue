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
 * Step indicator component following DKFDS v11 specifications
 *
 * @component FdsTrinindikatorGroup
 * @example
 * <fds-trinindikator-group
 *   :current-step="2"
 *   :total-steps="4"
 *   aria-label="Application progress"
 * >
 *   <fds-trinindikator-step
 *     v-for="step in steps"
 *     :key="step.id"
 *     :step="step"
 *     :is-current="step.id === currentStep"
 *   />
 * </fds-trinindikator-group>
 */

export interface FdsTrinindikatorGroupProps {
  /** Unique identifier */
  id?: string
  /** Current active step (1-based) */
  currentStep?: number
  /** Total number of steps */
  totalSteps?: number
  /** ARIA label for navigation */
  ariaLabel?: string
  /** Show mobile responsive behavior */
  responsive?: boolean
  /** Mobile breakpoint in pixels */
  mobileBreakpoint?: number
  /** Show extra step information */
  showStepInfo?: boolean
  /** Enable clickable steps */
  clickableSteps?: boolean
  /** Modal title for mobile view */
  modalTitle?: string
  /** ARIA label for mobile modal */
  modalAriaLabel?: string
  /** Close button text */
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
  /** Emitted when a step is clicked (if clickable) */
  'step-click': [stepNumber: number]
  /** Emitted when mobile modal opens */
  'modal-open': []
  /** Emitted when mobile modal closes */
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
