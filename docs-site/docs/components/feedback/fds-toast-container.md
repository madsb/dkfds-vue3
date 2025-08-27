---
title: FdsToastContainer
description: Toast notification container implementing DKFDS v11 toast notification system with ARIA live region support
category: feedback
dkfds: true
accessibility: WCAG 2.1 AA
tags: [toast, notification, container, aria, accessibility, live-region]
---

# FdsToastContainer

Toast container component implementing DKFDS v11 toast notification system. Provides a properly configured ARIA live region for toast notifications with optimal screen reader announcement behavior. Acts as a centralized container for multiple toast instances with appropriate accessibility attributes and positioning.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsToastContainer>
    <FdsToast type="success" heading="Saved" message="Changes saved successfully" />
  </FdsToastContainer>
</template>

<script setup>
import { FdsToastContainer, FdsToast } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | `generateId('toast-container')` | No | Unique identifier for the toast container element. Auto-generated if not provided for accessibility and programmatic management. Useful for targeting specific containers in multi-container applications |

## Events

This component does not emit any events. It serves as a passive container for toast notifications.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Container content area where toast notifications are rendered. Typically contains FdsToast components or other notification elements |

## Usage Examples

### Basic Container Setup

```vue
<template>
  <FdsToastContainer>
    <FdsToast type="success" heading="Saved" message="Changes saved successfully" />
    <FdsToast type="info" heading="Info" message="System maintenance tonight" />
  </FdsToastContainer>
</template>

<script setup>
import { FdsToastContainer, FdsToast } from '@madsb/dkfds-vue3'
</script>
```

### Container with Custom ID for Programmatic Management

```vue
<template>
  <FdsToastContainer id="main-notifications">
    <FdsToast v-for="toast in toasts" :key="toast.id" v-bind="toast" />
  </FdsToastContainer>
</template>

<script setup>
import { ref } from 'vue'
import { FdsToastContainer, FdsToast } from '@madsb/dkfds-vue3'

const toasts = ref([
  { id: '1', type: 'success', heading: 'Upload Complete', message: 'File uploaded successfully' },
  { id: '2', type: 'warning', heading: 'Warning', message: 'Low disk space remaining' }
])
</script>
```

### Multiple Containers for Different Notification Types

```vue
<template>
  <!-- Success notifications in top-right -->
  <FdsToastContainer id="success-toasts">
    <FdsToast type="success" :visible="showSuccessToast" />
  </FdsToastContainer>
  
  <!-- Error notifications in top-left -->
  <FdsToastContainer id="error-toasts">
    <FdsToast type="error" :visible="showErrorToast" />
  </FdsToastContainer>
</template>

<script setup>
import { ref } from 'vue'
import { FdsToastContainer, FdsToast } from '@madsb/dkfds-vue3'

const showSuccessToast = ref(false)
const showErrorToast = ref(false)
</script>
```

### Using with useToast Composable (Recommended)

The most common usage pattern is with the `useToast` composable which automatically creates and manages toast containers:

```vue
<template>
  <div>
    <FdsButton @click="showNotification">Vis besked</FdsButton>
    <FdsButton @click="showError">Vis fejl</FdsButton>
    <FdsButton @click="clearAll">Ryd alle</FdsButton>
    
    <!-- Toast container is automatically created by useToast -->
  </div>
</template>

<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const { showSuccess, showError, clearAllToasts } = useToast()

const showNotification = () => {
  showSuccess('Handlingen blev gennemført successfully!', {
    heading: 'Succes',
    autoDismiss: 5000
  })
}

const showError = () => {
  showError('Der opstod en fejl. Prøv venligst igen.', {
    heading: 'Fejl'
  })
}

const clearAll = () => {
  clearAllToasts()
}
</script>
```

## Toast Positioning and Layout

### Default Positioning

The toast container uses DKFDS standard positioning which places toasts in the optimal location for user attention and accessibility:

```vue
<template>
  <!-- Container automatically positions itself according to DKFDS standards -->
  <FdsToastContainer>
    <FdsToast type="info" message="Positioned according to DKFDS guidelines" />
  </FdsToastContainer>
</template>
```

### Toast Stacking and Queue Management

When multiple toasts are displayed, they stack naturally within the container:

```vue
<template>
  <FdsToastContainer>
    <!-- Toasts stack vertically in the order they appear -->
    <FdsToast type="info" heading="First" message="This appears first" />
    <FdsToast type="success" heading="Second" message="This appears second" />
    <FdsToast type="warning" heading="Third" message="This appears third" />
  </FdsToastContainer>
</template>
```

## Auto-dismiss Behavior and Timing

Toast auto-dismiss behavior is controlled at the individual toast level, not the container:

```vue
<template>
  <FdsToastContainer>
    <!-- Auto-dismiss after 3 seconds -->
    <FdsToast 
      type="info" 
      message="Forsvinder efter 3 sekunder"
      :auto-dismiss="3000"
    />
    
    <!-- Persistent toast (no auto-dismiss) -->
    <FdsToast 
      type="warning" 
      message="Vedvarende besked"
      :auto-dismiss="0"
    />
  </FdsToastContainer>
</template>
```

## Accessibility Features

### ARIA Live Region Configuration

The toast container implements a properly configured ARIA live region for optimal screen reader support:

```html
<div
  id="toast-container-id"
  class="toast-container"
  aria-live="assertive"
  aria-atomic="false" 
  aria-relevant="additions"
>
  <!-- Toast content -->
</div>
```

### Screen Reader Announcements

- **`aria-live="assertive"`**: Ensures toast notifications interrupt screen reader flow for immediate announcement
- **`aria-atomic="false"`**: Announces only new additions, not the entire container content
- **`aria-relevant="additions"`**: Announces when new toast notifications are added to the container

### Keyboard Navigation

While the container itself is not interactive, it properly supports:
- Focus management for toast close buttons
- Keyboard accessibility for interactive toast elements
- Proper tab order within toast notifications

## Integration with useToast Composable

### Automatic Container Management

The `useToast` composable automatically creates and manages toast containers:

```typescript
// The composable creates this container automatically
const containerId = 'fds-toast-container'
const container = document.createElement('div')
container.id = containerId
container.className = 'toast-container'
container.setAttribute('aria-live', 'assertive')
container.setAttribute('aria-atomic', 'false')
container.setAttribute('aria-relevant', 'additions')
```

### Programmatic Toast Management

```vue
<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const { 
  showToast, 
  removeToast, 
  clearAllToasts, 
  showInfo, 
  showSuccess, 
  showWarning, 
  showError,
  toasts 
} = useToast()

// Show different types of toasts
const notifyUser = () => {
  showInfo('Informativ besked til brugeren')
  showSuccess('Handlingen blev gennemført!', { heading: 'Succes!' })
  showWarning('Vær opmærksom på denne information', { heading: 'Advarsel' })
  showError('Der opstod en fejl', { heading: 'Fejl' })
}

// Advanced toast with custom options
const showAdvancedToast = () => {
  const toastId = showToast({
    type: 'info',
    heading: 'Avanceret besked',
    message: 'Denne besked har brugerdefinerede indstillinger',
    autoDismiss: 10000,
    closable: true,
    onClick: (event) => {
      console.log('Toast klikket!', event)
    }
  })
  
  // Remove specific toast after 5 seconds
  setTimeout(() => {
    removeToast(toastId)
  }, 5000)
}
</script>
```

## Toast Types and Visual Variants

The container supports all DKFDS toast types through individual toast components:

```vue
<template>
  <FdsToastContainer>
    <!-- Info toast - Blue theme -->
    <FdsToast 
      type="info" 
      heading="Information" 
      message="Generel information til brugeren"
    />
    
    <!-- Success toast - Green theme -->
    <FdsToast 
      type="success" 
      heading="Succes" 
      message="Handlingen blev gennemført successfully"
    />
    
    <!-- Warning toast - Yellow/Orange theme -->
    <FdsToast 
      type="warning" 
      heading="Advarsel" 
      message="Vær opmærksom på denne vigtige information"
    />
    
    <!-- Error toast - Red theme -->
    <FdsToast 
      type="error" 
      heading="Fejl" 
      message="Der opstod en fejl. Prøv venligst igen"
    />
  </FdsToastContainer>
</template>
```

## DKFDS Guidelines

### DKFDS v11 Toast Notification Specifications

The toast container follows DKFDS v11 specifications for:

1. **Accessibility Standards**: Full WCAG 2.1 AA compliance with proper ARIA attributes
2. **Visual Design**: Integration with DKFDS design tokens and spacing
3. **Interaction Patterns**: Consistent behavior with other DKFDS notification components
4. **Responsive Design**: Proper positioning and sizing across device breakpoints

### UX Patterns and Best Practices

**When to Use Toast Containers:**
- ✅ Temporary status updates (save confirmation, upload progress)
- ✅ Non-critical system notifications 
- ✅ Success feedback for user actions
- ✅ Warning messages that don't require immediate action

**When NOT to Use:**
- ❌ Critical error messages requiring immediate attention (use modal instead)
- ❌ Forms validation errors (use inline validation)
- ❌ Permanent status information (use alerts or other persistent components)
- ❌ Complex interactive content (use modal or dedicated page)

### Danish Government Context

Toast notifications should use appropriate Danish language and tone:

```vue
<template>
  <FdsToastContainer>
    <!-- Professional, clear Danish language -->
    <FdsToast 
      type="success" 
      heading="Ansøgning indsendt"
      message="Deres ansøgning er modtaget og vil blive behandlet inden for 5 arbejdsdage."
    />
    
    <!-- Government service notification -->
    <FdsToast 
      type="info" 
      heading="Systemvedligeholdelse" 
      message="Borger.dk vil være utilgængeligt i dag kl. 22:00-24:00"
    />
  </FdsToastContainer>
</template>
```

## Related Components

- **[FdsToast](./fds-toast.md)** - Individual toast notification component
- **[FdsAlert](./fds-alert.md)** - Persistent alert notifications
- **[FdsModal](./fds-modal.md)** - Modal dialogs for critical messages
- **[FdsFejlopsummering](./fds-fejlopsummering.md)** - Form error summary component

## TypeScript Support

```typescript
import type { FdsToastContainerProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsToastContainerProps {
  id?: string
}

// Usage in TypeScript component
const props = defineProps<FdsToastContainerProps>()
```

<!-- Verified against source -->