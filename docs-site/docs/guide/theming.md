# Theming

DKFDS Vue 3 is **theme-agnostic** and works seamlessly with any DKFDS theme or custom color scheme.

## Available Themes

| Theme        | Description                           | Use Case                                |
| ------------ | ------------------------------------- | --------------------------------------- |
| **Virkdk**   | Government theme with official colors | Government websites and applications    |
| **Borgerdk** | Citizen portal theme                  | Public-facing citizen services          |
| **Default**  | Built-in fallback colors              | Development, testing, or custom styling |

## Theme Benefits

- ✅ **Consistent colors** - Automatically synced with DKFDS theme updates
- ✅ **Easy switching** - Change themes by updating one import
- ✅ **Backward compatible** - Existing projects continue to work
- ✅ **Flexible** - Use without DKFDS or with custom colors

## DKFDS Theme Integration

### Virkdk Theme (Government)

For government websites and applications:

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

**Virkdk Colors:**
- Primary: `#004D9F` (Dark Blue)
- Success: `#358000` (Green)
- Info: `#1B86C3` (Light Blue)
- Warning: `#FEBB30` (Orange)
- Error: `#CC0000` (Red)

### Borgerdk Theme (Citizen Portal)

For public-facing citizen services:

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

**Borgerdk Colors:**
- Primary: `#7B2F83` (Purple)
- Success: `#358000` (Green)
- Info: `#1B86C3` (Light Blue)
- Warning: `#FEBB30` (Orange)  
- Error: `#CC0000` (Red)

## Default Theme (No DKFDS)

Use built-in default colors for development, testing, or custom styling:

```scss
// main.scss - Uses built-in default colors
@use '@madsb/dkfds-vue3/scss' as vue3;
// No additional configuration needed
```

**Default Colors:**
- Primary: `#0059b3` (Blue)
- Success: `#358000` (Green)
- Info: `#1b86c3` (Light Blue)
- Warning: `#febb30` (Orange)
- Error: `#cc0000` (Red)

## Custom Color Override

Override specific colors while keeping theme integration:

### Individual Color Override

```scss
@use '@madsb/dkfds-vue3/scss' as vue3 with (
  $color-primary: #custom-primary,
  $color-success: #custom-success,
  $color-error: #custom-error
);
```

### Complete Custom Theme

```scss
@use '@madsb/dkfds-vue3/scss' as vue3 with (
  $color-primary: #1e40af,
  $color-primary-medium: #1d4ed8,
  $color-primary-dark: #1e3a8a,
  $color-focus: #6b7280,
  $color-success: #16a34a,
  $color-success-light: #dcfce7,
  $color-info: #0ea5e9,
  $color-warning: #f59e0b,
  $color-error: #dc2626
);
```

## Dynamic Theme Switching

Switch between themes at build time or runtime:

### Build Time Theme Selection

Use environment variables to select themes:

```scss
// main.scss
@use 'sass:meta';

// Default to Virkdk, override with environment
$theme: meta.get-variable('THEME', 'virkdk') !default;

@if $theme == 'borgerdk' {
  @use 'node_modules/dkfds/src/stylesheets/dkfds-borgerdk' as dkfds with (
    $font-path: 'node_modules/dkfds/src/fonts/IBMPlexSans/',
    $image-path: 'node_modules/dkfds/src/img/',
    $icons-folder-path: 'node_modules/dkfds/src/img/svg-icons/'
  );
} @else {
  @use 'node_modules/dkfds/src/stylesheets/dkfds-virkdk' as dkfds with (
    $font-path: 'node_modules/dkfds/src/fonts/IBMPlexSans/',
    $image-path: 'node_modules/dkfds/src/img/',
    $icons-folder-path: 'node_modules/dkfds/src/img/svg-icons/'
  );
}

@use '@madsb/dkfds-vue3/scss' as vue3;

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

Then in your build process:
```bash
# Build with Virkdk theme
THEME=virkdk npm run build

# Build with Borgerdk theme  
THEME=borgerdk npm run build
```

### Runtime Theme Switching (CSS Custom Properties)

For dynamic theme switching at runtime:

```scss
// themes.scss
:root {
  // Virkdk theme (default)
  --fds-color-primary: #{#004D9F};
  --fds-color-success: #{#358000};
  --fds-color-error: #{#CC0000};
  // ... other colors
}

[data-theme="borgerdk"] {
  --fds-color-primary: #{#7B2F83};
  --fds-color-success: #{#358000};
  --fds-color-error: #{#CC0000};
  // ... other colors
}

// Use CSS custom properties in your SCSS
@use '@madsb/dkfds-vue3/scss' as vue3 with (
  $color-primary: var(--fds-color-primary),
  $color-success: var(--fds-color-success),
  $color-error: var(--fds-color-error)
);
```

Then toggle themes in JavaScript:
```typescript
// Toggle theme
document.documentElement.setAttribute('data-theme', 'borgerdk')

// Or remove for default
document.documentElement.removeAttribute('data-theme')
```

## Color Customization Variables

All available SCSS variables for customization:

```scss
// Primary colors
$color-primary: #0059b3 !default;
$color-primary-medium: #004993 !default;
$color-primary-dark: #003972 !default;

// Utility colors  
$color-white: #ffffff !default;
$color-focus: #757575 !default;

// Status colors
$color-success: #358000 !default;
$color-success-light: #eeffe2 !default;
$color-info: #1b86c3 !default;
$color-warning: #febb30 !default;
$color-error: #cc0000 !default;

// Legacy support
$color-gray-600: #454545 !default;
```

## Framework Integration

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@madsb/dkfds-vue3/scss' as vue3 with (
            $color-primary: #custom-color
          );
        `
      }
    }
  }
})
```

### Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @use '@madsb/dkfds-vue3/scss' as vue3 with (
                  $color-primary: #custom-color
                );
              `
            }
          }
        ]
      }
    ]
  }
}
```

## Best Practices

### Theme Selection Guidelines

1. **Government sites** → Use **Virkdk** theme
2. **Citizen services** → Use **Borgerdk** theme  
3. **Internal tools** → Consider **Default** theme with custom colors
4. **Multi-tenant** → Use runtime theme switching

### Color Accessibility

Ensure color combinations meet WCAG 2.1 AA standards:
- **Text contrast**: 4.5:1 minimum for normal text
- **Large text contrast**: 3:1 minimum for large text
- **Interactive elements**: Clear focus indicators with 3:1 contrast

### Performance Considerations

- **Build time theming**: Smaller bundle size, better performance
- **Runtime theming**: More flexible but larger CSS bundle
- **CSS custom properties**: Good compromise between flexibility and performance

## Migration Guide

### From v1.x

If migrating from an older version:

```scss
// Old approach (deprecated)
@import '@madsb/dkfds-vue3/styles';

// New approach - choose one:
// Option A: Pre-built CSS
@use '@madsb/dkfds-vue3/dist/dkfds-vue3.css';

// Option B: Theme integration
@use 'dkfds-virkdk' as dkfds;
@use '@madsb/dkfds-vue3/scss' as vue3;
@include vue3.configure-with-dkfds-resolved(/* colors */);

// Option C: Default theme
@use '@madsb/dkfds-vue3/scss' as vue3;
```

### From Individual Color Variables

```scss
// Old approach
$fds-primary: #custom-color;
@import '@madsb/dkfds-vue3/styles';

// New approach
@use '@madsb/dkfds-vue3/scss' as vue3 with (
  $color-primary: #custom-color
);
```

## Troubleshooting

### Colors Not Applying

1. **Check import order**: Theme configuration must come before component styles
2. **Verify SCSS compilation**: Ensure your build process compiles SCSS properly
3. **CSS specificity**: Custom CSS may override component styles

### Build Errors

1. **Sass version**: Ensure you're using Dart Sass (not Node Sass)
2. **Import paths**: Verify DKFDS package is installed and paths are correct
3. **Variable conflicts**: Check for variable name collisions

### Theme Not Loading

1. **DKFDS version**: Ensure DKFDS v11+ is installed
2. **Font paths**: Verify font and image paths are correct
3. **Theme files**: Check that theme files exist in node_modules/dkfds

## Next Steps

- [Quick Start →](./quick-start) - Build your first form with theming
- [Components →](/components/) - Explore themed components  
- [Installation →](./installation) - Complete setup guide