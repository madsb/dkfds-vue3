# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Vue 3 component library implementing the Danish Common Design System (Det Fælles Designsystem - DKFDS). The library provides 40+ accessible components following DKFDS standards for Danish government self-service solutions.

## Key Commands

### Development Setup

```bash
# Install dependencies (using pnpm)
pnpm i

# Build all packages in correct order
pnpm -r build

# Run demo site for development
cd examples/demo
pnpm run dev
```

### Building Packages

Build order is critical - packages must be built in this sequence:

1. Utils: `cd packages/utils && pnpm run build`
2. Core: `cd packages/core && pnpm run build`
3. Main: No build needed

### Code Quality

```bash
# Lint all packages and examples
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with prettier
npm run format
```

### Testing (Demo project only)

```bash
cd examples/demo
pnpm test           # Run tests
pnpm coverage       # Run tests with coverage
```

## Architecture

### Package Structure

- **packages/utils**: Shared utilities and helpers
- **packages/core**: Core DKFDS components (standard components)
- **packages/dkfds-vue3**: Main package that re-exports all components
- **examples/demo**: Demo site showcasing all components

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

### Version Management

During development, packages use workspace protocol:

- Development: `"dkfds-vue3-core": "workspace:0.4.9"`
- Before publish: Change to actual version `"dkfds-vue3-core": "0.4.9"`

### Key Technical Details

- Built with Vite and TypeScript
- Vue 3 Composition API
- SCSS styling following DKFDS design tokens
- Supports both VirkDK and BorgerDK themes
- All components are tree-shakeable
- Run format and lint with the following command after major edits: npm run format
