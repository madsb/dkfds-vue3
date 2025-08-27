---
title: FdsTag
description: Interactive labels for categorization, filtering, and content organization following DKFDS v11 specifications
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [tag, label, filter, category, interactive, metadata, organization]
---

# FdsTag

Interactive labels for categorization, filtering, and content organization. Unlike badges, tags are typically user-interactive elements supporting selection, removal, and filtering operations. Designed for content management interfaces following DKFDS v11 specifications.

<!-- Verified against source -->

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```vue
<script setup>
import { FdsTag } from '@madsb/dkfds-vue3'
</script>
```

## Quick Start

```vue
<template>
  <!-- Basic tag -->
  <FdsTag @click="handleClick">Category</FdsTag>
  
  <!-- Removable tag with close icon -->
  <FdsTag icon="highlight-off" @click="removeTag">
    Removable Item
  </FdsTag>
  
  <!-- Tag with custom icon -->
  <FdsTag icon="star" @click="toggleFavorite">
    Favorite
  </FdsTag>
</template>

<script setup>
const handleClick = (formId) => {
  console.log('Tag clicked:', formId)
}

const removeTag = (formId) => {
  // Handle tag removal
}

const toggleFavorite = (formId) => {
  // Toggle favorite status
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `icon` | `string` | `undefined` | No | Icon to display within the tag (typically 'highlight-off' for removable tags). Common icons: 'highlight-off', 'star', 'bookmark', 'check' |
| `id` | `string` | auto-generated | No | Unique identifier for the tag button element. Auto-generated if not provided for form and accessibility purposes |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `formId: string` | Emitted when the tag button is clicked. Provides the form ID for identifying which tag was interacted with |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | - | Tag content (text or other elements) |
| `icon` | - | Custom icon content. Use when you need more control over the icon display than the `icon` prop provides |

## Usage Examples

### Basic Tags for Categorization

```vue
<template>
  <div class="category-tags">
    <FdsTag @click="selectCategory">Borgerservice</FdsTag>
    <FdsTag @click="selectCategory">Erhverv</FdsTag>
    <FdsTag @click="selectCategory">Byggesager</FdsTag>
    <FdsTag @click="selectCategory">Miljø</FdsTag>
  </div>
</template>

<script setup>
const selectCategory = (formId) => {
  console.log('Selected category tag:', formId)
  // Handle category selection
}
</script>
```

### Removable Tags with Close Icon

```vue
<template>
  <div class="selected-filters">
    <FdsTag 
      v-for="filter in activeFilters" 
      :key="filter.id"
      icon="highlight-off"
      @click="removeFilter(filter.id)"
    >
      {{ filter.label }}
    </FdsTag>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeFilters = ref([
  { id: '1', label: 'København' },
  { id: '2', label: 'Ansøgning' },
  { id: '3', label: 'Aktiv' }
])

const removeFilter = (filterId) => {
  activeFilters.value = activeFilters.value.filter(f => f.id !== filterId)
}
</script>
```

### Tags with Custom Icons

```vue
<template>
  <div class="action-tags">
    <FdsTag icon="star" @click="toggleFavorite">
      Favorit
    </FdsTag>
    
    <FdsTag icon="bookmark" @click="toggleBookmark">
      Bogmærke
    </FdsTag>
    
    <FdsTag icon="check" @click="markComplete">
      Færdig
    </FdsTag>
  </div>
</template>

<script setup>
const toggleFavorite = (formId) => {
  console.log('Toggle favorite:', formId)
  // Handle favorite toggle
}

const toggleBookmark = (formId) => {
  console.log('Toggle bookmark:', formId)
  // Handle bookmark toggle
}

const markComplete = (formId) => {
  console.log('Mark complete:', formId)
  // Handle completion
}
</script>
```

### Tag Filtering Interface

```vue
<template>
  <div class="filter-interface">
    <h3>Filtrer resultater</h3>
    <div class="tag-filters">
      <FdsTag 
        v-for="filter in availableFilters" 
        :key="filter.id"
        :class="{ 'active': activeFilters.includes(filter.id) }"
        @click="toggleFilter(filter.id)"
      >
        {{ filter.label }}
      </FdsTag>
    </div>
    
    <!-- Active filters with remove option -->
    <div v-if="activeFilters.length" class="active-filters">
      <h4>Aktive filtre:</h4>
      <FdsTag 
        v-for="filterId in activeFilters" 
        :key="filterId"
        icon="highlight-off"
        @click="removeFilter(filterId)"
      >
        {{ getFilterLabel(filterId) }}
      </FdsTag>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const availableFilters = ref([
  { id: 'region-kbh', label: 'København' },
  { id: 'region-aar', label: 'Aarhus' },
  { id: 'type-ans', label: 'Ansøgning' },
  { id: 'type-kla', label: 'Klage' },
  { id: 'status-aktiv', label: 'Aktiv' },
  { id: 'status-afsluttet', label: 'Afsluttet' }
])

const activeFilters = ref([])

const toggleFilter = (filterId) => {
  if (activeFilters.value.includes(filterId)) {
    removeFilter(filterId)
  } else {
    activeFilters.value.push(filterId)
  }
}

const removeFilter = (filterId) => {
  activeFilters.value = activeFilters.value.filter(id => id !== filterId)
}

const getFilterLabel = (filterId) => {
  return availableFilters.value.find(f => f.id === filterId)?.label || ''
}
</script>

<style scoped>
.filter-interface {
  max-width: 600px;
  margin: 2rem 0;
}

.tag-filters, .active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag-filters .active {
  background-color: #004d9f;
  color: white;
}

.active-filters h4 {
  width: 100%;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}
</style>
```

### Custom Icon Slot Usage

```vue
<template>
  <div class="custom-icon-tags">
    <FdsTag @click="handleClick">
      Dokument
      <template #icon>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      </template>
    </FdsTag>
  </div>
</template>

<script setup>
const handleClick = (formId) => {
  console.log('Custom icon tag clicked:', formId)
}
</script>
```

## Visual Variants and States

### Standard Tag States

```vue
<template>
  <div class="tag-states">
    <!-- Default state -->
    <FdsTag @click="handleClick">Standard</FdsTag>
    
    <!-- With icon -->
    <FdsTag icon="highlight-off" @click="handleClick">Med ikon</FdsTag>
    
    <!-- Active state (custom styling) -->
    <FdsTag 
      class="tag-active" 
      @click="handleClick"
    >
      Aktiv
    </FdsTag>
    
    <!-- Disabled appearance (custom styling) -->
    <FdsTag 
      class="tag-disabled" 
      @click="handleClick"
    >
      Deaktiveret
    </FdsTag>
  </div>
</template>

<script setup>
const handleClick = (formId) => {
  console.log('Tag clicked:', formId)
}
</script>

<style scoped>
.tag-states {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-active {
  background-color: #004d9f;
  color: white;
}

.tag-disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
```

## Interactive vs Static Behavior

Tags in DKFDS are designed to be interactive elements. They are implemented as `<button>` elements and should respond to user interaction:

### Interactive Tags (Recommended)

```vue
<template>
  <!-- Interactive tags with click handlers -->
  <FdsTag @click="selectFilter">Kategori</FdsTag>
  <FdsTag icon="highlight-off" @click="removeItem">Fjern</FdsTag>
</template>

<script setup>
const selectFilter = (formId) => {
  // Handle filter selection
}

const removeItem = (formId) => {
  // Handle item removal
}
</script>
```

### Static-Looking Tags (Not Recommended)

If you need static labels that look like tags, consider using `FdsBadge` instead, as it's designed for non-interactive content display.

## Accessibility

The FdsTag component follows WCAG 2.1 AA accessibility standards:

### Built-in Accessibility Features

- **Semantic HTML**: Implemented as `<button>` elements for correct semantic meaning
- **Keyboard Navigation**: Fully keyboard accessible with standard button behavior
- **Screen Reader Support**: Icons are properly hidden from screen readers with `aria-hidden="true"`
- **Focus Management**: Standard browser focus indicators and behavior
- **Unique Identification**: Each tag gets a unique ID for proper form association

### Accessibility Best Practices

```vue
<template>
  <!-- Good: Descriptive content -->
  <FdsTag @click="removeFilter">
    Fjern filter: København
  </FdsTag>
  
  <!-- Good: Clear action indication -->
  <FdsTag 
    icon="highlight-off" 
    @click="removeTag"
    :aria-label="`Fjern tag: ${tagName}`"
  >
    {{ tagName }}
  </FdsTag>
  
  <!-- Good: Status indication -->
  <FdsTag 
    @click="toggleStatus"
    :aria-pressed="isActive"
  >
    Status: {{ isActive ? 'Aktiv' : 'Inaktiv' }}
  </FdsTag>
</template>

<script setup>
import { ref } from 'vue'

const tagName = ref('Vigtig')
const isActive = ref(false)

const removeFilter = () => {
  // Handle filter removal
}

const removeTag = () => {
  // Handle tag removal
}

const toggleStatus = () => {
  isActive.value = !isActive.value
}
</script>
```

### Screen Reader Considerations

- Tag content should be descriptive and actionable
- Use `aria-label` for additional context when needed
- Consider `aria-pressed` for toggle-style tags
- Announce dynamic changes with `aria-live` regions

## DKFDS v11 Guidelines

The FdsTag component implements the official DKFDS v11 tag specifications:

### Design Standards

- **Visual Style**: Consistent with DKFDS design tokens
- **Spacing**: Standard DKFDS spacing units
- **Typography**: DKFDS font family and sizing
- **Colors**: DKFDS color palette compliance
- **Interactive States**: Hover, focus, and active states

### Usage Guidelines

1. **Purpose**: Use tags for metadata, categorization, and filtering
2. **Interactivity**: Tags should be interactive - use badges for static content
3. **Content**: Keep tag content concise and descriptive
4. **Grouping**: Group related tags together with proper spacing
5. **Icons**: Use icons consistently - 'highlight-off' for removable items

### Implementation Notes

- Tags automatically receive DKFDS styling through CSS classes
- The `tag` class provides base styling
- The `tag-icon` class is applied when icons are present
- Component styling relies on DKFDS CSS framework
- No custom SCSS needed - uses framework styles

## TypeScript Support

The component is fully typed with TypeScript:

```typescript
export interface FdsTagProps {
  /**
   * Icon to display within the tag (typically 'highlight-off' for removable tags)
   * When provided, adds visual indicator for the tag's action
   * Common icons: 'highlight-off', 'star', 'bookmark', 'check'
   */
  icon?: string

  /**
   * Unique identifier for the tag button element
   * Auto-generated if not provided for form and accessibility purposes
   */
  id?: string
}

// Event types
type FdsTagEmits = {
  /**
   * Emitted when the tag button is clicked
   * Provides the form ID for identifying which tag was interacted with
   */
  click: [formId: string]
}
```

## Related Components

- **[FdsBadge](/components/data-display/fds-badge)** - For non-interactive labels and status indicators
- **[FdsButton](/components/input/fds-button)** - For primary actions and navigation
- **[FdsIkon](/components/layout/fds-ikon)** - For icon usage within tags
- **[FdsDropdown](/components/input/fds-dropdown)** - For filter selection interfaces

## Browser Support

Supports all modern browsers as per DKFDS requirements:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+