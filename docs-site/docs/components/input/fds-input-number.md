---
title: FdsInputNumber
description: Number input component implementing DKFDS v11 input field specifications with validation, prefix/suffix support, and proper accessibility attributes
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [form, number, input, validation, prefix, suffix, numeric, accessibility]
---

# FdsInputNumber

Number input component implementing DKFDS v11 input field specifications. Provides a numeric input with validation, prefix/suffix support, and proper accessibility attributes. Supports min/max constraints, step values, and automatic focus selection for easy value replacement. Integrates with form groups for coordinated validation and accessibility.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsInputNumber } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <div>
    <!-- Basic number input -->
    <FdsInputNumber v-model="age" :min="0" :max="120" />
    
    <!-- Price input with prefix and suffix -->
    <FdsInputNumber 
      v-model="price" 
      prefix="kr." 
      :step="0.01" 
      :min="0"
      widthClass="input--width-m"
    />
    
    <!-- In form group -->
    <FdsFormgroup>
      <FdsLabel>Age</FdsLabel>
      <FdsHint>Enter your age in years</FdsHint>
      <FdsInputNumber 
        v-model="age" 
        :min="18" 
        :max="100" 
        suffix="years"
      />
    </FdsFormgroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputNumber, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const age = ref<number>()
const price = ref<number>()
</script>
```

## Props

| Prop         | Type                 | Default     | Required | Description                                                                               |
| ------------ | -------------------- | ----------- | -------- | ----------------------------------------------------------------------------------------- |
| `id`         | `string`             | `undefined` | No       | Unique identifier for the input. If not provided, will be auto-generated.                |
| `modelValue` | `number \| string`   | `''`        | No       | The v-model value for two-way data binding. Accepts both number and string types.        |
| `suffix`     | `string`             | `undefined` | No       | Suffix text displayed after the input. Useful for units like 'kr.', 'kg', '%', etc.     |
| `prefix`     | `string`             | `undefined` | No       | Prefix text displayed before the input. Useful for currency symbols, labels, etc.        |
| `min`        | `number`             | `undefined` | No       | Minimum value allowed for the input. Sets the HTML min attribute for validation.         |
| `max`        | `number`             | `undefined` | No       | Maximum value allowed for the input. Sets the HTML max attribute for validation.         |
| `step`       | `number \| string`   | `undefined` | No       | Step value for increment/decrement operations. Determines precision for decimal values.   |
| `widthClass` | `string`             | `''`        | No       | CSS class for input width sizing. Available: `input--width-xs`, `input--width-s`, `input--width-m`, `input--width-l`, `input--width-xl` |

## Events

| Event               | Payload             | Description                                                                      |
| ------------------- | ------------------- | -------------------------------------------------------------------------------- |
| `update:modelValue` | `number \| string`  | Emitted when input value changes. Used for v-model two-way data binding.        |
| `dirty`             | `boolean`           | Emitted when input loses focus. Useful for triggering validation after user interaction. |
| `input`             | `Event`             | Emitted on input event. Provides access to the raw DOM input event.            |

## Slots

This component does not provide any slots. Content is provided through the `prefix` and `suffix` props.

## Usage Examples

### Basic Number Input

```vue
<template>
  <div>
    <FdsFormgroup>
      <FdsLabel>Quantity</FdsLabel>
      <FdsHint>Enter the number of items</FdsHint>
      <FdsInputNumber 
        v-model="quantity" 
        :min="1" 
        :max="999" 
        :step="1"
        widthClass="input--width-s"
      />
    </FdsFormgroup>
    
    <p>Selected quantity: {{ quantity }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputNumber, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const quantity = ref<number>(1)
</script>
```

### Price Input with Currency

```vue
<template>
  <div>
    <FdsFormgroup>
      <FdsLabel>Product Price</FdsLabel>
      <FdsHint>Enter price in Danish kroner</FdsHint>
      <FdsInputNumber 
        v-model="price" 
        prefix="kr." 
        :step="0.01" 
        :min="0"
        :max="999999.99"
        widthClass="input--width-m"
        @dirty="validatePrice"
      />
    </FdsFormgroup>
    
    <p v-if="price">Formatted price: {{ formatPrice(price) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputNumber, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const price = ref<number>()

const validatePrice = () => {
  if (price.value && price.value < 0) {
    price.value = 0
  }
}

const formatPrice = (value: number | string) => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK'
  }).format(num)
}
</script>
```

### Age Input with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FdsFormgroup :isValid="validation.age.isValid">
      <FdsLabel :required="true">Age</FdsLabel>
      <FdsHint>You must be at least 18 years old</FdsHint>
      <FdsInputNumber 
        v-model="form.age" 
        :min="18" 
        :max="120" 
        suffix="år"
        widthClass="input--width-xs"
        @dirty="validateAge"
        :class="{ 'error': !validation.age.isValid }"
      />
      <FdsFejlmeddelelse v-if="!validation.age.isValid">
        {{ validation.age.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>
    
    <div class="form-actions mt-4">
      <FdsButton type="submit" variant="primary" :disabled="!isFormValid">
        Continue
      </FdsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { 
  FdsInputNumber, 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsFejlmeddelelse,
  FdsButton 
} from '@madsb/dkfds-vue3'

const form = reactive({
  age: null as number | null
})

const validation = ref({
  age: { isValid: true, message: '' }
})

const isFormValid = computed(() => 
  form.age !== null && 
  form.age >= 18 && 
  form.age <= 120 && 
  validation.value.age.isValid
)

const validateAge = () => {
  const field = validation.value.age
  
  if (form.age === null || form.age === undefined) {
    field.isValid = false
    field.message = 'Age is required'
  } else if (form.age < 18) {
    field.isValid = false
    field.message = 'You must be at least 18 years old'
  } else if (form.age > 120) {
    field.isValid = false
    field.message = 'Please enter a valid age'
  } else {
    field.isValid = true
    field.message = ''
  }
}

const handleSubmit = () => {
  validateAge()
  
  if (isFormValid.value) {
    console.log('Form submitted:', form)
    // Handle form submission
  }
}
</script>
```

### Measurement Input with Units

```vue
<template>
  <div>
    <h3>Physical Measurements</h3>
    
    <div class="form-row">
      <FdsFormgroup>
        <FdsLabel>Height</FdsLabel>
        <FdsHint>Enter your height in centimeters</FdsHint>
        <FdsInputNumber 
          v-model="measurements.height" 
          :min="50" 
          :max="250" 
          :step="1"
          suffix="cm"
          widthClass="input--width-s"
        />
      </FdsFormgroup>
      
      <FdsFormgroup>
        <FdsLabel>Weight</FdsLabel>
        <FdsHint>Enter your weight in kilograms</FdsHint>
        <FdsInputNumber 
          v-model="measurements.weight" 
          :min="10" 
          :max="300" 
          :step="0.1"
          suffix="kg"
          widthClass="input--width-s"
        />
      </FdsFormgroup>
    </div>
    
    <div v-if="measurements.height && measurements.weight" class="mt-3">
      <strong>BMI:</strong> {{ calculateBMI().toFixed(1) }}
      <span class="text-muted">({{ getBMICategory() }})</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { FdsInputNumber, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const measurements = reactive({
  height: null as number | null,
  weight: null as number | null
})

const calculateBMI = () => {
  if (!measurements.height || !measurements.weight) return 0
  const heightInM = measurements.height / 100
  return measurements.weight / (heightInM * heightInM)
}

const getBMICategory = () => {
  const bmi = calculateBMI()
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}
</script>
```

### Percentage and Decimal Inputs

```vue
<template>
  <div>
    <h3>Financial Information</h3>
    
    <FdsFormgroup>
      <FdsLabel>Interest Rate</FdsLabel>
      <FdsHint>Annual interest rate as percentage</FdsHint>
      <FdsInputNumber 
        v-model="financial.interestRate" 
        :min="0" 
        :max="100" 
        :step="0.01"
        suffix="%"
        widthClass="input--width-s"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Loan Amount</FdsLabel>
      <FdsHint>Enter the loan amount in Danish kroner</FdsHint>
      <FdsInputNumber 
        v-model="financial.loanAmount" 
        prefix="kr."
        :min="1000" 
        :max="10000000" 
        :step="1000"
        widthClass="input--width-l"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Down Payment</FdsLabel>
      <FdsHint>Minimum 5% of loan amount</FdsHint>
      <FdsInputNumber 
        v-model="financial.downPayment" 
        prefix="kr."
        :min="computedMinDownPayment" 
        :max="financial.loanAmount"
        :step="1000"
        widthClass="input--width-l"
      />
    </FdsFormgroup>
    
    <div v-if="financial.loanAmount && financial.interestRate" class="mt-4">
      <h4>Calculation Results</h4>
      <p><strong>Down payment percentage:</strong> {{ downPaymentPercentage.toFixed(1) }}%</p>
      <p><strong>Monthly payment estimate:</strong> {{ formatCurrency(monthlyPayment) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { FdsInputNumber, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const financial = reactive({
  interestRate: null as number | null,
  loanAmount: null as number | null,
  downPayment: null as number | null
})

const computedMinDownPayment = computed(() => {
  return financial.loanAmount ? Math.ceil(financial.loanAmount * 0.05) : 0
})

const downPaymentPercentage = computed(() => {
  if (!financial.loanAmount || !financial.downPayment) return 0
  return (financial.downPayment / financial.loanAmount) * 100
})

const monthlyPayment = computed(() => {
  if (!financial.loanAmount || !financial.interestRate || !financial.downPayment) return 0
  
  const principal = financial.loanAmount - financial.downPayment
  const monthlyRate = financial.interestRate / 100 / 12
  const numberOfPayments = 30 * 12 // 30 years
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK'
  }).format(value)
}
</script>
```

### Scientific/Technical Input

```vue
<template>
  <div>
    <h3>Laboratory Measurements</h3>
    
    <FdsFormgroup>
      <FdsLabel>Temperature</FdsLabel>
      <FdsHint>Enter temperature in Celsius</FdsHint>
      <FdsInputNumber 
        v-model="lab.temperature" 
        :min="-273.15" 
        :max="1000" 
        :step="0.1"
        suffix="°C"
        widthClass="input--width-s"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Concentration</FdsLabel>
      <FdsHint>Molarity in mol/L</FdsHint>
      <FdsInputNumber 
        v-model="lab.concentration" 
        :min="0" 
        :max="10" 
        :step="0.001"
        suffix="mol/L"
        widthClass="input--width-s"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Volume</FdsLabel>
      <FdsHint>Sample volume in milliliters</FdsHint>
      <FdsInputNumber 
        v-model="lab.volume" 
        :min="0.1" 
        :max="1000" 
        :step="0.1"
        suffix="mL"
        widthClass="input--width-s"
      />
    </FdsFormgroup>
    
    <div v-if="lab.concentration && lab.volume" class="mt-3">
      <strong>Amount of substance:</strong> {{ calculateMoles().toFixed(4) }} mol
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { FdsInputNumber, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const lab = reactive({
  temperature: null as number | null,
  concentration: null as number | null,
  volume: null as number | null
})

const calculateMoles = () => {
  if (!lab.concentration || !lab.volume) return 0
  return lab.concentration * (lab.volume / 1000) // Convert mL to L
}
</script>
```

### Width Classes and Sizing

```vue
<template>
  <div>
    <h3>Input Width Examples</h3>
    
    <FdsFormgroup>
      <FdsLabel>Extra Small (input--width-xs)</FdsLabel>
      <FdsHint>Good for short numbers like age</FdsHint>
      <FdsInputNumber 
        v-model="examples.xs" 
        widthClass="input--width-xs"
        :max="99"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Small (input--width-s)</FdsLabel>
      <FdsHint>Good for quantities, percentages</FdsHint>
      <FdsInputNumber 
        v-model="examples.s" 
        widthClass="input--width-s"
        suffix="%"
        :step="0.1"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Medium (input--width-m)</FdsLabel>
      <FdsHint>Good for prices, measurements</FdsHint>
      <FdsInputNumber 
        v-model="examples.m" 
        widthClass="input--width-m"
        prefix="kr."
        :step="0.01"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Large (input--width-l)</FdsLabel>
      <FdsHint>Good for large numbers, coordinates</FdsHint>
      <FdsInputNumber 
        v-model="examples.l" 
        widthClass="input--width-l"
        :step="0.000001"
      />
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Extra Large (input--width-xl)</FdsLabel>
      <FdsHint>Good for very large numbers</FdsHint>
      <FdsInputNumber 
        v-model="examples.xl" 
        widthClass="input--width-xl"
        :step="1000"
      />
    </FdsFormgroup>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { FdsInputNumber, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const examples = reactive({
  xs: null as number | null,
  s: null as number | null,
  m: null as number | null,
  l: null as number | null,
  xl: null as number | null
})
</script>
```

## Accessibility

FdsInputNumber implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Keyboard Navigation

- **Arrow keys**: Increment/decrement values when step is defined
- **Tab navigation**: Input receives focus in natural tab order
- **Enter key**: Submits parent form (standard browser behavior)
- **Focus selection**: Automatically selects all text on focus for easy replacement
- **Focus management**: Clear visual focus indicators with proper contrast ratios

### Screen Reader Support

- **Semantic markup**: Uses proper `<input type="number">` elements
- **Label association**: Automatic association through `for` and `id` attributes when used with FdsLabel
- **Value announcement**: Screen readers announce numeric value changes
- **Constraint announcement**: Min/max values are announced to assistive technology
- **Unit context**: Prefix and suffix provide context for numeric values

### ARIA Support

- **aria-describedby**: Automatic injection from parent FdsFormgroup context
- **aria-hidden**: Prefix and suffix elements properly hidden from screen readers
- **Validation attributes**: HTML5 validation attributes (min, max, step) for native validation
- **Role clarity**: Clear numeric input role for assistive technology

### Form Integration

- **Form submission**: Proper name and value attributes for form data
- **Validation integration**: Works seamlessly with HTML5 and custom validation
- **Error association**: Integrates with FdsFormgroup error state management
- **Focus management**: Maintains focus during validation state changes

## DKFDS Guidelines

FdsInputNumber follows the Danish Common Design System specifications:

### Design System Integration

- **Semantic classes**: Uses standard `form-input` CSS classes with width modifiers
- **Visual consistency**: Follows DKFDS input field styling and spacing specifications
- **Theme compatibility**: Works seamlessly with both VirkDK and BorgerDK themes
- **Prefix/suffix styling**: Implements DKFDS prefix/suffix wrapper patterns

### Form Structure Standards

- **DKFDS v11 compliance**: Implements latest DKFDS input field specifications
- **Wrapper patterns**: Correct use of `form-input-wrapper` with prefix/suffix modifiers
- **Width classes**: Supports all DKFDS input width classes (xs, s, m, l, xl)
- **Form integration**: Designed to work with other DKFDS form components

### User Experience Patterns

- **Focus behavior**: Automatic text selection follows DKFDS UX patterns
- **Visual feedback**: Clear indication of focus state and input boundaries
- **Progressive enhancement**: Works without JavaScript while enhanced with Vue reactivity
- **Responsive design**: Input sizing adapts appropriately across device sizes

### Danish Government Context

- **Currency formatting**: Supports Danish kroner (kr.) with proper decimal handling
- **Measurement units**: Handles metric system units common in Danish context
- **Cultural adaptation**: Examples use Danish terminology and measurement conventions
- **Public sector compatibility**: Meets Danish public sector digital requirements

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group container with validation context and error handling
- **[FdsLabel](/components/forms/fds-label)** - Form labels with required field indicators and proper association
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages for form validation
- **[FdsHint](/components/forms/fds-hint)** - Helper text and guidance for form fields
- **[FdsInput](/components/input/fds-input)** - Standard text input component
- **[FdsTextarea](/components/input/fds-textarea)** - Multi-line text input
- **[FdsDropdown](/components/input/fds-dropdown)** - Dropdown selection component

## TypeScript Support

```typescript
import type { FdsInputNumberProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsInputNumberProps {
  id?: string
  modelValue?: number | string
  suffix?: string
  prefix?: string
  min?: number
  max?: number
  step?: number | string
  widthClass?: string
}

// Event payload types
type NumberInputValue = number | string

// Usage in component
const inputProps: FdsInputNumberProps = {
  id: 'price-input',
  modelValue: 0,
  prefix: 'kr.',
  min: 0,
  max: 999999.99,
  step: 0.01,
  widthClass: 'input--width-m'
}

// Reactive references with proper typing
const numberValue = ref<number>(0)
const stringValue = ref<string>('')
const optionalNumber = ref<number | null>(null)

// Width class constants for type safety
type InputWidthClass = 
  | 'input--width-xs'
  | 'input--width-s' 
  | 'input--width-m'
  | 'input--width-l'
  | 'input--width-xl'
  | ''

const widthClass: InputWidthClass = 'input--width-m'
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/input/fds-input-number.vue -->