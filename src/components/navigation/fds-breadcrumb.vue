<template>
  <nav class="breadcrumbs" :class="{ container: container }" :aria-label="ariaLabel">
    <ol class="breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumbs__list-item"
        :aria-current="isCurrentPage(index) ? 'page' : undefined"
      >
        <!-- Show separator icon for all items except the first -->
        <fds-ikon v-if="index > 0" icon="chevron-right" :decorative="true" />

        <!-- Vue Router link when item has 'to' property and not forced native -->
        <router-link
          v-if="item.to && !item.external && !props.useNativeLinks && !isCurrentPage(index)"
          class="breadcrumbs__link"
          :to="item.to"
          @click="handleItemClick($event, item, index)"
        >
          {{ item.text }}
        </router-link>

        <!-- Regular anchor tag for all other navigable items -->
        <a
          v-else-if="(item.href || item.to) && !isCurrentPage(index)"
          class="breadcrumbs__link"
          :href="item.href || (typeof item.to === 'string' ? item.to : '#')"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          @click="handleItemClick($event, item, index)"
        >
          {{ item.text }}
        </a>

        <!-- Current page (no link) -->
        <span v-else>
          {{ item.text }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
// No Vue imports needed for this simple approach
// Vue imports needed for component
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Breadcrumb navigation component implementing DKFDS v11 specifications.
 *
 * Provides hierarchical navigation with support for Vue Router integration,
 * automatic current page detection, and accessibility features. Follows
 * DKFDS breadcrumb design patterns with separator icons and responsive behavior.
 *
 * @component
 * @example Basic usage with native links
 * ```vue
 * <fds-breadcrumb :items="breadcrumbItems" />
 * ```
 *
 * @example Vue Router integration
 * ```vue
 * <fds-breadcrumb
 *   :items="routerItems"
 *   aria-label="Navigationssti"
 *   :container="true"
 * />
 * ```
 *
 * @example Custom event handling
 * ```vue
 * <fds-breadcrumb
 *   :items="items"
 *   @item-click="handleBreadcrumbClick"
 * />
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/breadcrumb/} DKFDS Breadcrumb Documentation
 */

export interface BreadcrumbItem {
  /**
   * Text to display for the breadcrumb item
   * The visible text content that users will see in the breadcrumb path
   */
  text: string
  /**
   * URL for the breadcrumb link (optional for current page)
   * Standard HTTP/HTTPS URL. Not required for the current page (last item)
   */
  href?: string
  /**
   * Router location object for Vue Router navigation
   * Can be a string path or router location object with name, params, query, etc.
   * @example '/home' or { name: 'user', params: { id: '123' } }
   */
  to?: string | Record<string, any>
  /**
   * Whether this is an external link (forces standard anchor tag)
   * Set to true to force usage of <a> tag instead of <router-link>
   * @default false
   */
  external?: boolean
  /**
   * Custom data associated with the item
   * Additional metadata that can be accessed in click handlers
   */
  data?: any
}

export interface FdsBreadcrumbProps {
  /**
   * Array of breadcrumb items representing the navigation hierarchy
   * The last item is automatically treated as the current page and not linked
   */
  items: BreadcrumbItem[]
  /**
   * ARIA label for the navigation element
   * Provides accessibility context for screen readers
   * @default 'Brødkrumme'
   */
  ariaLabel?: string
  /**
   * Whether to add container class for layout
   * Applies standard DKFDS container styling for proper page layout
   * @default false
   */
  container?: boolean
  /**
   * Force use of standard anchor tags even if Vue Router is available
   * Disables automatic Vue Router integration for this component instance
   * @default false
   */
  useNativeLinks?: boolean
}

const props = withDefaults(defineProps<FdsBreadcrumbProps>(), {
  ariaLabel: 'Brødkrumme',
  container: false,
  useNativeLinks: false,
})

const emit = defineEmits<{
  /**
   * Emitted when a breadcrumb item is clicked
   * Fired before navigation occurs, allowing for custom handling or analytics tracking
   *
   * @param event - The original mouse click event
   * @param item - The breadcrumb item that was clicked
   * @param index - The index of the clicked item in the items array
   */
  'item-click': [event: MouseEvent, item: BreadcrumbItem, index: number]
}>()

// No need for complex router detection - let Vue handle router-link resolution

/**
 * Check if the item at the given index is the current page
 * Current page is the last item in the array
 */
const isCurrentPage = (index: number): boolean => {
  return index === props.items.length - 1
}

/**
 * Simple click handler that just emits the event
 * Router-link and anchor tags handle their own navigation
 */
const handleItemClick = (event: MouseEvent, item: BreadcrumbItem, index: number): void => {
  emit('item-click', event, item, index)
}
</script>
