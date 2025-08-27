---
title: FdsFunktionslink
description: Versatile link/button component that automatically adapts between anchor and button elements based on props. Supports icons, accessibility attributes, and various link behaviors for functional actions.
category: layout
dkfds: true
accessibility: WCAG 2.1 AA
tags: [link, button, functional, navigation, icon, adaptive]
---

# FdsFunktionslink

Versatile link/button component that automatically adapts between anchor and button elements based on props. Supports icons, accessibility attributes, and various link behaviors. Used for functional actions that may or may not navigate to different pages. Auto-detects element type: provides href for links, omit href for buttons.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <!-- Basic function link -->
  <fds-funktionslink href="/help">
    Get Help
  </fds-funktionslink>

  <!-- Button with icon -->
  <fds-funktionslink 
    type="button"
    icon="download"
    @click="downloadFile"
  >
    Download
  </fds-funktionslink>
</template>

<script setup>
import { FdsFunktionslink } from '@madsb/dkfds-vue3'

const downloadFile = () => {
  console.log('Downloading file...')
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `icon` | `string` | `undefined` | No | Icon identifier from DKFDS icon set. Material Design icon name to display alongside the text. |
| `iconRight` | `boolean` | `false` | No | Position icon on the right side of text. When true, icon appears after text instead of before. |
| `href` | `string` | `undefined` | No | URL for link navigation. When provided, component renders as anchor element. Omit for button behavior. |
| `type` | `'link' \| 'button'` | `undefined` | No | Element type - auto-detected from href if not specified. Forces specific element type. Auto-detection: href provided = 'link', no href = 'button'. |
| `title` | `string` | `undefined` | No | Title attribute for accessibility. Provides additional context or explains the link/button purpose for assistive technology. |
| `disabled` | `boolean` | `false` | No | Disabled state (only for button type). Prevents interaction when component is rendered as button. |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` | No | Target attribute for links. Controls where the linked document opens. Use '_blank' for new window/tab. |
| `rel` | `string` | `undefined` | No | Rel attribute for links. Security and SEO attributes for links, especially external ones. Use 'noopener noreferrer' for external links with target='_blank'. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the link or button is clicked. Fired for both anchor and button variants. For buttons without href, default behavior is prevented automatically. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | The main content of the function link (text, HTML, or other components). |

## Usage Examples

### Basic Function Links

```vue
<template>
  <!-- Simple text link -->
  <fds-funktionslink href="/help">
    Get Help
  </fds-funktionslink>

  <!-- Link with icon -->
  <fds-funktionslink href="/contact" icon="email">
    Contact Us
  </fds-funktionslink>

  <!-- Link with icon on right -->
  <fds-funktionslink 
    href="/external-site" 
    icon="open-in-new" 
    icon-right
  >
    Visit External Site
  </fds-funktionslink>
</template>
```

### Button Functionality

```vue
<template>
  <!-- Button without href (auto-detected) -->
  <fds-funktionslink @click="handleAction">
    Perform Action
  </fds-funktionslink>

  <!-- Explicitly typed button -->
  <fds-funktionslink 
    type="button"
    icon="print"
    @click="printDocument"
  >
    Print Document
  </fds-funktionslink>

  <!-- Disabled button -->
  <fds-funktionslink 
    type="button"
    :disabled="!canEdit"
    icon="edit"
    title="Edit is currently disabled"
    @click="editItem"
  >
    Edit Item
  </fds-funktionslink>
</template>

<script setup>
const canEdit = ref(false)

const handleAction = () => {
  console.log('Action performed')
}

const printDocument = () => {
  window.print()
}

const editItem = () => {
  if (canEdit.value) {
    console.log('Editing item...')
  }
}
</script>
```

### External Links with Security

```vue
<template>
  <!-- Secure external link -->
  <fds-funktionslink 
    href="https://external-site.com"
    target="_blank"
    rel="noopener noreferrer"
    icon="open-in-new"
    icon-right
  >
    External Resource
  </fds-funktionslink>

  <!-- Download link -->
  <fds-funktionslink 
    href="/files/document.pdf"
    target="_blank"
    icon="download"
    title="Download PDF document"
  >
    Download Document
  </fds-funktionslink>
</template>
```

### Danish Government Context Examples

```vue
<template>
  <!-- Service links -->
  <fds-funktionslink href="/ansog-om-borgerservice.dk" icon="account-circle">
    Ansøg om borgerservice.dk
  </fds-funktionslink>

  <fds-funktionslink href="/find-kommune" icon="place">
    Find din kommune
  </fds-funktionslink>

  <!-- Action buttons -->
  <fds-funktionslink 
    type="button"
    icon="file-download"
    @click="downloadBlanket"
  >
    Hent blanket
  </fds-funktionslink>

  <fds-funktionslink 
    type="button"
    icon="print"
    @click="printAnsogning"
  >
    Udskriv ansøgning
  </fds-funktionslink>
</template>
```

### With Complex Content

```vue
<template>
  <!-- Function link with structured content -->
  <fds-funktionslink href="/service-details">
    <div>
      <strong>Digital Post</strong>
      <br>
      <small>Modtag og send sikre meddelelser</small>
    </div>
  </fds-funktionslink>
</template>
```

## Accessibility

The `FdsFunktionslink` component implements WCAG 2.1 AA accessibility standards:

### Keyboard Navigation
- **Tab Navigation**: Component is included in tab order when focusable
- **Enter/Space Activation**: Both keys activate the link/button appropriately
- **Focus Indicators**: Visual focus indicators provided by DKFDS styles

### Screen Reader Support
- **Semantic Elements**: Uses appropriate `<a>` or `<button>` elements
- **ARIA Attributes**: Proper role and state information
- **Title Attribute**: Additional context via title prop
- **Disabled State**: Properly announced for button variants

### Auto-Detection Logic
The component intelligently determines the appropriate element type:
- **Link Behavior**: When `href` is provided, renders as `<a>` element
- **Button Behavior**: When `href` is omitted, renders as `<button>` element
- **Override**: Use `type` prop to force specific element type

### Best Practices
- Use `href` for navigation actions
- Use button behavior (no `href`) for in-page actions
- Provide `title` for additional context when needed
- Use `rel="noopener noreferrer"` for external links with `target="_blank"`
- Consider icon placement for optimal reading flow

## DKFDS Guidelines

This component follows DKFDS v11 specifications for funktionslink:

### Visual Design
- Uses DKFDS function-link styling and typography
- Consistent spacing and alignment with design system
- Proper icon integration with text content

### Behavior
- Auto-detection between link and button semantics
- Consistent interaction patterns across use cases
- Proper handling of disabled states

### Icon Integration
- Uses DKFDS Material Design icon set via `fds-ikon` component
- Icons are decorative by default for function links
- Proper icon positioning (left or right of text)

### Danish Language Support
- Optimized for Danish text content and government service patterns
- Follows DKFDS naming conventions and terminology

## TypeScript Interfaces

```typescript
export interface FdsFunktionslinkProps {
  /** Icon identifier from DKFDS icon set */
  icon?: string
  /** Position icon on the right side of text */
  iconRight?: boolean
  /** URL for link navigation */
  href?: string
  /** Element type - auto-detected from href if not specified */
  type?: 'link' | 'button'
  /** Title attribute for accessibility */
  title?: string
  /** Disabled state (only for button type) */
  disabled?: boolean
  /** Target attribute for links */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /** Rel attribute for links */
  rel?: string
}
```

## Related Components

- **[FdsButton](../input/fds-button.md)** - Primary action buttons with DKFDS styling
- **[FdsIkon](./fds-ikon.md)** - Icon component used internally
- **[FdsNavLink](../navigation/fds-nav-link.md)** - Navigation-specific links
- **[FdsTilbageLink](../navigation/fds-tilbage-link.md)** - Back navigation links

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/layout/fds-funktionslink.vue -->