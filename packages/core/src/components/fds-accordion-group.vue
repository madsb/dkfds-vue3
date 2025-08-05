<template>
  <div>
    <slot name="header">
      <button
        v-if="showBulkControls"
        class="accordion-bulk-button"
        :data-accordion-bulk-expand="!refExpanded"
        @click="onToggle"
      >
        {{ `${refExpanded ? expandedText : collapsedText}` }}
      </button>
    </slot>
    <ul class="accordion">
      <slot :group-active="refExpanded" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'

const {
  /** Tekst ved Lukket tilstand - Åbn alle */
  collapsedText = 'Åbn alle',
  /** Tekst ved Åben tilstand - Luk alle */
  expandedText = 'Luk alle',
  /** Vis bulk expand/collapse knap */
  showBulkControls = true,
} = defineProps<{
  collapsedText?: string
  expandedText?: string
  showBulkControls?: boolean
}>()

const emit = defineEmits<{
  'toggle-all': [expanded: boolean]
}>()

// TODO: Overvej single select (collapse andre) og multiselect (multi default) ?
// TODO: Group expand/

const refExpanded = ref(false)
const compExpanded = computed(() => refExpanded.value)
provide('provideGroupExpanded', compExpanded)

const onToggle = () => {
  refExpanded.value = !refExpanded.value
  emit('toggle-all', refExpanded.value)
}
</script>

<style lang="scss"></style>
