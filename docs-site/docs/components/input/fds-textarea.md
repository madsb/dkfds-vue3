---
title: FdsTextarea
description: Multi-line text input component implementing DKFDS v11 specifications with automatic row sizing, character limits, and proper accessibility attributes
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [textarea, input, form, multi-line, character-limit, rows, accessibility]
---

# FdsTextarea

Multi-line text input component implementing DKFDS v11 specifications. Provides automatic row sizing based on content, character limit support, and proper accessibility attributes following DKFDS patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsTextarea v-model="description" :rows="3" />
</template>

<script setup>
import { ref } from 'vue'
import { FdsTextarea } from '@madsb/dkfds-vue3'

const description = ref('')
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | `string` | - | ✅ | The v-model value for two-way data binding |
| `id` | `string` | `undefined` | - | Unique identifier for the textarea. Auto-generated if not provided |
| `rows` | `number` | `5` | - | Number of visible text rows (minimum height) |
| `maxRows` | `number` | `10` | - | Maximum number of rows for auto-resize |
| `rowlength` | `number` | `80` | - | Characters per row for auto-resize calculation |
| `maxlength` | `number` | `undefined` | - | Maximum character length allowed |
| `widthClass` | `string` | `''` | - | CSS class for textarea width sizing |

### Width Class Values
- `input--width-xs` - Extra small width
- `input--width-s` - Small width  
- `input--width-m` - Medium width
- `input--width-l` - Large width
- `input--width-xl` - Extra large width

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when textarea value changes (v-model) |
| `dirty` | `boolean` | Emitted when textarea loses focus |
| `input` | `Event` | Emitted on input event with raw DOM event |

## Slots

This component does not provide any slots.

## Usage Examples

### Basic Textarea

```vue
<template>
  <FdsTextarea v-model="basicText" :rows="3" />
</template>

<script setup>
import { ref } from 'vue'
import { FdsTextarea } from '@madsb/dkfds-vue3'

const basicText = ref('')
</script>
```

### Textarea with Character Limit

```vue
<template>
  <div>
    <FdsTextarea 
      v-model="limitedText" 
      :maxlength="500" 
      :rows="5" 
      :max-rows="10" 
      width-class="input--width-l"
    />
    <FdsInputLimit v-model="limitedText" :limit="500" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FdsTextarea, FdsInputLimit } from '@madsb/dkfds-vue3'

const limitedText = ref('')
</script>
```

### In Form Group with Validation

```vue
<template>
  <FdsFormgroup :is-valid="descriptionValid">
    <template #default="{ formid, ariaDescribedby }">
      <FdsLabel :required="true">Project Description</FdsLabel>
      <FdsHint>Describe your project in detail (500 characters max)</FdsHint>
      <FdsTextarea 
        v-model="description" 
        :id="formid"
        :maxlength="500"
        :rows="4"
        :max-rows="8"
        @dirty="validateDescription"
      />
      <FdsInputLimit v-model="description" :limit="500" />
      <FdsFejlmeddelelse v-if="!descriptionValid">
        Description is required
      </FdsFejlmeddelelse>
    </template>
  </FdsFormgroup>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  FdsTextarea, 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsInputLimit, 
  FdsFejlmeddelelse 
} from '@madsb/dkfds-vue3'

const description = ref('')
const descriptionTouched = ref(false)

const descriptionValid = computed(() => 
  !descriptionTouched.value || description.value.trim().length > 0
)

const validateDescription = () => {
  descriptionTouched.value = true
}
</script>
```

### Auto-Resizing Textarea

```vue
<template>
  <FdsTextarea 
    v-model="autoText"
    :rows="3"
    :max-rows="15"
    :rowlength="60"
    width-class="input--width-xl"
    placeholder="Start typing and watch the textarea expand..."
  />
</template>

<script setup>
import { ref } from 'vue'
import { FdsTextarea } from '@madsb/dkfds-vue3'

const autoText = ref('')
</script>
```

### With Custom ID and Event Handling

```vue
<template>
  <FdsTextarea 
    id="custom-textarea"
    v-model="customText"
    :rows="4"
    @input="handleInput"
    @dirty="handleBlur"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FdsTextarea } from '@madsb/dkfds-vue3'

const customText = ref('')

const handleInput = (event) => {
  console.log('Input event:', event.target.value)
}

const handleBlur = (isDirty) => {
  console.log('Textarea touched:', isDirty)
}
</script>
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ **Keyboard Navigation**: Full keyboard accessibility
- ✅ **Screen Reader Support**: Proper semantic markup with textarea element
- ✅ **Focus Management**: Clear focus indicators and logical tab order
- ✅ **Form Association**: Supports `aria-describedby` for form hints and errors
- ✅ **Label Association**: Works with explicit labels via `for` attribute
- ✅ **Error Identification**: Integration with error messaging components

### Accessibility Features

- **Semantic HTML**: Uses native `<textarea>` element
- **ARIA Support**: Automatic `aria-describedby` when used with form components
- **Label Association**: Auto-generated or custom `id` for label association
- **Form Integration**: Works seamlessly with `FdsFormgroup` for accessibility context
- **Character Limit**: When used with `FdsInputLimit`, provides accessible character count

### Screen Reader Experience

- Textarea is announced with its role and current value
- Associated labels, hints, and errors are read automatically
- Character limits are announced when using `FdsInputLimit`
- Form validation states are communicated clearly

## DKFDS Guidelines

### Design System Compliance

- **Visual Design**: Follows DKFDS v11 textarea styling specifications
- **Interaction Patterns**: Implements standard DKFDS form interaction behaviors
- **Spacing & Typography**: Uses DKFDS design tokens for consistent appearance
- **State Management**: Supports all DKFDS form states (default, focus, error, disabled)

### Width Classes

The component supports DKFDS width classes for consistent sizing:

```vue
<!-- Extra small (≈ 5 characters) -->
<FdsTextarea width-class="input--width-xs" v-model="text" />

<!-- Small (≈ 10 characters) -->
<FdsTextarea width-class="input--width-s" v-model="text" />

<!-- Medium (≈ 20 characters) -->
<FdsTextarea width-class="input--width-m" v-model="text" />

<!-- Large (≈ 30 characters) -->
<FdsTextarea width-class="input--width-l" v-model="text" />

<!-- Extra large (≈ 40 characters) -->
<FdsTextarea width-class="input--width-xl" v-model="text" />
```

### Form Integration

Best used within the DKFDS form component ecosystem:

```vue
<FdsFormgroup>
  <template #default="{ formid, ariaDescribedby }">
    <FdsLabel>Description</FdsLabel>
    <FdsHint>Please provide detailed information</FdsHint>
    <FdsTextarea 
      v-model="description"
      :id="formid"
    />
  </template>
</FdsFormgroup>
```

## TypeScript Interface

```typescript
export interface FdsTextareaProps {
  /** The v-model value for two-way data binding */
  modelValue: string
  /** Unique identifier for the textarea */
  id?: string
  /** Number of visible text rows (minimum height) */
  rows?: number
  /** Maximum number of rows for auto-resize */
  maxRows?: number
  /** Characters per row for auto-resize calculation */
  rowlength?: number
  /** Maximum character length allowed */
  maxlength?: number
  /** CSS class for textarea width sizing */
  widthClass?: string
}
```

## Related Components

- **[FdsInput](/components/input/fds-input)** - Single-line text input
- **[FdsInputLimit](/components/input/fds-input-limit)** - Character limit indicator
- **[FdsLabel](/components/forms/fds-label)** - Form labels  
- **[FdsHint](/components/forms/fds-hint)** - Form hints and descriptions
- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form field grouping
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages

<!-- Verified against source -->