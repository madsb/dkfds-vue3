# @madsb/dkfds-vue3

Vue 3 implementation of [Det Fælles Designsystem](https://designsystem.dk/) (DKFDS) v11.

This is an updated fork of the original [dkfds-vue3](https://github.com/whitewillow/dkfds-vue3) by Kenneth Torsten Rørstrøm, with substantial upgrades including:
- Updated to DKFDS v11 (from v8)
- Comprehensive test coverage with Vitest
- Improved TypeScript support
- Modern build system with Vite
- All dependencies updated to latest versions

## Installation

```bash
npm install @madsb/dkfds-vue3 dkfds@^11.0.0
# or
pnpm add @madsb/dkfds-vue3 dkfds@^11.0.0
```

## Usage

Import DKFDS styles in your main.js/ts:
```javascript
import 'dkfds/dist/css/dkfds.css'
```

Use components in your Vue app:
```javascript
import { FdsButton, FdsInput, FdsAccordion } from '@madsb/dkfds-vue3'

// Or import everything
import * as DkfdsVue3 from '@madsb/dkfds-vue3'
```

## Features

- **40+ Components**: Complete set of DKFDS components
- **WCAG Compliant**: Follows accessibility standards
- **Tree-shakeable**: Import only what you need
- **TypeScript Support**: Full type definitions included
- **Vue 3 Composition API**: Modern Vue 3 implementation
- **DKFDS v11**: Latest version of the Danish Design System

## Component Categories

### Core Components (fds-*)
Standard DKFDS components following official specifications:
- Forms: `fds-input`, `fds-checkbox`, `fds-radio-group`, `fds-dropdown`, `fds-textarea`
- Navigation: `fds-accordion`, `fds-faneblade`, `fds-breadcrumb`, `fds-menu`
- Feedback: `fds-alert`, `fds-modal`, `fds-toast`, `fds-spinner`
- Layout: `fds-card`, `fds-detaljer`, `fds-badge`, `fds-tag`
- And many more...

## Documentation

For detailed documentation and examples, see the demo project in `/examples/demo`.

## Development Status

**Version: 0.9.0** - Pre-release version for testing. The library is functional but still being tested and refined.

## License

MIT License - See LICENSE file for details.

## Credits

Original dkfds-vue3 created by Kenneth Torsten Rørstrøm. This fork is maintained by Mads Bjerre with substantial updates for DKFDS v11 compatibility.