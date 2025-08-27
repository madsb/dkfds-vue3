---
title: fds-trinindikator-group
description: Step indicator group component implementing DKFDS v11 specifications with responsive behavior
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [step-indicator, navigation, responsive, modal, process, wizard]
---

# fds-trinindikator-group

Step indicator group component implementing DKFDS v11 specifications. Provides responsive step navigation with desktop and mobile views. Desktop shows full step indicator with all steps visible. Mobile shows a compact button that opens a modal with the full step list. Supports clickable steps, error states, and progress tracking with accessibility features.

## Installation

The component is automatically available when you install the DKFDS Vue.js component library.

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <fds-trinindikator-group
    :current-step="2"
    :total-steps="4"
    aria-label="Application progress"
  >
    <fds-trinindikator-step
      v-for="step in steps"
      :key="step.id"
      :step-number="step.number"
      :title="step.title"
      :is-current="step.number === currentStep"
      :is-completed="step.number < currentStep"
    />
  </fds-trinindikator-group>
</template>

<script setup>
import { FdsTrinindikatorGroup, FdsTrinindikatorStep } from '@madsb/dkfds-vue3'

const currentStep = ref(2)
const steps = ref([
  { id: 1, number: 1, title: 'Personlige oplysninger' },
  { id: 2, number: 2, title: 'Dokumenter' },
  { id: 3, number: 3, title: 'Verifikation' },
  { id: 4, number: 4, title: 'Bekræftelse' }
])
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | auto-generated | No | Unique identifier for the step indicator. Auto-generated if not provided. Used for modal and accessibility features. |
| `currentStep` | `number` | `1` | No | Current active step (1-based). Indicates which step is currently active in the process. |
| `totalSteps` | `number` | `0` | No | Total number of steps. Used for mobile display "Step X of Y". Should match number of child step components. |
| `ariaLabel` | `string` | `'Trinindikator'` | No | ARIA label for navigation. Provides accessibility context for the step indicator navigation. |
| `responsive` | `boolean` | `true` | No | Show mobile responsive behavior. Enables responsive design with button/modal pattern on mobile. |
| `mobileBreakpoint` | `number` | `768` | No | Mobile breakpoint in pixels. Screen width at which mobile behavior activates. |
| `showStepInfo` | `boolean` | `false` | No | Show extra step information. Enables display of additional step details in step components. |
| `clickableSteps` | `boolean` | `false` | No | Enable clickable steps. Allows users to click on steps for navigation (if step allows it). |
| `modalTitle` | `string` | `'Trin'` | No | Modal title for mobile view. Title displayed in the mobile modal header. |
| `modalAriaLabel` | `string` | `'Trin modal'` | No | ARIA label for mobile modal. Accessibility label for the mobile modal dialog. |
| `closeButtonText` | `string` | `'Luk'` | No | Close button text for mobile modal. Text displayed on the modal close button. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `step-click` | `stepNumber: number` | Emitted when a step is clicked (if clickable). Fired when clickableSteps is true and user clicks on a clickable step. |
| `modal-open` | `void` | Emitted when mobile modal opens. Triggered when user taps the mobile step indicator button. |
| `modal-close` | `void` | Emitted when mobile modal closes. Triggered when user closes the mobile step indicator modal. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | `currentStep: number, mobile: boolean` | Default slot for step components. Receives current step number and mobile state. Must contain fds-trinindikator-step components. |

## Usage Examples

### Basic Step Indicator

```vue
<template>
  <fds-trinindikator-group
    :current-step="currentStep"
    :total-steps="4"
    aria-label="Ansøgningsforløb"
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
      title="Gennemgang"
      :is-current="currentStep === 3"
      :is-completed="currentStep > 3"
    />
    <fds-trinindikator-step
      :step-number="4"
      title="Bekræftelse"
      :is-current="currentStep === 4"
      :is-completed="false"
    />
  </fds-trinindikator-group>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(2)
</script>
```

### Interactive Steps with Click Handling

```vue
<template>
  <fds-trinindikator-group
    :current-step="currentStep"
    :total-steps="steps.length"
    :clickable-steps="true"
    @step-click="navigateToStep"
    @modal-open="trackModalOpen"
  >
    <fds-trinindikator-step
      v-for="step in steps"
      :key="step.id"
      :step-number="step.number"
      :title="step.title"
      :step-info="step.description"
      :is-current="step.number === currentStep"
      :is-completed="step.number < currentStep"
      :has-error="step.hasValidationError"
      :clickable="step.number <= maxCompletedStep"
      @click="handleStepClick"
    />
  </fds-trinindikator-group>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(2)
const maxCompletedStep = ref(3)

const steps = ref([
  { 
    id: 1, 
    number: 1, 
    title: 'Kontaktoplysninger',
    description: 'Indtast navn, adresse og telefonnummer',
    hasValidationError: false 
  },
  { 
    id: 2, 
    number: 2, 
    title: 'Dokumentation',
    description: 'Upload påkrævede dokumenter',
    hasValidationError: false 
  },
  { 
    id: 3, 
    number: 3, 
    title: 'Validering',
    description: 'Kontroller at alle oplysninger er korrekte',
    hasValidationError: true 
  },
  { 
    id: 4, 
    number: 4, 
    title: 'Afslutning',
    description: 'Bekræft ansøgning og modtag kvittering',
    hasValidationError: false 
  }
])

const navigateToStep = (stepNumber) => {
  if (stepNumber <= maxCompletedStep.value) {
    currentStep.value = stepNumber
  }
}

const handleStepClick = (stepNumber) => {
  console.log(`Step ${stepNumber} clicked`)
}

const trackModalOpen = () => {
  // Analytics tracking for mobile modal opens
  console.log('Mobile step modal opened')
}
</script>
```

### Custom Mobile Configuration

```vue
<template>
  <fds-trinindikator-group
    :current-step="currentStep"
    :total-steps="steps.length"
    modal-title="Ansøgningsproces"
    close-button-text="Tilbage til formular"
    :show-step-info="true"
    aria-label="Borgere.dk ansøgningsforløb"
  >
    <fds-trinindikator-step
      v-for="step in steps"
      :key="step.id"
      :step-number="step.number"
      :title="step.title"
      :step-info="step.info"
      :is-current="step.number === currentStep"
      :is-completed="step.number < currentStep"
    />
  </fds-trinindikator-group>
</template>

<script setup>
const currentStep = ref(3)
const steps = ref([
  { 
    id: 1, 
    number: 1, 
    title: 'Ansøgeroplysninger',
    info: 'Grundlæggende personlige oplysninger'
  },
  { 
    id: 2, 
    number: 2, 
    title: 'Bilag og dokumentation',
    info: 'Upload relevante dokumenter til ansøgning'
  },
  { 
    id: 3, 
    number: 3, 
    title: 'Kontrol og godkendelse',
    info: 'Gennemse oplysninger før indsendelse'
  }
])
</script>
```

### Government Application Process Example

```vue
<template>
  <div class="application-process">
    <h1>Ansøgning om byggeri</h1>
    
    <fds-trinindikator-group
      :current-step="applicationStep"
      :total-steps="5"
      aria-label="Byggetilladelse ansøgningsproces"
      :clickable-steps="true"
      @step-click="goToStep"
    >
      <fds-trinindikator-step
        :step-number="1"
        title="Projektoplysninger"
        step-info="Grundlæggende information om byggeriet"
        :is-current="applicationStep === 1"
        :is-completed="applicationStep > 1"
        :clickable="true"
      />
      <fds-trinindikator-step
        :step-number="2"
        title="Tekniske tegninger"
        step-info="Upload arkitekt- og ingeniørtegninger"
        :is-current="applicationStep === 2"
        :is-completed="applicationStep > 2"
        :clickable="applicationStep > 1"
      />
      <fds-trinindikator-step
        :step-number="3"
        title="Miljøvurdering"
        step-info="Påvirkning på omgivelser og miljø"
        :is-current="applicationStep === 3"
        :is-completed="applicationStep > 3"
        :clickable="applicationStep > 2"
        :has-error="environmentalError"
      />
      <fds-trinindikator-step
        :step-number="4"
        title="Naboerklæringer"
        step-info="Upload underskrevne naboerklæringer"
        :is-current="applicationStep === 4"
        :is-completed="applicationStep > 4"
        :clickable="applicationStep > 3 && !environmentalError"
      />
      <fds-trinindikator-step
        :step-number="5"
        title="Indsendelse"
        step-info="Bekræft og send ansøgning til kommune"
        :is-current="applicationStep === 5"
        :is-completed="false"
        :clickable="false"
      />
    </fds-trinindikator-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const applicationStep = ref(3)
const environmentalError = ref(true)

const goToStep = (stepNumber) => {
  // Validate that user can navigate to this step
  if (stepNumber <= applicationStep.value || (stepNumber === applicationStep.value + 1 && !environmentalError.value)) {
    applicationStep.value = stepNumber
  }
}
</script>
```

## Mobile Modal Functionality

The component automatically provides a responsive experience:

- **Desktop (≥768px)**: Shows full step indicator with all steps visible
- **Mobile (<768px)**: Shows compact button "Trin X af Y" that opens a modal with the full step list

### Mobile Behavior

```vue
<template>
  <!-- Mobile displays as: -->
  <button class="step-indicator-button">
    <span>Trin <strong>2</strong> af 4</span>
  </button>
  
  <!-- When clicked, opens modal with full step list -->
  <fds-modal>
    <h2>Trin</h2>
    <ol class="step-indicator">
      <!-- All steps shown in modal -->
    </ol>
  </fds-modal>
</template>
```

## Accessibility

The component follows WCAG 2.1 AA guidelines and provides comprehensive accessibility features:

### ARIA Support

- `aria-label` on navigation element for screen reader context
- `aria-current="step"` on the current step
- `aria-haspopup="dialog"` on mobile button
- Automatic ARIA labels for step states (current, completed, error)

### Keyboard Navigation

- Modal can be closed with `Escape` key
- Clickable steps are keyboard accessible with `Enter` and `Space`
- Focus management when modal opens and closes

### Screen Reader Support

- Descriptive labels for step states: "Trin 2: Dokumenter (nuværende trin)"
- Error states announced: "Trin 3: Validering (fejl)"
- Completed states announced: "Trin 1: Kontakt (færdigt)"

```vue
<!-- Example with full accessibility -->
<fds-trinindikator-group
  aria-label="Byggetilladelse ansøgning - 5 trin i alt"
  :current-step="2"
  :total-steps="5"
>
  <fds-trinindikator-step
    :step-number="1"
    title="Projektoplysninger"
    :is-completed="true"
    aria-label="Trin 1: Projektoplysninger (færdigt)"
  />
  <!-- Additional steps... -->
</fds-trinindikator-group>
```

## DKFDS Guidelines

This component implements the [DKFDS v11 Step Indicator specifications](https://designsystem.dk/komponenter/trinindikatorer/):

### Visual Design

- Uses official DKFDS colors and typography
- Supports both VirkDK and BorgerDK themes
- Responsive breakpoints follow DKFDS grid system
- Icons use DKFDS icon library (`#check`, `#report-problem`)

### Interaction Patterns

- Mobile-first responsive design
- Modal pattern for mobile following DKFDS modal guidelines
- Hover and focus states per DKFDS interaction patterns
- Button styling follows DKFDS button specifications

### Content Guidelines

- Danish language defaults for accessibility
- Government-appropriate terminology
- Clear progress indication
- Error handling with meaningful messages

## Related Components

- [`fds-trinindikator-step`](/components/navigation/fds-trinindikator-step) - Individual step component
- [`fds-modal`](/components/feedback/fds-modal) - Modal component used for mobile view
- [`fds-faneblade`](/components/navigation/fds-faneblade) - Tab navigation
- [`fds-breadcrumb`](/components/navigation/fds-breadcrumb) - Page navigation

<!-- Verified against source -->