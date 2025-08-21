<template>
  <nav :aria-label="ariaLabel">
    <ul :class="cssClass">
      <slot />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'sidemenu' | 'submenu'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'sidemenu',
  ariaLabel: 'Navigation'
})

const cssClass = computed(() => {
  return 'sidemenu'
})
</script>

<style scoped lang="scss"></style>
