<template>
  <button
    :id="tabId"
    class="tab-button"
    role="tab"
    :aria-controls="panelId"
    :aria-selected="active"
    @click="handleClick"
  >
    <svg v-if="icon" class="icon-svg" focusable="false" aria-hidden="true">
      <use :href="`#${icon}`"></use>
    </svg>
    <span>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Unique identifier for the tab */
  id: string
  /** Label text for the tab */
  label?: string
  /** Whether this tab is currently active */
  active?: boolean
  /** Optional icon ID for the tab */
  icon?: string
}>()

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
