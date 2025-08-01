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


const {
  /** Overskrift */
  header = 'Mere information',
} = defineProps<{
  header?: string;
}>();
</script>
