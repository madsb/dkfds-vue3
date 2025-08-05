<template>
  <li>
    <a 
      :href="href"
      class="tab-button"
      :aria-current="active ? 'true' : undefined"
      @click="handleClick"
    >
      <svg v-if="icon" class="icon-svg" focusable="false" aria-hidden="true">
        <use :href="`#${icon}`"></use>
      </svg>
      <span>
        <slot>{{ label }}</slot>
      </span>
    </a>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
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