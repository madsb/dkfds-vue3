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
import { formId } from '@madsb/dkfds-vue3-utils'

const day = ref<HTMLInputElement | null>(null)
const month = ref<HTMLInputElement | null>(null)
const year = ref<HTMLInputElement | null>(null)

const {
  id,
  /** JSON Date */
  modelValue = '',
} = defineProps<{
  id?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  dirty: [value: boolean]
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
