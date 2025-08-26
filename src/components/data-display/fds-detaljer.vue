<template>
  <details class="details">
    <summary class="details-summary">
      <slot name="header">
        {{ header }}
      </slot>
    </summary>
    <div class="details-text">
      <slot />
    </div>
  </details>
</template>
<script setup lang="ts">
export interface FdsDetaljerProps {
  /** Overskrift */
  header?: string
}

const {
  /** Overskrift */
  header = 'Mere information',
} = defineProps<FdsDetaljerProps>()
</script>
