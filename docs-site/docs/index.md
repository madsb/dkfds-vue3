---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'DKFDS Vue 3'
  text: 'Danish Design System for Vue'
  tagline: Vue 3 implementation of Det Fælles Designsystem (DKFDS v11)
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View Components
      link: /components/
    - theme: alt
      text: API Reference
      link: /api/
    - theme: alt
      text: GitHub
      link: https://github.com/madsb/dkfds-vue3

features:
  - icon: 🎨
    title: DKFDS v11 Compliant
    details: Official implementation of the Danish Common Design System following all accessibility and design standards.
  - icon: ⚡️
    title: Vue 3 + TypeScript
    details: Built with Vue 3 Composition API and TypeScript for modern, type-safe development.
  - icon: 🌳
    title: Tree Shakeable
    details: Import only the components you need. Optimized bundle sizes with selective imports.
  - icon: ♿
    title: Accessibility First
    details: WCAG 2.1 AA compliant components with built-in keyboard navigation and screen reader support.
  - icon: 🎯
    title: 40+ Components
    details: Comprehensive component library covering forms, navigation, feedback, and data display.
  - icon: 🔧
    title: Easy Integration
    details: Simple setup with Vite, supports both VirkDK and BorgerDK themes out of the box.
---

## Quick Example

```vue
<template>
  <FdsFormgroup>
    <FdsLabel for="name">Navn</FdsLabel>
    <FdsHint>Indtast dit fulde navn</FdsHint>
    <FdsInput id="name" v-model="name" placeholder="Skriv dit navn" />
  </FdsFormgroup>

  <FdsButton variant="primary" @click="submit"> Send </FdsButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsFormgroup, FdsLabel, FdsHint, FdsInput, FdsButton } from '@madsb/dkfds-vue3'

const name = ref('')

const submit = () => {
  console.log('Name:', name.value)
}
</script>
```

<div class="component-demo">
  <FdsFormgroup>
    <FdsLabel for="demo-name">Navn</FdsLabel>
    <FdsHint>Indtast dit fulde navn</FdsHint>
    <FdsInput 
      id="demo-name"
      placeholder="Skriv dit navn"
    />
  </FdsFormgroup>
  
  <FdsButton variant="primary">
    Send
  </FdsButton>
</div>

## Why DKFDS Vue 3?

The Danish Common Design System (Det Fælles Designsystem) ensures consistency across Danish government digital services. This Vue 3 implementation provides:

- **Compliance**: Follows DKFDS v11 specifications exactly
- **Performance**: Optimized for modern web standards
- **Developer Experience**: TypeScript support and excellent tooling
- **Accessibility**: Built-in WCAG compliance and semantic markup
- **Flexibility**: Works with any Vue 3 project and build system

## Getting Started

Install the package and start building accessible Danish government services:

```bash
npm install @madsb/dkfds-vue3 dkfds@^11.0.0
```

[Get Started →](/guide/)

## Component Categories

| Category         | Components    | Description                    |
| ---------------- | ------------- | ------------------------------ |
| **Forms**        | 4 components  | Form structure and validation  |
| **Input**        | 11 components | User input controls            |
| **Navigation**   | 11 components | Site navigation and wayfinding |
| **Feedback**     | 9 components  | User notifications and modals  |
| **Data Display** | 8 components  | Content presentation           |
| **Layout**       | 6 components  | Page structure and branding    |

[Browse All Components →](/components/)

## Need Help?

- 📖 **Documentation**: Complete guides and examples
- 💡 **API Reference**: Detailed component APIs
- 🐛 **Issues**: Report bugs on GitHub
- 💬 **Discussions**: Community support
