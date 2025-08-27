---
title: FdsAccordion
description: Expandable/collapsible content panels with proper keyboard navigation and ARIA attributes
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [accordion, collapsible, expandable, content, navigation, accessibility]
---

# FdsAccordion

Accordion component implementing DKFDS v11 collapsible content specifications. Provides expandable and collapsible content panels with proper keyboard navigation and ARIA attributes for enhanced accessibility.

Accordions are ideal for organizing content into sections that users can selectively expand or collapse, reducing visual clutter while maintaining easy access to information.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsAccordion } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsAccordion header="Show more information">
    Detailed content that can be expanded or collapsed.
  </FdsAccordion>
</template>

<script setup lang="ts">
import { FdsAccordion } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `header` | `string` | `undefined` | No | Accordion header text displayed as the clickable toggle button content |
| `modelValue` | `boolean` | `false` | No | Controlled expanded state - use with v-model for two-way binding |
| `headerTag` | `'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'` | No | Heading level for the accordion header |
| `variant` | `'success' \| 'warning' \| 'error' \| null` | `null` | No | Status variant for displaying status icons |
| `variantText` | `string` | `undefined` | No | Text to display alongside variant icon |
| `id` | `string` | `undefined` | No | Unique ID for the accordion (auto-generated if not provided) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when expanded state changes (for v-model support) |
| `fds.accordion.open` | `void` | Emitted when accordion opens (DKFDS v11 specification) |
| `fds.accordion.close` | `void` | Emitted when accordion closes (DKFDS v11 specification) |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `header` | `none` | Custom header content with formatting support |
| `default` | `none` | Accordion panel content |

## Usage Examples

### Basic Accordion

```vue
<template>
  <FdsAccordion 
    v-model="isExpanded"
    header="Frequently Asked Questions"
  >
    <p>
      Her finder du svar på de mest almindelige spørgsmål om vores tjeneste.
    </p>
    <ul>
      <li>Hvordan registrerer jeg mig?</li>
      <li>Hvor finder jeg mine oplysninger?</li>
      <li>Hvem kan jeg kontakte for hjælp?</li>
    </ul>
  </FdsAccordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsAccordion } from '@madsb/dkfds-vue3'

const isExpanded = ref(false)
</script>
```

### Accordion with Custom Header

```vue
<template>
  <FdsAccordion v-model="expanded" header-tag="h3">
    <template #header>
      <span>
        Personoplysninger
        <strong>(valgfrit)</strong>
      </span>
    </template>
    
    <div>
      <p>
        Her kan du indtaste dine personlige oplysninger, som vil hjælpe os 
        med at give dig en bedre service.
      </p>
      <p>
        Alle oplysninger behandles fortroligt i henhold til GDPR.
      </p>
    </div>
  </FdsAccordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsAccordion } from '@madsb/dkfds-vue3'

const expanded = ref(false)
</script>
```

### Accordion with Status Variants

```vue
<template>
  <div class="space-y-4">
    <!-- Success variant -->
    <FdsAccordion 
      v-model="successExpanded"
      header="Ansøgning godkendt"
      variant="success"
      variant-text="Behandlet"
    >
      <p>
        Din ansøgning er blevet godkendt og behandlet. Du vil modtage 
        bekræftelse på e-mail inden for 2-3 hverdage.
      </p>
    </FdsAccordion>

    <!-- Warning variant -->
    <FdsAccordion 
      v-model="warningExpanded"
      header="Manglende dokumentation"
      variant="warning"
      variant-text="2 dokumenter"
    >
      <p>
        Vi mangler følgende dokumenter for at kunne behandle din ansøgning:
      </p>
      <ul>
        <li>Kopi af ID-kort eller pas</li>
        <li>Dokumentation for indkomst</li>
      </ul>
    </FdsAccordion>

    <!-- Error variant -->
    <FdsAccordion 
      v-model="errorExpanded"
      header="Fejl i ansøgning"
      variant="error"
    >
      <p>
        Der er fundet fejl i din ansøgning, som skal rettes før vi kan 
        behandle den videre.
      </p>
    </FdsAccordion>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsAccordion } from '@madsb/dkfds-vue3'

const successExpanded = ref(false)
const warningExpanded = ref(false)
const errorExpanded = ref(false)
</script>
```

### Controlled Accordion with Event Handling

```vue
<template>
  <div>
    <FdsAccordion 
      v-model="controlledExpanded"
      header="Kontrolleret accordion"
      @update:modelValue="handleToggle"
      @fds.accordion.open="handleOpen"
      @fds.accordion.close="handleClose"
    >
      <p>
        Dette accordion er kontrolleret via v-model og events.
        Status: {{ controlledExpanded ? 'Åben' : 'Lukket' }}
      </p>
    </FdsAccordion>
    
    <div class="mt-4">
      <button 
        @click="controlledExpanded = !controlledExpanded"
        class="button button-primary"
      >
        {{ controlledExpanded ? 'Luk' : 'Åbn' }} accordion
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsAccordion } from '@madsb/dkfds-vue3'

const controlledExpanded = ref(false)

const handleToggle = (isExpanded: boolean) => {
  console.log('Accordion toggled:', isExpanded)
}

const handleOpen = () => {
  console.log('Accordion opened')
}

const handleClose = () => {
  console.log('Accordion closed')
}
</script>
```

### Within Accordion Group

```vue
<template>
  <FdsAccordionGroup>
    <FdsAccordion header="Sektion 1: Grundoplysninger">
      <p>Indhold for grundoplysninger...</p>
    </FdsAccordion>
    
    <FdsAccordion header="Sektion 2: Kontaktinformation">
      <p>Indhold for kontaktinformation...</p>
    </FdsAccordion>
    
    <FdsAccordion 
      header="Sektion 3: Yderligere oplysninger"
      variant="warning"
      variant-text="Valgfrit"
    >
      <p>Valgfrit indhold...</p>
    </FdsAccordion>
  </FdsAccordionGroup>
</template>

<script setup lang="ts">
import { FdsAccordion, FdsAccordionGroup } from '@madsb/dkfds-vue3'
</script>
```

## Accessibility

The FdsAccordion component implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### ARIA Implementation

- **`aria-expanded`**: Indicates whether the accordion panel is expanded (`true`) or collapsed (`false`)
- **`aria-controls`**: Associates the button with the panel it controls via unique IDs
- **`aria-hidden`**: Applied to collapsed panels to hide them from screen readers

### Keyboard Navigation

The accordion supports full keyboard navigation:

| Key | Action |
|-----|--------|
| `Enter` | Toggle accordion expand/collapse state |
| `Space` | Toggle accordion expand/collapse state |
| `Tab` | Move focus to next focusable element |
| `Shift + Tab` | Move focus to previous focusable element |

### Screen Reader Support

- Accordion headers are properly announced with their heading level
- Expanded/collapsed state is announced when changed
- Panel content is only available to screen readers when expanded
- Status variants are announced with their associated text

### Focus Management

- Clear focus indicators on interactive elements
- Logical tab order through accordion controls
- Focus remains on trigger button after activation

## Animation and Transition Behavior

The accordion implements smooth transitions following DKFDS specifications:

- **Expand**: Content slides down with easing animation
- **Collapse**: Content slides up with easing animation
- **Duration**: Transitions follow DKFDS timing specifications
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preference

## Integration within FdsAccordionGroup

When used within an FdsAccordionGroup, the accordion:

- Registers itself with the parent group for coordinated state management
- Participates in bulk expand/collapse operations
- Maintains proper list structure with `<ul>` and `<li>` elements
- Coordinates with sibling accordions for enhanced user experience

See the [FdsAccordionGroup documentation](./fds-accordion-group.md) for more details.

## DKFDS Guidelines

This component follows DKFDS v11 specifications for accordion components:

### Visual Design

- Uses standard DKFDS accordion button styling
- Implements proper spacing and typography
- Supports DKFDS color tokens and design system
- Maintains visual consistency across VirkDK and BorgerDK themes

### Interaction Patterns

- Click/tap to expand or collapse content
- Visual indicators show current state (chevron rotation)
- Status variants display appropriate icons and text
- Smooth animations enhance user experience

### Content Structure

- Semantic heading structure with configurable levels
- Proper list markup when used in groups
- Accessible content organization
- Support for rich content including forms and media

### Best Practices

- Use descriptive header text that clearly indicates content
- Group related accordions using FdsAccordionGroup
- Consider information hierarchy when setting heading levels
- Use status variants to communicate important state information
- Limit accordion nesting to maintain usability

## Related Components

- **[FdsAccordionGroup](./fds-accordion-group.md)**: Container for managing multiple accordions with bulk controls
- **[FdsDetaljer](./fds-detaljer.md)**: Similar collapsible content with different visual styling
- **[FdsModal](../feedback/fds-modal.md)**: For content that should overlay the page
- **[FdsFaneblade](../navigation/fds-faneblade.md)**: For switching between different content panels

<!-- Verified against source -->