<template>
  <component :is="tag" class="badge" :class="getVariantClass">
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * Badge component implementing DKFDS v11 badge specifications.
 *
 * Small labels used to highlight new, important, or status-related content. Designed for
 * supplementary information that needs visual emphasis without being the primary focus.
 * Supports semantic variants and proper HTML element selection for accessibility.
 *
 * @component
 * @example Basic badge
 * ```vue
 * <FdsBadge>New</FdsBadge>
 * ```
 *
 * @example Status badges with variants
 * ```vue
 * <FdsBadge variant="success">Approved</FdsBadge>
 * <FdsBadge variant="warning">Pending</FdsBadge>
 * <FdsBadge variant="error">Rejected</FdsBadge>
 * <FdsBadge variant="info">Under Review</FdsBadge>
 * ```
 *
 * @example Emphasized badge for important content
 * ```vue
 * <FdsBadge tag="strong" variant="warning">
 *   Important Notice
 * </FdsBadge>
 * ```
 *
 * @example Badges in content context
 * ```vue
 * <div class="article">
 *   <h3>
 *     Article Title
 *     <FdsBadge variant="info">New</FdsBadge>
 *   </h3>
 *   <p>Article content with status: <FdsBadge variant="success">Published</FdsBadge></p>
 * </div>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/badges/} DKFDS Badge Documentation
 */
import { computed } from 'vue'

export interface FdsBadgeProps {
  /**
   * HTML element type to render for semantic meaning
   * Use 'strong' for important/emphasized badges, 'span' for regular labels
   * @values 'span', 'strong'
   * @default 'span'
   */
  tag?: 'span' | 'strong'
  /**
   * Visual variant indicating semantic status or importance level
   * Controls background color and styling for contextual meaning
   * @values 'success', 'info', 'warning', 'error', null
   * @default null
   */
  variant?: 'success' | 'info' | 'warning' | 'error' | null
}

const {
  /** HTML tag to use - 'strong' for emphasis, 'span' for regular badges */
  tag = 'span',
  /** Visual variant for different statuses */
  variant = null,
} = defineProps<FdsBadgeProps>()

const getVariantClass = computed(() => (variant ? `badge-${variant}` : ''))
</script>

<style scoped lang="scss"></style>
