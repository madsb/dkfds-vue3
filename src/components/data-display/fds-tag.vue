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
 * Tag component implementing DKFDS v11 tag specifications.
 * 
 * Interactive labels for categorization, filtering, and content organization.
 * Unlike badges, tags are typically user-interactive elements supporting selection,
 * removal, and filtering operations. Designed for content management interfaces.
 * 
 * @component
 * @example Basic tags
 * ```vue
 * <FdsTag @click="handleTagClick">Category</FdsTag>
 * <FdsTag @click="handleTagClick">Topic</FdsTag>
 * ```
 * 
 * @example Removable tags with close icon
 * ```vue
 * <FdsTag 
 *   v-for="tag in tags" 
 *   :key="tag.id"
 *   icon="close"
 *   @click="removeTag(tag.id)"
 * >
 *   {{ tag.name }}
 * </FdsTag>
 * ```
 * 
 * @example Tags with custom icons
 * ```vue
 * <FdsTag icon="star" @click="toggleFavorite">
 *   Favorite
 * </FdsTag>
 * <FdsTag icon="bookmark" @click="toggleBookmark">
 *   Bookmark
 * </FdsTag>
 * ```
 * 
 * @example Tag filtering interface
 * ```vue
 * <div class="tag-filter">
 *   <FdsTag 
 *     v-for="filter in availableFilters" 
 *     :key="filter.id"
 *     :class="{ active: activeFilters.includes(filter.id) }"
 *     @click="toggleFilter(filter.id)"
 *   >
 *     {{ filter.label }}
 *   </FdsTag>
 * </div>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/tags/} DKFDS Tag Documentation
 */

import { formId } from '../../composables'
import { computed, useSlots } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

export interface FdsTagProps {
  /**
   * Icon to display within the tag (typically 'close' for removable tags)
   * When provided, adds visual indicator for the tag's action
   * Common icons: 'close', 'star', 'bookmark', 'check'
   */
  icon?: string

  /**
   * Unique identifier for the tag button element
   * Auto-generated if not provided for form and accessibility purposes
   */
  id?: string
}

const { icon, id } = defineProps<FdsTagProps>()

const slots = useSlots()

const emit = defineEmits<{
  /**
   * Emitted when the tag button is clicked
   * Provides the form ID for identifying which tag was interacted with
   * @param formId - The unique form ID of the clicked tag
   */
  click: [formId: string]
}>()

const { formid } = formId(id, true)

// Check if tag has an icon (either via prop or slot)
const hasIcon = computed(() => icon || slots.icon)

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
