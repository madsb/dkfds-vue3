---
title: FdsFanebladeNav
description: Tab navigation container implementing DKFDS v11 navigation specifications for semantic tab-based interfaces
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, tabs, faneblade, links, accessible]
---

# FdsFanebladeNav

Tab navigation container component implementing DKFDS v11 tab navigation specifications. Provides semantic navigation structure for tab-based interfaces using the navigation pattern rather than tabpanel/tab pattern. This is the preferred approach for navigation-style tabs that link to different pages or sections.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsFanebladeNav } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <fds-faneblade-nav aria-label="Main navigation">
    <fds-faneblade-nav-item 
      href="/profile" 
      label="Profile" 
      :active="$route.path === '/profile'"
    />
    <fds-faneblade-nav-item 
      href="/settings" 
      label="Settings" 
      :active="$route.path === '/settings'"
    />
  </fds-faneblade-nav>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `ariaLabel` | `string` | `undefined` | No | ARIA label for the navigation. Provides accessibility context for the tab navigation. Should describe the purpose or section of the navigation. |

## Events

This component does not emit any events.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Content slot for `fds-faneblade-nav-item` components |

## Usage Examples

### Basic Tab Navigation

```vue
<template>
  <fds-faneblade-nav aria-label="Main navigation">
    <fds-faneblade-nav-item 
      href="/profile" 
      label="Profile" 
      :active="currentPage === 'profile'"
    />
    <fds-faneblade-nav-item 
      href="/settings" 
      label="Settings" 
      :active="currentPage === 'settings'"
    />
    <fds-faneblade-nav-item 
      href="/help" 
      label="Help" 
      :active="currentPage === 'help'"
    />
  </fds-faneblade-nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFanebladeNav, FdsFanebladeNavItem } from '@madsb/dkfds-vue3'

const currentPage = ref('profile')
</script>
```

### Vue Router Integration

```vue
<template>
  <fds-faneblade-nav aria-label="Application sections">
    <fds-faneblade-nav-item 
      v-for="tab in navigationTabs"
      :key="tab.id"
      :href="tab.to"
      :label="tab.label"
      :icon="tab.icon"
      :active="$route.name === tab.routeName"
      @click="handleNavigation"
    />
  </fds-faneblade-nav>
</template>

<script setup lang="ts">
import { FdsFanebladeNav, FdsFanebladeNavItem } from '@madsb/dkfds-vue3'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigationTabs = [
  {
    id: 1,
    to: '/dashboard',
    label: 'Dashboard',
    icon: 'home',
    routeName: 'dashboard'
  },
  {
    id: 2,
    to: '/cases',
    label: 'Sager',
    icon: 'folder',
    routeName: 'cases'
  },
  {
    id: 3,
    to: '/documents',
    label: 'Dokumenter',
    icon: 'document',
    routeName: 'documents'
  }
]

const handleNavigation = (event: MouseEvent) => {
  // Handle analytics or custom navigation logic
  console.log('Navigation clicked:', event.target)
}
</script>
```

### Case Management Sections

```vue
<template>
  <fds-faneblade-nav aria-label="Case management sections">
    <fds-faneblade-nav-item 
      href="/case/overview" 
      label="Oversigt"
      :active="activeSection === 'overview'"
    />
    <fds-faneblade-nav-item 
      href="/case/documents" 
      label="Dokumenter"
      icon="document"
      :active="activeSection === 'documents'"
    />
    <fds-faneblade-nav-item 
      href="/case/communication" 
      label="Kommunikation"
      icon="chat"
      :active="activeSection === 'communication'"
    />
    <fds-faneblade-nav-item 
      href="/case/history" 
      label="Historik"
      icon="time"
      :active="activeSection === 'history'"
    />
  </fds-faneblade-nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFanebladeNav, FdsFanebladeNavItem } from '@madsb/dkfds-vue3'

const activeSection = ref('overview')
</script>
```

### Government Service Navigation

```vue
<template>
  <fds-faneblade-nav aria-label="Service sections">
    <fds-faneblade-nav-item 
      href="/apply" 
      label="Ansøg"
      :active="$route.path.startsWith('/apply')"
    />
    <fds-faneblade-nav-item 
      href="/status" 
      label="Status"
      :active="$route.path.startsWith('/status')"
    />
    <fds-faneblade-nav-item 
      href="/messages" 
      label="Beskeder"
      icon="mail"
      :active="$route.path.startsWith('/messages')"
    />
    <fds-faneblade-nav-item 
      href="/profile" 
      label="Min profil"
      icon="person"
      :active="$route.path.startsWith('/profile')"
    />
  </fds-faneblade-nav>
</template>
```

## TypeScript Interface

```typescript
export interface FdsFanebladeNavProps {
  /** 
   * ARIA label for the navigation
   * Provides accessibility context for the tab navigation.
   * Should describe the purpose or section of the navigation.
   * @example "Main navigation", "Case sections", "User profile sections"
   */
  ariaLabel?: string
}
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support through child navigation items
- **Screen Reader Support**: Uses semantic `<nav>` element with proper ARIA labeling
- **Focus Management**: Focus is managed by individual navigation items
- **Active State**: Current page/section is indicated via `aria-current` attribute on active items

### Best Practices

1. **Always provide `aria-label`**: Helps screen readers understand the navigation purpose
2. **Use descriptive labels**: Labels should clearly indicate the navigation's context
3. **Manage active states**: Ensure exactly one item is marked as active at a time
4. **Semantic structure**: Uses proper navigation landmark with list structure

### ARIA Attributes

- `aria-label`: Describes the navigation's purpose (required for accessibility)
- Navigation items handle `aria-current="true"` when active

## DKFDS Guidelines

### Design System Compliance

This component follows DKFDS v11 specifications for tab navigation:

- Uses semantic navigation structure rather than ARIA tabpanel pattern
- Implements proper visual styling through DKFDS CSS classes
- Supports icons through the DKFDS icon system
- Maintains consistent spacing and typography

### When to Use

- **Page-level navigation**: When tabs represent different pages or major sections
- **Persistent navigation**: When navigation should remain visible across page changes
- **Hierarchical content**: When organizing content into logical sections

### When Not to Use

- **Content switching**: For content panels that switch within the same page, use `fds-faneblader` instead
- **Form sections**: For form organization, consider using steps or accordion components

## Related Components

- **[FdsFanebladeNavItem](/components/navigation/fds-faneblade-nav-item)**: Individual navigation items for use within this component
- **[FdsFaneblader](/components/navigation/fds-faneblader)**: Content-switching tabs for same-page content panels
- **[FdsBreadcrumb](/components/navigation/fds-breadcrumb)**: Hierarchical navigation showing current location
- **[FdsNavigationPrimary](/components/navigation/fds-navigation-primary)**: Primary site navigation menu

<!-- Verified against source -->