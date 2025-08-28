<template>
  <textarea
    v-bind="$attrs"
    :id="formid"
    v-model="inputValue"
    :class="textareaClass"
    :maxlength="maxlength"
    :rows="getRows"
    :name="formid"
    :aria-describedby="computedAriaDescribedby"
    @input="handleInput"
    @blur="handleBlur"
  ></textarea>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref, useAttrs } from 'vue'
import { formId } from '../../composables'

/**
 * Textarea component implementing DKFDS v11 multi-line input specifications.
 *
 * Provides a multi-line text input with automatic row sizing, character limits,
 * and proper accessibility attributes. Features dynamic row calculation based
 * on content and configurable sizing options following DKFDS patterns.
 *
 * @component
 * @example Basic textarea
 * ```vue
 * <FdsTextarea v-model="description" :rows="3" />
 * ```
 *
 * @example Textarea with character limit
 * ```vue
 * <FdsTextarea
 *   v-model="comment"
 *   :maxlength="500"
 *   :rows="5"
 *   :maxRows="10"
 *   widthClass="input--width-l"
 * />
 * <FdsInputLimit v-model="comment" :limit="500" />
 * ```
 *
 * @example In form group with validation
 * ```vue
 * <FdsFormgroup :isValid="descriptionValid">
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel :required="true">Project Description</FdsLabel>
 *     <FdsHint>Describe your project in detail (500 characters max)</FdsHint>
 *     <FdsTextarea
 *       v-model="description"
 *       :id="formid"
 *       :maxlength="500"
 *       :rows="4"
 *       :maxRows="8"
 *       @dirty="validateDescription"
 *     />
 *     <FdsInputLimit v-model="description" :limit="500" />
 *     <FdsFejlmeddelelse v-if="!descriptionValid">Description is required</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

const attrs = useAttrs()

export interface FdsTextareaProps {
  /**
   * The v-model value for two-way data binding.
   * Required prop for textarea content.
   */
  modelValue: string
  /**
   * Unique identifier for the textarea.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /**
   * Number of visible text rows (minimum height).
   * Textarea will expand beyond this if needed.
   * @default 5
   */
  rows?: number
  /**
   * Maximum number of rows for auto-resize.
   * Limits vertical expansion of textarea.
   * @default 10
   */
  maxRows?: number
  /**
   * Characters per row for auto-resize calculation.
   * Used to determine when to add new rows based on content length.
   * @default 80
   */
  rowlength?: number
  /**
   * Maximum character length allowed.
   * Sets the HTML maxlength attribute for validation.
   * @default undefined
   */
  maxlength?: number
  /**
   * CSS class for textarea width sizing.
   * @values 'input--width-xs', 'input--width-s', 'input--width-m', 'input--width-l', 'input--width-xl'
   * @default ''
   */
  widthClass?: string
}

const {
  modelValue,
  id,
  rows = 5,
  maxRows = 10,
  rowlength = 80,
  maxlength,
  widthClass = '',
} = defineProps<FdsTextareaProps>()

const emit = defineEmits<{
  /**
   * Emitted when textarea value changes.
   * Used for v-model two-way data binding.
   */
  'update:modelValue': [value: string]
  /**
   * Emitted when textarea loses focus.
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
 * Compute textarea classes including width classes
 */
const textareaClass = computed((): string => {
  const classes = ['form-input']

  if (widthClass) {
    classes.push(widthClass)
  }

  return classes.join(' ')
})

/**
 * Calculate dynamic rows based on content
 */
const getRows = computed(() => {
  if (!modelValue) {
    return rows
  }
  const newlineRows = modelValue.split(/\r?\n/).length

  const textLengthRow = Math.floor(modelValue.length / rowlength) + 1
  const result = newlineRows > textLengthRow ? newlineRows : textLengthRow

  if (result < maxRows) {
    return result < rows ? rows : result
  }
  return maxRows
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
