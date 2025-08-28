<template>
  <a
    v-if="!disabled"
    :href="href"
    class="nav-link"
    :aria-current="current ? 'page' : undefined"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <span>
      <slot />
    </span>
    <fds-ikon v-if="icon" :icon="icon" class="sidenav-icon" :decorative="true" />
    <p v-if="hint" class="sidenav-information">
      {{ hint }}
    </p>
  </a>
  <span v-else class="nav-link nav-link-disabled" aria-disabled="true">
    <span>
      <slot />
    </span>
    <fds-ikon v-if="icon" :icon="icon" class="sidenav-icon" :decorative="true" />
    <p v-if="hint" class="sidenav-information">
      {{ hint }}
    </p>
  </span>
</template>

<script setup lang="ts">
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Navigation link component implementing DKFDS v11 navigation specifications.
 *
 * Flexible navigation link component suitable for sidebar navigation, menus,
 * and general navigation contexts. Supports current page indication, disabled
 * states, icons, and hint text. Automatically handles accessibility attributes
 * and keyboard navigation. Can be used standalone or within navigation components.
 *
 * @component
 * @example Basic navigation link
 * ```vue
 * <fds-nav-link href="/dashboard" :current="$route.path === '/dashboard'">
 *   Dashboard
 * </fds-nav-link>
 * ```
 *
 * @example Link with icon and hint
 * ```vue
 * <fds-nav-link
 *   href="/reports"
 *   icon="bar-chart"
 *   hint="View analytics and reports"
 *   :current="activeSection === 'reports'"
 * >
 *   Reports
 * </fds-nav-link>
 * ```
 *
 * @example Disabled link
 * ```vue
 * <fds-nav-link
 *   href="/admin"
 *   :disabled="!hasAdminAccess"
 *   icon="admin-panel-settings"
 *   @click="handleAccessDenied"
 * >
 *   Admin Panel
 * </fds-nav-link>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/navigation/} DKFDS Navigation Documentation
 */

export interface FdsNavLinkProps {
  /**
   * Link destination URL
   * Can be relative or absolute. Defaults to '#' which prevents navigation.
   * @default '#'
   */
  href?: string
  /**
   * Whether this is the current page/section
   * Applies current page styling and ARIA attributes for accessibility.
   * @default false
   */
  current?: boolean
  /**
   * Whether the link is disabled
   * Renders as span instead of anchor and prevents interaction.
   * @default false
   */
  disabled?: boolean
  /**
   * Optional icon identifier
   * DKFDS icon to display alongside the link text.
   */
  icon?: string
  /**
   * Optional hint/description text
   * Additional descriptive text displayed below the main link text.
   */
  hint?: string
}

const props = withDefaults(defineProps<FdsNavLinkProps>(), {
  href: '#',
  current: false,
  disabled: false,
})

const emit = defineEmits<{
  /**
   * Emitted when the link is clicked
   * Fired even when href is '#'. Useful for handling navigation in SPAs.
   *
   * @param event - The original mouse click event
   */
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.href === '#') {
    event.preventDefault()
  }
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped lang="scss"></style>
