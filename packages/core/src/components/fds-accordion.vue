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
            <svg class="icon-svg" focusable="false" aria-hidden="true">
              <use :href="`#${icons[variant]}`"></use>
            </svg>
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
          <svg class="icon-svg" focusable="false" aria-hidden="true">
            <use :href="`#${icons[variant]}`"></use>
          </svg>
        </span>
      </button>
    </component>

    <div :id="panelId" :aria-hidden="!isExpanded" class="accordion-content">
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch, onMounted, onUnmounted, type Ref } from 'vue'
import { generateId } from 'dkfds-vue3-utils'

interface AccordionGroupApi {
  register: (_id: string, _expanded: Ref<boolean>) => void
  unregister: (_id: string) => void
  getState: (_id: string) => boolean
}

const props = withDefaults(
  defineProps<{
    /** Accordion header text */
    header?: string
    /** Controlled expanded state */
    modelValue?: boolean
    /** Heading level */
    headerTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    /** Variant type for icons */
    variant?: 'success' | 'warning' | 'error' | null
    /** Text to display with variant icon */
    variantText?: string
    /** Unique ID for the accordion */
    id?: string
  }>(),
  {
    headerTag: 'h2',
    variant: null,
  },
)

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
