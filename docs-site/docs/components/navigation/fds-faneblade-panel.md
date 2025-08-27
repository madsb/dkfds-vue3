---
title: FdsFanebladePanel
description: Tab panel component implementing DKFDS v11 tab panel specifications
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [tabs, panel, tabpanel, navigation, faneblade, content, ARIA]
---

# FdsFanebladePanel

Provides content container for tab panels with proper ARIA attributes and keyboard navigation support. Each panel should have a corresponding tab with the same ID. Content is hidden when not active and receives focus when activated. Must be used within fds-faneblade component.

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
        :active="currentTab === 'personal-info'"
        @click="currentTab = 'personal-info'"
      />
      <fds-faneblade-tab 
        id="contact" 
        label="Contact Details" 
        :active="currentTab === 'contact'"
        @click="currentTab = 'contact'"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        id="personal-info" 
        :active="currentTab === 'personal-info'"
      >
        <h2>Personal Information</h2>
        <p>Enter your personal details here...</p>
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="contact" 
        :active="currentTab === 'contact'"
      >
        <h2>Contact Details</h2>
        <p>Provide your contact information...</p>
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTab = ref('personal-info')
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | - | Yes | Unique identifier matching the tab id. Must correspond to the id of an associated fds-faneblade-tab component for proper ARIA linkage and accessibility. |
| `active` | `boolean` | `false` | No | Whether this panel is currently visible. Controls visibility and keyboard navigation. Active panels are focusable. |

## Events

This component does not emit any events.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | - | Panel content. Can contain any HTML elements, Vue components, forms, or dynamic content. Content is preserved when panel is toggled between active/inactive states. |

## Usage Examples

### Basic Tab Panel

```vue
<fds-faneblade-panel 
  id="personal-info" 
  :active="currentTab === 'personal-info'"
>
  <h2>Personal Information</h2>
  <p>Enter your personal details here...</p>
</fds-faneblade-panel>
```

### Panel with Form Content

```vue
<fds-faneblade-panel 
  id="contact" 
  :active="currentTab === 'contact'"
>
  <fds-form-group>
    <fds-label for="email">Email Address</fds-label>
    <fds-input id="email" type="email" />
  </fds-form-group>
  <fds-form-group>
    <fds-label for="phone">Phone Number</fds-label>
    <fds-input id="phone" type="tel" />
  </fds-form-group>
</fds-faneblade-panel>
```

### Dynamic Content Panel

```vue
<fds-faneblade-panel 
  id="results" 
  :active="currentTab === 'results'"
>
  <template v-if="loading">
    <fds-spinner />
  </template>
  <template v-else>
    <div v-for="item in results" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </template>
</fds-faneblade-panel>
```

### Panel with Complex Layout

```vue
<fds-faneblade-panel 
  id="settings" 
  :active="currentTab === 'settings'"
>
  <div class="row">
    <div class="col-md-6">
      <h3>General Settings</h3>
      <fds-checkbox id="notifications" label="Enable notifications" />
      <fds-checkbox id="updates" label="Auto-updates" />
    </div>
    <div class="col-md-6">
      <h3>Privacy Settings</h3>
      <fds-radio-group name="privacy" v-model="privacyLevel">
        <fds-radio-item value="public" label="Public" />
        <fds-radio-item value="private" label="Private" />
      </fds-radio-group>
    </div>
  </div>
</fds-faneblade-panel>
```

### Multiple Panels with State Management

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        v-for="tab in tabs"
        :key="tab.id"
        :id="tab.id"
        :label="tab.label"
        :active="activePanel === tab.id"
        @click="setActivePanel(tab.id)"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        v-for="panel in panels"
        :key="panel.id"
        :id="panel.id"
        :active="panel.id === activePanel"
      >
        <component :is="panel.component" v-bind="panel.props" />
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activePanel = ref('panel1')
const tabs = [
  { id: 'panel1', label: 'Overview' },
  { id: 'panel2', label: 'Details' },
  { id: 'panel3', label: 'Settings' }
]
const panels = [
  { id: 'panel1', component: 'OverviewPanel', props: {} },
  { id: 'panel2', component: 'DetailsPanel', props: {} },
  { id: 'panel3', component: 'SettingsPanel', props: {} }
]

function setActivePanel(panelId: string) {
  activePanel.value = panelId
}
</script>
```

## Accessibility

The `fds-faneblade-panel` component implements comprehensive accessibility features following WCAG 2.1 AA standards:

### ARIA Implementation

- **Role**: `role="tabpanel"` identifies the element as a tab panel
- **Labeling**: `aria-labelledby` links to the corresponding tab button for screen readers
- **Focus Management**: `tabindex` is dynamically set based on active state:
  - Active panels: `tabindex="0"` (focusable)
  - Inactive panels: `tabindex="-1"` (not focusable)

### Visibility Management

- **Hidden Attribute**: Inactive panels use the `hidden` attribute for proper screen reader handling
- **Content Preservation**: Panel content is preserved when toggled, maintaining form state and component data
- **Semantic Structure**: Proper HTML structure with div elements and semantic content

### Keyboard Navigation

- Active panels can receive focus via keyboard navigation
- Inactive panels are excluded from tab order for efficient navigation
- Panel content maintains standard keyboard interaction patterns

### Screen Reader Support

- Clear semantic relationships between tabs and panels
- Proper announcement of panel visibility changes
- Preserved content structure for assistive technology

## DKFDS Guidelines

This component follows the Danish Common Design System (DKFDS) v11 specifications:

### Design Principles

- **Consistent Structure**: Uses standard DKFDS tab panel HTML structure with `.tab-panel` class
- **Accessibility First**: Implements DKFDS accessibility requirements with proper ARIA attributes
- **Semantic HTML**: Uses appropriate HTML elements and roles for tab functionality

### Visual Integration

- Compatible with DKFDS CSS framework styling
- Supports both VirkDK and BorgerDK themes
- Maintains consistent spacing and visual hierarchy

### Usage Patterns

- Designed for government self-service solutions
- Supports Danish language content and international standards
- Follows DKFDS component composition patterns

### Technical Compliance

- Implements DKFDS v11 tab specifications exactly
- Uses prescribed CSS classes and HTML structure
- Maintains compatibility with DKFDS JavaScript behaviors

## TypeScript Interface

```typescript
export interface FdsFanebladePanelProps {
  /** 
   * Unique identifier matching the tab id
   * Must correspond to the id of an associated fds-faneblade-tab component
   * for proper ARIA linkage and accessibility.
   */
  id: string
  /** 
   * Whether this panel is currently visible
   * Controls visibility and keyboard navigation. Active panels are focusable.
   * @default false
   */
  active?: boolean
}
```

## Related Components

- **[FdsFaneblade](/components/navigation/fds-faneblade)** - Tab container providing the overall tab structure
- **[FdsFanebladeTab](/components/navigation/fds-faneblade-tab)** - Tab button component for navigation
- **[FdsFanebladeNav](/components/navigation/fds-faneblade-nav)** - Modern navigation-based tab container
- **[FdsFanebladeNavItem](/components/navigation/fds-faneblade-nav-item)** - Navigation-based tab item

<!-- Verified against source -->