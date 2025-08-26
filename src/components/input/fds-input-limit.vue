<template>
  <div>
    <!-- Screen reader only initial message -->
    <span :id="`${computedId}-initial`" class="sr-only">
      {{ initialMessage }}
    </span>

    <!-- Visual and screen reader dynamic messages -->
    <span
      v-if="displayMessage"
      :id="computedId"
      :class="messageClass"
      :aria-live="isExceeded ? 'assertive' : 'polite'"
    >
      {{ displayMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref } from 'vue'

/**
 * Character limit component for form inputs
 * Based on DKFDS v11 character limit functionality
 * https://designsystem.dk/komponenter/inputfelter/#karakterbegraensning
 */

export interface FdsInputLimitProps {
  /** Current input value to count */
  modelValue?: string | null
  /** Maximum number of characters allowed */
  limit: number
  /** Custom ID for the limit message element */
  id?: string
  /** Warning threshold (percentage of limit) */
  warningThreshold?: number
  /** Custom messages */
  messages?: {
    initial?: string
    remaining?: string
    warning?: string
    exceeded?: string
  }
}

const props = withDefaults(defineProps<FdsInputLimitProps>(), {
  modelValue: null,
  id: undefined,
  warningThreshold: 0.8,
  messages: () => ({
    initial: 'Du kan indtaste op til {limit} tegn',
    remaining: 'Du har {remaining} tegn tilbage',
    warning: 'Du har {remaining} tegn tilbage',
    exceeded: 'Du har {exceeded} tegn for meget',
  }),
})

// Inject hintId from formgroup if available
const injectedHintId = inject<string | Ref<string> | undefined>('hintId', undefined)

// Compute the ID to use for this component
const computedId = computed((): string => {
  if (props.id) return props.id
  if (injectedHintId) {
    const baseId = isRef(injectedHintId) ? injectedHintId.value : injectedHintId
    return `${baseId}-limit`
  }
  return 'character-limit'
})

// Calculate current character count
const currentLength = computed((): number => {
  return props.modelValue?.length ?? 0
})

// Calculate remaining characters
const remainingChars = computed((): number => {
  return props.limit - currentLength.value
})

// Check if limit is exceeded
const isExceeded = computed((): boolean => {
  return currentLength.value > props.limit
})

// Check if approaching limit (warning state)
const isWarning = computed((): boolean => {
  const threshold = Math.floor(props.limit * props.warningThreshold)
  return currentLength.value >= threshold && !isExceeded.value
})

// Determine which message to show
const displayMessage = computed((): string | null => {
  const msgs = props.messages

  if (isExceeded.value) {
    const exceeded = currentLength.value - props.limit
    return (
      msgs.exceeded?.replace('{exceeded}', exceeded.toString()) ??
      `Du har ${exceeded} tegn for meget`
    )
  }

  if (currentLength.value > 0) {
    const remaining = remainingChars.value
    const template = isWarning.value ? msgs.warning : msgs.remaining
    return (
      template?.replace('{remaining}', remaining.toString()) ?? `Du har ${remaining} tegn tilbage`
    )
  }

  return null // Don't show message when empty
})

// Initial message for screen readers
const initialMessage = computed((): string => {
  return (
    props.messages.initial?.replace('{limit}', props.limit.toString()) ??
    `Du kan indtaste op til ${props.limit} tegn`
  )
})

// CSS classes for the message
const messageClass = computed((): string => {
  const classes = ['form-hint', 'character-limit']

  if (isExceeded.value) {
    classes.push('limit-exceeded')
  } else if (isWarning.value) {
    classes.push('limit-warning')
  }

  return classes.join(' ')
})
</script>

<style scoped lang="scss">
.character-limit {
  display: block;

  &.limit-exceeded {
    color: var(--color-error, #c00);
  }

  &.limit-warning {
    color: var(--color-warning, #ffb700);
  }
}
</style>
