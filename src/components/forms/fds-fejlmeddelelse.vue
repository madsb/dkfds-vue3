<template>
  <span v-if="showError" :id="computedId" class="form-error-message">
    <span class="sr-only">Fejl: </span>
    <slot>
      {{ compErrorMessage }}
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed, inject, useSlots, isRef, type Ref, watch, onUnmounted } from 'vue'

/**
 * Error message component implementing DKFDS v11 error display specifications.
 * 
 * Displays validation error messages with proper accessibility attributes,
 * automatic error summary registration, and integration with form validation
 * state. Supports both manual error content through slots and automatic
 * error display from form validation context following DKFDS error patterns.
 * 
 * @component
 * @example Basic error message
 * ```vue
 * <FdsFejlmeddelelse>
 *   Please enter a valid email address
 * </FdsFejlmeddelelse>
 * ```
 * 
 * @example Automatic error from validation context
 * ```vue
 * <FdsFormgroup :isValid="false">
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel>Email</FdsLabel>
 *     <FdsInput :id="formid" :aria-describedby="ariaDescribedby" />
 *     <FdsFejlmeddelelse /> <!-- Automatically shows context error -->
 *   </template>
 * </FdsFormgroup>
 * ```
 * 
 * @example Custom error with manual control
 * ```vue
 * <FdsFejlmeddelelse :auto="false" id="custom-error">
 *   {{ validationError }}
 * </FdsFejlmeddelelse>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

export interface FdsFejlmeddelelseProps {
  /** 
   * Automatically display error message from validation context.
   * When true, shows error message from injected validation state.
   * When false, only displays content provided through slot.
   * @default true
   */
  auto?: boolean
  /** 
   * Custom ID for the error message element.
   * If not provided, uses the errorId from parent FdsFormgroup.
   * Used for aria-describedby relationships with form controls.
   * @default undefined (uses injected errorId)
   */
  id?: string
}

const { auto = true, id } = defineProps<FdsFejlmeddelelseProps>()

const slots = useSlots()

const injErrorMessage = inject<Ref<string | null> | string | null>('provideErrorMessage', null)
const injIsValid = inject<Ref<boolean> | boolean>('provideIsValid', true)
const formid = inject<string | Ref<string> | undefined>('formid', undefined)
const errorId = inject<string | Ref<string> | undefined>('errorId', undefined)
const errorSummary = inject<{
  registerError: (_id: string, _message: string, _element?: HTMLElement) => void
  unregisterError: (_id: string) => void
  clearErrors: () => void
} | null>('errorSummary', null)

const compErrorMessage = computed(() => {
  if (!auto) {
    return null
  }
  const isValid = isRef(injIsValid) ? injIsValid.value : injIsValid
  const errorMessage = isRef(injErrorMessage) ? injErrorMessage.value : injErrorMessage
  return !isValid ? errorMessage : null
})

const showError = computed(() => {
  // Check if slot has actual content or if there's a computed error message
  return (slots.default && slots.default().length > 0) || compErrorMessage.value
})

// Get the actual error message to display
const displayedError = computed(() => {
  if (slots.default && slots.default().length > 0) {
    // Extract text content from slot
    const slotContent = slots.default()
    if (slotContent.length > 0) {
      // Handle string children directly
      if (typeof slotContent[0].children === 'string') {
        return slotContent[0].children
      }
      // Handle text nodes
      if (slotContent[0].children && typeof slotContent[0].children === 'object') {
        // Try to extract text from complex slot content
        const text = slotContent
          .map((node) => {
            if (typeof node.children === 'string') {
              return node.children
            }
            return ''
          })
          .join('')
        if (text) return text
      }
    }
  }
  return compErrorMessage.value
})

// Get the computed ID for the error element
const computedId = computed(() => {
  if (id) return id
  if (errorId) {
    return isRef(errorId) ? errorId.value : errorId
  }
  return undefined
})

// Get the field ID for error registration
const fieldId = computed(() => {
  if (formid) {
    return isRef(formid) ? formid.value : formid
  }
  return null
})

// Register/unregister error with fejlopsummering when it appears/disappears
let lastRegisteredError: string | null = null
watch(
  () => ({ show: showError.value, message: displayedError.value, id: fieldId.value }),
  ({ show, message, id }) => {
    if (errorSummary && id) {
      if (show && message) {
        // Register error if not already registered with same message
        if (lastRegisteredError !== message) {
          if (lastRegisteredError) {
            errorSummary.unregisterError(id)
          }
          errorSummary.registerError(id, message)
          lastRegisteredError = message
        }
      } else if (!show && lastRegisteredError) {
        // Unregister when error is hidden
        errorSummary.unregisterError(id)
        lastRegisteredError = null
      }
    }
  },
  { immediate: true },
)

// Clean up on unmount
onUnmounted(() => {
  if (errorSummary && fieldId.value) {
    errorSummary.unregisterError(fieldId.value)
  }
})
</script>

<style scoped lang="scss"></style>
