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

/**
 * Number input component implementing DKFDS v11 input field specifications.
 *
 * Provides a numeric input with validation, prefix/suffix support, and proper
 * accessibility attributes. Supports min/max constraints, step values, and
 * automatic focus selection for easy value replacement. Integrates with
 * form groups for coordinated validation and accessibility.
 *
 * @component
 * @example Basic number input
 * ```vue
 * <FdsInputNumber
 *   v-model="age"
 *   :min="0"
 *   :max="120"
 *   suffix="år"
 * />
 * ```
 *
 * @example Price input with prefix
 * ```vue
 * <FdsInputNumber
 *   v-model="price"
 *   prefix="kr."
 *   :step="0.01"
 *   :min="0"
 *   widthClass="input--width-m"
 * />
 * ```
 *
 * @example In form group with validation
 * ```vue
 * <FdsFormgroup :isValid="ageValid">
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel :required="true">Age</FdsLabel>
 *     <FdsHint>Enter your age in years</FdsHint>
 *     <FdsInputNumber
 *       v-model="age"
 *       :id="formid"
 *       :min="18"
 *       :max="100"
 *       suffix="years"
 *       @dirty="validateAge"
 *     />
 *     <FdsFejlmeddelelse v-if="!ageValid">Age must be between 18 and 100</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

const attrs = useAttrs()

export interface FdsInputNumberProps {
  /**
   * Unique identifier for the input.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /**
   * The v-model value for two-way data binding.
   * Accepts both number and string types for flexible handling.
   * @default ''
   */
  modelValue?: number | string
  /**
   * Suffix text displayed after the input.
   * Useful for units like 'kr.', 'kg', '%', etc.
   * @default undefined
   */
  suffix?: string
  /**
   * Prefix text displayed before the input.
   * Useful for currency symbols, labels, etc.
   * @default undefined
   */
  prefix?: string
  /**
   * Minimum value allowed for the input.
   * Sets the HTML min attribute for validation.
   * @default undefined
   */
  min?: number
  /**
   * Maximum value allowed for the input.
   * Sets the HTML max attribute for validation.
   * @default undefined
   */
  max?: number
  /**
   * Step value for increment/decrement operations.
   * Determines precision for decimal values.
   * @default undefined
   */
  step?: number | string
  /**
   * CSS class for input width sizing.
   * @values 'input--width-xs', 'input--width-s', 'input--width-m', 'input--width-l', 'input--width-xl'
   * @default ''
   */
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
  /**
   * Emitted when input value changes.
   * Used for v-model two-way data binding.
   */
  'update:modelValue': [value: number | string]
  /**
   * Emitted when input loses focus.
   * Useful for triggering validation after user interaction.
   */
  dirty: [isDirty: boolean]
  /**
   * Emitted on input event.
   * Provides access to the raw DOM input event.
   */
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
