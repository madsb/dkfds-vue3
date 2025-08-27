---
title: FdsDetaljer
description: Details/disclosure component implementing DKFDS v11 detaljer specifications for progressive information disclosure
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [details, disclosure, collapsible, progressive, accordion, expandable]
---

# FdsDetaljer

Provides a collapsible content section using native HTML details/summary elements for optimal accessibility and browser support. Useful for FAQ sections, progressive disclosure of information, and optional content that doesn't need to be visible by default.

The component leverages the native HTML `<details>` and `<summary>` elements to ensure semantic markup and built-in keyboard accessibility, following DKFDS v11 design patterns for progressive disclosure.

## Installation

The FdsDetaljer component is part of the DKFDS Vue 3 component library.

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsDetaljer header="Mere information">
    This content is hidden by default and can be expanded by the user.
  </FdsDetaljer>
</template>

<script setup>
import { FdsDetaljer } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| header | `string` | `'Mere information'` | No | Header text displayed in the clickable summary area. This text invites users to expand the details section |

## Events

This component uses the native HTML `<details>` element and does not emit custom Vue events. You can listen to native events directly:

| Event | Payload | Description |
|-------|---------|-------------|
| @toggle | `Event` | Native browser event fired when the details element is opened or closed |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| default | - | Content that will be hidden/shown when the details are toggled. This is the main collapsible content area |
| header | - | Custom content for the summary/header area. Allows rich content like icons, formatted text, or additional elements |

## Usage Examples

### Basic Details with Default Header

```vue
<template>
  <FdsDetaljer>
    This content is hidden by default and can be expanded by the user.
  </FdsDetaljer>
</template>

<script setup>
import { FdsDetaljer } from '@madsb/dkfds-vue3'
</script>
```

### Custom Header Text

```vue
<template>
  <FdsDetaljer header="Ofte stillede spørgsmål">
    <p>Her er svar på almindelige spørgsmål om vores service.</p>
    <ul>
      <li>Spørgsmål 1: Svar 1</li>
      <li>Spørgsmål 2: Svar 2</li>
    </ul>
  </FdsDetaljer>
</template>

<script setup>
import { FdsDetaljer } from '@madsb/dkfds-vue3'
</script>
```

### Custom Header Slot with Rich Content

```vue
<template>
  <FdsDetaljer>
    <template #header>
      <strong>Avancerede indstillinger</strong> 
      <span class="text-muted">(Valgfrit)</span>
    </template>
    
    <FdsFormGroup>
      <FdsLabel>Avanceret mulighed</FdsLabel>
      <FdsInput v-model="advancedSetting" />
    </FdsFormGroup>
  </FdsDetaljer>
</template>

<script setup>
import { FdsDetaljer, FdsFormGroup, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const advancedSetting = ref('')
</script>
```

### Multiple Details Sections (FAQ Pattern)

```vue
<template>
  <div>
    <FdsDetaljer header="Privatlivspolitik">
      <p>Her finder du information om, hvordan vi behandler dine personoplysninger...</p>
    </FdsDetaljer>
    
    <FdsDetaljer header="Servicevilkår">
      <p>Disse vilkår gælder for din brug af vores digitale løsninger...</p>
    </FdsDetaljer>
    
    <FdsDetaljer header="Cookie-politik">
      <p>Vi bruger cookies til at forbedre din brugeroplevelse...</p>
    </FdsDetaljer>
  </div>
</template>

<script setup>
import { FdsDetaljer } from '@madsb/dkfds-vue3'
</script>
```

### Listening to Toggle Events

```vue
<template>
  <FdsDetaljer 
    header="Expandable Section" 
    @toggle="handleToggle"
  >
    Content that can be expanded or collapsed.
  </FdsDetaljer>
</template>

<script setup>
import { FdsDetaljer } from '@madsb/dkfds-vue3'

const handleToggle = (event) => {
  console.log('Details toggled:', event.target.open)
}
</script>
```

### Progressive Disclosure in Forms

```vue
<template>
  <form>
    <FdsFormGroup>
      <FdsLabel>Navn</FdsLabel>
      <FdsInput v-model="name" required />
    </FdsFormGroup>
    
    <FdsFormGroup>
      <FdsLabel>E-mail</FdsLabel>
      <FdsInput v-model="email" type="email" required />
    </FdsFormGroup>
    
    <FdsDetaljer header="Yderligere kontaktoplysninger (valgfrit)">
      <FdsFormGroup>
        <FdsLabel>Telefon</FdsLabel>
        <FdsInput v-model="phone" type="tel" />
      </FdsFormGroup>
      
      <FdsFormGroup>
        <FdsLabel>Adresse</FdsLabel>
        <FdsTextarea v-model="address" />
      </FdsFormGroup>
    </FdsDetaljer>
    
    <FdsButton type="submit">Send</FdsButton>
  </form>
</template>

<script setup>
import { 
  FdsDetaljer, 
  FdsFormGroup, 
  FdsLabel, 
  FdsInput, 
  FdsTextarea, 
  FdsButton 
} from '@madsb/dkfds-vue3'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
</script>
```

## Accessibility

The FdsDetaljer component implements comprehensive accessibility features:

### WCAG 2.1 AA Compliance

- **Semantic HTML**: Uses native `<details>` and `<summary>` elements for optimal screen reader support
- **Keyboard Navigation**: Full keyboard support through native browser implementation
- **Focus Management**: Proper focus states and indication
- **ARIA Support**: Built-in ARIA attributes via native elements

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Enter` | Toggle the details open/closed state when summary has focus |
| `Space` | Toggle the details open/closed state when summary has focus |
| `Tab` | Navigate to/from the summary element |

### Screen Reader Support

- The `<summary>` element is announced as a button or disclosure triangle
- Screen readers announce the current state (expanded/collapsed)
- Content is properly hidden from screen readers when collapsed
- Semantic structure is maintained for assistive technologies

### Focus Management

- The summary element receives focus and shows clear focus indicators
- Focus remains on the summary after toggling
- Proper tab order is maintained with surrounding content

## Animation and Transition Behavior

The component relies on native browser behavior for smooth open/close animations:

- **Native Transitions**: Uses browser's built-in smooth reveal/hide animations
- **Performance**: Hardware-accelerated animations for smooth interaction
- **Customizable**: Can be styled with CSS transitions for custom effects

### Custom Animation Example

```css
.details {
  transition: all 0.3s ease-in-out;
}

.details[open] .details-text {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Progressive Disclosure Patterns

### When to Use FdsDetaljer

- **FAQ Sections**: Hide answers until users need them
- **Optional Form Fields**: Keep forms simple with expandable advanced options
- **Secondary Information**: Provide additional context without overwhelming the main content
- **Help Text**: Offer detailed explanations that don't interfere with the primary task
- **Legal Content**: Make terms, privacy policies, and disclaimers available but not intrusive

### Best Practices

1. **Clear Headers**: Use descriptive text that indicates what content will be revealed
2. **Logical Grouping**: Group related information together in single details sections
3. **Appropriate Content**: Use for supplementary, not critical information
4. **Multiple Sections**: Allow multiple details to be open simultaneously for comparison
5. **Consistent Styling**: Maintain visual consistency with your design system

## DKFDS Guidelines

The FdsDetaljer component follows DKFDS v11 specifications:

### Design Principles

- **Progressive Enhancement**: Content remains accessible even if JavaScript fails
- **Native Behavior**: Leverages browser capabilities for optimal performance
- **Consistent Styling**: Matches DKFDS visual design language
- **Responsive Design**: Works seamlessly across all device sizes

### Visual Design

- Clear visual indicators for interactive summary elements
- Consistent spacing and typography
- Proper color contrast ratios
- Visual feedback for interaction states

### Content Guidelines

- Use clear, action-oriented language in headers
- Keep content concise and scannable
- Provide logical information hierarchy
- Consider cognitive load when designing disclosure patterns

## Related Components

- **[FdsAccordion](/components/data-display/fds-accordion)**: For multiple related collapsible sections with exclusive expansion
- **[FdsModal](/components/feedback/fds-modal)**: For content that needs to overlay the main interface
- **[FdsTooltip](/components/feedback/fds-tooltip)**: For brief contextual information on hover/focus
- **[FdsTabs](/components/navigation/fds-faneblade)**: For organizing content into separate views

<!-- Verified against source -->