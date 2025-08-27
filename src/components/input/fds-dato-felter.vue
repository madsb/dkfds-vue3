<template>
  <div class="date-group js-calendar-group mt-3">
    <div class="form-group form-group-day">
      <label class="form-label" :for="`day_${formid}`"> Dag </label>
      <input
        :id="`day_${formid}`"
        ref="day"
        v-model="dateObj.day"
        class="form-input js-calendar-day-input"
        type="tel"
        data-min="1"
        data-max="31"
        maxlength="2"
        pattern="^[0-9]{0,2}$"
        data-input-regex="^[0-9]{0,2}$"
        title="Indskriv dag på måneden som tal"
        @input="onNextTab($event, 'day')"
        @blur="$emit('dirty', true)"
        @focus="($event.target as any)?.select()"
      />
    </div>
    <div class="form-group form-group-month">
      <label class="form-label" :for="`month_${formid}`"> Måned </label>
      <input
        :id="`month_${formid}`"
        ref="month"
        v-model="dateObj.month"
        class="form-input js-calendar-month-input"
        type="tel"
        data-min="1"
        data-max="12"
        maxlength="2"
        pattern="^[0-9]{0,2}$"
        data-input-regex="^[0-9]{0,2}$"
        title="Indskriv månedens nummer"
        @input="onNextTab($event, 'month')"
        @blur="$emit('dirty', true)"
        @focus="($event.target as any)?.select()"
      />
    </div>
    <div class="form-group form-group-year">
      <label class="form-label" :for="`year_${formid}`"> År </label>
      <input
        :id="`year_${formid}`"
        ref="year"
        v-model="dateObj.year"
        class="form-input js-calendar-year-input"
        type="tel"
        data-min="1900"
        data-max="3000"
        maxlength="4"
        pattern="^[0-9]{0,4}$"
        data-input-regex="^[0-9]{0,4}$"
        title="Indskriv årstal"
        @blur="$emit('dirty', true)"
        @input="onNextTab($event, 'year')"
        @focus="($event.target as any)?.select()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { formId } from '../../composables'

/**
 * Date fields component implementing DKFDS v11 separate date input specifications.
 * 
 * Provides three separate input fields for day, month, and year with automatic
 * tab progression, validation, and proper formatting. Offers an alternative to
 * native date pickers with enhanced user control and accessibility support
 * following DKFDS date input patterns.
 * 
 * @component
 * @example Basic date fields
 * ```vue
 * <FdsDatoFelter v-model="birthDate" />
 * ```
 * 
 * @example Date fields with validation handling
 * ```vue
 * <FdsDatoFelter 
 *   v-model="registrationDate" 
 *   @valid="handleDateValidation"
 *   @dirty="markFieldDirty"
 * />
 * ```
 * 
 * @example In form group with label and validation
 * ```vue
 * <FdsFormgroup :isValid="dateValid">
 *   <template #default="{ formid }">
 *     <FdsLabel :required="true">Birth Date</FdsLabel>
 *     <FdsHint>Enter your date of birth using the fields below</FdsHint>
 *     <FdsDatoFelter 
 *       v-model="birthDate" 
 *       :id="formid"
 *       @valid="isValid => { dateValid = isValid }"
 *       @dirty="validateBirthDate"
 *     />
 *     <FdsFejlmeddelelse v-if="!dateValid">Please enter a valid birth date</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/datovælger/} DKFDS Date Picker Documentation
 */

const day = ref<HTMLInputElement | null>(null)
const month = ref<HTMLInputElement | null>(null)
const year = ref<HTMLInputElement | null>(null)

export interface FdsDatoFelterProps {
  /** 
   * Unique identifier for the date fields group.
   * Used as base for generating individual field IDs.
   * @default undefined (auto-generated)
   */
  id?: string
  /** 
   * The v-model value in ISO date format (YYYY-MM-DD).
   * Represents the combined date value from the three fields.
   * @default ''
   */
  modelValue?: string
}

const {
  id,
  /** JSON Date */
  modelValue = '',
} = defineProps<FdsDatoFelterProps>()

const emit = defineEmits<{
  /** 
   * Emitted when date value changes from any field.
   * Used for v-model two-way data binding with combined ISO date string.
   */
  'update:modelValue': [value: string]
  /** 
   * Emitted when any date field loses focus.
   * Useful for triggering validation after user interaction.
   */
  dirty: [value: boolean]
  /** 
   * Emitted when combined date validation state changes.
   * Provides real-time validation feedback for the complete date.
   */
  valid: [isValid: boolean]
}>()

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

const getModelDate = (dateString: string) => {
  if (isDateValid(dateString)) {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString(),
      month: (date.getMonth() + 1).toString(), // Convert from 0-indexed to 1-indexed
      year: date.getFullYear().toString(),
    }
  }
  return { day: '', month: '', year: '' }
}

const { formid } = formId(id, true)
const dateObj = ref<{ day: string; month: string; year: string }>(getModelDate(modelValue))

const onInput = () => {
  // Zero-pad values for proper date format (only if not empty)
  const month = dateObj.value.month ? dateObj.value.month.padStart(2, '0') : ''
  const day = dateObj.value.day ? dateObj.value.day.padStart(2, '0') : ''
  emit('update:modelValue', [dateObj.value.year, month, day].join('-'))
}

const onValid = () => {
  // Zero-pad values for validation (only if not empty)
  const month = dateObj.value.month ? dateObj.value.month.padStart(2, '0') : ''
  const day = dateObj.value.day ? dateObj.value.day.padStart(2, '0') : ''
  emit('valid', isDateValid([dateObj.value.year, month, day].join('-')))
}

const onNextTab = (event: Event, source: string) => {
  const inp = event.target as HTMLInputElement

  // Mark that user is typing to prevent watch interference
  isUserTyping = true

  // Always emit on input change
  onInput()
  onValid()

  // Check if we should auto-advance (only when 2 or more digits)
  if (!inp.selectionEnd || inp.selectionEnd < 2) {
    return
  }

  if (source === 'day') {
    ;(month.value as HTMLInputElement).focus()
  } else if (source === 'month') {
    ;(year.value as HTMLInputElement).focus()
  }
}

// Track if user is currently typing
let isUserTyping = false

// Watch for modelValue changes from parent
watch(
  () => modelValue,
  (newValue) => {
    // Don't update while user is typing
    if (isUserTyping) {
      isUserTyping = false
      return
    }

    // Only update if the value is significantly different
    const newDate = getModelDate(newValue)
    if (JSON.stringify(newDate) !== JSON.stringify(dateObj.value)) {
      dateObj.value = newDate
    }
  },
)
</script>
