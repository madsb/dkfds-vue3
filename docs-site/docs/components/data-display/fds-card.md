---
title: FdsCard
description: Versatile content container supporting both static content display and navigation functionality with intelligent link handling
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [cards, content, navigation, layout, responsive, semantic]
---

# FdsCard

Versatile content container supporting both static content display and navigation functionality. Features intelligent link handling for Vue Router integration, automatic external link detection, and flexible content organization with image, header, content, and action slots.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsCard 
    header="Card Title" 
    subheader="Category"
  >
    <p>This is the main content of the card.</p>
    <template #actions>
      <FdsButton>Action Button</FdsButton>
    </template>
  </FdsCard>
</template>

<script setup>
import { FdsCard, FdsButton } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `header` | `string` | `undefined` | No | Main heading text for the card, displayed prominently in the card header area |
| `headerTag` | `'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'` | No | HTML heading tag level for semantic structure based on document hierarchy |
| `subheader` | `string` | `undefined` | No | Secondary text displayed above the main header for categories, dates, or supplementary information |
| `to` | `string \| Record<string, any>` | `undefined` | No | Navigation destination for clickable cards - supports string URLs or Vue Router location objects |
| `external` | `boolean` | `false` | No | Force external link behavior even when Vue Router is available |
| `icon` | `string` | `undefined` | No | Icon displayed for navigation cards - defaults to smart icons based on link type |
| `variant` | `'long'` | `undefined` | No | Visual variant affecting card layout - 'long' provides extended layout for detailed content |

### Header Tag Hierarchy

Choose the appropriate heading tag based on your document's semantic structure:

- **h2**: For main section cards (most common)
- **h3**: For subsection cards within an h2 section
- **h4-h6**: For deeper nested content hierarchies

### Smart Icon Behavior

When no explicit `icon` prop is provided, FdsCard automatically selects appropriate icons:

- **Internal links** (`/page`, router objects): `arrow-forward` icon
- **External links** (`https://`, domains, `mailto:`): `open-in-new` icon  
- **Non-navigation cards**: No icon displayed
- **Custom override**: Set `icon=""` to hide icon, or provide specific icon name

### Link Detection

FdsCard intelligently detects external links from these patterns:
- Protocol URLs: `http://`, `https://`, `ftp://`, `mailto:`, `tel:`
- Protocol-relative: `//example.com`
- Domain patterns: `example.com`, `subdomain.example.com`
- Internal paths: `/page`, `#section`, router objects

## Events

This component does not emit custom events. Navigation events are handled by the underlying link components.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `image` | None | Image content displayed at the top of the card |
| `header` | None | Custom header content (overrides header prop) |
| `content` | None | Structured content area for card body |
| `default` | None | Default slot for general content (mixed with content slot) |
| `actions` | None | Action buttons and links (only available for non-navigation cards) |

### Slot Priority

- Header slot takes precedence over header prop
- Content and default slots are both rendered
- Actions slot only renders for static cards (not navigation cards)

## Usage Examples

### Basic Content Card

```vue
<FdsCard 
  header="Pas og ID-kort" 
  subheader="Identitet og rejse"
  header-tag="h3"
>
  <template #content>
    <p>Ansøg om nyt pas eller ID-kort online. 
       Følg din ansøgning og book tid til afhentning.</p>
  </template>
  
  <template #actions>
    <FdsButton variant="primary">Ansøg nu</FdsButton>
    <FdsButton variant="secondary">Se status</FdsButton>
  </template>
</FdsCard>
```

### Navigation Card with Vue Router

```vue
<FdsCard 
  header="Mine Sager" 
  subheader="Oversigt"
  :to="{ name: 'my-cases' }"
  icon="arrow-forward"
>
  <template #image>
    <img src="/icons/cases.svg" alt="" />
  </template>
  Se status på dine igangværende sager og ansøgninger
</FdsCard>
```

### External Link Card

```vue
<FdsCard 
  header="Borger.dk Hjælp" 
  subheader="Support"
  to="https://www.borger.dk/hjaelp"
  icon="open-in-new"
>
  <template #content>
    <p>Få hjælp og support til brug af borger.dk's digitale services.</p>
  </template>
</FdsCard>
```

### Long Variant Card

```vue
<FdsCard 
  variant="long"
  header="Digital Post Oversigt"
  header-tag="h2"
  subheader="Kommunikation"
>
  <template #image>
    <img src="/images/digital-post-hero.jpg" alt="Digital post interface" />
  </template>
  
  <template #content>
    <p>Administrer al din officielle korrespondance fra danske myndigheder 
       på ét samlet sted. Læs, arkiver og besvar beskeder sikkert online.</p>
    
    <ul>
      <li>Modtag post fra alle offentlige myndigheder</li>
      <li>Automatisk arkivering og søgning</li>
      <li>Sikker kommunikation med høj kryptering</li>
      <li>Mobile app til adgang på farten</li>
    </ul>
  </template>
  
  <template #actions>
    <FdsButton variant="primary">Åbn Digital Post</FdsButton>
    <FdsButton variant="secondary">Download app</FdsButton>
  </template>
</FdsCard>
```

### Card with Custom Header

```vue
<FdsCard subheader="Aktuelt">
  <template #header>
    <h3 class="card-heading">
      <FdsIkon icon="notification" />
      Nye Funktioner
    </h3>
  </template>
  
  <template #content>
    <p>Vi har tilføjet nye funktioner til platformen...</p>
  </template>
</FdsCard>
```

### Service Dashboard Cards

```vue
<template>
  <div class="service-grid">
    <FdsCard
      v-for="service in services"
      :key="service.id"
      :header="service.title"
      :subheader="service.category"
      :to="service.url"
      header-tag="h3"
    >
      <template #image>
        <img :src="service.icon" alt="" />
      </template>
      {{ service.description }}
    </FdsCard>
  </div>
</template>

<script setup>
import { FdsCard } from '@madsb/dkfds-vue3'

const services = [
  {
    id: 1,
    title: 'Flyt adresse',
    category: 'Adresseændring', 
    description: 'Registrer din nye adresse hos alle myndigheder',
    url: '/services/move-address',
    icon: '/icons/move.svg'
  },
  {
    id: 2,
    title: 'Ansøg om børnepenge',
    category: 'Familie',
    description: 'Ansøg om børnepenge og følg status på din sag',
    url: '/services/child-benefits',
    icon: '/icons/family.svg'
  },
  {
    id: 3,
    title: 'Skift læge',
    category: 'Sundhed',
    description: 'Skift til en ny læge eller se din aktuelle læge',
    url: '/services/change-doctor',
    icon: '/icons/health.svg'
  }
]
</script>

<style scoped>
.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
```

### Newsletter/Article Cards

```vue
<FdsCard 
  header="Nye Digitale Services i 2024"
  subheader="Nyhedsbrev • 15. marts 2024"
  header-tag="h3"
>
  <template #image>
    <img src="/news/digital-services-2024.jpg" 
         alt="Skærmbillede af nye digitale services" />
  </template>
  
  <template #content>
    <p>Se hvilke nye digitale services der lanceres i 2024 for at gøre 
       det endnu nemmere at kommunikere med det offentlige.</p>
  </template>
  
  <template #actions>
    <a href="/nyheder/digitale-services-2024" class="button button--secondary">
      Læs mere
    </a>
  </template>
</FdsCard>
```

### Accessibility-Enhanced Cards

```vue
<FdsCard 
  header="Tilgængelighedserklæring"
  subheader="Information"
  to="/accessibility"
  aria-label="Læs vores tilgængelighedserklæring for denne hjemmeside"
>
  <template #content>
    <p>Læs om hvordan vi arbejder med digital tilgængelighed 
       og WCAG 2.1 AA compliance.</p>
  </template>
</FdsCard>
```

## Visual Variants

### Standard Card Layout

The default card layout provides a vertical structure optimized for grid layouts:

```vue
<FdsCard header="Standard Card" subheader="Default Layout">
  <template #image>
    <img src="/card-image.jpg" alt="Card illustration" />
  </template>
  Content flows vertically in a compact format suitable for grid layouts.
</FdsCard>
```

### Long Card Layout  

The long variant creates a horizontal layout on larger screens:

```vue
<FdsCard 
  variant="long"
  header="Long Format Card"
  subheader="Extended Layout"
>
  <template #image>
    <img src="/hero-image.jpg" alt="Hero illustration" />
  </template>
  
  <template #content>
    <p>Long cards provide more space for detailed content and work well 
       as feature cards or detailed service descriptions. On mobile devices, 
       they automatically convert to vertical layout.</p>
  </template>
</FdsCard>
```

## Responsive Behavior

FdsCard provides adaptive behavior across different screen sizes:

### Breakpoint Behavior

- **Mobile (< 768px)**: All cards use vertical layout regardless of variant
- **Tablet (768px - 1024px)**: Long cards maintain extended layout, standard cards stack
- **Desktop (> 1024px)**: Full responsive behavior with optimal spacing

### Long Variant Responsive Features

- **Desktop**: Horizontal layout with image and content side-by-side
- **Mobile**: Automatic conversion to vertical stacked layout
- **Flexible images**: Images scale appropriately at all breakpoints

## Accessibility

### WCAG 2.1 AA Compliance

The FdsCard component is designed to meet WCAG 2.1 AA accessibility standards:

#### Semantic Structure
- **Proper HTML elements**: Uses `<section>` for content cards, appropriate link elements for navigation
- **Heading hierarchy**: Supports h2-h6 tags for proper document structure
- **Landmark navigation**: Navigation cards integrate with assistive technology

#### Keyboard Navigation
- **Tab order**: Natural tab progression through interactive elements
- **Focus management**: Clear focus indicators on navigation cards
- **Keyboard activation**: Full keyboard support for all interactive elements

#### Screen Reader Support
- **Content structure**: Logical reading order for all card content
- **Link context**: Clear link purpose and destination information
- **Image alternatives**: Proper alt text support through image slots
- **Icon semantics**: Decorative icons marked appropriately

#### Visual Accessibility
- **High contrast**: Maintains DKFDS contrast requirements (4.5:1 minimum)
- **Text scaling**: Supports zoom up to 200% without content loss
- **Color independence**: Information not conveyed through color alone

### Best Practices

```vue
<!-- Proper heading hierarchy -->
<section>
  <h2>Featured Services</h2>
  <FdsCardGroup>
    <FdsCard header="Service 1" header-tag="h3">
      Content with proper semantic structure
    </FdsCard>
    <FdsCard header="Service 2" header-tag="h3">
      More content following accessibility guidelines
    </FdsCard>
  </FdsCardGroup>
</section>

<!-- Clear navigation context -->
<FdsCard 
  header="Apply for Passport"
  to="/services/passport"
  aria-label="Navigate to passport application service"
>
  Complete your passport application online
</FdsCard>

<!-- Accessible images -->
<FdsCard header="News Article">
  <template #image>
    <img src="/news-image.jpg" 
         alt="Citizens using digital government services on mobile devices" />
  </template>
  Article content about digital government services...
</FdsCard>
```

### Focus Management

```vue
<!-- Custom focus styles -->
<style scoped>
.card:focus-within {
  outline: 2px solid var(--dkfds-color-focus);
  outline-offset: 2px;
}

/* Enhanced focus for navigation cards */
.card[href]:focus,
.card a:focus {
  outline: 2px solid var(--dkfds-color-focus);
  outline-offset: 2px;
  text-decoration: underline;
}
</style>
```

## Integration with FdsCardGroup

Cards work seamlessly with FdsCardGroup for organized layouts:

```vue
<FdsCardGroup type="deck">
  <FdsCard 
    header="Quick Service" 
    subheader="Fast Access"
    to="/quick-service"
  >
    Brief service description for quick access
  </FdsCard>
  
  <FdsCard 
    header="Comprehensive Guide" 
    subheader="Detailed Help"
    to="/comprehensive-guide"
  >
    This service provides extensive documentation and guidance
    for complex administrative processes requiring detailed attention.
  </FdsCard>
  
  <FdsCard 
    header="Standard Process" 
    subheader="Regular Service"
    to="/standard-process"
  >
    Moderate amount of information for typical use cases
  </FdsCard>
</FdsCardGroup>
```

## DKFDS Guidelines

### DKFDS v11 Card Specifications

The FdsCard component implements official DKFDS v11 card patterns and guidelines:

#### Content Organization
Following DKFDS recommended content order:
1. **Image** (optional) - Visual representation or illustration
2. **Subheading** (optional) - Category, date, or context information  
3. **Title** (required) - Clear, descriptive heading
4. **Text** (optional) - Supporting content, keep concise
5. **Links/Buttons** (optional) - Actions or navigation

#### Design Principles
- **Concise content**: Keep text to a few sentences maximum
- **Consistent structure**: Maintain uniform content organization
- **Clear purpose**: Each card should have a single, clear objective
- **Visual hierarchy**: Use typography and spacing to guide attention

#### Navigation Patterns
- **Entire card clickable**: For navigation cards, the full card area is interactive
- **Consistent iconography**: Use standard icons for internal vs external links
- **Clear destinations**: Navigation purpose should be obvious from content

### Government Service Patterns

```vue
<!-- Citizen service card -->
<FdsCard 
  header="Digital Borgerservice"
  subheader="Selvbetjening"
  to="/digital-citizen-service"
  header-tag="h3"
>
  <template #image>
    <img src="/icons/digital-service.svg" alt="" />
  </template>
  
  Administrer dine personlige forhold og kontakt til det offentlige online.
</FdsCard>

<!-- Business service card -->
<FdsCard 
  header="Virksomhedsguide" 
  subheader="Erhverv"
  to="https://erhvervsguiden.dk"
  icon="open-in-new"
  header-tag="h3"
>
  <template #content>
    <p>Få hjælp til etablering og drift af virksomhed i Danmark.</p>
  </template>
</FdsCard>

<!-- Information card with actions -->
<FdsCard 
  header="COVID-19 Retningslinjer"
  subheader="Sundhed • Opdateret i dag"
  header-tag="h2"
>
  <template #content>
    <p>Se de seneste retningslinjer og anbefalinger fra sundhedsmyndighederne 
       vedrørende COVID-19 og forebyggende tiltag.</p>
  </template>
  
  <template #actions>
    <FdsButton variant="primary">Læs retningslinjer</FdsButton>
    <FdsButton variant="secondary" :to="{ name: 'health-updates' }">
      Tilmeld opdateringer
    </FdsButton>
  </template>
</FdsCard>
```

### Styling Customization

```scss
// DKFDS-compliant custom card styling
.card {
  // Use DKFDS design tokens
  border-radius: var(--dkfds-border-radius-medium);
  box-shadow: var(--dkfds-shadow-card);
  
  // Custom hover states following DKFDS patterns
  &:hover {
    box-shadow: var(--dkfds-shadow-card-hover);
    transform: translateY(-2px);
    transition: all 0.2s ease;
  }
  
  // Long variant custom spacing
  &.long {
    @media (min-width: 768px) {
      padding: var(--dkfds-spacing-8);
    }
  }
}

// Custom card content styling
.card-content {
  padding: var(--dkfds-spacing-6);
  
  // DKFDS typography scale
  .card-heading {
    font-size: var(--dkfds-font-size-h3);
    margin-bottom: var(--dkfds-spacing-3);
  }
  
  .card-subheading {
    font-size: var(--dkfds-font-size-small);
    color: var(--dkfds-color-text-secondary);
    margin-bottom: var(--dkfds-spacing-2);
  }
}
```

## Related Components

- **[FdsCardGroup](/components/data-display/fds-card-group.md)** - Layout container for organizing multiple cards
- **[FdsAccordion](/components/data-display/fds-accordion.md)** - Collapsible content organization
- **[FdsButton](/components/layout/fds-button.md)** - Action buttons for card actions
- **[FdsIkon](/components/layout/fds-ikon.md)** - Icons for visual enhancement

<!-- Verified against source -->