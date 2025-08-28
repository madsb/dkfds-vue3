<template>
  <nav v-if="hasErrors" :aria-labelledby="headingId">
    <div class="alert alert-error mt-0 mb-8" role="alert">
      <fds-ikon icon="error" class="alert-icon" aria-label="Fejl" :decorative="false" />
      <div class="alert-body">
        <h2 :id="headingId" class="alert-heading">
          <slot name="header">
            {{ header }}
          </slot>
        </h2>
        <ul class="alert-text nobullet-list">
          <li v-for="error in allErrors" :key="error.id">
            <a class="function-link" :href="`#${error.id}`" @click.prevent="focusField(error.id)">
              {{ error.message }}
            </a>
          </li>
          <slot />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
/**
 * Error summary component implementing DKFDS v11 fejlopsummering specifications.
 *
 * Provides a centralized display of form validation errors with direct navigation to error fields.
 * Features automatic error collection from child form components, manual error management,
 * and proper ARIA navigation structure. Essential for accessible form validation workflows.
 *
 * @component
 * @example Basic error summary with manual errors
 * ```vue
 * <FdsFejlopsummering
 *   :errors="[
 *     { id: 'email', message: 'Email is required' },
 *     { id: 'password', message: 'Password must be at least 8 characters' }
 *   ]"
 * />
 * ```
 *
 * @example Auto-collecting errors from form fields
 * ```vue
 * <FdsFejlopsummering :auto-collect="true">
 *   <FdsFormGroup id="username" :error="usernameError">
 *     <FdsInput v-model="username" />
 *   </FdsFormGroup>
 *   <FdsFormGroup id="email" :error="emailError">
 *     <FdsInput v-model="email" type="email" />
 *   </FdsFormGroup>
 * </FdsFejlopsummering>
 * ```
 *
 * @example Custom header with error click handling
 * ```vue
 * <FdsFejlopsummering
 *   header="Please fix the following issues"
 *   :errors="formErrors"
 *   @error-clicked="handleErrorClick"
 * >
 *   <template #header>
 *     <strong>Validation Errors ({{ errorCount }})</strong>
 *   </template>
 * </FdsFejlopsummering>
 * ```
 *
 * @example Disabled auto-collect with manual error management
 * ```vue
 * <FdsFejlopsummering
 *   :auto-collect="false"
 *   :errors="manualErrors"
 * />
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/fejlopsummering/} DKFDS Error Summary Documentation
 */
import { computed, provide, ref, onMounted, onUnmounted, toValue } from 'vue'
import { generateId } from '../../composables'
import FdsIkon from '../layout/fds-ikon.vue'

export interface ErrorItem {
  /** Unique identifier matching the form field ID */
  id: string
  /** Human-readable error message to display */
  message: string
  /** Optional reference to the associated form element */
  element?: HTMLElement
}

export interface FdsFejlopsummeringProps {
  /**
   * Main heading text for the error summary section
   * Should clearly indicate this is an error summary for users
   * @default 'Der er problemer'
   */
  header?: string
  /**
   * Unique identifier for the error summary container
   * Auto-generated if not provided for proper ARIA labeling
   */
  id?: string
  /**
   * Manual list of error items to display
   * Each error should have an id matching a form field and descriptive message
   * @default []
   */
  errors?: ErrorItem[]
  /**
   * Whether to automatically collect errors from child form components
   * When enabled, form fields can register errors automatically
   * @default true
   */
  autoCollect?: boolean
}

const {
  /** Overskrift for fejlopsummering */
  header = 'Der er problemer',
  /** ID for accessibility aria-labelledby */
  id,
  /** Manuel liste af fejl */
  errors = [],
  /** Om komponenten automatisk skal indsamle fejl fra formfelter */
  autoCollect = true,
} = defineProps<FdsFejlopsummeringProps>()

const emit = defineEmits<{
  /**
   * Emitted when a user clicks on an error link in the summary
   * Provides the field ID for custom handling or analytics tracking
   */
  'error-clicked': [id: string]
}>()

// Generate unique ID for heading
const generatedId = generateId(id)
const headingId = computed(() => toValue(generatedId))

// Store for collected errors
const collectedErrors = ref<Map<string, ErrorItem>>(new Map())

// Combine manual errors with collected errors
const allErrors = computed(() => {
  const errorList: ErrorItem[] = [...errors]

  if (autoCollect) {
    collectedErrors.value.forEach((error) => {
      errorList.push(error)
    })
  }

  return errorList
})

// Check if there are any errors to display
const hasErrors = computed(() => allErrors.value.length > 0)

// Function to register an error (for child components to use)
const registerError = (id: string, message: string, element?: HTMLElement) => {
  if (!autoCollect) return

  collectedErrors.value.set(id, { id, message, element })
}

// Function to unregister an error
const unregisterError = (id: string) => {
  if (!autoCollect) return

  collectedErrors.value.delete(id)
}

// Function to clear all collected errors
const clearErrors = () => {
  collectedErrors.value.clear()
}

// Provide error registration functions to child components
provide('errorSummary', {
  registerError,
  unregisterError,
  clearErrors,
})

// Focus the field when error link is clicked
const focusField = (fieldId: string) => {
  const element = document.getElementById(fieldId)
  if (element) {
    // Find the actual input element within the formgroup
    let targetElement = element
    const inputElement = element.querySelector('input, textarea, select')
    if (inputElement) {
      targetElement = inputElement as HTMLElement
    }

    // Scroll to the target element with smooth behavior
    if (typeof targetElement.scrollIntoView === 'function') {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // Focus after a longer delay to ensure smooth scrolling completes
    setTimeout(() => {
      if (typeof targetElement.focus === 'function') {
        targetElement.focus()
      }
    }, 500) // Longer delay to allow smooth scrolling to complete
  }

  emit('error-clicked', fieldId)
}

// Component is ready when mounted
onMounted(() => {
  // All functionality is handled natively by Vue
})

// Cleanup on unmount
onUnmounted(() => {
  clearErrors()
})
</script>

<style scoped lang="scss"></style>
