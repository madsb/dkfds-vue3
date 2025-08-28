# @madsb/dkfds-vue3

Vue 3 component library implementing [Det Fælles Designsystem](https://designsystem.dk/) (DKFDS) v11.

✨ **40+ accessible Vue 3 components** following Danish government design standards  
🎯 **WCAG 2.1 AA compliant** with comprehensive accessibility support  
📦 **Modern ESM-only package** with full TypeScript support  
🌲 **Tree-shakeable** - Import only what you need

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

#### Option B: SCSS Integration (Customizable)
```scss
// main.scss
@use 'node_modules/dkfds/src/stylesheets/dkfds-virkdk' as dkfds with (
  $font-path: 'node_modules/dkfds/src/fonts/IBMPlexSans/',
  $image-path: 'node_modules/dkfds/src/img/',
  $icons-folder-path: 'node_modules/dkfds/src/img/svg-icons/'
);

// Import Vue3 component utilities
@use '@madsb/dkfds-vue3/scss' as vue3;
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
