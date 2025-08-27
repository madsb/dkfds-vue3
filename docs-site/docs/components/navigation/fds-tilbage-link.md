---
title: FdsTilbageLink
description: Back link component implementing DKFDS v11 specifications for consistent back navigation in multi-step processes and connected page sequences
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, back-link, tilbage, multi-step, process, accessibility, dkfds]
---

# FdsTilbageLink

Back link component implementing DKFDS v11 tilbage-link specifications. Provides a consistent back navigation pattern for multi-step processes and connected page sequences. Features a chevron icon and customizable text. Should be positioned at the top left, immediately under the header. Do not use together with breadcrumbs as they serve similar purposes.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsTilbageLink @click="goBack">
    Tilbage til oversigt
  </FdsTilbageLink>
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'

const goBack = () => {
  // Custom back navigation logic
  history.back()
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `href` | `string` | `'javascript:void(0);'` | ❌ | Link destination URL. By default uses javascript:void(0); to prevent navigation, allowing the click handler to control the back navigation behavior |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `(event: MouseEvent)` | Emitted when the back link is clicked. Use this to implement custom back navigation logic, such as router.go(-1), programmatic navigation, or state management |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| default | - | Custom text content for the back link. Default text is "Tilbage" if no slot content is provided |

## Usage Examples

### Basic Back Link with Default Text

```vue
<template>
  <FdsTilbageLink @click="handleBack" />
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'

const handleBack = () => {
  // Simple browser back navigation
  window.history.back()
}
</script>
```

### Custom Back Link Text

```vue
<template>
  <FdsTilbageLink @click="goBack">
    Tilbage til oversigt
  </FdsTilbageLink>
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'

const goBack = () => {
  console.log('Navigating back to overview')
  window.history.back()
}
</script>
```

### Vue Router Integration

```vue
<template>
  <FdsTilbageLink @click="$router.go(-1)">
    Tilbage
  </FdsTilbageLink>
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'
</script>
```

### Programmatic Navigation with Custom Href

```vue
<template>
  <FdsTilbageLink 
    href="/previous-step" 
    @click="handleBackNavigation"
  >
    Tilbage til forrige trin
  </FdsTilbageLink>
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBackNavigation = (event: MouseEvent) => {
  // Prevent default link navigation
  event.preventDefault()
  
  // Custom navigation logic
  router.push('/previous-step')
}
</script>
```

### Multi-Step Process Navigation

```vue
<template>
  <div class="step-container">
    <!-- Step 2 of 3 -->
    <FdsTilbageLink @click="goToPreviousStep">
      Tilbage til trin 1
    </FdsTilbageLink>
    
    <h1>Trin 2: Personlige oplysninger</h1>
    
    <!-- Form content -->
    <form @submit="proceedToNextStep">
      <!-- Form fields -->
    </form>
  </div>
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPreviousStep = () => {
  // Navigate to previous step with form data preservation
  router.push({ 
    name: 'application-step-1',
    query: { from: 'step-2' }
  })
}

const proceedToNextStep = () => {
  // Handle form submission and navigate to next step
  router.push({ name: 'application-step-3' })
}
</script>
```

### State Management Integration

```vue
<template>
  <FdsTilbageLink @click="undoLastAction">
    Fortryd sidste handling
  </FdsTilbageLink>
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'
import { useStore } from '@/stores/application'

const store = useStore()

const undoLastAction = () => {
  // Undo the last action in the application state
  store.undoLastAction()
  
  // Optional: Navigate to previous page
  window.history.back()
}
</script>
```

### Conditional Back Navigation

```vue
<template>
  <FdsTilbageLink 
    v-if="canGoBack" 
    @click="handleConditionalBack"
  >
    {{ backLinkText }}
  </FdsTilbageLink>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { FdsTilbageLink } from '@madsb/dkfds-vue3'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentStep = ref(2)

const canGoBack = computed(() => {
  return currentStep.value > 1 && route.meta?.allowBack !== false
})

const backLinkText = computed(() => {
  switch (currentStep.value) {
    case 2:
      return 'Tilbage til grundlæggende oplysninger'
    case 3:
      return 'Tilbage til kontaktoplysninger'
    default:
      return 'Tilbage'
  }
})

const handleConditionalBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    router.go(-1)
  }
}
</script>
```

### Danish Government Service Context

```vue
<template>
  <div class="service-page">
    <!-- Navigation for a Danish government service -->
    <FdsTilbageLink @click="returnToServiceOverview">
      Tilbage til tjenesteoversigt
    </FdsTilbageLink>
    
    <h1>Ansøgning om byggetilladelse</h1>
    
    <p>Udfyld formularen for at ansøge om byggetilladelse...</p>
    
    <!-- Service form content -->
  </div>
</template>

<script setup lang="ts">
import { FdsTilbageLink } from '@madsb/dkfds-vue3'
import { useRouter } from 'vue-router'

const router = useRouter()

const returnToServiceOverview = () => {
  // Track analytics for service navigation
  analyticsService.track('back_to_services', {
    service: 'building-permit',
    step: 'form'
  })
  
  // Navigate back to service overview
  router.push({ name: 'services-overview' })
}
</script>
```

## TypeScript Interfaces

### FdsTilbageLinkProps

```typescript
export interface FdsTilbageLinkProps {
  /** 
   * Link destination URL
   * By default uses javascript:void(0); to prevent navigation, allowing
   * the click handler to control the back navigation behavior.
   * @default 'javascript:void(0);'
   */
  href?: string
}
```

## Accessibility

The FdsTilbageLink component is designed with accessibility as a core principle:

### WCAG 2.1 AA Compliance

- **Focus Management**: Clear focus indicators on keyboard navigation
- **Semantic Markup**: Uses proper anchor element with meaningful content
- **Visual Indicators**: Chevron icon provides visual context for back navigation
- **Screen Reader Support**: Descriptive link text announces navigation purpose
- **Keyboard Navigation**: Full keyboard support with Enter and Space key activation

### Screen Reader Support

- **Link Purpose**: Screen readers announce the link purpose and destination
- **Icon Context**: Chevron icon is marked as decorative to avoid redundant announcements
- **Custom Text**: Slot content provides context-specific navigation descriptions

### Keyboard Navigation

- **Tab Order**: Natural tab order for keyboard-only users
- **Activation**: Standard Enter and Space key activation
- **Focus Indicators**: Browser-native focus styling with DKFDS enhancements

## DKFDS Guidelines

This component implements the official [DKFDS Back Link](https://designsystem.dk/komponenter/tilbage-link/) specifications:

### Design Standards

- **Icon Integration**: Uses chevron-left icon from FdsIkon component
- **Typography**: Follows DKFDS link styling and color schemes
- **Spacing**: Implements standard DKFDS spacing tokens
- **Positioning**: Designed for top-left placement under headers

### Behavioral Requirements

- **Consistent Placement**: Should appear at top left, immediately under header
- **Exclusive Usage**: Do not use together with breadcrumbs as they serve similar purposes
- **Multi-Step Context**: Ideal for step-by-step processes and connected page sequences
- **Click Handler Control**: JavaScript navigation instead of direct href navigation

### Theme Compatibility

- **VirkDK**: Full support for business/organization theme
- **BorgerDK**: Full support for citizen-facing theme
- **Custom Themes**: Compatible with DKFDS design token customization

## Related Components

- **FdsBreadcrumb** - Hierarchical navigation (use instead of tilbage-link for complex paths)
- **FdsNavLink** - Individual navigation links with active state support
- **FdsFaneblade** - Tab navigation for content switching
- **FdsMenu** - Primary navigation component for main site navigation
- **FdsPaginering** - Page navigation for content pagination

## Technical Notes

### Navigation Patterns

The component is designed to work with various navigation patterns:

- **Browser History**: Use `window.history.back()` for simple back navigation
- **Vue Router**: Use `$router.go(-1)` or `$router.push()` for programmatic navigation
- **State Management**: Integrate with Vuex/Pinia for complex application state
- **Custom Logic**: Implement custom back navigation with form validation or analytics

### Performance Considerations

- **Tree Shakeable**: Only imports required dependencies (FdsIkon)
- **Minimal Bundle**: Small footprint with no external dependencies
- **Efficient Rendering**: Simple template structure with minimal overhead

### Browser Compatibility

- **Modern Browsers**: Full support for all modern browsers
- **IE11**: Compatible with DKFDS IE11 support requirements
- **Mobile**: Touch-friendly with proper tap targets

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/navigation/fds-tilbage-link.vue -->