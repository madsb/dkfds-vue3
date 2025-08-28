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
import { formId } from '../../composables'

/**
 * Form label component implementing DKFDS v11 label specifications.
 *
 * Provides accessible labels for form controls with automatic association through
 * 'for' attributes, required field indicators, and integration with form group
 * context. Supports both explicit ID binding and automatic ID injection from
 * parent form groups following DKFDS accessibility patterns.
 *
 * @component
 * @example Basic label usage
 * ```vue
 * <FdsLabel forId="email-input">Email Address</FdsLabel>
 * <FdsInput id="email-input" />
 * ```
 *
 * @example Required field with custom text
 * ```vue
 * <FdsLabel
 *   forId="required-field"
 *   :required="true"
 *   requiredText="(obligatorisk)"
 * >
 *   Password
 * </FdsLabel>
 * ```
 *
 * @example Within form group (automatic association)
 * ```vue
 * <FdsFormgroup>
 *   <template #default="{ formid }">
 *     <FdsLabel>Username</FdsLabel>
 *     <FdsInput :id="formid" />
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

export interface FdsLabelProps {
  /**
   * The ID of the form control this label is associated with.
   * If not provided, will use the form ID from parent FdsFormgroup context.
   * @default undefined (uses injected formid)
   */
  forId?: string
  /**
   * Whether the associated field is required.
   * When true, displays the required indicator text after the label.
   * @default false
   */
  required?: boolean
  /**
   * Show required indicator when field is required.
   * Only applies when required prop is true.
   * @default true
   */
  showRequired?: boolean
  /**
   * Text to display for required fields indicator.
   * Follows Danish language conventions by default.
   * @default '(skal udfyldes)'
   */
  requiredText?: string
}

const {
  forId,
  required = false,
  showRequired = true,
  requiredText = '(skal udfyldes)',
} = defineProps<FdsLabelProps>()

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
