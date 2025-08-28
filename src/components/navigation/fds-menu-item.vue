<template>
  <li :class="liClass">
    <a
      :href="href || '#'"
      class="nav-link"
      :class="{ current: isCurrent }"
      :aria-current="isCurrent ? 'page' : undefined"
      @click="navigate($event)"
    >
      <div v-if="hint">
        <span>
          <template v-if="index !== null">{{ `${index}. ` }}</template>
          <slot />
        </span>
        <span class="sidenav-information">
          {{ hint }}
        </span>
      </div>
      <span v-else>
        <template v-if="index !== null">{{ `${index}. ` }}</template>
        <slot />
      </span>
    </a>
    <slot v-if="$slots.submenu" name="submenu" />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Menu item component implementing DKFDS v11 navigation menu item specifications.
 *
 * Individual menu item for use within fds-menu component. Supports current page
 * indication, expanded states for submenus, numbered items, hint text, and
 * proper accessibility attributes. Handles both simple links and complex
 * menu structures with submenu support.
 *
 * @component
 * @example Basic menu item
 * ```vue
 * <fds-menu-item href="/dashboard" :current="$route.path === '/dashboard'">
 *   Dashboard
 * </fds-menu-item>
 * ```
 *
 * @example Menu item with hint text
 * ```vue
 * <fds-menu-item
 *   href="/reports"
 *   hint="View analytics and generate reports"
 *   :current="activeSection === 'reports'"
 * >
 *   Reports
 * </fds-menu-item>
 * ```
 *
 * @example Numbered menu item
 * ```vue
 * <fds-menu-item
 *   :index="1"
 *   href="/step1"
 *   :current="currentStep === 1"
 * >
 *   Personal Information
 * </fds-menu-item>
 * ```
 *
 * @example Menu item with submenu
 * ```vue
 * <fds-menu-item
 *   href="/settings"
 *   :expanded="showSettings"
 *   @click="toggleSettings"
 * >
 *   Settings
 *   <template #submenu>
 *     <fds-menu variant="submenu">
 *       <fds-menu-item href="/settings/profile">Profile</fds-menu-item>
 *       <fds-menu-item href="/settings/account">Account</fds-menu-item>
 *     </fds-menu>
 *   </template>
 * </fds-menu-item>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/navigation/} DKFDS Navigation Documentation
 */

export interface FdsMenuItemProps {
  /**
   * Unique identifier for the menu item
   * Used for navigation events and programmatic control.
   */
  id?: string
  /**
   * Whether the menu item is active
   * Controls expanded state styling when item has submenu, or current
   * page styling when item has no submenu.
   * @default false
   */
  active?: boolean
  /**
   * Link destination URL
   * Can be relative or absolute URL. Defaults to '#' which prevents navigation.
   */
  href?: string
  /**
   * Optional numeric index
   * When provided, displays number prefix (e.g., "1. Dashboard").
   * Useful for step-by-step processes or numbered navigation.
   */
  index?: number | null
  /**
   * Whether this represents the current page
   * Explicitly marks item as current page with appropriate styling and ARIA attributes.
   * @default false
   */
  current?: boolean
  /**
   * Whether submenu is expanded
   * Controls visibility and styling of submenu content.
   * @default false
   */
  expanded?: boolean
  /**
   * Optional hint/description text
   * Additional descriptive text displayed below the main menu item text.
   */
  hint?: string
}

const props = withDefaults(defineProps<FdsMenuItemProps>(), {
  active: false,
  current: false,
  expanded: false,
  index: null,
})

const emit = defineEmits<{
  /**
   * Emitted when menu item is navigated to
   * Provides the menu item ID for programmatic handling.
   *
   * @param id - The unique identifier of the menu item (if provided)
   */
  navigate: [id?: string]
  /**
   * Emitted when menu item is clicked
   * Fired for all click interactions, useful for analytics or custom handling.
   *
   * @param event - The original mouse click event
   */
  click: [event: MouseEvent]
}>()

const liClass = computed(() => {
  const classes: string[] = []
  // 'active' class indicates the parent menu item has an expanded submenu
  if (props.expanded || (props.active && slots.submenu)) {
    classes.push('active')
  }
  return classes.length > 0 ? classes.join(' ') : undefined
})

const isCurrent = computed(() => {
  // 'current' class on the link indicates the current page
  return props.current || (props.active && !slots.submenu)
})

const navigate = (event: MouseEvent) => {
  if (!props.href || props.href === '#') {
    event.preventDefault()
  }
  emit('click', event)
  if (props.id) {
    emit('navigate', props.id)
  }
}

const slots = defineSlots<{
  default: () => any
  submenu?: () => any
}>()
</script>

<style scoped lang="scss"></style>
