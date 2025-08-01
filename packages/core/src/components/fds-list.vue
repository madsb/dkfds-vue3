<template>
  <ul
    v-if="!ordered"
    :class="getListClass">
    <slot />
  </ul>
  <ol
    v-else
    :class="getListClass">
    <slot />
  </ol>
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
   * bordered-list, unstyled-list, nobullet-list, overflow-list
   */
  variant = null,
  ordered = false,
} = defineProps<{
  variant?: 'bordered' | 'unstyled' | 'nobullet' | null;
  ordered?: boolean;
}>();

const getListClass = computed(() => (variant ? `${variant}-list` : ''));
</script>
