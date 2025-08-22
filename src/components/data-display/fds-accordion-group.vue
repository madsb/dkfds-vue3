<template>
  <div class="accordion-group">
    <slot name="header">
      <button
        v-if="showBulkButton"
        class="accordion-bulk-button"
        :data-accordion-bulk-expand="!allExpanded ? 'true' : 'false'"
        :aria-expanded="allExpanded ? 'true' : 'false'"
        @click="toggleAll"
      >
        {{ allExpanded ? expandedText : collapsedText }}
      </button>
    </slot>

    <ul class="accordion">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, type Ref } from 'vue'

interface Props {
  /** Text for expand all button */
  expandedText?: string
  /** Text for collapse all button */
  collapsedText?: string
  /** Show bulk expand/collapse button */
  showBulkButton?: boolean
  /** Control all accordions expanded state */
  modelValue?: boolean
}

withDefaults(defineProps<Props>(), {
  expandedText: 'Luk alle',
  collapsedText: 'Åbn alle',
  showBulkButton: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'toggle-all': [expanded: boolean]
}>()

// State management using a Map for cleaner tracking
const accordionStates = reactive(new Map<string, Ref<boolean>>())

// Computed property for all expanded state
const allExpanded = computed({
  get() {
    if (accordionStates.size === 0) return false
    return Array.from(accordionStates.values()).every((state) => state.value)
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})

// API for child accordions
const accordionGroupApi = {
  register(id: string, expanded: Ref<boolean>) {
    accordionStates.set(id, expanded)
  },

  unregister(id: string) {
    accordionStates.delete(id)
  },

  getState(id: string): boolean {
    const state = accordionStates.get(id)
    return state ? state.value : false
  },
}

// Provide the API to child accordions
provide('accordion-group-api', accordionGroupApi)

// Methods
const toggleAll = () => {
  const newState = !allExpanded.value

  // Update all accordion states
  accordionStates.forEach((state) => {
    state.value = newState
  })

  allExpanded.value = newState
  emit('toggle-all', newState)
}
</script>

<style scoped lang="scss">
.accordion-group {
  // Ensure proper spacing when bulk button is present
  .accordion-bulk-button {
    margin-bottom: var(--spacing-3, 1rem);
  }
}

.accordion {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
