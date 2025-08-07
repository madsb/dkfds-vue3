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
    <svg v-if="icon && !iconRight" class="icon-svg" focusable="false" aria-hidden="true">
      <use :href="`#${icon}`"></use>
    </svg>
    <slot />
    <svg v-if="icon && iconRight" class="icon-svg" focusable="false" aria-hidden="true">
      <use :href="`#${icon}`"></use>
    </svg>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Icon identifier from DKFDS icon set */
    icon?: string
    /** Position icon on the right side of text */
    iconRight?: boolean
    /** URL for link navigation */
    href?: string
    /** Element type - auto-detected from href if not specified */
    type?: 'link' | 'button'
    /** Title attribute for accessibility */
    title?: string
    /** Disabled state (only for button type) */
    disabled?: boolean
    /** Target attribute for links */
    target?: '_blank' | '_self' | '_parent' | '_top'
    /** Rel attribute for links */
    rel?: string
  }>(),
  {
    type: undefined,
    iconRight: false,
    disabled: false,
  },
)

const emit = defineEmits<{
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
