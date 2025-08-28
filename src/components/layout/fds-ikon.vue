<template>
  <svg
    class="icon-svg"
    :class="{ 'inline-svg': inline }"
    focusable="false"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="ariaLabel"
    :role="role"
  >
    <use :href="`#${icon}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Icon component implementing DKFDS v11 icon specifications.
 *
 * Renders SVG icons from the DKFDS Material Design icon set with proper
 * accessibility attributes. Supports both decorative and meaningful icons,
 * inline sizing, and screen reader integration. Uses SVG symbol references
 * for optimal performance and consistency across the application.
 *
 * @component
 * @example Basic decorative icon
 * ```vue
 * <fds-ikon icon="home" />
 * ```
 *
 * @example Meaningful icon with ARIA label
 * ```vue
 * <fds-ikon
 *   icon="warning"
 *   :decorative="false"
 *   aria-label="Warning: This action cannot be undone"
 * />
 * ```
 *
 * @example Inline icon with text
 * ```vue
 * <p>
 *   <fds-ikon icon="check" :inline="true" />
 *   Task completed successfully
 * </p>
 * ```
 *
 * @example Icon in button context
 * ```vue
 * <fds-button>
 *   <fds-ikon icon="download" :decorative="true" />
 *   Download File
 * </fds-button>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/ikoner/} DKFDS Icon Documentation
 */

export interface FdsIkonProps {
  /**
   * Icon name from DKFDS Material Design icon set
   * Corresponds to the symbol ID in the icon collection.
   * @default 'home'
   */
  icon?: string
  /**
   * Adjust icon to text height (inline display)
   * When true, icon scales with surrounding text size.
   * @default false
   */
  inline?: boolean
  /**
   * ARIA label for screen readers
   * Required when decorative is false. Describes the icon's meaning.
   */
  ariaLabel?: string
  /**
   * Whether the icon is decorative
   * Decorative icons are hidden from screen readers (aria-hidden="true").
   * Set to false for icons that convey important information.
   * @default true
   */
  decorative?: boolean
}

const props = withDefaults(defineProps<FdsIkonProps>(), {
  icon: 'home',
  inline: false,
  decorative: true,
})

// Computed properties for accessibility
const role = computed(() => (!props.decorative && props.ariaLabel ? 'img' : undefined))
</script>
