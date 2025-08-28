<template>
  <input
    :id="formid"
    v-model="refValue"
    type="date"
    class="form-input form-input-date"
    :name="formid"
    @input="onInput"
    @blur="$emit('dirty', true)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formId } from '../../composables'

/**
 * Date picker component implementing DKFDS v11 date selection specifications.
 *
 * Provides a native HTML date input with validation, proper formatting, and
 * accessibility support. Validates date values and emits validation state
 * changes to coordinate with form validation systems following DKFDS patterns.
 *
 * @component
 * @example Basic date picker
 * ```vue
 * <FdsDatoVaelger v-model="birthDate" />
 * ```
 *
 * @example Date picker with validation handling
 * ```vue
 * <FdsDatoVaelger
 *   v-model="eventDate"
 *   @valid="handleValidation"
 *   @dirty="markDirty"
 * />
 * ```
 *
 * @example In form group with label and validation
 * ```vue
 * <FdsFormgroup :isValid="dateValid">
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel :forId="formid" :required="true">Event Date</FdsLabel>
 *     <FdsHint>Select the date for your event</FdsHint>
 *     <FdsDatoVaelger
 *       v-model="eventDate"
 *       :id="formid"
 *       @valid="isDateValid => { dateValid = isDateValid }"
 *       @dirty="validateDate"
 *     />
 *     <FdsFejlmeddelelse v-if="!dateValid">Please select a valid date</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/datovælger/} DKFDS Date Picker Documentation
 */

export interface FdsDatoVaelgerProps {
  /**
   * Unique identifier for the date picker.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /**
   * The v-model value in ISO date format (YYYY-MM-DD).
   * Represents the selected date value.
   * @default ''
   */
  modelValue?: string
}

const { id, modelValue = '' } = defineProps<FdsDatoVaelgerProps>()

const emit = defineEmits<{
  /**
   * Emitted when date value changes.
   * Used for v-model two-way data binding.
   */
  'update:modelValue': [value: string]
  /**
   * Emitted when date picker loses focus.
   * Useful for triggering validation after user interaction.
   */
  dirty: [value: boolean]
  /**
   * Emitted when date validation state changes.
   * Provides real-time validation feedback.
   */
  valid: [isValid: boolean]
}>()
const { formid } = formId(id, true)
const refValue = ref(modelValue)

const isDateValid = (dateString: string) => {
  // First check if it's parseable
  if (Number.isNaN(Date.parse(dateString))) {
    return false
  }

  // Parse the date parts
  const parts = dateString.split('-')
  if (parts.length !== 3) return false

  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const day = parseInt(parts[2], 10)

  // Check if the date components are valid
  if (month < 1 || month > 12) return false
  if (day < 1) return false

  // Create a date and check if it matches what we input
  // This catches cases like Nov 31 which JS converts to Dec 1
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

const onValid = () => emit('valid', isDateValid(refValue.value))

const onInput = () => {
  onValid()
  emit('update:modelValue', refValue.value)
}
</script>
