---
title: FdsSpinner
description: Loading spinner component implementing DKFDS v11 loading indicator specifications with accessibility support and multiple size variants
category: feedback
dkfds: true
accessibility: WCAG 2.1 AA
tags: [loading, spinner, indicator, accessibility, feedback, status]
---

# FdsSpinner

Loading spinner component implementing DKFDS v11 loading indicator specifications. Provides visual feedback for loading states with accessibility support and multiple size variants. Includes proper ARIA live regions for screen readers and supports both standalone spinners and spinners with accompanying status text. Designed for various contexts from buttons to full-page loading.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsSpinner } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsSpinner sr-only-text="Loading content..." />
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'small' \| 'large'` | `'large'` | No | Size variant of the spinner affecting visual dimensions. Small spinners work well inline or in buttons, large for prominent loading states |
| `variant` | `'default' \| 'light'` | `'default'` | No | Color variant optimized for different background contexts. Use 'light' variant on dark backgrounds for better visibility |
| `srOnlyText` | `string` | `undefined` | No | Screen reader only text for accessibility when no visible status text is provided. Essential for users with screen readers to understand loading context. Only used when no slot content is present |
| `centered` | `boolean` | `false` | No | Whether to center the spinner horizontally in its container. Useful for full-width loading states or modal dialogs |
| `ariaLive` | `'polite' \| 'assertive' \| 'off'` | `'polite'` | No | ARIA live region politeness setting for status text announcements. 'assertive' interrupts screen reader, 'polite' waits for pause |

## Events

This component does not emit any events.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | - | Status text content displayed alongside the spinner. When used, creates a proper ARIA live region with role="status" for screen reader announcements |

## Usage Examples

### Basic Loading Spinner

```vue
<template>
  <FdsSpinner sr-only-text="Indlæser indhold..." />
</template>
```

### Small Spinner for Inline Use

```vue
<template>
  <div class="d-flex align-items-center">
    <span>Processing</span>
    <FdsSpinner size="small" sr-only-text="Behandler anmodning" class="ml-2" />
  </div>
</template>
```

### Spinner with Visible Status Text

```vue
<template>
  <FdsSpinner>Arbejder...</FdsSpinner>
</template>
```

### Centered Loading for Full-Page States

```vue
<template>
  <div class="container-fluid" style="min-height: 50vh">
    <FdsSpinner 
      size="large" 
      :centered="true"
      aria-live="assertive"
    >
      Indlæser applikationsdata, vent venligst...
    </FdsSpinner>
  </div>
</template>
```

### Light Variant for Dark Backgrounds

```vue
<template>
  <div class="bg-primary-dark p-4">
    <FdsSpinner 
      variant="light" 
      sr-only-text="Indlæser på mørk baggrund..."
    />
  </div>
</template>
```

### Spinner in Button Context

```vue
<template>
  <FdsButton 
    :disabled="isProcessing" 
    variant="primary"
    @click="handleSubmit"
  >
    <span v-if="!isProcessing">Gem ændringer</span>
    <FdsSpinner v-else size="small" variant="light">
      Gemmer...
    </FdsSpinner>
  </FdsButton>
</template>

<script setup>
import { ref } from 'vue'

const isProcessing = ref(false)

const handleSubmit = async () => {
  isProcessing.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
  } finally {
    isProcessing.value = false
  }
}
</script>
```

### Search Field with Loading Indicator

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="search-field">Søg i dokumenter</FdsLabel>
    <div class="d-flex align-items-center">
      <FdsInput 
        id="search-field" 
        v-model="searchQuery" 
        placeholder="Indtast søgeord..."
        @input="handleSearch"
      />
      <FdsSpinner 
        v-if="isSearching" 
        size="small" 
        class="ml-3"
        aria-live="polite"
      >
        Søger...
      </FdsSpinner>
    </div>
  </FdsFormgroup>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const isSearching = ref(false)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  isSearching.value = true
  try {
    // Simulate search API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  } finally {
    isSearching.value = false
  }
}
</script>
```

### Form Submission with Loading States

```vue
<template>
  <form @submit.prevent="submitApplication">
    <FdsFormgroup>
      <FdsLabel for="applicant-name">Ansøgers navn *</FdsLabel>
      <FdsInput 
        id="applicant-name" 
        v-model="application.name" 
        required 
      />
    </FdsFormgroup>

    <FdsFormgroup>
      <FdsLabel for="applicant-cpr">CPR-nummer *</FdsLabel>
      <FdsInput 
        id="applicant-cpr" 
        v-model="application.cpr" 
        placeholder="DDMMÅÅ-XXXX"
        required 
      />
    </FdsFormgroup>

    <div class="form-actions">
      <FdsButton 
        type="submit" 
        variant="primary"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Indsend ansøgning</span>
        <FdsSpinner v-else size="small" variant="light">
          Indsender ansøgning...
        </FdsSpinner>
      </FdsButton>
    </div>

    <!-- Full-page overlay spinner for critical operations -->
    <div 
      v-if="isSubmitting" 
      class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style="background: rgba(0,0,0,0.5); z-index: 1050"
    >
      <div class="bg-white p-4 rounded">
        <FdsSpinner 
          size="large"
          aria-live="assertive"
          :centered="true"
        >
          Behandler din ansøgning. Dette kan tage et øjeblik...
        </FdsSpinner>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const application = reactive({
  name: '',
  cpr: ''
})

const isSubmitting = ref(false)

const submitApplication = async () => {
  isSubmitting.value = true
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 3000))
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    isSubmitting.value = false
  }
}
</script>
```

### Accessibility-Focused Loading States

```vue
<template>
  <div class="loading-examples">
    <!-- Polite announcement - doesn't interrupt -->
    <div class="mb-4">
      <h4>Standard indlæsning</h4>
      <FdsSpinner aria-live="polite">
        Henter brugerdata...
      </FdsSpinner>
    </div>

    <!-- Assertive announcement - interrupts screen reader -->
    <div class="mb-4">
      <h4>Kritisk handling</h4>
      <FdsSpinner 
        aria-live="assertive"
        size="large"
      >
        Sletter permanent data. Vent venligst...
      </FdsSpinner>
    </div>

    <!-- Silent spinner with screen reader text -->
    <div class="mb-4">
      <h4>Tavs spinner med skærmlæser tekst</h4>
      <FdsSpinner 
        aria-live="off"
        sr-only-text="Baggrunds opdatering i gang"
      />
    </div>
  </div>
</template>
```

### Performance-Optimized Data Loading

```vue
<template>
  <div class="data-table-container">
    <!-- Loading state for initial data fetch -->
    <FdsSpinner 
      v-if="isInitialLoading"
      size="large"
      :centered="true"
      aria-live="assertive"
    >
      Indlæser tabeldata...
    </FdsSpinner>

    <!-- Data table with inline loading for updates -->
    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3>Dokument oversigt</h3>
        <FdsSpinner 
          v-if="isRefreshing" 
          size="small"
          aria-live="polite"
        >
          Opdaterer...
        </FdsSpinner>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>Dokument</th>
            <th>Status</th>
            <th>Dato</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tableData = ref([])
const isInitialLoading = ref(true)
const isRefreshing = ref(false)

onMounted(async () => {
  try {
    // Load initial data
    await loadTableData()
  } finally {
    isInitialLoading.value = false
  }
})

const loadTableData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  tableData.value = [
    { id: 1, name: 'Ansøgning.pdf', status: 'Approved', date: '2024-01-15' },
    { id: 2, name: 'Bilag.pdf', status: 'Pending', date: '2024-01-16' }
  ]
}

// Refresh data without full reload
setInterval(async () => {
  isRefreshing.value = true
  try {
    await loadTableData()
  } finally {
    isRefreshing.value = false
  }
}, 30000) // Refresh every 30 seconds
</script>
```

## Accessibility

### WCAG 2.1 AA Compliance Features

1. **Screen Reader Support**
   - Automatic `aria-hidden="true"` on spinner when status text is present
   - Proper `role="status"` on status text containers
   - Screen reader only text via `sr-only-text` prop when no visible text
   - ARIA live regions for dynamic loading state announcements

2. **Live Region Management**
   - `aria-live="polite"` (default) waits for screen reader pause
   - `aria-live="assertive"` interrupts for critical operations
   - `aria-live="off"` for silent background loading
   - Status text automatically announced when it changes

3. **Focus Management**
   - Spinner doesn't interfere with keyboard navigation
   - Loading states don't trap focus
   - Status updates don't move focus unexpectedly

4. **Visual Accessibility**
   - High contrast spinner animation
   - Light variant for dark backgrounds ensures visibility
   - Animation respects `prefers-reduced-motion` preferences
   - Visual loading indicator doesn't rely on color alone

### Screen Reader Announcements

The component provides three patterns for screen reader accessibility:

```vue
<template>
  <!-- Pattern 1: Hidden spinner with screen reader text -->
  <FdsSpinner sr-only-text="Loading application data" />
  <!-- Screen reader hears: "Loading application data" -->

  <!-- Pattern 2: Visible status with aria-live region -->
  <FdsSpinner aria-live="polite">Saving changes...</FdsSpinner>
  <!-- Screen reader hears: "Saving changes..." when text appears -->

  <!-- Pattern 3: Critical operations with assertive announcements -->
  <FdsSpinner aria-live="assertive">Deleting account data...</FdsSpinner>
  <!-- Screen reader immediately hears: "Deleting account data..." -->
</template>
```

### Loading State Best Practices

1. **Provide Context**: Always explain what is loading
2. **Use Appropriate Politeness**: `polite` for regular operations, `assertive` for critical actions
3. **Manage Focus**: Don't move focus during loading unless necessary
4. **Progressive Enhancement**: Ensure basic functionality works without JavaScript
5. **Timeout Handling**: Provide error states for failed loading operations

## DKFDS Guidelines

### Loading Indicator Specifications

The component follows DKFDS v11 specifications for loading indicators:

1. **Visual Design**: Circular spinner animation with consistent timing
2. **Size Variants**: Small (24px) for inline use, Large (48px) for prominent states
3. **Color Variants**: Default (primary) and light for dark backgrounds
4. **Animation**: Smooth 1-second rotation with CSS animations
5. **Accessibility**: Proper ARIA support and reduced motion respect

### Danish Loading Context Examples

```vue
<template>
  <!-- Government service loading -->
  <FdsSpinner aria-live="polite">
    Behandler din ansøgning til Borger.dk...
  </FdsSpinner>

  <!-- Document processing -->
  <FdsSpinner size="large" :centered="true">
    Analyserer uploadede dokumenter...
  </FdsSpinner>

  <!-- Data validation -->
  <FdsSpinner size="small">
    Validerer CPR-nummer...
  </FdsSpinner>

  <!-- System integration -->
  <FdsSpinner aria-live="assertive">
    Kommunikerer med offentlige registre...
  </FdsSpinner>
</template>
```

### Integration with DKFDS Components

The spinner integrates seamlessly with other DKFDS components:

- **Buttons**: Use small light variant in primary buttons
- **Forms**: Show loading during validation or submission
- **Modals**: Center large spinner for modal loading states
- **Tables**: Small spinner for row-level operations
- **Navigation**: Inline spinner during page transitions

## Performance Considerations

### Efficient Loading Patterns

1. **Lazy Loading**: Only show spinner after delay to avoid flashing
2. **Minimum Display Time**: Keep spinner visible for minimum duration for perceived performance
3. **Progressive Loading**: Show partial content with inline spinners for updates
4. **Debounced Operations**: Avoid showing spinner for very quick operations

```vue
<template>
  <div>
    <!-- Delayed spinner appearance -->
    <FdsSpinner 
      v-if="showSpinner" 
      size="small"
    >
      Søger...
    </FdsSpinner>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const isLoading = ref(false)
const showSpinner = ref(false)
let spinnerTimeout = null

watch(isLoading, (loading) => {
  if (loading) {
    // Show spinner after 200ms to avoid flashing
    spinnerTimeout = setTimeout(() => {
      showSpinner.value = true
    }, 200)
  } else {
    // Clear timeout and hide spinner
    clearTimeout(spinnerTimeout)
    // Keep visible for minimum 500ms if it was shown
    if (showSpinner.value) {
      setTimeout(() => {
        showSpinner.value = false
      }, 500)
    } else {
      showSpinner.value = false
    }
  }
})
</script>
```

### Animation Performance

The spinner uses CSS animations for optimal performance:
- Hardware accelerated transforms
- Respects `prefers-reduced-motion`
- Minimal reflows and repaints
- Efficient rendering on low-end devices

## TypeScript Interfaces

```typescript
export interface FdsSpinnerProps {
  /**
   * Size variant of the spinner affecting visual dimensions
   * Small spinners work well inline or in buttons, large for prominent loading states
   * @values 'small', 'large'
   * @default 'large'
   */
  size?: 'small' | 'large'

  /**
   * Color variant optimized for different background contexts
   * Use 'light' variant on dark backgrounds for better visibility
   * @values 'default', 'light'
   * @default 'default'
   */
  variant?: 'default' | 'light'

  /**
   * Screen reader only text for accessibility when no visible status text is provided
   * Essential for users with screen readers to understand loading context
   * Only used when no slot content is present
   */
  srOnlyText?: string

  /**
   * Whether to center the spinner horizontally in its container
   * Useful for full-width loading states or modal dialogs
   * @default false
   */
  centered?: boolean

  /**
   * ARIA live region politeness setting for status text announcements
   * 'assertive' interrupts screen reader, 'polite' waits for pause
   * @values 'polite', 'assertive', 'off'
   * @default 'polite'
   */
  ariaLive?: 'polite' | 'assertive' | 'off'
}

// Component slots
export interface FdsSpinnerSlots {
  /**
   * Status text content displayed alongside the spinner
   * Creates proper ARIA live region with role="status" for screen reader announcements
   */
  default?: () => any
}
```

## Related Components

- [FdsAlert](/components/feedback/fds-alert) - Alert component for status messages
- [FdsButton](/components/input/fds-button) - Button component that can contain loading spinners
- [FdsModal](/components/feedback/fds-modal) - Modal component for full-screen loading overlays
- [FdsToast](/components/feedback/fds-toast) - Toast notification component for loading confirmations

<!-- Verified against source -->