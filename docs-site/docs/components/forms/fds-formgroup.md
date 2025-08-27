---
title: FdsFormgroup
description: Form group component implementing DKFDS form structure specifications with validation state management and accessibility features
category: forms
dkfds: true
accessibility: WCAG 2.1 AA
tags: [form, group, validation, accessibility, fieldset]
---

# FdsFormgroup

Form group component implementing DKFDS v11 form structure specifications. Provides semantic grouping for form controls with integrated validation state management, accessibility features, and context for child components. Automatically handles aria-describedby relationships, validation styling, and ID management following DKFDS accessibility patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsFormgroup } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsFormgroup :isValid="isEmailValid">
    <FdsLabel>Email Address</FdsLabel>
    <FdsHint>We'll use this to send you updates</FdsHint>
    <FdsInput v-model="email" @blur="validateEmail" />
    <FdsFejlmeddelelse v-if="!isEmailValid"> Please enter a valid email address </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsHint, FdsInput, FdsFejlmeddelelse } from '@madsb/dkfds-vue3'

const email = ref('')
const isEmailValid = ref(true)

const validateEmail = () => {
  isEmailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
}
</script>
```

## Props

| Prop      | Type      | Default     | Required | Description                                                                                                                                                                    |
| --------- | --------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`      | `string`  | `undefined` | No       | Unique identifier for the form group. If not provided, a unique ID will be generated automatically. Used as the base for generating hint and error element IDs.                |
| `isValid` | `boolean` | `true`      | No       | Validation state of the form group. When false, applies 'form-error' class and sets aria-invalid="true". Affects styling and accessibility attributes for child form controls. |

## Slots

| Slot      | Slot Props                                                      | Description                                                                                                                |
| --------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `default` | `{ formid: string, ariaDescribedby: string, isValid: boolean }` | Default slot content. Receives form ID, computed aria-describedby value, and validation state for use in child components. |

## Provides

The component provides the following values to child components via Vue's provide/inject system:

| Key               | Type                   | Description                                                        |
| ----------------- | ---------------------- | ------------------------------------------------------------------ |
| `formid`          | `Ref<string>`          | Form ID that child components can inject for automatic association |
| `hintId`          | `ComputedRef<string>`  | ID for hint elements (`{formid}-hint`)                             |
| `errorId`         | `ComputedRef<string>`  | ID for error message elements (`{formid}-error`)                   |
| `ariaDescribedby` | `ComputedRef<string>`  | Computed aria-describedby value combining hint and error IDs       |
| `isValid`         | `ComputedRef<boolean>` | Current validation state for child components                      |

## Injects

| Key              | Type              | Description                                                                                                           |
| ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `provideIsValid` | `boolean \| null` | External validation state (e.g., from form-level validation). Takes precedence over the `isValid` prop when provided. |

## Usage Examples

### Basic Form Group with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FdsFormgroup id="user-name" :isValid="isNameValid">
      <FdsLabel :required="true">Full Name</FdsLabel>
      <FdsHint>Enter your first and last name</FdsHint>
      <FdsInput v-model="userName" @blur="validateName" placeholder="e.g., Anders Andersen" />
      <FdsFejlmeddelelse v-if="!isNameValid">
        Name must be at least 3 characters long
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsButton type="submit" :disabled="!isNameValid"> Submit </FdsButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userName = ref('')
const isNameValid = ref(true)

const validateName = () => {
  isNameValid.value = userName.value.length >= 3
}

const handleSubmit = () => {
  if (isNameValid.value) {
    console.log('Form submitted:', { name: userName.value })
  }
}
</script>
```

### Using Slot Props for Custom Components

```vue
<template>
  <FdsFormgroup :isValid="isPhoneValid">
    <template #default="{ formid, ariaDescribedby, isValid }">
      <FdsLabel :forId="formid">Phone Number</FdsLabel>
      <FdsHint :id="`${formid}-hint`">Include country code</FdsHint>

      <!-- Custom input component with explicit props -->
      <CustomPhoneInput
        :id="formid"
        :aria-describedby="ariaDescribedby"
        :isValid="isValid"
        v-model="phoneNumber"
        @validation="handlePhoneValidation"
      />

      <FdsFejlmeddelelse v-if="!isValid" :id="`${formid}-error`">
        Please enter a valid phone number
      </FdsFejlmeddelelse>
    </template>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomPhoneInput from './CustomPhoneInput.vue'

const phoneNumber = ref('')
const isPhoneValid = ref(true)

const handlePhoneValidation = (valid: boolean) => {
  isPhoneValid.value = valid
}
</script>
```

### Integration with Form-Level Validation

```vue
<template>
  <form>
    <!-- Form validation provider sets provideIsValid -->
    <FormValidationProvider :errors="formErrors">
      <FdsFormgroup id="email-field">
        <!-- isValid automatically injected from provider -->
        <FdsLabel>Email Address</FdsLabel>
        <FdsHint>Used for account notifications</FdsHint>
        <FdsInput v-model="formData.email" type="email" @input="clearError('email')" />
        <FdsFejlmeddelelse v-if="formErrors.email">
          {{ formErrors.email }}
        </FdsFejlmeddelelse>
      </FdsFormgroup>

      <FdsFormgroup id="password-field">
        <FdsLabel>Password</FdsLabel>
        <FdsHint>Must be at least 8 characters</FdsHint>
        <FdsInput v-model="formData.password" type="password" @input="clearError('password')" />
        <FdsFejlmeddelelse v-if="formErrors.password">
          {{ formErrors.password }}
        </FdsFejlmeddelelse>
      </FdsFormgroup>
    </FormValidationProvider>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  email: '',
  password: '',
})

const formErrors = ref<Record<string, string>>({})

const clearError = (field: string) => {
  delete formErrors.value[field]
}
</script>
```

### Multiple Form Groups with Complex Validation

```vue
<template>
  <form class="grid">
    <!-- Personal Information Section -->
    <fieldset class="form-fieldset">
      <legend class="form-legend">Personal Information</legend>

      <div class="grid-row">
        <div class="grid-col-12 grid-col-md-6">
          <FdsFormgroup :isValid="validation.firstName.isValid">
            <FdsLabel :required="true">First Name</FdsLabel>
            <FdsInput v-model="personalInfo.firstName" @blur="validateField('firstName')" />
            <FdsFejlmeddelelse v-if="!validation.firstName.isValid">
              {{ validation.firstName.message }}
            </FdsFejlmeddelelse>
          </FdsFormgroup>
        </div>

        <div class="grid-col-12 grid-col-md-6">
          <FdsFormgroup :isValid="validation.lastName.isValid">
            <FdsLabel :required="true">Last Name</FdsLabel>
            <FdsInput v-model="personalInfo.lastName" @blur="validateField('lastName')" />
            <FdsFejlmeddelelse v-if="!validation.lastName.isValid">
              {{ validation.lastName.message }}
            </FdsFejlmeddelelse>
          </FdsFormgroup>
        </div>
      </div>
    </fieldset>

    <!-- Contact Information Section -->
    <fieldset class="form-fieldset">
      <legend class="form-legend">Contact Information</legend>

      <FdsFormgroup :isValid="validation.email.isValid">
        <FdsLabel :required="true">Email Address</FdsLabel>
        <FdsHint>We'll never share your email with anyone else</FdsHint>
        <FdsInput v-model="contactInfo.email" type="email" @blur="validateField('email')" />
        <FdsFejlmeddelelse v-if="!validation.email.isValid">
          {{ validation.email.message }}
        </FdsFejlmeddelelse>
      </FdsFormgroup>

      <FdsFormgroup :isValid="validation.phone.isValid">
        <FdsLabel>Phone Number</FdsLabel>
        <FdsHint>Optional - for account security notifications</FdsHint>
        <FdsInput v-model="contactInfo.phone" type="tel" @blur="validateField('phone')" />
        <FdsFejlmeddelelse v-if="!validation.phone.isValid">
          {{ validation.phone.message }}
        </FdsFejlmeddelelse>
      </FdsFormgroup>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const personalInfo = reactive({
  firstName: '',
  lastName: '',
})

const contactInfo = reactive({
  email: '',
  phone: '',
})

const validation = ref({
  firstName: { isValid: true, message: '' },
  lastName: { isValid: true, message: '' },
  email: { isValid: true, message: '' },
  phone: { isValid: true, message: '' },
})

const validateField = (field: string) => {
  // Validation logic implementation
  switch (field) {
    case 'firstName':
    case 'lastName':
      const value = personalInfo[field as keyof typeof personalInfo]
      validation.value[field].isValid = value.length >= 2
      validation.value[field].message = value.length >= 2 ? '' : 'Must be at least 2 characters'
      break

    case 'email':
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)
      validation.value.email.isValid = contactInfo.email === '' || emailValid
      validation.value.email.message =
        emailValid || contactInfo.email === '' ? '' : 'Please enter a valid email address'
      break

    case 'phone':
      const phoneValid = /^\+?[\d\s-()]{10,}$/.test(contactInfo.phone)
      validation.value.phone.isValid = contactInfo.phone === '' || phoneValid
      validation.value.phone.message =
        phoneValid || contactInfo.phone === '' ? '' : 'Please enter a valid phone number'
      break
  }
}
</script>
```

## Accessibility

FdsFormgroup implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### ARIA Attributes

- **aria-invalid**: Set to "true" when `isValid` is false, providing screen reader feedback about validation state
- **aria-describedby**: Automatically computed and provided to child components, linking form controls with their hint and error messages

### ID Management

- Generates unique IDs for form groups using the `formId` composable
- Creates consistent naming patterns for hint (`{formid}-hint`) and error (`{formid}-error`) elements
- Ensures all accessibility relationships are properly established

### Screen Reader Support

- Validation state changes are announced to screen readers via `aria-invalid`
- Error messages and hints are properly associated with form controls through `aria-describedby`
- Automatic context provision ensures child components receive correct accessibility attributes

### Keyboard Navigation

- Does not interfere with natural keyboard navigation flow
- Maintains focus management within form controls
- Error states are properly announced when fields receive focus

### Color and Contrast

- Error styling uses semantic classes that work with DKFDS color schemes
- Does not rely solely on color to convey validation state (uses ARIA attributes)
- High contrast mode compatible through DKFDS design system

## DKFDS Guidelines

FdsFormgroup follows the Danish Common Design System specifications:

### Design System Integration

- Uses semantic `form-group` CSS class from DKFDS
- Applies `form-error` class for validation states
- Maintains 8-point grid system with proper spacing (24px margin-bottom)
- Compatible with both VirkDK and BorgerDK themes

### Form Structure Standards

- Implements DKFDS v11 form structure specifications
- Provides consistent pattern for form field grouping
- Supports DKFDS accessibility requirements out of the box
- Integrates with DKFDS error handling and validation patterns

### Danish Language Support

- Works seamlessly with Danish form field labels and error messages
- Supports Danish government self-service solution requirements
- Compatible with DKFDS localization patterns

### Best Practices

- Encourages proper semantic form structure
- Promotes consistent validation state management
- Facilitates integration with DKFDS error summaries
- Enables systematic form accessibility implementation

## Related Components

- **[FdsLabel](/components/forms/fds-label)** - Form labels with automatic association
- **[FdsHint](/components/forms/fds-hint)** - Form field hints and guidance
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages for form validation
- **[FdsInput](/components/input/fds-input)** - Text input with form group integration
- **[FdsFejlopsummering](/components/feedback/fds-fejlopsummering)** - Error summary for complex forms

## TypeScript Support

```typescript
import type { FdsFormgroupProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsFormgroupProps {
  id?: string
  isValid?: boolean
}

// Slot props interface
interface FormgroupSlotProps {
  formid: string
  ariaDescribedby: string
  isValid: boolean
}
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/forms/fds-formgroup.vue -->
