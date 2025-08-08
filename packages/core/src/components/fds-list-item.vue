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

interface Props {
  /**
   * Status af liste element
   * - 'current': Nuværende side/element
   * - 'active': Aktivt element
   * - 'disabled': Deaktiveret element
   */
  variant?: 'current' | 'active' | 'disabled' | null
  /**
   * Accessibility rolle for liste elementet
   * - 'none': Fjerner liste semantik
   * - null: Standard li rolle
   */
  role?: 'none' | null
  /**
   * Flexbox layout klasser
   */
  flex?: boolean
  /**
   * Justify content between for flex layout
   */
  justifyBetween?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: null,
  role: null,
  flex: false,
  justifyBetween: false,
})

const itemClasses = computed(() => {
  const classes: string[] = []

  // Status classes
  if (props.variant) {
    classes.push(props.variant)
  }

  // Flex layout classes
  if (props.flex) {
    classes.push('d-flex')
  }
  if (props.justifyBetween) {
    classes.push('justify-content-between')
  }

  return classes.length > 0 ? classes.join(' ') : undefined
})
</script>
