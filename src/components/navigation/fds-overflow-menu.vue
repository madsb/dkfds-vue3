<template>
  <div :class="['overflow-menu', positionClass]">
    <button
      :id="buttonId"
      ref="buttonRef"
      class="button-overflow-menu js-dropdown"
      :data-js-target="menuId"
      :aria-expanded="isOpen"
      :aria-controls="menuId"
      aria-haspopup="true"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <slot name="icon-left">
        <fds-ikon
          v-if="iconPosition === 'left'"
          :icon="icon"
          :decorative="true"
          class="mr-2"
          style="pointer-events: none"
        />
      </slot>
      <slot name="header">
        {{ header || 'Overflow menu' }}
      </slot>
      <slot name="icon-right">
        <fds-ikon
          v-if="iconPosition === 'right'"
          :icon="icon"
          :decorative="true"
          style="pointer-events: none"
        />
      </slot>
    </button>
    <div
      :id="menuId"
      ref="menuRef"
      :class="['overflow-menu-inner', { collapsed: !isOpen }]"
      :aria-hidden="!isOpen"
    >
      <ul v-if="$slots.default" class="overflow-list">
        <slot />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formId } from '../../composables'
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Overflow menu component implementing DKFDS v11 overflow menu specifications.
 *
 * Provides a collapsible menu for additional actions or options when space is limited.
 * Features keyboard navigation, click-outside-to-close behavior, proper ARIA attributes,
 * and customizable positioning. Commonly used for action menus, settings, or additional
 * navigation options that don't fit in the main interface.
 *
 * @component
 * @example Basic overflow menu
 * ```vue
 * <fds-overflow-menu header="Actions">
 *   <li><a href="/edit">Edit</a></li>
 *   <li><a href="/delete">Delete</a></li>
 *   <li><a href="/share">Share</a></li>
 * </fds-overflow-menu>
 * ```
 *
 * @example Custom icon and positioning
 * ```vue
 * <fds-overflow-menu
 *   header="More options"
 *   icon="more-horiz"
 *   icon-position="left"
 *   position="left"
 *   @open="trackMenuOpen"
 * >
 *   <li><button @click="handleAction">Custom Action</button></li>
 *   <li><button @click="anotherAction">Another Action</button></li>
 * </fds-overflow-menu>
 * ```
 *
 * @example With custom icon content
 * ```vue
 * <fds-overflow-menu position="right">
 *   <template #icon-right>
 *     <fds-ikon icon="expand-more" />
 *   </template>
 *   <template #header>
 *     Options
 *   </template>
 *   <li><a href="/option1">Option 1</a></li>
 *   <li><a href="/option2">Option 2</a></li>
 * </fds-overflow-menu>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/navigation/} DKFDS Navigation Documentation
 */

export interface FdsOverflowMenuProps {
  /**
   * Header text for the menu button
   * Visible text displayed on the menu trigger button.
   * @default 'Overflow menu'
   */
  header?: string
  /**
   * Unique identifier for the menu
   * Auto-generated if not provided. Used for ARIA relationships.
   */
  id?: string
  /**
   * Icon identifier for the menu button
   * DKFDS icon to display on the menu button.
   * @default 'more-vert'
   */
  icon?: string
  /**
   * Position of the icon relative to header text
   * Controls whether icon appears before or after the header text.
   * @values 'left', 'right'
   * @default 'right'
   */
  iconPosition?: 'left' | 'right'
  /**
   * Menu dropdown positioning
   * Controls which side of the button the menu appears on.
   * @values 'left', 'right'
   * @default 'right'
   */
  position?: 'left' | 'right'
}

const {
  icon = 'more-vert',
  position = 'right',
  iconPosition = 'right',
  id,
} = defineProps<FdsOverflowMenuProps>()

const emit = defineEmits<{
  /**
   * Emitted when the overflow menu opens
   * Useful for tracking menu usage or triggering related UI updates.
   */
  open: []
  /**
   * Emitted when the overflow menu closes
   * Triggered by clicking outside, pressing Escape, or programmatic close.
   */
  close: []
  /**
   * Emitted when menu state toggles
   * Provides the new open/closed state for external state management.
   *
   * @param isOpen - Whether the menu is now open (true) or closed (false)
   */
  toggle: [isOpen: boolean]
}>()

const { formid } = formId(id, true)

const buttonRef = ref<HTMLButtonElement>()
const menuRef = ref<HTMLDivElement>()
const isOpen = ref(false)

const buttonId = computed(() => `button_${formid.value}`)
const menuId = computed(() => formid.value)
const positionClass = computed(() => {
  return position === 'left' ? 'overflow-menu--open-left' : 'overflow-menu--open-right'
})

const open = () => {
  isOpen.value = true
  emit('open')
  emit('toggle', true)
}

const close = () => {
  isOpen.value = false
  emit('close')
  emit('toggle', false)
}

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    close()
    buttonRef.value?.focus()
  }
}

const handleClickOutside = (event: Event) => {
  if (
    isOpen.value &&
    buttonRef.value &&
    menuRef.value &&
    !buttonRef.value.contains(event.target as Node) &&
    !menuRef.value.contains(event.target as Node)
  ) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Navigation-specific overflow menu styles */
.nav-primary .overflow-menu .icon-svg {
  display: none;
}

@media (min-width: 992px) {
  .nav-primary .overflow-menu .icon-svg {
    display: inline-block;
  }

  .nav-primary .overflow-menu .button-overflow-menu[aria-expanded='false'] {
    background-image: none;
    background-repeat: no-repeat;
    background-position: right 1rem center;
  }

  .nav-primary .overflow-menu .button-overflow-menu[aria-expanded='true'] {
    color: white;

    .icon-svg {
      fill: white;
    }
  }

  .nav-primary .overflow-menu .button-overflow-menu[aria-expanded='true'] {
    background-image: none;
    background-color: white;
  }

  .nav-primary .overflow-menu .button-overflow-menu span {
    padding-right: 0px;
  }
}
</style>
