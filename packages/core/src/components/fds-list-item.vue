<template>
  <li
    v-if="!ordered"
    :class="getListClass">
    <slot />
  </li>
</template>

<script setup lang="ts">
/**
 *
 * Komponent til generel brug af lister (UL)
 *
 * */
import { computed } from 'vue';

const {
  /**
   * Type af liste
   * Mulige hjælpe css class:
   * current, active, disabled
   * class="d-flex justify-content-between"
   * role="none"
   */
  variant = null,
  ordered = false,
} = defineProps<{
  variant?: 'bordered' | 'unstyled' | 'nobullet' | null;
  ordered?: boolean;
}>();

const getListClass = computed(() => (variant ? `${variant}-list` : ''));
</script>
