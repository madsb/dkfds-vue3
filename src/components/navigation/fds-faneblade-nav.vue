<template>
  <nav class="tab-container" :aria-label="ariaLabel">
    <ul class="tab-list">
      <slot />
    </ul>
  </nav>
</template>

<script setup lang="ts">
export interface FdsFanebladeNavProps {
  /** ARIA label for the navigation */
  ariaLabel?: string
}

defineProps<FdsFanebladeNavProps>()
</script>

<style scoped lang="scss"></style>
