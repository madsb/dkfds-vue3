<template>
  <li :class="stepClasses">
    <component
      :is="isClickable ? 'a' : 'div'"
      :href="isClickable ? 'javascript:void(0);' : undefined"
      class="step"
      :aria-current="isCurrent ? 'step' : undefined"
      :aria-label="stepAriaLabel"
      @click="handleClick"
    >
      <!-- Icon or Number -->
      <span v-if="hasError" class="step-icon">
        <svg class="icon-svg" :aria-label="errorIconLabel" focusable="false">
          <use href="#report-problem"></use>
        </svg>
      </span>
      <span v-else-if="isCompleted && !isCurrent" class="step-icon">
        <svg class="icon-svg" :aria-label="completedIconLabel" focusable="false">
          <use href="#check"></use>
        </svg>
      </span>
      <span v-else class="step-number">
        <span>{{ stepNumber }}</span>
      </span>

      <!-- Title and Information -->
      <div>
        <span class="step-title">{{ title }}</span>
        <span v-if="stepInfo" class="step-information">{{ stepInfo }}</span>
      </div>
    </component>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Individual step component implementing DKFDS v11 step indicator specifications.
 * 
 * Renders a single step within a step indicator group with support for different
 * states (current, completed, error), visual icons, and interactive behavior.
 * Automatically handles ARIA labeling, keyboard navigation, and accessibility
 * features. Must be used within fds-trinindikator-group component.
 * 
 * @component
 * @example Basic step
 * ```vue
 * <fds-trinindikator-step
 *   :step-number="1"
 *   title="Personlige oplysninger"
 *   :is-current="currentStep === 1"
 *   :is-completed="currentStep > 1"
 * />
 * ```
 * 
 * @example Interactive step with additional info
 * ```vue
 * <fds-trinindikator-step
 *   :step-number="2"
 *   title="Dokument upload"
 *   step-info="Upload påkrævede dokumenter"
 *   :is-current="currentStep === 2"
 *   :is-completed="currentStep > 2"
 *   :clickable="true"
 *   @click="navigateToStep"
 * />
 * ```
 * 
 * @example Error state step
 * ```vue
 * <fds-trinindikator-step
 *   :step-number="3"
 *   title="Validering"
 *   :has-error="validationFailed"
 *   :is-current="currentStep === 3"
 *   :clickable="!validationFailed"
 *   :disabled="validationFailed"
 *   error-icon-label="Valideringsfejl"
 * />
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/trinindikatorer/} DKFDS Step Indicator Documentation
 */

export interface FdsTrinindikatorStepProps {
  /** 
   * Step number (1-based)
   * The numeric position of this step in the process sequence.
   */
  stepNumber: number
  /** 
   * Step title
   * The main title/name of this step displayed to users.
   */
  title: string
  /** 
   * Additional step information
   * Optional descriptive text providing more details about the step.
   */
  stepInfo?: string
  /** 
   * Whether this is the current step
   * Applies current step styling and ARIA attributes.
   * @default false
   */
  isCurrent?: boolean
  /** 
   * Whether this step is completed
   * Shows checkmark icon and completed styling (ignored if isCurrent is true).
   * @default false
   */
  isCompleted?: boolean
  /** 
   * Whether the step has an error
   * Shows error icon and error styling. Takes precedence over completed state.
   * @default false
   */
  hasError?: boolean
  /** 
   * Whether the step is disabled
   * Prevents interaction and applies disabled styling.
   * @default false
   */
  disabled?: boolean
  /** 
   * Whether the step is clickable
   * Enables click interaction (disabled steps cannot be clicked regardless).
   * @default false
   */
  clickable?: boolean
  /** 
   * ARIA label for error icon
   * Screen reader text for the error state icon.
   * @default 'Fejl'
   */
  errorIconLabel?: string
  /** 
   * ARIA label for completed icon
   * Screen reader text for the completed state checkmark icon.
   * @default 'Færdig'
   */
  completedIconLabel?: string
  /** 
   * Custom ARIA label for the step
   * Override the auto-generated accessibility label for the entire step.
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<FdsTrinindikatorStepProps>(), {
  stepInfo: '',
  isCurrent: false,
  isCompleted: false,
  hasError: false,
  disabled: false,
  clickable: false,
  errorIconLabel: 'Fejl',
  completedIconLabel: 'Færdig',
  ariaLabel: '',
})

const emit = defineEmits<{
  /**
   * Emitted when step is clicked
   * Only fired if step is clickable and not disabled. Allows parent component
   * to handle navigation or validation before step changes.
   * 
   * @param stepNumber - The number of the clicked step (1-based)
   * @param event - The original mouse click event
   */
  click: [stepNumber: number, event: MouseEvent]
}>()

const isClickable = computed(() => props.clickable && !props.disabled)

const stepClasses = computed(() => ({
  current: props.isCurrent,
  completed: props.isCompleted && !props.isCurrent,
  error: props.hasError,
  disabled: props.disabled,
}))

const stepAriaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel
  }

  let label = `Trin ${props.stepNumber}: ${props.title}`

  if (props.isCurrent) {
    label += ' (nuværende trin)'
  } else if (props.isCompleted) {
    label += ' (færdigt)'
  } else if (props.hasError) {
    label += ' (fejl)'
  }

  if (props.disabled) {
    label += ' (deaktiveret)'
  }

  return label
})

const handleClick = (event: MouseEvent) => {
  if (isClickable.value) {
    event.preventDefault()
    if (!props.disabled) {
      emit('click', props.stepNumber, event)
    }
  }
}
</script>

<style scoped lang="scss">
// DKFDS v11 compliant styles
// The step indicator component relies on DKFDS core styles
// These are minimal overrides to ensure proper rendering

// Additional styling for step information
.step-information {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: var(--fds-gray-100, #f8f9fa);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--fds-gray-700, #495057);
}

// Ensure proper cursor for disabled state
li.disabled .step {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
