<template>
  <div
    :id="id"
    ref="toastElement"
    class="toast hide"
    :class="[`toast-${type}`]"
    aria-atomic="true"
    @click="handleClick"
  >
    <div class="toast-icon"></div>
    <div class="toast-message">
      <p>
        <span class="sr-only">{{ typeLabel }}:</span>
        <strong v-if="heading" :id="headingId">{{ heading }}</strong>
      </p>
      <p v-if="$slots.default || message">
        <slot>{{ message }}</slot>
      </p>
      <button
        v-if="closable"
        class="toast-close"
        type="button"
        :aria-describedby="headingId"
        @click.stop="handleClose"
      >
        Luk
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Toast notification component implementing DKFDS v11 toast specifications.
 * 
 * Provides contextual feedback messages to users with different severity levels (info, success, warning, error).
 * Features automatic dismissal, manual close functionality, and proper ARIA support for screen readers.
 * Integrates with DKFDS toast system for consistent styling and behavior patterns.
 * 
 * @component
 * @example Basic usage
 * ```vue
 * <FdsToast 
 *   type="success" 
 *   heading="Success!" 
 *   message="Your data has been saved successfully."
 *   :visible="true"
 * />
 * ```
 * 
 * @example Auto-dismiss with custom timing
 * ```vue
 * <FdsToast 
 *   type="warning" 
 *   heading="Warning"
 *   :auto-dismiss="5000"
 *   :visible="showToast"
 *   @close="showToast = false"
 * >
 *   This toast will automatically close after 5 seconds.
 * </FdsToast>
 * ```
 * 
 * @example Non-closable info toast
 * ```vue
 * <FdsToast 
 *   type="info" 
 *   heading="Information"
 *   message="System maintenance scheduled for tonight."
 *   :closable="false"
 *   :visible="true"
 * />
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/toast/} DKFDS Toast Documentation
 */
import { generateId } from '../../composables'
// @ts-ignore - Toast class import
import { toast as ToastClass } from '../../utils/scripts'
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

const Toast = ToastClass as any

export interface FdsToastProps {
  /** 
   * Semantic type of the toast notification affecting icon and styling
   * Controls visual appearance and screen reader announcements
   * @values 'info', 'success', 'warning', 'error'
   * @default 'info'
   */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** 
   * Main heading text displayed prominently in the toast
   * Shown in bold text with semantic screen reader prefix
   */
  heading?: string
  /** 
   * Detailed message text or fallback content when no slot is provided
   * Can be used alongside or instead of default slot content
   */
  message?: string
  /** 
   * Whether users can manually dismiss the toast via close button
   * When false, toast can only be dismissed programmatically or via auto-dismiss
   * @default true
   */
  closable?: boolean
  /** 
   * Unique identifier for the toast element
   * Auto-generated if not provided for accessibility purposes
   */
  id?: string
  /** 
   * Auto-dismiss timeout in milliseconds
   * Set to 0 to disable automatic dismissal
   * @default 0
   */
  autoDismiss?: number
  /** 
   * Controls toast visibility state
   * Used with v-model pattern for reactive show/hide behavior
   * @default false
   */
  visible?: boolean
}

const props = withDefaults(defineProps<FdsToastProps>(), {
  type: 'info',
  message: '',
  closable: true,
  id: () => generateId('toast').value,
  autoDismiss: 0,
  visible: false,
})

const emit = defineEmits<{
  /** 
   * Emitted when toast is closed either manually via close button or programmatically
   * Useful for cleaning up state or triggering follow-up actions
   */
  close: []
  /** 
   * Emitted when the toast content area is clicked (excluding close button)
   * Can be used to implement custom click behaviors or analytics
   */
  click: [event: MouseEvent]
  /** 
   * Emitted when toast visibility changes for v-model support
   * Enables reactive two-way binding with parent component state
   */
  'update:visible': [value: boolean]
}>()

const toastElement = ref<HTMLElement | null>(null)
const toastInstance = ref<any | null>(null)

// Labels
const typeLabel = computed(
  () =>
    ({
      info: 'Information',
      success: 'Succes',
      warning: 'Advarsel',
      error: 'Fejl',
    })[props.type] || 'Information',
)

const headingId = computed(() => `${props.id}-heading`)

// Methods
const show = () => {
  if (toastInstance.value) {
    toastInstance.value.show(props.autoDismiss)
    emit('update:visible', true)
  }
}

const hide = () => {
  if (toastInstance.value) {
    toastInstance.value.hide()
    emit('update:visible', false)
    emit('close')
  }
}

const handleClose = () => {
  hide()
}

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

// Watch for visibility changes
watch(
  () => props.visible,
  async (newValue) => {
    await nextTick()
    if (newValue) {
      show()
    } else {
      hide()
    }
  },
)

// Lifecycle
onMounted(async () => {
  await nextTick()
  if (toastElement.value) {
    toastInstance.value = new Toast(toastElement.value)
    if (props.visible) {
      show()
    }
  }
})

onUnmounted(() => {
  if (toastInstance.value) {
    toastInstance.value.destroy()
    toastInstance.value = null
  }
})

// Expose methods for external control
defineExpose({
  show,
  hide,
})
</script>

<style scoped lang="scss">
// Toast-specific styles will be handled by DKFDS CSS
// No custom styles needed as we're using DKFDS classes
</style>
