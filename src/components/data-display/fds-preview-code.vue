<template>
  <div class="component-code" aria-hidden="true">
    <legend v-if="header">
      {{ header }}
    </legend>
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface FdsPreviewCodeProps {
  header?: string | null
}

const { header = null } = defineProps<FdsPreviewCodeProps>()
</script>
