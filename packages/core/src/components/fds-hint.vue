<template>
  <span :id="computedId" class="form-hint">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref } from 'vue'

const { id } = defineProps<{
  id?: string
}>()

// Inject the hintId from formgroup if available
const injectedHintId = inject<string | Ref<string> | undefined>('hintId', undefined)

// Use provided id prop, or fallback to injected hintId
const computedId = computed((): string | undefined => {
  if (id) return id
  if (injectedHintId) {
    return isRef(injectedHintId) ? injectedHintId.value : injectedHintId as string
  }
  return undefined
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
