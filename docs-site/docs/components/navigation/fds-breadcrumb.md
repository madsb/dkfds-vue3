---
title: FdsBreadcrumb
description: Breadcrumb navigation component implementing DKFDS v11 specifications with hierarchical navigation support, Vue Router integration, and accessibility features
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, breadcrumb, hierarchical, router, accessibility, dkfds]
---

# FdsBreadcrumb

Breadcrumb navigation component implementing DKFDS v11 specifications. Provides hierarchical navigation with support for Vue Router integration, automatic current page detection, and accessibility features. Follows DKFDS breadcrumb design patterns with separator icons and responsive behavior.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsBreadcrumb :items="breadcrumbItems" />
</template>

<script setup lang="ts">
import { FdsBreadcrumb } from '@madsb/dkfds-vue3'
import type { BreadcrumbItem } from '@madsb/dkfds-vue3'

const breadcrumbItems: BreadcrumbItem[] = [
  { text: 'Forside', href: '/' },
  { text: 'Virksomhed', href: '/virksomhed' },
  { text: 'Registrering' } // Current page (no href)
]
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `BreadcrumbItem[]` | - | ✅ | Array of breadcrumb items representing the navigation hierarchy. The last item is automatically treated as the current page and not linked |
| `ariaLabel` | `string` | `'Brødkrumme'` | ❌ | ARIA label for the navigation element. Provides accessibility context for screen readers |
| `container` | `boolean` | `false` | ❌ | Whether to add container class for layout. Applies standard DKFDS container styling for proper page layout |
| `useNativeLinks` | `boolean` | `false` | ❌ | Force use of standard anchor tags even if Vue Router is available. Disables automatic Vue Router integration for this component instance |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `item-click` | `(event: MouseEvent, item: BreadcrumbItem, index: number)` | Emitted when a breadcrumb item is clicked. Fired before navigation occurs, allowing for custom handling or analytics tracking |

## Slots

This component does not provide any slots.

## Usage Examples

### Basic Breadcrumb with Native Links

```vue
<template>
  <FdsBreadcrumb 
    :items="basicItems" 
    aria-label="Navigationssti"
  />
</template>

<script setup lang="ts">
import { FdsBreadcrumb } from '@madsb/dkfds-vue3'
import type { BreadcrumbItem } from '@madsb/dkfds-vue3'

const basicItems: BreadcrumbItem[] = [
  { text: 'Forside', href: '/' },
  { text: 'Tjenester', href: '/tjenester' },
  { text: 'Ansøgninger', href: '/tjenester/ansogninger' },
  { text: 'Ny ansøgning' } // Current page
]
</script>
```

### Vue Router Integration

```vue
<template>
  <FdsBreadcrumb 
    :items="routerItems"
    :container="true"
    @item-click="handleBreadcrumbClick"
  />
</template>

<script setup lang="ts">
import { FdsBreadcrumb } from '@madsb/dkfds-vue3'
import type { BreadcrumbItem } from '@madsb/dkfds-vue3'

const routerItems: BreadcrumbItem[] = [
  { text: 'Hjem', to: { name: 'home' } },
  { text: 'Profil', to: '/profil' },
  { text: 'Indstillinger', to: { name: 'settings' } },
  { text: 'Sikkerhed' } // Current page
]

const handleBreadcrumbClick = (event: MouseEvent, item: BreadcrumbItem, index: number) => {
  console.log('Breadcrumb clicked:', { item, index })
  // Custom analytics or handling logic
}
</script>
```

### Mixed Link Types with External Links

```vue
<template>
  <FdsBreadcrumb 
    :items="mixedItems"
    aria-label="Mixed navigation path"
  />
</template>

<script setup lang="ts">
import { FdsBreadcrumb } from '@madsb/dkfds-vue3'
import type { BreadcrumbItem } from '@madsb/dkfds-vue3'

const mixedItems: BreadcrumbItem[] = [
  { text: 'Forside', to: '/' },
  { 
    text: 'Eksterne ressourcer', 
    href: 'https://www.borger.dk', 
    external: true 
  },
  { text: 'Dokumentation', href: '/docs' },
  { text: 'API Guide' } // Current page
]
</script>
```

### With Custom Data and Event Handling

```vue
<template>
  <FdsBreadcrumb 
    :items="dataItems"
    @item-click="trackNavigation"
  />
</template>

<script setup lang="ts">
import { FdsBreadcrumb } from '@madsb/dkfds-vue3'
import type { BreadcrumbItem } from '@madsb/dkfds-vue3'

const dataItems: BreadcrumbItem[] = [
  { 
    text: 'Dashboard', 
    to: '/dashboard',
    data: { trackingId: 'nav-dashboard' }
  },
  { 
    text: 'Rapporter', 
    to: '/rapporter',
    data: { trackingId: 'nav-reports' }
  },
  { 
    text: 'Månedlig rapport',
    data: { trackingId: 'nav-monthly-report' }
  }
]

const trackNavigation = (event: MouseEvent, item: BreadcrumbItem, index: number) => {
  if (item.data?.trackingId) {
    // Send analytics event
    analytics.track('breadcrumb_click', {
      tracking_id: item.data.trackingId,
      position: index,
      text: item.text
    })
  }
}
</script>
```

### Force Native Links

```vue
<template>
  <!-- Even with Vue Router available, use standard anchor tags -->
  <FdsBreadcrumb 
    :items="nativeItems"
    :use-native-links="true"
  />
</template>

<script setup lang="ts">
import { FdsBreadcrumb } from '@madsb/dkfds-vue3'
import type { BreadcrumbItem } from '@madsb/dkfds-vue3'

const nativeItems: BreadcrumbItem[] = [
  { text: 'Start', href: '/' },
  { text: 'Kategori', href: '/kategori' },
  { text: 'Nuværende side' }
]
</script>
```

## TypeScript Interfaces

### BreadcrumbItem

```typescript
export interface BreadcrumbItem {
  /** 
   * Text to display for the breadcrumb item
   * The visible text content that users will see in the breadcrumb path
   */
  text: string
  /** 
   * URL for the breadcrumb link (optional for current page)
   * Standard HTTP/HTTPS URL. Not required for the current page (last item)
   */
  href?: string
  /** 
   * Router location object for Vue Router navigation
   * Can be a string path or router location object with name, params, query, etc.
   * @example '/home' or { name: 'user', params: { id: '123' } }
   */
  to?: string | Record<string, any>
  /** 
   * Whether this is an external link (forces standard anchor tag)
   * Set to true to force usage of <a> tag instead of <router-link>
   * @default false
   */
  external?: boolean
  /** 
   * Custom data associated with the item
   * Additional metadata that can be accessed in click handlers
   */
  data?: any
}
```

### FdsBreadcrumbProps

```typescript
export interface FdsBreadcrumbProps {
  /** 
   * Array of breadcrumb items representing the navigation hierarchy
   * The last item is automatically treated as the current page and not linked
   */
  items: BreadcrumbItem[]
  /** 
   * ARIA label for the navigation element
   * Provides accessibility context for screen readers
   * @default 'Brødkrumme'
   */
  ariaLabel?: string
  /** 
   * Whether to add container class for layout
   * Applies standard DKFDS container styling for proper page layout
   * @default false
   */
  container?: boolean
  /** 
   * Force use of standard anchor tags even if Vue Router is available
   * Disables automatic Vue Router integration for this component instance
   * @default false
   */
  useNativeLinks?: boolean
}
```

## Accessibility

The FdsBreadcrumb component is designed with accessibility as a core principle:

### WCAG 2.1 AA Compliance

- **Navigation Landmark**: Uses `<nav>` element with `aria-label` for screen reader identification
- **Current Page Indication**: Automatically adds `aria-current="page"` to the last item
- **Semantic Structure**: Uses proper `<ol>` and `<li>` elements for hierarchical navigation
- **Descriptive Text**: All links have descriptive text content
- **Keyboard Navigation**: Full keyboard support through native link elements

### Screen Reader Support

- **Role Definition**: Navigation role is implicit with `<nav>` element
- **Current Location**: Screen readers announce the current page with `aria-current`
- **Hierarchy Understanding**: Ordered list structure provides navigation hierarchy context
- **Custom Labels**: Configurable `aria-label` for localization support

### Keyboard Navigation

- **Tab Order**: Natural tab order through breadcrumb links
- **Enter/Space**: Activate links using standard keyboard shortcuts
- **Focus Indicators**: Browser-native focus indicators on all interactive elements

## DKFDS Guidelines

This component implements the official [DKFDS Breadcrumb](https://designsystem.dk/komponenter/breadcrumb/) specifications:

### Design Standards

- **Separator Icons**: Uses chevron-right icons between breadcrumb items
- **Typography**: Follows DKFDS text styling and color schemes
- **Spacing**: Implements standard DKFDS spacing tokens
- **Responsive**: Adapts to mobile and desktop viewports

### Behavioral Requirements

- **Current Page**: Last item is not linked and marked as current page
- **Link Styling**: Standard DKFDS link appearance and hover states  
- **Container Support**: Optional container class for page layout integration
- **Icon Integration**: Uses FdsIkon component for consistent iconography

### Theme Compatibility

- **VirkDK**: Full support for business/organization theme
- **BorgerDK**: Full support for citizen-facing theme
- **Custom Themes**: Compatible with DKFDS design token customization

## Related Components

- **FdsMenu** - Primary navigation component for main site navigation
- **FdsNavLink** - Individual navigation links with active state support
- **FdsFaneblade** - Tab navigation for content switching
- **FdsPaginering** - Page navigation for content pagination
- **FdsTrinindikatorGroup** - Step indicators for multi-step processes

## Technical Notes

### Vue Router Integration

The component automatically detects Vue Router availability and uses `<router-link>` components when available. Falls back to standard anchor tags when:

- Vue Router is not installed
- `useNativeLinks` prop is set to `true`
- Individual items have `external: true` property

### Performance Considerations

- **Tree Shakeable**: Only imports required dependencies
- **Minimal Bundle**: Small footprint with no external dependencies
- **Efficient Rendering**: Uses Vue's efficient list rendering with proper keys

### Browser Compatibility

- **Modern Browsers**: Full support for all modern browsers
- **IE11**: Compatible with DKFDS IE11 support requirements
- **Mobile**: Responsive design works on all mobile devices

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/navigation/fds-breadcrumb.vue -->