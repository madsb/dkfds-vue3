# Components API

Complete API reference for all DKFDS Vue 3 components with TypeScript definitions, props, events, and usage examples.

## Import Patterns

### Individual Component Imports
```typescript
// Import specific components (recommended for tree-shaking)
import { FdsButton, FdsInput, FdsAlert } from '@madsb/dkfds-vue3'

// Import component types
import type { 
  FdsButtonProps, 
  FdsInputProps, 
  FdsAlertProps 
} from '@madsb/dkfds-vue3'

// Import event types
import type { 
  FdsButtonClickEvent,
  FdsInputChangeEvent 
} from '@madsb/dkfds-vue3'
```

### Global Registration
```typescript
// Register all components globally
import dkfdsVue3 from '@madsb/dkfds-vue3'
import '@madsb/dkfds-vue3/styles'

const app = createApp(App)
app.use(dkfdsVue3)
```

### Selective Registration
```typescript
// Register specific components globally
import { FdsButton, FdsInput } from '@madsb/dkfds-vue3'

const app = createApp(App)
app.component('FdsButton', FdsButton)
app.component('FdsInput', FdsInput)
```

## Component Categories

### Form Components

#### FdsFormgroup
Container component for form field elements with proper spacing and accessibility.

```typescript
interface FdsFormgroupProps {
  // Inherits all HTML div attributes
}
```

#### FdsLabel  
Semantic form labels with proper association to form controls.

```typescript
interface FdsLabelProps {
  for?: string
  required?: boolean
}
```

#### FdsHint
Helper text component for providing additional guidance on form fields.

```typescript
interface FdsHintProps {
  id?: string
}
```

#### FdsFejlmeddelelse
Error message component for displaying validation errors.

```typescript
interface FdsFejlmeddelelseProps {
  id?: string
  role?: 'alert' | 'status'
}
```

### Input Components

#### FdsInput
Text input component with validation support and accessibility features.

```typescript
interface FdsInputProps {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  maxlength?: number
  minlength?: number
  pattern?: string
  autocomplete?: string
  size?: 'small' | 'medium' | 'large'
  prefix?: string
  suffix?: string
}

// Events
interface FdsInputEvents {
  'update:modelValue': (value: string) => void
  input: (event: InputEvent) => void
  change: (event: Event) => void
  focus: (event: FocusEvent) => void
  blur: (event: FocusEvent) => void
}
```

#### FdsTextarea
Multi-line text input component with resizing and character counting.

```typescript
interface FdsTextareaProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  cols?: number
  maxlength?: number
  minlength?: number
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}
```

#### FdsCheckbox
Checkbox input with indeterminate state support.

```typescript
interface FdsCheckboxProps {
  modelValue?: boolean | string | number
  value?: string | number | boolean
  trueValue?: any
  falseValue?: any
  indeterminate?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
}

interface FdsCheckboxEvents {
  'update:modelValue': (value: any) => void
  change: (event: Event) => void
}
```

#### FdsRadioGroup & FdsRadioItem
Radio button components with group management.

```typescript
interface FdsRadioGroupProps {
  modelValue?: string | number
  name?: string
  disabled?: boolean
  required?: boolean
  inline?: boolean
}

interface FdsRadioItemProps {
  value: string | number
  disabled?: boolean
  name?: string
}
```

#### FdsDropdown
Select dropdown with search and multi-select support.

```typescript
interface FdsDropdownProps {
  modelValue?: string | number | Array<string | number>
  options?: Array<{
    label: string
    value: string | number
    disabled?: boolean
  }>
  placeholder?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  loading?: boolean
}
```

### Layout Components

#### FdsButton
Primary action component with variants, icons, and loading states.

```typescript
interface FdsButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning'
  size?: 'small' | 'medium' | 'large'
  icon?: string
  iconRight?: boolean
  iconOnly?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidthMobile?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
}

interface FdsButtonEvents {
  click: (event: MouseEvent) => void
  focus: (event: FocusEvent) => void
  blur: (event: FocusEvent) => void
}
```

#### FdsIkon
Icon component for DKFDS icon system.

```typescript
interface FdsIkonProps {
  icon: string
  size?: 'small' | 'medium' | 'large'
  decorative?: boolean
  ariaLabel?: string
}
```

### Feedback Components

#### FdsAlert
Status messages and notifications with dismissible variants.

```typescript
interface FdsAlertProps {
  variant: 'success' | 'info' | 'warning' | 'error'
  title?: string
  dismissible?: boolean
  role?: 'alert' | 'status'
}

interface FdsAlertEvents {
  dismiss: () => void
}
```

#### FdsToast
Temporary notification messages with auto-dismiss.

```typescript
interface FdsToastProps {
  variant: 'success' | 'info' | 'warning' | 'error'
  title?: string
  duration?: number
  persistent?: boolean
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
}

interface FdsToastEvents {
  dismiss: () => void
  timeout: () => void
}
```

#### FdsModal
Dialog and overlay windows with focus management.

```typescript
interface FdsModalProps {
  modelValue: boolean
  title?: string
  size?: 'small' | 'medium' | 'large' | 'fullscreen'
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  persistent?: boolean
  scrollable?: boolean
}

interface FdsModalEvents {
  'update:modelValue': (open: boolean) => void
  open: () => void
  close: () => void
  afterEnter: () => void
  afterLeave: () => void
}
```

## Common Props Patterns

### Model Value
Most input components use `v-model` with `modelValue` prop:
```vue
<FdsInput v-model="value" />
<!-- Equivalent to: -->
<FdsInput 
  :model-value="value" 
  @update:model-value="value = $event" 
/>
```

### Validation States
Components support validation through CSS classes and ARIA attributes:
```vue
<FdsInput 
  v-model="email"
  :class="{ 'input-error': hasError }"
  :aria-invalid="hasError"
  :aria-describedby="hasError ? 'email-error' : undefined"
/>
<FdsFejlmeddelelse v-if="hasError" id="email-error">
  Invalid email format
</FdsFejlmeddelelse>
```

### Accessibility Props
All components support standard accessibility attributes:
```vue
<FdsButton
  :aria-label="iconOnly ? 'Close dialog' : undefined"
  :aria-expanded="isExpanded"
  :aria-controls="controlsId"
  :aria-describedby="describedBy"
/>
```

## TypeScript Integration

### Component Refs
Access component instances with proper typing:
```vue
<script setup lang="ts">
import type { FdsInputInstance } from '@madsb/dkfds-vue3'

const inputRef = ref<FdsInputInstance>()

const focusInput = () => {
  inputRef.value?.focus()
}
</script>

<template>
  <FdsInput ref="inputRef" v-model="value" />
</template>
```

### Event Handlers
Type-safe event handling:
```vue
<script setup lang="ts">
import type { FdsButtonClickEvent } from '@madsb/dkfds-vue3'

const handleClick = (event: FdsButtonClickEvent) => {
  // event is properly typed
  console.log(event.target)
}
</script>

<template>
  <FdsButton @click="handleClick">Click me</FdsButton>
</template>
```

### Prop Validation
Use component prop types for validation:
```typescript
import type { FdsAlertProps } from '@madsb/dkfds-vue3'

interface MyComponentProps {
  alertConfig: FdsAlertProps
  showAlert: boolean
}

const props = defineProps<MyComponentProps>()
```

## Global Configuration

### Theme Configuration
```typescript
// Configure default theme
app.provide('dkfds-theme', {
  theme: 'virk', // or 'borger'
  colorScheme: 'light' // or 'dark'
})
```

### Icon Configuration
```typescript
// Configure icon base URL
app.provide('dkfds-icons', {
  baseUrl: '/path/to/icons/',
  format: 'svg'
})
```

## Bundle Information

### Tree Shaking
Components are individually exportable for optimal bundle size:
- Individual components: ~2-8KB each
- Full library: ~120KB (gzipped: ~40KB)
- CSS bundle: ~80KB (gzipped: ~15KB)

### Module Formats
- **ESM**: Modern bundlers (Vite, Webpack 5)
- **CommonJS**: Node.js and older bundlers  
- **UMD**: Browser global usage
- **IIFE**: Direct browser inclusion

## Performance Considerations

### Lazy Loading
Heavy components can be loaded on demand:
```typescript
import { defineAsyncComponent } from 'vue'

const FdsDatoVaelger = defineAsyncComponent(() => 
  import('@madsb/dkfds-vue3/components/FdsDatoVaelger')
)
```

### Memory Management
Components automatically clean up:
- Event listeners
- Observers (ResizeObserver, IntersectionObserver)
- Timeouts and intervals
- Focus traps

## Migration Guide

### From DKFDS v10
Component name changes and new props are documented in the migration guide.

### TypeScript Migration
Enable strict mode for full type safety:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```