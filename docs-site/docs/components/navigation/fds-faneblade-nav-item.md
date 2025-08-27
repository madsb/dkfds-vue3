---
title: FdsFanebladeNavItem
description: Tab navigation item component implementing DKFDS v11 navigation specifications
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, tabs, links, accessibility, routing]
---

# FdsFanebladeNavItem

Individual navigation item for use within fds-faneblade-nav component. Renders as an anchor link with proper accessibility attributes and visual states. Supports icons, active state indication, and click handling for single-page applications or analytics tracking.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<script setup lang="ts">
import { FdsFanebladeNavItem } from '@madsb/dkfds-vue3'
</script>

<template>
  <fds-faneblade-nav aria-label="Main navigation">
    <fds-faneblade-nav-item 
      href="/dashboard" 
      label="Dashboard" 
      :active="currentPage === 'dashboard'"
    />
    <fds-faneblade-nav-item 
      href="/settings" 
      label="Settings" 
      :active="currentPage === 'settings'"
    />
  </fds-faneblade-nav>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `href` | `string` | - | ✅ | Link destination. URL or path where the navigation item should link. Can be relative or absolute URL. |
| `label` | `string` | - | ❌ | Label text for the navigation item. Visible text content. Can be overridden by slot content. |
| `active` | `boolean` | `false` | ❌ | Whether this item is currently active. Controls visual active state and ARIA current attribute. |
| `icon` | `string` | - | ❌ | Optional icon ID. DKFDS icon identifier to display before the label. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the link is clicked. Useful for analytics tracking or SPA navigation handling. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | - | Custom content for the navigation item. Overrides the `label` prop when provided. Can include icons, badges, or complex markup. |

## Usage Examples

### Basic Navigation Item

```vue
<template>
  <fds-faneblade-nav aria-label="Main navigation">
    <fds-faneblade-nav-item 
      href="/profile" 
      label="Profil" 
      :active="$route.path === '/profile'"
    />
    <fds-faneblade-nav-item 
      href="/indstillinger" 
      label="Indstillinger" 
      :active="$route.path === '/indstillinger'"
    />
  </fds-faneblade-nav>
</template>
```

### Navigation Item with Icon

```vue
<template>
  <fds-faneblade-nav aria-label="Applikations-sektioner">
    <fds-faneblade-nav-item 
      href="/dashboard" 
      label="Dashboard"
      icon="dashboard"
      :active="currentSection === 'dashboard'"
      @click="trackNavigation('dashboard')"
    />
    <fds-faneblade-nav-item 
      href="/rapporter" 
      label="Rapporter"
      icon="bar-chart"
      :active="currentSection === 'rapporter'"
      @click="trackNavigation('rapporter')"
    />
  </fds-faneblade-nav>
</template>

<script setup lang="ts">
const currentSection = ref('dashboard')

const trackNavigation = (section: string) => {
  // Analytics tracking
  console.log(`Navigating to: ${section}`)
}
</script>
```

### Custom Content with Slot

```vue
<template>
  <fds-faneblade-nav aria-label="Sagsstyring">
    <fds-faneblade-nav-item 
      href="/sager/oversigt" 
      :active="$route.name === 'case-overview'"
    >
      <fds-ikon icon="folder-open" />
      Oversigt
    </fds-faneblade-nav-item>
    
    <fds-faneblade-nav-item 
      href="/sager/beskeder" 
      :active="$route.name === 'case-messages'"
    >
      <fds-ikon icon="message" />
      Beskeder
      <fds-badge v-if="unreadCount > 0" :count="unreadCount" />
    </fds-faneblade-nav-item>
  </fds-faneblade-nav>
</template>

<script setup lang="ts">
import { FdsFanebladeNav, FdsFanebladeNavItem, FdsIkon, FdsBadge } from '@madsb/dkfds-vue3'

const unreadCount = ref(3)
</script>
```

### Vue Router Integration

```vue
<template>
  <fds-faneblade-nav aria-label="Hovednavigation">
    <fds-faneblade-nav-item 
      v-for="tab in navigationTabs"
      :key="tab.id"
      :href="tab.to"
      :label="tab.label"
      :icon="tab.icon"
      :active="$route.name === tab.routeName"
      @click="handleRouterNavigation($event, tab.to)"
    />
  </fds-faneblade-nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface NavigationTab {
  id: string
  label: string
  to: string
  routeName: string
  icon?: string
}

const router = useRouter()

const navigationTabs: NavigationTab[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    to: '/dashboard', 
    routeName: 'dashboard',
    icon: 'dashboard'
  },
  { 
    id: 'cases', 
    label: 'Sager', 
    to: '/sager', 
    routeName: 'cases',
    icon: 'folder'
  },
  { 
    id: 'reports', 
    label: 'Rapporter', 
    to: '/rapporter', 
    routeName: 'reports',
    icon: 'bar-chart'
  }
]

const handleRouterNavigation = (event: MouseEvent, to: string) => {
  // Prevent default browser navigation
  event.preventDefault()
  
  // Use Vue Router for SPA navigation
  router.push(to)
}
</script>
```

### Government Service Navigation

```vue
<template>
  <fds-faneblade-nav aria-label="Borger.dk tjeneste navigation">
    <fds-faneblade-nav-item 
      href="/ansogning/personoplysninger" 
      label="Personoplysninger"
      :active="currentStep === 'personal'"
    />
    <fds-faneblade-nav-item 
      href="/ansogning/dokumenter" 
      label="Dokumenter"
      :active="currentStep === 'documents'"
    />
    <fds-faneblade-nav-item 
      href="/ansogning/bekraeftelse" 
      label="Bekræftelse"
      :active="currentStep === 'confirmation'"
    />
  </fds-faneblade-nav>
</template>

<script setup lang="ts">
const currentStep = ref('personal')
</script>
```

## Accessibility

This component follows WCAG 2.1 AA accessibility guidelines:

- **Semantic Navigation**: Uses proper `<nav>` element with `<ul>` and `<li>` structure
- **ARIA Current**: Sets `aria-current="true"` for active navigation items
- **Keyboard Navigation**: Full keyboard support through native anchor links
- **Screen Reader Support**: Clear navigation context with aria-label
- **Focus Management**: Visible focus indicators and proper tab order
- **Link Purpose**: Clear link destinations and purposes

### Screen Reader Announcements

- Inactive item: "Dashboard, link"
- Active item: "Dashboard, link, current"
- With icon: "Dashboard icon, Dashboard, link"

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move to next navigation item |
| `Shift + Tab` | Move to previous navigation item |
| `Enter` | Activate the navigation link |
| `Space` | Activate the navigation link (when focused) |

## DKFDS Guidelines

This component implements the DKFDS v11 tab navigation specifications:

- **Navigation Pattern**: Uses navigation pattern rather than tabpanel/tab for linking to different pages
- **Visual Design**: Follows DKFDS tab styling and spacing requirements
- **State Management**: Proper active state indication following design system
- **Icon Integration**: Supports DKFDS icon system when icons are needed
- **Responsive Design**: Adapts to different screen sizes maintaining usability

### Design Tokens

The component uses standard DKFDS design tokens for:
- Typography (font sizes, weights, line heights)
- Color scheme (text, background, border colors)
- Spacing (padding, margins, gaps)
- Interactive states (hover, focus, active)

### BorgerDK vs VirkDK Themes

Works with both theme contexts:
- **BorgerDK**: Citizen-facing services with appropriate styling
- **VirkDK**: Business-facing services with corporate styling

## Related Components

- [FdsFanebladeNav](/components/navigation/fds-faneblade-nav) - Container for navigation items
- [FdsFaneblade](/components/navigation/fds-faneblade) - Complete tabbed interface component
- [FdsNavLink](/components/navigation/fds-nav-link) - Standalone navigation links
- [FdsIkon](/components/layout/fds-ikon) - Icon component for navigation items

<!-- Verified against source file at src/components/navigation/fds-faneblade-nav-item.vue -->