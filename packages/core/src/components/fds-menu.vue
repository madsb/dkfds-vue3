<template>
  <ul
    :class="cssClass"
    role="menu">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const {
  variant = null,
} = defineProps<{
  variant?: 'venstremenu' | 'trin' | 'submenu' | null;
}>();

const cssClass = computed(() => {
  if (variant === 'submenu') {
    return 'sidenav-sub_list';
  }
  return 'sidenav-list';
});
</script>

<style scoped lang="scss"></style>
