# @madsb/dkfds-vue3

Vue 3 component library implementing [Det Fælles Designsystem](https://designsystem.dk/) (DKFDS) v11.

This is an updated fork of the original [dkfds-vue3](https://github.com/whitewillow/dkfds-vue3) by Kenneth Torsten Rørstrøm, with substantial upgrades including:

- **DKFDS v11** (upgraded from v8)
- **Comprehensive test coverage** with Vitest
- **TypeScript improvements** with better type definitions
- **Modern build system** with Vite optimizations
- **All dependencies updated** to latest versions
- **Simplified architecture** - Single package structure with organized components

## 📦 Installation

### From npm (when published)

```bash
npm install @madsb/dkfds-vue3 dkfds@^11.0.0
# or
pnpm add @madsb/dkfds-vue3 dkfds@^11.0.0
```

### For local development

#### Option 1: Using pnpm link

```bash
# 1. Install dependencies and build the library
cd /path/to/dkfds-vue3
pnpm install
pnpm run build

# 2. Link the package globally
pnpm link
# Note: You'll see warnings about peer dependencies - this is expected

# 3. In your project (e.g., raadgiverportalen-mock)
cd /path/to/your-project
# First ensure peer dependencies are installed:
pnpm add dkfds@^11.0.0 vue@^3.4.0
# Then link the local library:
pnpm link @madsb/dkfds-vue3

# 4. When making changes to the library, rebuild:
cd /path/to/dkfds-vue3
pnpm run build
```

#### Option 2: Using file: protocol (alternative)

```bash
# In your project's package.json
{
  "dependencies": {
    "@madsb/dkfds-vue3": "file:../dkfds-vue3",
    "dkfds": "^11.0.0",
    "vue": "^3.4.0"
  }
}

# Then install dependencies
pnpm install
```

**Important notes:**

- The peer dependency warnings when using `pnpm link` are expected and can be safely ignored
- Your project must have `vue@^3.4.0` and `dkfds@^11.0.0` installed
- You need to rebuild the library (`pnpm run build`) after making changes for them to be reflected in your linked project

## 🚀 Usage

### Setting up styles

The dkfds-vue3 components require the base DKFDS styles to be imported separately. Due to limitations in the DKFDS package structure, you need to import the styles using one of these approaches:

#### Recommended: SCSS Import (with full control)

First, install sass:
```bash
pnpm add -D sass
```

Create a styles file (e.g., `src/assets/styles.scss`):
```scss
// Import DKFDS base styles (required)
// Choose one of the following themes:

// Option 1: Default theme
@use '../../node_modules/dkfds/src/stylesheets/dkfds' as dkfds with (
  $font-path: '../../node_modules/dkfds/src/fonts/IBMPlexSans/',
  $image-path: '../../node_modules/dkfds/src/img/',
  $icons-folder-path: '../../node_modules/dkfds/src/img/svg-icons/'
);

// Option 2: VirkDK theme (uncomment to use)
// @use '../../node_modules/dkfds/src/stylesheets/dkfds-virkdk' as dkfds with (
//   $font-path: '../../node_modules/dkfds/src/fonts/IBMPlexSans/',
//   $image-path: '../../node_modules/dkfds/src/img/',
//   $icons-folder-path: '../../node_modules/dkfds/src/img/svg-icons/'
// );

// Option 3: BorgerDK theme (uncomment to use)
// @use '../../node_modules/dkfds/src/stylesheets/dkfds-borgerdk' as dkfds with (
//   $font-path: '../../node_modules/dkfds/src/fonts/IBMPlexSans/',
//   $image-path: '../../node_modules/dkfds/src/img/',
//   $icons-folder-path: '../../node_modules/dkfds/src/img/svg-icons/'
// );
```

Then in your main.ts/main.js:
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles.scss' // Import DKFDS base styles
import '@madsb/dkfds-vue3/styles' // Import Vue3 component specific styles
import dkfdsVue3 from '@madsb/dkfds-vue3'

import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(dkfdsVue3) // Optional: register all components globally
app.mount('#app')
```

#### Alternative: Direct CSS Import (simpler but less flexible)

If you don't need SCSS features, you can import the compiled CSS directly:
```javascript
// main.ts/main.js
import '../node_modules/dkfds/dist/css/dkfds.css' // or dkfds-virkdk.css or dkfds-borgerdk.css
import '@madsb/dkfds-vue3/styles' // Import Vue3 component specific styles
```

**Note:** The direct path to node_modules is required because the DKFDS package doesn't export CSS files in its package.json.

### Using components

```javascript
// Import individual components (recommended for tree-shaking)
import { FdsButton, FdsInput, FdsAccordion } from '@madsb/dkfds-vue3'

// Or import everything
import * as DkfdsVue3 from '@madsb/dkfds-vue3'

// Or register globally via plugin (in main.ts)
import dkfdsVue3 from '@madsb/dkfds-vue3'
app.use(dkfdsVue3)
```

### Important notes about styles

- **Base DKFDS styles are required**: The components will not display correctly without the base DKFDS styles
- **Theme selection**: You can choose between default, VirkDK, or BorgerDK themes
- **Path limitations**: Due to DKFDS package structure, relative paths to node_modules are necessary
- **Build size**: The base DKFDS CSS is approximately 257KB (215KB minified)

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

## 📋 Features

- **40+ Components**: Complete DKFDS component set
- **WCAG Compliant**: Follows accessibility standards
- **Tree-shakeable**: Import only what you need
- **TypeScript Support**: Full type definitions included
- **Vue 3 Composition API**: Modern Vue 3 implementation
- **Theme Support**: Both VirkDK and BorgerDK themes

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

## 📝 Version Status

**Current Version: 0.9.0** - Pre-release for testing. The library is functional but still being refined.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

## 🙏 Credits

- Original [dkfds-vue3](https://github.com/whitewillow/dkfds-vue3) created by Kenneth Torsten Rørstrøm
- This fork maintained by Mads Bjerre
- [Det Fælles Designsystem](https://designsystem.dk/) by the Danish Agency for Digital Government

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Guidelines

1. Follow existing code style and conventions
2. Add tests for new components
3. Update TypeScript definitions
4. Ensure all tests pass before submitting PR
5. Components should follow DKFDS specifications
