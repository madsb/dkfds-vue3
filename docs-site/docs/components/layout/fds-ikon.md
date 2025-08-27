---
title: FdsIkon
description: Icon component implementing DKFDS v11 icon specifications with Material Design icons, accessibility features, and SVG symbol references
category: layout
dkfds: true
accessibility: WCAG 2.1 AA
tags: [icon, svg, material-design, accessibility, decorative, inline]
---

# FdsIkon

Icon component implementing DKFDS v11 icon specifications. Renders SVG icons from the DKFDS Material Design icon set with proper accessibility attributes. Supports both decorative and meaningful icons, inline sizing, and screen reader integration. Uses SVG symbol references for optimal performance and consistency across the application.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsIkon } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <!-- Basic decorative icon -->
  <FdsIkon icon="home" />
  
  <!-- Meaningful icon with accessibility -->
  <FdsIkon 
    icon="warning" 
    :decorative="false"
    aria-label="Warning: This action cannot be undone"
  />
</template>

<script setup lang="ts">
import { FdsIkon } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop         | Type      | Default | Required | Description                                                                                             |
| ------------ | --------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `icon`       | `string`  | `'home'`| No       | Icon name from DKFDS Material Design icon set. Corresponds to the symbol ID in the icon collection.   |
| `inline`     | `boolean` | `false` | No       | Adjust icon to text height (inline display). When true, icon scales with surrounding text size.       |
| `ariaLabel`  | `string`  | `undefined` | No   | ARIA label for screen readers. Required when decorative is false. Describes the icon's meaning.       |
| `decorative` | `boolean` | `true`  | No       | Whether the icon is decorative. Decorative icons are hidden from screen readers (aria-hidden="true"). |

## Usage Examples

### Basic Decorative Icon

```vue
<template>
  <div class="welcome-section">
    <h1>
      <FdsIkon icon="home" />
      Welcome Home
    </h1>
    <p>Navigate through your dashboard using the icons below.</p>
  </div>
</template>

<script setup lang="ts">
import { FdsIkon } from '@madsb/dkfds-vue3'
</script>
```

### Meaningful Icon with ARIA Label

```vue
<template>
  <div class="notification-panel">
    <div class="alert-message">
      <FdsIkon 
        icon="warning" 
        :decorative="false"
        aria-label="Warning: This action cannot be undone"
      />
      <span>Please review your changes carefully before proceeding.</span>
    </div>
    
    <div class="success-message">
      <FdsIkon 
        icon="check-circle" 
        :decorative="false"
        aria-label="Success: Operation completed successfully"
      />
      <span>Your data has been saved successfully.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FdsIkon } from '@madsb/dkfds-vue3'
</script>
```

### Inline Icons with Text

```vue
<template>
  <div class="status-list">
    <p class="status-item">
      <FdsIkon icon="check" :inline="true" />
      Task completed successfully
    </p>
    
    <p class="status-item">
      <FdsIkon icon="schedule" :inline="true" />
      Scheduled for later processing
    </p>
    
    <p class="status-item">
      <FdsIkon icon="error" :inline="true" />
      Error occurred during processing
    </p>
  </div>
</template>

<script setup lang="ts">
import { FdsIkon } from '@madsb/dkfds-vue3'
</script>

<style scoped>
.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}
</style>
```

### Icons in Button Context

```vue
<template>
  <div class="action-buttons">
    <!-- Decorative icons in buttons -->
    <FdsButton variant="primary">
      <FdsIkon icon="download" :decorative="true" />
      Download File
    </FdsButton>
    
    <FdsButton variant="secondary">
      <FdsIkon icon="share" :decorative="true" />
      Share Document
    </FdsButton>
    
    <FdsButton variant="tertiary">
      <FdsIkon icon="print" :decorative="true" />
      Print Page
    </FdsButton>
    
    <!-- Icon-only button with meaningful icon -->
    <FdsButton 
      variant="ghost" 
      aria-label="Close dialog"
      class="close-button"
    >
      <FdsIkon 
        icon="close" 
        :decorative="false"
        aria-label="Close"
      />
    </FdsButton>
  </div>
</template>

<script setup lang="ts">
import { FdsIkon, FdsButton } from '@madsb/dkfds-vue3'
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.close-button {
  min-width: 44px;
  min-height: 44px;
}
</style>
```

### Navigation Menu with Icons

```vue
<template>
  <nav class="main-navigation">
    <ul class="nav-list">
      <li class="nav-item">
        <a href="/dashboard" class="nav-link">
          <FdsIkon icon="dashboard" :decorative="true" />
          <span>Dashboard</span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="/profile" class="nav-link">
          <FdsIkon icon="person" :decorative="true" />
          <span>Profile</span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="/settings" class="nav-link">
          <FdsIkon icon="settings" :decorative="true" />
          <span>Settings</span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="/help" class="nav-link">
          <FdsIkon icon="help" :decorative="true" />
          <span>Help</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { FdsIkon } from '@madsb/dkfds-vue3'
</script>

<style scoped>
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.nav-link:hover {
  background-color: var(--color-primary-lighten-4);
}
</style>
```

### Form Field Icons

```vue
<template>
  <form class="search-form">
    <FdsFormgroup>
      <FdsLabel>Search Documents</FdsLabel>
      <div class="input-with-icon">
        <FdsIkon 
          icon="search" 
          :decorative="false"
          aria-label="Search icon"
          class="search-icon"
        />
        <FdsInput 
          v-model="searchQuery"
          placeholder="Enter search terms..."
          type="search"
          class="search-input"
        />
      </div>
    </FdsFormgroup>
    
    <FdsFormgroup>
      <FdsLabel>Filter by Category</FdsLabel>
      <div class="select-with-icon">
        <FdsIkon 
          icon="filter-list" 
          :decorative="true"
          class="filter-icon"
        />
        <FdsDropdown v-model="selectedCategory">
          <option value="">All Categories</option>
          <option value="documents">Documents</option>
          <option value="images">Images</option>
          <option value="videos">Videos</option>
        </FdsDropdown>
      </div>
    </FdsFormgroup>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  FdsIkon, 
  FdsFormgroup, 
  FdsLabel, 
  FdsInput, 
  FdsDropdown 
} from '@madsb/dkfds-vue3'

const searchQuery = ref('')
const selectedCategory = ref('')
</script>

<style scoped>
.input-with-icon,
.select-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon,
.filter-icon {
  position: absolute;
  left: 12px;
  z-index: 1;
  color: var(--color-text-secondary);
}

.search-input {
  padding-left: 2.5rem;
}
</style>
```

### Status Indicators

```vue
<template>
  <div class="document-status">
    <h3>Document Status Overview</h3>
    
    <div class="status-grid">
      <div class="status-card">
        <FdsIkon 
          icon="check-circle" 
          :decorative="false"
          aria-label="Approved documents"
          class="status-icon success"
        />
        <div class="status-info">
          <span class="status-count">24</span>
          <span class="status-label">Approved</span>
        </div>
      </div>
      
      <div class="status-card">
        <FdsIkon 
          icon="schedule" 
          :decorative="false"
          aria-label="Pending documents"
          class="status-icon warning"
        />
        <div class="status-info">
          <span class="status-count">8</span>
          <span class="status-label">Pending</span>
        </div>
      </div>
      
      <div class="status-card">
        <FdsIkon 
          icon="error" 
          :decorative="false"
          aria-label="Rejected documents"
          class="status-icon error"
        />
        <div class="status-info">
          <span class="status-count">3</span>
          <span class="status-label">Rejected</span>
        </div>
      </div>
      
      <div class="status-card">
        <FdsIkon 
          icon="draft" 
          :decorative="false"
          aria-label="Draft documents"
          class="status-icon info"
        />
        <div class="status-info">
          <span class="status-count">12</span>
          <span class="status-label">Draft</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FdsIkon } from '@madsb/dkfds-vue3'
</script>

<style scoped>
.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background);
}

.status-icon {
  font-size: 2rem;
}

.status-icon.success {
  color: var(--color-success);
}

.status-icon.warning {
  color: var(--color-warning);
}

.status-icon.error {
  color: var(--color-error);
}

.status-icon.info {
  color: var(--color-info);
}

.status-info {
  display: flex;
  flex-direction: column;
}

.status-count {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
}

.status-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
```

### Danish Government Context

```vue
<template>
  <div class="government-portal">
    <!-- Header with Danish government branding -->
    <header class="portal-header">
      <div class="logo-section">
        <FdsIkon 
          icon="account-balance" 
          :decorative="false"
          aria-label="Danish Government Portal"
          class="government-logo"
        />
        <h1>Borger.dk Portal</h1>
      </div>
      
      <nav class="header-nav">
        <a href="/min-side" class="nav-link">
          <FdsIkon icon="person" :decorative="true" />
          Min Side
        </a>
        <a href="/beskeder" class="nav-link">
          <FdsIkon icon="mail" :decorative="true" />
          Beskeder
        </a>
        <a href="/dokumenter" class="nav-link">
          <FdsIkon icon="folder" :decorative="true" />
          Dokumenter
        </a>
      </nav>
    </header>
    
    <!-- Service categories -->
    <main class="service-grid">
      <section class="service-category">
        <h2>
          <FdsIkon icon="health-and-safety" :decorative="true" />
          Sundhed og Familie
        </h2>
        <ul class="service-list">
          <li>
            <a href="/sundhed/laege">
              <FdsIkon icon="local-hospital" :decorative="true" />
              Book lægebesøg
            </a>
          </li>
          <li>
            <a href="/familie/boernepenge">
              <FdsIkon icon="child-care" :decorative="true" />
              Ansøg om børnepenge
            </a>
          </li>
        </ul>
      </section>
      
      <section class="service-category">
        <h2>
          <FdsIkon icon="work" :decorative="true" />
          Arbejde og Uddannelse
        </h2>
        <ul class="service-list">
          <li>
            <a href="/arbejde/dagpenge">
              <FdsIkon icon="payments" :decorative="true" />
              Ansøg om dagpenge
            </a>
          </li>
          <li>
            <a href="/uddannelse/su">
              <FdsIkon icon="school" :decorative="true" />
              SU-ansøgning
            </a>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { FdsIkon } from '@madsb/dkfds-vue3'
</script>

<style scoped>
.portal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-primary);
  color: white;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.government-logo {
  font-size: 2rem;
}

.header-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.service-category h2 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.service-list {
  list-style: none;
  padding: 0;
}

.service-list li {
  margin-bottom: 0.5rem;
}

.service-list a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  text-decoration: none;
  color: var(--color-text);
  border-radius: 4px;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.service-list a:hover {
  background-color: var(--color-primary-lighten-4);
  border-color: var(--color-primary-lighten-2);
}
</style>
```

## Accessibility

FdsIkon implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Icon Semantics and Screen Reader Support

- **Decorative Icons**: By default (`decorative="true"`), icons are hidden from screen readers using `aria-hidden="true"`
- **Meaningful Icons**: When `decorative="false"`, icons receive proper semantic roles and labels for assistive technologies
- **ARIA Labels**: Required `aria-label` attribute provides descriptive text for screen readers when icons convey meaning
- **Role Attribution**: Meaningful icons automatically receive `role="img"` for proper semantic identification

### Focus and Keyboard Navigation

- **Focusable Management**: Icons are set to `focusable="false"` to prevent unwanted tab stops while maintaining click targets
- **Container Integration**: When used in interactive elements (buttons, links), focus is properly managed by the parent container
- **Keyboard Accessibility**: No interference with standard keyboard navigation patterns

### Visual and Cognitive Accessibility

- **High Contrast**: Icons work with high contrast themes and maintain visibility across different contrast ratios
- **Scalable Design**: SVG-based icons scale cleanly without pixelation for users who need larger text/icons
- **Inline Sizing**: `inline` prop allows icons to scale with text for users who adjust font sizes

### Content and Context

- **Meaningful Descriptions**: When icons convey information, `aria-label` provides clear, contextual descriptions
- **Cultural Considerations**: Icon choices and descriptions consider Danish language and cultural context
- **Redundant Information**: Important information is never conveyed through icons alone

### Implementation Guidelines

```vue
<!-- ✅ Good: Decorative icon in button with text -->
<FdsButton>
  <FdsIkon icon="download" :decorative="true" />
  Download File
</FdsButton>

<!-- ✅ Good: Meaningful icon with proper label -->
<FdsIkon 
  icon="warning" 
  :decorative="false"
  aria-label="Advarsel: Denne handling kan ikke fortrydes"
/>

<!-- ❌ Avoid: Meaningful icon without aria-label -->
<FdsIkon icon="error" :decorative="false" />

<!-- ❌ Avoid: Important information conveyed only by icon -->
<div>
  <FdsIkon icon="check" :decorative="true" />
  <!-- No text explaining what was successful -->
</div>
```

## DKFDS Guidelines

FdsIkon follows the Danish Common Design System specifications for iconography:

### Material Design Integration

- **Icon Set Compliance**: Uses Material Design icons as specified in DKFDS v11 guidelines
- **Consistent Styling**: Icons follow DKFDS visual design principles for weight, size, and optical alignment
- **Symbol References**: Utilizes SVG symbols from `fds-icon-collection` for optimal performance and consistency
- **Theme Compatibility**: Works seamlessly with both VirkDK and BorgerDK themes

### Performance and Technical Standards

- **SVG Optimization**: Uses SVG symbol references (`<use>`) for optimal loading performance and caching
- **Semantic HTML**: Implements proper SVG structure with appropriate accessibility attributes
- **CSS Integration**: Uses DKFDS icon-specific CSS classes (`icon-svg`, `inline-svg`) for consistent styling
- **Scalability**: Vector-based icons ensure crisp rendering at all sizes and resolutions

### Design System Integration

- **Component Ecosystem**: Designed to work seamlessly with other DKFDS components (buttons, forms, navigation)
- **Spacing Consistency**: Icon sizing and spacing follow DKFDS grid and spacing guidelines
- **Color System**: Icons inherit color from parent elements and respect DKFDS color palette
- **Responsive Design**: Icons scale appropriately across different device sizes and orientations

### Danish Context Considerations

- **Government Standards**: Follows Danish government design standards for public service interfaces
- **Cultural Appropriateness**: Icon selection considers Danish cultural context and government service conventions
- **Accessibility Compliance**: Meets Danish accessibility requirements and WCAG 2.1 AA standards
- **Language Support**: ARIA labels and descriptions support Danish language conventions

### Best Practices

```vue
<!-- ✅ DKFDS Compliant: Using standard icon names -->
<FdsIkon icon="home" />
<FdsIkon icon="person" />
<FdsIkon icon="settings" />

<!-- ✅ DKFDS Compliant: Inline icons with text -->
<p>
  <FdsIkon icon="check" :inline="true" />
  Opgave fuldført
</p>

<!-- ✅ DKFDS Compliant: Icons in navigation -->
<FdsButton variant="tertiary">
  <FdsIkon icon="arrow-back" :decorative="true" />
  Tilbage
</FdsButton>

<!-- ❌ Avoid: Custom icon names not in DKFDS set -->
<FdsIkon icon="custom-icon" />

<!-- ❌ Avoid: Oversized icons breaking visual hierarchy -->
<FdsIkon icon="home" style="font-size: 5rem;" />
```

## Related Components

- **[FdsIconCollection](/components/layout/fds-icon-collection)** - SVG symbol collection containing all available icons
- **[FdsButton](/components/input/fds-button)** - Buttons commonly used with icons
- **[FdsSprogvaelger](/components/layout/fds-sprogvaelger)** - Language selector using flag icons
- **[FdsFunktionslink](/components/layout/fds-funktionslink)** - Functional links often paired with icons
- **[FdsAlert](/components/feedback/fds-alert)** - Alert components using status icons
- **[FdsTooltip](/components/feedback/fds-tooltip)** - Tooltips often triggered by info icons

## TypeScript Support

```typescript
import type { FdsIkonProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsIkonProps {
  /** Icon name from DKFDS Material Design icon set */
  icon?: string
  /** Adjust icon to text height (inline display) */
  inline?: boolean
  /** ARIA label for screen readers */
  ariaLabel?: string
  /** Whether the icon is decorative */
  decorative?: boolean
}

// Usage in component
const iconProps: FdsIkonProps = {
  icon: 'warning',
  decorative: false,
  ariaLabel: 'Advarsel: Tjek dine oplysninger'
}
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/layout/fds-ikon.vue -->