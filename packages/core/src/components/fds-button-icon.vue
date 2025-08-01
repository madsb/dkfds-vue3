<template>
  <button class="button" :class="`button-${variant}`">
    <svg v-if="!right && icon" class="icon-svg" focusable="false" aria-hidden="true">
      <use v-bind="{ href: `#${icon}` }" />
    </svg>
    <slot />
    <svg v-if="right" class="icon-svg rightside-icon" focusable="false" aria-hidden="true">
      <use v-bind="{ href: `#${icon}` }" />
    </svg>
  </button>
</template>

<script setup lang="ts">
/**
 *
 * Komponent for knap med icon
 * https://designsystem.dk/komponenter/knapper/
 *
 * */

import { FdsVariantEnum } from 'dkfds-vue3-utils';

const {
  /** Visnings variant */
  variant = 'secondary',
  /** Ikon som string */
  icon = 'pencil',
  /** Højre stillet ikon */
  right = false,
} = defineProps<{
  variant?: FdsVariantEnum | string;
  icon?: string;
  right?: boolean;
}>();
</script>

<style scoped lang="scss"></style>
