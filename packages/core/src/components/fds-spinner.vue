<template>
  <div class="spinner-wrapper" :class="wrapperClasses">
    <div 
      class="spinner" 
      :class="spinnerClasses"
      v-bind="attrs"
      :aria-hidden="hasStatusText ? 'true' : undefined"
    ></div>
    <span 
      v-if="srOnlyText && !hasStatusText" 
      class="sr-only"
    >
      {{ srOnlyText }}
    </span>
    <div 
      v-if="hasStatusText" 
      class="spinner-status" 
      role="status"
      :aria-live="ariaLive"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, computed, useSlots } from 'vue'

export interface FdsSpinnerProps {
  /**
   * Size variant of the spinner
   * @default 'large'
   */
  size?: 'small' | 'large'
  
  /**
   * Color variant for different backgrounds
   * @default 'default'
   */
  variant?: 'default' | 'light'
  
  /**
   * Screen reader only text for accessibility
   */
  srOnlyText?: string
  
  /**
   * Whether to center the spinner in its container
   * @default false
   */
  centered?: boolean
  
  /**
   * ARIA live region setting for status text
   * @default 'polite'
   */
  ariaLive?: 'polite' | 'assertive' | 'off'
}

const props = withDefaults(defineProps<FdsSpinnerProps>(), {
  size: 'large',
  variant: 'default',
  centered: false,
  ariaLive: 'polite'
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