<template>
  <div :class="wrapperClass">
    <div v-if="prefix" class="form-input-prefix" aria-hidden="true">
      {{ prefix }}
    </div>
    <input
      v-bind="attrs"
      :id="formid"
      v-model="inputValue"
      type="number"
      :class="inputClass"
      :name="formid"
      :aria-describedby="computedAriaDescribedby"
      :min="min"
      :max="max"
      :step="step"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <div v-if="suffix" class="form-input-suffix" aria-hidden="true">
      {{ suffix }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, inject, isRef, type Ref } from 'vue'
import { formId } from '../../composables'

const attrs = useAttrs()

export interface FdsInputNumberProps {
  /** Unique identifier for the input */
  id?: string
  /** The v-model value */
  modelValue?: number | string
  /** Suffix text displayed after the input */
  suffix?: string
  /** Prefix text displayed before the input */
  prefix?: string
  /** Minimum value allowed */
  min?: number
  /** Maximum value allowed */
  max?: number
  /** Step value for increment/decrement */
  step?: number | string
  /** Width class for input sizing */
  widthClass?: string
}

const {
  id,
  modelValue = '',
  suffix,
  prefix,
  min,
  max,
  step,
  widthClass = '',
} = defineProps<FdsInputNumberProps>()

const emit = defineEmits<{
  /** Emitted when input value changes */
  'update:modelValue': [value: number | string]
  /** Emitted when input loses focus */
  dirty: [isDirty: boolean]
  /** Emitted on input event */
  input: [event: Event]
}>()

const { formid } = formId(id, true)

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
 * Compute wrapper classes based on props
 */
const wrapperClass = computed((): string => {
  const classes: string[] = []

  if (suffix) {
    classes.push('form-input-wrapper', 'form-input-wrapper--suffix')
  } else if (prefix) {
    classes.push('form-input-wrapper', 'form-input-wrapper--prefix')
  }

  return classes.join(' ')
})

/**
 * Compute input classes including width classes
 */
const inputClass = computed((): string => {
  const classes = ['form-input']

  if (widthClass) {
    classes.push(widthClass)
  }

  return classes.join(' ')
})

const inputValue = computed({
  get() {
    return modelValue
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

/**
 * Handle focus event - select all text for easy replacement
 */
const handleFocus = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.select()
}
</script>

<style scoped lang="scss"></style>
