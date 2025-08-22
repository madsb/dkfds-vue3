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

        <!-- Render link for navigable items using router-link if available -->
        <component
          :is="getLinkComponent(item)"
          v-if="item.href && !isCurrentPage(index)"
          class="breadcrumbs__link"
          :href="getLinkComponent(item) === 'a' ? item.href : undefined"
          :to="getLinkComponent(item) !== 'a' && !item.external ? item.to || item.href : undefined"
          @click="handleItemClick($event, item, index)"
        >
          {{ item.text }}
        </component>

        <!-- Render text for current page -->
        <span v-else>
          {{ item.text }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Component } from 'vue'
// Vue imports needed for component
import FdsIkon from '../layout/fds-ikon.vue'

export interface BreadcrumbItem {
  /** Text to display for the breadcrumb item */
  text: string
  /** URL for the breadcrumb link (optional for current page) */
  href?: string
  /** Router location object for Vue Router navigation */
  to?: string | Record<string, any>
  /** Whether this is an external link (forces standard anchor tag) */
  external?: boolean
  /** Custom data associated with the item */
  data?: any
}

interface Props {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[]
  /** Aria label for the navigation element */
  ariaLabel?: string
  /** Whether to add container class for layout */
  container?: boolean
  /** Force use of standard anchor tags even if Vue Router is available */
  useNativeLinks?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Brødkrumme',
  container: false,
  useNativeLinks: false,
})

const emit = defineEmits<{
  /** Emitted when a breadcrumb item is clicked */
  'item-click': [event: MouseEvent, item: BreadcrumbItem, index: number]
}>()

// Check if Vue Router is available
const $router = inject<any>('$router', null)
const $route = inject<any>('$route', null)

// Determine if we have Vue Router available and should use it
const hasRouter = computed(() => {
  return !props.useNativeLinks && $router !== null && $route !== null
})

// Get the appropriate link component (router-link or 'a' tag)
const getLinkComponent = (item: BreadcrumbItem): Component | string => {
  // Use standard anchor for external links or when router is not available
  if (item.external || !hasRouter.value) {
    return 'a'
  }

  // Try to get RouterLink component from Vue Router
  try {
    // Vue Router 4 (Vue 3)
    const RouterLink = $router?.options?.linkComponent || $router?.constructor?.RouterLink
    if (RouterLink) {
      return RouterLink as Component
    }
  } catch {
    // Fallback if we can't access RouterLink
  }

  // Fallback to anchor tag
  return 'a'
}

/**
 * Check if the item at the given index is the current page
 * Current page is the last item in the array
 */
const isCurrentPage = (index: number): boolean => {
  return index === props.items.length - 1
}

/**
 * Handle click on breadcrumb item
 */
const handleItemClick = (event: MouseEvent, item: BreadcrumbItem, index: number) => {
  emit('item-click', event, item, index)
}
</script>
