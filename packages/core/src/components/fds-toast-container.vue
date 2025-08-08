<template>
  <div
    :id="id"
    class="toast-container"
    aria-live="assertive"
    aria-atomic="false"
    aria-relevant="additions"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * DKFDS Toast Container Component
 * https://designsystem.dk/komponenter/toastbesked/
 */
import { generateId } from 'dkfds-vue3-utils'

interface Props {
  /** Unique identifier for the container */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => generateId('toast-container').value,
})
</script>

<style scoped lang="scss">
// Container styles handled by DKFDS CSS
// No custom styles needed as we're using DKFDS classes
</style>
