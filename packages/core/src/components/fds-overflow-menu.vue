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
      <span>
        {{ header || 'Overflow menu' }}
        <fds-ikon :icon="icon" :decorative="true" />
      </span>
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
import { formId } from 'dkfds-vue3-utils'
import FdsIkon from './fds-ikon.vue'

interface Props {
  header?: string
  id?: string
  icon?: string
  position?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'more-vert',
  position: 'right',
})

const emit = defineEmits<{
  open: []
  close: []
  toggle: [isOpen: boolean]
}>()

const { formid } = formId(props.id, true)

const buttonRef = ref<HTMLButtonElement>()
const menuRef = ref<HTMLDivElement>()
const isOpen = ref(false)

const buttonId = computed(() => `button_${formid.value}`)
const menuId = computed(() => formid.value)
const positionClass = computed(() => {
  return props.position === 'left' ? 'overflow-menu--open-left' : 'overflow-menu--open-right'
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
