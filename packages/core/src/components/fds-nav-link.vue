<template>
  <a v-if="!disabled" href="#" class="nav-link" role="menuitem" @click="$event.preventDefault()">
    <span>
      <slot />
    </span>
  </a>
  <div v-else class="nav-link nav-link-disabled disabled">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
}>()
</script>

<style scoped lang="scss"></style>
