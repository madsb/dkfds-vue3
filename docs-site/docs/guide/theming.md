# Theming

DKFDS Vue 3 provides **three official DKFDS themes** with a simple, modern import system.

## Available Themes

| Theme        | Import                               | Colors                | Use Case                               |
| ------------ | ------------------------------------ | --------------------- | -------------------------------------- |
| **Default**  | `@use '@madsb/dkfds-vue3/styles'`   | Generic DKFDS blue    | Development, testing, generic use      |
| **Virk**     | `@use '@madsb/dkfds-vue3/styles/virk'` | Virk.dk blue       | Government websites and applications   |
| **Borger**   | `@use '@madsb/dkfds-vue3/styles/borger'` | Borger.dk green   | Public-facing citizen services         |

## Quick Start

Choose your theme and import - **that's it!**

### Default Theme

```scss
// main.scss - Generic DKFDS colors
@use '@madsb/dkfds-vue3/styles';
```

### Virk Theme

```scss
// main.scss - For government solutions
@use '@madsb/dkfds-vue3/styles/virk';
```

### Borger Theme

```scss
// main.scss - For citizen portal solutions
@use '@madsb/dkfds-vue3/styles/borger';
```

## Theme Benefits

- ✅ **Dead simple** - One import line, zero configuration
- ✅ **Official colors** - Matches DKFDS design specifications exactly
- ✅ **Modern SCSS** - Uses latest Sass module system (`@use`/`@forward`)
- ✅ **No deprecation warnings** - Dart Sass 2.0+ compatible
- ✅ **Runtime switching** - Optional dynamic theme changing capability

## Switching Themes

Change themes by simply updating your import:

```scss
// From this:
@use '@madsb/dkfds-vue3/styles/virk';

// To this:
@use '@madsb/dkfds-vue3/styles/borger';
```

**No complex configuration or color mapping required!**

## Runtime Theme Switching (Advanced)

For applications that need dynamic theme switching:

```scss
// main.scss
@use '@madsb/dkfds-vue3/styles/runtime';
```

Then control the theme in your HTML:

```vue
<template>
  <div :data-theme="currentTheme">
    <!-- Your app content -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTheme = ref('default') // 'default' | 'virk' | 'borger'

function switchToVirk() {
  currentTheme.value = 'virk'
}

function switchToBorger() {
  currentTheme.value = 'borger'  
}

function switchToDefault() {
  currentTheme.value = 'default'
}
</script>
```

## Color Reference

### Default Theme Colors
- Primary: `#0059b3` (Blue)
- Primary Medium: `#004993` (Darker Blue)
- Primary Dark: `#003972` (Darkest Blue)
- Success: `#358000` (Green)
- Info: `#1b86c3` (Light Blue)
- Warning: `#febb30` (Orange)
- Error: `#cc0000` (Red)

### Virk Theme Colors
- Primary: `#0059b3` (Virk Blue)
- Primary Medium: `#004993`
- Primary Dark: `#003972`
- Success: `#358000` (Green)
- Info: `#1b86c3` (Light Blue)
- Warning: `#febb30` (Orange)
- Error: `#cc0000` (Red)

### Borger Theme Colors
- Primary: `#44831e` (Borger Green)
- Primary Medium: `#3c5c22`
- Primary Dark: `#233614`
- Success: `#358000` (Green)
- Info: `#1b86c3` (Light Blue)
- Warning: `#febb30` (Orange)
- Error: `#cc0000` (Red)

## Framework Integration

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Import your chosen theme globally
        additionalData: `@use '@madsb/dkfds-vue3/styles/virk';`
      }
    }
  }
})
```

### Nuxt 3

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    // Choose your theme
    '@madsb/dkfds-vue3/styles/virk.scss'
  ]
})
```

### Next.js

```scss
// styles/globals.scss
@use '@madsb/dkfds-vue3/styles/virk';
```

## Best Practices

### Theme Selection Guidelines

1. **Government websites** → Use **Virk** theme
2. **Citizen services** → Use **Borger** theme  
3. **Development/Testing** → Use **Default** theme
4. **Multi-tenant applications** → Use runtime theme switching

### Performance Considerations

- **Single theme**: Smallest bundle size, best performance
- **Runtime switching**: More flexible but slightly larger CSS bundle
- All themes are optimized for production use

### Accessibility

All themes maintain WCAG 2.1 AA compliance:
- **Text contrast**: 4.5:1 minimum for normal text
- **Interactive elements**: Clear focus indicators
- **Color combinations**: Meet accessibility standards

## Migration Guide

### From Complex Integration (v0.x)

**Old approach:**
```scss
@use 'dkfds/src/stylesheets/dkfds-virkdk' as dkfds;
@use '@madsb/dkfds-vue3/scss' as vue3;
@include vue3.configure-with-dkfds-resolved(
  dkfds.color(dkfds.$theme-color-primary),
  // ... 8 more parameters
);
```

**New approach:**
```scss
@use '@madsb/dkfds-vue3/styles/virk';
```

That's it! **90% less code** for the same result.

## Troubleshooting

### Theme Not Loading

1. **Check import path**: Ensure you're using the correct theme path
2. **Sass version**: Use Dart Sass (not deprecated Node Sass)
3. **Build process**: Verify SCSS compilation is working

### Colors Not Applying

1. **CSS specificity**: Component styles may be overridden by custom CSS
2. **Import order**: Ensure theme import comes before other styles
3. **Build cache**: Clear build cache and restart dev server

### Build Errors

1. **Module not found**: Ensure `@madsb/dkfds-vue3` is installed
2. **Sass compilation**: Check that your build tool supports SCSS
3. **File extensions**: Use `.scss` extension for theme imports

## Next Steps

- [Quick Start →](./quick-start) - Build your first themed component
- [Components →](/components/) - Explore all themed components  
- [Installation →](./installation) - Complete setup guide