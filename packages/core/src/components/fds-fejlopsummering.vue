<template>
  <fds-alert
    class="top-space"
    role="alert"
    aria-atomic="true"
    variant="error"
    show-icon
    :closeable="false"
  >
    <slot v-if="$slots.header || header" name="header">
      <p class="alert-heading">
        {{ header }}
      </p>
    </slot>
    <slot />
  </fds-alert>
</template>

<script setup lang="ts">
import FdsAlert from './fds-alert.vue'

const { header = 'Fejlopsummering' } = defineProps<{
  header?: string
}>()
</script>

<style scoped lang="scss"></style>
