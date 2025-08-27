---
title: FdsFejlopsummering
description: Error summary component implementing DKFDS v11 fejlopsummering specifications with automatic error collection and navigation
category: feedback
dkfds: true
accessibility: WCAG 2.1 AA
tags: [error, validation, form, navigation, accessibility, fejlopsummering]
---

# FdsFejlopsummering

Error summary component implementing DKFDS v11 fejlopsummering specifications. Provides a centralized display of form validation errors with direct navigation to error fields. Features automatic error collection from child form components, manual error management, and proper ARIA navigation structure. Essential for accessible form validation workflows.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsFejlopsummering } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsFejlopsummering 
    :errors="[
      { id: 'email', message: 'Email er påkrævet' },
      { id: 'password', message: 'Password skal være mindst 8 tegn' }
    ]"
  />
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `header` | `string` | `'Der er problemer'` | No | Main heading text for the error summary section. Should clearly indicate this is an error summary for users |
| `id` | `string` | `undefined` | No | Unique identifier for the error summary container. Auto-generated if not provided for proper ARIA labeling |
| `errors` | `ErrorItem[]` | `[]` | No | Manual list of error items to display. Each error should have an id matching a form field and descriptive message |
| `autoCollect` | `boolean` | `true` | No | Whether to automatically collect errors from child form components. When enabled, form fields can register errors automatically |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `error-clicked` | `string` | Emitted when a user clicks on an error link in the summary. Provides the field ID for custom handling or analytics tracking |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `header` | - | Custom header content. Overrides the `header` prop for complete control over heading display |
| `default` | - | Additional error items to display after automatic and manual errors. Useful for custom error content |

## Usage Examples

### Basic Error Summary with Manual Errors

```vue
<template>
  <FdsFejlopsummering 
    :errors="[
      { id: 'email', message: 'Email er påkrævet' },
      { id: 'password', message: 'Password skal være mindst 8 tegn' }
    ]"
  />
</template>
```

### Auto-Collecting Errors from Form Fields

The component automatically collects errors from child form components when `auto-collect` is enabled (default):

```vue
<template>
  <FdsFejlopsummering :auto-collect="true">
    <form>
      <fds-formgroup id="bruger-navn">
        <fds-label>Brugernavn *</fds-label>
        <fds-input v-model="brugerform.navn" />
        <fds-fejlmeddelelse v-if="!brugerform.navn">
          Brugernavn er påkrævet
        </fds-fejlmeddelelse>
      </fds-formgroup>

      <fds-formgroup id="email-adresse">
        <fds-label>Email *</fds-label>
        <fds-input v-model="brugerform.email" type="email" />
        <fds-fejlmeddelelse v-if="!isValidEmail">
          Indtast en gyldig email adresse
        </fds-fejlmeddelelse>
      </fds-formgroup>
    </form>
  </FdsFejlopsummering>
</template>

<script setup>
import { ref, computed } from 'vue'

const brugerform = ref({
  navn: '',
  email: ''
})

const isValidEmail = computed(() => {
  if (!brugerform.value.email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(brugerform.value.email)
})
</script>
```

### Custom Header with Error Click Handling

```vue
<template>
  <FdsFejlopsummering 
    header="Ret venligst følgende problemer"
    :errors="formularFejl"
    @error-clicked="handleFejlKlik"
  >
    <template #header>
      <strong>Valideringsfejl ({{ fejlAntal }})</strong>
    </template>
  </FdsFejlopsummering>
</template>

<script setup>
const formularFejl = ref([
  { id: 'cpr-nummer', message: 'CPR-nummer er påkrævet og skal være gyldigt' },
  { id: 'telefon', message: 'Telefonnummer skal være 8 cifre' }
])

const fejlAntal = computed(() => formularFejl.value.length)

const handleFejlKlik = (feltId: string) => {
  console.log('Navigerer til felt:', feltId)
  // Tilføj custom tracking eller handling her
}
</script>
```

### Danish Government Form Validation

```vue
<template>
  <div class="ansøgning-formular">
    <FdsFejlopsummering 
      header="Der er fejl i din ansøgning"
      :errors="ansøgningsFejl"
      @error-clicked="trackFejlNavigation"
    />

    <form>
      <fds-formgroup id="ansøger-navn">
        <fds-label>Ansøgers fulde navn *</fds-label>
        <fds-input v-model="ansøgning.navn" required />
        <fds-fejlmeddelelse v-if="!ansøgning.navn">
          Ansøgers navn er påkrævet
        </fds-fejlmeddelelse>
      </fds-formgroup>

      <fds-formgroup id="ansøger-cpr">
        <fds-label>CPR-nummer *</fds-label>
        <fds-input v-model="ansøgning.cpr" placeholder="DDMMÅÅ-XXXX" />
        <fds-fejlmeddelelse v-if="!isValidCPR">
          Indtast et gyldigt CPR-nummer (DDMMÅÅ-XXXX)
        </fds-fejlmeddelelse>
      </fds-formgroup>

      <fds-formgroup id="ansøger-adresse">
        <fds-label>Bopælsadresse *</fds-label>
        <fds-textarea v-model="ansøgning.adresse" rows="3" />
        <fds-fejlmeddelelse v-if="!ansøgning.adresse">
          Bopælsadresse er påkrævet
        </fds-fejlmeddelelse>
      </fds-formgroup>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const ansøgning = ref({
  navn: '',
  cpr: '',
  adresse: ''
})

const isValidCPR = computed(() => {
  if (!ansøgning.value.cpr) return false
  // Simpel CPR format validering - ikke fuld validering
  return /^\d{6}-\d{4}$/.test(ansøgning.value.cpr)
})

const ansøgningsFejl = computed(() => {
  const fejl = []
  
  if (!ansøgning.value.navn) {
    fejl.push({ id: 'ansøger-navn', message: 'Ansøgers navn er påkrævet' })
  }
  
  if (!isValidCPR.value) {
    fejl.push({ id: 'ansøger-cpr', message: 'Gyldigt CPR-nummer er påkrævet' })
  }
  
  if (!ansøgning.value.adresse) {
    fejl.push({ id: 'ansøger-adresse', message: 'Bopælsadresse er påkrævet' })
  }
  
  return fejl
})

const trackFejlNavigation = (feltId) => {
  // Analytics tracking for error navigation
  console.log('Bruger navigerede til fejl:', feltId)
}
</script>
```

### Disabled Auto-Collection with Manual Error Management

```vue
<template>
  <FdsFejlopsummering 
    :auto-collect="false"
    :errors="manuelleFejl"
    header="Ret følgende fejl"
  />
</template>

<script setup>
const manuelleFejl = ref([
  { id: 'custom-field-1', message: 'Dette felt skal udfyldes korrekt' },
  { id: 'custom-field-2', message: 'Værdi skal være mellem 1 og 100' }
])
</script>
```

### Custom Slot Content

```vue
<template>
  <FdsFejlopsummering header="Formular problemer">
    <li>
      <a href="#custom-field" @click.prevent="scrollToCustomField">
        Custom fejlmeddelelse som ikke er koblet til et felt
      </a>
    </li>
    <li>
      <a href="#another-issue" @click.prevent="handleCustomError">
        Andet problem der kræver opmærksomhed
      </a>
    </li>
  </FdsFejlopsummering>
</template>
```

## Error Collection and Aggregation Patterns

### Automatic Collection from Form Groups

The component uses Vue's provide/inject pattern to automatically collect errors from child `fds-formgroup` components:

```vue
<template>
  <!-- Error summary will automatically display errors from form groups below -->
  <FdsFejlopsummering />
  
  <form>
    <!-- These errors will be automatically collected -->
    <fds-formgroup id="felt1">
      <fds-fejlmeddelelse v-if="showError1">Fejl i felt 1</fds-fejlmeddelelse>
    </fds-formgroup>
    
    <fds-formgroup id="felt2">
      <fds-fejlmeddelelse v-if="showError2">Fejl i felt 2</fds-fejlmeddelelse>
    </fds-formgroup>
  </form>
</template>
```

### Manual Error Registration

For complex scenarios, you can disable auto-collection and manage errors manually:

```typescript
interface ErrorItem {
  id: string        // Must match form field ID
  message: string   // Human-readable error message
  element?: HTMLElement // Optional reference to form element
}

const errors: ErrorItem[] = [
  { id: 'email-field', message: 'Email er påkrævet' },
  { id: 'phone-field', message: 'Telefon skal være 8 cifre' }
]
```

## Navigation to Specific Form Errors

### Smooth Scrolling and Focus Management

The component automatically handles navigation to error fields:

1. **Smooth Scrolling**: Scrolls to the error field with smooth behavior
2. **Focus Management**: Focuses the input element after scrolling
3. **Element Detection**: Finds the actual input within form groups
4. **Timing Control**: Uses appropriate delays for smooth user experience

```vue
<template>
  <FdsFejlopsummering 
    :errors="formErrors"
    @error-clicked="onErrorClick"
  />
  
  <!-- Long form with scrollable content -->
  <form style="min-height: 200vh">
    <div style="height: 50vh;"></div> <!-- Spacing -->
    
    <fds-formgroup id="distant-field">
      <fds-label>Distant Field</fds-label>
      <fds-input v-model="fieldValue" />
      <fds-fejlmeddelelse v-if="hasError">
        This field has an error
      </fds-fejlmeddelelse>
    </fds-formgroup>
  </form>
</template>

<script setup>
const onErrorClick = (fieldId: string) => {
  // Custom handling for error navigation
  console.log(`Navigating to field: ${fieldId}`)
  
  // The component handles the actual scrolling and focus
  // You can add custom logic here for analytics or other needs
}
</script>
```

## Focus Management for Accessibility

### ARIA Navigation Structure

The component implements proper ARIA navigation for screen readers:

```html
<!-- Generated structure -->
<nav aria-labelledby="error-summary-heading">
  <div class="alert alert-error" role="alert">
    <fds-ikon icon="error" aria-label="Fejl" :decorative="false" />
    <div class="alert-body">
      <h2 id="error-summary-heading">Der er problemer</h2>
      <ul class="nobullet-list">
        <li>
          <a href="#field-id" @click.prevent="focusField('field-id')">
            Error message
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### Screen Reader Announcements

The error summary is announced to screen readers through:
- `role="alert"` for immediate attention
- Error icon with proper `aria-label`
- Semantic heading structure
- List structure for error organization

## Screen Reader Support for Error Announcements

### Error Announcement Patterns

```vue
<template>
  <FdsFejlopsummering 
    header="Der er 3 fejl i formularen"
    :errors="errors"
    aria-live="polite"
  />
</template>
```

### Live Region Updates

When errors are added or removed, screen readers are notified through:
- `role="alert"` on the error container
- Dynamic error count updates in header
- Proper focus management on error links

## Form Validation Integration Patterns

### Real-time Validation with Error Summary

```vue
<template>
  <div class="validation-form">
    <FdsFejlopsummering 
      :errors="allValidationErrors"
      @error-clicked="focusErrorField"
    />

    <form @submit.prevent="submitForm">
      <fds-formgroup 
        v-for="field in formFields" 
        :key="field.id"
        :id="field.id"
      >
        <fds-label>{{ field.label }}</fds-label>
        <fds-input 
          v-model="formData[field.id]"
          :type="field.type"
          @blur="validateField(field.id)"
        />
        <fds-fejlmeddelelse v-if="fieldErrors[field.id]">
          {{ fieldErrors[field.id] }}
        </fds-fejlmeddelelse>
      </fds-formgroup>

      <fds-button 
        type="submit" 
        :disabled="hasValidationErrors"
        variant="primary"
      >
        Send ansøgning
      </fds-button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const formFields = [
  { id: 'navn', label: 'Fulde navn', type: 'text', required: true },
  { id: 'email', label: 'Email adresse', type: 'email', required: true },
  { id: 'telefon', label: 'Telefonnummer', type: 'tel', required: false }
]

const formData = reactive({
  navn: '',
  email: '',
  telefon: ''
})

const fieldErrors = reactive({})

const allValidationErrors = computed(() => {
  return Object.entries(fieldErrors)
    .filter(([_, error]) => error)
    .map(([fieldId, message]) => ({ id: fieldId, message }))
})

const hasValidationErrors = computed(() => {
  return allValidationErrors.value.length > 0
})

const validateField = (fieldId: string) => {
  const field = formFields.find(f => f.id === fieldId)
  const value = formData[fieldId]
  
  // Clear existing error
  fieldErrors[fieldId] = null
  
  // Required field validation
  if (field.required && !value) {
    fieldErrors[fieldId] = `${field.label} er påkrævet`
    return
  }
  
  // Field-specific validation
  if (fieldId === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      fieldErrors[fieldId] = 'Indtast en gyldig email adresse'
    }
  }
  
  if (fieldId === 'telefon' && value) {
    if (!/^\d{8}$/.test(value.replace(/\s/g, ''))) {
      fieldErrors[fieldId] = 'Telefonnummer skal være 8 cifre'
    }
  }
}

const focusErrorField = (fieldId: string) => {
  // Additional custom handling if needed
  console.log(`Focusing error field: ${fieldId}`)
}

const submitForm = () => {
  // Validate all fields before submission
  formFields.forEach(field => validateField(field.id))
  
  if (!hasValidationErrors.value) {
    // Submit form
    console.log('Form submitted:', formData)
  }
}
</script>
```

### Validation with Server-side Errors

```vue
<template>
  <FdsFejlopsummering 
    :errors="[...clientErrors, ...serverErrors]"
    header="Ret fejl i formularen"
  />
</template>

<script setup>
const clientErrors = ref([]) // Client-side validation
const serverErrors = ref([]) // Server response errors

const submitForm = async () => {
  try {
    const response = await api.submitForm(formData)
    serverErrors.value = [] // Clear on success
  } catch (error) {
    // Map server errors to ErrorItem format
    serverErrors.value = error.response.data.errors.map(err => ({
      id: err.field,
      message: err.message
    }))
  }
}
</script>
```

## DKFDS v11 Error Summary Specifications

### Design System Compliance

The component follows DKFDS v11 specifications for error summaries:

1. **Visual Design**: Red alert box with error icon
2. **Content Structure**: Heading + bulleted list of errors
3. **Navigation Links**: Clickable links to error fields
4. **Icon Usage**: Error icon with proper accessibility
5. **Typography**: Consistent with DKFDS typography scale

### Error Message Guidelines

Follow DKFDS guidelines for error messages:
- **Clear and Specific**: "Email er påkrævet" not "Fejl i email"
- **Actionable**: Tell users what to do to fix the error  
- **User-Friendly Language**: Avoid technical jargon
- **Consistent Tone**: Match the overall application tone

### WCAG Compliance Requirements

#### WCAG 2.1 AA Compliance Features

1. **Keyboard Navigation**
   - All error links are keyboard accessible
   - Focus management moves to error fields
   - Tab order follows logical sequence

2. **Screen Reader Support**
   - `role="alert"` for immediate announcement
   - Proper heading hierarchy with `<h2>`
   - Error icon with descriptive `aria-label`
   - Navigation landmark with `aria-labelledby`

3. **Color and Contrast**
   - Error styling doesn't rely solely on color
   - Text meets WCAG contrast requirements
   - Error icon provides additional visual cue

4. **Focus Management**
   - Smooth scrolling to error fields
   - Automatic focus on form inputs
   - Visible focus indicators

#### Accessibility Implementation

```vue
<template>
  <!-- Proper ARIA structure -->
  <nav aria-labelledby="error-heading">
    <div class="alert alert-error" role="alert">
      <fds-ikon 
        icon="error" 
        class="alert-icon" 
        aria-label="Fejl" 
        :decorative="false" 
      />
      <div class="alert-body">
        <h2 id="error-heading">{{ header }}</h2>
        <ul class="nobullet-list">
          <li v-for="error in allErrors" :key="error.id">
            <a 
              class="function-link" 
              :href="`#${error.id}`" 
              @click.prevent="focusField(error.id)"
            >
              {{ error.message }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
```

### Error Summary Best Practices

1. **Placement**: Position at top of form, before any form fields
2. **Visibility**: Ensure error summary is visible on page load
3. **Error Count**: Include error count in header when helpful
4. **Persistence**: Keep error summary visible until errors are fixed
5. **Progressive Enhancement**: Works without JavaScript for basic functionality

## TypeScript Interfaces

```typescript
export interface ErrorItem {
  /** Unique identifier matching the form field ID */
  id: string
  /** Human-readable error message to display */
  message: string
  /** Optional reference to the associated form element */
  element?: HTMLElement
}

export interface FdsFejlopsummeringProps {
  /** 
   * Main heading text for the error summary section
   * Should clearly indicate this is an error summary for users
   * @default 'Der er problemer'
   */
  header?: string
  /** 
   * Unique identifier for the error summary container
   * Auto-generated if not provided for proper ARIA labeling
   */
  id?: string
  /** 
   * Manual list of error items to display
   * Each error should have an id matching a form field and descriptive message
   * @default []
   */
  errors?: ErrorItem[]
  /** 
   * Whether to automatically collect errors from child form components
   * When enabled, form fields can register errors automatically
   * @default true
   */
  autoCollect?: boolean
}

// Component events
export interface FdsFejlopsummeringEmits {
  /** 
   * Emitted when a user clicks on an error link in the summary
   * Provides the field ID for custom handling or analytics tracking
   */
  'error-clicked': [id: string]
}
```

## Accessibility

- **WCAG 2.1 AA compliant** with proper ARIA navigation structure
- **Screen reader support** with `role="alert"` and descriptive labeling  
- **Keyboard navigation** to all error links with focus management
- **Focus management** automatically focuses error fields on navigation
- **High contrast** error styling with icon and color indicators
- **Semantic HTML** with proper heading hierarchy and list structure

## Related Components

- [FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse) - Individual error messages for form fields
- [FdsFormgroup](/components/forms/fds-formgroup) - Form field grouping with error integration
- [FdsAlert](/components/feedback/fds-alert) - General purpose alert component
- [FdsInput](/components/input/fds-input) - Input component with error state support

<!-- Verified against source -->