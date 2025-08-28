<template>
  <div :class="wrapperClass">
    <div v-if="prefix" class="form-input-prefix" aria-hidden="true">
      {{ prefix }}
    </div>
    <input
      v-bind="attrs"
      :id="formid"
      v-model="inputValue"
      :type="type"
      :class="inputClass"
      :name="formid"
      :aria-describedby="computedAriaDescribedby"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div v-if="suffix" class="form-input-suffix" aria-hidden="true">
      {{ suffix }}
    </div>
    <slot name="button" />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs, inject, isRef, type Ref } from 'vue'
import { formId } from '../../composables'

/**
 * Input component implementing DKFDS v11 text input specifications.
 *
 * Standard text input field with support for prefixes, suffixes, and various input types.
 * Integrates with FdsFormgroup for validation and error handling.
 *
 * @component
 * @example Basic text input
 * ```vue
 * <FdsFormgroup>
 *   <FdsLabel for="name">Name</FdsLabel>
 *   <FdsInput id="name" v-model="formData.name" />
 * </FdsFormgroup>
 * ```
 *
 * @example With prefix and suffix
 * ```vue
 * <FdsFormgroup>
 *   <FdsLabel for="price">Price</FdsLabel>
 *   <FdsInput
 *     id="price"
 *     v-model="formData.price"
 *     prefix="DKK"
 *     suffix=",00"
 *     type="number"
 *   />
 * </FdsFormgroup>
 * ```
 *
 * @example Email input with custom width
 * ```vue
 * <FdsFormgroup>
 *   <FdsLabel for="email">Email</FdsLabel>
 *   <FdsHint id="email-hint">We'll never share your email</FdsHint>
 *   <FdsInput
 *     id="email"
 *     v-model="formData.email"
 *     type="email"
 *     width-class="form-input-width-m"
 *   />
 * </FdsFormgroup>
 * ```
 *
 * @example With validation error
 * ```vue
 * <FdsFormgroup :error="emailError">
 *   <FdsLabel for="email">Email</FdsLabel>
 *   <FdsFejlmeddelelse v-if="emailError">{{ emailError }}</FdsFejlmeddelelse>
 *   <FdsInput id="email" v-model="email" type="email" />
 * </FdsFormgroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Documentation
 */

const attrs = useAttrs()

export interface FdsInputProps {
  /**
   * Unique identifier for the input element
   * Used for label association and accessibility
   */
  id?: string

  /**
   * The v-model binding value
   * Supports two-way data binding with v-model
   */
  modelValue?: string

  /**
   * Suffix text displayed after the input field
   * Commonly used for units or additional context
   * @example "kr", "km", "%"
   */
  suffix?: string

  /**
   * Prefix text displayed before the input field
   * Commonly used for currency symbols or labels
   * @example "DKK", "$", "+"
   */
  prefix?: string

  /**
   * HTML input type attribute
   * @values 'text', 'email', 'tel', 'url', 'password', 'number', 'search'
   * @default 'text'
   */
  type?: string

  /**
   * Width class for controlling input field size
   * Uses DKFDS width utility classes
   * @values 'form-input-width-xs', 'form-input-width-s', 'form-input-width-m', 'form-input-width-l', 'form-input-width-xl'
   * @default ''
   */
  widthClass?: string
}

const {
  id,
  modelValue = '',
  suffix,
  prefix,
  type = 'text',
  widthClass = '',
} = defineProps<FdsInputProps>()

const emit = defineEmits<{
  /**
   * Emitted when input value changes
   * Used for v-model binding
   */
  'update:modelValue': [value: string]

  /**
   * Emitted when input loses focus
   * Indicates if field has been touched (dirty state)
   */
  dirty: [isDirty: boolean]

  /**
   * Native input event pass-through
   * Provides access to raw input event
   */
  input: [event: Event]
}>()
const slots = useSlots()

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
  } else if (slots.button) {
    classes.push('search')
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
</script>

<style scoped lang="scss"></style>
