---
title: FdsRadioItem
description: Individual radio button component implementing DKFDS v11 radio button specifications with support for conditional content display and accessibility.
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [radio, input, form, selection, conditional-content, accessible]
---

# FdsRadioItem

Individual radio button component implementing DKFDS v11 radio button specifications with support for conditional content display, accessibility attributes, and coordinated state management. Automatically integrates with parent FdsRadioGroup for shared naming and selection state following DKFDS radio patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<script setup>
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const selectedValue = ref('option1')
</script>

<template>
  <FdsRadioGroup v-model="selectedValue" label="Choose an option">
    <FdsRadioItem value="option1">First Option</FdsRadioItem>
    <FdsRadioItem value="option2">Second Option</FdsRadioItem>
    <FdsRadioItem value="option3" disabled>Disabled Option</FdsRadioItem>
  </FdsRadioGroup>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string \| number \| boolean` | - | Yes | Radio button value for selection. When selected, this value is emitted to the parent radio group |
| `index` | `string` | `undefined` | No | Index identifier for unique ID generation. Used to create unique radio IDs when multiple items exist |
| `id` | `string` | `undefined` | No | Unique identifier for the radio item. If not provided, will be auto-generated |
| `disabled` | `boolean` | `false` | No | Whether the radio button is disabled. Prevents user interaction and applies disabled styling |
| `name` | `string` | `undefined` | No | Name attribute for the radio input. Usually injected from parent FdsRadioGroup |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `dirty` | `boolean` | Emitted when radio button loses focus. Useful for triggering validation after user interaction |
| `change` | `Event` | Emitted on change event. Provides access to the raw DOM change event |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | - | Radio button label content |
| `content` | - | Optional conditional content that shows when radio is selected. Used for expandable options |

## Usage Examples

### Basic Radio Items

```vue
<script setup>
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const transport = ref('car')
</script>

<template>
  <FdsRadioGroup v-model="transport" label="How will you travel?">
    <FdsRadioItem value="car">Car</FdsRadioItem>
    <FdsRadioItem value="bus">Bus</FdsRadioItem>
    <FdsRadioItem value="train">Train</FdsRadioItem>
    <FdsRadioItem value="bike">Bicycle</FdsRadioItem>
  </FdsRadioGroup>
</template>
```

### Radio with Conditional Content

```vue
<script setup>
import { FdsRadioGroup, FdsRadioItem, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const travelMethod = ref('car')
const otherMethod = ref('')
</script>

<template>
  <FdsRadioGroup v-model="travelMethod" label="How will you travel?">
    <FdsRadioItem value="car">Car</FdsRadioItem>
    <FdsRadioItem value="bus">Bus</FdsRadioItem>
    <FdsRadioItem value="other">Other
      <template #content>
        <FdsLabel>Please specify:</FdsLabel>
        <FdsInput v-model="otherMethod" placeholder="Describe your transport method" />
      </template>
    </FdsRadioItem>
  </FdsRadioGroup>
</template>
```

### Disabled Radio Items

```vue
<script setup>
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const preference = ref('option1')
</script>

<template>
  <FdsRadioGroup v-model="preference" label="Select your preference">
    <FdsRadioItem value="option1">Available Option 1</FdsRadioItem>
    <FdsRadioItem value="option2">Available Option 2</FdsRadioItem>
    <FdsRadioItem value="option3" disabled>Currently Unavailable</FdsRadioItem>
  </FdsRadioGroup>
</template>
```

### Custom Index and Event Handling

```vue
<script setup>
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const selectedSize = ref('medium')

const handleRadioChange = (event) => {
  console.log('Radio changed:', event.target.value)
}

const handleRadioDirty = (isDirty) => {
  console.log('Radio marked as dirty:', isDirty)
}
</script>

<template>
  <FdsRadioGroup v-model="selectedSize" label="Select size">
    <FdsRadioItem 
      value="small" 
      index="size-small"
      @change="handleRadioChange"
      @dirty="handleRadioDirty"
    >
      Small
    </FdsRadioItem>
    <FdsRadioItem 
      value="medium" 
      index="size-medium"
      @change="handleRadioChange"
      @dirty="handleRadioDirty"
    >
      Medium
    </FdsRadioItem>
    <FdsRadioItem 
      value="large" 
      index="size-large"
      @change="handleRadioChange"
      @dirty="handleRadioDirty"
    >
      Large
    </FdsRadioItem>
  </FdsRadioGroup>
</template>
```

### Complex Form Integration

```vue
<script setup>
import { 
  FdsRadioGroup, 
  FdsRadioItem, 
  FdsFormgroup,
  FdsLabel,
  FdsInput,
  FdsTextarea
} from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const contactMethod = ref('email')
const email = ref('')
const phone = ref('')
const address = ref('')
</script>

<template>
  <FdsFormgroup>
    <FdsRadioGroup v-model="contactMethod" label="Preferred contact method">
      <FdsRadioItem value="email">Email
        <template #content>
          <FdsLabel>Email address:</FdsLabel>
          <FdsInput 
            v-model="email" 
            type="email" 
            placeholder="your@email.com" 
          />
        </template>
      </FdsRadioItem>
      
      <FdsRadioItem value="phone">Phone
        <template #content>
          <FdsLabel>Phone number:</FdsLabel>
          <FdsInput 
            v-model="phone" 
            type="tel" 
            placeholder="+45 12 34 56 78" 
          />
        </template>
      </FdsRadioItem>
      
      <FdsRadioItem value="mail">Postal Mail
        <template #content>
          <FdsLabel>Mailing address:</FdsLabel>
          <FdsTextarea 
            v-model="address" 
            rows="3"
            placeholder="Street address, postal code, city" 
          />
        </template>
      </FdsRadioItem>
    </FdsRadioGroup>
  </FdsFormgroup>
</template>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Radio items are fully keyboard accessible using arrow keys within the group
- **Screen Reader Support**: Proper ARIA attributes including `aria-describedby` and `aria-controls` for conditional content
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic Structure**: Uses native HTML radio inputs with proper labels

### Accessibility Features

- **ARIA Controls**: When conditional content is present, `aria-controls` attribute links radio to expandable content
- **ARIA Described By**: Automatic integration with FormGroup for error messages and hints
- **Semantic Labels**: Proper label association using `for` attribute
- **State Communication**: Screen readers announce checked/unchecked states
- **Group Context**: Radio items inherit group context for screen reader navigation

### Best Practices

```vue
<!-- Good: Descriptive labels -->
<FdsRadioItem value="yes">Yes, I agree to the terms</FdsRadioItem>
<FdsRadioItem value="no">No, I do not agree</FdsRadioItem>

<!-- Avoid: Vague labels -->
<FdsRadioItem value="yes">Yes</FdsRadioItem>
<FdsRadioItem value="no">No</FdsRadioItem>

<!-- Good: Logical value ordering -->
<FdsRadioItem value="none">None</FdsRadioItem>
<FdsRadioItem value="some">Some</FdsRadioItem>
<FdsRadioItem value="all">All</FdsRadioItem>

<!-- Good: Conditional content with clear context -->
<FdsRadioItem value="other">Other
  <template #content>
    <FdsLabel>Please specify:</FdsLabel>
    <FdsInput v-model="otherValue" aria-required="true" />
  </template>
</FdsRadioItem>
```

## DKFDS Guidelines

### Design System Compliance

- Follows DKFDS v11 radio button specifications
- Uses standard DKFDS classes: `form-group-radio`, `form-radio`, `form-label`
- Supports both VirkDK and BorgerDK themes
- Implements conditional content display pattern for "Other" options

### Visual Design

- Standard DKFDS radio button styling with proper spacing
- Disabled state styling with reduced opacity
- Conditional content appears below selected radio with proper indentation
- Focus states follow DKFDS accessibility guidelines

### Behavior Scripts

The component integrates with DKFDS behavior scripts for:

- **Radio Toggle Content**: Automatic show/hide of conditional content based on selection
- **Form Validation**: Integration with DKFDS form validation patterns
- **Keyboard Navigation**: Arrow key navigation within radio groups

### Danish Context Examples

```vue
<!-- Danish government form example -->
<FdsRadioGroup v-model="citizenship" label="Statsborgerforhold">
  <FdsRadioItem value="danish">Dansk statsborger</FdsRadioItem>
  <FdsRadioItem value="eu">EU-borgere</FdsRadioItem>
  <FdsRadioItem value="other">Andet
    <template #content>
      <FdsLabel>Angiv land:</FdsLabel>
      <FdsInput v-model="otherCountry" />
    </template>
  </FdsRadioItem>
</FdsRadioGroup>

<!-- Municipal service example -->
<FdsRadioGroup v-model="serviceType" label="Type af ansøgning">
  <FdsRadioItem value="new">Ny ansøgning</FdsRadioItem>
  <FdsRadioItem value="renewal">Fornyelse</FdsRadioItem>
  <FdsRadioItem value="change">Ændring af eksisterende</FdsRadioItem>
</FdsRadioGroup>
```

## TypeScript Support

### Component Props Interface

```typescript
interface FdsRadioItemProps {
  /** Radio button value for selection */
  value: string | number | boolean
  /** Index identifier for unique ID generation */
  index?: string
  /** Unique identifier for the radio item */
  id?: string
  /** Whether the radio button is disabled */
  disabled?: boolean
  /** Name attribute for the radio input */
  name?: string
}
```

### Event Definitions

```typescript
// Component emits
defineEmits<{
  /** Emitted when radio button loses focus */
  dirty: [value: boolean]
  /** Emitted on change event */  
  change: [event: Event]
}>()
```

### Usage with TypeScript

```vue
<script setup lang="ts">
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

// Typed reactive values
const selectedOption = ref<string>('option1')
const isFormDirty = ref<boolean>(false)

// Event handlers with proper typing
const handleRadioChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  console.log('Selected value:', target.value)
}

const handleDirtyState = (isDirty: boolean): void => {
  isFormDirty.value = isDirty
}
</script>

<template>
  <FdsRadioGroup v-model="selectedOption" label="Options">
    <FdsRadioItem 
      value="option1"
      @change="handleRadioChange"
      @dirty="handleDirtyState"
    >
      Option 1
    </FdsRadioItem>
  </FdsRadioGroup>
</template>
```

## Related Components

- **[FdsRadioGroup](/components/input/fds-radio-group)**: Parent container component for radio items
- **[FdsCheckbox](/components/input/fds-checkbox)**: Single checkbox input component
- **[FdsFormgroup](/components/forms/fds-formgroup)**: Form group wrapper with validation support
- **[FdsLabel](/components/forms/fds-label)**: Standalone label component
- **[FdsHint](/components/forms/fds-hint)**: Helper text component for forms

<!-- Verified against source -->