<template>
  <a :class="{ 'icon-link': icon }" href="javascript:void(0);">
    <slot />
    <svg v-if="icon" class="icon-svg" aria-hidden="true" focusable="false" tabindex="-1">
      <use :href="`#${icon}`"></use>
    </svg>
  </a>
</template>

<script setup lang="ts">
const { icon = '' } = defineProps<{
  icon?: string
}>()
</script>

<style scoped lang="scss"></style>
