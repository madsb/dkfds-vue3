---
title: FdsPre
description: Pre-formatted text component implementing DKFDS v11 code display specifications for technical documentation and data presentation
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [code, pre, json, formatting, monospace, technical, documentation]
---

# FdsPre

Pre-formatted text component implementing DKFDS v11 code display specifications. Displays formatted code, JSON, or pre-formatted text with proper monospace formatting and optional headers for context. Designed for technical documentation and data display with automatic JSON formatting and overflow handling.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <!-- Basic code display -->
  <FdsPre code="const hello = 'world';" header="JavaScript Example" />
  
  <!-- JSON formatting -->
  <FdsPre :json="userData" header="User Data" />
  
  <!-- Slot content -->
  <FdsPre header="Configuration">
    server:
      host: localhost
      port: 3000
  </FdsPre>
</template>

<script setup>
import { FdsPre } from '@madsb/dkfds-vue3'

const userData = {
  name: 'Anders',
  city: 'København',
  role: 'admin'
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `json` | `object \| null` | `null` | No | JavaScript object to display as formatted JSON. Automatically stringified with proper indentation. Takes precedence over code prop |
| `code` | `string \| null` | `null` | No | Raw code string to display with monospace formatting. Used when json prop is not provided |
| `header` | `string` | `undefined` | No | Optional header text displayed above the code block. Useful for providing context or identifying content type |

## Events

This component does not emit any events.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Pre-formatted content displayed when neither `json` nor `code` props are provided. Preserves whitespace and formatting |

## Usage Examples

### Basic Code Display

```vue
<template>
  <FdsPre 
    header="JavaScript Funktion"
    :code="jsCode" 
  />
</template>

<script setup>
const jsCode = `function beregnMoms(pris) {
  const momsSats = 0.25;
  return pris * momsSats;
}

// Eksempel på brug
const momsBeløb = beregnMoms(1000);
console.log('Moms:', momsBeløb); // 250`
</script>
```

### JSON Data Formatting

```vue
<template>
  <FdsPre 
    header="Brugerdata fra API"
    :json="brugerdata" 
  />
</template>

<script setup>
const brugerdata = {
  id: 12345,
  navn: "Mette Nielsen",
  email: "mette@borger.dk", 
  adresse: {
    vej: "Østergade 15",
    by: "Aarhus",
    postnummer: "8000"
  },
  roller: ["bruger", "administrator"],
  aktiv: true,
  oprettet: "2024-01-15T10:30:00Z"
}
</script>
```

### Configuration Files via Slot

```vue
<template>
  <FdsPre header="Nginx Konfiguration">
server {
    listen 80;
    server_name example.dk;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /static/ {
        alias /var/www/static/;
        expires 1y;
    }
}
  </FdsPre>
</template>
```

### CSS Styling Examples

```vue
<template>
  <FdsPre header="Responsive CSS">
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
        max-width: 100%;
    }
}

.card {
    background: var(--color-white);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
  </FdsPre>
</template>
```

### SQL Queries

```vue
<template>
  <FdsPre 
    header="Database Query"
    :code="sqlQuery"
  />
</template>

<script setup>
const sqlQuery = `SELECT 
    b.navn,
    b.email,
    b.oprettet,
    COUNT(o.id) as antal_ordrer
FROM brugere b
LEFT JOIN ordrer o ON b.id = o.bruger_id
WHERE b.aktiv = true
    AND b.oprettet >= '2024-01-01'
GROUP BY b.id, b.navn, b.email, b.oprettet
ORDER BY antal_ordrer DESC
LIMIT 10;`
</script>
```

### Large Data Warning

```vue
<template>
  <FdsPre 
    header="Stor Datamængde" 
    :json="storDataset"
  />
  <!-- Automatically shows warning if JSON exceeds 65,535 characters -->
</template>

<script setup>
const storDataset = {
  total: 5000,
  data: Array.from({ length: 2000 }, (_, i) => ({
    id: i,
    navn: `Element ${i}`,
    beskrivelse: "Lang beskrivelse der gør datasættet stort nok til at udløse advarsel",
    metadata: {
      oprettet: "2024-01-15",
      ændret: "2024-01-16", 
      tags: ["tag1", "tag2", "tag3"]
    }
  }))
}
</script>
```

## Prop Priority System

When multiple props are provided, the component follows this priority order:

1. **`json`** - Displayed first if provided (with automatic formatting)
2. **`code`** - Displayed if json is not provided  
3. **Slot content** - Displayed if neither json nor code are provided

```vue
<!-- Only JSON will be displayed, code prop is ignored -->
<FdsPre 
  :json="{ status: 'ok' }"
  code="ignored code"
  header="Priority Example"
/>

<!-- Only code will be displayed, slot content is ignored -->
<FdsPre 
  code="displayed code"
  header="Code Priority"
>
  This slot content will be ignored
</FdsPre>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Semantic Structure**: Uses proper `fieldset` and `legend` elements for grouping
- **Screen Reader Support**: Header text is associated with content via semantic markup
- **Keyboard Navigation**: Content is accessible via keyboard navigation
- **Text Contrast**: Monospace text maintains sufficient contrast ratios
- **Content Preservation**: All formatting and whitespace is preserved for accurate reading

### Accessibility Features

```vue
<template>
  <!-- Semantic fieldset structure -->
  <fieldset class="form-group">
    <legend class="form-label">{{ header }}</legend>
    <div class="form-input">
      <pre class="code">{{ content }}</pre>
    </div>
  </fieldset>
</template>
```

### Screen Reader Considerations

- Headers are announced as labels for the code content
- Pre-formatted text is read character by character when appropriate
- JSON structure is announced clearly with proper nesting
- Long content warnings are announced to prevent information overload

## Monospace Font Behavior

The component uses a carefully selected font stack for optimal code display:

```css
font-family: 'Courier New', Courier, monospace;
line-height: 1.5;
white-space: pre;
overflow-wrap: normal;
```

### Font Characteristics

- **Fixed Width**: Each character occupies the same horizontal space
- **Clear Distinction**: Easy to differentiate similar characters (0, O, l, 1)
- **Cross-Platform**: Consistent appearance across operating systems
- **Readable**: Optimized line height for comfortable reading

## Large Content Handling

### Overflow Management

```vue
<style>
.form-input {
  background-color: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  overflow-x: auto; /* Horizontal scrolling for wide content */
}

.code {
  padding: 1rem;
  margin: 0;
  white-space: pre; /* Preserve formatting */
}
</style>
```

### Automatic Warnings

When JSON content exceeds 65,535 characters, the component automatically displays a Danish warning:

```html
<span class="form-hint mt-2">
  JSON indeholder elementer over 65.535 tegn og noget data vil ikke blive vist
</span>
```

## Integration Examples

### With Form Groups

```vue
<template>
  <FdsFormgroup>
    <FdsLabel required>API Konfiguration</FdsLabel>
    <FdsHint>Indtast din API konfiguration i JSON format</FdsHint>
    <FdsPre :json="apiConfig" header="Aktuel Konfiguration" />
    <FdsFejlmeddelelse v-if="configError">
      {{ configError }}
    </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>
```

### With Accordion for Documentation

```vue
<template>
  <FdsAccordion>
    <FdsAccordionGroup header="API Eksempler">
      <h3>Request Format</h3>
      <FdsPre :json="requestExample" header="POST /api/users" />
      
      <h3>Response Format</h3>  
      <FdsPre :json="responseExample" header="Success Response" />
      
      <h3>Error Handling</h3>
      <FdsPre :code="errorCode" header="JavaScript Error Handler" />
    </FdsAccordionGroup>
  </FdsAccordion>
</template>
```

### With Modal for Code Review

```vue
<template>
  <FdsButton @click="showCodeModal = true">
    Vis Kode Review
  </FdsButton>
  
  <FdsModal 
    v-model:open="showCodeModal" 
    title="Kode Review"
    size="large"
  >
    <FdsPre 
      :code="reviewCode"
      header="Foreslået Ændring"
    />
    
    <template #footer>
      <FdsButton variant="secondary" @click="showCodeModal = false">
        Luk
      </FdsButton>
      <FdsButton variant="primary">
        Godkend Ændring
      </FdsButton>
    </template>
  </FdsModal>
</template>
```

## DKFDS Guidelines

### DKFDS v11 Specifications

- **Form Structure**: Uses standard DKFDS form group patterns
- **Typography**: Follows DKFDS monospace font guidelines  
- **Spacing**: Consistent with DKFDS spacing tokens
- **Colors**: Uses DKFDS color palette for backgrounds and borders
- **Accessibility**: Meets DKFDS accessibility requirements

### Design Tokens

```scss
// DKFDS color variables used
$color-gray-50: #f5f5f5;    // Background
$color-gray-300: #dcdcdc;   // Border
$color-text: #2d2d2d;       // Text

// DKFDS spacing
$spacing-sm: 0.5rem;        // 8px
$spacing-md: 1rem;          // 16px  
$spacing-lg: 1.5rem;        // 24px
```

### Danish Government Context

Perfect for displaying:
- **API Documentation**: Government service endpoints
- **Configuration Files**: System setup for public services
- **Database Schemas**: Public data structure documentation
- **Legal Code**: References to legislation and regulations
- **Technical Specifications**: Integration requirements

## Error Handling

### JSON Formatting Errors

```vue
<script setup>
// Component handles circular references gracefully
const circularObject = { name: 'test' }
circularObject.self = circularObject

// Will display fallback string representation instead of throwing error
</script>

<template>
  <FdsPre :json="circularObject" header="Circular Reference Example" />
</template>
```

### Input Validation

```vue
<script setup>
// All props are optional and handle null/undefined gracefully
const invalidData = {
  json: null,        // Shows empty content
  code: undefined,   // Falls back to slot
  header: ''         // No header displayed
}
</script>
```

## Related Components

- **[FdsTextarea](/components/input/fds-textarea)** - Multi-line text input
- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form field grouping
- **[FdsLabel](/components/forms/fds-label)** - Field labels
- **[FdsHint](/components/forms/fds-hint)** - Helper text
- **[FdsAccordion](/components/data-display/fds-accordion)** - Collapsible content sections
- **[FdsModal](/components/feedback/fds-modal)** - Modal dialogs for code review

<!-- Verified against source -->