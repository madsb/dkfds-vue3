<template>
  <button
    :id="tabId"
    class="tab-button"
    role="tab"
    :aria-controls="panelId"
    :aria-selected="active"
    @click="handleClick"
  >
    <fds-ikon v-if="icon" :icon="icon" :decorative="true" />
    <span>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Tab button component implementing DKFDS v11 tab specifications.
 *
 * Renders individual tab buttons with proper ARIA attributes for accessibility.
 * Supports icons, custom labels, and active state management. Must be used within
 * fds-faneblade component. Note: This component is deprecated in favor of the
 * fds-faneblade-nav/fds-faneblade-nav-item pattern for navigation-based tabs.
 *
 * @component
 * @deprecated Use fds-faneblade-nav with fds-faneblade-nav-item for navigation tabs
 * @example Basic tab button
 * ```vue
 * <fds-faneblade-tab
 *   id="personal-info"
 *   label="Personal Information"
 *   :active="currentTab === 'personal-info'"
 *   @click="switchTab"
 * />
 * ```
 *
 * @example Tab with icon
 * ```vue
 * <fds-faneblade-tab
 *   id="settings"
 *   label="Settings"
 *   icon="settings"
 *   :active="currentTab === 'settings'"
 *   @click="switchTab"
 * />
 * ```
 *
 * @example Using slot for custom content
 * ```vue
 * <fds-faneblade-tab
 *   id="custom"
 *   :active="currentTab === 'custom'"
 *   @click="switchTab"
 * >
 *   <span class="custom-tab-content">Custom Tab Content</span>
 * </fds-faneblade-tab>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/faneblade/} DKFDS Tab Documentation
 */

export interface FdsFanebladeTabProps {
  /**
   * Unique identifier for the tab
   * Used to link tab button with corresponding panel via ARIA attributes.
   * Should match the id of the associated fds-faneblade-panel component.
   */
  id: string
  /**
   * Label text for the tab
   * Visible text content. Can be overridden by slot content.
   */
  label?: string
  /**
   * Whether this tab is currently active
   * Controls ARIA selected state and visual styling.
   * @default false
   */
  active?: boolean
  /**
   * Optional icon ID for the tab
   * DKFDS icon identifier to display before the label.
   */
  icon?: string
}

const props = defineProps<FdsFanebladeTabProps>()

const emit = defineEmits<{
  /**
   * Emitted when the tab is clicked
   * Allows parent component to handle tab switching and state management.
   *
   * @param id - The unique identifier of the clicked tab
   */
  click: [id: string]
}>()

const tabId = computed(() => `tab-${props.id}`)
const panelId = computed(() => `tabpanel-${props.id}`)

const handleClick = () => {
  emit('click', props.id)
}
</script>

<style scoped lang="scss"></style>
