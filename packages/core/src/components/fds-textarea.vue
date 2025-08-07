<template>
  <textarea
    v-bind="$attrs"
    :id="formid"
    v-model="inputValue"
    :class="textareaClass"
    :maxlength="props.maxlength"
    :rows="getRows"
    :name="formid"
    :aria-describedby="computedAriaDescribedby"
    @input="handleInput"
    @blur="handleBlur"
  ></textarea>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref, useAttrs } from 'vue'
import { formId } from 'dkfds-vue3-utils'

const attrs = useAttrs()

interface Props {
  /** The v-model value */
  modelValue: string
  /** Unique identifier for the textarea */
  id?: string | null
  /** Number of visible text rows */
  rows?: number
  /** Maximum number of rows for auto-resize */
  maxRows?: number
  /** Characters per row for auto-resize calculation */
  rowlength?: number
  /** Maximum character length */
  maxlength?: number
  /** Width class for textarea sizing */
  widthClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
  rows: 5,
  maxRows: 10,
  rowlength: 80,
  maxlength: undefined,
  widthClass: '',
})

const emit = defineEmits<{
  /** Emitted when textarea value changes */
  'update:modelValue': [value: string]
  /** Emitted when textarea loses focus */
  dirty: [isDirty: boolean]
  /** Emitted on input event */
  input: [event: Event]
}>()

const { formid } = formId(props.id, true)

// Inject aria-describedby from formgroup if available
const injectedAriaDescribedby = inject<string | Ref<string> | undefined>(
  'ariaDescribedby',
  undefined,
)

const computedAriaDescribedby = computed((): string | undefined => {
  // Use explicitly provided aria-describedby from attrs
  if (attrs['aria-describedby']) {
    return attrs['aria-describedby'] as string
  }
  // Otherwise use injected value from formgroup
  if (injectedAriaDescribedby) {
    return isRef(injectedAriaDescribedby) ? injectedAriaDescribedby.value : injectedAriaDescribedby
  }
  return undefined
})

/**
 * Compute textarea classes including width classes
 */
const textareaClass = computed((): string => {
  const classes = ['form-input']

  if (props.widthClass) {
    classes.push(props.widthClass)
  }

  return classes.join(' ')
})

/**
 * Calculate dynamic rows based on content
 */
const getRows = computed(() => {
  if (!props.modelValue) {
    return props.rows
  }
  const newlineRows = props.modelValue.split(/\r?\n/).length

  const textLengthRow = Math.floor(props.modelValue.length / props.rowlength) + 1
  const result = newlineRows > textLengthRow ? newlineRows : textLengthRow

  if (result < props.maxRows) {
    return result < props.rows ? props.rows : result
  }
  return props.maxRows
})

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})

/**
 * Handle input event
 */
const handleInput = (event: Event) => {
  emit('input', event)
}

/**
 * Handle blur event
 */
const handleBlur = () => {
  emit('dirty', true)
}
</script>

<style scoped lang="scss"></style>
