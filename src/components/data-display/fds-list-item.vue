<template>
  <li :class="itemClasses" :role="role" v-bind="$attrs">
    <slot />
  </li>
</template>

<script setup lang="ts">
/**
 * List item component implementing DKFDS v11 list item specifications.
 * 
 * Individual list item element designed to work with FdsList parent component.
 * Provides semantic markup with flexible styling options for different states
 * and layout configurations. Supports accessibility roles and visual variants.
 * 
 * @component
 * @example Basic list items
 * ```vue
 * <FdsList>
 *   <FdsListItem>Standard list item</FdsListItem>
 *   <FdsListItem variant="active">Active item</FdsListItem>
 *   <FdsListItem variant="disabled">Disabled item</FdsListItem>
 * </FdsList>
 * ```
 * 
 * @example Current page navigation item
 * ```vue
 * <FdsList variant="nobullet">
 *   <FdsListItem>
 *     <a href="/home">Home</a>
 *   </FdsListItem>
 *   <FdsListItem variant="current">
 *     <span>Current Page</span>
 *   </FdsListItem>
 *   <FdsListItem>
 *     <a href="/contact">Contact</a>
 *   </FdsListItem>
 * </FdsList>
 * ```
 * 
 * @example Flex layout for complex content
 * ```vue
 * <FdsList variant="bordered">
 *   <FdsListItem :flex="true" :justify-between="true">
 *     <span>Item name</span>
 *     <FdsBadge variant="info">Status</FdsBadge>
 *   </FdsListItem>
 *   <FdsListItem :flex="true" :justify-between="true">
 *     <span>Another item</span>
 *     <FdsButton size="small">Action</FdsButton>
 *   </FdsListItem>
 * </FdsList>
 * ```
 * 
 * @example Accessibility role for custom layouts
 * ```vue
 * <FdsList variant="unstyled">
 *   <FdsListItem role="none">
 *     <div class="custom-card">Custom content without list semantics</div>
 *   </FdsListItem>
 * </FdsList>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/lister/} DKFDS List Documentation
 */
import { computed } from 'vue'

export interface FdsListItemProps {
  /**
   * Visual variant indicating the item's state or importance
   * - 'current': Indicates the current page/section in navigation
   * - 'active': Highlights an active/selected item
   * - 'disabled': Shows an inactive/unavailable item
   * @values 'current', 'active', 'disabled'
   */
  variant?: 'current' | 'active' | 'disabled'
  /**
   * ARIA role for accessibility customization
   * Use 'none' to remove list semantics for custom layout structures
   * @values 'none'
   */
  role?: 'none'
  /**
   * Apply flexbox layout to the list item
   * Enables flexible content arrangement within the item
   * @default false
   */
  flex?: boolean
  /**
   * Apply justify-content-between for flex items
   * Distributes content to opposite ends of the item
   * Only effective when flex is true
   * @default false
   */
  justifyBetween?: boolean
}

const { variant, role, flex = false, justifyBetween = false } = defineProps<FdsListItemProps>()

const itemClasses = computed(() => {
  const classes: string[] = []

  // Status classes
  if (variant) {
    classes.push(variant)
  }

  // Flex layout classes
  if (flex) {
    classes.push('d-flex')
  }
  if (justifyBetween) {
    classes.push('justify-content-between')
  }

  return classes.length > 0 ? classes.join(' ') : undefined
})
</script>
