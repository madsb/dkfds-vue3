<template>
  <div
    class="card-group"
    :class="getClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 *
 * Card-group -> Komponent for at wrappe cards
 * https://designsystem.dk/komponenter/cards/
 *
 * */
import { computed } from 'vue';

const {
  type = null,
} = defineProps<{
  type?: 'deck' | 'columns' | null;
}>();

const getClass = computed(() => type ?? 'normal');
</script>
