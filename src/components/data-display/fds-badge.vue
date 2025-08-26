<template>
  <component :is="tag" class="badge" :class="getVariantClass">
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * Badge component following DKFDS v11 specifications
 * https://designsystem.dk/komponenter/badges/
 *
 * Used to highlight new or important content
 */
import { computed } from 'vue'

export interface FdsBadgeProps {
  /** HTML tag to use - 'strong' for emphasis, 'span' for regular badges */
  tag?: 'span' | 'strong'
  /** Visual variant for different statuses */
  variant?: 'success' | 'info' | 'warning' | 'error' | null
}

const {
  /** HTML tag to use - 'strong' for emphasis, 'span' for regular badges */
  tag = 'span',
  /** Visual variant for different statuses */
  variant = null,
} = defineProps<FdsBadgeProps>()

const getVariantClass = computed(() => (variant ? `badge-${variant}` : ''))
</script>

<style scoped lang="scss"></style>
