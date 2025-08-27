---
title: FdsPaginering
description: Pagination navigation component implementing DKFDS v11 specifications. Provides accessible pagination controls with support for large datasets, smart ellipsis handling, and keyboard navigation. Supports both array-based pagination (internal) and external pagination with total counts.
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, pagination, paging, accessibility, responsive, keyboard-navigation]
---

# FdsPaginering

Pagination navigation component implementing DKFDS v11 specifications.

Provides accessible pagination controls with support for large datasets, smart ellipsis handling, and keyboard navigation. Supports both array-based pagination (internal) and external pagination with total counts. Features responsive design with mobile-friendly "Side X af Y" display and first/last navigation buttons.

## Installation

```typescript
import { FdsPaginering } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <!-- Basic array pagination -->
  <fds-paginering 
    :list="items"
    :page-size="10"
    @filtered-page="handlePageData"
    @page-change="handlePageChange"
  />
</template>

<script setup lang="ts">
const items = ref([/* your data array */])

const handlePageData = (pageItems: any[]) => {
  console.log('Current page items:', pageItems)
}

const handlePageChange = (page: number) => {
  console.log('Current page:', page)
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `list` | `any[]` | `[]` | No | Array of items to paginate. For internal pagination mode. Items will be sliced based on current page. Leave empty when using external pagination with totalItems. |
| `skip` | `number` | `0` | No | Number of items to skip (for external pagination). Used with external APIs. Automatically calculated for internal pagination. |
| `pageSize` | `number` | `10` | No | Number of items per page. Controls how many items are shown per page for both internal and external pagination. |
| `maxElements` | `number` | `7` | No | Maximum number of visible page elements (includes ellipsis). Controls pagination complexity. Includes numbered pages and ellipsis (...) in count. Recommended: 5-9 for optimal UX. |
| `showFirstLast` | `boolean` | `true` | No | Show first/last navigation buttons. Adds "First" and "Last" buttons for quick navigation in large datasets. |
| `id` | `string` | Auto-generated | No | Unique identifier for the pagination component. Auto-generated if not provided. Used for ARIA labeling. |
| `totalItems` | `number` | `0` | No | Total number of items (for external pagination). Required for external pagination. Ignored when list prop has items. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `filteredPage` | `items: any[]` | Emitted when page changes with filtered items. For internal pagination mode. Contains the items for the current page. |
| `skip` | `skip: number` | Emitted when skip value changes. Useful for external pagination APIs. Indicates how many items to skip. |
| `page-change` | `page: number` | Emitted when page changes. Fired whenever the user navigates to a different page (1-based). |

## Slots

This component does not provide any slots.

## Usage Examples

### Basic Array Pagination

```vue
<template>
  <div>
    <!-- Display current page data -->
    <ul>
      <li v-for="item in currentPageItems" :key="item.id">
        {{ item.name }}
      </li>
    </ul>

    <!-- Pagination controls -->
    <fds-paginering 
      :list="allItems"
      :page-size="10"
      @filtered-page="handlePageData"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsPaginering } from '@madsb/dkfds-vue3'

const allItems = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  // ... more items
])

const currentPageItems = ref([])

const handlePageData = (items: any[]) => {
  currentPageItems.value = items
}

const handlePageChange = (page: number) => {
  console.log(`Navigated to page ${page}`)
}
</script>
```

### External Pagination with API

```vue
<template>
  <div>
    <!-- Display current page data -->
    <ul>
      <li v-for="item in pageData" :key="item.id">
        {{ item.name }}
      </li>
    </ul>

    <!-- Pagination with external data -->
    <fds-paginering 
      :total-items="totalCount"
      :skip="currentSkip"
      :page-size="20"
      @skip="handleSkipChange"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FdsPaginering } from '@madsb/dkfds-vue3'

const pageData = ref([])
const totalCount = ref(0)
const currentSkip = ref(0)

const fetchData = async (skip: number, take: number) => {
  try {
    const response = await fetch(`/api/items?skip=${skip}&take=${take}`)
    const data = await response.json()
    
    pageData.value = data.items
    totalCount.value = data.total
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

const handleSkipChange = (skip: number) => {
  currentSkip.value = skip
  fetchData(skip, 20)
}

const handlePageChange = (page: number) => {
  console.log(`API pagination - page ${page}`)
}

onMounted(() => {
  fetchData(0, 20)
})
</script>
```

### Large Dataset Configuration

```vue
<template>
  <fds-paginering 
    :total-items="10000"
    :skip="skip"
    :page-size="50"
    :max-elements="9"
    :show-first-last="true"
    @page-change="loadPage"
    @skip="handleSkip"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsPaginering } from '@madsb/dkfds-vue3'

const skip = ref(0)

const loadPage = (page: number) => {
  console.log(`Loading page ${page} of large dataset`)
}

const handleSkip = (skipValue: number) => {
  skip.value = skipValue
  // Load data for new skip value
}
</script>
```

### Custom Page Size and Elements

```vue
<template>
  <div>
    <label for="page-size">Items per page:</label>
    <select id="page-size" v-model="pageSize">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="25">25</option>
      <option :value="50">50</option>
    </select>

    <fds-paginering 
      :list="items"
      :page-size="pageSize"
      :max-elements="5"
      :show-first-last="false"
      @filtered-page="handlePageData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsPaginering } from '@madsb/dkfds-vue3'

const items = ref(Array.from({ length: 200 }, (_, i) => ({ 
  id: i + 1, 
  name: `Item ${i + 1}` 
})))
const pageSize = ref(10)

const handlePageData = (pageItems: any[]) => {
  console.log(`Showing ${pageItems.length} items`)
}
</script>
```

## Accessibility

The FdsPaginering component implements comprehensive accessibility features:

### WCAG 2.1 AA Compliance

- **Navigation Role**: Uses `role="navigation"` for semantic structure
- **ARIA Labels**: Descriptive labels for all navigation elements
- **Current Page**: Uses `aria-current="page"` for current page indicator
- **Live Regions**: `aria-live="polite"` for mobile page counter updates

### Keyboard Navigation

- **Tab Order**: All interactive elements are keyboard accessible
- **Enter/Space**: Activates page navigation links
- **Focus Management**: Proper focus indicators and logical tab sequence

### Screen Reader Support

- **Contextual Labels**: Each button includes context (e.g., "Gå til side 3")
- **Current State**: Clear indication of current page position
- **Navigation Purpose**: Overall navigation labeled as "Paginering"

### Danish Language Accessibility

- **Native Labels**: All labels and ARIA text in Danish
- **Cultural Context**: Follows Danish government accessibility standards
- **Clear Messaging**: "Side X af Y" format for clear page context

## DKFDS Guidelines

This component follows DKFDS v11 pagination specifications:

### Design System Compliance

- **Visual Design**: Standard DKFDS button styling and spacing
- **Interaction Patterns**: Follows established navigation conventions
- **Responsive Behavior**: Mobile-first responsive design
- **Icon Usage**: Consistent with DKFDS icon library

### Implementation Standards

- **HTML Structure**: Semantic HTML with proper navigation landmarks
- **CSS Classes**: Uses standard DKFDS class naming conventions
- **Accessibility**: Meets Danish government accessibility requirements
- **Browser Support**: Compatible with required government browser support

### Behavior Specifications

- **Smart Ellipsis**: Intelligent page range calculation with ellipsis
- **First/Last Navigation**: Optional quick navigation for large datasets
- **Mobile Optimization**: Simplified mobile view with page counter
- **State Management**: Proper handling of edge cases and invalid states

## Related Components

- **[FdsBreadcrumb](/components/navigation/fds-breadcrumb)** - Hierarchical navigation
- **[FdsMenu](/components/navigation/fds-menu)** - Primary navigation menu
- **[FdsFaneblade](/components/navigation/fds-faneblade)** - Tab navigation
- **[FdsTrinindikatorGroup](/components/navigation/fds-trinindikator-group)** - Step indicators

## TypeScript Interfaces

```typescript
interface FdsPagineringProps {
  list?: any[]
  skip?: number
  pageSize?: number
  maxElements?: number
  showFirstLast?: boolean
  id?: string
  totalItems?: number
}

interface FdsPaging {
  index: number
  dotted: boolean
}
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/navigation/fds-paginering.vue -->