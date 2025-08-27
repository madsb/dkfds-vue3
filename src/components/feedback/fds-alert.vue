<template>
  <transition name="fade">
    <div
      v-if="showAlert"
      :role="compAlert ? 'alert' : ''"
      class="alert"
      :class="[`alert-${variant}`, { 'has-close': closeable }]"
    >
      <fds-ikon
        v-if="showIcon"
        :icon="variant"
        class="alert-icon"
        :aria-label="iconAriaLabel"
        :decorative="false"
      />
      <div class="alert-body">
        <slot v-if="$slots.header || header" name="header">
          <h2 class="alert-heading">
            {{ header }}
          </h2>
        </slot>
        <p class="alert-text">
          <slot />
        </p>
        <button v-if="closeable" type="button" class="alert-close" @click="onClose">
          <slot name="button"> <fds-ikon icon="close" :decorative="true" />Luk </slot>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
/**
 * Alert component implementing DKFDS v11 message/notification specifications.
 * 
 * Displays important messages to users with different severity levels (info, success, warning, error).
 * Supports both dismissible and persistent alerts with proper ARIA attributes for accessibility.
 *
 * @component
 * @example Basic info alert
 * ```vue
 * <FdsAlert variant="info">
 *   Your information has been saved successfully.
 * </FdsAlert>
 * ```
 * 
 * @example Success alert with header
 * ```vue
 * <FdsAlert variant="success" header="Payment completed">
 *   Your payment has been processed and a receipt has been sent to your email.
 * </FdsAlert>
 * ```
 * 
 * @example Dismissible warning alert
 * ```vue
 * <FdsAlert variant="warning" closeable @close="handleClose">
 *   Please review your information before submitting.
 * </FdsAlert>
 * ```
 * 
 * @example Error alert without icon
 * ```vue
 * <FdsAlert variant="error" :show-icon="false">
 *   An error occurred while processing your request. Please try again.
 * </FdsAlert>
 * ```
 * 
 * @example Using slots for custom content
 * ```vue
 * <FdsAlert variant="info">
 *   <template #header>
 *     <h3>Custom Header</h3>
 *   </template>
 *   <template #default>
 *     Custom alert content with <a href="#">links</a> and formatting.
 *   </template>
 *   <template #button>
 *     <FdsButton variant="secondary">Custom Action</FdsButton>
 *   </template>
 * </FdsAlert>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/beskeder/} DKFDS Alert Documentation
 */
import { ref, computed } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

export interface FdsAlertProps {
  /** 
   * Optional header text for the alert
   * Displayed as a prominent heading above the alert content
   */
  header?: string | null
  
  /** 
   * Alert variant determining visual style and semantic meaning
   * @values 'info', 'success', 'warning', 'error'
   * @default 'info'
   */
  variant?: 'success' | 'info' | 'warning' | 'error'
  
  /** 
   * Show icon matching the alert variant
   * Icons provide visual reinforcement of the alert type
   * @default false
   */
  showIcon?: boolean
  
  /** 
   * Allow users to dismiss the alert
   * Adds a close button and enables dismissal functionality
   * @default false
   */
  closeable?: boolean
}

const {
  header = null,
  variant = 'info',
  showIcon = false,
  closeable = false,
} = defineProps<FdsAlertProps>()

const emit = defineEmits<{
  /**
   * Emitted when alert is closed/dismissed
   * Only fired when closeable is true and user clicks close button
   */
  close: [closed: boolean]
}>()

const showAlert = ref(true)

const compAlert = computed(() => ['warning', 'error'].includes(variant))

const iconAriaLabel = computed(() => {
  const labels = {
    info: 'Information',
    success: 'Succes',
    warning: 'Advarsel',
    error: 'Fejl',
  }
  return labels[variant]
})

const onClose = () => {
  showAlert.value = !showAlert.value
  emit('close', true)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.alert-close {
  > i {
    margin-right: 4px;
    width: 1.6rem;
    height: 1.6rem;
    overflow: hidden;
    vertical-align: middle;
  }
}
</style>
