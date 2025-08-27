---
title: FdsCardGroup
description: Layout container for organizing multiple cards with responsive grid behavior and customizable arrangements
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [cards, layout, grid, responsive, container, deck, columns, masonry]
---

# FdsCardGroup

Layout container for organizing multiple cards with responsive grid behavior. Provides different layout types for various design needs and automatically handles card spacing and alignment. Essential for dashboard and content listing interfaces.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsCardGroup>
    <FdsCard header="Card 1">Content for first card</FdsCard>
    <FdsCard header="Card 2">Content for second card</FdsCard>
    <FdsCard header="Card 3">Content for third card</FdsCard>
  </FdsCardGroup>
</template>

<script setup>
import { FdsCardGroup, FdsCard } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `'deck' \| 'columns' \| null` | `null` | No | Layout type controlling card arrangement and behavior |

### Type Values

- **`null`** (default): Default grid layout with natural card heights
- **`'deck'`**: Cards maintain equal heights in each row, ideal for uniform presentation
- **`'columns'`**: Masonry-style layout with natural content flow, optimal for varied content lengths

## Events

This component does not emit any events. All interaction events come from child card components.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Content area for card components or custom elements |

## Usage Examples

### Default Grid Layout

```vue
<FdsCardGroup>
  <FdsCard header="Borger.dk Services" subheader="Citizen Services">
    Access your personal information and government services
  </FdsCard>
  <FdsCard header="Digital Post" subheader="Communication">
    View and manage your official correspondence
  </FdsCard>
  <FdsCard header="Tax Information" subheader="Finances">
    Check your tax status and submit declarations
  </FdsCard>
</FdsCardGroup>
```

### Deck Layout for Uniform Heights

Perfect for dashboards where consistent card heights improve visual alignment:

```vue
<FdsCardGroup type="deck">
  <FdsCard header="Quick Service" subheader="Fast Access">
    Brief service description
  </FdsCard>
  <FdsCard header="Comprehensive Guide" subheader="Detailed Help">
    This service provides extensive documentation and step-by-step guidance
    for complex administrative processes that require detailed attention
    and multiple steps to complete successfully.
  </FdsCard>
  <FdsCard header="Standard Process" subheader="Regular Service">
    Moderate amount of information for typical use cases
  </FdsCard>
</FdsCardGroup>
```

### Columns Layout for Masonry Style

Ideal for content with varying lengths, such as news articles or blog posts:

```vue
<FdsCardGroup type="columns">
  <FdsCard header="Breaking News" subheader="I dag kl. 14:30">
    Kort nyhedsartikel om aktuelle begivenheder i dansk forvaltning.
  </FdsCard>
  <FdsCard header="Ny Digital Service" subheader="I går">
    Omfattende artikel om implementering af nye digitale løsninger 
    i den offentlige sektor. Artiklen dækker tekniske aspekter, 
    brugererfaringer og fremtidige udviklingsplaner.
  </FdsCard>
  <FdsCard header="Hurtig Opdatering" subheader="For 2 timer siden">
    Kort meddelelse
  </FdsCard>
</FdsCardGroup>
```

### Navigation Cards in Groups

```vue
<FdsCardGroup type="deck">
  <FdsCard 
    header="Mine Sager" 
    to="/mine-sager" 
    icon="arrow-forward"
  >
    Se status på dine igangværende sager
  </FdsCard>
  <FdsCard 
    header="Dokumenter" 
    to="/dokumenter" 
    icon="arrow-forward"
  >
    Hent og administrer dine officielle dokumenter
  </FdsCard>
  <FdsCard 
    header="Hjælp og Support" 
    to="https://support.borger.dk" 
    icon="open-in-new"
  >
    Få hjælp til at bruge de digitale services
  </FdsCard>
</FdsCardGroup>
```

### Dynamic Card Lists

```vue
<template>
  <FdsCardGroup :type="layoutType">
    <FdsCard
      v-for="service in services"
      :key="service.id"
      :header="service.title"
      :subheader="service.category"
      :to="service.url"
    >
      {{ service.description }}
    </FdsCard>
  </FdsCardGroup>

  <div class="layout-controls">
    <button @click="layoutType = null">Standard Grid</button>
    <button @click="layoutType = 'deck'">Deck Layout</button>
    <button @click="layoutType = 'columns'">Columns Layout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FdsCardGroup, FdsCard } from '@madsb/dkfds-vue3'

const layoutType = ref(null)

const services = [
  {
    id: 1,
    title: 'Ansøg om pas',
    category: 'Identitet',
    description: 'Bestil nyt pas online',
    url: '/services/passport'
  },
  {
    id: 2,
    title: 'Flyt adresse',
    category: 'Adresseændring',
    description: 'Registrer din nye adresse hos alle relevante myndigheder',
    url: '/services/move-address'
  },
  {
    id: 3,
    title: 'Digital Post',
    category: 'Kommunikation',
    description: 'Læs post fra offentlige myndigheder',
    url: '/services/digital-post'
  }
]
</script>
```

### With Custom ARIA Labels

```vue
<FdsCardGroup 
  type="deck"
  aria-label="Featured government services"
  role="region"
>
  <FdsCard header="Service 1">Content</FdsCard>
  <FdsCard header="Service 2">Content</FdsCard>
  <FdsCard header="Service 3">Content</FdsCard>
</FdsCardGroup>
```

### Nested Card Groups

```vue
<FdsCardGroup type="deck">
  <div class="section-wrapper">
    <h2>Citizen Services</h2>
    <FdsCardGroup type="columns">
      <FdsCard header="Personal Information">Manage your data</FdsCard>
      <FdsCard header="Applications">Submit requests</FdsCard>
    </FdsCardGroup>
  </div>
  
  <div class="section-wrapper">
    <h2>Business Services</h2>
    <FdsCardGroup type="columns">
      <FdsCard header="Company Registration">Register new business</FdsCard>
      <FdsCard header="Tax Reporting">Submit business taxes</FdsCard>
    </FdsCardGroup>
  </div>
</FdsCardGroup>
```

## Responsive Behavior

The FdsCardGroup component provides responsive grid behavior that automatically adapts to different screen sizes:

### Breakpoint Behavior

- **Mobile (< 768px)**: Single column layout regardless of type
- **Tablet (768px - 1024px)**: 2-column grid for deck and normal layouts
- **Desktop (> 1024px)**: Multi-column grid based on available space and content

### Layout-Specific Responsive Features

**Normal Layout (type=null)**
- Cards maintain natural heights
- Responsive grid with CSS Grid auto-fit
- Optimal for mixed content types

**Deck Layout (type="deck")**
- Equal height cards within each row
- Maintains visual consistency across breakpoints
- Best for dashboard-style interfaces

**Columns Layout (type="columns")**
- Masonry-style columns using CSS Grid
- Content flows naturally across columns
- Ideal for content feeds and article lists

## Accessibility

### WCAG 2.1 AA Compliance

The FdsCardGroup component is designed to meet WCAG 2.1 AA accessibility standards:

#### Keyboard Navigation
- **Tab Order**: Natural tab order through child card components
- **Focus Management**: Maintains logical focus flow within card groups
- **Keyboard Interaction**: All interactive cards are keyboard accessible

#### Screen Reader Support
- **Semantic Structure**: Uses appropriate HTML structure for card groupings
- **ARIA Labels**: Supports custom ARIA labels for group identification
- **Role Support**: Accepts role attributes for semantic enhancement
- **Content Description**: Screen readers can navigate card groups logically

#### Visual Accessibility
- **High Contrast**: Cards maintain DKFDS contrast requirements in all layouts
- **Text Scaling**: Layout adapts properly when text is scaled up to 200%
- **Color Independence**: Information is not conveyed through color alone

### Best Practices

```vue
<!-- Provide descriptive labels for card groups -->
<FdsCardGroup 
  aria-label="Government service categories"
  role="region"
>
  <!-- Cards with proper heading structure -->
  <FdsCard header="Services" header-tag="h3">
    Content with proper heading hierarchy
  </FdsCard>
</FdsCardGroup>

<!-- Use semantic HTML structure -->
<main>
  <section>
    <h2>Featured Services</h2>
    <FdsCardGroup type="deck">
      <FdsCard header="Service 1" header-tag="h3">Content</FdsCard>
      <FdsCard header="Service 2" header-tag="h3">Content</FdsCard>
    </FdsCardGroup>
  </section>
</main>
```

## DKFDS Guidelines

### DKFDS v11 Card Group Specifications

The FdsCardGroup component implements the official DKFDS v11 card group patterns:

#### Layout Standards
- **Consistent Spacing**: 24px grid gaps following DKFDS spacing scale
- **Responsive Grid**: Follows DKFDS responsive breakpoint system
- **Content Alignment**: Cards align according to DKFDS layout principles

#### Visual Design
- **Card Spacing**: Maintains consistent spacing between cards
- **Grid Structure**: Uses CSS Grid for modern, flexible layouts
- **Responsive Behavior**: Adapts to DKFDS responsive design patterns

#### Content Organization
- **Semantic Grouping**: Groups related content logically
- **Information Hierarchy**: Supports proper heading structure
- **Navigation Patterns**: Works seamlessly with DKFDS navigation cards

### Design System Integration

```scss
// DKFDS-compliant custom styling
.card-group {
  // Uses DKFDS spacing tokens
  gap: var(--dkfds-spacing-6); // 24px

  // Responsive grid following DKFDS breakpoints
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
```

### Government Service Patterns

```vue
<!-- Danish government service dashboard -->
<FdsCardGroup type="deck" aria-label="Mine offentlige services">
  <FdsCard header="Digital Post" subheader="3 nye beskeder">
    <template #image>
      <img src="/icons/digital-post.svg" alt="" />
    </template>
    Se dine beskeder fra offentlige myndigheder
  </FdsCard>
  
  <FdsCard header="Mine Sager" subheader="2 igangværende">
    <template #image>
      <img src="/icons/cases.svg" alt="" />
    </template>
    Følg status på dine ansøgninger og sager
  </FdsCard>
  
  <FdsCard header="Dokumenter" subheader="Senest opdateret">
    <template #image>
      <img src="/icons/documents.svg" alt="" />
    </template>
    Download officielle dokumenter og attester
  </FdsCard>
</FdsCardGroup>
```

## Related Components

- **[FdsCard](/components/data-display/fds-card.md)** - Individual card component for content and navigation
- **[FdsAccordion](/components/data-display/fds-accordion.md)** - Collapsible content organization
- **[FdsTable](/components/data-display/fds-table.md)** - Tabular data presentation
- **[FdsList](/components/data-display/fds-liste.md)** - Structured list presentation

<!-- Verified against source -->