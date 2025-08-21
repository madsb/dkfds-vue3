<template>
  <button :id="formid" class="tag" :class="{ 'tag-icon': hasIcon }" @click="handleClick">
    <slot />
    <slot name="icon">
      <fds-ikon v-if="icon" :icon="icon" :decorative="true" />
    </slot>
  </button>
</template>

<script setup lang="ts">
/**
 * FDS Tag Component
 *
 * Implementation of DKFDS v11 tags component
 * https://designsystem.dk/komponenter/tags/
 *
 * Tags are used to display secondary, metadata-related information
 * in a concise and contextually relevant manner.
 */

import { formId } from 'dkfds-vue3-utils'
import { computed, useSlots } from 'vue'
import FdsIkon from './fds-ikon.vue'

interface Props {
  /**
   * Optional icon to display (typically 'close' or 'highlight-off')
   * When provided, adds a tag-icon class and displays the icon
   */
  icon?: string | null

  /**
   * Optional ID for the button element
   */
  id?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  icon: null,
  id: null,
})

const slots = useSlots()

const emit = defineEmits<{
  /**
   * Emitted when the tag button is clicked
   * @param formId - The form ID of the clicked tag
   */
  click: [formId: string]
}>()

const { formid } = formId(props.id, true)

// Check if tag has an icon (either via prop or slot)
const hasIcon = computed(() => props.icon || slots.icon)

/**
 * Handle click events on the tag button
 */
const handleClick = () => {
  emit('click', formid.value)
}
</script>

<style scoped lang="scss">
/* Component styles are provided by DKFDS CSS framework */
</style>
