# Installation

## Prerequisites

Before installing DKFDS Vue 3, ensure you have:

- **Node.js**: 18.0 or higher
- **Vue**: 3.4.0 or higher
- **TypeScript**: 5.0+ (optional but recommended)

## Package Installation

Install the library and its peer dependency:

::: code-group

```bash [npm]
npm install @madsb/dkfds-vue3 dkfds@^11.0.0
```

```bash [pnpm]
pnpm add @madsb/dkfds-vue3 dkfds@^11.0.0
```

```bash [yarn]
yarn add @madsb/dkfds-vue3 dkfds@^11.0.0
```

:::

## Global Registration

Register all components globally:

```typescript
// main.ts
import { createApp } from 'vue'
import dkfdsVue3 from '@madsb/dkfds-vue3'
import App from './App.vue'

const app = createApp(App)
app.use(dkfdsVue3)
app.mount('#app')
```

## Style Integration

Choose **one** of these approaches:

### Option A: Pre-built CSS (Easiest)

```typescript
// main.ts
import '@madsb/dkfds-vue3/dist/dkfds-vue3.css'
```

### Option B: SCSS Integration with DKFDS Theme (Recommended)

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

### Option C: Default Colors (No DKFDS Theme)

```scss
// main.scss - Uses built-in default colors
@use '@madsb/dkfds-vue3/scss' as vue3;
// No additional configuration needed
```

Now use components anywhere without imports:

```vue
<template>
  <FdsButton variant="primary">Click me</FdsButton>
</template>
```

## Individual Imports (Recommended)

For better tree-shaking, import components individually:

```vue
<template>
  <div>
    <FdsFormgroup>
      <FdsLabel for="name">Name</FdsLabel>
      <FdsInput id="name" v-model="name" />
    </FdsFormgroup>
    <FdsButton @click="submit">Submit</FdsButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  FdsFormgroup, 
  FdsLabel, 
  FdsInput, 
  FdsButton 
} from '@madsb/dkfds-vue3'

const name = ref('')

const submit = () => {
  console.log('Name:', name.value)
}
</script>
```

## TypeScript Support

The library includes full TypeScript definitions. For component props:

```typescript
import type { FdsButtonProps, FdsInputProps } from '@madsb/dkfds-vue3'

// Use in component props
interface MyComponentProps {
  buttonConfig: FdsButtonProps
  inputConfig: FdsInputProps
}
```

## Vite Configuration

If using Vite, no additional configuration is needed. For optimal performance:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['@madsb/dkfds-vue3']
  }
})
```

## Webpack Configuration

For webpack projects, ensure proper handling of ES modules:

```javascript
// webpack.config.js
module.exports = {
  // ... other config
  resolve: {
    alias: {
      '@madsb/dkfds-vue3': path.resolve(__dirname, 'node_modules/@madsb/dkfds-vue3/dist/dkfds-vue3.mjs')
    }
  }
}
```

## Nuxt 3 Integration

For Nuxt 3 projects:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@madsb/dkfds-vue3/dist/dkfds-vue3.css'], // Or use your SCSS setup
  build: {
    transpile: ['@madsb/dkfds-vue3']
  }
})
```

Then create a plugin:

```typescript
// plugins/dkfds.client.ts
import dkfdsVue3 from '@madsb/dkfds-vue3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(dkfdsVue3)
})
```

## CDN Usage

For quick prototyping, use the CDN build:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@madsb/dkfds-vue3/dist/dkfds-vue3.css">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/@madsb/dkfds-vue3/dist/dkfds-vue3.umd.js"></script>
</head>
<body>
  <div id="app">
    <fds-button variant="primary">Hello DKFDS</fds-button>
  </div>

  <script>
    const { createApp } = Vue
    const { dkfdsVue3 } = DKFDSVue3

    createApp({}).use(dkfdsVue3).mount('#app')
  </script>
</body>
</html>
```

## Verification

Test your installation with a simple component:

```vue
<template>
  <div>
    <h1>DKFDS Vue 3 Test</h1>
    <FdsAlert variant="success">
      ✅ Installation successful!
    </FdsAlert>
    <FdsButton variant="primary" @click="count++">
      Clicked {{ count }} times
    </FdsButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsAlert, FdsButton } from '@madsb/dkfds-vue3'

const count = ref(0)
</script>
```

## Next Steps

- [Quick Start →](./quick-start) - Build your first form
- [Theming →](./theming) - Customize colors and themes
- [Components →](/components/) - Explore all components

## Troubleshooting

### "Module not found" errors

Ensure both packages are installed:
```bash
npm list @madsb/dkfds-vue3 dkfds
```

### TypeScript errors

Update your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  }
}
```

### Styling issues

Make sure to import styles using one of the approaches above:
```typescript
// Option A: Pre-built CSS
import '@madsb/dkfds-vue3/dist/dkfds-vue3.css'

// Option B: SCSS with theme integration
// See SCSS Integration section above

// Option C: Default SCSS
@use '@madsb/dkfds-vue3/scss' as vue3;
```

### Build errors

Check that your bundler supports ES modules and tree-shaking.