---
title: FdsMenuItem
description: Menu item component implementing DKFDS v11 navigation menu item specifications. Individual menu item for use within fds-menu component with support for current page indication, expanded states, numbered items, hint text, and submenu content.
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [menu, navigation, link, item, aria, accessibility, dkfds]
---

# FdsMenuItem

Individual menu item component for use within fds-menu component. Supports current page indication, expanded states for submenus, numbered items, hint text, and proper accessibility attributes. Handles both simple links and complex menu structures with submenu support.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <fds-menu variant="sidemenu" aria-label="Main navigation">
    <fds-menu-item href="/dashboard" :current="$route.path === '/dashboard'">
      Dashboard
    </fds-menu-item>
    <fds-menu-item href="/reports">
      Reports
    </fds-menu-item>
  </fds-menu>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | `undefined` | No | Unique identifier for the menu item. Used for navigation events and programmatic control. |
| `active` | `boolean` | `false` | No | Whether the menu item is active. Controls expanded state styling when item has submenu, or current page styling when item has no submenu. |
| `href` | `string` | `undefined` | No | Link destination URL. Can be relative or absolute URL. Defaults to '#' which prevents navigation. |
| `index` | `number \| null` | `null` | No | Optional numeric index. When provided, displays number prefix (e.g., "1. Dashboard"). Useful for step-by-step processes or numbered navigation. |
| `current` | `boolean` | `false` | No | Whether this represents the current page. Explicitly marks item as current page with appropriate styling and ARIA attributes. |
| `expanded` | `boolean` | `false` | No | Whether submenu is expanded. Controls visibility and styling of submenu content. |
| `hint` | `string` | `undefined` | No | Optional hint/description text. Additional descriptive text displayed below the main menu item text. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `navigate` | `id?: string` | Emitted when menu item is navigated to. Provides the menu item ID for programmatic handling. |
| `click` | `event: MouseEvent` | Emitted when menu item is clicked. Fired for all click interactions, useful for analytics or custom handling. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | The main content of the menu item (typically text or icons) |
| `submenu` | None | Optional slot for submenu content. Should contain fds-menu component with variant="submenu" |

## Usage Examples

### Basic Menu Item

```vue
<template>
  <fds-menu variant="sidemenu" aria-label="Main navigation">
    <fds-menu-item href="/dashboard" :current="$route.path === '/dashboard'">
      Dashboard
    </fds-menu-item>
    <fds-menu-item href="/reports">
      Reports  
    </fds-menu-item>
  </fds-menu>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'
import { useRoute } from 'vue-router'

const $route = useRoute()
</script>
```

### Menu Item with Hint Text

```vue
<template>
  <fds-menu variant="sidemenu" aria-label="Main navigation">
    <fds-menu-item 
      href="/reports" 
      hint="View analytics and generate reports"
      :current="activeSection === 'reports'"
    >
      Reports
    </fds-menu-item>
    <fds-menu-item 
      href="/settings" 
      hint="Configure account and application preferences"
    >
      Settings
    </fds-menu-item>
  </fds-menu>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const activeSection = ref('reports')
</script>
```

### Numbered Menu Items

```vue
<template>
  <fds-menu variant="sidemenu" aria-label="Application process steps">
    <fds-menu-item 
      :index="1" 
      href="/step1" 
      :current="currentStep === 1"
    >
      Personal Information
    </fds-menu-item>
    <fds-menu-item 
      :index="2" 
      href="/step2" 
      :current="currentStep === 2"
    >
      Documents Upload
    </fds-menu-item>
    <fds-menu-item 
      :index="3" 
      href="/step3" 
      :current="currentStep === 3"
    >
      Review and Submit
    </fds-menu-item>
  </fds-menu>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const currentStep = ref(1)
</script>
```

### Menu Item with Submenu

```vue
<template>
  <fds-menu variant="sidemenu" aria-label="Main navigation">
    <fds-menu-item href="/dashboard" :current="$route.path === '/dashboard'">
      Dashboard
    </fds-menu-item>
    <fds-menu-item 
      href="/settings" 
      :expanded="showSettings"
      @click="toggleSettings"
    >
      Settings
      <template #submenu>
        <fds-menu variant="submenu">
          <fds-menu-item 
            href="/settings/profile"
            :current="$route.path === '/settings/profile'"
          >
            Profile
          </fds-menu-item>
          <fds-menu-item 
            href="/settings/account"
            :current="$route.path === '/settings/account'"
          >
            Account
          </fds-menu-item>
          <fds-menu-item 
            href="/settings/security"
            :current="$route.path === '/settings/security'"
          >
            Security
          </fds-menu-item>
        </fds-menu>
      </template>
    </fds-menu-item>
  </fds-menu>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const showSettings = ref(false)

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}
</script>
```

### Interactive Menu with Navigation Events

```vue
<template>
  <fds-menu variant="sidemenu" aria-label="Application navigation">
    <fds-menu-item
      v-for="item in menuItems"
      :key="item.id"
      :id="item.id"
      :href="item.href"
      :current="currentPage === item.id"
      :hint="item.description"
      @navigate="handleNavigation"
      @click="trackAnalytics"
    >
      {{ item.label }}
    </fds-menu-item>
  </fds-menu>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

interface MenuItem {
  id: string
  label: string
  href: string
  description?: string
}

const currentPage = ref('dashboard')

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Overview of your account and recent activity'
  },
  {
    id: 'applications',
    label: 'Applications',
    href: '/applications',
    description: 'View and manage your submitted applications'
  },
  {
    id: 'documents',
    label: 'Documents',
    href: '/documents',
    description: 'Upload and organize your documents'
  }
]

const handleNavigation = (id?: string) => {
  if (id) {
    currentPage.value = id
    console.log(`Navigating to: ${id}`)
  }
}

const trackAnalytics = (event: MouseEvent) => {
  // Track user interactions for analytics
  console.log('Menu item clicked:', event.target)
}
</script>
```

## Accessibility

The FdsMenuItem component implements WCAG 2.1 AA accessibility standards:

### ARIA Attributes
- Uses `aria-current="page"` when `current` prop is true to indicate the current page
- Proper semantic structure with `<li>` and `<a>` elements for screen reader navigation
- Supports keyboard navigation through standard link behavior

### Keyboard Navigation
- **Tab**: Navigate between menu items
- **Enter/Space**: Activate menu item link
- **Arrow Keys**: Native browser navigation between focusable elements

### Screen Reader Support
- Semantic HTML structure (`<ul>`, `<li>`, `<a>`) provides proper navigation context
- Current page indication announced to screen readers
- Hint text provides additional context when available
- Submenu structure properly nested for navigation hierarchy

### Focus Management
- Clear focus indicators for keyboard navigation
- Focus remains on activated item during interactions
- Proper focus flow through menu hierarchy

## DKFDS Guidelines

The FdsMenuItem component follows the Danish Common Design System specifications:

### Design Principles
- **Consistency**: Uniform styling across all government self-service solutions
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design
- **Usability**: Clear navigation patterns and current page indication

### Visual Design
- Uses DKFDS color scheme and typography
- Supports both VirkDK (business) and BorgerDK (citizen) themes
- Consistent spacing and interactive states

### Behavior Standards
- Current page indication with visual styling and ARIA attributes
- Expandable submenu support for hierarchical navigation
- Hint text for additional context and guidance

### Implementation Notes
- Must be used within `fds-menu` component for proper structure
- Follows DKFDS v11 navigation specifications
- Compatible with Danish government accessibility requirements

## TypeScript Support

```typescript
import type { FdsMenuItemProps } from '@madsb/dkfds-vue3'

interface FdsMenuItemProps {
  id?: string
  active?: boolean
  href?: string
  index?: number | null
  current?: boolean
  expanded?: boolean
  hint?: string
}

// Events
interface FdsMenuItemEmits {
  navigate: [id?: string]
  click: [event: MouseEvent]
}
```

## Related Components

- **[FdsMenu](/components/navigation/fds-menu)** - Container component for menu items
- **[FdsNavLink](/components/navigation/fds-nav-link)** - Simple navigation link component
- **[FdsBreadcrumb](/components/navigation/fds-breadcrumb)** - Breadcrumb navigation component
- **[FdsTilbageLink](/components/navigation/fds-tilbage-link)** - Back/return link component

<!-- Verified against source -->