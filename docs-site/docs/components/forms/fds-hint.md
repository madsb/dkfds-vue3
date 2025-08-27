---
title: FdsHint
description: Form hint component implementing DKFDS form hint text specifications for providing supplementary information for form controls
category: forms
dkfds: true
accessibility: WCAG 2.1 AA
tags: [form, hint, accessibility, aria-describedby, supplementary text]
---

# FdsHint

Form hint component implementing DKFDS v11 hint text specifications. Provides supplementary information for form controls with proper accessibility attributes and ID management. Automatically integrates with form groups to ensure proper aria-describedby relationships for screen readers following DKFDS accessibility patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<script setup>
import { FdsHint, FdsInput } from '@madsb/dkfds-vue3'
</script>

<template>
  <FdsHint id="email-hint">Enter a valid email address</FdsHint>
  <FdsInput aria-describedby="email-hint" placeholder="Email" />
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | `undefined` | No | Unique ID for the hint element. If not provided, will use the injected hintId from parent FdsFormgroup. The ID is used for aria-describedby relationships with form controls. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Hint text content. Can contain plain text or HTML elements for rich formatting. |

## Usage Examples

### Basic Hint Usage

```vue
<template>
  <div>
    <FdsHint id="password-hint">
      Password must be at least 8 characters with one number
    </FdsHint>
    <FdsInput 
      type="password"
      aria-describedby="password-hint" 
      placeholder="Enter password"
    />
  </div>
</template>
```

### Within Form Group (Automatic Integration)

```vue
<script setup>
import { FdsFormgroup, FdsLabel, FdsHint, FdsInput } from '@madsb/dkfds-vue3'
</script>

<template>
  <FdsFormgroup>
    <template #default="{ formid, ariaDescribedby }">
      <FdsLabel :for-id="formid">Email Address</FdsLabel>
      <FdsHint>We'll never share your email with anyone else</FdsHint>
      <FdsInput 
        :id="formid" 
        :aria-describedby="ariaDescribedby"
        type="email"
        placeholder="Enter your email"
      />
    </template>
  </FdsFormgroup>
</template>
```

### Rich Text Hint with HTML

```vue
<template>
  <FdsFormgroup>
    <template #default="{ formid, ariaDescribedby }">
      <FdsLabel :for-id="formid">Terms and Conditions</FdsLabel>
      <FdsHint>
        Please read our <strong>terms and conditions</strong> carefully. 
        For questions, contact us at <a href="mailto:support@example.com">support@example.com</a>
      </FdsHint>
      <FdsCheckbox 
        :id="formid"
        :aria-describedby="ariaDescribedby"
        value="accepted"
      >
        I accept the terms and conditions
      </FdsCheckbox>
    </template>
  </FdsFormgroup>
</template>
```

### Multiple Hints with Custom IDs

```vue
<script setup>
import { FdsHint, FdsInput } from '@madsb/dkfds-vue3'
</script>

<template>
  <div>
    <FdsLabel for="username">Username</FdsLabel>
    <FdsHint id="username-format">3-20 characters, letters and numbers only</FdsHint>
    <FdsHint id="username-availability">Username must be unique</FdsHint>
    <FdsInput 
      id="username"
      aria-describedby="username-format username-availability"
      placeholder="Choose a username"
    />
  </div>
</template>
```

### Complex Form with Validation

```vue
<script setup>
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsHint, FdsInput, FdsFejlmeddelelse } from '@madsb/dkfds-vue3'

const email = ref('')
const emailValid = ref(true)

const validateEmail = () => {
  emailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
}
</script>

<template>
  <FdsFormgroup :isValid="emailValid">
    <template #default="{ formid, ariaDescribedby, isValid }">
      <FdsLabel :for-id="formid" :required="true">Email Address</FdsLabel>
      <FdsHint>
        Enter your work email address. This will be used for account verification
        and important notifications about your application status.
      </FdsHint>
      <FdsInput 
        v-model="email"
        :id="formid" 
        :aria-describedby="ariaDescribedby"
        :isValid="isValid"
        type="email"
        placeholder="name@company.com"
        @blur="validateEmail"
      />
      <FdsFejlmeddelelse v-if="!isValid">
        Please enter a valid email address
      </FdsFejlmeddelelse>
    </template>
  </FdsFormgroup>
</template>
```

## Accessibility

The FdsHint component is designed with accessibility as a core principle, following WCAG 2.1 AA guidelines:

### Screen Reader Support

- **Programmatic Association**: Uses `id` attribute to create programmatic relationships with form controls via `aria-describedby`
- **Automatic Integration**: When used within FdsFormgroup, automatically provides the correct ID for aria-describedby relationships
- **Semantic HTML**: Uses `<span>` element with `form-hint` class for proper semantic meaning

### WCAG Compliance

- **3.3.2 Labels or Instructions (AA)**: Provides supplementary instructions for form inputs
- **1.3.1 Info and Relationships (A)**: Maintains programmatic relationships through proper ID usage
- **4.1.3 Status Messages (AA)**: Hint text is properly associated with form controls for assistive technology

### Keyboard Navigation

- **Focus Management**: Hint text is announced when users navigate to associated form controls
- **No Tab Stop**: Hint text doesn't receive focus as it's supplementary information
- **Context Preservation**: Maintains context relationship regardless of DOM position

### Screen Reader Announcements

```html
<!-- When user focuses the input, screen readers announce: -->
<!-- "Email address, edit text, Enter a valid email address" -->
<FdsHint id="email-hint">Enter a valid email address</FdsHint>
<FdsInput aria-describedby="email-hint" />
```

## DKFDS Guidelines

The FdsHint component follows the Danish Common Design System (DKFDS) v11 specifications:

### Visual Design

- **Typography**: Uses standard DKFDS text styling with appropriate font-size and line-height
- **Color**: Follows DKFDS color palette for hint text (typically muted/secondary color)
- **Spacing**: Proper margin and padding following DKFDS spacing tokens

### Content Guidelines

- **Helpful Information**: Provide clear, actionable guidance to users
- **Concise Language**: Keep hint text brief but informative
- **Plain Language**: Use simple, understandable Danish following government communication standards
- **Positive Tone**: Frame guidance positively rather than focusing on restrictions

### Integration Patterns

- **Form Structure**: Designed to work seamlessly with DKFDS form components
- **Validation Flow**: Integrates with validation patterns and error messaging
- **Design Tokens**: Uses DKFDS design tokens for consistent styling

### Examples in Danish

```vue
<template>
  <!-- Danish government form examples -->
  <FdsFormgroup>
    <template #default="{ formid, ariaDescribedby }">
      <FdsLabel :for-id="formid">CPR-nummer</FdsLabel>
      <FdsHint>Indtast dit 10-cifrede CPR-nummer uden bindestreg</FdsHint>
      <FdsInput 
        :id="formid" 
        :aria-describedby="ariaDescribedby"
        placeholder="1234567890"
      />
    </template>
  </FdsFormgroup>

  <FdsFormgroup>
    <template #default="{ formid, ariaDescribedby }">
      <FdsLabel :for-id="formid">Telefonnummer</FdsLabel>
      <FdsHint>Inkludér landekode for internationale numre</FdsHint>
      <FdsInput 
        :id="formid" 
        :aria-describedby="ariaDescribedby"
        type="tel"
        placeholder="+45 12 34 56 78"
      />
    </template>
  </FdsFormgroup>
</template>
```

## Form Group Context Integration

The FdsHint component automatically integrates with FdsFormgroup to provide seamless ID management and accessibility:

### Automatic ID Management

When used within a FdsFormgroup, FdsHint automatically receives the correct ID:

```vue
<FdsFormgroup id="user-email">
  <template #default="{ formid, ariaDescribedby }">
    <!-- This hint automatically gets ID "user-email-hint" -->
    <FdsHint>Enter your email address</FdsHint>
    <!-- The input's aria-describedby automatically includes "user-email-hint" -->
    <FdsInput :id="formid" :aria-describedby="ariaDescribedby" />
  </template>
</FdsFormgroup>
```

### Injection Pattern

The component uses Vue's provide/inject pattern for context sharing:

```typescript
// FdsFormgroup provides:
provide('hintId', computed(() => `${formid.value}-hint`))

// FdsHint injects:
const injectedHintId = inject<string | Ref<string> | undefined>('hintId', undefined)
```

### aria-describedby Relationship

The FdsFormgroup component automatically builds the `aria-describedby` value:

```typescript
const ariaDescribedby = computed(() => {
  const ids: string[] = []
  ids.push(hintId.value)  // Always includes hint ID
  if (compValid.value === false) {
    ids.push(errorId.value)  // Adds error ID when invalid
  }
  return ids.join(' ').trim()
})
```

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)**: Semantic form grouping with integrated hint support
- **[FdsLabel](/components/forms/fds-label)**: Form labels that work with hint text
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)**: Error messages for form validation
- **[FdsInput](/components/input/fds-input)**: Text inputs that use aria-describedby with hints
- **[FdsTextarea](/components/input/fds-textarea)**: Multi-line inputs with hint support
- **[FdsCheckbox](/components/input/fds-checkbox)**: Checkboxes with supplementary hint text

<!-- Verified against source -->