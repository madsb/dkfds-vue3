---
title: FdsTrinindikatorStep
description: Individual step component for DKFDS step indicators with state management and accessibility
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, stepper, wizard, progress, accessibility]
---

# FdsTrinindikatorStep

Individual step component implementing DKFDS v11 step indicator specifications. Renders a single step within a step indicator group with support for different states (current, completed, error), visual icons, and interactive behavior.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <fds-trinindikator-group
    :current-step="currentStep"
    :total-steps="3"
    aria-label="Ansøgningsproces"
  >
    <fds-trinindikator-step
      :step-number="1"
      title="Personlige oplysninger"
      :is-current="currentStep === 1"
      :is-completed="currentStep > 1"
    />
    <fds-trinindikator-step
      :step-number="2"
      title="Upload dokumenter"
      :is-current="currentStep === 2"
      :is-completed="currentStep > 2"
    />
    <fds-trinindikator-step
      :step-number="3"
      title="Bekræftelse"
      :is-current="currentStep === 3"
      :is-completed="currentStep > 3"
    />
  </fds-trinindikator-group>
</template>

<script setup>
import { ref } from 'vue'
import { FdsTrinindikatorStep, FdsTrinindikatorGroup } from '@madsb/dkfds-vue3'

const currentStep = ref(1)
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `stepNumber` | `number` | - | ✅ | Step number (1-based). The numeric position of this step in the process sequence |
| `title` | `string` | - | ✅ | Step title. The main title/name of this step displayed to users |
| `stepInfo` | `string` | `''` | ❌ | Additional step information. Optional descriptive text providing more details about the step |
| `isCurrent` | `boolean` | `false` | ❌ | Whether this is the current step. Applies current step styling and ARIA attributes |
| `isCompleted` | `boolean` | `false` | ❌ | Whether this step is completed. Shows checkmark icon and completed styling (ignored if isCurrent is true) |
| `hasError` | `boolean` | `false` | ❌ | Whether the step has an error. Shows error icon and error styling. Takes precedence over completed state |
| `disabled` | `boolean` | `false` | ❌ | Whether the step is disabled. Prevents interaction and applies disabled styling |
| `clickable` | `boolean` | `false` | ❌ | Whether the step is clickable. Enables click interaction (disabled steps cannot be clicked regardless) |
| `errorIconLabel` | `string` | `'Fejl'` | ❌ | ARIA label for error icon. Screen reader text for the error state icon |
| `completedIconLabel` | `string` | `'Færdig'` | ❌ | ARIA label for completed icon. Screen reader text for the completed state checkmark icon |
| `ariaLabel` | `string` | `''` | ❌ | Custom ARIA label for the step. Override the auto-generated accessibility label for the entire step |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `(stepNumber: number, event: MouseEvent)` | Emitted when step is clicked. Only fired if step is clickable and not disabled. Allows parent component to handle navigation or validation before step changes |

## Slots

This component does not have slots. Content is controlled through props.

## Usage Examples

### Basic Step States

```vue
<template>
  <fds-trinindikator-group :current-step="3" :total-steps="5">
    <!-- Completed step -->
    <fds-trinindikator-step
      :step-number="1"
      title="Start"
      :is-completed="true"
    />
    
    <!-- Completed step with additional info -->
    <fds-trinindikator-step
      :step-number="2"
      title="Personoplysninger"
      step-info="Navn, adresse og kontaktoplysninger"
      :is-completed="true"
    />
    
    <!-- Current step -->
    <fds-trinindikator-step
      :step-number="3"
      title="Upload dokumenter"
      step-info="Upload påkrævede dokumenter"
      :is-current="true"
    />
    
    <!-- Future step -->
    <fds-trinindikator-step
      :step-number="4"
      title="Gennemgang"
    />
    
    <!-- Future step -->
    <fds-trinindikator-step
      :step-number="5"
      title="Bekræftelse"
    />
  </fds-trinindikator-group>
</template>
```

### Interactive Steps with Click Handling

```vue
<template>
  <fds-trinindikator-group :current-step="currentStep" :total-steps="4">
    <fds-trinindikator-step
      v-for="step in steps"
      :key="step.number"
      :step-number="step.number"
      :title="step.title"
      :step-info="step.info"
      :is-current="step.number === currentStep"
      :is-completed="step.number < currentStep"
      :clickable="step.number <= currentStep"
      @click="navigateToStep"
    />
  </fds-trinindikator-group>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(2)

const steps = [
  { number: 1, title: 'Grundlæggende info', info: 'Indtast dine personlige oplysninger' },
  { number: 2, title: 'Dokumentation', info: 'Upload nødvendige dokumenter' },
  { number: 3, title: 'Verifikation', info: 'Bekræft dine oplysninger' },
  { number: 4, title: 'Afslutning', info: 'Gennemgå og send ansøgning' }
]

const navigateToStep = (stepNumber, event) => {
  console.log(`Navigating to step ${stepNumber}`)
  if (stepNumber <= currentStep.value) {
    currentStep.value = stepNumber
  }
}
</script>
```

### Error State Handling

```vue
<template>
  <fds-trinindikator-group :current-step="currentStep" :total-steps="3">
    <fds-trinindikator-step
      :step-number="1"
      title="Indtastning"
      :is-completed="true"
    />
    
    <fds-trinindikator-step
      :step-number="2"
      title="Validering"
      :has-error="hasValidationError"
      :is-current="currentStep === 2"
      :clickable="!hasValidationError"
      :disabled="hasValidationError"
      error-icon-label="Valideringsfejl opstået"
      @click="retryValidation"
    />
    
    <fds-trinindikator-step
      :step-number="3"
      title="Færdig"
      :disabled="hasValidationError"
    />
  </fds-trinindikator-group>
  
  <div class="mt-3">
    <button 
      v-if="hasValidationError" 
      @click="fixValidationError"
      class="btn btn-secondary"
    >
      Ret fejl
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(2)
const hasValidationError = ref(true)

const retryValidation = (stepNumber) => {
  console.log('Retrying validation...')
  // Handle retry logic
}

const fixValidationError = () => {
  hasValidationError.value = false
  console.log('Validation error fixed')
}
</script>
```

### Custom ARIA Labels

```vue
<template>
  <fds-trinindikator-group 
    :current-step="2" 
    :total-steps="3"
    aria-label="Konfiguration af brugerindstillinger"
  >
    <fds-trinindikator-step
      :step-number="1"
      title="Profil"
      :is-completed="true"
      aria-label="Trin 1: Profilkonfiguration (færdigt)"
    />
    
    <fds-trinindikator-step
      :step-number="2"
      title="Sikkerhed"
      :is-current="true"
      aria-label="Trin 2: Sikkerhedsindstillinger (nuværende trin)"
    />
    
    <fds-trinindikator-step
      :step-number="3"
      title="Præferencer"
      aria-label="Trin 3: Brugerpræferencer (ikke startet)"
    />
  </fds-trinindikator-group>
</template>
```

## Accessibility

The FdsTrinindikatorStep component follows WCAG 2.1 AA guidelines and implements comprehensive accessibility features:

### ARIA Support

- **`aria-current="step"`**: Applied to current step for screen reader navigation
- **Contextual ARIA labels**: Auto-generated labels include step status (current, completed, error, disabled)
- **Icon labeling**: Separate ARIA labels for error and completion icons
- **Custom labels**: Support for overriding default accessibility text

### Keyboard Navigation

- **Focus management**: Steps can receive keyboard focus when clickable
- **Enter/Space activation**: Clickable steps respond to keyboard activation
- **Logical tab order**: Steps follow natural reading sequence

### Screen Reader Support

- **Status announcements**: Clear indication of step state changes
- **Descriptive labels**: Comprehensive step information for assistive technology
- **Error communication**: Specific error state announcements

### Auto-generated ARIA Labels

The component automatically generates contextual ARIA labels:

```
"Trin 1: Personlige oplysninger (færdigt)"
"Trin 2: Upload dokumenter (nuværende trin)"  
"Trin 3: Validering (fejl)"
"Trin 4: Bekræftelse (deaktiveret)"
```

## DKFDS Guidelines

The component follows DKFDS v11 step indicator specifications:

### Visual States

- **Current step**: Highlighted with distinct styling and aria-current attribute
- **Completed steps**: Show checkmark icon and completed state styling
- **Error steps**: Display error icon with appropriate error styling
- **Disabled steps**: Reduced opacity and no interaction capabilities

### Interactive Behavior

- **Click handling**: Only enabled when explicitly set as clickable and not disabled
- **State precedence**: Error state takes precedence over completed state
- **Navigation support**: Emit click events for parent component handling

### Responsive Design

- **Desktop display**: Full step information with icons and text
- **Mobile compatibility**: Designed to work within mobile modal view
- **Touch accessibility**: Appropriate touch target sizes for mobile interaction

### Icon Usage

- **Error icon**: `#report-problem` SVG with customizable ARIA label
- **Completed icon**: `#check` SVG with customizable ARIA label
- **Number display**: Shows step number when not in error or completed states

## Integration with FdsTrinindikatorGroup

The FdsTrinindikatorStep component is designed to be used exclusively within the FdsTrinindikatorGroup component:

```vue
<template>
  <!-- Parent group component handles responsive layout -->
  <fds-trinindikator-group
    :current-step="currentStep"
    :total-steps="steps.length"
    aria-label="Application process"
  >
    <!-- Individual step components -->
    <fds-trinindikator-step
      v-for="step in steps"
      :key="step.id"
      :step-number="step.number"
      :title="step.title"
      :step-info="step.description"
      :is-current="step.number === currentStep"
      :is-completed="step.number < currentStep"
      :has-error="step.hasError"
      :clickable="step.isClickable"
      :disabled="step.isDisabled"
      @click="handleStepClick"
    />
  </fds-trinindikator-group>
</template>
```

## TypeScript Support

The component includes full TypeScript support with the `FdsTrinindikatorStepProps` interface:

```typescript
export interface FdsTrinindikatorStepProps {
  stepNumber: number
  title: string
  stepInfo?: string
  isCurrent?: boolean
  isCompleted?: boolean
  hasError?: boolean
  disabled?: boolean
  clickable?: boolean
  errorIconLabel?: string
  completedIconLabel?: string
  ariaLabel?: string
}
```

## Related Components

- **[FdsTrinindikatorGroup](./fds-trinindikator-group.md)** - Parent container component for step indicators
- **[FdsModal](../feedback/fds-modal.md)** - Modal component used for mobile step indicator display

<!-- Verified against source -->