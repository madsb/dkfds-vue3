---
title: FdsFejlmeddelelse
description: Error message component implementing DKFDS error display specifications with accessibility features and form validation integration
category: forms
dkfds: true
accessibility: WCAG 2.1 AA
tags: [error, validation, form, accessibility, fejl]
---

# FdsFejlmeddelelse

Error message component implementing DKFDS v11 error display specifications. Displays validation error messages with proper accessibility attributes, automatic error summary registration, and integration with form validation state. Supports both manual error content through slots and automatic error display from form validation context following DKFDS error patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsFejlmeddelelse } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsFormgroup :isValid="isEmailValid">
    <FdsLabel>Email Address</FdsLabel>
    <FdsInput v-model="email" @blur="validateEmail" />
    <FdsFejlmeddelelse v-if="!isEmailValid">
      Please enter a valid email address
    </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsInput, FdsFejlmeddelelse } from '@madsb/dkfds-vue3'

const email = ref('')
const isEmailValid = ref(true)

const validateEmail = () => {
  isEmailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
}
</script>
```

## Props

| Prop   | Type      | Default     | Required | Description                                                                                                                                                         |
| ------ | --------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `boolean` | `true`      | No       | Automatically display error message from validation context. When true, shows error message from injected validation state. When false, only displays slot content. |
| `id`   | `string`  | `undefined` | No       | Custom ID for the error message element. If not provided, uses the errorId from parent FdsFormgroup. Used for aria-describedby relationships with form controls.   |

## Slots

| Slot      | Slot Props | Description                                                                                                                                           |
| --------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default` | None       | Error message content. When provided, takes precedence over automatic error messages from validation context. Supports text, HTML, or Vue components. |

## Injects

The component injects the following values from parent components:

| Key                  | Type                                 | Description                                                                                                                 |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `provideErrorMessage` | `Ref<string \| null> \| string \| null` | Error message from form validation context. Used when `auto` is true and no slot content is provided.                      |
| `provideIsValid`     | `Ref<boolean> \| boolean`            | Validation state from parent form group or validation context. Determines when to show the error message.                  |
| `formid`             | `Ref<string> \| string \| undefined` | Form field ID from parent FdsFormgroup. Used for error summary registration and association with form controls.            |
| `errorId`            | `Ref<string> \| string \| undefined` | Error element ID from parent FdsFormgroup. Used as the component ID if no custom ID is provided.                           |
| `errorSummary`       | `ErrorSummaryContext \| null`       | Error summary registration functions. Used to automatically register/unregister errors with FdsFejlopsummering components. |

## Usage Examples

### Basic Error Message with Manual Content

```vue
<template>
  <form>
    <FdsFormgroup :isValid="isNameValid">
      <FdsLabel>Full Name</FdsLabel>
      <FdsInput v-model="userName" @blur="validateName" />
      <FdsFejlmeddelelse v-if="!isNameValid">
        Name must be at least 3 characters long
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsButton type="submit" :disabled="!isNameValid">Submit</FdsButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userName = ref('')
const isNameValid = ref(true)

const validateName = () => {
  isNameValid.value = userName.value.length >= 3
}
</script>
```

### Automatic Error from Validation Context

```vue
<template>
  <FormValidationProvider :errors="formErrors">
    <FdsFormgroup id="email-field">
      <FdsLabel>Email Address</FdsLabel>
      <FdsInput v-model="formData.email" @input="clearError('email')" />
      <!-- Automatically displays error from validation context -->
      <FdsFejlmeddelelse />
    </FdsFormgroup>
  </FormValidationProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({ email: '' })
const formErrors = ref({ email: 'Invalid email format' })

const clearError = (field: string) => {
  delete formErrors.value[field]
}
</script>
```

### Custom Error ID and Manual Control

```vue
<template>
  <div class="custom-form-field">
    <label for="custom-input">Special Input</label>
    <input
      id="custom-input"
      v-model="inputValue"
      :aria-describedby="showError ? 'custom-error' : undefined"
      :aria-invalid="showError"
    />
    <FdsFejlmeddelelse :auto="false" id="custom-error" v-if="showError">
      {{ customErrorMessage }}
    </FdsFejlmeddelelse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const inputValue = ref('')
const customErrorMessage = ref('This field is required')

const showError = computed(() => inputValue.value === '' && inputValue.value !== null)
</script>
```

### Dynamic Error Messages with Validation Rules

```vue
<template>
  <FdsFormgroup :isValid="isPasswordValid">
    <FdsLabel>Password</FdsLabel>
    <FdsHint>Must contain at least 8 characters, one uppercase, one lowercase, and one number</FdsHint>
    <FdsInput v-model="password" type="password" @input="validatePassword" />
    <FdsFejlmeddelelse v-if="!isPasswordValid">
      {{ passwordErrorMessage }}
    </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const password = ref('')

const passwordValidation = computed(() => {
  if (password.value.length === 0) return { valid: true, message: '' }
  if (password.value.length < 8) return { valid: false, message: 'Password must be at least 8 characters long' }
  if (!/[A-Z]/.test(password.value)) return { valid: false, message: 'Password must contain at least one uppercase letter' }
  if (!/[a-z]/.test(password.value)) return { valid: false, message: 'Password must contain at least one lowercase letter' }
  if (!/\d/.test(password.value)) return { valid: false, message: 'Password must contain at least one number' }
  return { valid: true, message: '' }
})

const isPasswordValid = computed(() => passwordValidation.value.valid)
const passwordErrorMessage = computed(() => passwordValidation.value.message)

const validatePassword = () => {
  // Validation happens reactively through computed properties
}
</script>
```

### Integration with Error Summary

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Error summary will automatically collect all form errors -->
    <FdsFejlopsummering v-if="hasErrors" />

    <FdsFormgroup id="first-name" :isValid="validation.firstName.isValid">
      <FdsLabel>First Name</FdsLabel>
      <FdsInput v-model="formData.firstName" @blur="validateField('firstName')" />
      <!-- Automatically registers with error summary -->
      <FdsFejlmeddelelse v-if="!validation.firstName.isValid">
        {{ validation.firstName.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsFormgroup id="last-name" :isValid="validation.lastName.isValid">
      <FdsLabel>Last Name</FdsLabel>
      <FdsInput v-model="formData.lastName" @blur="validateField('lastName')" />
      <FdsFejlmeddelelse v-if="!validation.lastName.isValid">
        {{ validation.lastName.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsFormgroup id="email" :isValid="validation.email.isValid">
      <FdsLabel>Email Address</FdsLabel>
      <FdsInput v-model="formData.email" type="email" @blur="validateField('email')" />
      <FdsFejlmeddelelse v-if="!validation.email.isValid">
        {{ validation.email.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsButton type="submit" :disabled="hasErrors">Submit Form</FdsButton>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
})

const validation = ref({
  firstName: { isValid: true, message: '' },
  lastName: { isValid: true, message: '' },
  email: { isValid: true, message: '' },
})

const hasErrors = computed(() => 
  !validation.value.firstName.isValid || 
  !validation.value.lastName.isValid || 
  !validation.value.email.isValid
)

const validateField = (fieldName: string) => {
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
      const value = formData[fieldName as keyof typeof formData]
      validation.value[fieldName].isValid = value.length >= 2
      validation.value[fieldName].message = value.length >= 2 ? '' : 'Must be at least 2 characters'
      break
      
    case 'email':
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      validation.value.email.isValid = emailValid
      validation.value.email.message = emailValid ? '' : 'Please enter a valid email address'
      break
  }
}

const handleSubmit = () => {
  // Validate all fields before submission
  Object.keys(formData).forEach(validateField)
  
  if (!hasErrors.value) {
    console.log('Form submitted:', formData)
  }
}
</script>
```

### Complex Validation with Multiple Error Types

```vue
<template>
  <FdsFormgroup :isValid="isFormValid">
    <FdsLabel>Danish CPR Number</FdsLabel>
    <FdsHint>Format: DDMMYY-XXXX (e.g., 010190-1234)</FdsHint>
    <FdsInput 
      v-model="cprNumber" 
      placeholder="010190-1234" 
      @blur="validateCPR" 
      @input="clearValidation"
    />
    <FdsFejlmeddelelse v-if="!isFormValid">
      <ul v-if="validationErrors.length > 1" class="form-error-list">
        <li v-for="error in validationErrors" :key="error">{{ error }}</li>
      </ul>
      <span v-else>{{ validationErrors[0] }}</span>
    </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const cprNumber = ref('')
const validationErrors = ref<string[]>([])

const isFormValid = computed(() => validationErrors.value.length === 0)

const validateCPR = () => {
  const errors: string[] = []
  const cpr = cprNumber.value.replace(/\D/g, '') // Remove non-digits
  
  if (cpr.length === 0) {
    errors.push('CPR number is required')
  } else {
    if (cpr.length !== 10) {
      errors.push('CPR number must be exactly 10 digits')
    }
    
    if (!/^\d{6}-?\d{4}$/.test(cprNumber.value)) {
      errors.push('Invalid CPR format. Use DDMMYY-XXXX')
    }
    
    if (cpr.length === 10) {
      const day = parseInt(cpr.substring(0, 2))
      const month = parseInt(cpr.substring(2, 4))
      
      if (day < 1 || day > 31) {
        errors.push('Invalid day in CPR number')
      }
      
      if (month < 1 || month > 12) {
        errors.push('Invalid month in CPR number')
      }
    }
  }
  
  validationErrors.value = errors
}

const clearValidation = () => {
  if (validationErrors.value.length > 0) {
    validationErrors.value = []
  }
}
</script>

<style scoped>
.form-error-list {
  margin: 0;
  padding-left: 1rem;
}

.form-error-list li {
  margin-bottom: 0.25rem;
}
</style>
```

## Accessibility

FdsFejlmeddelelse implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Screen Reader Support

- **Danish Language Prefix**: Automatically adds "Fejl: " (Error:) as screen reader only text using `sr-only` class
- **Semantic Markup**: Uses `<span>` element with `form-error-message` class for proper identification
- **Dynamic Announcements**: Error appearance and disappearance are announced to screen readers through DOM changes

### ARIA Integration

- **ID Association**: Provides unique ID for `aria-describedby` relationships with form controls
- **Context Integration**: Automatically uses error ID from parent FdsFormgroup when available
- **Form Control Linking**: Error messages are programmatically associated with their corresponding form inputs

### Error Summary Integration

- **Automatic Registration**: Errors are automatically registered with FdsFejlopsummering when present
- **Focus Management**: Registered errors support focus navigation from error summary
- **Dynamic Updates**: Registration updates automatically when error content or visibility changes

### Keyboard Navigation

- **Non-Intrusive**: Does not interfere with natural keyboard navigation flow
- **Focus Management**: When accessed via error summary, properly manages focus to associated form control
- **Screen Reader Flow**: Maintains logical reading order within form groups

### Visual Accessibility

- **High Contrast**: Uses DKFDS error styling that works with high contrast modes
- **Color Independence**: Does not rely solely on color to convey error state (uses text and ARIA)
- **Semantic Classes**: Uses `form-error-message` class for consistent styling across themes

## DKFDS Guidelines

FdsFejlmeddelelse follows the Danish Common Design System specifications:

### Design System Integration

- **DKFDS v11 Compliance**: Implements latest error message specifications
- **Semantic Classes**: Uses standard `form-error-message` CSS class from DKFDS
- **Theme Compatibility**: Works with both VirkDK and BorgerDK themes
- **Design Tokens**: Respects DKFDS color, typography, and spacing tokens

### Danish Language Support

- **Localized Prefix**: Uses "Fejl: " prefix appropriate for Danish government services
- **Cultural Context**: Supports Danish form validation patterns and conventions
- **Screen Reader Danish**: "Fejl:" prefix is properly announced in Danish language context
- **Government Standards**: Meets Danish public sector digital accessibility requirements

### Error Handling Patterns

- **DKFDS Error Summary**: Integrates seamlessly with FdsFejlopsummering for complex forms
- **Validation State**: Works with DKFDS form validation state management
- **Progressive Enhancement**: Provides fallback behavior when JavaScript is disabled
- **Form Structure**: Maintains DKFDS-compliant form markup structure

### Best Practices

- **Contextual Errors**: Shows errors in context with form fields, not just at form level
- **Clear Messaging**: Supports specific, actionable error messages
- **Error Prevention**: Can be used with real-time validation to prevent errors
- **User Experience**: Provides immediate feedback while maintaining usability

### Integration Standards

- **Form Group Integration**: Works seamlessly within FdsFormgroup components
- **Validation Context**: Supports both manual and automatic error display modes
- **ID Management**: Follows DKFDS ID naming conventions for form elements
- **Accessibility Chain**: Maintains proper accessibility relationships throughout form structure

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group container with validation state management
- **[FdsLabel](/components/forms/fds-label)** - Form labels with automatic association
- **[FdsHint](/components/forms/fds-hint)** - Form field hints and guidance
- **[FdsInput](/components/input/fds-input)** - Text input with form group integration
- **[FdsFejlopsummering](/components/feedback/fds-fejlopsummering)** - Error summary for complex forms

## TypeScript Support

```typescript
import type { FdsFejlmeddelelseProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsFejlmeddelelseProps {
  auto?: boolean
  id?: string
}

// Error summary context interface
interface ErrorSummaryContext {
  registerError: (id: string, message: string, element?: HTMLElement) => void
  unregisterError: (id: string) => void
  clearErrors: () => void
}
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/forms/fds-fejlmeddelelse.vue -->