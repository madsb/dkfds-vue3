<template>
  <svg
    class="icon-svg"
    :class="{ 'inline-svg': inline }"
    focusable="false"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="ariaLabel"
    :role="role"
  >
    <use :href="`#${icon}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface FdsIkonProps {
  /** Ikon navn (Material Design icon ID) */
  icon?: string
  /** Om ikonet skal justeres til teksthøjde (inline) */
  inline?: boolean
  /** Aria label for screen readers (hvis ikonet formidler mening) */
  ariaLabel?: string
  /** Om ikonet er dekorativt (standard: true) */
  decorative?: boolean
}

const props = withDefaults(
  defineProps<FdsIkonProps>(),
  {
    icon: 'home',
    inline: false,
    decorative: true,
  },
)

// Computed properties for accessibility
const role = computed(() => (!props.decorative && props.ariaLabel ? 'img' : undefined))
</script>
