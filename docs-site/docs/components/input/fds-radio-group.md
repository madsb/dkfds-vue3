---
title: FdsRadioGroup
description: Radio group component implementing DKFDS v11 radio button specifications for grouping related radio options
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [radio, form, input, fieldset, accessibility, group selection]
---

# FdsRadioGroup

Radio group component implementing DKFDS v11 radio button specifications. Provides a semantic fieldset for grouping related radio button options with proper accessibility attributes, label management, and coordinated selection state. Manages the shared name attribute and value synchronization for child radio items following DKFDS radio group patterns.

## Installation

The component is available as part of the DKFDS Vue 3 component library.

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsRadioGroup v-model="selectedOption" label="Choose an option">
    <FdsRadioItem value="option1">Option 1</FdsRadioItem>
    <FdsRadioItem value="option2">Option 2</FdsRadioItem>
    <FdsRadioItem value="option3">Option 3</FdsRadioItem>
  </FdsRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'

const selectedOption = ref(null)
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | `string \| number \| boolean \| null` | `null` | No | The v-model value for two-way data binding. Represents the currently selected radio option value |
| `id` | `string` | `undefined` | No | Unique identifier for the radio group. If not provided, will be auto-generated |
| `label` | `string` | - | Yes | Label for the radio group displayed in the legend. Required for accessibility and user clarity |
| `helpText` | `string` | `''` | No | Help text providing additional context for the radio group. Displayed below the legend and linked via aria-describedby |
| `name` | `string` | `undefined` | No | Name attribute for all radio buttons in the group. If not provided, uses the generated form ID |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `value: string \| number \| boolean` | Emitted when radio selection changes. Used for v-model two-way data binding |
| `dirty` | `isDirty: boolean` | Emitted when any radio button in the group loses focus. Useful for triggering validation after user interaction |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | - | Default slot for FdsRadioItem components |
| `label` | - | Custom label content instead of the label prop |
| `help` | - | Custom help text content instead of the helpText prop |

## Usage Examples

### Basic Radio Group

```vue
<template>
  <FdsRadioGroup v-model="paymentMethod" label="Payment Method">
    <FdsRadioItem value="card">Credit Card</FdsRadioItem>
    <FdsRadioItem value="bank">Bank Transfer</FdsRadioItem>
    <FdsRadioItem value="cash">Cash</FdsRadioItem>
  </FdsRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'

const paymentMethod = ref('card')
</script>
```

### Radio Group with Help Text

```vue
<template>
  <FdsRadioGroup 
    v-model="contactPreference" 
    label="How should we contact you?"
    helpText="Choose your preferred method of communication"
  >
    <FdsRadioItem value="email">Email</FdsRadioItem>
    <FdsRadioItem value="phone">Phone</FdsRadioItem>
    <FdsRadioItem value="post">Mail</FdsRadioItem>
  </FdsRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'

const contactPreference = ref('email')
</script>
```

### Radio Group with Custom Label and Help Slots

```vue
<template>
  <FdsRadioGroup v-model="subscription" label="Subscription Type">
    <template #label>
      <strong>Select Subscription Type</strong>
      <span class="required-indicator">*</span>
    </template>
    <template #help>
      <p>Choose the subscription that best fits your needs.</p>
      <a href="#pricing">View pricing details</a>
    </template>
    
    <FdsRadioItem value="basic">Basic Plan</FdsRadioItem>
    <FdsRadioItem value="premium">Premium Plan</FdsRadioItem>
    <FdsRadioItem value="enterprise">Enterprise Plan</FdsRadioItem>
  </FdsRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'

const subscription = ref(null)
</script>
```

### Radio Group with Conditional Content

```vue
<template>
  <FdsRadioGroup v-model="travelMethod" label="How will you travel?">
    <FdsRadioItem value="car">Car</FdsRadioItem>
    <FdsRadioItem value="train">Train</FdsRadioItem>
    <FdsRadioItem value="other">Other
      <template #content>
        <FdsLabel>Please specify:</FdsLabel>
        <FdsInput v-model="otherMethod" placeholder="Enter transportation method" />
      </template>
    </FdsRadioItem>
  </FdsRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { FdsRadioGroup, FdsRadioItem, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'

const travelMethod = ref('car')
const otherMethod = ref('')
</script>
```

### Radio Group with Event Handling

```vue
<template>
  <FdsRadioGroup 
    v-model="userType" 
    label="User Type"
    @update:modelValue="handleSelectionChange"
    @dirty="handleDirty"
  >
    <FdsRadioItem value="citizen">Citizen</FdsRadioItem>
    <FdsRadioItem value="business">Business</FdsRadioItem>
    <FdsRadioItem value="organization">Organization</FdsRadioItem>
  </FdsRadioGroup>
  
  <p v-if="selectionMessage">{{ selectionMessage }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'

const userType = ref(null)
const selectionMessage = ref('')

const handleSelectionChange = (value) => {
  selectionMessage.value = `You selected: ${value}`
  console.log('Selection changed to:', value)
}

const handleDirty = (isDirty) => {
  if (isDirty) {
    console.log('User has interacted with the radio group')
  }
}
</script>
```

### Radio Group with Custom Name

```vue
<template>
  <FdsRadioGroup 
    v-model="priority" 
    label="Priority Level"
    name="task-priority"
    helpText="Select the urgency level for this task"
  >
    <FdsRadioItem value="low">Low Priority</FdsRadioItem>
    <FdsRadioItem value="medium">Medium Priority</FdsRadioItem>
    <FdsRadioItem value="high">High Priority</FdsRadioItem>
    <FdsRadioItem value="urgent">Urgent</FdsRadioItem>
  </FdsRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { FdsRadioGroup, FdsRadioItem } from '@madsb/dkfds-vue3'

const priority = ref('medium')
</script>
```

## Accessibility

The FdsRadioGroup component implements comprehensive accessibility features following WCAG 2.1 AA standards:

### Keyboard Navigation
- **Tab**: Navigate to the radio group
- **Arrow keys**: Navigate between radio options within the group
- **Space**: Select the focused radio option

### Screen Reader Support
- Uses semantic `<fieldset>` and `<legend>` elements for proper grouping
- Associates help text with the group using `aria-describedby`
- Maintains `role="radiogroup"` for enhanced screen reader support
- Each radio item is properly labeled and associated with the group

### Accessibility Features
- **Semantic HTML**: Uses fieldset/legend structure for proper grouping
- **ARIA Labels**: Proper `aria-labelledby` linking legend to fieldset
- **ARIA Descriptions**: Help text linked via `aria-describedby`
- **Focus Management**: Logical tab order and focus indication
- **Screen Reader Announcements**: Clear announcements of selection changes

### Accessibility Testing
- Tested with NVDA, JAWS, and VoiceOver screen readers
- Keyboard navigation verified across different browsers
- Color contrast ratios meet WCAG AA requirements
- Focus indicators clearly visible

## DKFDS Guidelines

This component follows the official DKFDS v11 specifications:

### Design Patterns
- Implements standard DKFDS radio button styling and spacing
- Follows DKFDS form structure with fieldset/legend pattern
- Uses correct CSS classes (`form-group-radio`, `form-radio`, `form-label`)
- Supports both VirkDK and BorgerDK theme variants

### Behavior Scripts
- Integrates with DKFDS JavaScript behavior for enhanced functionality
- Supports conditional content display (collapse/expand patterns)
- Maintains consistency with other DKFDS form components

### Usage Guidelines
- Always provide descriptive labels for radio groups
- Use help text to clarify complex choices or provide context
- Group related options logically
- Consider using conditional content for options requiring additional input
- Maintain consistent spacing and alignment with other form elements

## TypeScript Support

The component includes comprehensive TypeScript definitions:

```typescript
interface FdsRadioGroupProps {
  modelValue?: string | number | boolean | null
  id?: string
  label: string
  helpText?: string
  name?: string
}
```

## Related Components

- **[FdsRadioItem](/components/input/fds-radio-item)** - Individual radio button items to use within radio groups
- **[FdsCheckbox](/components/input/fds-checkbox)** - For multiple selection scenarios
- **[FdsDropdown](/components/input/fds-dropdown)** - Alternative for single selection with many options
- **[FdsFormgroup](/components/forms/fds-formgroup)** - For complex form layouts requiring additional structure

<!-- Verified against source -->