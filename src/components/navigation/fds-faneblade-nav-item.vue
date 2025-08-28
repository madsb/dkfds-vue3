<template>
  <li>
    <a
      :href="href"
      class="tab-button"
      :aria-current="active ? 'true' : undefined"
      @click="handleClick"
    >
      <fds-ikon v-if="icon" :icon="icon" :decorative="true" />
      <span>
        <slot>{{ label }}</slot>
      </span>
    </a>
  </li>
</template>

<script setup lang="ts">
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Tab navigation item component implementing DKFDS v11 navigation specifications.
 *
 * Individual navigation item for use within fds-faneblade-nav component.
 * Renders as an anchor link with proper accessibility attributes and visual
 * states. Supports icons, active state indication, and click handling for
 * single-page applications or analytics tracking.
 *
 * @component
 * @example Basic navigation item
 * ```vue
 * <fds-faneblade-nav-item
 *   href="/dashboard"
 *   label="Dashboard"
 *   :active="currentPage === 'dashboard'"
 * />
 * ```
 *
 * @example Navigation item with icon
 * ```vue
 * <fds-faneblade-nav-item
 *   href="/settings"
 *   label="Settings"
 *   icon="settings"
 *   :active="$route.path === '/settings'"
 *   @click="trackNavigation"
 * />
 * ```
 *
 * @example Custom content with slot
 * ```vue
 * <fds-faneblade-nav-item
 *   href="/notifications"
 *   :active="$route.name === 'notifications'"
 * >
 *   <fds-ikon icon="notifications" />
 *   Notifications
 *   <fds-badge v-if="unreadCount" :count="unreadCount" />
 * </fds-faneblade-nav-item>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/faneblade/} DKFDS Tab Documentation
 */

export interface FdsFanebladeNavItemProps {
  /**
   * Link destination
   * URL or path where the navigation item should link.
   * Can be relative or absolute URL.
   */
  href: string
  /**
   * Label text for the navigation item
   * Visible text content. Can be overridden by slot content.
   */
  label?: string
  /**
   * Whether this item is currently active
   * Controls visual active state and ARIA current attribute.
   * @default false
   */
  active?: boolean
  /**
   * Optional icon ID
   * DKFDS icon identifier to display before the label.
   */
  icon?: string
}

const _props = defineProps<FdsFanebladeNavItemProps>()

const emit = defineEmits<{
  /**
   * Emitted when the link is clicked
   * Useful for analytics tracking or SPA navigation handling.
   *
   * @param event - The original mouse click event
   */
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped lang="scss"></style>
