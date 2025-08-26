<template>
  <div class="card-group" :class="getClass">
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
import { computed } from 'vue'

export interface FdsCardGroupProps {
  /** Card layout type */
  type?: 'deck' | 'columns' | null
}

const { type = null } = defineProps<FdsCardGroupProps>()

const getClass = computed(() => type ?? 'normal')
</script>
