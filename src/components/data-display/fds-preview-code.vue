<template>
  <div class="component-code" aria-hidden="true">
    <legend v-if="header">
      {{ header }}
    </legend>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { header = null } = defineProps<{
  header?: string | null
}>()
</script>
