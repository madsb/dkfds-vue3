---
title: FdsTilTop
description: Back to top component implementing DKFDS v11 tilbage-til-toppen specifications with smooth scroll-to-top functionality and intelligent visibility management.
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [navigation, scroll, back-to-top, accessibility, responsive]
---

# FdsTilTop

Back to top component implementing DKFDS v11 tilbage-til-toppen specifications. Provides smooth scroll-to-top functionality with intelligent visibility management. Appears after user scrolls down 2 screen heights, features responsive design (icon-only on mobile, with text on desktop), and includes proper accessibility attributes.

<!-- Verified against source -->

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <div>
    <!-- Your page content -->
    <h1 id="top">Page Title</h1>
    <div style="height: 3000px;">Long content...</div>
    
    <!-- Back to top button -->
    <fds-til-top />
  </div>
</template>

<script setup>
import { FdsTilTop } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `screenReaderText` | `string` | `'Til toppen af siden'` | No | Screen reader text for accessibility. Hidden text announced by screen readers when button receives focus. |
| `visibleText` | `string` | `'Til toppen'` | No | Visible text shown on desktop. Text displayed alongside the icon on desktop viewport sizes. Can be overridden by slot content. |
| `threshold` | `number` | `undefined` | No | Custom scroll threshold in pixels. Distance user must scroll before button becomes visible. If not specified, defaults to 2 screen heights (calculated dynamically). |

## Events

This component does not emit any custom events. It handles click events internally to scroll to top.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Custom content for the visible text on desktop. If provided, overrides the `visibleText` prop. |

## Usage Examples

### Basic Usage

```vue
<template>
  <fds-til-top />
</template>
```

### Custom Text and Threshold

```vue
<template>
  <fds-til-top 
    visible-text="Gå til top"
    screen-reader-text="Scroll til toppen af siden"
    :threshold="1000"
  />
</template>
```

### Custom Content with Slot

```vue
<template>
  <fds-til-top screen-reader-text="Tilbage til toppen">
    <span class="custom-text">
      <strong>Til</strong> toppen
    </span>
  </fds-til-top>
</template>
```

### English Version

```vue
<template>
  <fds-til-top 
    visible-text="Back to top"
    screen-reader-text="Go to top of page"
  />
</template>
```

### Immediate Visibility

```vue
<template>
  <!-- Show immediately when user scrolls any amount -->
  <fds-til-top :threshold="0" />
</template>
```

### Large Threshold for Long Pages

```vue
<template>
  <!-- Only show after scrolling 5 screen heights -->
  <fds-til-top :threshold="window.innerHeight * 5" />
</template>
```

## Behavior

### Visibility Management

- **Hidden by default**: Component is not visible when page loads
- **Dynamic threshold**: If no threshold prop is provided, calculates 2 × window height
- **Responsive threshold**: Recalculates default threshold on window resize
- **Smooth appearance**: Uses CSS transitions for show/hide states

### Scroll Behavior

- **Smooth scrolling**: Uses `window.scrollTo({ behavior: 'smooth' })`
- **Prevents default**: Prevents browser's default anchor link behavior
- **Targets top**: Scrolls to `top: 0` position
- **Event prevention**: Prevents page navigation to `#top` anchor

### Responsive Design

- **Mobile**: Shows icon only (text hidden with `d-none`)
- **Desktop**: Shows icon + text (text visible with `d-md-inline-block`)
- **Print**: Hidden from print with `d-print-none` class
- **Icon**: Always visible with `arrow-upward` symbol

## Accessibility

### WCAG 2.1 AA Compliance

- **Proper semantics**: Uses anchor element (`<a>`) with `href="#top"`
- **Screen reader support**: Includes screen reader text with `.sr-only` class
- **Keyboard navigation**: Fully keyboard accessible as focusable link
- **Focus management**: Proper focus handling for keyboard users
- **Decorative icon**: Icon marked as decorative with `aria-hidden="true"` and `focusable="false"`

### Accessibility Features

- **Screen reader text**: Announces purpose clearly to assistive technology
- **Visual text hidden**: Desktop text hidden from screen readers with `aria-hidden="true"`
- **Contrast compliance**: Uses DKFDS button styling for proper contrast
- **Focus indicators**: Inherits DKFDS focus styling
- **Reduced motion**: Respects user's motion preferences for smooth scrolling

## DKFDS Guidelines

### Component Structure

Follows DKFDS v11 tilbage-til-toppen specifications:

- Uses `button` and `back-to-top-button` CSS classes
- Implements `arrow-upward` icon as specified
- Maintains responsive behavior (icon-only on mobile)
- Includes proper print hiding with `d-print-none`

### Design System Integration

- **Typography**: Uses DKFDS font families and sizing
- **Colors**: Inherits DKFDS button color scheme
- **Spacing**: Follows DKFDS margin and padding standards  
- **Icons**: Uses DKFDS icon system with proper sizing
- **Responsive**: Implements DKFDS breakpoint system

### Theming Support

Compatible with both DKFDS themes:
- **VirkDK**: Government/business theme
- **BorgerDK**: Citizen/public theme

## Related Components

- **[FdsIkon](/components/layout/fds-ikon)** - Icon component used internally
- **[FdsButton](/components/layout/fds-button)** - Primary button component
- **[FdsSkipLink](/components/navigation/fds-skip-link)** - Skip to content navigation

## Technical Implementation

### TypeScript Interface

```typescript
export interface FdsTilTopProps {
  /** Screen reader text for accessibility */
  screenReaderText?: string
  /** Visible text shown on desktop */
  visibleText?: string
  /** Custom scroll threshold in pixels */
  threshold?: number
}
```

### Event Listeners

The component automatically manages scroll and resize event listeners:

```typescript
// Passive event listeners for performance
window.addEventListener('scroll', updateVisibility, { passive: true })
window.addEventListener('resize', resizeHandler, { passive: true })

// Automatic cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
  window.removeEventListener('resize', resizeHandler)
})
```

### Browser Compatibility

- **Modern browsers**: Full support with smooth scrolling
- **Legacy browsers**: Graceful degradation to instant scroll
- **Mobile browsers**: Touch-friendly with proper sizing
- **Screen readers**: Full compatibility with JAWS, NVDA, VoiceOver

## Examples in Context

### Long Article Layout

```vue
<template>
  <div>
    <header id="top">
      <h1>Article Title</h1>
    </header>
    
    <main>
      <article>
        <!-- Long article content -->
        <p>Content that creates need for back-to-top...</p>
      </article>
    </main>
    
    <footer>
      <p>Footer content</p>
    </footer>
    
    <!-- Back to top appears after 2 screen heights -->
    <fds-til-top />
  </div>
</template>
```

### Multi-language Support

```vue
<template>
  <div>
    <!-- Danish (default) -->
    <fds-til-top v-if="locale === 'da'" />
    
    <!-- English -->
    <fds-til-top 
      v-if="locale === 'en'"
      visible-text="Back to top"
      screen-reader-text="Go to top of page"
    />
    
    <!-- German -->
    <fds-til-top 
      v-if="locale === 'de'"
      visible-text="Nach oben"
      screen-reader-text="Zum Seitenanfang"
    />
  </div>
</template>
```

### Custom Styling Integration

```vue
<template>
  <fds-til-top class="custom-back-to-top">
    <span class="text-with-icon">
      ↑ Tilbage til toppen
    </span>
  </fds-til-top>
</template>

<style scoped>
.custom-back-to-top {
  /* Component uses DKFDS classes, custom styles are additive */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.text-with-icon {
  font-weight: 600;
}
</style>
```