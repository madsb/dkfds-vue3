<template>
  <li :class="[{ 'active current': active }]">
    <a
      :href="href || '#'"
      class="nav-link"
      :aria-current="active ? 'page' : undefined"
      @click="navigate($event)"
    >
      <span>
        <template v-if="index !== null">{{ `${index}. ` }}</template>
        <slot />
      </span>

      <fds-ikon v-if="icon" :icon="icon" class="sidenav-icon" :decorative="true" />
      <p v-if="hint" class="sidenav-information">
        {{ hint }}
      </p>
    </a>
    <ul v-if="$slots.submenu">
      <slot name="submenu" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import FdsIkon from './fds-ikon.vue'

interface Props {
  id?: string
  active?: boolean
  icon?: string
  hint?: string
  href?: string
  index?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  index: null
})

const emit = defineEmits<{
  navigate: [id?: string]
  click: [event: MouseEvent]
}>()

const navigate = (event: MouseEvent) => {
  if (!props.href || props.href === '#') {
    event.preventDefault()
  }
  emit('click', event)
  if (props.id) {
    emit('navigate', props.id)
  }
}
</script>

<style scoped lang="scss"></style>
