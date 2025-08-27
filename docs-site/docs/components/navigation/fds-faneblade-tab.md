---
title: FdsFanebladeTab
description: Individual tab button component for DKFDS tabbed interfaces with ARIA accessibility support
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [tabs, navigation, deprecated, aria, button]
deprecated: true
---

# FdsFanebladeTab

::: warning Deprecated
This component is deprecated. Use `fds-faneblade-nav` with `fds-faneblade-nav-item` for navigation-based tabs instead.
:::

Individual tab button component implementing DKFDS v11 tab specifications. Renders tab buttons with proper ARIA attributes for accessibility and supports icons, custom labels, and active state management. Must be used within the `fds-faneblade` component container.

<!-- Verified against source -->

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        id="personal-info"
        label="Personal Information"
        :active="activeTab === 'personal-info'"
        @click="handleTabClick"
      />
      <fds-faneblade-tab 
        id="contact"
        label="Contact Details"
        :active="activeTab === 'contact'"
        @click="handleTabClick"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        id="personal-info" 
        :active="activeTab === 'personal-info'"
      >
        Personal information content...
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="contact" 
        :active="activeTab === 'contact'"
      >
        Contact details content...
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'
import { FdsFaneblade, FdsFanebladeTab, FdsFanebladePanel } from '@madsb/dkfds-vue3'

const activeTab = ref('personal-info')

const handleTabClick = (tabId) => {
  activeTab.value = tabId
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | - | Yes | Unique identifier for the tab. Used to link tab button with corresponding panel via ARIA attributes. Should match the id of the associated `fds-faneblade-panel` component. |
| `label` | `string` | - | No | Label text for the tab. Visible text content. Can be overridden by slot content. |
| `active` | `boolean` | `false` | No | Whether this tab is currently active. Controls ARIA selected state and visual styling. |
| `icon` | `string` | - | No | Optional DKFDS icon identifier to display before the label. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `id: string` | Emitted when the tab is clicked. Allows parent component to handle tab switching and state management. The clicked tab's unique identifier is passed as the payload. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| default | - | Custom tab content that overrides the `label` prop. Useful for complex tab labels with custom styling or additional elements. |

## Usage Examples

### Basic Tab Implementation

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        v-for="tab in tabs"
        :key="tab.id"
        :id="tab.id"
        :label="tab.label"
        :active="activeTab === tab.id"
        @click="switchTab"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        v-for="tab in tabs"
        :key="tab.id"
        :id="tab.id"
        :active="activeTab === tab.id"
      >
        <component :is="tab.component" />
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'
import { FdsFaneblade, FdsFanebladeTab, FdsFanebladePanel } from '@madsb/dkfds-vue3'

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: 'Profil', component: 'ProfileTab' },
  { id: 'settings', label: 'Indstillinger', component: 'SettingsTab' },
  { id: 'notifications', label: 'Notifikationer', component: 'NotificationsTab' }
]

const switchTab = (tabId) => {
  activeTab.value = tabId
}
</script>
```

### Tab with Icon

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        id="settings"
        label="Settings"
        icon="settings"
        :active="currentTab === 'settings'"
        @click="handleTabSwitch"
      />
      <fds-faneblade-tab 
        id="notifications"
        label="Notifications"
        icon="notifications"
        :active="currentTab === 'notifications'"
        @click="handleTabSwitch"
      />
    </template>
    <template #panels>
      <!-- Panel content -->
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('settings')

const handleTabSwitch = (tabId) => {
  currentTab.value = tabId
}
</script>
```

### Custom Tab Content with Slots

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        id="custom"
        :active="activeTab === 'custom'"
        @click="selectTab"
      >
        <span class="custom-tab-content">
          <strong>Vigtigt</strong>
          <small class="text-muted">Kræver handling</small>
        </span>
      </fds-faneblade-tab>
    </template>
    <template #panels>
      <!-- Panel content -->
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('custom')

const selectTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<style scoped>
.custom-tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.text-muted {
  color: var(--color-text-secondary);
  font-size: 0.8rem;
}
</style>
```

## Accessibility

The `fds-faneblade-tab` component implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### ARIA Implementation
- Uses `role="tab"` for proper screen reader identification
- Implements `aria-controls` to link tab with its corresponding panel
- Uses `aria-selected` to indicate active state
- Generates semantic IDs (`tab-{id}`) that correspond to panel IDs (`tabpanel-{id}`)

### Keyboard Navigation
- Focusable button element supports keyboard interaction
- Works with standard tab navigation patterns when used within `fds-faneblade`
- Click events are properly handled for both mouse and keyboard activation

### Screen Reader Support
- Icons are marked as decorative with `decorative="true"` on `fds-ikon`
- Tab labels are properly associated with their functions
- Active state is announced to screen readers via `aria-selected`

## DKFDS Guidelines

This component follows the official Danish Common Design System specifications for tabs:

- **Visual Design**: Implements standard DKFDS tab styling and spacing
- **Behavior**: Follows DKFDS interaction patterns for tab switching
- **Accessibility**: Meets DKFDS accessibility requirements for government services
- **Structure**: Uses proper semantic HTML with ARIA enhancements
- **Icons**: Integrates with DKFDS icon system through `fds-ikon` component

### DKFDS v11 Compliance
- Proper ARIA role and attribute usage
- Semantic button element for tab controls
- Consistent visual styling with design system tokens
- Icon integration following DKFDS Material Design specifications

## Related Components

- **[FdsFaneblade](/components/navigation/fds-faneblade)** - Tab container component (required parent)
- **[FdsFanebladePanel](/components/navigation/fds-faneblade-panel)** - Tab panel component for content
- **[FdsFanebladeNav](/components/navigation/fds-faneblade-nav)** - Navigation-based tab container (recommended)
- **[FdsFanebladeNavItem](/components/navigation/fds-faneblade-nav-item)** - Navigation tab item (recommended)
- **[FdsIkon](/components/layout/fds-ikon)** - Icon component used for tab icons

## TypeScript Interface

```typescript
export interface FdsFanebladeTabProps {
  /** 
   * Unique identifier for the tab
   * Used to link tab button with corresponding panel via ARIA attributes.
   * Should match the id of the associated fds-faneblade-panel component.
   */
  id: string
  /** 
   * Label text for the tab
   * Visible text content. Can be overridden by slot content.
   */
  label?: string
  /** 
   * Whether this tab is currently active
   * Controls ARIA selected state and visual styling.
   * @default false
   */
  active?: boolean
  /** 
   * Optional icon ID for the tab
   * DKFDS icon identifier to display before the label.
   */
  icon?: string
}
```

## Migration Guide

::: warning Deprecation Notice
This component is deprecated in favor of the navigation-based tab pattern. Consider migrating to `fds-faneblade-nav` with `fds-faneblade-nav-item` for better semantic navigation.
:::

### Before (Deprecated)
```vue
<fds-faneblade>
  <template #tabs>
    <fds-faneblade-tab id="profile" label="Profile" :active="true" />
    <fds-faneblade-tab id="settings" label="Settings" />
  </template>
  <template #panels>
    <fds-faneblade-panel id="profile" :active="true">
      Profile content...
    </fds-faneblade-panel>
  </template>
</fds-faneblade>
```

### After (Recommended)
```vue
<fds-faneblade-nav aria-label="User sections">
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
```