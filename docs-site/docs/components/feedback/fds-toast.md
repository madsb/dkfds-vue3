---
title: FdsToast
description: Toast notification component implementing DKFDS v11 toast specifications
category: feedback
dkfds: true
accessibility: WCAG 2.1 AA
tags: [notification, feedback, message, alert, temporary]
---

# FdsToast

Toast notification component that provides contextual feedback messages to users with different severity levels (info, success, warning, error). Features automatic dismissal, manual close functionality, and proper ARIA support for screen readers following DKFDS v11 toast specifications.

<!-- Verified against source -->

## Installation

Toast functionality is provided through two approaches:

1. **Programmatic usage** (recommended) - using the `useToast()` composable
2. **Component usage** - directly using the `<FdsToast>` component

```typescript
import { useToast } from '@madsb/dkfds-vue3'
// or
import { FdsToast } from '@madsb/dkfds-vue3'
```

## Quick Start

### Using the Composable (Recommended)

```vue
<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const { showSuccess, showError, showInfo, showWarning } = useToast()

// Show different toast types
const saveData = async () => {
  try {
    // Your save logic here
    showSuccess('Dine data er blevet gemt.', { heading: 'Succes!' })
  } catch (error) {
    showError('Der opstod en fejl ved gemning.', { heading: 'Fejl' })
  }
}
</script>

<template>
  <button @click="saveData">Gem data</button>
</template>
```

### Using the Component Directly

```vue
<script setup>
import { ref } from 'vue'

const showToast = ref(false)
</script>

<template>
  <FdsToast
    type="success"
    heading="Succes!"
    message="Din handling er blevet gennemført."
    :visible="showToast"
    @close="showToast = false"
  />
  
  <button @click="showToast = true">Vis besked</button>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | No | Semantic type of the toast notification affecting icon and styling. Controls visual appearance and screen reader announcements |
| `heading` | `string` | `undefined` | No | Main heading text displayed prominently in the toast. Shown in bold text with semantic screen reader prefix |
| `message` | `string` | `''` | No | Detailed message text or fallback content when no slot is provided. Can be used alongside or instead of default slot content |
| `closable` | `boolean` | `true` | No | Whether users can manually dismiss the toast via close button. When false, toast can only be dismissed programmatically or via auto-dismiss |
| `id` | `string` | Auto-generated | No | Unique identifier for the toast element. Auto-generated if not provided for accessibility purposes |
| `autoDismiss` | `number` | `0` | No | Auto-dismiss timeout in milliseconds. Set to 0 to disable automatic dismissal |
| `visible` | `boolean` | `false` | No | Controls toast visibility state. Used with v-model pattern for reactive show/hide behavior |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | `[]` | Emitted when toast is closed either manually via close button or programmatically. Useful for cleaning up state or triggering follow-up actions |
| `click` | `[event: MouseEvent]` | Emitted when the toast content area is clicked (excluding close button). Can be used to implement custom click behaviors or analytics |
| `update:visible` | `[value: boolean]` | Emitted when toast visibility changes for v-model support. Enables reactive two-way binding with parent component state |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Custom content to display in the toast message area. Takes precedence over the `message` prop when provided |

## Toast Types and Visual Styling

Each toast type provides distinct visual styling and appropriate semantic meaning:

### Info Toast
- **Visual**: Blue background with info icon
- **Screen reader**: "Information:" prefix
- **Usage**: General information, updates, tips

### Success Toast
- **Visual**: Green background with checkmark icon
- **Screen reader**: "Succes:" prefix
- **Usage**: Successful operations, completed actions

### Warning Toast
- **Visual**: Yellow/orange background with warning icon
- **Screen reader**: "Advarsel:" prefix
- **Usage**: Important notices, cautions, non-critical issues

### Error Toast
- **Visual**: Red background with error icon
- **Screen reader**: "Fejl:" prefix
- **Usage**: Errors, failures, critical issues requiring attention

## Usage Examples

### Basic Toast Types

```vue
<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const toast = useToast()

// Information toast
const showInfo = () => {
  toast.showInfo('Dit dokument er blevet opdateret.', {
    heading: 'Opdatering'
  })
}

// Success toast
const showSuccess = () => {
  toast.showSuccess('Din ansøgning er blevet indsendt.', {
    heading: 'Ansøgning indsendt'
  })
}

// Warning toast
const showWarning = () => {
  toast.showWarning('Sessionen udløber om 5 minutter.', {
    heading: 'Session advarsel'
  })
}

// Error toast
const showError = () => {
  toast.showError('Kunne ikke uploade filen. Kontroller filformatet.', {
    heading: 'Upload fejl'
  })
}
</script>
```

### Auto-Dismiss Behavior

```vue
<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const toast = useToast()

// Auto-dismiss after 5 seconds
const showAutoToast = () => {
  toast.showToast({
    type: 'success',
    heading: 'Data gemt',
    message: 'Dine ændringer gemmes automatisk.',
    autoDismiss: 5000 // 5 seconds
  })
}

// Permanent toast (no auto-dismiss)
const showPermanentToast = () => {
  toast.showToast({
    type: 'warning',
    heading: 'Vigtigt!',
    message: 'Denne besked forbliver synlig indtil du lukker den.',
    autoDismiss: 0 // Disable auto-dismiss
  })
}
</script>
```

### Interactive Toasts

```vue
<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const toast = useToast()

const showClickableToast = () => {
  toast.showToast({
    type: 'info',
    heading: 'Ny version tilgængelig',
    message: 'Klik her for at genindlæse siden med den seneste version.',
    onClick: () => {
      window.location.reload()
    }
  })
}

const showActionToast = () => {
  toast.showToast({
    type: 'warning',
    heading: 'Ikke-gemte ændringer',
    message: 'Du har ikke-gemte ændringer. Klik for at gemme.',
    onClick: () => {
      // Save logic here
      console.log('Saving changes...')
      toast.showSuccess('Ændringer gemt!')
    }
  })
}
</script>
```

### Component Usage with v-model

```vue
<script setup>
import { ref } from 'vue'

const showSuccessToast = ref(false)
const showErrorToast = ref(false)

const handleSubmit = async () => {
  try {
    // Your submit logic
    showSuccessToast.value = true
  } catch (error) {
    showErrorToast.value = true
  }
}
</script>

<template>
  <!-- Form or other content -->
  <button @click="handleSubmit">Indsend formular</button>
  
  <!-- Toast notifications -->
  <FdsToast
    v-model:visible="showSuccessToast"
    type="success"
    heading="Formular indsendt"
    message="Din formular er blevet sendt til behandling."
    :auto-dismiss="4000"
  />
  
  <FdsToast
    v-model:visible="showErrorToast"
    type="error"
    heading="Indsendelse fejlede"
    message="Der opstod en fejl. Kontroller dine oplysninger og prøv igen."
  />
</template>
```

### Custom Toast Content with Slots

```vue
<script setup>
import { ref } from 'vue'

const showCustomToast = ref(false)
</script>

<template>
  <FdsToast
    v-model:visible="showCustomToast"
    type="info"
    heading="System vedligeholdelse"
  >
    <p>
      Systemet vil være utilgængeligt <strong>i dag kl. 20:00-22:00</strong> 
      på grund af planlagt vedligeholdelse.
    </p>
    <p>
      <a href="/vedligeholdelse" class="function-link">
        Læs mere om vedligeholdelsen
      </a>
    </p>
  </FdsToast>
  
  <button @click="showCustomToast = true">
    Vis vedligeholdelses besked
  </button>
</template>
```

### Toast Management

```vue
<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const toast = useToast()

// Show multiple toasts
const showMultipleToasts = () => {
  toast.showInfo('Første besked')
  toast.showWarning('Anden besked')
  toast.showSuccess('Tredje besked')
}

// Clear all toasts
const clearAllToasts = () => {
  toast.clearAllToasts()
}

// Get active toasts
const activeToasts = computed(() => toast.toasts.value)
</script>

<template>
  <div>
    <button @click="showMultipleToasts">Vis flere toasts</button>
    <button @click="clearAllToasts">Ryd alle toasts</button>
    
    <p>Aktive toasts: {{ activeToasts.length }}</p>
  </div>
</template>
```

## Accessibility Features

The FdsToast component includes comprehensive accessibility support:

### ARIA Support
- **`aria-atomic="true"`**: Ensures screen readers read the entire toast content
- **`aria-live="assertive"`**: Applied to container for immediate announcements
- **`aria-relevant="additions"`**: Focuses on new toast additions
- **Screen reader labels**: Each toast type includes appropriate Danish labels ("Information:", "Succes:", "Advarsel:", "Fejl:")

### Keyboard Navigation
- **Close button**: Fully keyboard accessible
- **Focus management**: Proper focus handling for interactive elements
- **ESC key support**: Close button responds to standard keyboard interaction

### Screen Reader Announcements
```typescript
// Screen reader prefixes in Danish
const typeLabels = {
  info: 'Information',
  success: 'Succes', 
  warning: 'Advarsel',
  error: 'Fejl'
}
```

### WCAG 2.1 AA Compliance
- ✅ **Color contrast**: Meets minimum contrast ratios
- ✅ **Focus indicators**: Clear focus states for interactive elements
- ✅ **Semantic markup**: Proper heading structure and button semantics
- ✅ **Time limits**: Auto-dismiss provides sufficient reading time
- ✅ **User control**: Users can disable auto-dismiss and manually close toasts

## Toast Container Integration

The toast system automatically creates and manages a global toast container:

### Automatic Container Creation
```typescript
// Container is automatically created by useToast()
const container = document.createElement('div')
container.id = 'fds-toast-container'
container.className = 'toast-container'
container.setAttribute('aria-live', 'assertive')

// Positioned strategically in DOM
const main = document.querySelector('main')
if (main) {
  main.insertBefore(container, main.firstChild)
} else {
  document.body.insertBefore(container, document.body.firstChild)
}
```

### Container Configuration
- **Positioning**: Automatically placed as first child of `<main>` or `<body>`
- **ARIA attributes**: Configured for optimal screen reader support
- **Auto-cleanup**: Toasts are automatically removed when dismissed
- **Global state**: Manages multiple toasts across the application

## useToast Composable API

The `useToast()` composable provides the primary interface for toast management:

### Core Methods
```typescript
interface UseToast {
  // Primary methods
  showToast: (options: ToastOptions) => Promise<string>
  removeToast: (id: string) => void
  clearAllToasts: () => void
  
  // Convenience methods
  showInfo: (message: string, options?: Partial<ToastOptions>) => Promise<string>
  showSuccess: (message: string, options?: Partial<ToastOptions>) => Promise<string>
  showWarning: (message: string, options?: Partial<ToastOptions>) => Promise<string>
  showError: (message: string, options?: Partial<ToastOptions>) => Promise<string>
  
  // State
  toasts: Ref<Toast[]>
}
```

### ToastOptions Interface
```typescript
interface ToastOptions {
  type?: 'info' | 'success' | 'warning' | 'error'
  heading?: string
  message: string
  closable?: boolean
  autoDismiss?: number
  onClick?: (event: MouseEvent) => void
}
```

## DKFDS v11 Guidelines

The FdsToast component follows DKFDS v11 specifications:

### Visual Design
- **Toast positioning**: Top of page, centered or right-aligned
- **Animation**: Smooth slide-in/slide-out transitions
- **Icons**: Semantic icons for each toast type
- **Typography**: Consistent with DKFDS text hierarchy

### Behavioral Patterns
- **Stacking**: Multiple toasts stack vertically
- **Timing**: Default auto-dismiss timings follow UX best practices
- **Dismissal**: Clear close mechanism with "Luk" (Close) text
- **Persistence**: Important messages can persist until manually dismissed

### Content Guidelines
- **Headings**: Clear, concise headings in Danish
- **Messages**: Brief, actionable content
- **Language**: Appropriate Danish terminology and tone
- **Context**: Messages should provide clear context and next steps

### Technical Implementation
- **CSS classes**: Uses DKFDS CSS classes (`toast`, `toast-info`, etc.)
- **Behavior scripts**: Integrates with DKFDS JavaScript behaviors
- **Responsive**: Adapts to different screen sizes
- **Performance**: Optimized for minimal DOM impact

## Related Components

- **[FdsAlert](../feedback/fds-alert.md)**: For persistent feedback messages within page content
- **[FdsModal](../feedback/fds-modal.md)**: For blocking user interactions with important messages
- **[FdsFejlopsummering](../feedback/fds-fejlopsummering.md)**: For form validation error summaries
- **[FdsSpinner](../feedback/fds-spinner.md)**: For loading states and process feedback

## Migration from DKFDS JavaScript

If migrating from vanilla DKFDS JavaScript implementation:

```javascript
// Old DKFDS approach
const toast = new DKFDS.Toast(element)
toast.show()

// New Vue approach
import { useToast } from '@madsb/dkfds-vue3'
const { showToast } = useToast()
showToast({ message: 'Your message' })
```

The Vue implementation provides the same functionality with improved TypeScript support, reactive state management, and better integration with Vue applications.