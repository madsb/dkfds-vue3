<template>
  <div
    :id="panelId"
    class="tab-panel"
    role="tabpanel"
    :tabindex="active ? 0 : -1"
    :aria-labelledby="tabId"
    :hidden="!active"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Tab panel component implementing DKFDS v11 tab panel specifications.
 * 
 * Provides content container for tab panels with proper ARIA attributes and
 * keyboard navigation support. Each panel should have a corresponding tab with
 * the same ID. Content is hidden when not active and receives focus when activated.
 * Must be used within fds-faneblade component.
 * 
 * @component
 * @example Basic tab panel
 * ```vue
 * <fds-faneblade-panel 
 *   id="personal-info" 
 *   :active="currentTab === 'personal-info'"
 * >
 *   <h2>Personal Information</h2>
 *   <p>Enter your personal details here...</p>
 * </fds-faneblade-panel>
 * ```
 * 
 * @example Panel with form content
 * ```vue
 * <fds-faneblade-panel 
 *   id="contact" 
 *   :active="currentTab === 'contact'"
 * >
 *   <fds-form-group>
 *     <fds-label for="email">Email Address</fds-label>
 *     <fds-input id="email" type="email" />
 *   </fds-form-group>
 * </fds-faneblade-panel>
 * ```
 * 
 * @example Dynamic content panel
 * ```vue
 * <fds-faneblade-panel 
 *   id="results" 
 *   :active="currentTab === 'results'"
 * >
 *   <template v-if="loading">
 *     <fds-spinner />
 *   </template>
 *   <template v-else>
 *     <component :is="dynamicComponent" />
 *   </template>
 * </fds-faneblade-panel>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/faneblade/} DKFDS Tab Documentation
 */

export interface FdsFanebladePanelProps {
  /** 
   * Unique identifier matching the tab id
   * Must correspond to the id of an associated fds-faneblade-tab component
   * for proper ARIA linkage and accessibility.
   */
  id: string
  /** 
   * Whether this panel is currently visible
   * Controls visibility and keyboard navigation. Active panels are focusable.
   * @default false
   */
  active?: boolean
}

const props = defineProps<FdsFanebladePanelProps>()

const tabId = computed(() => `tab-${props.id}`)
const panelId = computed(() => `tabpanel-${props.id}`)
</script>

<style scoped lang="scss"></style>
