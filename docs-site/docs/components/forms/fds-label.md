---
title: FdsLabel
description: Form label component implementing DKFDS v11 label specifications with automatic association, required field indicators, and form group integration
category: forms
dkfds: true
accessibility: WCAG 2.1 AA
tags: [form, label, required, association, accessibility]
---

# FdsLabel

Form label component implementing DKFDS v11 label specifications. Provides accessible labels for form controls with automatic association through 'for' attributes, required field indicators, and integration with form group context. Supports both explicit ID binding and automatic ID injection from parent form groups following DKFDS accessibility patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsLabel } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsFormgroup>
    <FdsLabel :required="true">Email Address</FdsLabel>
    <FdsInput v-model="email" type="email" />
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'

const email = ref('')
</script>
```

## Props

| Prop           | Type      | Default           | Required | Description                                                                                                                          |
| -------------- | --------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `forId`        | `string`  | `undefined`       | No       | The ID of the form control this label is associated with. If not provided, will use the form ID from parent FdsFormgroup context.   |
| `required`     | `boolean` | `false`           | No       | Whether the associated field is required. When true, displays the required indicator text after the label.                          |
| `showRequired` | `boolean` | `true`            | No       | Show required indicator when field is required. Only applies when required prop is true.                                            |
| `requiredText` | `string`  | `'(skal udfyldes)'` | No       | Text to display for required fields indicator. Follows Danish language conventions by default.                                      |

## Slots

| Slot      | Slot Props | Description                                                      |
| --------- | ---------- | ---------------------------------------------------------------- |
| `default` | None       | The label text content. Can contain plain text or HTML elements |

## Usage Examples

### Basic Label with Explicit ID

```vue
<template>
  <div>
    <FdsLabel forId="email-input">Email Address</FdsLabel>
    <FdsInput id="email-input" v-model="email" type="email" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsLabel, FdsInput } from '@madsb/dkfds-vue3'

const email = ref('')
</script>
```

### Required Field with Default Danish Text

```vue
<template>
  <FdsFormgroup>
    <FdsLabel :required="true">Password</FdsLabel>
    <FdsInput v-model="password" type="password" />
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'

const password = ref('')
</script>
```

### Required Field with Custom Text

```vue
<template>
  <FdsFormgroup>
    <FdsLabel 
      :required="true" 
      requiredText="(obligatorisk)"
    >
      Personal ID Number
    </FdsLabel>
    <FdsInput v-model="personalId" />
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'

const personalId = ref('')
</script>
```

### Using with Form Group Slot Props

```vue
<template>
  <FdsFormgroup>
    <template #default="{ formid }">
      <FdsLabel :forId="formid" :required="true">Username</FdsLabel>
      <FdsHint :id="`${formid}-hint`">Must be unique and at least 3 characters</FdsHint>
      <FdsInput 
        :id="formid" 
        v-model="username" 
        :aria-describedby="`${formid}-hint`"
      />
    </template>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsHint, FdsInput } from '@madsb/dkfds-vue3'

const username = ref('')
</script>
```

### Hiding Required Indicator

```vue
<template>
  <FdsFormgroup>
    <FdsLabel 
      :required="true" 
      :showRequired="false"
      class="visually-required"
    >
      Credit Card Number
    </FdsLabel>
    <FdsInput v-model="creditCard" />
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'

const creditCard = ref('')
</script>

<style scoped>
.visually-required::after {
  content: " *";
  color: #d93025;
}
</style>
```

### Complex Form with Multiple Required Fields

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Personal Information Section -->
    <fieldset class="form-fieldset">
      <legend class="form-legend">Personal Information</legend>
      
      <div class="grid-row">
        <div class="grid-col-12 grid-col-md-6">
          <FdsFormgroup :isValid="validation.firstName.isValid">
            <FdsLabel :required="true">First Name</FdsLabel>
            <FdsInput 
              v-model="form.firstName" 
              @blur="validateField('firstName')"
              placeholder="e.g., Anders"
            />
            <FdsFejlmeddelelse v-if="!validation.firstName.isValid">
              {{ validation.firstName.message }}
            </FdsFejlmeddelelse>
          </FdsFormgroup>
        </div>
        
        <div class="grid-col-12 grid-col-md-6">
          <FdsFormgroup :isValid="validation.lastName.isValid">
            <FdsLabel :required="true">Last Name</FdsLabel>
            <FdsInput 
              v-model="form.lastName" 
              @blur="validateField('lastName')"
              placeholder="e.g., Andersen"
            />
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
        <FdsHint>We'll use this for important notifications</FdsHint>
        <FdsInput 
          v-model="form.email" 
          type="email" 
          @blur="validateField('email')"
          placeholder="e.g., anders@example.dk"
        />
        <FdsFejlmeddelelse v-if="!validation.email.isValid">
          {{ validation.email.message }}
        </FdsFejlmeddelelse>
      </FdsFormgroup>
      
      <FdsFormgroup :isValid="validation.phone.isValid">
        <FdsLabel>Phone Number</FdsLabel>
        <FdsHint>Optional - for SMS notifications</FdsHint>
        <FdsInput 
          v-model="form.phone" 
          type="tel" 
          @blur="validateField('phone')"
          placeholder="e.g., +45 12 34 56 78"
        />
        <FdsFejlmeddelelse v-if="!validation.phone.isValid">
          {{ validation.phone.message }}
        </FdsFejlmeddelelse>
      </FdsFormgroup>
    </fieldset>

    <div class="form-actions">
      <FdsButton type="submit" variant="primary" :disabled="!isFormValid">
        Submit Application
      </FdsButton>
      <FdsButton type="button" variant="secondary" @click="resetForm">
        Reset
      </FdsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsInput, 
  FdsFejlmeddelelse, 
  FdsButton 
} from '@madsb/dkfds-vue3'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const validation = ref({
  firstName: { isValid: true, message: '' },
  lastName: { isValid: true, message: '' },
  email: { isValid: true, message: '' },
  phone: { isValid: true, message: '' }
})

const isFormValid = computed(() => 
  Object.values(validation.value).every(field => field.isValid) &&
  form.firstName && 
  form.lastName && 
  form.email
)

const validateField = (fieldName: string) => {
  const field = validation.value[fieldName]
  
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
      const value = form[fieldName]
      field.isValid = value.length >= 2
      field.message = field.isValid ? '' : 'Must be at least 2 characters long'
      break
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      field.isValid = emailRegex.test(form.email)
      field.message = field.isValid ? '' : 'Please enter a valid email address'
      break
      
    case 'phone':
      // Phone is optional, so empty is valid
      if (!form.phone) {
        field.isValid = true
        field.message = ''
        break
      }
      
      const phoneRegex = /^\+?[\d\s-()]{8,}$/
      field.isValid = phoneRegex.test(form.phone)
      field.message = field.isValid ? '' : 'Please enter a valid phone number'
      break
  }
}

const handleSubmit = () => {
  // Validate all required fields
  validateField('firstName')
  validateField('lastName')
  validateField('email')
  validateField('phone')
  
  if (isFormValid.value) {
    console.log('Form submitted:', form)
    // Handle form submission
  }
}

const resetForm = () => {
  Object.assign(form, {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  // Reset validation state
  Object.keys(validation.value).forEach(key => {
    validation.value[key] = { isValid: true, message: '' }
  })
}
</script>
```

### Integration with Custom Components

```vue
<template>
  <FdsFormgroup>
    <FdsLabel 
      :required="true" 
      requiredText="(påkrævet)"
    >
      Date of Birth
    </FdsLabel>
    <FdsHint>Use DD/MM/YYYY format</FdsHint>
    
    <!-- Custom date picker component -->
    <CustomDatePicker
      v-model="dateOfBirth"
      :required="true"
      format="DD/MM/YYYY"
      @validation="handleDateValidation"
    />
    
    <FdsFejlmeddelelse v-if="!isDateValid">
      Please enter a valid date of birth
    </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsHint, FdsFejlmeddelelse } from '@madsb/dkfds-vue3'
import CustomDatePicker from './CustomDatePicker.vue'

const dateOfBirth = ref('')
const isDateValid = ref(true)

const handleDateValidation = (valid: boolean) => {
  isDateValid.value = valid
}
</script>
```

## Accessibility

FdsLabel implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Label Association

- **for attribute**: Automatically associates with form controls using the `for` attribute
- **Automatic ID Resolution**: Uses form ID from parent FdsFormgroup context when no explicit `forId` is provided
- **Screen Reader Support**: Properly announced by assistive technologies when form controls receive focus

### Required Field Indicators

- **Visual Indicators**: Required fields display text indicators (default: "(skal udfyldes)")
- **Semantic Markup**: Required state is communicated through proper markup and ARIA attributes
- **Screen Reader Friendly**: Required indicators are announced as part of the label content

### Keyboard Navigation

- **Focus Management**: Clicking label properly moves focus to associated form control
- **Keyboard Accessibility**: No interference with standard keyboard navigation patterns
- **Tab Order**: Does not affect natural tab order of form elements

### Danish Language Support

- **Localized Text**: Default required text follows Danish conventions ("skal udfyldes")
- **Customizable**: Required text can be customized for different contexts or languages
- **Cultural Adaptation**: Supports Danish government self-service solution requirements

## DKFDS Guidelines

FdsLabel follows the Danish Common Design System specifications:

### Design System Integration

- **Semantic Classes**: Uses standard `form-label` CSS class from DKFDS
- **Typography**: Follows DKFDS typography scale and font family specifications
- **Spacing**: Maintains proper spacing relationships with form controls
- **Theme Compatibility**: Works with both VirkDK and BorgerDK themes

### Form Structure Standards

- **DKFDS v11 Compliance**: Implements latest DKFDS form labeling specifications
- **Consistent Patterns**: Provides standard approach to form field labeling
- **Integration Ready**: Designed to work seamlessly with other DKFDS form components
- **Accessibility First**: Built-in compliance with DKFDS accessibility requirements

### Required Field Conventions

- **Danish Standards**: Default required text follows Danish public sector conventions
- **Visual Consistency**: Required indicators styled according to DKFDS patterns
- **User Experience**: Clear, unambiguous indication of required fields
- **Flexibility**: Supports customization while maintaining accessibility

### Best Practices

- **Semantic HTML**: Uses proper `<label>` element for maximum compatibility
- **Progressive Enhancement**: Works without JavaScript while enhanced with Vue reactivity
- **Form Group Integration**: Seamlessly integrates with DKFDS form group patterns
- **Error Handling**: Supports DKFDS validation and error reporting workflows

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group container with validation context
- **[FdsHint](/components/forms/fds-hint)** - Form field hints and guidance text
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages for validation
- **[FdsInput](/components/input/fds-input)** - Text input with label association
- **[FdsCheckbox](/components/input/fds-checkbox)** - Checkbox input with built-in labels
- **[FdsRadio](/components/input/fds-radio)** - Radio button input with labels

## TypeScript Support

```typescript
import type { FdsLabelProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsLabelProps {
  forId?: string
  required?: boolean
  showRequired?: boolean
  requiredText?: string
}

// Usage in component
const labelProps: FdsLabelProps = {
  forId: 'my-input',
  required: true,
  requiredText: '(obligatorisk)'
}
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/forms/fds-label.vue -->