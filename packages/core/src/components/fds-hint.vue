<template>
  <span :id="computedId" class="form-hint">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref } from 'vue'

interface Props {
  /**
   * Unique ID for the hint element.
   * If not provided, will use the injected hintId from fds-formgroup.
   */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
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
