---
title: FdsListItem
description: Individual list item element designed to work with FdsList parent component with flexible styling options for different states and layout configurations
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [list, item, navigation, content, semantic]
---

# FdsListItem

Individual list item element designed to work with FdsList parent component. Provides semantic markup with flexible styling options for different states and layout configurations. Supports accessibility roles and visual variants.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsList>
    <FdsListItem>Standard list item</FdsListItem>
    <FdsListItem variant="active">Active item</FdsListItem>
    <FdsListItem variant="disabled">Disabled item</FdsListItem>
  </FdsList>
</template>

<script setup>
import { FdsList, FdsListItem } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'current' \| 'active' \| 'disabled'` | `undefined` | No | Visual variant indicating the item's state or importance |
| `role` | `'none'` | `undefined` | No | ARIA role for accessibility customization |
| `flex` | `boolean` | `false` | No | Apply flexbox layout to the list item |
| `justifyBetween` | `boolean` | `false` | No | Apply justify-content-between for flex items (only effective when flex is true) |

### Variant Options

- **`current`**: Indicates the current page/section in navigation
- **`active`**: Highlights an active/selected item
- **`disabled`**: Shows an inactive/unavailable item

## Events

This component does not emit any custom events.

## Slots

| Slot | Slot Props | Description |
|------|-----------|-------------|
| `default` | None | Main content of the list item |

## Usage Examples

### Basic List Items

```vue
<template>
  <FdsList>
    <FdsListItem>Borgere og familier</FdsListItem>
    <FdsListItem>Virksomheder</FdsListItem>
    <FdsListItem>Myndigheder</FdsListItem>
    <FdsListItem>International</FdsListItem>
  </FdsList>
</template>
```

### Navigation with Current State

```vue
<template>
  <FdsList variant="nobullet">
    <FdsListItem>
      <a href="/hjem">Hjem</a>
    </FdsListItem>
    <FdsListItem variant="current">
      <span>Aktuel side</span>
    </FdsListItem>
    <FdsListItem>
      <a href="/kontakt">Kontakt</a>
    </FdsListItem>
    <FdsListItem variant="disabled">
      <span>Ikke tilgængelig</span>
    </FdsListItem>
  </FdsList>
</template>
```

### Flex Layout for Complex Content

```vue
<template>
  <FdsList variant="bordered">
    <FdsListItem :flex="true" :justify-between="true">
      <span>Ansøgning om pas</span>
      <FdsBadge variant="info">Under behandling</FdsBadge>
    </FdsListItem>
    <FdsListItem :flex="true" :justify-between="true">
      <span>Skatteopgørelse 2023</span>
      <FdsButton size="small">Download</FdsButton>
    </FdsListItem>
    <FdsListItem :flex="true" :justify-between="true">
      <span>Borger.dk profil</span>
      <span class="text-muted">Opdateret</span>
    </FdsListItem>
  </FdsList>
</template>
```

### Custom Content Layout

```vue
<template>
  <FdsList variant="unstyled">
    <FdsListItem role="none">
      <div class="custom-card p-3 border rounded">
        <h4>Specialiseret indhold</h4>
        <p>Dette element bruger ikke standard liste-semantik</p>
      </div>
    </FdsListItem>
    <FdsListItem role="none">
      <div class="custom-card p-3 border rounded">
        <h4>Andet brugerdefineret indhold</h4>
        <p>Med kompleks struktur</p>
      </div>
    </FdsListItem>
  </FdsList>
</template>
```

### Status Variants in Action Lists

```vue
<template>
  <FdsList variant="bordered">
    <FdsListItem>
      <strong>Almindelig opgave</strong><br>
      <small class="text-muted">Klar til behandling</small>
    </FdsListItem>
    <FdsListItem variant="active">
      <strong>Aktiv opgave</strong><br>
      <small class="text-muted">I gang</small>
    </FdsListItem>
    <FdsListItem variant="current">
      <strong>Nuværende opgave</strong><br>
      <small class="text-muted">Fokuseret</small>
    </FdsListItem>
    <FdsListItem variant="disabled">
      <strong>Deaktiveret opgave</strong><br>
      <small class="text-muted">Ikke tilgængelig</small>
    </FdsListItem>
  </FdsList>
</template>
```

## Visual Styling and Layout Options

### Standard List Item
- Default semantic `<li>` element
- Inherits styling from parent FdsList component
- Maintains proper list semantics

### Variant Styling
- **Current**: Indicates current page/section with distinctive styling
- **Active**: Highlights selected or active items
- **Disabled**: Visual indication of unavailable items

### Flex Layout Options
- **Flex**: Applies `d-flex` class for flexible content arrangement
- **Justify Between**: Distributes content to opposite ends when flex is enabled
- Supports complex content layouts within list items

## Accessibility

### WCAG 2.1 AA Compliance

- **Semantic Structure**: Proper `<li>` element maintains list semantics
- **Role Customization**: Support for `role="none"` to remove list semantics when needed
- **Keyboard Navigation**: Inherits keyboard accessibility from parent list
- **Screen Reader Support**: Proper semantic markup for assistive technologies

### Accessibility Features

```vue
<!-- Proper list semantics -->
<FdsList>
  <FdsListItem>Maintains semantic structure</FdsListItem>
</FdsList>

<!-- Custom layout without list semantics -->
<FdsList variant="unstyled">
  <FdsListItem role="none">
    <div>Custom content structure</div>
  </FdsListItem>
</FdsList>
```

## Integration within FdsList Components

FdsListItem is designed to work seamlessly with FdsList parent components:

### Compatible List Variants
- **Standard**: Default bullet or numbered lists
- **Nobullet**: Clean lists without bullets
- **Bordered**: Items with visual borders
- **Unstyled**: Minimal styling for custom designs

### Parent-Child Relationship
```vue
<template>
  <!-- Parent provides list context -->
  <FdsList variant="bordered" :ordered="false">
    <!-- Children provide individual item content -->
    <FdsListItem variant="current">Aktuel element</FdsListItem>
    <FdsListItem :flex="true" :justify-between="true">
      <span>Element med layout</span>
      <FdsButton size="small">Handling</FdsButton>
    </FdsListItem>
  </FdsList>
</template>
```

## Semantic HTML Structure

The component generates clean, semantic HTML:

```html
<!-- Standard list item -->
<li>Content</li>

<!-- List item with variant -->
<li class="active">Content</li>

<!-- Flex layout list item -->
<li class="d-flex justify-content-between">Content</li>

<!-- Custom role list item -->
<li role="none">Content</li>
```

## DKFDS Guidelines

### DKFDS v11 List Item Specifications

- **Semantic Markup**: Uses proper `<li>` elements within list contexts
- **Visual Consistency**: Supports standard DKFDS list styling variants
- **State Indication**: Clear visual states for current, active, and disabled items
- **Layout Flexibility**: Supports both simple content and complex flex layouts
- **Accessibility First**: Maintains proper semantics while allowing customization

### Design System Integration

- Inherits spacing and typography from DKFDS design tokens
- Supports theme variations (VirkDK/BorgerDK)
- Consistent with DKFDS component patterns
- Follows Danish government digital service standards

### Best Practices

1. **Always use within FdsList**: Designed for parent list context
2. **Semantic roles**: Use `role="none"` only when removing list semantics intentionally
3. **Content structure**: Keep content simple unless using flex layout
4. **Accessibility**: Consider screen reader users when customizing roles
5. **State management**: Use variants to indicate item states clearly

## Related Components

- **[FdsList](/components/data-display/fds-list)**: Parent list container component
- **[FdsAccordion](/components/data-display/fds-accordion)**: For expandable content organization
- **[FdsCard](/components/data-display/fds-card)**: For card-based content presentation

<!-- Verified against source -->