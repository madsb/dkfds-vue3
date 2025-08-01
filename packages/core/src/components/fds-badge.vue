<template>
  <span
    class="badge"
    :class="`${getSizeClass} ${getVariantClass}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 *
 * Komponent til Badge
 * https://designsystem.dk/komponenter/badges/
 *
 * */
import { computed } from 'vue';

const {
  size = 'large',
  /** Variant 'success' | 'info' | 'warning' | 'error' */
  variant = null,
} = defineProps<{
  size?: 'small' | 'large';
  variant?: 'success' | 'info' | 'warning' | 'error' | null;
}>();

const getSizeClass = computed(() => `badge-${size}`);
const getVariantClass = computed(() => (variant ? `badge-${variant}` : ''));
</script>

<style scoped lang="scss"></style>
