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
/**
 * Tooltip component implementing DKFDS v11 tooltip specifications.
 * 
 * Provides contextual help information through an accessible tooltip interface with click or hover triggers.
 * Features proper ARIA labeling, keyboard navigation support, and flexible positioning. Designed primarily
 * for help icons but can be adapted for other contextual information needs.
 * 
 * @component
 * @example Basic help tooltip with click trigger
 * ```vue
 * <FdsTooltip 
 *   content="This field is required for processing your application"
 *   trigger="click"
 *   position="above"
 * />
 * ```
 * 
 * @example Custom icon tooltip with hover trigger
 * ```vue
 * <FdsTooltip 
 *   content="Additional information about this feature"
 *   trigger="hover"
 *   icon="info"
 *   position="below"
 *   aria-label="Feature information"
 * />
 * ```
 * 
 * @example Tooltip used as accessible label for icon-only button
 * ```vue
 * <FdsTooltip 
 *   content="Edit profile settings"
 *   :is-label="true"
 *   icon="edit"
 *   trigger="hover"
 * />
 * ```
 * 
 * @example Disabled tooltip for conditional help
 * ```vue
 * <FdsTooltip 
 *   content="Help is not available in this context"
 *   :disabled="!helpAvailable"
 *   :force-visible="false"
 * />
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/tooltip/} DKFDS Tooltip Documentation
 */
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { generateId } from '../../composables'
import { tooltip as TooltipUtil } from '../../utils/scripts'
import FdsIkon from '../layout/fds-ikon.vue'

export interface FdsTooltipProps {
  /** 
   * Tooltip text content to display (required)
   * Should be concise yet informative help text
   * Essential for user understanding and accessibility
   */
  content: string
  /** 
   * Position of tooltip relative to the trigger button
   * Choose based on available screen space and UI layout
   * @values 'above', 'below'
   * @default 'above'
   */
  position?: 'above' | 'below'
  /** 
   * Interaction method to trigger tooltip display
   * 'click' is more accessible and mobile-friendly than 'hover'
   * @values 'hover', 'click'
   * @default 'click'
   */
  trigger?: 'hover' | 'click'
  /** 
   * Icon name to display in the tooltip button
   * Should be semantic and recognizable to users
   * @default 'help'
   */
  icon?: string
  /** 
   * Disable tooltip interaction completely
   * Useful for conditional help availability
   * @default false
   */
  disabled?: boolean
  /** 
   * Force tooltip to remain visible regardless of trigger
   * Useful for complex layouts or debugging purposes
   * @default false
   */
  forceVisible?: boolean
  /** 
   * Use tooltip content as aria-label instead of aria-describedby
   * Appropriate when tooltip serves as the primary label for icon-only buttons
   * @default false
   */
  isLabel?: boolean
  /** 
   * Custom ID for the tooltip element
   * Auto-generated if not provided for accessibility purposes
   */
  id?: string
  /** 
   * Custom aria-label text for the tooltip trigger button
   * Overrides default accessibility text when provided
   */
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
  /** 
   * Emitted when tooltip becomes visible
   * Useful for analytics or coordinating with other UI elements
   */
  show: []
  /** 
   * Emitted when tooltip is hidden/dismissed
   * Can trigger cleanup or follow-up actions
   */
  hide: []
  /** 
   * Emitted whenever tooltip visibility state changes
   * Provides boolean indicating current visibility for state management
   */
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
