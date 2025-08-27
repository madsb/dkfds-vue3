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
 * Back to top component implementing DKFDS v11 tilbage-til-toppen specifications.
 * 
 * Provides smooth scroll-to-top functionality with intelligent visibility management.
 * Appears after user scrolls down 2 screen heights, features responsive design
 * (icon-only on mobile, with text on desktop), and includes proper accessibility
 * attributes. Uses smooth scrolling behavior and automatically manages show/hide states.
 * 
 * @component
 * @example Basic back to top button
 * ```vue
 * <fds-til-top />
 * ```
 * 
 * @example Custom text and threshold
 * ```vue
 * <fds-til-top 
 *   visible-text="Gå til top"
 *   screen-reader-text="Scroll til toppen af siden"
 *   :threshold="1000"
 * />
 * ```
 * 
 * @example Custom content
 * ```vue
 * <fds-til-top screen-reader-text="Tilbage til toppen">
 *   Til toppen
 * </fds-til-top>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/tilbage-til-toppen/} DKFDS Back to Top Documentation
 */

export interface FdsTilTopProps {
  /** 
   * Screen reader text for accessibility
   * Hidden text announced by screen readers when button receives focus.
   * @default 'Til toppen af siden'
   */
  screenReaderText?: string
  /** 
   * Visible text shown on desktop
   * Text displayed alongside the icon on desktop viewport sizes.
   * Can be overridden by slot content.
   * @default 'Til toppen'
   */
  visibleText?: string
  /** 
   * Custom scroll threshold in pixels
   * Distance user must scroll before button becomes visible.
   * If not specified, defaults to 2 screen heights (calculated dynamically).
   */
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
