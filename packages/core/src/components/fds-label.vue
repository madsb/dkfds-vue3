<template>
  <label class="form-label" :for="computedFor">
    <slot />
    <span v-if="required && showRequired" class="form-required-marker">
      {{ requiredText }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref } from 'vue'
import { formId } from '@madsb/dkfds-vue3-utils'

interface Props {
  /** The ID of the form control this label is associated with */
  forId?: string
  /** Whether the associated field is required */
  required?: boolean
  /** Show required indicator (defaults to true if required is true) */
  showRequired?: boolean
  /** Text to display for required fields (defaults to Danish pattern) */
  requiredText?: string
}

const {
  forId,
  required = false,
  showRequired = true,
  requiredText = '(skal udfyldes)',
} = defineProps<Props>()

// Try to get form ID from formgroup context first, then use prop, then generate
const injectedFormId = inject<string | Ref<string> | undefined>('formid', undefined)
const { formid } = formId(forId)

const computedFor = computed((): string => {
  // Use injected formid from formgroup if available
  if (injectedFormId) {
    return isRef(injectedFormId) ? injectedFormId.value : injectedFormId
  }
  // Otherwise use formId composable result
  return formid.value
})
</script>

<style scoped lang="scss"></style>
