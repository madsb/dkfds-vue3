# Components

DKFDS Vue 3 provides 40+ accessible components organized into logical categories. Each component follows DKFDS v11 specifications and includes full TypeScript support.

## Component Categories

### 📋 Forms (4 components)

Components for structuring forms with proper validation and accessibility.

- [**Form Group**](./forms/fds-formgroup) - Container for form field elements
- [**Label**](./forms/fds-label) - Semantic labels with proper associations
- [**Hint**](./forms/fds-hint) - Helper text and field descriptions
- [**Error Message**](./forms/fds-fejlmeddelelse) - Validation error display

### ✏️ Input (11 components)

User input controls with validation and accessibility features.

- [**Button**](./input/fds-button) - Action buttons with variants and icons
- [**Input**](./input/fds-input) - Text input with validation support
- [**Input Number**](./input/fds-input-number) - Numeric input with formatting
- [**Textarea**](./input/fds-textarea) - Multi-line text input
- [**Checkbox**](./input/fds-checkbox) - Single checkbox control
- [**Radio Group**](./input/fds-radio-group) - Radio button container
- [**Toggle Switch**](./input/fds-toggle-switch) - On/off toggle control
- [**Dropdown**](./input/fds-dropdown) - Select dropdown menu
- [**Date Picker**](./input/fds-date-picker) - Interactive date selection
- [**File Upload**](./input/fds-file-upload) - File selection control

### 🧭 Navigation (11 components)

Navigation and wayfinding components for site structure.

- [**Breadcrumb**](./navigation/fds-breadcrumb) - Hierarchical navigation trail
- [**Pagination**](./navigation/fds-pagination) - Page navigation controls
- [**Step Indicator**](./navigation/fds-step-indicator) - Multi-step process navigation
- [**Tabs**](./navigation/fds-tabs) - Tabbed content organization
- [**Navigation Link**](./navigation/fds-nav-link) - Styled navigation links

### 💬 Feedback (9 components)

User notifications, dialogs, and feedback mechanisms.

- [**Alert**](./feedback/fds-alert) - Status messages and notifications
- [**Toast**](./feedback/fds-toast) - Temporary notification messages
- [**Modal**](./feedback/fds-modal) - Dialog and overlay windows
- [**Spinner**](./feedback/fds-spinner) - Loading indicators

### 📊 Data Display (8 components)

Components for presenting and organizing content.

- [**Accordion**](./data-display/fds-accordion) - Collapsible content sections
- [**Card**](./data-display/fds-card) - Content container with styling
- [**Table**](./data-display/fds-table) - Data table with sorting/filtering
- [**List**](./data-display/fds-list) - Semantic lists with styling
- [**Details**](./data-display/fds-details) - Expandable content sections

### 🏗️ Layout (6 components)

Foundation components for page structure and branding.

- [**Icon**](./layout/fds-icon) - DKFDS icon system
- [**Language Selector**](./layout/fds-language-selector) - Multi-language support
- [**Cookie Notice**](./layout/fds-cookie-notice) - GDPR compliance banner

## Quick Import Reference

### Individual Imports (Recommended)

```typescript
// Import specific components
import { FdsButton, FdsInput, FdsFormgroup, FdsLabel, FdsAlert } from '@madsb/dkfds-vue3'

// Import types
import type { FdsButtonProps, FdsInputProps, FdsAlertVariant } from '@madsb/dkfds-vue3'
```

### Global Registration

```typescript
// Register all components globally
import dkfdsVue3 from '@madsb/dkfds-vue3'
import '@madsb/dkfds-vue3/styles'

app.use(dkfdsVue3)
```

### Composables

```typescript
// Import utility functions
import { useToast, formId, generateId } from '@madsb/dkfds-vue3'
```

## Common Patterns

### Form Structure

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="field-id">Field Label *</FdsLabel>
    <FdsHint>Optional help text</FdsHint>
    <FdsInput id="field-id" v-model="value" :class="{ 'input-error': hasError }" />
    <FdsFejlmeddelelse v-if="hasError"> Error message </FdsFejlmeddelelse>
  </FdsFormgroup>
</template>
```

### Button Groups

```vue
<template>
  <div class="button-group">
    <FdsButton variant="primary" @click="save"> Gem </FdsButton>
    <FdsButton variant="secondary" @click="cancel"> Annuller </FdsButton>
  </div>
</template>
```

### Alert Messages

```vue
<template>
  <FdsAlert variant="success" dismissible @dismiss="hideAlert">
    <strong>Success!</strong> Your changes have been saved.
  </FdsAlert>
</template>
```

## Design Principles

### Accessibility First

All components are built with accessibility in mind:

- ✅ **WCAG 2.1 AA compliance**
- ✅ **Keyboard navigation support**
- ✅ **Screen reader compatibility**
- ✅ **Semantic markup**
- ✅ **Focus management**

### Consistent API

Components follow consistent patterns:

- **Props**: Use kebab-case for multi-word props
- **Events**: Emit semantic events with descriptive names
- **Slots**: Provide flexible content customization
- **Styling**: Use DKFDS design tokens

### TypeScript Support

Full type definitions for all components:

- **Props interfaces**: Type-safe component properties
- **Event types**: Strongly typed event payloads
- **Slot types**: Type definitions for slot content
- **Generic support**: Type-safe generic components

## Performance

### Bundle Size

- **Full library**: ~120KB (gzipped)
- **Individual components**: 2-8KB each (gzipped)
- **Tree shaking**: Only import what you use

### Optimization Tips

1. **Use individual imports** for better tree shaking
2. **Lazy load** heavy components like date pickers
3. **Cache** frequently used icons
4. **Minimize** DOM updates in large lists

## Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

## Migration Guide

### From DKFDS v10

- Update component imports
- Review accessibility attributes
- Update color token references

### From Other Libraries

- Map component names to DKFDS equivalents
- Update styling approach to use design tokens
- Review form validation patterns

## Getting Help

- 📖 **Documentation**: Detailed guides for each component
- 🔍 **Examples**: Live examples with source code
- 🐛 **Issues**: Report bugs on GitHub
- 💬 **Discussions**: Community support and questions

## Contributing

Interested in contributing? Check out our:

- **Component Guidelines**: Standards for new components
- **Accessibility Checklist**: WCAG compliance requirements
- **Testing Guide**: Unit and integration test patterns
- **Design Tokens**: Using the DKFDS design system
