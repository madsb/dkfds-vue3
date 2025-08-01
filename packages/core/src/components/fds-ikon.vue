<template>
  <svg
    class="icon-svg"
    focusable="false"
    aria-hidden="true">
    <use v-bind="{ 'xlink:href': `#${icon}` }" />
  </svg>
</template>

<script setup lang="ts">

const {
  /** Ikon som string */
  icon = 'home',
} = defineProps<{
  icon?: string;
}>();
</script>
