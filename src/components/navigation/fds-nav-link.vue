<template>
  <a
    v-if="!disabled"
    :href="href"
    class="nav-link"
    :aria-current="current ? 'page' : undefined"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <span>
      <slot />
    </span>
    <fds-ikon v-if="icon" :icon="icon" class="sidenav-icon" :decorative="true" />
    <p v-if="hint" class="sidenav-information">
      {{ hint }}
    </p>
  </a>
  <span v-else class="nav-link nav-link-disabled" aria-disabled="true">
    <span>
      <slot />
    </span>
    <fds-ikon v-if="icon" :icon="icon" class="sidenav-icon" :decorative="true" />
    <p v-if="hint" class="sidenav-information">
      {{ hint }}
    </p>
  </span>
</template>

<script setup lang="ts">
import FdsIkon from '../layout/fds-ikon.vue'

interface Props {
  href?: string
  current?: boolean
  disabled?: boolean
  icon?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
  current: false,
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.href === '#') {
    event.preventDefault()
  }
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped lang="scss"></style>
