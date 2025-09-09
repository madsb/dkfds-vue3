<template>
  <button class="button" :class="buttonClasses" v-bind="$attrs">
    <slot name="prefix-icon">
      <fds-ikon v-if="icon && !iconRight" :icon="icon" :decorative="true" />
    </slot>
    <slot />
    <slot name="suffix-icon">
      <fds-ikon v-if="icon && iconRight" :icon="icon" :decorative="true" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Button component implementing DKFDS v11 specifications.
 *
 * Provides primary action buttons with support for various styles, icons, and responsive behavior.
 * Follows WCAG accessibility guidelines and DKFDS design patterns.
 *
 * @component
 * @example Basic usage
 * ```vue
 * <FdsButton variant="primary" @click="handleClick">
 *   Click me
 * </FdsButton>
 * ```
 *
 * @example With icon
 * ```vue
 * <FdsButton variant="secondary" icon="save" icon-right>
 *   Save changes
 * </FdsButton>
 * ```
 *
 * @example Icon-only button
 * ```vue
 * <FdsButton variant="tertiary" icon="download" icon-only aria-label="Download file" />
 * ```
 *
 * @example Full width on mobile
 * ```vue
 * <FdsButton variant="primary" full-width-mobile>
 *   Submit form
 * </FdsButton>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/knapper/} DKFDS Button Documentation
 */

export interface FdsButtonProps {
  /**
   * Button variant determining visual style
   * @values 'primary', 'secondary', 'tertiary', 'warning'
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | string

  /**
   * Icon name from DKFDS icon set to display in button
   * @example 'save', 'download', 'arrow-forward'
   */
  icon?: string

  /**
   * Position icon on the right side of text
   * @default false
   */
  iconRight?: boolean

  /**
   * Make button full width on mobile devices (xs-full-width class)
   * @default false
   */
  fullWidthMobile?: boolean

  /**
   * Style as icon-only button (hides text, requires aria-label)
   * @default false
   */
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
