---
title: FdsBadge
description: Small labels used to highlight new, important, or status-related content following DKFDS v11 badge specifications
category: data-display
dkfds: true
accessibility: WCAG 2.1 AA
tags: [badge, status, label, indicator, highlight]
---

# FdsBadge

Small labels used to highlight new, important, or status-related content. Designed for supplementary information that needs visual emphasis without being the primary focus. Supports semantic variants and proper HTML element selection for accessibility.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsBadge } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <div>
    <!-- Basic badge -->
    <FdsBadge>New</FdsBadge>
    
    <!-- Status badge with variant -->
    <FdsBadge variant="success">Approved</FdsBadge>
    
    <!-- Important badge with emphasis -->
    <FdsBadge tag="strong" variant="warning">Important</FdsBadge>
  </div>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `tag` | `'span' \| 'strong'` | `'span'` | No | HTML element type to render for semantic meaning. Use 'strong' for important/emphasized badges, 'span' for regular labels |
| `variant` | `'success' \| 'info' \| 'warning' \| 'error' \| null` | `null` | No | Visual variant indicating semantic status or importance level. Controls background color and styling for contextual meaning |

## Events

This component does not emit any events.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Badge content - text, numbers, or simple HTML elements |

## Usage Examples

### Basic Badge

```vue
<template>
  <div>
    <h3>Article Title <FdsBadge>New</FdsBadge></h3>
    <p>Regular badge for supplementary information.</p>
  </div>
</template>
```

### Status Badges with Variants

```vue
<template>
  <div class="status-examples">
    <p>Application status: <FdsBadge variant="success">Approved</FdsBadge></p>
    <p>Review status: <FdsBadge variant="warning">Pending</FdsBadge></p>
    <p>Document status: <FdsBadge variant="error">Rejected</FdsBadge></p>
    <p>Information: <FdsBadge variant="info">Under Review</FdsBadge></p>
  </div>
</template>
```

### Emphasized Badges for Important Content

```vue
<template>
  <div>
    <h2>
      Product Release 
      <FdsBadge tag="strong" variant="success">NEW</FdsBadge>
    </h2>
    
    <div class="alert alert-info">
      <FdsBadge tag="strong" variant="warning">Important Notice</FdsBadge>
      Please review the updated terms and conditions.
    </div>
  </div>
</template>
```

### Badges in Table Context

```vue
<template>
  <table class="table table--compact">
    <thead>
      <tr>
        <th>Bruger</th>
        <th>Status</th>
        <th>Roller</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Anna Nielsen</td>
        <td><FdsBadge variant="success">Aktiv</FdsBadge></td>
        <td><FdsBadge variant="info">Administrator</FdsBadge></td>
      </tr>
      <tr>
        <td>Lars Hansen</td>
        <td><FdsBadge variant="warning">Inaktiv</FdsBadge></td>
        <td><FdsBadge>Bruger</FdsBadge></td>
      </tr>
      <tr>
        <td>Maria Jensen</td>
        <td><FdsBadge variant="error">Blokeret</FdsBadge></td>
        <td><FdsBadge variant="info">Moderator</FdsBadge></td>
      </tr>
    </tbody>
  </table>
</template>
```

### Notification Counter Badges

```vue
<template>
  <nav>
    <ul class="nav-list">
      <li>
        <a href="/messages">
          Beskeder <FdsBadge variant="info">12</FdsBadge>
        </a>
      </li>
      <li>
        <a href="/notifications">
          Notifikationer <FdsBadge variant="warning">3</FdsBadge>
        </a>
      </li>
      <li>
        <a href="/updates">
          Opdateringer <FdsBadge tag="strong" variant="success">NEW</FdsBadge>
        </a>
      </li>
    </ul>
  </nav>
</template>
```

### Dynamic Badge Content

```vue
<template>
  <div>
    <h4>
      Ansøgning #{{ applicationId }}
      <FdsBadge 
        :tag="isUrgent ? 'strong' : 'span'" 
        :variant="getStatusVariant(status)"
      >
        {{ status }}
      </FdsBadge>
    </h4>
  </div>
</template>

<script setup lang="ts">
interface Props {
  applicationId: string
  status: 'approved' | 'pending' | 'rejected' | 'under-review'
  isUrgent: boolean
}

const { applicationId, status, isUrgent } = defineProps<Props>()

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'approved': return 'success'
    case 'pending': return 'warning'
    case 'rejected': return 'error'
    case 'under-review': return 'info'
    default: return null
  }
}
</script>
```

## Visual Variants and Color Schemes

### Variant Colors

- **Success** (`variant="success"`): Green background for positive states like "Approved", "Active", "Complete"
- **Info** (`variant="info"`): Blue background for informational content like "New", "Updated", "Under Review"
- **Warning** (`variant="warning"`): Yellow/orange background for cautionary states like "Pending", "Limited", "Expiring"
- **Error** (`variant="error"`): Red background for negative states like "Rejected", "Blocked", "Failed"
- **Default** (no variant): Neutral gray background for general labels

### DKFDS v11 Design Tokens

The badge component uses official DKFDS design tokens for consistent styling:

- Colors follow the DKFDS color palette
- Typography uses system font stack
- Spacing follows 8px grid system
- Border radius matches DKFDS component standards

## Accessibility

### WCAG 2.1 AA Compliance

- **Semantic HTML**: Proper use of `span` and `strong` elements for screen readers
- **Color Contrast**: All variant colors meet WCAG AA contrast requirements (4.5:1 minimum)
- **Meaningful Content**: Badge text should be descriptive and contextual
- **Screen Reader Support**: Content is announced by assistive technologies

### Best Practices

```vue
<template>
  <!-- ✅ Good: Descriptive and contextual -->
  <div>
    <span id="status-label">Application Status:</span>
    <FdsBadge aria-labelledby="status-label" variant="success">Approved</FdsBadge>
  </div>

  <!-- ✅ Good: Emphasized important information -->
  <div>
    <FdsBadge tag="strong" variant="warning">Action Required</FdsBadge>
    <p>Please update your contact information.</p>
  </div>

  <!-- ❌ Avoid: Non-descriptive or decorative content -->
  <div>
    <FdsBadge>•••</FdsBadge>
  </div>
</template>
```

### Keyboard Navigation

Badges are not interactive elements and do not receive keyboard focus. If interactive behavior is needed, use a button or link instead.

## Size and Positioning

### Size Considerations

Badges are designed to be compact supplementary labels:

- Fixed height following DKFDS specifications
- Width adjusts automatically to content
- Recommended for short text (1-3 words) or small numbers
- Avoid long sentences or complex content

### Positioning Guidelines

```vue
<template>
  <!-- ✅ Good: Adjacent to related content -->
  <h3>Feature Title <FdsBadge variant="success">New</FdsBadge></h3>
  
  <!-- ✅ Good: Inline with text -->
  <p>Status: <FdsBadge variant="info">Active</FdsBadge></p>
  
  <!-- ✅ Good: Table cell content -->
  <td><FdsBadge variant="warning">Pending</FdsBadge></td>
  
  <!-- ❌ Avoid: As primary action elements -->
  <button type="button">
    <FdsBadge>Click me</FdsBadge> <!-- Use actual button styling -->
  </button>
</template>
```

## Integration with Other Components

### With Form Components

```vue
<template>
  <fds-formgroup>
    <fds-label for="email">
      E-mail 
      <FdsBadge v-if="isRequired" tag="strong" variant="error">Påkrævet</FdsBadge>
    </fds-label>
    <fds-input 
      id="email" 
      v-model="email" 
      type="email"
    />
    <fds-hint v-if="isValid">
      <FdsBadge variant="success">Valid format</FdsBadge>
    </fds-hint>
  </fds-formgroup>
</template>
```

### With Navigation Components

```vue
<template>
  <fds-menu>
    <fds-menu-item href="/dashboard">
      Dashboard
    </fds-menu-item>
    <fds-menu-item href="/notifications">
      Notifications <FdsBadge variant="warning">3</FdsBadge>
    </fds-menu-item>
    <fds-menu-item href="/settings">
      Settings <FdsBadge tag="strong" variant="success">New</FdsBadge>
    </fds-menu-item>
  </fds-menu>
</template>
```

### With Card Components

```vue
<template>
  <fds-card>
    <template #header>
      <h3>
        Project Alpha 
        <FdsBadge variant="info">In Progress</FdsBadge>
      </h3>
    </template>
    
    <p>Project description and details...</p>
    
    <template #footer>
      <FdsBadge variant="warning">Due: Tomorrow</FdsBadge>
      <FdsBadge tag="strong" variant="error">High Priority</FdsBadge>
    </template>
  </fds-card>
</template>
```

## DKFDS Guidelines

### Official Usage Recommendations

Based on [DKFDS Badge Documentation](https://designsystem.dk/komponenter/badges/):

1. **Highlighting Content**: Use badges to highlight new, important, or status-related content
2. **Avoid Button Confusion**: Don't style badges to look like interactive buttons
3. **Moderation**: Use sparingly - only when truly meaningful
4. **Clear Language**: Use recognizable terms that users understand
5. **Semantic Emphasis**: Use `tag="strong"` when content is particularly important

### Danish Government Context

```vue
<template>
  <div class="service-overview">
    <h2>
      Digital Post <FdsBadge tag="strong" variant="success">Ny tjeneste</FdsBadge>
    </h2>
    
    <div class="status-grid">
      <div class="status-item">
        <span>Ansøgning:</span>
        <FdsBadge variant="success">Godkendt</FdsBadge>
      </div>
      
      <div class="status-item">
        <span>Dokumenter:</span>
        <FdsBadge variant="info">Under behandling</FdsBadge>
      </div>
      
      <div class="status-item">
        <span>Sagsbehandling:</span>
        <FdsBadge variant="warning">Afventer svar</FdsBadge>
      </div>
    </div>
  </div>
</template>
```

### VirkDK/BorgerDK Theme Support

The component automatically adapts to the active DKFDS theme:

- **VirkDK**: Business/professional color scheme
- **BorgerDK**: Citizen-facing color scheme

Both themes maintain WCAG AA contrast requirements and consistent visual hierarchy.

## Related Components

- [FdsAlert](/components/feedback/fds-alert) - For prominent user feedback messages
- [FdsTag](/components/data-display/fds-tag) - For categorization and filtering
- [FdsButton](/components/input/fds-button) - For interactive actions
- [FdsToast](/components/feedback/fds-toast) - For temporary status notifications

## TypeScript Interface

```typescript
export interface FdsBadgeProps {
  /** 
   * HTML element type to render for semantic meaning
   * Use 'strong' for important/emphasized badges, 'span' for regular labels
   * @values 'span', 'strong'
   * @default 'span'
   */
  tag?: 'span' | 'strong'
  
  /** 
   * Visual variant indicating semantic status or importance level
   * Controls background color and styling for contextual meaning
   * @values 'success', 'info', 'warning', 'error', null
   * @default null
   */
  variant?: 'success' | 'info' | 'warning' | 'error' | null
}
```

<!-- Verified against source -->