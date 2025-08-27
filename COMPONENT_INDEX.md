# Component Quick Reference

Quick lookup index for all DKFDS Vue 3 components. For detailed API documentation, see [API.md](./API.md).

## Import Patterns

```typescript
// Import components
import { FdsButton, FdsInput, FdsAlert } from '@madsb/dkfds-vue3'

// Import types
import type { FdsButtonProps, FdsInputProps } from '@madsb/dkfds-vue3'

// Import composables
import { useToast, formId, generateId } from '@madsb/dkfds-vue3'
```

## Component Categories

### 📋 Forms (4 components)
- `FdsFormgroup` - Form field wrapper with validation
- `FdsLabel` - Form field label
- `FdsHint` - Helper text for form fields
- `FdsFejlmeddelelse` - Error message display

### ✏️ Input (11 components)
- `FdsInput` - Text input field
- `FdsInputNumber` - Numeric input
- `FdsInputLimit` - Input with character limit
- `FdsTextarea` - Multiline text input
- `FdsCheckbox` - Checkbox input
- `FdsRadioGroup` - Radio button group container
- `FdsRadioItem` - Individual radio button
- `FdsToggleSwitch` - Toggle/switch control
- `FdsDropdown` - Select dropdown
- `FdsDatoVaelger` - Date picker
- `FdsDatoFelter` - Date input fields
- `FdsFileUpload` - File upload control

### 🧭 Navigation (11 components)
- `FdsBreadcrumb` - Breadcrumb navigation
- `FdsPaginering` - Pagination controls
- `FdsTrinindikatorGroup` - Step indicator container
- `FdsTrinindikatorStep` - Individual step
- `FdsFaneblade` - Tab container
- `FdsFanebladeTab` - Tab button (deprecated, use Nav/NavItem)
- `FdsFanebladePanel` - Tab panel content
- `FdsFanebladeNav` - Tab navigation container
- `FdsFanebladeNavItem` - Tab navigation item
- `FdsNavLink` - Navigation link
- `FdsTilbageLink` - Back link
- `FdsTilTop` - Back to top button
- `FdsMenu` - Dropdown menu
- `FdsMenuItem` - Menu item
- `FdsOverflowMenu` - Three-dots overflow menu

### 💬 Feedback (7 components)
- `FdsAlert` - Alert/notification message
- `FdsToast` - Toast notification
- `FdsToastContainer` - Toast container
- `FdsModal` - Modal dialog
- `FdsFejlopsummering` - Form error summary
- `FdsSpinner` - Loading spinner
- `FdsTooltip` - Tooltip

### 📊 Data Display (13 components)
- `FdsAccordion` - Expandable content panel
- `FdsAccordionGroup` - Grouped accordions
- `FdsCard` - Card container
- `FdsCardGroup` - Card grid/group
- `FdsDetaljer` - Details/summary element
- `FdsBadge` - Badge/chip
- `FdsTag` - Tag/label
- `FdsList` - List container
- `FdsListItem` - List item
- `FdsPre` - Preformatted text
- `FdsPreview` - Code preview container
- `FdsPreviewCode` - Code block in preview
- `FdsPreviewExample` - Example in preview
- `FdsPreviewItem` - Preview item wrapper

### 🎨 Layout (6 components)
- `FdsButton` - Button component
- `FdsFunktionslink` - Function/action link
- `FdsIkon` - Icon component
- `FdsIconCollection` - Icon sprite collection
- `FdsSprogvaelger` - Language selector
- `FdsCookiemeddelelse` - Cookie consent banner

## Common Use Cases

### Form with Validation
```vue
<FdsFormgroup :error="emailError">
  <FdsLabel for="email" required>Email</FdsLabel>
  <FdsHint id="email-hint">Enter your email address</FdsHint>
  <FdsFejlmeddelelse v-if="emailError">{{ emailError }}</FdsFejlmeddelelse>
  <FdsInput 
    id="email" 
    v-model="email" 
    type="email"
    aria-describedby="email-hint"
  />
</FdsFormgroup>
```

### Navigation Tabs
```vue
<FdsFaneblade>
  <FdsFanebladeNav>
    <FdsFanebladeNavItem :active="activeTab === 'tab1'" @click="activeTab = 'tab1'">
      Tab 1
    </FdsFanebladeNavItem>
    <FdsFanebladeNavItem :active="activeTab === 'tab2'" @click="activeTab = 'tab2'">
      Tab 2
    </FdsFanebladeNavItem>
  </FdsFanebladeNav>
  
  <FdsFanebladePanel v-show="activeTab === 'tab1'">
    Content for tab 1
  </FdsFanebladePanel>
  <FdsFanebladePanel v-show="activeTab === 'tab2'">
    Content for tab 2
  </FdsFanebladePanel>
</FdsFaneblade>
```

### Modal Dialog
```vue
<template>
  <FdsButton @click="$refs.modal.showModal()">
    Open Modal
  </FdsButton>
  
  <FdsModal
    ref="modal"
    header="Confirm Action"
    accept-text="Confirm"
    cancel-text="Cancel"
    @accept="handleConfirm"
    @cancel="handleCancel"
  >
    Are you sure you want to proceed?
  </FdsModal>
</template>
```

### Alert Messages
```vue
<FdsAlert variant="success" closeable>
  Your changes have been saved successfully.
</FdsAlert>

<FdsAlert variant="error" header="Error" show-icon>
  Please correct the errors below before continuing.
</FdsAlert>
```

### Accordion Group
```vue
<FdsAccordionGroup :allow-multiple="false">
  <FdsAccordion header="Section 1">
    Content for section 1
  </FdsAccordion>
  <FdsAccordion header="Section 2">
    Content for section 2
  </FdsAccordion>
  <FdsAccordion header="Section 3">
    Content for section 3
  </FdsAccordion>
</FdsAccordionGroup>
```

## Composables

### useToast()
Show temporary notifications:
```javascript
const toast = useToast()
toast.show({
  message: 'Success!',
  variant: 'success',
  duration: 5000
})
```

### formId(id?, required?)
Generate consistent form field IDs:
```javascript
const { formid } = formId('custom-id')
```

### generateId(prefix?)
Create unique IDs:
```javascript
const id = generateId('modal')
```

## TypeScript Types

All components export their prop interfaces:

```typescript
// Component props
export type { FdsButtonProps } from '@madsb/dkfds-vue3'
export type { FdsInputProps } from '@madsb/dkfds-vue3'
export type { FdsAlertProps } from '@madsb/dkfds-vue3'
export type { FdsModalProps } from '@madsb/dkfds-vue3'
export type { FdsAccordionProps } from '@madsb/dkfds-vue3'
// ... and all other components

// Utility types
export type { BreadcrumbItem } from '@madsb/dkfds-vue3'
export type { ToastOptions } from '@madsb/dkfds-vue3'
```

## DKFDS Documentation Links

- [Buttons](https://designsystem.dk/komponenter/knapper/)
- [Forms](https://designsystem.dk/komponenter/inputfelter/)
- [Navigation](https://designsystem.dk/komponenter/navigation/)
- [Feedback](https://designsystem.dk/komponenter/beskeder/)
- [Accordions](https://designsystem.dk/komponenter/accordions/)
- [Cards](https://designsystem.dk/komponenter/cards/)
- [Modals](https://designsystem.dk/komponenter/modal/)
- [Tables](https://designsystem.dk/komponenter/tabeller/)