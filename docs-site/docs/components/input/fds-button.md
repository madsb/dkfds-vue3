---
title: FdsButton
description: Action button component implementing DKFDS v11 specifications with support for variants, icons, and responsive behavior
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [button, action, interactive, icon, responsive, form]
---

# FdsButton

Action button component implementing DKFDS v11 specifications. Provides primary action buttons with support for various styles, icons, and responsive behavior. Follows WCAG accessibility guidelines and DKFDS design patterns.

## Installation

The FdsButton component is part of the DKFDS Vue 3 library and is available when you install the package:

```bash
npm install @madsb/dkfds-vue3
# or
pnpm add @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <!-- Basic primary button -->
  <FdsButton @click="handleClick">Click me</FdsButton>
  
  <!-- Secondary button with icon -->
  <FdsButton variant="secondary" icon="save" icon-right @click="save">
    Save changes
  </FdsButton>
  
  <!-- Icon-only button -->
  <FdsButton 
    variant="tertiary" 
    icon="download" 
    icon-only 
    aria-label="Download file" 
    @click="download"
  />
</template>

<script setup>
import { FdsButton } from '@madsb/dkfds-vue3'

const handleClick = () => {
  console.log('Button clicked!')
}

const save = () => {
  // Save logic
}

const download = () => {
  // Download logic  
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'warning' \| string` | `'primary'` | No | Button variant determining visual style |
| `icon` | `string` | `undefined` | No | Icon name from DKFDS icon set to display in button |
| `iconRight` | `boolean` | `false` | No | Position icon on the right side of text |
| `fullWidthMobile` | `boolean` | `false` | No | Make button full width on mobile devices (xs-full-width class) |
| `iconOnly` | `boolean` | `false` | No | Style as icon-only button (hides text, requires aria-label) |

## Events

The FdsButton component uses `v-bind="$attrs"` to pass through all native button events like `@click`, `@focus`, `@blur`, etc.

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired when button is clicked |
| `focus` | `FocusEvent` | Fired when button receives focus |
| `blur` | `FocusEvent` | Fired when button loses focus |
| `keydown` | `KeyboardEvent` | Fired when key is pressed while button has focus |
| `keyup` | `KeyboardEvent` | Fired when key is released while button has focus |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Button text content. When `iconOnly` is true, content is visually hidden but remains for accessibility |

## Usage Examples

### Basic Button Variants

```vue
<template>
  <div class="button-examples">
    <!-- Primary button (default) -->
    <FdsButton @click="primaryAction">Primary Action</FdsButton>
    
    <!-- Secondary button -->
    <FdsButton variant="secondary" @click="secondaryAction">
      Secondary Action
    </FdsButton>
    
    <!-- Tertiary button -->
    <FdsButton variant="tertiary" @click="tertiaryAction">
      Tertiary Action
    </FdsButton>
    
    <!-- Warning button -->
    <FdsButton variant="warning" @click="warningAction">
      Delete Item
    </FdsButton>
  </div>
</template>

<script setup>
import { FdsButton } from '@madsb/dkfds-vue3'

const primaryAction = () => console.log('Primary action')
const secondaryAction = () => console.log('Secondary action')  
const tertiaryAction = () => console.log('Tertiary action')
const warningAction = () => console.log('Warning action')
</script>
```

### Buttons with Icons

```vue
<template>
  <div class="icon-button-examples">
    <!-- Icon on left (default) -->
    <FdsButton variant="primary" icon="save" @click="save">
      Gem ændringer
    </FdsButton>
    
    <!-- Icon on right -->
    <FdsButton variant="secondary" icon="arrow-forward" icon-right @click="next">
      Næste
    </FdsButton>
    
    <!-- Icon only -->
    <FdsButton 
      variant="tertiary" 
      icon="download" 
      icon-only 
      aria-label="Download fil"
      @click="download"
    />
    
    <!-- Multiple icon buttons -->
    <div class="icon-button-group">
      <FdsButton variant="tertiary" icon="edit" icon-only aria-label="Rediger" />
      <FdsButton variant="tertiary" icon="delete" icon-only aria-label="Slet" />
      <FdsButton variant="tertiary" icon="share" icon-only aria-label="Del" />
    </div>
  </div>
</template>

<script setup>
import { FdsButton } from '@madsb/dkfds-vue3'

const save = () => console.log('Saving...')
const next = () => console.log('Next step')
const download = () => console.log('Downloading...')
</script>
```

### Responsive and Form Buttons

```vue
<template>
  <div class="responsive-examples">
    <!-- Full width on mobile -->
    <FdsButton variant="primary" full-width-mobile @click="submit">
      Indsend ansøgning
    </FdsButton>
    
    <!-- Form button group -->
    <div class="button-group">
      <FdsButton variant="primary" type="submit">
        Gem og fortsæt
      </FdsButton>
      <FdsButton variant="secondary" @click="cancel">
        Annuller
      </FdsButton>
    </div>
    
    <!-- Button with custom attributes -->
    <FdsButton 
      variant="primary"
      disabled
      title="Knap er deaktiveret indtil formular er udfyldt"
    >
      Indsend
    </FdsButton>
  </div>
</template>

<script setup>
import { FdsButton } from '@madsb/dkfds-vue3'

const submit = () => console.log('Submitting form')
const cancel = () => console.log('Cancelling')
</script>
```

### Loading State Pattern

```vue
<template>
  <FdsButton 
    variant="primary" 
    :disabled="isLoading"
    :icon="isLoading ? 'hourglass' : 'save'"
    @click="handleSave"
  >
    {{ isLoading ? 'Gemmer...' : 'Gem' }}
  </FdsButton>
</template>

<script setup>
import { ref } from 'vue'
import { FdsButton } from '@madsb/dkfds-vue3'

const isLoading = ref(false)

const handleSave = async () => {
  isLoading.value = true
  try {
    await saveData()
    console.log('Saved successfully')
  } catch (error) {
    console.error('Save failed:', error)
  } finally {
    isLoading.value = false
  }
}

const saveData = () => {
  return new Promise(resolve => setTimeout(resolve, 2000))
}
</script>
```

## TypeScript Interface

```typescript
export interface FdsButtonProps {
  /** 
   * Button variant determining visual style
   * @values 'primary', 'secondary', 'tertiary', 'warning'
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | string
  
  /** 
   * Icon name from DKFDS icon set to display in button
   * @example 'save', 'download', 'arrow-forward'
   */
  icon?: string
  
  /** 
   * Position icon on the right side of text
   * @default false
   */
  iconRight?: boolean
  
  /** 
   * Make button full width on mobile devices (xs-full-width class)
   * @default false
   */
  fullWidthMobile?: boolean
  
  /** 
   * Style as icon-only button (hides text, requires aria-label)
   * @default false
   */
  iconOnly?: boolean
}
```

## Accessibility

The FdsButton component implements comprehensive accessibility features:

### WCAG 2.1 AA Compliance

- ✅ **Semantic markup**: Uses native `<button>` element
- ✅ **Keyboard navigation**: Full keyboard accessibility with Tab and Enter/Space
- ✅ **Focus indicators**: Clear visual focus states
- ✅ **Color contrast**: Meets WCAG AA contrast requirements (4.5:1 minimum)
- ✅ **Touch targets**: Minimum 44px touch target size on mobile

### Screen Reader Support

- **Icon handling**: Icons are marked as `decorative="true"` to prevent duplicate announcements
- **Icon-only buttons**: Require `aria-label` for meaningful description
- **Loading states**: Use `aria-busy` or update button text for status changes
- **Disabled state**: Properly announced by screen readers

### Keyboard Navigation

- **Tab**: Navigate to button
- **Enter/Space**: Activate button
- **Focus management**: Clear focus indicators and logical tab order

### Danish Government Requirements

- Complies with Danish accessibility legislation
- Supports screen readers commonly used in Denmark
- Includes Danish language considerations in examples

## DKFDS Guidelines

### Design Tokens

The component uses official DKFDS design tokens:

```scss
// Button variants use DKFDS color tokens
.button-primary { /* Uses primary color tokens */ }
.button-secondary { /* Uses secondary color tokens */ }
.button-tertiary { /* Uses tertiary color tokens */ }
.button-warning { /* Uses warning color tokens */ }
```

### Responsive Behavior

- **Mobile-first**: Default styling optimized for mobile
- **Breakpoint integration**: Uses DKFDS breakpoint system
- **Full-width mobile**: `xs-full-width` class for mobile-only full width

### Icon Integration

- **DKFDS icon set**: Only supports official DKFDS Material Design icons
- **Consistent sizing**: Icons automatically sized for button context
- **RTL support**: Icon positioning adapts for right-to-left languages

## Related Components

- [**FdsIcon**](../layout/fds-ikon) - Icon component used internally for button icons
- [**FdsFormgroup**](../forms/fds-formgroup) - Form container for button groups
- [**FdsSpinner**](../feedback/fds-spinner) - Loading indicator for async actions

<!-- Verified against source -->