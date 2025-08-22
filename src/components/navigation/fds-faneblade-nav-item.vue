<template>
  <li>
    <a
      :href="href"
      class="tab-button"
      :aria-current="active ? 'true' : undefined"
      @click="handleClick"
    >
      <fds-ikon v-if="icon" :icon="icon" :decorative="true" />
      <span>
        <slot>{{ label }}</slot>
      </span>
    </a>
  </li>
</template>

<script setup lang="ts">
import FdsIkon from '../layout/fds-ikon.vue'

const _props = defineProps<{
  /** Link destination */
  href: string
  /** Label text for the navigation item */
  label?: string
  /** Whether this item is currently active */
  active?: boolean
  /** Optional icon ID */
  icon?: string
}>()

const emit = defineEmits<{
  /** Emitted when the link is clicked */
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped lang="scss"></style>
