<template>
  <ul v-if="!ordered" :class="listClasses" v-bind="$attrs">
    <slot />
  </ul>
  <ol v-else :class="listClasses" v-bind="$attrs">
    <slot />
  </ol>
</template>

<script setup lang="ts">
/**
 * List component implementing DKFDS v11 list specifications.
 * 
 * Flexible list container supporting both ordered and unordered lists with multiple 
 * visual variants for different design contexts. Provides semantic HTML structure
 * with accessible styling options for content organization and display.
 * 
 * @component
 * @example Basic unordered list
 * ```vue
 * <FdsList>
 *   <FdsListItem>First item</FdsListItem>
 *   <FdsListItem>Second item</FdsListItem>
 *   <FdsListItem>Third item</FdsListItem>
 * </FdsList>
 * ```
 * 
 * @example Ordered list with numbering
 * ```vue
 * <FdsList :ordered="true">
 *   <FdsListItem>Step one</FdsListItem>
 *   <FdsListItem>Step two</FdsListItem>
 *   <FdsListItem>Step three</FdsListItem>
 * </FdsList>
 * ```
 * 
 * @example Bordered list for structured content
 * ```vue
 * <FdsList variant="bordered">
 *   <FdsListItem>Item with border</FdsListItem>
 *   <FdsListItem>Another bordered item</FdsListItem>
 *   <FdsListItem>Final bordered item</FdsListItem>
 * </FdsList>
 * ```
 * 
 * @example Unstyled list for custom designs
 * ```vue
 * <FdsList variant="unstyled" :no-top-margin="true">
 *   <FdsListItem>Custom styled item</FdsListItem>
 *   <FdsListItem>Another custom item</FdsListItem>
 * </FdsList>
 * ```
 * 
 * @example No-bullet list for clean layouts
 * ```vue
 * <FdsList variant="nobullet">
 *   <FdsListItem>Item without bullet</FdsListItem>
 *   <FdsListItem>Clean list item</FdsListItem>
 * </FdsList>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/lister/} DKFDS List Documentation
 */
import { computed } from 'vue'

export interface FdsListProps {
  /**
   * Visual variant controlling list appearance and behavior
   * - 'bordered': Adds borders between list items for structured content
   * - 'unstyled': Removes default list styling for custom designs
   * - 'nobullet': Removes bullets/numbers while maintaining list semantics
   * - 'overflow': Optimized for dropdown and overflow menu contexts
   * @values 'bordered', 'unstyled', 'nobullet', 'overflow', null
   * @default null
   */
  variant?: 'bordered' | 'unstyled' | 'nobullet' | 'overflow' | null
  /**
   * Whether to render as ordered list (ol) with numbering or unordered list (ul)
   * Use ordered lists for sequential content, unordered for general items
   * @default false
   */
  ordered?: boolean
  /**
   * Remove top margin for tight layouts or custom spacing control
   * Useful when list is first element in container
   * @default false
   */
  noTopMargin?: boolean
  /**
   * Remove bottom margin for tight layouts or custom spacing control
   * Useful when list is last element in container
   * @default false
   */
  noBottomMargin?: boolean
}

const props = withDefaults(defineProps<FdsListProps>(), {
  variant: null,
  ordered: false,
  noTopMargin: false,
  noBottomMargin: false,
})

const listClasses = computed(() => {
  const classes: string[] = []

  // Variant classes
  if (props.variant) {
    classes.push(`${props.variant}-list`)
  }

  // Margin utilities
  if (props.noTopMargin) {
    classes.push('mt-0')
  }
  if (props.noBottomMargin) {
    classes.push('mb-0')
  }

  return classes.join(' ')
})
</script>
