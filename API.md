# @madsb/dkfds-vue3 API Reference

Complete API documentation for DKFDS Vue 3 component library v0.9.0.

## Installation

```bash
npm install @madsb/dkfds-vue3 dkfds@^11.0.0
# or
pnpm add @madsb/dkfds-vue3 dkfds@^11.0.0
```

## Setup

```javascript
// main.js/main.ts
import { createApp } from 'vue'
import '@madsb/dkfds-vue3/styles' // Component styles
import dkfdsVue3 from '@madsb/dkfds-vue3'

const app = createApp(App)
app.use(dkfdsVue3) // Register all components globally

// Or import individually (recommended for tree-shaking)
import { FdsButton, FdsInput, FdsAlert } from '@madsb/dkfds-vue3'
```

## Components

### Layout Components

#### FdsButton

Button component with various styles and icon support.

**Import:**
```javascript
import { FdsButton } from '@madsb/dkfds-vue3'
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'warning'` | `'primary'` | Button visual style |
| `icon` | `string` | - | Icon name from DKFDS icon set |
| `iconRight` | `boolean` | `false` | Position icon on the right |
| `fullWidthMobile` | `boolean` | `false` | Full width on mobile devices |
| `iconOnly` | `boolean` | `false` | Icon-only button (requires aria-label) |

**Events:**
- Native button events (click, focus, blur, etc.)

**Examples:**
```vue
<FdsButton variant="primary" @click="handleClick">
  Click me
</FdsButton>

<FdsButton variant="secondary" icon="save" icon-right>
  Save changes
</FdsButton>
```

#### FdsIkon

Icon component for DKFDS icon system.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | - | Icon name |
| `decorative` | `boolean` | `false` | If true, icon is hidden from screen readers |

#### FdsSprogvaelger (Language Selector)

Language/locale selector dropdown.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `languages` | `Array<{code: string, name: string}>` | - | Available languages |
| `currentLanguage` | `string` | - | Currently selected language code |

**Events:**
- `language-change`: Emitted when language is selected

#### FdsCookiemeddelelse

Cookie consent banner component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `acceptText` | `string` | `'Accepter'` | Accept button text |
| `rejectText` | `string` | `'Afvis'` | Reject button text |

**Events:**
- `accept`: User accepted cookies
- `reject`: User rejected cookies

### Form Components

#### FdsFormgroup

Form field wrapper providing structure and validation states.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean \| string` | `false` | Error state or message |

**Slots:**
- `default`: Form controls and labels

#### FdsLabel

Form label component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `for` | `string` | - | ID of associated form control |
| `required` | `boolean` | `false` | Show required indicator |
| `tooltip` | `string` | - | Tooltip text |

#### FdsHint

Hint text for form fields.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique ID for ARIA association |

#### FdsFejlmeddelelse

Error message component for form validation.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique ID for ARIA association |

### Input Components

#### FdsInput

Standard text input field.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `modelValue` | `string` | - | v-model binding |
| `type` | `string` | `'text'` | Input type (text, email, tel, etc.) |
| `prefix` | `string` | - | Prefix text |
| `suffix` | `string` | - | Suffix text |
| `widthClass` | `string` | - | Width utility class |

**Events:**
- `update:modelValue`: Value change for v-model
- `dirty`: Field touched state
- `input`: Native input event

**Example:**
```vue
<FdsFormgroup>
  <FdsLabel for="email">Email</FdsLabel>
  <FdsInput id="email" v-model="email" type="email" />
</FdsFormgroup>
```

#### FdsTextarea

Multiline text input.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `modelValue` | `string` | - | v-model binding |
| `rows` | `number` | `4` | Number of visible rows |
| `maxlength` | `number` | - | Maximum character length |

#### FdsCheckbox

Checkbox input component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `modelValue` | `boolean \| Array` | - | v-model binding |
| `value` | `any` | - | Value when checked (for arrays) |
| `label` | `string` | - | Checkbox label text |

#### FdsRadioGroup & FdsRadioItem

Radio button group components.

**FdsRadioGroup Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | - | Selected value |
| `name` | `string` | - | Radio group name |

**FdsRadioItem Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | - | Radio value |
| `label` | `string` | - | Radio label text |

#### FdsDropdown

Select dropdown component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `modelValue` | `string \| number` | - | Selected value |
| `options` | `Array<{value: any, label: string}>` | - | Available options |

#### FdsToggleSwitch

Toggle switch component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `modelValue` | `boolean` | - | Toggle state |
| `label` | `string` | - | Switch label |

#### FdsDatoVaelger

Date picker component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `modelValue` | `string` | - | Selected date |
| `min` | `string` | - | Minimum date |
| `max` | `string` | - | Maximum date |

#### FdsFileUpload

File upload component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `accept` | `string` | - | Accepted file types |
| `multiple` | `boolean` | `false` | Allow multiple files |

**Events:**
- `file-selected`: Files selected

### Navigation Components

#### FdsBreadcrumb

Breadcrumb navigation component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<BreadcrumbItem>` | - | Breadcrumb items |

**Types:**
```typescript
interface BreadcrumbItem {
  text: string
  href?: string
  to?: RouteLocationRaw // Vue Router
}
```

#### FdsPaginering

Pagination component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | `1` | Current page number |
| `totalPages` | `number` | - | Total number of pages |
| `showFirstLast` | `boolean` | `true` | Show first/last buttons |

**Events:**
- `page-change`: Page changed

#### FdsTrinindikatorGroup & FdsTrinindikatorStep

Step indicator/wizard components.

**FdsTrinindikatorGroup Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentStep` | `number` | `0` | Current active step |

**FdsTrinindikatorStep Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Step label |
| `completed` | `boolean` | `false` | Step completion state |

#### FdsFaneblade (Tabs)

Tab navigation components.

**Components:**
- `FdsFaneblade`: Main tab container
- `FdsFanebladeNav`: Tab navigation container
- `FdsFanebladeNavItem`: Individual tab button
- `FdsFanebladePanel`: Tab content panel

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeTab` | `string` | - | Active tab ID |

#### FdsMenu & FdsMenuItem

Dropdown menu components.

**FdsMenu Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Menu trigger label |

**FdsMenuItem Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | Link URL |
| `to` | `RouteLocationRaw` | - | Vue Router link |

#### FdsOverflowMenu

Overflow menu (three dots menu) component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `'Menu'` | Accessibility label |

**Slots:**
- `default`: Menu items

### Feedback Components

#### FdsAlert

Alert/notification message component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type |
| `header` | `string` | - | Optional header text |
| `showIcon` | `boolean` | `false` | Show variant icon |
| `closeable` | `boolean` | `false` | Can be dismissed |

**Events:**
- `close`: Alert closed

**Example:**
```vue
<FdsAlert variant="success" header="Success!" closeable>
  Your changes have been saved.
</FdsAlert>
```

#### FdsModal

Modal dialog component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `string` | - | Modal title |
| `closeable` | `boolean` | `true` | Show close button |
| `acceptText` | `string` | `'OK'` | Accept button text |
| `cancelText` | `string` | `'Cancel'` | Cancel button text |

**Events:**
- `accept`: Accept button clicked
- `cancel`: Cancel button clicked
- `close`: Modal closed

**Methods:**
- `showModal()`: Open the modal
- `hideModal()`: Close the modal

#### FdsToast & FdsToastContainer

Toast notification system.

**FdsToast Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Toast type |
| `message` | `string` | - | Toast message |
| `duration` | `number` | `5000` | Auto-dismiss time (ms) |

#### FdsSpinner

Loading spinner component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Spinner size |
| `label` | `string` | `'Loading...'` | Accessibility label |

#### FdsTooltip

Tooltip component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Tooltip content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |

#### FdsFejlopsummering

Error summary component for form validation.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `errors` | `Array<{field: string, message: string}>` | - | Error list |

### Data Display Components

#### FdsAccordion

Expandable/collapsible content panel.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `string` | - | Accordion header |
| `modelValue` | `boolean` | - | Expanded state (v-model) |
| `variant` | `'success' \| 'warning' \| 'error'` | - | Status variant |

**Events:**
- `update:modelValue`: Expansion state changed

**Example:**
```vue
<FdsAccordion header="More Information">
  Detailed content here...
</FdsAccordion>
```

#### FdsAccordionGroup

Container for grouped accordions.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMultiple` | `boolean` | `true` | Allow multiple open panels |

#### FdsCard & FdsCardGroup

Card components for content presentation.

**FdsCard Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title |
| `subtitle` | `string` | - | Card subtitle |
| `href` | `string` | - | Make card clickable |

**Slots:**
- `header`: Card header content
- `default`: Card body
- `footer`: Card footer

#### FdsDetaljer

Details/summary component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `summary` | `string` | - | Summary text |
| `open` | `boolean` | `false` | Initial open state |

#### FdsBadge

Badge/chip component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | - | Badge style |
| `text` | `string` | - | Badge content |

#### FdsTag

Tag component.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Tag text |
| `removable` | `boolean` | `false` | Show remove button |

**Events:**
- `remove`: Tag removed

#### FdsList & FdsListItem

List components.

**FdsList Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ordered` | `boolean` | `false` | Ordered (ol) vs unordered (ul) |

## Composables

### useToast

Toast notification composable.

```javascript
import { useToast } from '@madsb/dkfds-vue3'

const toast = useToast()

// Show toast
toast.show({
  message: 'Operation successful',
  variant: 'success',
  duration: 5000
})

// Clear all toasts
toast.clear()
```

### formId

Form ID generation composable.

```javascript
import { formId } from '@madsb/dkfds-vue3'

const { formid } = formId('custom-id')
```

### generateId

Unique ID generator utility.

```javascript
import { generateId } from '@madsb/dkfds-vue3'

const uniqueId = generateId('prefix')
```

## TypeScript Support

All components export their prop interfaces for type safety:

```typescript
import type { 
  FdsButtonProps,
  FdsInputProps,
  FdsAlertProps,
  FdsModalProps,
  FdsAccordionProps,
  BreadcrumbItem,
  ToastOptions
} from '@madsb/dkfds-vue3'
```

## Styling

The library requires DKFDS base styles and component-specific styles:

```scss
// Import DKFDS base styles (required)
@use 'dkfds/src/stylesheets/dkfds' with (
  $font-path: 'dkfds/src/fonts/IBMPlexSans/',
  $image-path: 'dkfds/src/img/'
);

// Import component styles
@import '@madsb/dkfds-vue3/styles';
```

## Accessibility

All components follow WCAG 2.1 Level AA guidelines:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## Browser Support

Supports all modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## License

MIT License - See [LICENSE](./LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/madsb/dkfds-vue3)
- [DKFDS Documentation](https://designsystem.dk/)
- [NPM Package](https://www.npmjs.com/package/@madsb/dkfds-vue3)