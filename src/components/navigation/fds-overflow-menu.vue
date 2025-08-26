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

interface Props {
  header?: string
  id?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  position?: 'left' | 'right'
}

const { icon = 'more-vert', position = 'right', iconPosition = 'right', id } = defineProps<Props>()

const emit = defineEmits<{
  open: []
  close: []
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
