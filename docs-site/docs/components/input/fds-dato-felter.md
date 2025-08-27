---
title: FdsDatoFelter
description: Date fields component providing three separate input fields for day, month, and year with automatic tab progression and validation
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [date, input, validation, progressive-enhancement, accessibility]
---

# FdsDatoFelter

Date fields component implementing DKFDS v11 separate date input specifications. Provides three separate input fields for day, month, and year with automatic tab progression, validation, and proper formatting. Offers an alternative to native date pickers with enhanced user control and accessibility support following DKFDS date input patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsDatoFelter } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsDatoFelter v-model="birthDate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsDatoFelter } from '@madsb/dkfds-vue3'

const birthDate = ref('')
</script>
```

## Props

| Prop         | Type     | Default     | Required | Description                                                                                                            |
| ------------ | -------- | ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `id`         | `string` | `undefined` | No       | Unique identifier for the date fields group. Used as base for generating individual field IDs. Auto-generated if not provided. |
| `modelValue` | `string` | `''`        | No       | The v-model value in ISO date format (YYYY-MM-DD). Represents the combined date value from the three fields.          |

## Events

| Event                | Payload      | Description                                                                                                  |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `update:modelValue`  | `string`     | Emitted when date value changes from any field. Used for v-model two-way data binding with combined ISO date string. |
| `dirty`              | `boolean`    | Emitted when any date field loses focus. Useful for triggering validation after user interaction.           |
| `valid`              | `boolean`    | Emitted when combined date validation state changes. Provides real-time validation feedback for the complete date. |

## Usage Examples

### Basic Date Fields

```vue
<template>
  <FdsDatoFelter v-model="selectedDate" />
  <p>Selected date: {{ selectedDate }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsDatoFelter } from '@madsb/dkfds-vue3'

const selectedDate = ref('')
</script>
```

### Date Fields with Validation Handling

```vue
<template>
  <FdsDatoFelter 
    v-model="registrationDate" 
    @valid="handleDateValidation"
    @dirty="markFieldDirty"
  />
  <p v-if="!isDateValid" class="text-error">Please enter a valid date</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsDatoFelter } from '@madsb/dkfds-vue3'

const registrationDate = ref('')
const isDateValid = ref(true)
const isDirty = ref(false)

const handleDateValidation = (valid: boolean) => {
  isDateValid.value = valid
}

const markFieldDirty = (dirty: boolean) => {
  isDirty.value = dirty
}
</script>
```

### Integration with Form Group

```vue
<template>
  <FdsFormgroup :isValid="dateValid">
    <template #default="{ formid }">
      <FdsLabel :required="true">Fødselsdato</FdsLabel>
      <FdsHint>Indtast din fødselsdato i felterne nedenfor</FdsHint>
      <FdsDatoFelter 
        v-model="birthDate" 
        :id="formid"
        @valid="isValid => { dateValid = isValid }"
        @dirty="validateBirthDate"
      />
      <FdsFejlmeddelelse v-if="!dateValid && isDirty">
        Indtast venligst en gyldig fødselsdato
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
  FdsDatoFelter, 
  FdsFejlmeddelelse 
} from '@madsb/dkfds-vue3'

const birthDate = ref('')
const dateValid = ref(true)
const isDirty = ref(false)

const validateBirthDate = (dirty: boolean) => {
  isDirty.value = dirty
  // Additional validation logic could be added here
  // For example, checking if the date is not in the future for birth dates
  if (birthDate.value && dirty) {
    const selectedDate = new Date(birthDate.value)
    const today = new Date()
    if (selectedDate > today) {
      dateValid.value = false
    }
  }
}
</script>
```

### Advanced Validation with Date Constraints

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FdsFormgroup :isValid="validation.startDate.isValid">
      <FdsLabel :required="true">Startdato</FdsLabel>
      <FdsHint>Vælg en startdato for projektet</FdsHint>
      <FdsDatoFelter 
        v-model="formData.startDate"
        @valid="isValid => updateValidation('startDate', 'valid', isValid)"
        @dirty="() => updateValidation('startDate', 'dirty', true)"
      />
      <FdsFejlmeddelelse v-if="!validation.startDate.isValid && validation.startDate.isDirty">
        {{ validation.startDate.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsFormgroup :isValid="validation.endDate.isValid">
      <FdsLabel :required="true">Slutdato</FdsLabel>
      <FdsHint>Slutdatoen skal være efter startdatoen</FdsHint>
      <FdsDatoFelter 
        v-model="formData.endDate"
        @valid="isValid => updateValidation('endDate', 'valid', isValid)"
        @dirty="() => updateValidation('endDate', 'dirty', true)"
      />
      <FdsFejlmeddelelse v-if="!validation.endDate.isValid && validation.endDate.isDirty">
        {{ validation.endDate.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsButton type="submit" :disabled="!isFormValid">
      Opret projekt
    </FdsButton>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsDatoFelter, 
  FdsFejlmeddelelse,
  FdsButton
} from '@madsb/dkfds-vue3'

const formData = reactive({
  startDate: '',
  endDate: ''
})

const validation = ref({
  startDate: { isValid: true, isDirty: false, message: '' },
  endDate: { isValid: true, isDirty: false, message: '' }
})

const isFormValid = computed(() => {
  return validation.value.startDate.isValid && 
         validation.value.endDate.isValid &&
         formData.startDate !== '' && 
         formData.endDate !== ''
})

const updateValidation = (field: string, property: string, value: any) => {
  validation.value[field][property] = value
  validateDateConstraints()
}

const validateDateConstraints = () => {
  if (formData.startDate && formData.endDate) {
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const today = new Date()
    
    // Validate start date is not in the past
    if (startDate < today) {
      validation.value.startDate.isValid = false
      validation.value.startDate.message = 'Startdato kan ikke være i fortiden'
    } else {
      validation.value.startDate.isValid = true
      validation.value.startDate.message = ''
    }
    
    // Validate end date is after start date
    if (endDate <= startDate) {
      validation.value.endDate.isValid = false
      validation.value.endDate.message = 'Slutdato skal være efter startdatoen'
    } else {
      validation.value.endDate.isValid = true
      validation.value.endDate.message = ''
    }
  }
}

// Watch for changes in date values to re-validate
watch([() => formData.startDate, () => formData.endDate], validateDateConstraints)

const handleSubmit = () => {
  console.log('Project data:', formData)
}
</script>
```

### Date Range Selection

```vue
<template>
  <div class="date-range-selector">
    <div class="grid-row">
      <div class="grid-col-12 grid-col-md-6">
        <FdsFormgroup :isValid="fromDateValid">
          <FdsLabel :required="true">Fra dato</FdsLabel>
          <FdsDatoFelter 
            v-model="dateRange.from"
            @valid="valid => fromDateValid = valid"
            @dirty="validateDateRange"
          />
          <FdsFejlmeddelelse v-if="!fromDateValid">
            Indtast venligst en gyldig startdato
          </FdsFejlmeddelelse>
        </FdsFormgroup>
      </div>

      <div class="grid-col-12 grid-col-md-6">
        <FdsFormgroup :isValid="toDateValid">
          <FdsLabel :required="true">Til dato</FdsLabel>
          <FdsDatoFelter 
            v-model="dateRange.to"
            @valid="valid => toDateValid = valid"
            @dirty="validateDateRange"
          />
          <FdsFejlmeddelelse v-if="!toDateValid">
            Til-dato skal være efter fra-datoen
          </FdsFejlmeddelelse>
        </FdsFormgroup>
      </div>
    </div>

    <p v-if="dateRange.from && dateRange.to && isRangeValid">
      Valgt periode: {{ formatDateRange() }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsDatoFelter, 
  FdsFejlmeddelelse 
} from '@madsb/dkfds-vue3'

const dateRange = reactive({
  from: '',
  to: ''
})

const fromDateValid = ref(true)
const toDateValid = ref(true)

const isRangeValid = computed(() => {
  if (!dateRange.from || !dateRange.to) return false
  return new Date(dateRange.to) > new Date(dateRange.from)
})

const validateDateRange = () => {
  if (dateRange.from && dateRange.to) {
    const fromDate = new Date(dateRange.from)
    const toDate = new Date(dateRange.to)
    
    if (toDate <= fromDate) {
      toDateValid.value = false
    } else {
      toDateValid.value = true
    }
  }
}

const formatDateRange = () => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  const fromFormatted = new Date(dateRange.from).toLocaleDateString('da-DK', options)
  const toFormatted = new Date(dateRange.to).toLocaleDateString('da-DK', options)
  return `${fromFormatted} til ${toFormatted}`
}
</script>
```

## Accessibility

FdsDatoFelter implements comprehensive accessibility features following WCAG 2.1 AA guidelines and DKFDS accessibility standards:

### Keyboard Navigation

- **Tab Navigation**: Automatic progression between fields when 2+ digits are entered
- **Focus Management**: Each input can receive focus independently for manual navigation
- **Text Selection**: Text is automatically selected on focus for easy replacement
- **Input Validation**: Real-time validation provides immediate feedback to assistive technologies

### Screen Reader Support

- **Semantic Labels**: Each field has descriptive labels in Danish ("Dag", "Måned", "År")
- **Input Types**: Uses `type="tel"` for numeric input with proper keyboard on mobile devices
- **Title Attributes**: Provides additional context for each field's expected input format
- **Pattern Validation**: HTML5 pattern attributes ensure input format consistency

### ARIA Integration

- **Form Association**: Integrates with FdsFormgroup for proper aria-describedby relationships
- **Validation States**: Emits validation events that can be connected to ARIA live regions
- **Field Identification**: Uses formId composable for consistent ID generation and association

### Mobile Accessibility

- **Numeric Keyboards**: `type="tel"` triggers numeric keypad on mobile devices
- **Touch Targets**: Large input fields meet minimum touch target size requirements
- **Input Constraints**: `maxlength` and `pattern` attributes prevent invalid input

## DKFDS Guidelines

FdsDatoFelter follows the Danish Common Design System date input specifications:

### Design System Integration

- **DKFDS Classes**: Uses standard `date-group`, `form-group`, `form-label`, and `form-input` classes
- **Grid System**: Supports 8-point grid spacing with proper margins and padding
- **Theme Compatibility**: Works with both VirkDK and BorgerDK theme variations
- **JavaScript Integration**: Uses `js-calendar-group` and related classes for DKFDS behavior scripts

### Date Input Standards

- **Separate Fields**: Implements DKFDS preference for separate day/month/year fields
- **Progressive Enhancement**: Works without JavaScript, enhanced with automatic tab progression
- **Validation Patterns**: Follows DKFDS validation patterns with proper error messaging
- **Danish Language**: Uses Danish field labels and follows Danish date format conventions

### User Experience

- **Clear Field Purpose**: Each field is clearly labeled with its expected input
- **Automatic Progression**: Enhances user experience with smart tab advancement
- **Format Flexibility**: Accepts single or double-digit input for day and month
- **Validation Feedback**: Provides immediate validation feedback without blocking input

### Best Practices

- **Date Range Constraints**: Supports reasonable date ranges (1900-3000 for years)
- **Input Sanitization**: Uses pattern matching and regex validation for secure input
- **Error Prevention**: Prevents invalid characters from being entered
- **Context Awareness**: Integrates properly with DKFDS form structure components

## Date Validation

The component includes built-in date validation logic:

### Validation Rules

- **Format Validation**: Ensures proper ISO date format (YYYY-MM-DD)
- **Date Existence**: Validates that the date actually exists (e.g., no February 30th)
- **Range Validation**: Checks reasonable year range (1900-3000)
- **Month Validation**: Ensures month is between 1-12
- **Day Validation**: Validates day based on month and leap year calculations

### Validation Methods

```typescript
// Built-in validation function checks:
const isDateValid = (dateString: string) => {
  // 1. Parse-ability check
  if (Number.isNaN(Date.parse(dateString))) return false
  
  // 2. Format validation
  const parts = dateString.split('-')
  if (parts.length !== 3) return false
  
  // 3. Range validation
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)  
  const day = parseInt(parts[2], 10)
  
  if (month < 1 || month > 12) return false
  if (day < 1) return false
  
  // 4. Date existence validation
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day
}
```

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group wrapper with validation state
- **[FdsLabel](/components/forms/fds-label)** - Form labels for proper field association  
- **[FdsHint](/components/forms/fds-hint)** - Guidance text for date input format
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages for validation feedback
- **[FdsDatoVaelger](/components/input/fds-dato-vaelger)** - Alternative date picker with calendar interface
- **[FdsInput](/components/input/fds-input)** - Basic text input for simple date formats

## TypeScript Support

```typescript
import type { FdsDatoFelterProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsDatoFelterProps {
  /** Unique identifier for the date fields group */
  id?: string
  /** The v-model value in ISO date format (YYYY-MM-DD) */
  modelValue?: string
}

// Event payload types
interface FdsDatoFelterEvents {
  /** Emitted when date value changes */
  'update:modelValue': [value: string]
  /** Emitted when field loses focus */
  'dirty': [value: boolean]  
  /** Emitted when validation state changes */
  'valid': [isValid: boolean]
}

// Usage with TypeScript
const birthDate = ref<string>('')
const isValid = ref<boolean>(true)

const handleValidation = (valid: boolean) => {
  isValid.value = valid
}
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/input/fds-dato-felter.vue -->