<template>
  <nav v-if="variant === 'sidemenu'" :aria-label="ariaLabel">
    <ul :class="cssClass">
      <slot />
    </ul>
  </nav>
  <ul v-else :class="cssClass">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Menu container component implementing DKFDS v11 navigation menu specifications.
 *
 * Provides semantic structure for navigation menus with support for sidebar menus
 * and submenus. Automatically applies appropriate ARIA roles and CSS classes
 * based on the variant. Sidebar menus include proper navigation landmarks,
 * while submenus provide nested navigation structure.
 *
 * @component
 * @example Basic sidebar menu
 * ```vue
 * <fds-menu variant="sidemenu" aria-label="Main navigation">
 *   <fds-menu-item href="/dashboard" :current="true">
 *     Dashboard
 *   </fds-menu-item>
 *   <fds-menu-item href="/reports">
 *     Reports
 *   </fds-menu-item>
 * </fds-menu>
 * ```
 *
 * @example Submenu structure
 * ```vue
 * <fds-menu-item href="/settings" :expanded="showSubmenu">
 *   Settings
 *   <template #submenu>
 *     <fds-menu variant="submenu">
 *       <fds-menu-item href="/settings/profile">Profile</fds-menu-item>
 *       <fds-menu-item href="/settings/security">Security</fds-menu-item>
 *     </fds-menu>
 *   </template>
 * </fds-menu-item>
 * ```
 *
 * @example Numbered menu items
 * ```vue
 * <fds-menu aria-label="Process steps">
 *   <fds-menu-item :index="1" href="/step1" :current="currentStep === 1">
 *     Personal Information
 *   </fds-menu-item>
 *   <fds-menu-item :index="2" href="/step2" :current="currentStep === 2">
 *     Document Upload
 *   </fds-menu-item>
 * </fds-menu>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/navigation/} DKFDS Navigation Documentation
 */

export interface FdsMenuProps {
  /**
   * Menu variant type
   * Controls semantic structure and styling. Sidemenu creates nav element
   * with proper ARIA landmarks, submenu creates simple list structure.
   * @values 'sidemenu', 'submenu'
   * @default 'sidemenu'
   */
  variant?: 'sidemenu' | 'submenu'
  /**
   * ARIA label for navigation
   * Required for sidemenu variant to provide accessible navigation context.
   * Should describe the purpose of the navigation menu.
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<FdsMenuProps>(), {
  variant: 'sidemenu',
})

const cssClass = computed(() => {
  return props.variant === 'submenu' ? '' : 'sidemenu'
})
</script>

<style scoped lang="scss"></style>
