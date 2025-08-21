<template>
  <button
    :id="formid"
    type="button"
    class="toggle-switch"
    :class="toggleSwitchClass"
    role="switch"
    :aria-checked="modelValue ? 'true' : 'false'"
    :aria-describedby="computedAriaDescribedby"
    :disabled="disabled"
    @click="handleToggle"
  >
    <span>
      <slot>{{ modelValue ? onText : offText }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref } from 'vue'
import { formId } from 'dkfds-vue3-utils'

interface Props {
  /** Unique identifier for the toggle switch */
  id?: string | null
  /** The v-model boolean value */
  modelValue?: boolean
  /** Whether the toggle switch is disabled */
  disabled?: boolean
  /** Text to display when toggle is off */
  offText?: string
  /** Text to display when toggle is on */
  onText?: string
  /** Additional CSS classes */
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
  modelValue: false,
  disabled: false,
  offText: 'Fra',
  onText: 'Til',
  class: '',
})

const emit = defineEmits<{
  /** Emitted when toggle state changes */
  'update:modelValue': [value: boolean]
  /** Emitted on click event */
  click: [event: MouseEvent]
}>()

const { formid } = formId(props.id, true)

// Inject aria-describedby from formgroup if available
const injectedAriaDescribedby = inject<string | Ref<string> | undefined>(
  'ariaDescribedby',
  undefined,
)
const computedAriaDescribedby = computed((): string | undefined => {
  if (injectedAriaDescribedby) {
    return isRef(injectedAriaDescribedby) ? injectedAriaDescribedby.value : injectedAriaDescribedby
  }
  return undefined
})

/**
 * Compute toggle switch classes
 */
const toggleSwitchClass = computed((): string => {
  const classes: string[] = []

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

/**
 * Handle toggle state change
 */
const handleToggle = (event: MouseEvent) => {
  if (props.disabled) return

  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('click', event)
}
</script>

<style scoped lang="scss"></style>
