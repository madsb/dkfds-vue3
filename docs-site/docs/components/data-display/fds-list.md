---
title: FdsList
description: Flexible list container supporting both ordered and unordered lists with multiple visual variants for different design contexts
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [list, content, organization, semantic, accessible]
---

# FdsList

Flexible list container supporting both ordered and unordered lists with multiple visual variants for different design contexts. Provides semantic HTML structure with accessible styling options for content organization and display.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsList, FdsListItem } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsList>
    <FdsListItem>Første punkt</FdsListItem>
    <FdsListItem>Andet punkt</FdsListItem>
    <FdsListItem>Tredje punkt</FdsListItem>
  </FdsList>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| variant | `'bordered' \| 'unstyled' \| 'nobullet' \| 'overflow' \| null` | `null` | No | Visual variant controlling list appearance and behavior |
| ordered | `boolean` | `false` | No | Whether to render as ordered list (ol) with numbering or unordered list (ul) |
| noTopMargin | `boolean` | `false` | No | Remove top margin for tight layouts or custom spacing control |
| noBottomMargin | `boolean` | `false` | No | Remove bottom margin for tight layouts or custom spacing control |

### Variant Options

- **`'bordered'`**: Adds borders between list items for structured content
- **`'unstyled'`**: Removes default list styling for custom designs
- **`'nobullet'`**: Removes bullets/numbers while maintaining list semantics
- **`'overflow'`**: Optimized for dropdown and overflow menu contexts

## Events

This component does not emit custom events. Standard HTML events are available through `v-bind="$attrs"`.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| default | - | List item content, typically `FdsListItem` components |

## Usage Examples

### Basic Unordered List

```vue
<template>
  <FdsList>
    <FdsListItem>Ansøg om børnepenge</FdsListItem>
    <FdsListItem>Skift adresse</FdsListItem>
    <FdsListItem>Tilmeld dig borger.dk</FdsListItem>
  </FdsList>
</template>
```

### Ordered List with Numbering

```vue
<template>
  <FdsList :ordered="true">
    <FdsListItem>Udfyld ansøgningsformularen</FdsListItem>
    <FdsListItem>Upload nødvendige dokumenter</FdsListItem>
    <FdsListItem>Send ansøgningen</FdsListItem>
    <FdsListItem>Vent på sagsbehandling</FdsListItem>
  </FdsList>
</template>
```

### Bordered List for Structured Content

```vue
<template>
  <FdsList variant="bordered">
    <FdsListItem>
      <strong>Digital Post:</strong> Modtag post digitalt på borger.dk
    </FdsListItem>
    <FdsListItem>
      <strong>NemID:</strong> Log ind sikkert med dit NemID
    </FdsListItem>
    <FdsListItem>
      <strong>Mit Overblik:</strong> Se alle dine sager ét sted
    </FdsListItem>
  </FdsList>
</template>
```

### Unstyled List for Custom Designs

```vue
<template>
  <FdsList variant="unstyled" :no-top-margin="true">
    <FdsListItem>
      <div class="custom-card">
        <h3>Borger.dk</h3>
        <p>Portal for borgere</p>
      </div>
    </FdsListItem>
    <FdsListItem>
      <div class="custom-card">
        <h3>Virk.dk</h3>
        <p>Portal for virksomheder</p>
      </div>
    </FdsListItem>
  </FdsList>
</template>
```

### No-bullet List for Clean Layouts

```vue
<template>
  <FdsList variant="nobullet">
    <FdsListItem>
      <a href="/selvbetjening">Selvbetjeningsløsninger</a>
    </FdsListItem>
    <FdsListItem>
      <a href="/kontakt">Kontakt os</a>
    </FdsListItem>
    <FdsListItem>
      <a href="/hjaelp">Hjælp og support</a>
    </FdsListItem>
  </FdsList>
</template>
```

### Overflow List for Menus

```vue
<template>
  <FdsList variant="overflow">
    <FdsListItem>
      <button type="button">Rediger profil</button>
    </FdsListItem>
    <FdsListItem>
      <button type="button">Indstillinger</button>
    </FdsListItem>
    <FdsListItem>
      <button type="button">Log ud</button>
    </FdsListItem>
  </FdsList>
</template>
```

### Complex List with Navigation States

```vue
<template>
  <FdsList variant="nobullet">
    <FdsListItem>
      <a href="/services">Alle services</a>
    </FdsListItem>
    <FdsListItem variant="current">
      <span>Min side</span>
    </FdsListItem>
    <FdsListItem>
      <a href="/messages">Beskeder</a>
    </FdsListItem>
    <FdsListItem variant="disabled">
      <span>Kommende funktion</span>
    </FdsListItem>
  </FdsList>
</template>
```

### List with Flex Layout Items

```vue
<template>
  <FdsList variant="bordered">
    <FdsListItem :flex="true" :justify-between="true">
      <div>
        <strong>Ansøgning om SU</strong>
        <div class="text-muted">Indsendt 15. marts 2024</div>
      </div>
      <FdsBadge variant="success">Godkendt</FdsBadge>
    </FdsListItem>
    <FdsListItem :flex="true" :justify-between="true">
      <div>
        <strong>Ændring af adresse</strong>
        <div class="text-muted">Indsendt 10. marts 2024</div>
      </div>
      <FdsBadge variant="warning">Under behandling</FdsBadge>
    </FdsListItem>
  </FdsList>
</template>
```

### Margin Control Examples

```vue
<template>
  <!-- List in card without extra margins -->
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Seneste aktivitet</h3>
      <FdsList :no-top-margin="true" :no-bottom-margin="true">
        <FdsListItem>Log ind på borger.dk</FdsListItem>
        <FdsListItem>Læs digital post</FdsListItem>
        <FdsListItem>Opdater kontaktoplysninger</FdsListItem>
      </FdsList>
    </div>
  </div>
</template>
```

## Integration with FdsListItem

The `FdsList` component is designed to work seamlessly with `FdsListItem`:

```vue
<template>
  <FdsList variant="bordered">
    <!-- Standard list item -->
    <FdsListItem>
      Almindeligt listepunkt
    </FdsListItem>
    
    <!-- Active list item -->
    <FdsListItem variant="active">
      Aktivt listepunkt
    </FdsListItem>
    
    <!-- Current page indicator -->
    <FdsListItem variant="current">
      Nuværende side
    </FdsListItem>
    
    <!-- Disabled list item -->
    <FdsListItem variant="disabled">
      Deaktiveret punkt
    </FdsListItem>
    
    <!-- Flex layout item -->
    <FdsListItem :flex="true" :justify-between="true">
      <span>Fleksibel layout</span>
      <FdsButton size="small">Handling</FdsButton>
    </FdsListItem>
  </FdsList>
</template>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Semantic Structure**: Uses proper `<ul>` or `<ol>` elements for screen reader navigation
- **Keyboard Navigation**: Supports standard list navigation patterns
- **Focus Management**: Maintains logical focus order within list items
- **Screen Reader Support**: Provides meaningful list structure and item count

### Accessibility Features

- Proper list semantics with `<ul>` and `<ol>` elements
- Screen reader announcement of list type and item count
- Support for ARIA roles through `FdsListItem` component
- Keyboard navigation support for interactive list items
- High contrast mode compatibility

### Usage Guidelines

```vue
<!-- Good: Semantic list structure -->
<FdsList :ordered="true">
  <FdsListItem>Trin 1: Forbered dokumenter</FdsListItem>
  <FdsListItem>Trin 2: Udfyld formular</FdsListItem>
</FdsList>

<!-- Good: Navigation list with proper semantics -->
<FdsList variant="nobullet" role="navigation" aria-label="Hovedmenu">
  <FdsListItem>
    <a href="/home">Forside</a>
  </FdsListItem>
  <FdsListItem>
    <a href="/services">Services</a>
  </FdsListItem>
</FdsList>

<!-- Good: Custom role when removing list semantics -->
<FdsList variant="unstyled">
  <FdsListItem role="none">
    <div class="custom-card">Brugerdefineret kort</div>
  </FdsListItem>
</FdsList>
```

## DKFDS Guidelines

### Design Principles

Following DKFDS v11 specifications for list components:

- **Semantic HTML**: Always use proper list elements (`ul`, `ol`, `li`)
- **Visual Hierarchy**: Clear distinction between different list types
- **Consistent Spacing**: Standard margins and padding following design system
- **Responsive Design**: Lists adapt to different screen sizes
- **Accessibility First**: All list variants maintain semantic meaning

### Visual Variants

1. **Default Lists**: Standard bullet or numbered lists for general content
2. **Bordered Lists**: Structured lists with clear separation for detailed information
3. **Unstyled Lists**: Clean lists for custom styling and card-based layouts
4. **No-bullet Lists**: Navigation lists without visual bullets
5. **Overflow Lists**: Compact lists optimized for dropdown menus

### Content Guidelines

- Use ordered lists for sequential or prioritized content
- Use unordered lists for related but non-sequential items
- Keep list items concise and scannable
- Maintain consistent content structure across list items
- Use proper heading hierarchy when lists contain headings

## Related Components

- **[FdsListItem](/components/data-display/fds-list-item)** - Individual list item with state variants
- **[FdsAccordion](/components/data-display/fds-accordion)** - Expandable content sections
- **[FdsMenu](/components/navigation/fds-menu)** - Navigation menu with list structure
- **[FdsOverflowMenu](/components/navigation/fds-overflow-menu)** - Dropdown menu using list structure

<!-- Verified against source -->