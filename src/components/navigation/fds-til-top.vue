<template>
  <a
    v-show="isVisible"
    ref="backToTopRef"
    class="button back-to-top-button d-print-none"
    href="#top"
    @click="scrollToTop"
  >
    <fds-ikon icon="arrow-upward" :decorative="true" />
    <span class="sr-only">{{ screenReaderText }}</span>
    <span class="d-none d-md-inline-block" aria-hidden="true">
      <slot>{{ visibleText }}</slot>
    </span>
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Tilbage til toppen component
 * DKFDS v11 compliant implementation
 *
 * Features:
 * - Shows after scrolling 2 screen heights
 * - Responsive display (icon-only on mobile, with text on desktop)
 * - Smooth scroll to top functionality
 * - Proper accessibility attributes
 */

export interface FdsTilTopProps {
  /** Screen reader text for accessibility */
  screenReaderText?: string
  /** Visible text shown on desktop */
  visibleText?: string
  /** Custom scroll threshold in pixels (default: 2 screen heights) */
  threshold?: number
}

const props = withDefaults(defineProps<FdsTilTopProps>(), {
  screenReaderText: 'Til toppen af siden',
  visibleText: 'Til toppen',
  threshold: undefined,
})

const backToTopRef = ref<HTMLAnchorElement>()
const isVisible = ref(false)

let scrollThreshold = props.threshold

const updateVisibility = () => {
  if (scrollThreshold === undefined) {
    // Calculate 2 screen heights on first scroll
    scrollThreshold = window.innerHeight * 2
  }

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isVisible.value = scrollTop > scrollThreshold
}

const scrollToTop = (event: Event) => {
  event.preventDefault()

  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateVisibility, { passive: true })
  window.addEventListener(
    'resize',
    () => {
      // Recalculate threshold on resize if using default
      if (props.threshold === undefined) {
        scrollThreshold = window.innerHeight * 2
      }
      updateVisibility()
    },
    { passive: true },
  )

  // Check initial state
  updateVisibility()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
  window.removeEventListener('resize', updateVisibility)
})
</script>

<style scoped lang="scss">
// Component uses DKFDS CSS classes for styling
// No additional styles needed as DKFDS handles positioning and appearance
</style>
