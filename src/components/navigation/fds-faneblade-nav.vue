<template>
  <nav class="tab-container" :aria-label="ariaLabel">
    <ul class="tab-list">
      <slot />
    </ul>
  </nav>
</template>

<script setup lang="ts">
/**
 * Tab navigation container component implementing DKFDS v11 tab navigation specifications.
 * 
 * Provides semantic navigation structure for tab-based interfaces using the 
 * navigation pattern rather than tabpanel/tab pattern. This is the preferred
 * approach for navigation-style tabs that link to different pages or sections.
 * Contains fds-faneblade-nav-item components.
 * 
 * @component
 * @example Basic tab navigation
 * ```vue
 * <fds-faneblade-nav aria-label="Main navigation">
 *   <fds-faneblade-nav-item 
 *     href="/profile" 
 *     label="Profile" 
 *     :active="$route.path === '/profile'"
 *   />
 *   <fds-faneblade-nav-item 
 *     href="/settings" 
 *     label="Settings" 
 *     :active="$route.path === '/settings'"
 *   />
 * </fds-faneblade-nav>
 * ```
 * 
 * @example With Vue Router integration
 * ```vue
 * <fds-faneblade-nav aria-label="Application sections">
 *   <fds-faneblade-nav-item 
 *     v-for="tab in navigationTabs"
 *     :key="tab.id"
 *     :href="tab.to"
 *     :label="tab.label"
 *     :icon="tab.icon"
 *     :active="$route.name === tab.routeName"
 *     @click="handleNavigation"
 *   />
 * </fds-faneblade-nav>
 * ```
 * 
 * @example Accessible navigation with custom ARIA
 * ```vue
 * <fds-faneblade-nav aria-label="Case management sections">
 *   <fds-faneblade-nav-item 
 *     href="/case/overview" 
 *     label="Overview"
 *     :active="activeSection === 'overview'"
 *   />
 *   <fds-faneblade-nav-item 
 *     href="/case/documents" 
 *     label="Documents"
 *     :active="activeSection === 'documents'"
 *   />
 * </fds-faneblade-nav>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/faneblade/} DKFDS Tab Documentation
 */
export interface FdsFanebladeNavProps {
  /** 
   * ARIA label for the navigation
   * Provides accessibility context for the tab navigation.
   * Should describe the purpose or section of the navigation.
   * @example "Main navigation", "Case sections", "User profile sections"
   */
  ariaLabel?: string
}

defineProps<FdsFanebladeNavProps>()
</script>

<style scoped lang="scss"></style>
