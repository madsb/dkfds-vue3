---
title: fds-icon-collection
description: Icon collection providing DKFDS v11 Material Design icon symbol definitions
category: layout
dkfds: true
accessibility: WCAG 2.1 AA
tags: icons, svg, symbols, design-system, accessibility
---

# fds-icon-collection

Icon collection component providing DKFDS v11 Material Design icon definitions. Contains all SVG symbol definitions for the DKFDS icon set that can be referenced by the `fds-ikon` component throughout your application.

<!-- Verified against source -->

## Installation

The `fds-icon-collection` component is available as part of the DKFDS Vue 3 component library.

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

Include the icon collection once in your application root to make all icons available:

```vue
<template>
  <div id="app">
    <fds-icon-collection />
    <!-- Rest of your app -->
    <main>
      <fds-ikon icon="home" />
      <fds-ikon icon="settings" />
    </main>
  </div>
</template>

<script setup>
import { FdsIconCollection, FdsIkon } from '@madsb/dkfds-vue3'
</script>
```

## Props

This component has no props - it provides static SVG symbol definitions.

## Events

This component emits no events.

## Slots

This component has no slots.

## Available Icons

The icon collection contains **151 icons** from the DKFDS Material Design icon set:

### Navigation Icons
- `arrow-back`, `arrow-forward`, `arrow-upward`, `arrow-downward`
- `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- `chevron-double-left`, `chevron-double-right`
- `first-page`, `last-page`
- `subdirectory-arrow-left`, `subdirectory-arrow-right`

### Action Icons
- `add-a-photo`, `add-document`
- `copy`, `delete`, `edit`
- `download`, `download-done`, `upload`
- `print`, `save`, `share`
- `search`, `zoom-in`, `zoom-out`
- `refresh`, `sync`

### Content Icons
- `bookmark`, `bookmarks`
- `document`, `folder`, `folder-open`
- `file`, `file-excel`, `file-image`, `file-pdf`, `file-word`
- `create-new-folder`

### Communication Icons
- `chat`, `email`, `forum`
- `contact-card`, `contact-info`, `contact-support`
- `feedback`, `reply`, `send`
- `notifications`

### User & Account Icons
- `account`, `person`, `persons`, `groups`
- `person-add`, `person-remove`
- `contact-card`, `how-to-reg`

### Status & Feedback Icons
- `check`, `close`, `success`, `error`, `warning`, `info`
- `star`, `star-fill`, `flag`, `flag-fill`
- `help`, `support-agent`

### System & Interface Icons
- `home`, `menu`, `settings`, `tune`
- `apps`, `more-horiz`, `more-vert`
- `fullscreen`, `fullscreen-exit`
- `visibility`, `visibility-off`
- `lock`, `language`

### Device & Technology Icons
- `desktop`, `laptop`, `smartphone`
- `photo-camera`, `videocam`
- `mouse`, `headset`

### Business & Work Icons
- `business`, `analytics`, `assignment`
- `calculator`, `calendar-month`
- `credit-card`, `payments`, `shopping-cart`
- `engineering`, `science`, `construction`

### Format & Edit Icons
- `format-align-left`, `format-align-center`, `format-align-right`, `format-align-justify`
- `format-bold`, `format-italic`, `format-underlined`
- `format-list-bulleted`, `format-list-numbered`
- `format-indent-increase`, `format-indent-decrease`
- `format-color-text`, `format-color-fill`, `format-clear`

### List & Data Icons
- `list-add`, `list-bulleted`, `list-check`
- `checklist`, `summary`
- `sort-default`, `sort-ascending`, `sort-descending`
- `sort-table-ascending`, `sort-table-descending`, `sort-table-none`
- `sort-by-alpha`

### Location & Transport Icons
- `location`, `map`
- `car`, `truck`, `tractor`

### Specialized Icons
- `accessibility-new`, `coronavirus`
- `database`, `drag-pan`
- `hourglass`, `time`
- `palette`, `trainee`, `student`

## Usage Examples

### Basic Setup

```vue
<template>
  <div id="app">
    <!-- Include icon collection once at app root -->
    <fds-icon-collection />
    
    <header>
      <nav>
        <fds-ikon icon="menu" />
        <h1>Min Selvbetjening</h1>
        <fds-ikon icon="account" />
      </nav>
    </header>
    
    <main>
      <section>
        <h2>
          <fds-ikon icon="home" />
          Forside
        </h2>
      </section>
    </main>
  </div>
</template>

<script setup>
import { FdsIconCollection, FdsIkon } from '@madsb/dkfds-vue3'
</script>
```

### With Different Icon Types

```vue
<template>
  <div>
    <fds-icon-collection />
    
    <!-- Status indicators -->
    <div class="status-messages">
      <div class="success-message">
        <fds-ikon icon="check" />
        Handling gennemført
      </div>
      <div class="warning-message">
        <fds-ikon icon="warning" />
        Kontroller dine oplysninger
      </div>
      <div class="error-message">
        <fds-ikon icon="error" />
        Der opstod en fejl
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="breadcrumb">
      <a href="#"><fds-ikon icon="home" /> Forside</a>
      <fds-ikon icon="chevron-right" />
      <a href="#">Selvbetjening</a>
      <fds-ikon icon="chevron-right" />
      <span>Ansøgning</span>
    </nav>
    
    <!-- Actions -->
    <div class="actions">
      <button>
        <fds-ikon icon="download" />
        Download PDF
      </button>
      <button>
        <fds-ikon icon="print" />
        Udskriv
      </button>
      <button>
        <fds-ikon icon="share" />
        Del
      </button>
    </div>
  </div>
</template>
```

### Performance Optimization

The icon collection uses SVG symbols for optimal performance:

```vue
<template>
  <!-- Good: Icons load once, referenced multiple times -->
  <div id="app">
    <fds-icon-collection />
    
    <!-- All these icons reference the same symbol definitions -->
    <fds-ikon icon="home" />
    <fds-ikon icon="home" />
    <fds-ikon icon="home" />
  </div>
</template>
```

## Integration with fds-ikon

The icon collection works seamlessly with the `fds-ikon` component:

```vue
<template>
  <div>
    <fds-icon-collection />
    
    <!-- Basic decorative icon -->
    <fds-ikon icon="settings" />
    
    <!-- Meaningful icon with accessibility -->
    <fds-ikon 
      icon="warning" 
      :decorative="false"
      aria-label="Advarsel: Denne handling kan ikke fortrydes"
    />
    
    <!-- Inline icon with text -->
    <p>
      <fds-ikon icon="check" :inline="true" />
      Opgave gennemført
    </p>
  </div>
</template>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **SVG Structure**: Uses proper SVG symbol definitions with semantic markup
- **Screen Reader Support**: Icons are referenced through `fds-ikon` which handles accessibility attributes
- **Performance**: Symbol definitions load once, improving page performance for users with slow connections
- **Scalability**: Vector icons scale without quality loss, supporting users who zoom content

### Best Practices

1. **Single Instance**: Include `fds-icon-collection` only once in your application root
2. **Icon Usage**: Always use `fds-ikon` component to reference icons, not direct symbol access
3. **Accessibility**: Set `decorative="false"` and provide `aria-label` for meaningful icons
4. **Performance**: The collection provides all icons upfront for optimal caching

## DKFDS Guidelines

### Design System Compliance

- **Icon Set**: Uses official DKFDS v11 Material Design icons
- **Consistency**: All icons follow consistent design language and sizing
- **Government Standards**: Complies with Danish government design system requirements
- **Accessibility**: Meets Danish accessibility standards for digital services

### Implementation Standards

- **Symbol Format**: Uses SVG symbols for optimal browser support and performance
- **Naming Convention**: Icon names follow DKFDS naming standards
- **Version Alignment**: Icons are synchronized with DKFDS v11 specifications
- **Quality Assurance**: All icons tested for clarity at different sizes and contexts

## Related Components

- **[fds-ikon](./fds-ikon)** - Individual icon component that references these symbol definitions
- **[fds-button](../input/fds-button)** - Button component that commonly uses icons
- **fds-navigation** - Navigation components that utilize directional icons
- **fds-alert** - Alert components that use status icons

## Technical Notes

- **File Size**: The complete icon collection is optimized for web delivery
- **Browser Support**: SVG symbols work in all modern browsers
- **Lazy Loading**: Not applicable - icons should be available immediately
- **Customization**: Icon collection provides standard DKFDS icons; custom icons should be added separately
- **Build Integration**: The component tree-shakes unused icons when using modern build tools

This component is essential for any DKFDS Vue 3 application using icons and should be included once at the application root level.