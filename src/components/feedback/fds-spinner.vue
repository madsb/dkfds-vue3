<template>
  <div class="spinner-wrapper" :class="wrapperClasses">
    <div
      class="spinner"
      :class="spinnerClasses"
      v-bind="attrs"
      :aria-hidden="hasStatusText ? 'true' : undefined"
    ></div>
    <span v-if="srOnlyText && !hasStatusText" class="sr-only">
      {{ srOnlyText }}
    </span>
    <div v-if="hasStatusText" class="spinner-status" role="status" :aria-live="ariaLive">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Loading spinner component implementing DKFDS v11 loading indicator specifications.
 *
 * Provides visual feedback for loading states with accessibility support and multiple size variants.
 * Includes proper ARIA live regions for screen readers and supports both standalone spinners
 * and spinners with accompanying status text. Designed for various contexts from buttons to full-page loading.
 *
 * @component
 * @example Basic spinner
 * ```vue
 * <FdsSpinner sr-only-text="Loading content..." />
 * ```
 *
 * @example Small spinner with status text
 * ```vue
 * <FdsSpinner size="small" aria-live="polite">
 *   Saving your changes...
 * </FdsSpinner>
 * ```
 *
 * @example Centered large spinner for full-page loading
 * ```vue
 * <FdsSpinner
 *   size="large"
 *   :centered="true"
 *   aria-live="assertive"
 * >
 *   Loading application data, please wait...
 * </FdsSpinner>
 * ```
 *
 * @example Light variant for dark backgrounds
 * ```vue
 * <FdsSpinner
 *   variant="light"
 *   sr-only-text="Processing request..."
 * />
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/loading/} DKFDS Loading Documentation
 */
import { useAttrs, computed, useSlots } from 'vue'

export interface FdsSpinnerProps {
  /**
   * Size variant of the spinner affecting visual dimensions
   * Small spinners work well inline or in buttons, large for prominent loading states
   * @values 'small', 'large'
   * @default 'large'
   */
  size?: 'small' | 'large'

  /**
   * Color variant optimized for different background contexts
   * Use 'light' variant on dark backgrounds for better visibility
   * @values 'default', 'light'
   * @default 'default'
   */
  variant?: 'default' | 'light'

  /**
   * Screen reader only text for accessibility when no visible status text is provided
   * Essential for users with screen readers to understand loading context
   * Only used when no slot content is present
   */
  srOnlyText?: string

  /**
   * Whether to center the spinner horizontally in its container
   * Useful for full-width loading states or modal dialogs
   * @default false
   */
  centered?: boolean

  /**
   * ARIA live region politeness setting for status text announcements
   * 'assertive' interrupts screen reader, 'polite' waits for pause
   * @values 'polite', 'assertive', 'off'
   * @default 'polite'
   */
  ariaLive?: 'polite' | 'assertive' | 'off'
}

const props = withDefaults(defineProps<FdsSpinnerProps>(), {
  size: 'large',
  variant: 'default',
  centered: false,
  ariaLive: 'polite',
})

const attrs = useAttrs()
const slots = useSlots()

const hasStatusText = computed(() => !!slots.default)

const spinnerClasses = computed(() => {
  const classes: string[] = []

  if (props.size === 'small') {
    classes.push('spinner-small')
  }

  if (props.variant === 'light') {
    classes.push('spinner-light')
  }

  return classes
})

const wrapperClasses = computed(() => {
  const classes: string[] = []

  if (props.centered) {
    classes.push('d-flex', 'justify-content-center')
  }

  return classes
})
</script>

<style scoped lang="scss">
.spinner-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &.d-flex {
    display: flex;
  }
}

.spinner-status {
  margin-left: 0.5rem;
}
</style>
