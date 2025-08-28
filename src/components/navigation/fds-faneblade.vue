<template>
  <div class="tab-container">
    <div class="tab-list" role="tablist">
      <slot name="tabs" />
    </div>
    <slot name="panels" />
  </div>
</template>

<script setup lang="ts">
/**
 * Tab container component implementing DKFDS v11 tab specifications.
 *
 * Provides a container structure for tab navigation with proper ARIA roles and
 * semantic organization. Uses slot-based architecture where tabs go in the "tabs"
 * slot and corresponding panels go in the "panels" slot. This ensures proper
 * DKFDS v11 structure with tabs and panels as sibling elements.
 *
 * @component
 * @example Basic tab structure
 * ```vue
 * <fds-faneblade>
 *   <template #tabs>
 *     <fds-faneblade-tab id="tab1" label="First Tab" :active="activeTab === 'tab1'" />
 *     <fds-faneblade-tab id="tab2" label="Second Tab" :active="activeTab === 'tab2'" />
 *   </template>
 *   <template #panels>
 *     <fds-faneblade-panel id="tab1" :active="activeTab === 'tab1'">
 *       Content for first tab
 *     </fds-faneblade-panel>
 *     <fds-faneblade-panel id="tab2" :active="activeTab === 'tab2'">
 *       Content for second tab
 *     </fds-faneblade-panel>
 *   </template>
 * </fds-faneblade>
 * ```
 *
 * @example With icons and dynamic content
 * ```vue
 * <fds-faneblade>
 *   <template #tabs>
 *     <fds-faneblade-tab
 *       v-for="tab in tabs"
 *       :key="tab.id"
 *       :id="tab.id"
 *       :label="tab.label"
 *       :icon="tab.icon"
 *       :active="activeTab === tab.id"
 *       @click="setActiveTab"
 *     />
 *   </template>
 *   <template #panels>
 *     <fds-faneblade-panel
 *       v-for="tab in tabs"
 *       :key="tab.id"
 *       :id="tab.id"
 *       :active="activeTab === tab.id"
 *     >
 *       <component :is="tab.component" />
 *     </fds-faneblade-panel>
 *   </template>
 * </fds-faneblade>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/faneblade/} DKFDS Tab Documentation
 */
// This component uses slot-based architecture for DKFDS v11 compliance
// Tabs in "tabs" slot, panels in "panels" slot for proper semantic structure
</script>

<style scoped lang="scss"></style>
