---
title: FdsDatoVaelger
description: Date picker component implementing DKFDS v11 date selection specifications with validation, accessibility support, and proper formatting
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [date, picker, form, input, validation, accessibility]
---

# FdsDatoVaelger

Date picker component implementing DKFDS v11 date selection specifications. Provides a native HTML date input with validation, proper formatting, and accessibility support. Validates date values and emits validation state changes to coordinate with form validation systems following DKFDS patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsDatoVaelger } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsFormgroup>
    <FdsLabel>Birth Date</FdsLabel>
    <FdsDatoVaelger v-model="birthDate" />
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsDatoVaelger } from '@madsb/dkfds-vue3'

const birthDate = ref('')
</script>
```

## Props

| Prop | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| `id` | `string` | `undefined` | No | Unique identifier for the date picker. If not provided, will be auto-generated. |
| `modelValue` | `string` | `''` | No | The v-model value in ISO date format (YYYY-MM-DD). Represents the selected date value. |

## Events

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `update:modelValue` | `value: string` | Emitted when date value changes. Used for v-model two-way data binding. |
| `dirty` | `value: boolean` | Emitted when date picker loses focus. Useful for triggering validation after user interaction. |
| `valid` | `isValid: boolean` | Emitted when date validation state changes. Provides real-time validation feedback. |

## Slots

This component does not provide any slots.

## Usage Examples

### Basic Date Picker

```vue
<template>
  <FdsFormgroup>
    <FdsLabel>Select Date</FdsLabel>
    <FdsDatoVaelger v-model="selectedDate" />
    <p v-if="selectedDate">Selected: {{ formatDate(selectedDate) }}</p>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FdsFormgroup, FdsLabel, FdsDatoVaelger } from '@madsb/dkfds-vue3'

const selectedDate = ref('')

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('da-DK', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>
```

### Date Picker with Validation

```vue
<template>
  <FdsFormgroup :isValid="isDateValid">
    <FdsLabel :required="true">Event Date</FdsLabel>
    <FdsHint>Select the date for your event</FdsHint>
    <FdsDatoVaelger 
      v-model="eventDate" 
      @valid="handleValidation"
      @dirty="markDirty"
    />
    <FdsFejlmeddelelse v-if="!isDateValid && isDirty">
      Please select a valid date
    </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsDatoVaelger,
  FdsFejlmeddelelse 
} from '@madsb/dkfds-vue3'

const eventDate = ref('')
const isDateValid = ref(true)
const isDirty = ref(false)

const handleValidation = (valid: boolean) => {
  isDateValid.value = valid
}

const markDirty = () => {
  isDirty.value = true
}
</script>
```

### Date Range Selection Form

```vue
<template>
  <form @submit.prevent="handleSubmit" class="form">
    <fieldset class="form-fieldset">
      <legend class="form-legend">Vacation Period</legend>
      
      <div class="grid-row">
        <div class="grid-col-12 grid-col-md-6">
          <FdsFormgroup :isValid="validation.startDate.isValid">
            <FdsLabel :required="true">Start Date</FdsLabel>
            <FdsHint>First day of vacation</FdsHint>
            <FdsDatoVaelger 
              v-model="form.startDate" 
              @valid="(valid) => updateValidation('startDate', valid)"
              @dirty="() => validateDateRange()"
            />
            <FdsFejlmeddelelse v-if="!validation.startDate.isValid">
              {{ validation.startDate.message }}
            </FdsFejlmeddelelse>
          </FdsFormgroup>
        </div>
        
        <div class="grid-col-12 grid-col-md-6">
          <FdsFormgroup :isValid="validation.endDate.isValid">
            <FdsLabel :required="true">End Date</FdsLabel>
            <FdsHint>Last day of vacation</FdsHint>
            <FdsDatoVaelger 
              v-model="form.endDate" 
              @valid="(valid) => updateValidation('endDate', valid)"
              @dirty="() => validateDateRange()"
            />
            <FdsFejlmeddelelse v-if="!validation.endDate.isValid">
              {{ validation.endDate.message }}
            </FdsFejlmeddelelse>
          </FdsFormgroup>
        </div>
      </div>
      
      <div v-if="vacationDays > 0" class="alert alert-info">
        <p><strong>Vacation period:</strong> {{ vacationDays }} days</p>
        <p>From {{ formatDate(form.startDate) }} to {{ formatDate(form.endDate) }}</p>
      </div>
    </fieldset>

    <div class="form-actions">
      <FdsButton 
        type="submit" 
        variant="primary" 
        :disabled="!isFormValid"
      >
        Request Vacation
      </FdsButton>
      <FdsButton type="button" variant="secondary" @click="resetForm">
        Clear
      </FdsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsDatoVaelger,
  FdsFejlmeddelelse,
  FdsButton
} from '@madsb/dkfds-vue3'

const form = reactive({
  startDate: '',
  endDate: ''
})

const validation = ref({
  startDate: { isValid: true, message: '' },
  endDate: { isValid: true, message: '' }
})

const vacationDays = computed(() => {
  if (!form.startDate || !form.endDate) return 0
  
  const start = new Date(form.startDate)
  const end = new Date(form.endDate)
  
  if (start >= end) return 0
  
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
})

const isFormValid = computed(() => 
  validation.value.startDate.isValid && 
  validation.value.endDate.isValid &&
  form.startDate && 
  form.endDate &&
  vacationDays.value > 0
)

const updateValidation = (field: string, isValid: boolean) => {
  validation.value[field].isValid = isValid
  if (!isValid) {
    validation.value[field].message = 'Please select a valid date'
  } else {
    validation.value[field].message = ''
    validateDateRange()
  }
}

const validateDateRange = () => {
  if (!form.startDate || !form.endDate) return
  
  const start = new Date(form.startDate)
  const end = new Date(form.endDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Check if start date is in the past
  if (start < today) {
    validation.value.startDate.isValid = false
    validation.value.startDate.message = 'Start date cannot be in the past'
    return
  }
  
  // Check if end date is before start date
  if (end <= start) {
    validation.value.endDate.isValid = false
    validation.value.endDate.message = 'End date must be after start date'
    return
  }
  
  // Check if vacation is too long (example: max 30 days)
  if (vacationDays.value > 30) {
    validation.value.endDate.isValid = false
    validation.value.endDate.message = 'Vacation period cannot exceed 30 days'
    return
  }
  
  // All validations passed
  validation.value.startDate.isValid = true
  validation.value.startDate.message = ''
  validation.value.endDate.isValid = true
  validation.value.endDate.message = ''
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('da-DK', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const handleSubmit = () => {
  if (isFormValid.value) {
    console.log('Vacation request:', {
      startDate: form.startDate,
      endDate: form.endDate,
      days: vacationDays.value
    })
    // Handle form submission
  }
}

const resetForm = () => {
  Object.assign(form, {
    startDate: '',
    endDate: ''
  })
  
  // Reset validation state
  Object.keys(validation.value).forEach(key => {
    validation.value[key] = { isValid: true, message: '' }
  })
}

// Watch for form changes to revalidate
watch([() => form.startDate, () => form.endDate], validateDateRange)
</script>
```

### Date Picker with Custom ID and Form Integration

```vue
<template>
  <FdsFormgroup>
    <template #default="{ formid, ariaDescribedby }">
      <FdsLabel :forId="formid" :required="true">Appointment Date</FdsLabel>
      <FdsHint :id="`${formid}-hint`">
        Select your preferred appointment date
      </FdsHint>
      <FdsDatoVaelger 
        :id="formid"
        v-model="appointmentDate" 
        :aria-describedby="ariaDescribedby"
        @valid="handleDateValidation"
        @dirty="markFieldDirty"
      />
      <FdsFejlmeddelelse v-if="!isDateValid && isDirty">
        Please select a valid appointment date
      </FdsFejlmeddelelse>
    </template>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsDatoVaelger,
  FdsFejlmeddelelse 
} from '@madsb/dkfds-vue3'

const appointmentDate = ref('')
const isDateValid = ref(true)
const isDirty = ref(false)

const handleDateValidation = (valid: boolean) => {
  isDateValid.value = valid
}

const markFieldDirty = () => {
  isDirty.value = true
}
</script>
```

### Birthday Form with Age Calculation

```vue
<template>
  <div class="birthday-form">
    <FdsFormgroup :isValid="validation.isValid">
      <FdsLabel :required="true">Date of Birth</FdsLabel>
      <FdsHint>Used to verify your age for this service</FdsHint>
      <FdsDatoVaelger 
        v-model="birthDate" 
        @valid="handleValidation"
        @dirty="validateAge"
      />
      <FdsFejlmeddelelse v-if="!validation.isValid">
        {{ validation.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>
    
    <div v-if="age !== null && validation.isValid" class="age-display">
      <div class="alert alert-success">
        <h4>Age Verification</h4>
        <p><strong>Your age:</strong> {{ age }} years old</p>
        <p><strong>Birth date:</strong> {{ formatDate(birthDate) }}</p>
        <p v-if="age >= 18" class="text-success">
          ✓ You meet the minimum age requirement (18+)
        </p>
        <p v-else class="text-error">
          ✗ You must be at least 18 years old to use this service
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsDatoVaelger,
  FdsFejlmeddelelse 
} from '@madsb/dkfds-vue3'

const birthDate = ref('')
const validation = ref({
  isValid: true,
  message: ''
})

const age = computed(() => {
  if (!birthDate.value || !validation.value.isValid) return null
  
  const birth = new Date(birthDate.value)
  const today = new Date()
  
  let calculatedAge = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    calculatedAge--
  }
  
  return calculatedAge
})

const handleValidation = (valid: boolean) => {
  validation.value.isValid = valid
  if (!valid) {
    validation.value.message = 'Please enter a valid birth date'
  } else {
    validation.value.message = ''
  }
}

const validateAge = () => {
  if (!birthDate.value) return
  
  const birth = new Date(birthDate.value)
  const today = new Date()
  
  // Check if birth date is in the future
  if (birth > today) {
    validation.value.isValid = false
    validation.value.message = 'Birth date cannot be in the future'
    return
  }
  
  // Check if person is unreasonably old (example: 150+ years)
  const maxAge = today.getFullYear() - 150
  if (birth.getFullYear() < maxAge) {
    validation.value.isValid = false
    validation.value.message = 'Please enter a valid birth date'
    return
  }
  
  validation.value.isValid = true
  validation.value.message = ''
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('da-DK', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Watch birth date changes to validate age
watch(birthDate, validateAge)
</script>

<style scoped>
.birthday-form {
  max-width: 500px;
}

.age-display {
  margin-top: 1rem;
}

.text-success {
  color: #2e7d32;
  font-weight: 500;
}

.text-error {
  color: #d32f2f;
  font-weight: 500;
}
</style>
```

## Accessibility

FdsDatoVaelger implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Native HTML Date Input

- **Semantic HTML**: Uses native `<input type="date">` for maximum browser compatibility and accessibility
- **Screen Reader Support**: Properly announced by assistive technologies with date format guidance
- **Keyboard Navigation**: Full keyboard accessibility with arrow keys for date navigation
- **Input Method**: Supports both keyboard input and date picker interfaces

### Form Integration

- **Label Association**: Automatically associates with labels through ID attributes
- **ARIA Support**: Compatible with ARIA attributes for enhanced accessibility
- **Focus Management**: Proper focus handling and visual focus indicators
- **Error Handling**: Validation states communicated to screen readers

### Date Validation

- **Real-time Feedback**: Provides immediate validation feedback through events
- **Error Prevention**: Client-side validation prevents invalid date submissions
- **Date Format**: Uses ISO 8601 date format (YYYY-MM-DD) for consistency
- **Accessibility Announcements**: Validation changes announced to screen readers

### Danish Language Support

- **Localized Interface**: Native browser date picker respects Danish locale settings
- **Cultural Adaptation**: Follows Danish date conventions and formatting
- **Government Standards**: Meets requirements for Danish public sector services

## DKFDS Guidelines

FdsDatoVaelger follows the Danish Common Design System specifications:

### Design System Integration

- **DKFDS Classes**: Uses `form-input` and `form-input-date` CSS classes from DKFDS
- **Typography**: Follows DKFDS typography scale and font specifications  
- **Spacing**: Maintains proper spacing relationships with other form elements
- **Theme Compatibility**: Works with both VirkDK and BorgerDK themes

### Form Standards

- **DKFDS v11 Compliance**: Implements latest DKFDS date input specifications
- **Consistent Patterns**: Provides standard approach to date selection in forms
- **Validation Integration**: Designed to work with DKFDS validation patterns
- **Error Handling**: Supports DKFDS error message and validation workflows

### Native Implementation Note

This component uses native HTML `<input type="date">` instead of the DKFDS calendar widget. This approach provides:

- **Better Accessibility**: Native browser controls are more accessible
- **Framework Compatibility**: Works seamlessly with Vue.js reactivity
- **Mobile Support**: Native mobile date pickers for better UX
- **Maintenance**: Reduces dependency on external DKFDS JavaScript

### Best Practices

- **Progressive Enhancement**: Works without JavaScript while enhanced with Vue
- **Form Group Integration**: Seamlessly integrates with DKFDS form group patterns
- **Validation Patterns**: Follows DKFDS validation and error reporting standards
- **User Experience**: Provides consistent, predictable date input experience

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group container with validation context
- **[FdsLabel](/components/forms/fds-label)** - Form labels with required field indicators
- **[FdsHint](/components/forms/fds-hint)** - Form field hints and guidance text
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages for validation
- **[FdsDatoFelter](/components/input/fds-dato-felter)** - Multiple date input fields
- **[FdsInput](/components/input/fds-input)** - Text input for manual date entry

## TypeScript Support

```typescript
import type { FdsDatoVaelgerProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsDatoVaelgerProps {
  id?: string
  modelValue?: string
}

// Event payload types
interface FdsDatoVaelgerEvents {
  'update:modelValue': [value: string]
  dirty: [value: boolean]
  valid: [isValid: boolean]
}

// Usage in component with full typing
const datePickerProps: FdsDatoVaelgerProps = {
  id: 'birth-date',
  modelValue: '2023-12-25'
}

// Event handler with proper typing
const handleDateChange = (value: string) => {
  console.log('Selected date:', value)
}

const handleValidation = (isValid: boolean) => {
  console.log('Date is valid:', isValid)
}
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/input/fds-dato-vaelger.vue -->