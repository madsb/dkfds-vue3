---
title: FdsAccordionGroup
description: Accordion group container implementing DKFDS v11 accordion specifications with coordinated expand/collapse functionality and bulk controls.
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [accordion, group, container, bulk-control, expand, collapse, navigation]
---

# FdsAccordionGroup

Manages multiple accordion items with coordinated expand/collapse functionality and bulk controls. Provides centralized state management for child accordion components with optional bulk expand/collapse button for improved user experience with large sets of accordions.

## Installation

The FdsAccordionGroup component is part of the data-display category and works together with the FdsAccordion component.

```typescript
import { FdsAccordionGroup } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <FdsAccordionGroup>
    <FdsAccordion title="Personlige oplysninger">
      <p>Her kan du se og redigere dine personlige oplysninger som navn, adresse og telefonnummer.</p>
    </FdsAccordion>
    <FdsAccordion title="Kontaktindstillinger">
      <p>Vælg hvordan du ønsker at blive kontaktet af offentlige myndigheder.</p>
    </FdsAccordion>
    <FdsAccordion title="Sikkerhedsindstillinger">
      <p>Administrer dine sikkerhedsindstillinger og to-faktor autentificering.</p>
    </FdsAccordion>
  </FdsAccordionGroup>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `expandedText` | `string` | `'Luk alle'` | No | Text displayed on bulk button when all accordions are expanded. Indicates the action to collapse all accordions |
| `collapsedText` | `string` | `'Åbn alle'` | No | Text displayed on bulk button when some/all accordions are collapsed. Indicates the action to expand all accordions |
| `showBulkButton` | `boolean` | `true` | No | Whether to display the bulk expand/collapse button. Useful for groups with many accordions or when bulk control is desired |
| `modelValue` | `boolean` | `undefined` | No | v-model binding for controlling all accordions expanded state. When true, all accordions will be expanded; when false, all collapsed |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `value: boolean` | Emitted when the bulk expanded state changes for v-model support. Provides the new boolean state indicating if all should be expanded |
| `toggle-all` | `expanded: boolean` | Emitted when the bulk toggle button is clicked. Provides the new expanded state that will be applied to all accordions |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `header` | None | Custom header content to replace the default bulk toggle button. Use this to provide custom controls or styling |
| `default` | None | Default slot for accordion items. Should contain one or more `FdsAccordion` components |

## Usage Examples

### Basic Accordion Group with Bulk Controls

```vue
<template>
  <FdsAccordionGroup>
    <FdsAccordion title="Vigtige meddelelser">
      <p>Du har 2 ubehandlede meddelelser fra Skat.</p>
    </FdsAccordion>
    <FdsAccordion title="Mine sager">
      <p>Oversigt over dine aktive sager hos forskellige myndigheder.</p>
    </FdsAccordion>
    <FdsAccordion title="Digital post">
      <p>Se dine seneste digitale breve og dokumenter.</p>
    </FdsAccordion>
  </FdsAccordionGroup>
</template>
```

### Without Bulk Button

For cases where bulk control is not desired:

```vue
<template>
  <FdsAccordionGroup :show-bulk-button="false">
    <FdsAccordion title="Privatlivspolitik">
      <p>Læs vores privatlivspolitik og se hvordan vi behandler dine data.</p>
    </FdsAccordion>
    <FdsAccordion title="Vilkår og betingelser">
      <p>Gennemgå vilkår og betingelser for brug af denne tjeneste.</p>
    </FdsAccordion>
  </FdsAccordionGroup>
</template>
```

### Custom Bulk Button Text

Customize the button text for different contexts:

```vue
<template>
  <FdsAccordionGroup 
    expanded-text="Fold alle sektioner sammen"
    collapsed-text="Udvid alle sektioner"
  >
    <FdsAccordion title="Økonomiske ydelser">
      <p>Information om kontanthjælp, dagpenge og andre økonomiske ydelser.</p>
    </FdsAccordion>
    <FdsAccordion title="Sundhedstilbud">
      <p>Oversigt over sundhedstilbud i din kommune.</p>
    </FdsAccordion>
    <FdsAccordion title="Uddannelse">
      <p>Information om uddannelsesmuligheder og støtteordninger.</p>
    </FdsAccordion>
  </FdsAccordionGroup>
</template>
```

### v-model Integration

Control the group state programmatically:

```vue
<template>
  <div>
    <label>
      <input 
        v-model="allExpanded" 
        type="checkbox"
      >
      Udvid alle accordions
    </label>
    
    <FdsAccordionGroup 
      v-model="allExpanded"
      @toggle-all="handleToggleAll"
    >
      <FdsAccordion 
        v-for="section in sections" 
        :key="section.id" 
        :title="section.title"
      >
        {{ section.content }}
      </FdsAccordion>
    </FdsAccordionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const allExpanded = ref(false)

const sections = [
  {
    id: 1,
    title: 'Ansøgning om dagpenge',
    content: 'Sådan ansøger du om dagpenge ved ledighed.'
  },
  {
    id: 2,
    title: 'Jobsøgning',
    content: 'Tips og ressourcer til effektiv jobsøgning.'
  },
  {
    id: 3,
    title: 'CV og ansøgning',
    content: 'Vejledning til at skrive et godt CV og ansøgningsbrev.'
  }
]

const handleToggleAll = (expanded: boolean) => {
  console.log(`All accordions ${expanded ? 'expanded' : 'collapsed'}`)
}
</script>
```

### Custom Header Slot

Replace the default bulk button with custom controls:

```vue
<template>
  <FdsAccordionGroup>
    <template #header>
      <div class="custom-accordion-controls">
        <h3>Hjælp og vejledning</h3>
        <div class="button-group">
          <button @click="expandAll" class="button button-secondary">
            Åbn alle
          </button>
          <button @click="collapseAll" class="button button-secondary">
            Luk alle
          </button>
        </div>
      </div>
    </template>
    
    <FdsAccordion title="Hvordan logger jeg ind?">
      <p>Vejledning til at logge ind med NemID eller MitID.</p>
    </FdsAccordion>
    <FdsAccordion title="Glemt password?">
      <p>Sådan nulstiller du dit password.</p>
    </FdsAccordion>
  </FdsAccordionGroup>
</template>

<script setup lang="ts">
const expandAll = () => {
  // Custom expand logic
}

const collapseAll = () => {
  // Custom collapse logic  
}
</script>

<style scoped>
.custom-accordion-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}
</style>
```

### Large Data Sets

For accordion groups with many items, consider pagination or virtualization:

```vue
<template>
  <div>
    <div class="search-controls">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Søg i FAQ..."
        class="form-control"
      >
    </div>
    
    <FdsAccordionGroup 
      :collapsed-text="`Åbn alle (${filteredFaqs.length})`"
      :expanded-text="`Luk alle (${filteredFaqs.length})`"
    >
      <FdsAccordion 
        v-for="faq in filteredFaqs.slice(0, 20)" 
        :key="faq.id" 
        :title="faq.question"
      >
        {{ faq.answer }}
      </FdsAccordion>
    </FdsAccordionGroup>
    
    <div v-if="filteredFaqs.length > 20" class="pagination-info">
      Viser 20 af {{ filteredFaqs.length }} spørgsmål
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

const faqs = [
  { id: 1, question: 'Hvordan ændrer jeg min adresse?', answer: '...' },
  { id: 2, question: 'Hvad er MitID?', answer: '...' },
  // ... many more FAQ items
]

const filteredFaqs = computed(() => {
  if (!searchQuery.value) return faqs
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
```

## Accessibility

### WCAG 2.1 AA Compliance

The FdsAccordionGroup component ensures accessibility through:

- **Keyboard Navigation**: Full keyboard support with proper focus management
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML structure
- **Focus Indicators**: Clear visual focus indicators for keyboard users
- **State Communication**: Accordion expanded/collapsed state communicated to screen readers

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate between accordion headers and bulk button |
| `Enter` / `Space` | Toggle accordion or bulk button |
| `Shift + Tab` | Navigate backwards through focusable elements |

### ARIA Attributes

The component automatically manages:

- `aria-expanded` on accordion buttons
- `aria-controls` linking buttons to content panels
- `data-accordion-bulk-expand` for bulk button state
- Proper heading hierarchy with configurable header tags

## DKFDS Guidelines

### Design System Compliance

The component follows DKFDS v11 accordion specifications:

- **Visual Design**: Consistent with DKFDS accordion styling and spacing
- **Interaction Patterns**: Standard expand/collapse behavior
- **Typography**: Proper heading hierarchy and text styling
- **Spacing**: DKFDS spacing tokens for consistent layout

### Theme Support

Supports both DKFDS themes:

- **VirkDK**: Government/business theme with official styling
- **BorgerDK**: Citizen theme with accessible, friendly design

### Best Practices

1. **Content Organization**: Group related accordion items logically
2. **Bulk Controls**: Use bulk controls for groups with 4+ items
3. **Progressive Disclosure**: Keep initial view collapsed for better scanning
4. **Clear Headers**: Use descriptive, scannable accordion titles
5. **Performance**: Consider limiting visible items for very large datasets

## Performance Considerations

### Large Accordion Groups

For accordion groups with many items (>20):

1. **Virtualization**: Consider implementing virtual scrolling
2. **Pagination**: Show items in chunks with pagination controls
3. **Search/Filter**: Add search functionality to help users find content
4. **Lazy Loading**: Load accordion content on demand
5. **State Management**: Use efficient state tracking for large datasets

### Memory Management

The component uses efficient state management:

- **Reactive Map**: Uses Vue's reactive Map for optimal performance
- **Automatic Cleanup**: Removes accordion references when components unmount
- **Minimal Re-renders**: Computed properties minimize unnecessary updates

### Bundle Size

- **Tree Shakeable**: Component can be imported individually
- **No External Dependencies**: No additional libraries required
- **CSS Optimization**: Scoped styles prevent global CSS pollution

## Related Components

- **FdsAccordion**: Individual accordion component for use within groups
- **FdsDetaljer**: Alternative disclosure component for single items
- **FdsFoldbar**: Collapsible content without accordion semantics

<!-- Verified against source -->