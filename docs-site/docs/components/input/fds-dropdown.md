---
title: FdsDropdown
description: Dropdown select component implementing DKFDS v11 select field specifications with v-model binding and dirty state tracking
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [dropdown, select, form, input, choice, option]
---

# FdsDropdown

Dropdown select component implementing DKFDS v11 select field specifications. Provides a native select dropdown with v-model binding, dirty state tracking, and proper form integration. Uses slots for option content to maintain flexibility while providing consistent DKFDS styling and behavior.

<!-- Verified against source -->

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<script setup>
import { ref } from 'vue'
import { FdsDropdown } from '@madsb/dkfds-vue3'

const selectedCountry = ref('')
</script>

<template>
  <FdsDropdown v-model="selectedCountry">
    <option value="">Choose a country</option>
    <option value="dk">Denmark</option>
    <option value="no">Norway</option>
    <option value="se">Sweden</option>
  </FdsDropdown>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | `undefined` | No | Unique identifier for the dropdown. If not provided, will be auto-generated |
| `modelValue` | `string` | `''` | No | The v-model value for two-way data binding. Represents the currently selected option value |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `value: string` | Emitted when selection changes. Used for v-model two-way data binding |
| `dirty` | `isDirty: boolean` | Emitted when dropdown loses focus. Useful for triggering validation after user interaction |
| `change` | `event: Event` | Emitted on change event. Provides access to the raw DOM change event |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Content slot for option and optgroup elements. Use this to define the dropdown options |

## Usage Examples

### Basic Dropdown

```vue
<script setup>
import { ref } from 'vue'
import { FdsDropdown } from '@madsb/dkfds-vue3'

const selectedValue = ref('')
</script>

<template>
  <FdsDropdown v-model="selectedValue">
    <option value="">Select an option</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </FdsDropdown>
</template>
```

### In DKFDS Form Group

```vue
<script setup>
import { ref } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsDropdown, 
  FdsFejlmeddelelse 
} from '@madsb/dkfds-vue3'

const selectedCountry = ref('')
const countryValid = ref(true)

const validateCountry = () => {
  countryValid.value = selectedCountry.value !== ''
}
</script>

<template>
  <FdsFormgroup :isValid="countryValid">
    <template #default="{ formid, ariaDescribedby }">
      <FdsLabel :forId="formid" :required="true">Land</FdsLabel>
      <FdsHint>Vælg dit bopælsland</FdsHint>
      <FdsDropdown 
        v-model="selectedCountry" 
        :id="formid"
        @dirty="validateCountry"
      >
        <option value="">Vælg venligst...</option>
        <option value="dk">Danmark</option>
        <option value="no">Norge</option>
        <option value="se">Sverige</option>
        <option value="fi">Finland</option>
      </FdsDropdown>
      <FdsFejlmeddelelse v-if="!countryValid">
        Vælg venligst et land
      </FdsFejlmeddelelse>
    </template>
  </FdsFormgroup>
</template>
```

### Dynamic Options

```vue
<script setup>
import { ref, computed } from 'vue'
import { FdsDropdown } from '@madsb/dkfds-vue3'

const selectedCountry = ref('')
const selectedCity = ref('')

const countries = ref([
  { id: 'dk', name: 'Danmark' },
  { id: 'se', name: 'Sverige' },
  { id: 'no', name: 'Norge' }
])

const cities = computed(() => {
  const cityMap = {
    dk: [
      { id: 'cph', name: 'København' },
      { id: 'aar', name: 'Aarhus' },
      { id: 'odb', name: 'Odense' }
    ],
    se: [
      { id: 'sto', name: 'Stockholm' },
      { id: 'got', name: 'Göteborg' },
      { id: 'mal', name: 'Malmö' }
    ],
    no: [
      { id: 'osl', name: 'Oslo' },
      { id: 'ber', name: 'Bergen' },
      { id: 'trd', name: 'Trondheim' }
    ]
  }
  return cityMap[selectedCountry.value] || []
})

const handleCountryChange = () => {
  selectedCity.value = '' // Reset city when country changes
}
</script>

<template>
  <div class="form-group">
    <FdsDropdown v-model="selectedCountry" @change="handleCountryChange">
      <option value="">Vælg land</option>
      <option 
        v-for="country in countries" 
        :key="country.id" 
        :value="country.id"
      >
        {{ country.name }}
      </option>
    </FdsDropdown>
  </div>

  <div class="form-group" v-if="selectedCountry">
    <FdsDropdown v-model="selectedCity">
      <option value="">Vælg by</option>
      <option 
        v-for="city in cities" 
        :key="city.id" 
        :value="city.id"
      >
        {{ city.name }}
      </option>
    </FdsDropdown>
  </div>
</template>
```

### With Option Groups

```vue
<script setup>
import { ref } from 'vue'
import { FdsDropdown } from '@madsb/dkfds-vue3'

const selectedCourse = ref('')
</script>

<template>
  <FdsDropdown v-model="selectedCourse">
    <option value="">Vælg et kursus</option>
    
    <optgroup label="Frontend Udvikling">
      <option value="html">HTML & CSS</option>
      <option value="js">JavaScript</option>
      <option value="vue">Vue.js</option>
      <option value="react">React</option>
    </optgroup>
    
    <optgroup label="Backend Udvikling">
      <option value="node">Node.js</option>
      <option value="php">PHP</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
    </optgroup>
  </FdsDropdown>
</template>
```

### Handling Events

```vue
<script setup>
import { ref } from 'vue'
import { FdsDropdown } from '@madsb/dkfds-vue3'

const selectedValue = ref('')
const isDirty = ref(false)

const handleChange = (event) => {
  console.log('Selection changed:', event.target.value)
}

const handleDirty = (dirty) => {
  isDirty.value = dirty
  console.log('Field is now dirty:', dirty)
}
</script>

<template>
  <div>
    <FdsDropdown 
      v-model="selectedValue"
      @change="handleChange"
      @dirty="handleDirty"
    >
      <option value="">Vælg en mulighed</option>
      <option value="a">Mulighed A</option>
      <option value="b">Mulighed B</option>
      <option value="c">Mulighed C</option>
    </FdsDropdown>
    
    <p v-if="isDirty" class="help-text">
      Feltet er blevet berørt af brugeren
    </p>
  </div>
</template>
```

## Accessibility

The FdsDropdown component ensures WCAG 2.1 AA compliance through:

- **Native Select Element**: Uses the native HTML `<select>` element for optimal screen reader support and keyboard navigation
- **Proper Labeling**: Supports external labeling via `id` attribute and form integration
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Escape, Space) through native behavior
- **Focus Management**: Proper focus indication and tab order integration
- **Semantic Structure**: Option groups (`<optgroup>`) are properly supported for logical grouping

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to/from the dropdown |
| `Space` / `Enter` | Opens dropdown menu |
| `Arrow Up/Down` | Navigate through options |
| `Home/End` | Jump to first/last option |
| `Escape` | Closes dropdown without selection |
| `A-Z` | Quick selection by typing |

### Screen Reader Support

- Announces dropdown state (open/closed)
- Reads selected option value
- Supports option group labels
- Provides context for required fields
- Announces validation messages when properly connected

## DKFDS Guidelines

This component follows DKFDS v11 specifications:

- **Visual Design**: Implements DKFDS select field styling with proper borders, spacing, and focus states
- **State Management**: Includes dirty state tracking with visual feedback
- **Form Integration**: Works seamlessly with DKFDS form components (FdsFormgroup, FdsLabel, FdsHint)
- **Government Context**: Optimized for Danish government self-service solutions
- **Theme Support**: Compatible with both VirkDK and BorgerDK design tokens

### Required Usage Patterns

1. **Always use with FdsLabel** for accessibility and DKFDS compliance
2. **Include empty option** for non-required fields: `<option value="">Vælg...</option>`
3. **Use FdsHint** for additional context or instructions
4. **Validate on blur** using the `dirty` event for optimal UX
5. **Group related options** with `<optgroup>` when applicable

## TypeScript Interfaces

```typescript
export interface FdsDropdownProps {
  /** 
   * Unique identifier for the dropdown.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /** 
   * The v-model value for two-way data binding.
   * Represents the currently selected option value.
   * @default ''
   */
  modelValue?: string
}

// Events interface for TypeScript usage
interface FdsDropdownEmits {
  'update:modelValue': [value: string]
  'dirty': [isDirty: boolean] 
  'change': [event: Event]
}
```

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form field container with validation
- **[FdsLabel](/components/forms/fds-label)** - Accessible form field labels
- **[FdsHint](/components/forms/fds-hint)** - Form field help text
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Form field error messages
- **[FdsRadioGroup](/components/input/fds-radio-group)** - Alternative for fewer options
- **[FdsCheckbox](/components/input/fds-checkbox)** - For multiple selections