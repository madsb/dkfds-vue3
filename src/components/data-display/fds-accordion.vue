<template>
  <!-- Standalone accordion: wrap in ul.accordion > li -->
  <ul v-if="!isInGroup" class="accordion">
    <li>
      <component :is="headerTag">
        <button
          :id="buttonId"
          class="accordion-button"
          :class="variantClass"
          :aria-expanded="isExpanded ? 'true' : 'false'"
          :aria-controls="panelId"
          @click="handleToggle"
        >
          <span class="accordion-title">
            <slot name="header">
              {{ header }}
            </slot>
          </span>
          <span
            v-if="variant && ['error', 'warning', 'success'].includes(variant)"
            class="accordion-icon"
          >
            <span v-if="variantText !== null" class="icon_text">
              {{ variantText || defaultVariantTexts[variant] }}
            </span>
            <fds-ikon :icon="icons[variant]" :decorative="true" />
          </span>
        </button>
      </component>

      <div :id="panelId" :aria-hidden="!isExpanded" class="accordion-content">
        <slot />
      </div>
    </li>
  </ul>

  <!-- In group: just render the li -->
  <li v-else>
    <component :is="headerTag">
      <button
        :id="buttonId"
        class="accordion-button"
        :class="variantClass"
        :aria-expanded="isExpanded ? 'true' : 'false'"
        :aria-controls="panelId"
        @click="handleToggle"
      >
        <span class="accordion-title">
          <slot name="header">
            {{ header }}
          </slot>
        </span>
        <span
          v-if="variant && ['error', 'warning', 'success'].includes(variant)"
          class="accordion-icon"
        >
          <span v-if="variantText !== null" class="icon_text">
            {{ variantText || defaultVariantTexts[variant] }}
          </span>
          <fds-ikon :icon="icons[variant]" :decorative="true" />
        </span>
      </button>
    </component>

    <div :id="panelId" :aria-hidden="!isExpanded" class="accordion-content">
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
/**
 * Accordion component implementing DKFDS v11 collapsible content specifications.
 *
 * Expandable/collapsible content panels with proper keyboard navigation and ARIA attributes.
 * Can be used standalone or within FdsAccordionGroup for coordinated behavior.
 *
 * @component
 * @example Standalone accordion
 * ```vue
 * <FdsAccordion header="Show more information">
 *   Detailed content that can be expanded or collapsed.
 * </FdsAccordion>
 * ```
 *
 * @example Accordion with custom header
 * ```vue
 * <FdsAccordion>
 *   <template #header>
 *     <span>Custom Header with <strong>formatting</strong></span>
 *   </template>
 *   <template #default>
 *     Accordion content goes here
 *   </template>
 * </FdsAccordion>
 * ```
 *
 * @example Controlled accordion (v-model)
 * ```vue
 * <FdsAccordion
 *   v-model="isExpanded"
 *   header="Controlled Accordion"
 *   @update:modelValue="handleToggle"
 * >
 *   Content visibility controlled by isExpanded ref
 * </FdsAccordion>
 * ```
 *
 * @example Accordion with status variants
 * ```vue
 * <FdsAccordion
 *   header="Warning Section"
 *   variant="warning"
 *   variant-text="2 issues"
 * >
 *   Content with warning status indicator
 * </FdsAccordion>
 * ```
 *
 * @example Within accordion group
 * ```vue
 * <FdsAccordionGroup :allow-multiple="false">
 *   <FdsAccordion header="Section 1">Content 1</FdsAccordion>
 *   <FdsAccordion header="Section 2">Content 2</FdsAccordion>
 *   <FdsAccordion header="Section 3">Content 3</FdsAccordion>
 * </FdsAccordionGroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/accordions/} DKFDS Accordion Documentation
 */

import { ref, computed, inject, watch, onMounted, onUnmounted, type Ref } from 'vue'
import { generateId } from '../../composables'
import FdsIkon from '../layout/fds-ikon.vue'

export interface FdsAccordionProps {
  /**
   * Accordion header text
   * Displayed as the clickable toggle button content
   */
  header?: string

  /**
   * Controlled expanded state
   * Use with v-model for two-way binding
   */
  modelValue?: boolean
  /** Heading level */
  headerTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Variant type for icons */
  variant?: 'success' | 'warning' | 'error' | null
  /** Text to display with variant icon */
  variantText?: string
  /** Unique ID for the accordion */
  id?: string
}

interface AccordionGroupApi {
  register: (_id: string, _expanded: Ref<boolean>) => void
  unregister: (_id: string) => void
  getState: (_id: string) => boolean
}

const props = withDefaults(defineProps<FdsAccordionProps>(), {
  headerTag: 'h2',
  variant: null,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'fds.accordion.open': []
  'fds.accordion.close': []
}>()

// Generate unique IDs
const accordionId = generateId(props.id)
const buttonId = computed(() => `${accordionId.value}-button`)
const panelId = computed(() => `${accordionId.value}-panel`)

// Check if we're in a group
const groupApi = inject<AccordionGroupApi | null>('accordion-group-api', null)
const isInGroup = computed(() => !!groupApi)

// State management
const localExpanded = ref(props.modelValue ?? false)

const isExpanded = computed({
  get() {
    // If in a group and the group is managing state, use that
    if (groupApi && groupApi.getState) {
      return groupApi.getState(accordionId.value)
    }
    return localExpanded.value
  },
  set(value: boolean) {
    localExpanded.value = value
    emit('update:modelValue', value)
  },
})

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      localExpanded.value = newValue
    }
  },
)

// Register with group if present
onMounted(() => {
  if (groupApi) {
    groupApi.register(accordionId.value, localExpanded)
  }
})

onUnmounted(() => {
  if (groupApi) {
    groupApi.unregister(accordionId.value)
  }
})

// Icon configuration
const icons = {
  success: 'check-circle',
  warning: 'report-problem',
  error: 'highlight-off',
} as const

const defaultVariantTexts = {
  success: 'Success',
  warning: 'Advarsel',
  error: 'Fejl',
} as const

// Computed properties
const variantClass = computed(() => (props.variant ? `accordion-${props.variant}` : ''))

// Methods
const handleToggle = () => {
  isExpanded.value = !isExpanded.value

  // Emit DKFDS events
  if (isExpanded.value) {
    emit('fds.accordion.open')
  } else {
    emit('fds.accordion.close')
  }
}
</script>

<style scoped lang="scss">
ul.accordion {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
