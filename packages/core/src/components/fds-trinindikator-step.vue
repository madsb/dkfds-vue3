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
 * Individual step component for use within fds-trinindikator-group
 *
 * @component FdsTrinindikatorStep
 * @example
 * <fds-trinindikator-step
 *   :step-number="1"
 *   title="Personlige oplysninger"
 *   step-info="Indtast dine grundlæggende oplysninger"
 *   :is-current="currentStep === 1"
 *   :is-completed="currentStep > 1"
 *   :clickable="true"
 *   @click="goToStep(1)"
 * />
 */

export interface Props {
  /** Step number (1-based) */
  stepNumber: number
  /** Step title */
  title: string
  /** Additional step information */
  stepInfo?: string
  /** Whether this is the current step */
  isCurrent?: boolean
  /** Whether this step is completed */
  isCompleted?: boolean
  /** Whether the step has an error */
  hasError?: boolean
  /** Whether the step is disabled */
  disabled?: boolean
  /** Whether the step is clickable */
  clickable?: boolean
  /** ARIA label for error icon */
  errorIconLabel?: string
  /** ARIA label for completed icon */
  completedIconLabel?: string
  /** Custom ARIA label for the step */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
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
  /** Emitted when step is clicked */
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
