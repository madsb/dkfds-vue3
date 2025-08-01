<template>
  <button
    class="button"
    :class="`button-${variant}`">
    <slot />
  </button>
</template>

<script setup lang="ts">
/**
 *
 * Komponent for knap
 * https://designsystem.dk/komponenter/knapper/
 *
 * */
import { FdsVariantEnum } from 'dkfds-vue3-utils';

const { 
  /** Visnings variant */
  variant = FdsVariantEnum.primary,
} = defineProps<{
  variant?: FdsVariantEnum | string;
}>();
</script>

<style scoped lang="scss"></style>
