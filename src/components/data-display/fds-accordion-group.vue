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
/**
 * Accordion group container implementing DKFDS v11 accordion specifications.
 * 
 * Manages multiple accordion items with coordinated expand/collapse functionality and bulk controls.
 * Provides centralized state management for child accordion components with optional bulk expand/collapse
 * button for improved user experience with large sets of accordions.
 * 
 * @component
 * @example Basic accordion group with bulk controls
 * ```vue
 * <FdsAccordionGroup>
 *   <FdsAccordion title="First Section">
 *     Content for first accordion section
 *   </FdsAccordion>
 *   <FdsAccordion title="Second Section">
 *     Content for second accordion section  
 *   </FdsAccordion>
 * </FdsAccordionGroup>
 * ```
 * 
 * @example Accordion group without bulk button
 * ```vue
 * <FdsAccordionGroup :show-bulk-button="false">
 *   <FdsAccordion title="Privacy Policy">
 *     Privacy policy content...
 *   </FdsAccordion>
 *   <FdsAccordion title="Terms of Service">
 *     Terms of service content...
 *   </FdsAccordion>
 * </FdsAccordionGroup>
 * ```
 * 
 * @example Custom bulk button text and state management
 * ```vue
 * <FdsAccordionGroup 
 *   expanded-text="Fold alle sammen"
 *   collapsed-text="Udvid alle"
 *   v-model="allExpanded"
 *   @toggle-all="handleToggleAll"
 * >
 *   <FdsAccordion v-for="item in accordionData" :key="item.id" v-bind="item" />
 * </FdsAccordionGroup>
 * ```
 * 
 * @example Custom bulk button header
 * ```vue
 * <FdsAccordionGroup>
 *   <template #header>
 *     <div class="custom-header">
 *       <button @click="customToggleAll">Custom Toggle Button</button>
 *     </div>
 *   </template>
 *   <FdsAccordion title="Section 1">Content 1</FdsAccordion>
 *   <FdsAccordion title="Section 2">Content 2</FdsAccordion>
 * </FdsAccordionGroup>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/accordions/} DKFDS Accordion Documentation
 */
import { computed, provide, reactive, type Ref } from 'vue'

export interface FdsAccordionGroupProps {
  /** 
   * Text displayed on bulk button when all accordions are expanded
   * Indicates the action to collapse all accordions
   * @default 'Luk alle'
   */
  expandedText?: string
  /** 
   * Text displayed on bulk button when some/all accordions are collapsed
   * Indicates the action to expand all accordions
   * @default 'Åbn alle'
   */
  collapsedText?: string
  /** 
   * Whether to display the bulk expand/collapse button
   * Useful for groups with many accordions or when bulk control is desired
   * @default true
   */
  showBulkButton?: boolean
  /** 
   * v-model binding for controlling all accordions expanded state
   * When true, all accordions will be expanded; when false, all collapsed
   */
  modelValue?: boolean
}

withDefaults(defineProps<FdsAccordionGroupProps>(), {
  expandedText: 'Luk alle',
  collapsedText: 'Åbn alle',
  showBulkButton: true,
})

const emit = defineEmits<{
  /** 
   * Emitted when the bulk expanded state changes for v-model support
   * Provides the new boolean state indicating if all should be expanded
   */
  'update:modelValue': [value: boolean]
  /** 
   * Emitted when the bulk toggle button is clicked
   * Provides the new expanded state that will be applied to all accordions
   */
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
