<template>
  <li :class="liClass">
    <a
      :href="href || '#'"
      class="nav-link"
      :class="{ current: isCurrent }"
      :aria-current="isCurrent ? 'page' : undefined"
      @click="navigate($event)"
    >
      <div v-if="hint">
        <span>
          <template v-if="index !== null">{{ `${index}. ` }}</template>
          <slot />
        </span>
        <span class="sidenav-information">
          {{ hint }}
        </span>
      </div>
      <span v-else>
        <template v-if="index !== null">{{ `${index}. ` }}</template>
        <slot />
      </span>
    </a>
    <slot v-if="$slots.submenu" name="submenu" />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  active?: boolean
  href?: string
  index?: number | null
  current?: boolean
  expanded?: boolean
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  current: false,
  expanded: false,
  index: null
})

const emit = defineEmits<{
  navigate: [id?: string]
  click: [event: MouseEvent]
}>()

const liClass = computed(() => {
  const classes: string[] = []
  // 'active' class indicates the parent menu item has an expanded submenu
  if (props.expanded || (props.active && slots.submenu)) {
    classes.push('active')
  }
  return classes.length > 0 ? classes.join(' ') : undefined
})

const isCurrent = computed(() => {
  // 'current' class on the link indicates the current page
  return props.current || (props.active && !slots.submenu)
})

const navigate = (event: MouseEvent) => {
  if (!props.href || props.href === '#') {
    event.preventDefault()
  }
  emit('click', event)
  if (props.id) {
    emit('navigate', props.id)
  }
}

const slots = defineSlots<{
  default: () => any
  submenu?: () => any
}>()
</script>

<style scoped lang="scss"></style>
