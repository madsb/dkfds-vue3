---
title: FdsOverflowMenu
description: Collapsible menu for additional actions or options when space is limited
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [menu, dropdown, navigation, actions, overflow, collapsible]
---

# FdsOverflowMenu

Overflow menu component implementing DKFDS v11 overflow menu specifications. Provides a collapsible menu for additional actions or options when space is limited. Features keyboard navigation, click-outside-to-close behavior, proper ARIA attributes, and customizable positioning. Commonly used for action menus, settings, or additional navigation options that don't fit in the main interface.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <fds-overflow-menu header="Actions">
    <li><a href="/edit">Edit</a></li>
    <li><a href="/delete">Delete</a></li>
    <li><a href="/share">Share</a></li>
  </fds-overflow-menu>
</template>

<script setup>
import { FdsOverflowMenu } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `header` | `string` | `'Overflow menu'` | No | Header text for the menu button. Visible text displayed on the menu trigger button. |
| `id` | `string` | Auto-generated | No | Unique identifier for the menu. Auto-generated if not provided. Used for ARIA relationships. |
| `icon` | `string` | `'more-vert'` | No | Icon identifier for the menu button. DKFDS icon to display on the menu button. |
| `iconPosition` | `'left' \| 'right'` | `'right'` | No | Position of the icon relative to header text. Controls whether icon appears before or after the header text. |
| `position` | `'left' \| 'right'` | `'right'` | No | Menu dropdown positioning. Controls which side of the button the menu appears on. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `open` | `[]` | Emitted when the overflow menu opens. Useful for tracking menu usage or triggering related UI updates. |
| `close` | `[]` | Emitted when the overflow menu closes. Triggered by clicking outside, pressing Escape, or programmatic close. |
| `toggle` | `[isOpen: boolean]` | Emitted when menu state toggles. Provides the new open/closed state for external state management. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Menu items content. Should contain `<li>` elements with links or buttons. |
| `icon-left` | None | Custom icon content for left position. Replaces the default icon when `iconPosition` is 'left'. |
| `icon-right` | None | Custom icon content for right position. Replaces the default icon when `iconPosition` is 'right'. |
| `header` | None | Custom header content. Replaces the default header text. |

## Usage Examples

### Basic Overflow Menu

```vue
<template>
  <fds-overflow-menu header="More actions">
    <li><a href="/edit">Edit item</a></li>
    <li><a href="/copy">Copy item</a></li>
    <li><a href="/delete">Delete item</a></li>
    <li><a href="/archive">Archive item</a></li>
  </fds-overflow-menu>
</template>
```

### Left-Positioned Menu with Custom Icon

```vue
<template>
  <fds-overflow-menu 
    header="Options"
    icon="settings"
    icon-position="left"
    position="left"
    @open="trackMenuOpen"
    @close="trackMenuClose"
  >
    <li><button @click="openSettings">Settings</button></li>
    <li><button @click="showHelp">Help</button></li>
    <li><button @click="logout">Log out</button></li>
  </fds-overflow-menu>
</template>

<script setup>
import { FdsOverflowMenu } from '@madsb/dkfds-vue3'

const trackMenuOpen = () => {
  console.log('Menu opened')
}

const trackMenuClose = () => {
  console.log('Menu closed')
}

const openSettings = () => {
  // Handle settings action
}

const showHelp = () => {
  // Handle help action
}

const logout = () => {
  // Handle logout action
}
</script>
```

### Custom Icon and Header Slots

```vue
<template>
  <fds-overflow-menu position="right">
    <template #icon-right>
      <fds-ikon icon="expand-more" :decorative="true" />
    </template>
    <template #header>
      <span class="sr-only">Options for </span>
      Menu
    </template>
    <li><a href="/profile">View Profile</a></li>
    <li><a href="/preferences">Preferences</a></li>
    <li><hr class="divider"></li>
    <li><a href="/logout">Sign Out</a></li>
  </fds-overflow-menu>
</template>

<script setup>
import { FdsOverflowMenu, FdsIkon } from '@madsb/dkfds-vue3'
</script>
```

### With Event Handling and State Management

```vue
<template>
  <div>
    <p v-if="menuState">Menu is currently {{ menuState ? 'open' : 'closed' }}</p>
    <fds-overflow-menu 
      header="Document actions"
      @toggle="handleToggle"
      @open="handleOpen"
      @close="handleClose"
    >
      <li><button @click="downloadDocument">Download</button></li>
      <li><button @click="printDocument">Print</button></li>
      <li><button @click="shareDocument">Share</button></li>
      <li><button @click="exportDocument">Export as PDF</button></li>
    </fds-overflow-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FdsOverflowMenu } from '@madsb/dkfds-vue3'

const menuState = ref(false)

const handleToggle = (isOpen) => {
  menuState.value = isOpen
}

const handleOpen = () => {
  console.log('Menu opened')
  // Track analytics, load dynamic content, etc.
}

const handleClose = () => {
  console.log('Menu closed')
}

// Action handlers
const downloadDocument = () => {
  console.log('Downloading document...')
}

const printDocument = () => {
  console.log('Printing document...')
}

const shareDocument = () => {
  console.log('Sharing document...')
}

const exportDocument = () => {
  console.log('Exporting as PDF...')
}
</script>
```

## Accessibility

The FdsOverflowMenu component follows WCAG 2.1 AA accessibility standards:

### Keyboard Navigation
- **Space/Enter**: Opens/closes the menu when button is focused
- **Escape**: Closes the menu and returns focus to the trigger button
- **Tab**: Moves focus to menu items when open

### ARIA Attributes
- `aria-expanded`: Indicates whether the menu is open or closed
- `aria-controls`: Associates the button with the menu it controls
- `aria-haspopup="true"`: Indicates the button opens a popup menu
- `aria-hidden`: Hides the menu from screen readers when closed

### Screen Reader Support
- Button has accessible text from the `header` prop
- Menu items are properly structured as list items
- Focus management ensures keyboard users can navigate effectively

### Best Practices
- Always provide meaningful `header` text for the menu button
- Use semantic HTML in menu items (`<a>` for navigation, `<button>` for actions)
- Consider adding `aria-label` for additional context when needed
- Ensure sufficient color contrast for menu items

## DKFDS Guidelines

This component implements the official DKFDS v11 overflow menu pattern:

### Design Standards
- Uses standard DKFDS button styling for the trigger
- Follows DKFDS spacing and typography conventions
- Supports both VirkDK and BorgerDK theme variants
- Implements correct visual hierarchy and grouping

### Behavior Requirements
- Click-outside-to-close functionality
- Proper keyboard interaction patterns
- Accessible focus management
- Standard DKFDS animation timing

### Usage Recommendations
- Use for secondary actions that don't fit in the main interface
- Limit menu items to maintain usability (typically 3-7 items)
- Group related actions using visual separators
- Consider menu positioning based on available screen space

## Related Components

- [FdsIkon](/components/layout/fds-ikon) - Used for menu button icons
- [FdsButton](/components/layout/fds-button) - Alternative for single actions
- [FdsDropdown](/components/input/fds-dropdown) - For form input selection
- [FdsStepper](/components/navigation/fds-stepper) - For step-by-step navigation
- [FdsMenu](/components/navigation/fds-menu) - For primary navigation menus

<!-- Verified against source code -->