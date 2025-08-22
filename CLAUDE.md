# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Vue 3 component library implementing the Danish Common Design System (Det Fælles Designsystem - DKFDS). The library provides 40+ accessible components following DKFDS standards for Danish government self-service solutions.

## Key Commands

### Development Setup

```bash
# Install dependencies (using pnpm)
pnpm install

# Build the library
pnpm run build

# Run demo site for development
pnpm run dev
```

### Code Quality

```bash
# Lint code
pnpm run lint

# Auto-fix linting issues
pnpm run lint:fix

# Format code with prettier
pnpm run format

# Type checking
pnpm run typecheck
```

### Testing

```bash
# Run tests
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

## Architecture

### Project Structure

```
src/
├── components/           # Vue components organized by category
│   ├── forms/           # Form structure components (formgroup, label, hint, etc.)
│   ├── input/           # Input components (input, checkbox, radio, dropdown, etc.)
│   ├── navigation/      # Navigation components (breadcrumb, menu, tabs, etc.)
│   ├── feedback/        # User feedback components (alert, toast, modal, spinner)
│   ├── data-display/    # Data presentation (accordion, card, table, list, etc.)
│   └── layout/          # Layout components (button, cookie notice, language selector)
├── composables/         # Vue composables (formId, generateId, useToast, etc.)
├── utils/               # Utility functions
│   └── scripts/         # DKFDS behavior scripts (dropdown, tooltip, navigation)
├── types/               # TypeScript type definitions
├── assets/              # SCSS styles
└── index.ts             # Main entry point with exports

examples/
└── demo/                # Demo application showcasing all components
```

### Component Naming Conventions

- Core components: `fds-[danish-name]` (e.g., `fds-accordion`, `fds-detaljer`)
- Extended components: `xfds-[name]` (e.g., `xfds-form-input`, `xfds-progressbar`)
- Some exceptions use English names: `fds-input`, `fds-label`, `fds-checkbox`

### Development Principles

- Components must follow DKFDS accessibility standards (WCAG compliance)
- Use original DKFDS HTML structure where possible
- Minimize dependencies - avoid introducing new npm packages
- Components should be minimal and composable
- No vue-router dependency in library components
- All components are tree-shakeable

### Import Patterns

```typescript
// Import from component categories
import { FdsButton } from '@madsb/dkfds-vue3'  // From layout
import { FdsInput } from '@madsb/dkfds-vue3'   // From input
import { FdsAlert } from '@madsb/dkfds-vue3'   // From feedback

// Import composables
import { useToast, formId } from '@madsb/dkfds-vue3'

// Import types
import type { FdsLanguageItem } from '@madsb/dkfds-vue3'
```

### Key Technical Details

- Built with Vite and TypeScript
- Vue 3 Composition API
- SCSS styling following DKFDS design tokens
- Supports both VirkDK and BorgerDK themes
- Single package architecture for simplicity
- Organized components by functional domain
- Full TypeScript support with generated declarations

### Development Workflow

1. Make changes to components in `src/components/[category]/`
2. Update tests in `src/__tests__/`
3. Run `pnpm run format` to format code
4. Run `pnpm run lint:fix` to fix linting issues
5. Run `pnpm test:run` to ensure tests pass
6. Run `pnpm run build` to build the library
7. Test in demo app with `pnpm run dev`

### Publishing Preparation

```bash
# Build the library
pnpm run build

# Run all quality checks
pnpm run lint
pnpm run typecheck
pnpm test:run

# The built files will be in dist/
# Ready for npm publish
```

## Important Notes

- This is a single-package library (no monorepo complexity)
- All components are in `src/components/` organized by category
- The demo app uses the workspace protocol to link to the local package
- Always run format and lint after major edits: `pnpm run format && pnpm run lint:fix`