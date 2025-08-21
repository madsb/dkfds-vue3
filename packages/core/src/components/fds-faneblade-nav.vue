<template>
  <nav class="tab-container" :aria-label="ariaLabel">
    <ul class="tab-list">
      <slot />
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  /** ARIA label for the navigation */
  ariaLabel?: string
}>()
</script>

<style scoped lang="scss"></style>
