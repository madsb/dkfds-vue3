---
title: FdsMenu
description: Menu container component implementing DKFDS v11 navigation menu specifications with support for sidebar menus and submenus
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [menu, navigation, sidebar, submenu, nav, links]
---

# FdsMenu

Menu container component implementing DKFDS v11 navigation menu specifications. Provides semantic structure for navigation menus with support for sidebar menus and submenus. Automatically applies appropriate ARIA roles and CSS classes based on the variant.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<script setup>
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'
</script>

<template>
  <FdsMenu variant="sidemenu" aria-label="Main navigation">
    <FdsMenuItem href="/dashboard" :current="true">
      Dashboard
    </FdsMenuItem>
    <FdsMenuItem href="/reports">
      Reports
    </FdsMenuItem>
  </FdsMenu>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'sidemenu' \| 'submenu'` | `'sidemenu'` | No | Menu variant type. Controls semantic structure and styling. Sidemenu creates nav element with proper ARIA landmarks, submenu creates simple list structure |
| `ariaLabel` | `string` | `undefined` | No* | ARIA label for navigation. Required for sidemenu variant to provide accessible navigation context. Should describe the purpose of the navigation menu |

*Required when variant is 'sidemenu'

## Events

This component does not emit any events directly. Navigation events are handled by child `FdsMenuItem` components.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Menu items content. Should contain `FdsMenuItem` components |

## Usage Examples

### Basic Sidebar Menu

```vue
<template>
  <FdsMenu variant="sidemenu" aria-label="Main navigation">
    <FdsMenuItem href="/dashboard" :current="true">
      Dashboard
    </FdsMenuItem>
    <FdsMenuItem href="/reports">
      Reports
    </FdsMenuItem>
    <FdsMenuItem href="/settings">
      Settings
    </FdsMenuItem>
  </FdsMenu>
</template>
```

### Submenu Structure

```vue
<template>
  <FdsMenu variant="sidemenu" aria-label="Main navigation">
    <FdsMenuItem href="/settings" :expanded="showSubmenu">
      Settings
      <template #submenu>
        <FdsMenu variant="submenu">
          <FdsMenuItem href="/settings/profile">
            Profile
          </FdsMenuItem>
          <FdsMenuItem href="/settings/security">
            Security
          </FdsMenuItem>
        </FdsMenu>
      </template>
    </FdsMenuItem>
  </FdsMenu>
</template>

<script setup>
import { ref } from 'vue'
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'

const showSubmenu = ref(false)
</script>
```

### Numbered Menu Items

```vue
<template>
  <FdsMenu aria-label="Process steps">
    <FdsMenuItem :index="1" href="/step1" :current="currentStep === 1">
      Personal Information
    </FdsMenuItem>
    <FdsMenuItem :index="2" href="/step2" :current="currentStep === 2">
      Document Upload
    </FdsMenuItem>
    <FdsMenuItem :index="3" href="/step3" :current="currentStep === 3">
      Review and Submit
    </FdsMenuItem>
  </FdsMenu>
</template>

<script setup>
import { ref } from 'vue'
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'

const currentStep = ref(1)
</script>
```

### Multi-level Navigation

```vue
<template>
  <FdsMenu variant="sidemenu" aria-label="Application navigation">
    <FdsMenuItem href="/dashboard" :current="$route.path === '/dashboard'">
      Dashboard
    </FdsMenuItem>
    
    <FdsMenuItem href="/users" :expanded="usersExpanded">
      User Management
      <template #submenu>
        <FdsMenu variant="submenu">
          <FdsMenuItem href="/users/list">
            All Users
          </FdsMenuItem>
          <FdsMenuItem href="/users/roles">
            Roles & Permissions
          </FdsMenuItem>
        </FdsMenu>
      </template>
    </FdsMenuItem>
    
    <FdsMenuItem href="/reports" :expanded="reportsExpanded">
      Reports
      <template #submenu>
        <FdsMenu variant="submenu">
          <FdsMenuItem href="/reports/analytics">
            Analytics
          </FdsMenuItem>
          <FdsMenuItem href="/reports/audit">
            Audit Log
          </FdsMenuItem>
        </FdsMenu>
      </template>
    </FdsMenuItem>
  </FdsMenu>
</template>

<script setup>
import { ref } from 'vue'
import { FdsMenu, FdsMenuItem } from '@madsb/dkfds-vue3'

const usersExpanded = ref(false)
const reportsExpanded = ref(false)
</script>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Semantic Structure**: Uses proper `<nav>` element for sidemenu variant with `aria-label` for context
- **Keyboard Navigation**: Full keyboard accessibility through child menu items
- **Screen Reader Support**: Proper ARIA landmarks and navigation roles
- **Focus Management**: Proper focus indication and management through menu items

### Key Accessibility Features

- **Navigation Landmark**: Sidemenu variant creates a `<nav>` element with proper ARIA labeling
- **Hierarchical Structure**: Clear parent-child relationships between menus and submenus
- **Current Page Indication**: Supports `aria-current="page"` through menu items
- **Submenu Association**: Proper semantic association between parent items and submenus

### Best Practices

```vue
<!-- Always provide meaningful aria-label for sidemenu -->
<FdsMenu variant="sidemenu" aria-label="Main navigation">
  <!-- menu items -->
</FdsMenu>

<!-- Use descriptive labels that indicate purpose -->
<FdsMenu variant="sidemenu" aria-label="Account settings navigation">
  <!-- settings menu items -->
</FdsMenu>

<!-- For process steps, use descriptive labels -->
<FdsMenu aria-label="Registration process steps">
  <FdsMenuItem :index="1" :current="true">Personal Information</FdsMenuItem>
  <FdsMenuItem :index="2">Document Upload</FdsMenuItem>
</FdsMenu>
```

## DKFDS Guidelines

### Design System Compliance

- Follows DKFDS v11 navigation menu specifications
- Implements proper CSS classes: `sidemenu` for sidebar navigation
- Supports both VirkDK (business) and BorgerDK (citizen) themes
- Maintains consistent spacing and typography per DKFDS standards

### Semantic HTML Structure

**Sidemenu variant** generates:
```html
<nav aria-label="Main navigation">
  <ul class="sidemenu">
    <li>
      <a href="/page" class="nav-link">Page Title</a>
    </li>
  </ul>
</nav>
```

**Submenu variant** generates:
```html
<ul>
  <li>
    <a href="/page" class="nav-link">Page Title</a>
  </li>
</ul>
```

### Danish Government Context

Ideal for:
- **Selvbetjeningsløsninger**: Self-service solutions requiring clear navigation
- **Borgere.dk integration**: Citizen-facing applications with step-by-step processes
- **Virk.dk integration**: Business applications with complex menu structures
- **Offentlige myndigheder**: Public authority websites requiring accessible navigation

## TypeScript Interface

```typescript
export interface FdsMenuProps {
  /** 
   * Menu variant type
   * Controls semantic structure and styling. Sidemenu creates nav element
   * with proper ARIA landmarks, submenu creates simple list structure.
   * @values 'sidemenu', 'submenu'
   * @default 'sidemenu'
   */
  variant?: 'sidemenu' | 'submenu'
  /** 
   * ARIA label for navigation
   * Required for sidemenu variant to provide accessible navigation context.
   * Should describe the purpose of the navigation menu.
   */
  ariaLabel?: string
}
```

## Related Components

- **[FdsMenuItem](/components/navigation/fds-menu-item)** - Individual menu items for use within FdsMenu
- **[FdsBreadcrumb](/components/navigation/fds-breadcrumb)** - Breadcrumb navigation component
- **[FdsTabs](/components/navigation/fds-tabs)** - Tab navigation component

<!-- Verified against source -->