<template>
  <nav v-if="variant === 'sidemenu'" :aria-label="ariaLabel">
    <ul :class="cssClass">
      <slot />
    </ul>
  </nav>
  <ul v-else :class="cssClass">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface FdsMenuProps {
  variant?: 'sidemenu' | 'submenu'
  ariaLabel?: string
}

const props = withDefaults(defineProps<FdsMenuProps>(), {
  variant: 'sidemenu',
})

const cssClass = computed(() => {
  return props.variant === 'submenu' ? '' : 'sidemenu'
})
</script>

<style scoped lang="scss"></style>
