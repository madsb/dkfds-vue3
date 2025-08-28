<template>
  <div
    :id="id"
    class="toast-container"
    aria-live="assertive"
    aria-atomic="false"
    aria-relevant="additions"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * Toast container component implementing DKFDS v11 toast notification system.
 *
 * Provides a properly configured ARIA live region for toast notifications with optimal
 * screen reader announcement behavior. Acts as a centralized container for multiple toast
 * instances with appropriate accessibility attributes and positioning.
 *
 * @component
 * @example Basic container setup
 * ```vue
 * <FdsToastContainer>
 *   <FdsToast type="success" heading="Saved" message="Changes saved successfully" />
 *   <FdsToast type="info" heading="Info" message="System maintenance tonight" />
 * </FdsToastContainer>
 * ```
 *
 * @example Container with custom ID for programmatic management
 * ```vue
 * <FdsToastContainer id="main-notifications">
 *   <FdsToast v-for="toast in toasts" :key="toast.id" v-bind="toast" />
 * </FdsToastContainer>
 * ```
 *
 * @example Multiple containers for different notification types
 * ```vue
 * <!-- Success notifications -->
 * <FdsToastContainer id="success-toasts">
 *   <FdsToast type="success" :visible="showSuccessToast" />
 * </FdsToastContainer>
 *
 * <!-- Error notifications -->
 * <FdsToastContainer id="error-toasts">
 *   <FdsToast type="error" :visible="showErrorToast" />
 * </FdsToastContainer>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/toast/} DKFDS Toast Documentation
 */
import { generateId } from '../../composables'

export interface FdsToastContainerProps {
  /**
   * Unique identifier for the toast container element
   * Auto-generated if not provided for accessibility and programmatic management
   * Useful for targeting specific containers in multi-container applications
   */
  id?: string
}

withDefaults(defineProps<FdsToastContainerProps>(), {
  id: () => generateId('toast-container').value,
})
</script>

<style scoped lang="scss">
// Container styles handled by DKFDS CSS
// No custom styles needed as we're using DKFDS classes
</style>
