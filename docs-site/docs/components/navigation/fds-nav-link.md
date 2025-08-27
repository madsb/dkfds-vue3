---
title: FdsNavLink
description: Navigation link component implementing DKFDS v11 navigation specifications. Flexible navigation link suitable for sidebar navigation, menus, and general navigation contexts.
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, link, menu, sidebar, current-page, disabled, icon, hint]
---

# FdsNavLink

Navigation link component implementing DKFDS v11 navigation specifications.

Flexible navigation link component suitable for sidebar navigation, menus, and general navigation contexts. Supports current page indication, disabled states, icons, and hint text. Automatically handles accessibility attributes and keyboard navigation. Can be used standalone or within navigation components.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <fds-nav-link 
    href="/dashboard" 
    :current="$route.path === '/dashboard'"
  >
    Dashboard
  </fds-nav-link>
</template>

<script setup>
import { FdsNavLink } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `href` | `string` | `'#'` | No | Link destination URL. Can be relative or absolute. Defaults to '#' which prevents navigation. |
| `current` | `boolean` | `false` | No | Whether this is the current page/section. Applies current page styling and ARIA attributes for accessibility. |
| `disabled` | `boolean` | `false` | No | Whether the link is disabled. Renders as span instead of anchor and prevents interaction. |
| `icon` | `string` | `undefined` | No | Optional DKFDS icon identifier to display alongside the link text. |
| `hint` | `string` | `undefined` | No | Optional hint/description text displayed below the main link text. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the link is clicked. Fired even when href is '#'. Useful for handling navigation in SPAs. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Main link text content. |

## Usage Examples

### Basic Navigation Link

```vue
<template>
  <fds-nav-link href="/dashboard">
    Dashboard
  </fds-nav-link>
</template>
```

### Current Page Indication

```vue
<template>
  <fds-nav-link 
    href="/reports" 
    :current="$route.path === '/reports'"
  >
    Reports
  </fds-nav-link>
</template>
```

### Link with Icon and Hint

```vue
<template>
  <fds-nav-link 
    href="/reports" 
    icon="bar-chart" 
    hint="View analytics and reports"
    :current="activeSection === 'reports'"
  >
    Reports
  </fds-nav-link>
</template>
```

### Disabled Link

```vue
<template>
  <fds-nav-link 
    href="/admin" 
    :disabled="!hasAdminAccess"
    icon="admin-panel-settings"
    @click="handleAccessDenied"
  >
    Admin Panel
  </fds-nav-link>
</template>

<script setup>
const hasAdminAccess = ref(false)

const handleAccessDenied = () => {
  alert('Adgang nægtet: Du har ikke tilladelse til at få adgang til administratorpanelet')
}
</script>
```

### Navigation Menu

```vue
<template>
  <nav role="navigation" aria-label="Hovednavigation">
    <ul class="nav-list">
      <li>
        <fds-nav-link 
          href="/dashboard" 
          :current="currentPage === 'dashboard'"
          icon="dashboard"
        >
          Dashboard
        </fds-nav-link>
      </li>
      <li>
        <fds-nav-link 
          href="/users" 
          :current="currentPage === 'users'"
          icon="people"
          hint="Administrer brugere og tilladelser"
        >
          Brugere
        </fds-nav-link>
      </li>
      <li>
        <fds-nav-link 
          href="/reports" 
          :current="currentPage === 'reports'"
          icon="assessment"
        >
          Rapporter
        </fds-nav-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref('dashboard')
</script>
```

### SPA Navigation Handling

```vue
<template>
  <fds-nav-link 
    href="#"
    :current="isCurrentRoute('/profile')"
    icon="person"
    @click="navigateToProfile"
  >
    Min Profil
  </fds-nav-link>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isCurrentRoute = (path: string) => {
  return route.path === path
}

const navigateToProfile = (event: MouseEvent) => {
  router.push('/profile')
}
</script>
```

### Conditional States

```vue
<template>
  <div class="admin-navigation">
    <fds-nav-link 
      href="/admin/users"
      :disabled="!permissions.manageUsers"
      :current="currentSection === 'users'"
      icon="people"
      hint="Administrer brugerkonti"
      @click="handleUsersClick"
    >
      Brugeradministration
    </fds-nav-link>
    
    <fds-nav-link 
      href="/admin/settings"
      :disabled="!permissions.manageSettings"
      :current="currentSection === 'settings'"
      icon="settings"
      @click="handleSettingsClick"
    >
      Systemindstillinger
    </fds-nav-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentSection = ref('users')
const userRole = ref('editor')

const permissions = computed(() => ({
  manageUsers: userRole.value === 'admin',
  manageSettings: userRole.value === 'admin'
}))

const handleUsersClick = (event: MouseEvent) => {
  if (!permissions.value.manageUsers) {
    event.preventDefault()
    showAccessDeniedMessage()
  }
}

const handleSettingsClick = (event: MouseEvent) => {
  if (!permissions.value.manageSettings) {
    event.preventDefault()
    showAccessDeniedMessage()
  }
}

const showAccessDeniedMessage = () => {
  alert('Du har ikke tilladelse til at få adgang til dette område')
}
</script>
```

## Accessibility

The `fds-nav-link` component implements comprehensive WCAG 2.1 AA accessibility features:

### ARIA Support
- **`aria-current="page"`**: Applied when `current` prop is true to indicate current page
- **`aria-disabled="true"`**: Applied when `disabled` prop is true
- **Semantic HTML**: Uses proper `<a>` elements for links, `<span>` for disabled states

### Keyboard Navigation
- **Tab Navigation**: Focusable with keyboard navigation
- **Enter/Space**: Activates the link (browser default behavior)
- **Disabled State**: Removed from tab order when disabled

### Screen Reader Support
- **Accessible Names**: Link text is automatically exposed to screen readers
- **State Indication**: Current and disabled states are properly announced
- **Icon Accessibility**: Icons are marked as decorative (`aria-hidden="true"`) when used with text

### Focus Management
- **Visible Focus**: CSS focus indicators follow DKFDS focus styling
- **Focus Trapping**: Integrates with navigation components for proper focus management

## DKFDS Guidelines

This component follows DKFDS v11 navigation specifications:

### Visual Design
- **Link Styling**: Consistent with DKFDS link appearance and interaction states
- **Current State**: Visual indication matching DKFDS current page patterns
- **Disabled State**: Reduced opacity and no hover effects as per DKFDS

### Behavior
- **Click Handling**: Prevents navigation when href is '#', useful for SPA routing
- **State Management**: Proper disabled and current state handling
- **Icon Integration**: Seamless integration with DKFDS icon system

### Best Practices
- **Semantic Structure**: Use within proper navigation landmarks
- **Descriptive Text**: Include meaningful link text and optional hint descriptions  
- **State Indication**: Always indicate current page/section for navigation clarity
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Related Components

- **[FdsMenu](/components/navigation/fds-menu)**: Container for navigation menu structures
- **[FdsMenuItem](/components/navigation/fds-menu-item)**: Menu item wrapper for dropdown menus
- **[FdsBreadcrumb](/components/navigation/fds-breadcrumb)**: Breadcrumb navigation component
- **[FdsIkon](/components/layout/fds-ikon)**: Icon component used for the `icon` prop

<!-- Verified against source -->