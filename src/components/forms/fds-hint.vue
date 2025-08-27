<template>
  <span :id="computedId" class="form-hint">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref } from 'vue'

/**
 * Form hint component implementing DKFDS v11 hint text specifications.
 * 
 * Provides supplementary information for form controls with proper accessibility
 * attributes and ID management. Automatically integrates with form groups to
 * ensure proper aria-describedby relationships for screen readers and assistive
 * technologies following DKFDS accessibility patterns.
 * 
 * @component
 * @example Basic hint usage
 * ```vue
 * <FdsHint id="email-hint">Enter a valid email address</FdsHint>
 * <FdsInput aria-describedby="email-hint" />
 * ```
 * 
 * @example Within form group (automatic integration)
 * ```vue
 * <FdsFormgroup>
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel>Email</FdsLabel>
 *     <FdsHint>We'll never share your email with anyone else</FdsHint>
 *     <FdsInput :id="formid" :aria-describedby="ariaDescribedby" />
 *   </template>
 * </FdsFormgroup>
 * ```
 * 
 * @example Custom hint with specific ID
 * ```vue
 * <FdsHint id="password-requirements">
 *   Password must be at least 8 characters with one number
 * </FdsHint>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

export interface FdsHintProps {
  /**
   * Unique ID for the hint element.
   * If not provided, will use the injected hintId from parent FdsFormgroup.
   * The ID is used for aria-describedby relationships with form controls.
   * @default undefined (uses injected hintId)
   */
  id?: string
}

const props = withDefaults(defineProps<FdsHintProps>(), {
  id: undefined,
})

// Inject the hintId from formgroup if available
const injectedHintId = inject<string | Ref<string> | undefined>('hintId', undefined)

// Use provided id prop, or fallback to injected hintId
const computedId = computed((): string | undefined => {
  if (props.id) return props.id
  if (injectedHintId) {
    return isRef(injectedHintId) ? injectedHintId.value : (injectedHintId as string)
  }
  return undefined
})
</script>
