<template>
  <li role="none" :class="[{ 'active current': active }]">
    <a
      :href="`${href ? href : '#'}`"
      role="menuitem"
      class="nav-link"
      :aria-current="active ? 'page' : undefined"
      @click="navigate($event, id)"
    >
      <span>
        <template v-if="index !== null">{{ `${index}. ` }}</template>
        <slot />
      </span>

      <span v-if="icon" class="sidenav-icon">
        <svg class="icon-svg" focusable="false" aria-hidden="true">
          <use :href="`#${icon}`" />
        </svg>
      </span>
      <p v-if="hint && hint.length > 0" class="sidenav-information">
        {{ hint }}
      </p>
    </a>
    <slot name="submenu" />
  </li>
</template>

<script setup lang="ts">
const {
  id,
  active = false,
  icon = null,
  hint = null,
  href = null,
  index = null,
} = defineProps<{
  id: string
  active?: boolean
  icon?: string | null
  hint?: string | null
  href?: string | null
  index?: number | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
  navigate: [key: string]
}>()

const navigate = (event: Event, key: string) => {
  event.preventDefault()
  emit('navigate', key)
}
</script>

<style scoped lang="scss"></style>
