<template>
  <div>
    <a :href="href" class="back-link" @click="handleClick">
      <FdsIkon icon="chevron-left" decorative />
      <slot>Tilbage</slot>
    </a>
  </div>
</template>

<script setup lang="ts">
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Back link component implementing DKFDS v11 tilbage-link specifications.
 *
 * Provides a consistent back navigation pattern for multi-step processes and
 * connected page sequences. Features a chevron icon and customizable text.
 * Should be positioned at the top left, immediately under the header.
 * Do not use together with breadcrumbs as they serve similar purposes.
 *
 * @component
 * @example Basic back link
 * ```vue
 * <fds-tilbage-link @click="goBack">
 *   Tilbage til oversigt
 * </fds-tilbage-link>
 * ```
 *
 * @example Back link with custom href
 * ```vue
 * <fds-tilbage-link
 *   href="/previous-step"
 *   @click="handleBackNavigation"
 * >
 *   Tilbage til forrige trin
 * </fds-tilbage-link>
 * ```
 *
 * @example Browser history integration
 * ```vue\n * <fds-tilbage-link @click="$router.go(-1)">\n *   Tilbage\n * </fds-tilbage-link>\n * ```
 *
 * @see {@link https://designsystem.dk/komponenter/tilbage-link/} DKFDS Back Link Documentation
 */

export interface FdsTilbageLinkProps {
  /**
   * Link destination URL
   * By default uses javascript:void(0); to prevent navigation, allowing
   * the click handler to control the back navigation behavior.
   * @default 'javascript:void(0);'
   */
  href?: string
}

const _props = withDefaults(defineProps<FdsTilbageLinkProps>(), {
  href: 'javascript:void(0);',
})

const emit = defineEmits<{
  /**
   * Emitted when the back link is clicked
   * Use this to implement custom back navigation logic, such as
   * router.go(-1), programmatic navigation, or state management.
   *
   * @param event - The original mouse click event
   */
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
