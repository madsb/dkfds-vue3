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
```bash
# Link the package locally
cd /path/to/dkfds-vue3
pnpm link

# In your project
pnpm link @madsb/dkfds-vue3
```

## 🚀 Usage

```javascript
// main.js - Import DKFDS styles
import 'dkfds/dist/css/dkfds.css'

// In your components
import { FdsButton, FdsInput, FdsAccordion } from '@madsb/dkfds-vue3'

// Or import everything
import * as DkfdsVue3 from '@madsb/dkfds-vue3'
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