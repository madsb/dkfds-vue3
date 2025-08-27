# DKFDS Vue 3 Documentation Site

This is the VitePress documentation site for the DKFDS Vue 3 component library.

## Architecture

- **Separate Package**: Independent package.json for clean dependency management
- **Workspace Integration**: Uses workspace protocol to import the local library  
- **VitePress v2**: Latest VitePress with Vue 3 support
- **Live Components**: Real DKFDS components working in documentation

## Directory Structure

```
docs-site/
├── package.json          # Independent documentation package
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts     # VitePress configuration
│   │   └── theme/        # Custom theme with DKFDS integration
│   ├── index.md          # Homepage
│   ├── guide/           # Installation and usage guides
│   ├── components/      # Component documentation
│   └── api/            # API reference
```

## Development

```bash
# From project root - starts docs development server
pnpm docs:dev

# Or from docs-site directory
cd docs-site
pnpm dev
```

## Building

```bash
# From project root
pnpm docs:build

# Or from docs-site directory  
cd docs-site
pnpm build
```

## Dependencies

- **@madsb/dkfds-vue3**: Main library (workspace link)
- **dkfds**: Base DKFDS styles and assets
- **vitepress**: Documentation site generator
- **vue**: Vue 3 for components
- **sass**: SCSS processing

## Features

- ✅ **Live Component Examples**: Components work directly in docs
- ✅ **DKFDS Styling**: Complete DKFDS v11 theming
- ✅ **TypeScript Support**: Full type definitions and examples  
- ✅ **Search**: Local search functionality
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **Context7 Optimized**: Structured for AI documentation consumption

## Theme Integration

The custom VitePress theme:
1. Imports DKFDS base CSS styles
2. Registers all DKFDS Vue 3 components globally
3. Applies custom DKFDS branding and colors
4. Provides component demo styling

## Deployment

The built site (`docs/.vitepress/dist`) can be deployed to:
- GitHub Pages
- Netlify  
- Vercel
- Any static hosting

## Adding Documentation

1. **New Components**: Follow the pattern in existing component docs
2. **API Reference**: Update the API documentation with new interfaces
3. **Examples**: Add live examples using the registered components
4. **Styling**: Use DKFDS design tokens and existing CSS classes