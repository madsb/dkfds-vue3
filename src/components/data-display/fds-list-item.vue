<template>
  <li :class="itemClasses" :role="role" v-bind="$attrs">
    <slot />
  </li>
</template>

<script setup lang="ts">
/**
 * DKFDS List Item Component
 *
 * Komponent til liste elementer - følger DKFDS v11 specifikationer
 * Bruges sammen med fds-list komponenten
 */
import { computed } from 'vue'

export interface FdsListItemProps {
  /**
   * Status af liste element
   * - 'current': Nuværende side/element
   * - 'active': Aktivt element
   * - 'disabled': Deaktiveret element
   */
  variant?: 'current' | 'active' | 'disabled'
  /**
   * Accessibility rolle for liste elementet
   * - 'none': Fjerner liste semantik
   * - undefined: Standard li rolle
   */
  role?: 'none'
  /**
   * Flexbox layout klasser
   */
  flex?: boolean
  /**
   * Justify content between for flex layout
   */
  justifyBetween?: boolean
}

const { variant, role, flex = false, justifyBetween = false } = defineProps<FdsListItemProps>()

const itemClasses = computed(() => {
  const classes: string[] = []

  // Status classes
  if (variant) {
    classes.push(variant)
  }

  // Flex layout classes
  if (flex) {
    classes.push('d-flex')
  }
  if (justifyBetween) {
    classes.push('justify-content-between')
  }

  return classes.length > 0 ? classes.join(' ') : undefined
})
</script>
