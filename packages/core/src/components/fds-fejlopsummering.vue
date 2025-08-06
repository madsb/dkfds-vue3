<template>
  <nav v-if="hasErrors" :aria-labelledby="headingId">
    <div
      class="alert alert-error mt-0 mb-8"
      role="alert"
    >
      <svg class="icon-svg alert-icon" aria-label="Fejl" focusable="false">
        <use href="#error"></use>
      </svg>
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
import { computed, provide, ref, onMounted, onUnmounted, toValue } from 'vue'
import { generateId } from 'dkfds-vue3-utils'

export interface ErrorItem {
  id: string
  message: string
  element?: HTMLElement
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
} = defineProps<{
  header?: string
  id?: string
  errors?: ErrorItem[]
  autoCollect?: boolean
}>()

const emit = defineEmits<{
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
