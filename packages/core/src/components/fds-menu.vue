<template>
  <nav :aria-label="ariaLabel || 'Navigation'">
    <ul :class="cssClass">
      <slot />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const {
  variant = null,
  ariaLabel,
} = defineProps<{
  variant?: 'venstremenu' | 'trin' | 'submenu' | null;
  ariaLabel?: string;
}>();

const cssClass = computed(() => {
  if (variant === 'submenu') {
    return 'sidemenu';
  }
  return 'sidemenu';
});
</script>

<style scoped lang="scss"></style>
