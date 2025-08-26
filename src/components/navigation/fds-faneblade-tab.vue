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

export interface FdsFanebladeTabProps {
  /** Unique identifier for the tab */
  id: string
  /** Label text for the tab */
  label?: string
  /** Whether this tab is currently active */
  active?: boolean
  /** Optional icon ID for the tab */
  icon?: string
}

const props = defineProps<FdsFanebladeTabProps>()

const emit = defineEmits<{
  /** Emitted when the tab is clicked */
  click: [id: string]
}>()

const tabId = computed(() => `tab-${props.id}`)
const panelId = computed(() => `tabpanel-${props.id}`)

const handleClick = () => {
  emit('click', props.id)
}
</script>

<style scoped lang="scss"></style>
