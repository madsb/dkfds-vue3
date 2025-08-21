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

const props = defineProps<{
  /** Unique identifier matching the tab id */
  id: string
  /** Whether this panel is currently visible */
  active?: boolean
}>()

const tabId = computed(() => `tab-${props.id}`)
const panelId = computed(() => `tabpanel-${props.id}`)
</script>

<style scoped lang="scss"></style>
