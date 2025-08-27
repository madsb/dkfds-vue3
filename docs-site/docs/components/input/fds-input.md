---
title: FdsInput
description: Standard text input field with support for prefixes, suffixes, and various input types. Integrates with FdsFormgroup for validation and error handling.
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [input, form, text, field, validation]
---

# FdsInput

Standard text input field implementing DKFDS v11 text input specifications. Supports prefixes, suffixes, various input types, and integrates seamlessly with the DKFDS form validation system.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="name">Name</FdsLabel>
    <FdsInput id="name" v-model="formData.name" />
  </FdsFormgroup>
</template>

<script setup>
import { FdsInput, FdsLabel, FdsFormgroup } from '@madsb/dkfds-vue3'
import { reactive } from 'vue'

const formData = reactive({
  name: ''
})
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | `undefined` | No | Unique identifier for the input element. Used for label association and accessibility |
| `modelValue` | `string` | `''` | No | The v-model binding value. Supports two-way data binding with v-model |
| `suffix` | `string` | `undefined` | No | Suffix text displayed after the input field. Commonly used for units or additional context (e.g., "kr", "km", "%") |
| `prefix` | `string` | `undefined` | No | Prefix text displayed before the input field. Commonly used for currency symbols or labels (e.g., "DKK", "$", "+") |
| `type` | `string` | `'text'` | No | HTML input type attribute. Supported values: 'text', 'email', 'tel', 'url', 'password', 'number', 'search' |
| `widthClass` | `string` | `''` | No | Width class for controlling input field size using DKFDS width utility classes |

### Width Classes

The `widthClass` prop accepts DKFDS width utility classes:

- `form-input-width-xs` - Extra small width
- `form-input-width-s` - Small width  
- `form-input-width-m` - Medium width
- `form-input-width-l` - Large width
- `form-input-width-xl` - Extra large width

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `value: string` | Emitted when input value changes. Used for v-model binding |
| `dirty` | `isDirty: boolean` | Emitted when input loses focus. Indicates if field has been touched (dirty state) |
| `input` | `event: Event` | Native input event pass-through. Provides access to raw input event |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `button` | None | Used for adding a button inside the input wrapper, typically for search functionality |

## Usage Examples

### Basic Text Input

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="name">Fulde navn</FdsLabel>
    <FdsInput id="name" v-model="formData.name" />
  </FdsFormgroup>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  name: ''
})
</script>
```

### Email Input with Validation

```vue
<template>
  <FdsFormgroup :error="emailError">
    <FdsLabel for="email">Email</FdsLabel>
    <FdsHint id="email-hint">Vi deler aldrig din email</FdsHint>
    <FdsFejlmeddelelse v-if="emailError">{{ emailError }}</FdsFejlmeddelelse>
    <FdsInput 
      id="email" 
      v-model="email"
      type="email"
      width-class="form-input-width-m"
    />
  </FdsFormgroup>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')

const emailError = computed(() => {
  if (!email.value) return ''
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  return isValid ? '' : 'Indtast venligst en gyldig email adresse'
})
</script>
```

### Input with Prefix and Suffix

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="price">Pris</FdsLabel>
    <FdsInput 
      id="price" 
      v-model="formData.price"
      prefix="DKK"
      suffix=",00"
      type="number"
      width-class="form-input-width-s"
    />
  </FdsFormgroup>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  price: ''
})
</script>
```

### Phone Number Input

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="phone">Telefonnummer</FdsLabel>
    <FdsHint id="phone-hint">Inkluder landekode (+45)</FdsHint>
    <FdsInput 
      id="phone" 
      v-model="formData.phone"
      type="tel"
      prefix="+45"
      width-class="form-input-width-m"
    />
  </FdsFormgroup>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  phone: ''
})
</script>
```

### Search Input with Button Slot

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="search">Søg</FdsLabel>
    <FdsInput 
      id="search" 
      v-model="searchQuery"
      type="search"
      width-class="form-input-width-l"
    >
      <template #button>
        <button type="button" class="button button-secondary" @click="performSearch">
          Søg
        </button>
      </template>
    </FdsInput>
  </FdsFormgroup>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const performSearch = () => {
  console.log('Searching for:', searchQuery.value)
}
</script>
```

### Password Input with Custom Width

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="password">Adgangskode</FdsLabel>
    <FdsHint id="password-hint">Mindst 8 tegn</FdsHint>
    <FdsInput 
      id="password" 
      v-model="formData.password"
      type="password"
      width-class="form-input-width-m"
    />
  </FdsFormgroup>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  password: ''
})
</script>
```

### Handling Input Events

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="username">Brugernavn</FdsLabel>
    <FdsInput 
      id="username" 
      v-model="username"
      @dirty="handleDirty"
      @input="handleInput"
    />
  </FdsFormgroup>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')

const handleDirty = (isDirty) => {
  console.log('Field is dirty:', isDirty)
}

const handleInput = (event) => {
  console.log('Input event:', event.target.value)
}
</script>
```

## Accessibility

FdsInput follows WCAG 2.1 AA guidelines and DKFDS accessibility standards:

### Keyboard Navigation
- **Tab**: Moves focus to the input field
- **Enter**: Submits the form (if inside a form)
- **Escape**: Clears focus (browser default)

### Screen Reader Support
- Automatic `aria-describedby` association with hints and error messages
- Proper label association through `for` attribute
- Semantic HTML input element with appropriate `type` attribute
- Required/optional state communicated through proper markup

### Focus Management
- Clear visual focus indicator following DKFDS design
- Focus is trapped within the input field appropriately
- Focus restoration after form submission or validation

### Error Handling
- Error messages are programmatically associated via `aria-describedby`
- Visual and programmatic indication of invalid states
- Clear, actionable error messages in Danish

## DKFDS Guidelines

### Visual Design
- Follows DKFDS v11 input field specifications
- Consistent spacing and typography with design system tokens
- Proper color contrast ratios (4.5:1 minimum)
- Focus states follow DKFDS interaction patterns

### Form Integration
- Designed to work seamlessly with `FdsFormgroup`
- Automatic error state styling when validation fails
- Consistent with other DKFDS form components
- Supports both BorgerDK and VirkDK themes

### Content Guidelines
- Labels should be clear and descriptive in Danish
- Hint text should provide helpful guidance
- Error messages should be specific and actionable
- Use appropriate input types for different data formats

## TypeScript Support

```typescript
interface FdsInputProps {
  /** Unique identifier for the input element */
  id?: string
  /** The v-model binding value */
  modelValue?: string
  /** Suffix text displayed after the input field */
  suffix?: string
  /** Prefix text displayed before the input field */
  prefix?: string
  /** HTML input type attribute */
  type?: string
  /** Width class for controlling input field size */
  widthClass?: string
}

// Events interface
interface FdsInputEmits {
  'update:modelValue': [value: string]
  'dirty': [isDirty: boolean]
  'input': [event: Event]
}
```

## Related Components

- **FdsFormgroup** - Form wrapper with error handling
- **FdsLabel** - Accessible form labels
- **FdsHint** - Helper text for form fields
- **FdsFejlmeddelelse** - Error message display
- **FdsTextarea** - Multi-line text input
- **FdsInputNumber** - Number input with controls
- **FdsInputLimit** - Input with character limit

<!-- Verified against source -->