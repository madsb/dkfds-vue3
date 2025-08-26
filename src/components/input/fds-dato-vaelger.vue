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

export interface FdsDatoVaelgerProps {
  /** Unique ID for the date picker */
  id?: string
  /** JSON Date value */
  modelValue?: string
}

const { id, modelValue = '' } = defineProps<FdsDatoVaelgerProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  dirty: [value: boolean]
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
