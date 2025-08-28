# @madsb/dkfds-vue3

Vue 3 component library implementing [Det Fælles Designsystem](https://designsystem.dk/) (DKFDS) v11.

✨ **40+ accessible Vue 3 components** following Danish government design standards  
🎯 **WCAG 2.1 AA compliant** with comprehensive accessibility support  
📦 **Modern ESM-only package** with full TypeScript support  
🌲 **Tree-shakeable** - Import only what you need  
🎨 **Theme-agnostic** - Works with any DKFDS theme (Virkdk, Borgerdk, or default)

## 📦 Installation

```bash
npm install @madsb/dkfds-vue3 dkfds
# or
pnpm add @madsb/dkfds-vue3 dkfds
```

**Required peer dependencies**: `vue@^3.4.0` and `dkfds@^11.0.0`

## 🚀 Quick Start

### 1. Install the Vue Plugin

```typescript
// main.ts
import { createApp } from 'vue'
import dkfdsvue3 from '@madsb/dkfds-vue3'
import App from './App.vue'

const app = createApp(App)
app.use(dkfdsvue3)
app.mount('#app')
```

### 2. Import Styles

Choose **one** of these approaches:

#### Option A: Pre-built CSS (Easiest)

```typescript
// main.ts
import '@madsb/dkfds-vue3/dist/dkfds-vue3.css'
```

#### Option B: SCSS Integration with DKFDS Theme (Recommended)

Choose your DKFDS theme and configure the components:

**Virkdk Theme (Government):**

```scss
// main.scss
@use 'node_modules/dkfds/src/stylesheets/dkfds-virkdk' as dkfds with (
  $font-path: 'node_modules/dkfds/src/fonts/IBMPlexSans/',
  $image-path: 'node_modules/dkfds/src/img/',
  $icons-folder-path: 'node_modules/dkfds/src/img/svg-icons/'
);
@use '@madsb/dkfds-vue3/scss' as vue3;

// Configure Vue3 components with DKFDS colors
@include vue3.configure-with-dkfds-resolved(
  dkfds.color(dkfds.$theme-color-primary),
  dkfds.color(dkfds.$theme-color-primary-dark),
  dkfds.color(dkfds.$theme-color-primary-darker),
  dkfds.color(dkfds.$theme-focus-color),
  dkfds.color(dkfds.$theme-color-success),
  dkfds.color(dkfds.$theme-color-success-light),
  dkfds.color(dkfds.$theme-color-info),
  dkfds.color(dkfds.$theme-color-warning),
  dkfds.color(dkfds.$theme-color-error)
);
```

**Borgerdk Theme (Citizen Portal):**

```scss
// main.scss
@use 'node_modules/dkfds/src/stylesheets/dkfds-borgerdk' as dkfds with (
  $font-path: 'node_modules/dkfds/src/fonts/IBMPlexSans/',
  $image-path: 'node_modules/dkfds/src/img/',
  $icons-folder-path: 'node_modules/dkfds/src/img/svg-icons/'
);
@use '@madsb/dkfds-vue3/scss' as vue3;

// Same configuration works with any DKFDS theme!
@include vue3.configure-with-dkfds-resolved(
  dkfds.color(dkfds.$theme-color-primary),
  dkfds.color(dkfds.$theme-color-primary-dark),
  dkfds.color(dkfds.$theme-color-primary-darker),
  dkfds.color(dkfds.$theme-focus-color),
  dkfds.color(dkfds.$theme-color-success),
  dkfds.color(dkfds.$theme-color-success-light),
  dkfds.color(dkfds.$theme-color-info),
  dkfds.color(dkfds.$theme-color-warning),
  dkfds.color(dkfds.$theme-color-error)
);
```

#### Option C: Default Colors (No DKFDS Theme)

```scss
// main.scss - Uses built-in default colors
@use '@madsb/dkfds-vue3/scss' as vue3;
// No additional configuration needed
```

### 3. Use Components

```vue
<script setup lang="ts">
import { FdsButton, FdsAlert, FdsInput } from '@madsb/dkfds-vue3'
</script>

<template>
  <fds-alert type="info">Welcome!</fds-alert>
  <fds-input v-model="name" label="Your name" />
  <fds-button @click="submit">Submit</fds-button>
</template>
```

### Composables & Utilities

```typescript
// Import composables and utilities
import { useToast, formId } from '@madsb/dkfds-vue3/composables'
import { generateId, navigation } from '@madsb/dkfds-vue3/utils'
```

## 🎨 Theme Configuration

This library is **theme-agnostic** and works with any DKFDS theme:

### Available Themes

| Theme        | Description                           | Use Case                                |
| ------------ | ------------------------------------- | --------------------------------------- |
| **Virkdk**   | Government theme with official colors | Government websites and applications    |
| **Borgerdk** | Citizen portal theme                  | Public-facing citizen services          |
| **Default**  | Built-in fallback colors              | Development, testing, or custom styling |

### Theme Benefits

- ✅ **Consistent colors** - Automatically synced with DKFDS theme updates
- ✅ **Easy switching** - Change themes by updating one import
- ✅ **Backward compatible** - Existing projects continue to work
- ✅ **Flexible** - Use without DKFDS or with custom colors

### Custom Color Override

You can also override specific colors manually:

```scss
@use '@madsb/dkfds-vue3/scss' as vue3 with (
  $color-primary: #custom-color,
  $color-success: #another-custom-color
);
```

## 🛠️ Development

### Setup

```bash
# Install dependencies
pnpm install

# Build the library
pnpm run build

# Run demo site
pnpm run dev
```

### Scripts

```bash
# Development
pnpm run dev              # Run demo site
pnpm run build            # Build library
pnpm run test             # Run tests
pnpm run typecheck        # Check TypeScript types
pnpm run lint             # Lint code
pnpm run format           # Format code

# Testing
pnpm run test:run         # Run tests once
pnpm run test:coverage    # Run tests with coverage
pnpm run test:ui          # Run tests with UI
```

### Project Structure

```
src/
├── components/           # Vue components organized by category
│   ├── forms/           # Form structure components
│   ├── input/           # Input and form control components
│   ├── navigation/      # Navigation and menu components
│   ├── feedback/        # User feedback (alerts, toasts, modals)
│   ├── data-display/    # Data presentation components
│   └── layout/          # Layout and utility components
├── composables/         # Vue composables
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── index.ts             # Main entry point

examples/
└── demo/                # Demo application showcasing components
```

## 🎯 Available Components

**40+ components** organized by category:

- **Forms**: `FdsFormgroup`, `FdsLabel`, `FdsHint`, `FdsFejlmeddelelse`
- **Input**: `FdsInput`, `FdsCheckbox`, `FdsDropdown`, `FdsFileUpload`
- **Navigation**: `FdsBreadcrumb`, `FdsMenu`, `FdsPaginering`, `FdsTrinindikator`
- **Feedback**: `FdsAlert`, `FdsToast`, `FdsModal`, `FdsSpinner`
- **Data Display**: `FdsAccordion`, `FdsCard`, `FdsList`, `FdsTable`
- **Layout**: `FdsButton`, `FdsIkon`, `FdsCookiemeddelelse`

See the [demo site](examples/demo/) for complete component examples.

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type checking
pnpm typecheck

# Check with strict mode (shows potential improvements)
./typecheck-strict.sh
```

## 📄 License & Credits

**MIT License** - Fork of [dkfds-vue3](https://github.com/whitewillow/dkfds-vue3) by Kenneth Torsten Rørstrøm  
Built on [Det Fælles Designsystem](https://designsystem.dk/) by the Danish Agency for Digital Government

## 🤝 Contributing

Contributions welcome! Please ensure tests pass and follow DKFDS specifications.
