<template>
  <component
    :is="elementType"
    :href="elementType === 'a' ? href || undefined : undefined"
    :type="elementType === 'button' ? 'button' : undefined"
    :disabled="elementType === 'button' ? disabled : undefined"
    :target="elementType === 'a' && target ? target : undefined"
    :rel="elementType === 'a' && rel ? rel : undefined"
    :title="title"
    class="function-link"
    @click="handleClick"
  >
    <fds-ikon v-if="icon && !iconRight" :icon="icon" :decorative="true" />
    <slot />
    <fds-ikon v-if="icon && iconRight" :icon="icon" :decorative="true" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FdsIkon from './fds-ikon.vue'

/**
 * Function link component implementing DKFDS v11 funktionslink specifications.
 *
 * Versatile link/button component that automatically adapts between anchor and button
 * elements based on props. Supports icons, accessibility attributes, and various
 * link behaviors. Used for functional actions that may or may not navigate to
 * different pages. Auto-detects element type: provides href for links, omit href for buttons.
 *
 * @component
 * @example Basic function link
 * ```vue
 * <fds-funktionslink href="/help">
 *   Get Help
 * </fds-funktionslink>
 * ```
 *
 * @example Button with icon
 * ```vue
 * <fds-funktionslink
 *   type="button"
 *   icon="download"
 *   @click="downloadFile"
 * >
 *   Download
 * </fds-funktionslink>
 * ```
 *
 * @example External link with security
 * ```vue
 * <fds-funktionslink
 *   href="https://external-site.com"
 *   target="_blank"
 *   rel="noopener noreferrer"
 *   icon="open-in-new"
 *   icon-right
 * >
 *   External Resource
 * </fds-funktionslink>
 * ```
 *
 * @example Disabled state
 * ```vue
 * <fds-funktionslink
 *   type="button"
 *   :disabled="!canPerformAction"
 *   icon="edit"
 *   title="Edit is currently disabled"
 * >
 *   Edit Item
 * </fds-funktionslink>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/funktionslink/} DKFDS Function Link Documentation
 */

export interface FdsFunktionslinkProps {
  /**
   * Icon identifier from DKFDS icon set
   * Material Design icon name to display alongside the text.
   */
  icon?: string
  /**
   * Position icon on the right side of text
   * When true, icon appears after text instead of before.
   * @default false
   */
  iconRight?: boolean
  /**
   * URL for link navigation
   * When provided, component renders as anchor element. Omit for button behavior.
   */
  href?: string
  /**
   * Element type - auto-detected from href if not specified
   * Forces specific element type. Auto-detection: href provided = 'link', no href = 'button'.
   * @values 'link', 'button'
   */
  type?: 'link' | 'button'
  /**
   * Title attribute for accessibility
   * Provides additional context or explains the link/button purpose for assistive technology.
   */
  title?: string
  /**
   * Disabled state (only for button type)
   * Prevents interaction when component is rendered as button.
   * @default false
   */
  disabled?: boolean
  /**
   * Target attribute for links
   * Controls where the linked document opens. Use '_blank' for new window/tab.
   * @values '_blank', '_self', '_parent', '_top'
   */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /**
   * Rel attribute for links
   * Security and SEO attributes for links, especially external ones.
   * Use 'noopener noreferrer' for external links with target='_blank'.
   */
  rel?: string
}

const props = withDefaults(defineProps<FdsFunktionslinkProps>(), {
  type: undefined,
  iconRight: false,
  disabled: false,
})

const emit = defineEmits<{
  /**
   * Emitted when the link or button is clicked
   * Fired for both anchor and button variants. For buttons without href,
   * default behavior is prevented automatically.
   *
   * @param event - The original mouse click event
   */
  click: [event: MouseEvent]
}>()

// Auto-detect element type based on props
const elementType = computed(() => {
  if (props.type === 'button') return 'button'
  if (props.type === 'link') return 'a'
  // Auto-detect: use 'a' if href is provided, otherwise 'button'
  return props.href ? 'a' : 'button'
})

const handleClick = (event: MouseEvent) => {
  // Only prevent default for button-type elements without href
  if (!props.href && elementType.value === 'button') {
    event.preventDefault()
  }
  emit('click', event)
}
</script>

<style scoped lang="scss"></style>
