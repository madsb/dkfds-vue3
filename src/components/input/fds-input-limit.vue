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
 * Character limit indicator component implementing DKFDS v11 character constraint specifications.
 *
 * Provides real-time character count feedback with warning and error states.
 * Automatically integrates with form controls to display remaining characters,
 * warn when approaching limits, and indicate when limits are exceeded.
 * Supports customizable thresholds and messaging following DKFDS patterns.
 *
 * @component
 * @example Basic character limit
 * ```vue
 * <FdsTextarea v-model="description" maxlength="200" />
 * <FdsInputLimit v-model="description" :limit="200" />
 * ```
 *
 * @example With custom warning threshold
 * ```vue
 * <FdsInput v-model="title" />
 * <FdsInputLimit
 *   v-model="title"
 *   :limit="50"
 *   :warningThreshold="0.9"
 * />
 * ```
 *
 * @example In form group with custom messages
 * ```vue
 * <FdsFormgroup>
 *   <template #default="{ formid }">
 *     <FdsLabel>Comment</FdsLabel>
 *     <FdsTextarea v-model="comment" :id="formid" />
 *     <FdsInputLimit
 *       v-model="comment"
 *       :limit="300"
 *       :messages="{
 *         initial: 'Maximum {limit} characters allowed',
 *         remaining: '{remaining} characters remaining',
 *         exceeded: '{exceeded} characters over limit'
 *       }"
 *     />
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/inputfelter/#karakterbegraensning} DKFDS Character Limit Documentation
 */

export interface FdsInputLimitProps {
  /**
   * Current input value to count characters for.
   * Should be bound to the same v-model as the associated input/textarea.
   * @default null
   */
  modelValue?: string | null
  /**
   * Maximum number of characters allowed.
   * Used to calculate remaining characters and exceeded state.
   */
  limit: number
  /**
   * Custom ID for the limit message element.
   * If not provided, uses injected hintId from form group.
   * @default undefined (uses injected hintId + '-limit')
   */
  id?: string
  /**
   * Warning threshold as percentage of limit (0-1).
   * When reached, displays warning styling and message.
   * @default 0.8 (80% of limit)
   */
  warningThreshold?: number
  /**
   * Custom messages for different states.
   * Supports template variables {limit}, {remaining}, {exceeded}.
   * @default Danish language messages
   */
  messages?: {
    /** Initial message shown to screen readers */
    initial?: string
    /** Message when characters remain */
    remaining?: string
    /** Message when in warning state */
    warning?: string
    /** Message when limit exceeded */
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
