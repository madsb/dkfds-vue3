<template>
  <span v-if="showError" class="form-error-message">
    <span class="sr-only">Fejl: </span>
    <slot>
      {{ compErrorMessage }}
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed, inject, ref, useSlots, isRef, type Ref } from 'vue'

const { auto = true } = defineProps<{
  auto?: boolean
}>()

const slots = useSlots()

const injErrorMessage = inject<Ref<string | null> | string | null>('provideErrorMessage', null)
const injIsValid = inject<Ref<boolean> | boolean>('provideIsValid', true)

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
</script>

<style scoped lang="scss"></style>
