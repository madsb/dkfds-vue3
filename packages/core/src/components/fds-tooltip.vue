<template>
  <div
    ref="wrapperRef"
    class="tooltip-wrapper"
    :class="{
      'tooltip-is-label': isLabel,
      'hide-tooltip': true,
    }"
    :data-tooltip="content"
    :data-tooltip-id="tooltipId"
    :data-position="position === 'above' ? 'above' : 'below'"
    :data-trigger="trigger"
    :data-force-visible="forceVisible ? 'true' : undefined"
  >
    <button
      ref="targetRef"
      class="button button-unstyled tooltip-target"
      type="button"
      :disabled="disabled"
      :aria-label="ariaLabel || defaultAriaLabel"
    >
      <fds-ikon :icon="icon" class="mr-0 mt-0" :decorative="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { generateId, tooltip as TooltipUtil } from 'dkfds-vue3-utils'
import FdsIkon from './fds-ikon.vue'

export interface FdsTooltipProps {
  /** Tooltip text content (required) */
  content: string
  /** Position of tooltip relative to trigger */
  position?: 'above' | 'below'
  /** Trigger type - click is more accessible */
  trigger?: 'hover' | 'click'
  /** Icon to display in button */
  icon?: string
  /** Disable tooltip interaction */
  disabled?: boolean
  /** Force tooltip to be visible (for complex layouts) */
  forceVisible?: boolean
  /** Use aria-labelledby instead of aria-describedby (for icon-only buttons) */
  isLabel?: boolean
  /** Custom ID for tooltip */
  id?: string
  /** Custom aria-label for button */
  ariaLabel?: string
}

const props = withDefaults(defineProps<FdsTooltipProps>(), {
  position: 'above',
  trigger: 'click', // Default to click for better accessibility
  icon: 'help',
  disabled: false,
  forceVisible: false,
  isLabel: false,
})

const emit = defineEmits<{
  /** Emitted when tooltip is shown */
  show: []
  /** Emitted when tooltip is hidden */
  hide: []
  /** Emitted when tooltip visibility changes */
  toggle: [isVisible: boolean]
}>()

// Refs
const wrapperRef = ref<HTMLDivElement>()
const targetRef = ref<HTMLButtonElement>()
let tooltipInstance: any = null

// Generate ID
const generatedId = generateId(props.id)

// Computed
const tooltipId = computed(() => generatedId.value)
const defaultAriaLabel = computed(() => {
  if (props.isLabel && props.trigger === 'hover') {
    // For icon-only buttons, the tooltip serves as the label
    return undefined
  }
  return props.trigger === 'click' ? 'Vis hjælpetekst' : 'Hjælpetekst'
})

// Initialize tooltip
const initTooltip = () => {
  if (props.disabled || !wrapperRef.value) return

  try {
    // Create new tooltip instance
    tooltipInstance = new TooltipUtil(wrapperRef.value)
    tooltipInstance.init()

    // Set up event listeners for emit
    if (targetRef.value) {
      const button = targetRef.value

      // Listen for tooltip show/hide events
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            if (mutation.attributeName === 'aria-expanded') {
              const isExpanded = button.getAttribute('aria-expanded') === 'true'
              emit('toggle', isExpanded)
              if (isExpanded) {
                emit('show')
              } else {
                emit('hide')
              }
            } else if (mutation.attributeName === 'class' && wrapperRef.value) {
              // For hover tooltips, check the hide-tooltip class
              const isHidden = wrapperRef.value.classList.contains('hide-tooltip')
              if (!isHidden && props.trigger === 'hover') {
                emit('show')
                emit('toggle', true)
              } else if (isHidden && props.trigger === 'hover') {
                emit('hide')
                emit('toggle', false)
              }
            }
          }
        })
      })

      if (props.trigger === 'click') {
        observer.observe(button, { attributes: true, attributeFilter: ['aria-expanded'] })
      } else if (wrapperRef.value) {
        observer.observe(wrapperRef.value, { attributes: true, attributeFilter: ['class'] })
      }
    }
  } catch (error) {
    console.error('Failed to initialize tooltip:', error)
  }
}

// Lifecycle
onMounted(() => {
  // Initialize after a small delay to ensure DOM is ready
  setTimeout(initTooltip, 10)
})

onUnmounted(() => {
  // Clean up
  if (tooltipInstance && tooltipInstance.destroy) {
    tooltipInstance.destroy()
    tooltipInstance = null
  }
})

// Watch for prop changes
watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && tooltipInstance) {
      tooltipInstance.destroy()
      tooltipInstance = null
    } else if (!disabled) {
      setTimeout(initTooltip, 10)
    }
  },
)

// Watch for content changes
watch(
  () => props.content,
  () => {
    if (wrapperRef.value) {
      wrapperRef.value.setAttribute('data-tooltip', props.content)
    }
  },
)
</script>
