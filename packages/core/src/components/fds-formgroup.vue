<template>
  <div
    :key="formid"
    class="form-group"
    :class="{ 'form-error': compValid === false }"
    :aria-invalid="compValid === false ? 'true' : undefined"
  >
    <slot :formid="formid" :ariaDescribedby="ariaDescribedby" :isValid="compValid" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide, ref } from 'vue'
import { formId } from 'dkfds-vue3-utils'

interface Props {
  /**
   * Unique identifier for the form group.
   * If not provided, a unique ID will be generated automatically.
   */
  id?: string
  /**
   * Validation state of the form group.
   * When false, the form-error class is applied and aria-invalid is set.
   */
  isValid?: boolean
}

const { id, isValid = true } = defineProps<Props>()

/**
 * Form id der bruges i slots
 * eg. label for input element
 */
const { formid } = formId(id, true)

/**
 * Generate IDs for hint and error elements following DKFDS v11 naming conventions
 */
const hintId = computed(() => `${formid.value}-hint`)
const errorId = computed(() => `${formid.value}-error`)

/**
 * Build aria-describedby value for input elements
 * Combines hint and error IDs when applicable according to DKFDS v11 accessibility requirements
 */
const ariaDescribedby = computed(() => {
  const ids: string[] = []

  // Add hint ID (always present for consistency)
  ids.push(hintId.value)

  // Add error ID when invalid for proper screen reader support
  if (compValid.value === false) {
    ids.push(errorId.value)
  }

  return ids.join(' ').trim()
})

/**
 * Provide context for child components following DKFDS v11 integration patterns
 */
provide('formid', formid)
provide('hintId', hintId)
provide('errorId', errorId)
provide('ariaDescribedby', ariaDescribedby)
provide(
  'isValid',
  computed(() => compValid.value),
)

// Handle validation state from parent providers (e.g., form validation)
const injIsValid = ref<boolean | null>(inject('provideIsValid', null))

/**
 * Computed validation state that considers both local prop and injected state
 * Prioritizes injected state for form-wide validation coordination
 */
const compValid = computed(() => injIsValid.value ?? isValid)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
