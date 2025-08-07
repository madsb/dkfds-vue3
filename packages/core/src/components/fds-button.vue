<template>
  <button 
    class="button" 
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <svg 
      v-if="icon && !iconRight" 
      class="icon-svg" 
      focusable="false" 
      aria-hidden="true"
    >
      <use :href="`#${icon}`" />
    </svg>
    <slot />
    <svg 
      v-if="icon && iconRight" 
      class="icon-svg" 
      focusable="false" 
      aria-hidden="true"
    >
      <use :href="`#${icon}`" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Button component implementing DKFDS v11 specifications
 * 
 * @see https://designsystem.dk/komponenter/knapper/
 */

export interface FdsButtonProps {
  /** Button variant - primary, secondary, tertiary, warning, or custom string */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | string
  /** Icon name to display (requires DKFDS icon system) */
  icon?: string
  /** Position icon on the right side */
  iconRight?: boolean
  /** Make button full width on mobile (xs-full-width) */
  fullWidthMobile?: boolean
  /** Style as icon-only button */
  iconOnly?: boolean
}

const props = withDefaults(defineProps<FdsButtonProps>(), {
  variant: 'primary',
  icon: undefined,
  iconRight: false,
  fullWidthMobile: false,
  iconOnly: false,
})

// Compute classes based on DKFDS v11 specifications
const buttonClasses = computed(() => {
  const classes: string[] = []
  
  // Add variant class (ensure it's a valid DKFDS variant)
  const validVariants = ['primary', 'secondary', 'tertiary', 'warning']
  const variantClass = validVariants.includes(props.variant) 
    ? `button-${props.variant}` 
    : `button-${props.variant}` // Allow custom variants
  
  classes.push(variantClass)
  
  // Add utility classes
  if (props.fullWidthMobile) {
    classes.push('xs-full-width')
  }
  
  if (props.iconOnly) {
    classes.push('button-icon-only')
  }
  
  return classes
})
</script>

<style scoped lang="scss">
/* DKFDS styles are applied through the design system CSS */
</style>
