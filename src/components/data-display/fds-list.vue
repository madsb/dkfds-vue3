<template>
  <ul v-if="!ordered" :class="listClasses" v-bind="$attrs">
    <slot />
  </ul>
  <ol v-else :class="listClasses" v-bind="$attrs">
    <slot />
  </ol>
</template>

<script setup lang="ts">
/**
 * DKFDS List Component
 *
 * Komponent til generel brug af lister følger DKFDS v11 specifikationer
 * Understøtter både ordnede (ol) og uordnede (ul) lister
 */
import { computed } from 'vue'

export interface FdsListProps {
  /**
   * Type af liste variant
   * - 'bordered': Kantede lister med linjer mellem elementer
   * - 'unstyled': Lister uden standard styling
   * - 'nobullet': Lister uden punkttegn eller numre
   * - 'overflow': Lister til overflow menuer
   */
  variant?: 'bordered' | 'unstyled' | 'nobullet' | 'overflow' | null
  /**
   * Om listen skal være ordnet (ol) eller uordnet (ul)
   */
  ordered?: boolean
  /**
   * Tilføj margin top 0 klasse
   */
  noTopMargin?: boolean
  /**
   * Tilføj margin bottom 0 klasse
   */
  noBottomMargin?: boolean
}

const props = withDefaults(defineProps<FdsListProps>(), {
  variant: null,
  ordered: false,
  noTopMargin: false,
  noBottomMargin: false,
})

const listClasses = computed(() => {
  const classes: string[] = []

  // Variant classes
  if (props.variant) {
    classes.push(`${props.variant}-list`)
  }

  // Margin utilities
  if (props.noTopMargin) {
    classes.push('mt-0')
  }
  if (props.noBottomMargin) {
    classes.push('mb-0')
  }

  return classes.join(' ')
})
</script>
