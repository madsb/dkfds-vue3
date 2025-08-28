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
import { formId } from '../../composables'

/**
 * Form group component implementing DKFDS v11 form structure specifications.
 *
 * Provides semantic grouping for form controls with integrated validation state management,
 * accessibility features, and context for child components. Automatically handles
 * aria-describedby relationships, validation styling, and ID management following
 * DKFDS accessibility patterns.
 *
 * @component
 * @example Basic form group with input
 * ```vue
 * <FdsFormgroup :isValid="isValid">
 *   <template #default="{ formid, ariaDescribedby, isValid }">
 *     <FdsLabel :forId="formid">Email</FdsLabel>
 *     <FdsHint>Enter your email address</FdsHint>
 *     <FdsInput
 *       :id="formid"
 *       :aria-describedby="ariaDescribedby"
 *       :isValid="isValid"
 *     />
 *     <FdsFejlmeddelelse v-if="!isValid">Please enter a valid email</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @example Form group with validation
 * ```vue
 * <FdsFormgroup :id="'user-email'" :isValid="emailValid">
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel :forId="formid" :required="true">Email Address</FdsLabel>
 *     <FdsHint>We'll use this to send you updates</FdsHint>
 *     <FdsInput v-model="email" :id="formid" :aria-describedby="ariaDescribedby" />
 *     <FdsFejlmeddelelse>Please enter a valid email address</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

export interface FdsFormgroupProps {
  /**
   * Unique identifier for the form group.
   * If not provided, a unique ID will be generated automatically.
   * Used as the base for generating hint and error element IDs.
   * @default undefined (auto-generated)
   */
  id?: string
  /**
   * Validation state of the form group.
   * When false, applies 'form-error' class and sets aria-invalid="true".
   * Affects styling and accessibility attributes for child form controls.
   * @default true
   */
  isValid?: boolean
}

const { id, isValid = true } = defineProps<FdsFormgroupProps>()

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
