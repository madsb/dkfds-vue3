---
title: FdsTooltip
description: Accessible tooltip component implementing DKFDS v11 specifications with click and hover triggers, proper ARIA support, and flexible positioning for contextual help information.
category: feedback
dkfds: true
accessibility: WCAG 2.1 AA
tags: [tooltip, help, accessibility, contextual-help, aria]
---

# FdsTooltip

Accessible tooltip component implementing DKFDS v11 specifications for providing contextual help information. Features proper ARIA labeling, keyboard navigation support, and flexible positioning. Designed primarily for help icons but can be adapted for other contextual information needs.

## Installation

```typescript
import { FdsTooltip } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <div>
    <!-- Basic help tooltip with click trigger -->
    <FdsTooltip 
      content="Dette felt er påkrævet for at behandle din ansøgning"
      trigger="click"
      position="above"
    />
    
    <!-- Custom icon tooltip with hover trigger -->
    <FdsTooltip 
      content="Yderligere information om denne funktion"
      trigger="hover"
      icon="info"
      position="below"
      aria-label="Funktionsinformation"
    />
  </div>
</template>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | `string` | - | ✅ | Tooltip text content to display. Should be concise yet informative help text. Essential for user understanding and accessibility |
| `position` | `'above' \| 'below'` | `'above'` | - | Position of tooltip relative to the trigger button. Choose based on available screen space and UI layout |
| `trigger` | `'hover' \| 'click'` | `'click'` | - | Interaction method to trigger tooltip display. 'click' is more accessible and mobile-friendly than 'hover' |
| `icon` | `string` | `'help'` | - | Icon name to display in the tooltip button. Should be semantic and recognizable to users |
| `disabled` | `boolean` | `false` | - | Disable tooltip interaction completely. Useful for conditional help availability |
| `forceVisible` | `boolean` | `false` | - | Force tooltip to remain visible regardless of trigger. Useful for complex layouts or debugging purposes |
| `isLabel` | `boolean` | `false` | - | Use tooltip content as aria-label instead of aria-describedby. Appropriate when tooltip serves as the primary label for icon-only buttons |
| `id` | `string` | - | - | Custom ID for the tooltip element. Auto-generated if not provided for accessibility purposes |
| `ariaLabel` | `string` | - | - | Custom aria-label text for the tooltip trigger button. Overrides default accessibility text when provided |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `show` | `[]` | Emitted when tooltip becomes visible. Useful for analytics or coordinating with other UI elements |
| `hide` | `[]` | Emitted when tooltip is hidden/dismissed. Can trigger cleanup or follow-up actions |
| `toggle` | `[isVisible: boolean]` | Emitted whenever tooltip visibility state changes. Provides boolean indicating current visibility for state management |

## Slots

This component does not provide slots as it follows DKFDS patterns using structured data attributes and the internal tooltip utility system.

## Usage Examples

### Basic Help Tooltip

```vue
<template>
  <FdsTooltip 
    content="Dette felt er påkrævet for at behandle din ansøgning"
    trigger="click"
    position="above"
  />
</template>
```

### Custom Icon with Hover Trigger

```vue
<template>
  <FdsTooltip 
    content="Yderligere information om denne funktion"
    trigger="hover"
    icon="info"
    position="below"
    aria-label="Funktionsinformation"
  />
</template>
```

### Tooltip as Accessible Label

```vue
<template>
  <FdsTooltip 
    content="Rediger profilindstillinger"
    :is-label="true"
    icon="edit"
    trigger="hover"
  />
</template>
```

### Conditional Help Tooltip

```vue
<template>
  <FdsTooltip 
    content="Hjælp er ikke tilgængelig i denne kontekst"
    :disabled="!helpAvailable"
    :force-visible="false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const helpAvailable = ref(true)
</script>
```

### Form Field Help

```vue
<template>
  <div class="form-group">
    <label for="cpr">CPR-nummer</label>
    <div class="input-group">
      <input 
        id="cpr" 
        type="text" 
        placeholder="DDMMÅÅ-XXXX"
        class="form-control"
      />
      <FdsTooltip 
        content="Indtast dit 10-cifrede CPR-nummer inklusiv bindestreg"
        trigger="click"
        position="above"
        @show="onTooltipShow"
        @hide="onTooltipHide"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const onTooltipShow = () => {
  console.log('Help tooltip opened')
}

const onTooltipHide = () => {
  console.log('Help tooltip closed')
}
</script>
```

### Multiple Positioned Tooltips

```vue
<template>
  <div class="tooltip-demo">
    <div class="row">
      <FdsTooltip 
        content="Tooltip placeret ovenfor"
        position="above"
        trigger="click"
        icon="help"
      />
      <FdsTooltip 
        content="Tooltip placeret nedenfor"
        position="below" 
        trigger="click"
        icon="info"
      />
    </div>
  </div>
</template>

<style scoped>
.tooltip-demo {
  padding: 2rem;
}

.row {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
```

## Tooltip Positioning

### Automatic Positioning Logic

The tooltip automatically calculates optimal positioning based on available screen space:

- **Above (default)**: Tooltip appears above the trigger button
- **Below**: Tooltip appears below the trigger button
- **Smart positioning**: Automatically switches position if insufficient space
- **Responsive width**: Adjusts width based on WCAG 2.1 reflow criteria (max 320px - margins)
- **Edge detection**: Prevents tooltips from being cut off at screen edges

### Position Guidelines

```vue
<!-- Recommended for form fields -->
<FdsTooltip position="above" />

<!-- Good for navigation items -->
<FdsTooltip position="below" />

<!-- Let the component decide based on space -->
<FdsTooltip /> <!-- Defaults to 'above' with automatic fallback -->
```

## Trigger Behavior

### Click Trigger (Recommended)

Click triggers provide better accessibility and mobile support:

```vue
<FdsTooltip trigger="click" />
```

**Behavior:**
- Single click to show/hide
- Keyboard activation with Enter or Space
- Focus management and ARIA expansion states
- Closes with Escape key or clicking outside
- Better for mobile and touch interfaces

### Hover Trigger

Hover triggers for desktop pointer interactions:

```vue
<FdsTooltip trigger="hover" />
```

**Behavior:**
- Mouse hover with 300ms delay
- Touch long-press (600ms) for mobile devices  
- Focus and blur events for keyboard users
- Automatic hide on pointer leave
- Less accessible but faster interaction

## Accessibility Features

### ARIA Support

The component provides comprehensive ARIA support:

**Click Tooltips (Toggletips):**
- `aria-expanded`: Indicates tooltip visibility state
- `aria-controls`: References tooltip element ID
- `aria-live="assertive"`: Announces content changes
- `role="tooltip"`: Identifies tooltip element

**Hover Tooltips:**
- `aria-describedby`: Links trigger to tooltip description
- `aria-labelledby`: When `isLabel` is true
- `role="tooltip"`: Semantic tooltip role

### Keyboard Navigation

- **Enter/Space**: Activates click tooltips
- **Escape**: Closes all open tooltips
- **Tab**: Moves focus and closes inactive tooltips
- **Focus/Blur**: Shows/hides hover tooltips

### Screen Reader Compatibility

```vue
<!-- Descriptive tooltip -->
<FdsTooltip 
  content="Indtast dit CPR-nummer uden mellemrum"
  :is-label="false"
  aria-label="Hjælp til CPR-nummer"
/>

<!-- Label tooltip for icon-only buttons -->
<FdsTooltip 
  content="Luk vindue"
  :is-label="true"
  icon="close"
  trigger="hover"
/>
```

## Tooltip Timing and Delay

### Hover Delays

- **Show delay**: 300ms hover delay prevents accidental activation
- **Long press**: 600ms touch long-press for mobile tooltip activation
- **Hide delay**: Immediate hide on pointer leave (with area tolerance)

### Configuration

The timing constants are optimized for DKFDS usability but can be adjusted via the underlying tooltip utility if needed.

## Integration with Form Controls

### Form Field Help

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="password">
      Adgangskode
      <FdsTooltip 
        content="Mindst 8 tegn med tal og specialtegn"
        trigger="click"
        position="above"
        icon="help"
      />
    </FdsLabel>
    <FdsInput 
      id="password"
      type="password"
      :required="true"
    />
  </FdsFormgroup>
</template>
```

### Validation Help

```vue
<template>
  <div class="field-with-help">
    <FdsInput 
      v-model="email"
      type="email"
      :error="emailError"
    />
    <FdsTooltip 
      v-if="emailError"
      content="E-mail skal have et gyldigt format som navn@domæne.dk"
      trigger="click"
      position="below"
      icon="warning"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const emailError = computed(() => {
  return email.value && !email.value.includes('@')
})
</script>
```

## DKFDS Guidelines

### Visual Design

The tooltip follows DKFDS v11 specifications:

- **Help icon**: Default help (question mark) icon
- **Color scheme**: Follows DKFDS color tokens
- **Typography**: Uses system typography scale
- **Shadows**: DKFDS elevation system
- **Spacing**: Consistent with DKFDS spacing tokens

### Content Guidelines

**Danish Language Examples:**
```vue
<!-- Good: Clear, actionable help text -->
<FdsTooltip content="Indtast din e-mail som den står i borger.dk" />

<!-- Good: Specific format requirements -->
<FdsTooltip content="Telefonnummer med landekode, f.eks. +45 12 34 56 78" />

<!-- Good: Context-specific guidance -->
<FdsTooltip content="Vælg den adresse, hvor du er folkeregistreret" />

<!-- Avoid: Vague or redundant text -->
<FdsTooltip content="Hjælp til dette felt" />
```

### Accessibility Requirements

- **WCAG 2.1 AA compliance**: All interactions keyboard accessible
- **Color contrast**: Minimum 4.5:1 contrast ratio
- **Focus indicators**: Clear visual focus states
- **Text sizing**: Respects user font size preferences
- **Screen readers**: Full compatibility with assistive technology

### Usage Patterns

**Recommended Use Cases:**
- Form field clarification
- Feature explanation
- Format requirements
- Context-sensitive help
- Icon button labels

**Avoid For:**
- Essential information (use main content instead)
- Long explanatory text (use dedicated help sections)
- Error messages (use proper error components)
- Navigation labels (use proper navigation patterns)

## Related Components

- **[FdsAlert](/components/feedback/fds-alert)** - For important notifications and messages
- **[FdsModal](/components/feedback/fds-modal)** - For complex help content requiring full screen
- **[FdsLabel](/components/forms/fds-label)** - For form field labeling
- **[FdsHint](/components/forms/fds-hint)** - For additional form guidance
- **[FdsIkon](/components/layout/fds-ikon)** - For custom tooltip trigger icons

<!-- Verified against source -->