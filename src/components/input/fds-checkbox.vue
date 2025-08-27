<template>
  <div class="form-group-checkbox">
    <input
      v-bind="attrs"
      :id="formid"
      type="checkbox"
      :class="checkboxClass"
      :checked="isChecked"
      :name="name || formid"
      :value="value"
      :disabled="disabled"
      :aria-describedby="computedAriaDescribedby"
      :aria-controls="hasContent ? `collapse-${formid}` : undefined"
      :data-controls="hasContent ? `collapse-${formid}` : undefined"
      @change="handleChange"
      @blur="handleBlur"
    />
    <label :for="formid" class="form-label">
      <slot></slot>
    </label>
    <div
      v-if="hasContent"
      :id="`collapse-${formid}`"
      :aria-hidden="!isChecked ? 'true' : 'false'"
      class="checkbox-content"
      :style="!isChecked ? 'display: none;' : undefined"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots, inject, isRef, type Ref } from 'vue'
import { formId } from '../../composables'

/**
 * Checkbox component implementing DKFDS v11 checkbox specifications.
 * 
 * Provides single and multiple selection checkboxes with conditional content
 * display, accessibility support, and proper form integration. Supports
 * boolean, string, and array models for flexible data binding patterns
 * following DKFDS checkbox behavior.
 * 
 * @component
 * @example Basic checkbox (boolean model)
 * ```vue
 * <FdsCheckbox v-model="acceptTerms">
 *   I accept the terms and conditions
 * </FdsCheckbox>
 * ```
 * 
 * @example Checkbox group (array model)
 * ```vue
 * <FdsCheckbox v-model="interests" value="sports">Sports</FdsCheckbox>
 * <FdsCheckbox v-model="interests" value="music">Music</FdsCheckbox>
 * <FdsCheckbox v-model="interests" value="travel">Travel</FdsCheckbox>
 * ```
 * 
 * @example Checkbox with conditional content
 * ```vue
 * <FdsCheckbox v-model="hasAllergies" value="yes">
 *   I have allergies
 *   <template #content>
 *     <FdsLabel>Please specify your allergies:</FdsLabel>
 *     <FdsTextarea v-model="allergyDetails" />
 *   </template>
 * </FdsCheckbox>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/tjekboks/} DKFDS Checkbox Documentation
 */

const attrs = useAttrs()
const slots = useSlots()

export interface FdsCheckboxProps {
  /** 
   * Unique identifier for the checkbox.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /** 
   * The v-model value for two-way data binding.
   * - boolean: for single checkbox (true/false)
   * - string: for single checkbox with specific value
   * - string[]: for checkbox group (array of selected values)
   * @default false
   */
  modelValue?: boolean | string | string[]
  /** 
   * Checkbox value for form submission and array models.
   * When modelValue is an array, this value is added/removed.
   * @default true
   */
  value?: string | number | boolean
  /** 
   * Name attribute for form submission.
   * If not provided, uses the generated form ID.
   * @default undefined (uses formid)
   */
  name?: string
  /** 
   * Whether the checkbox is disabled.
   * Prevents user interaction and applies disabled styling.
   * @default false
   */
  disabled?: boolean
}

const { id, modelValue = false, value = true, name, disabled = false } = defineProps<FdsCheckboxProps>()

const emit = defineEmits<{
  /** 
   * Emitted when checkbox state changes.
   * Used for v-model two-way data binding.
   */
  'update:modelValue': [value: boolean | string | string[]]
  /** 
   * Emitted when checkbox loses focus.
   * Useful for triggering validation after user interaction.
   */
  dirty: [isDirty: boolean]
  /** 
   * Emitted on change event.
   * Provides access to the raw DOM change event.
   */
  change: [event: Event]
}>()

const { formid } = formId(id, true)

// Check if content slot is provided
const hasContent = computed(() => !!slots.content)

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
 * Compute checkbox classes
 */
const checkboxClass = computed((): string => {
  return 'form-checkbox'
})

/**
 * Determine if checkbox is checked
 */
const isChecked = computed((): boolean => {
  if (Array.isArray(modelValue)) {
    return modelValue.includes(value as string)
  }
  if (typeof modelValue === 'boolean') {
    return modelValue
  }
  return modelValue === value
})

/**
 * Handle checkbox change
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (Array.isArray(modelValue)) {
    const newValue = [...modelValue]
    if (checked) {
      if (!newValue.includes(value as string)) {
        newValue.push(value as string)
      }
    } else {
      const index = newValue.indexOf(value as string)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', checked)
  }

  emit('change', event)
}

/**
 * Handle blur event
 */
const handleBlur = () => {
  emit('dirty', true)
}
</script>
