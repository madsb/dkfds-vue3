---
title: FdsSprogvaelger
description: Language selector component implementing DKFDS v11 sprogvælger specifications with automatic document language management and accessibility features
category: layout
dkfds: true
accessibility: WCAG 2.1 AA
tags: [language, internationalization, i18n, locale, navigation, accessibility]
---

# FdsSprogvaelger

Language selector component implementing DKFDS v11 sprogvælger specifications. Provides language switching functionality with automatic document language attribute management and accessibility features. Active language is displayed first with a checkmark icon. Supports both programmatic and URL-based language switching with customizable href generation or event-based handling.

## Installation

The FdsSprogvaelger component is part of the DKFDS Vue 3 library and is available when you install the package:

```bash
npm install @madsb/dkfds-vue3
# or
pnpm add @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <!-- Basic language selector -->
  <FdsSprogvaelger 
    v-model="languages"
    @language-change="handleLanguageChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FdsSprogvaelger } from '@madsb/dkfds-vue3'

const languages = ref([
  { 
    title: 'Dansk', 
    lang: 'da', 
    active: true, 
    ariaLabel: 'Valgt sprog: Dansk' 
  },
  { 
    title: 'English', 
    lang: 'en', 
    active: false, 
    ariaLabel: 'Vælg sprog: English' 
  }
])

const handleLanguageChange = (language) => {
  console.log('Language changed to:', language.lang)
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | `ExtendedFdsLanguageItem[]` | - | Yes | Array of available languages. Each language object should include lang, title, active, and ariaLabel properties |
| `autoSetLang` | `boolean` | `false` | No | Automatically set document language attribute. Updates document.documentElement.lang when language changes |
| `preventDefault` | `boolean` | `true` | No | Prevent default link navigation behavior. When true, prevents navigation and allows event-based handling only |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `ExtendedFdsLanguageItem[]` | Emitted when the language array is updated. Updates the v-model with the new active language state |
| `language-change` | `ExtendedFdsLanguageItem` | Emitted when a language is selected. Provides the complete language object that was selected |
| `lang` | `string` | Emitted when language code changes. Provides just the language code for simple language handling |

## Slots

The FdsSprogvaelger component does not expose any slots. Language content is determined by the `modelValue` prop.

## Usage Examples

### Basic Language Selector with Event Handling

```vue
<template>
  <FdsSprogvaelger 
    v-model="availableLanguages"
    :prevent-default="true"
    @language-change="switchLanguage"
    @lang="updateLanguageCode"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FdsSprogvaelger } from '@madsb/dkfds-vue3'

const availableLanguages = ref([
  { 
    title: 'Dansk', 
    lang: 'da', 
    active: true, 
    ariaLabel: 'Valgt sprog: Dansk' 
  },
  { 
    title: 'English', 
    lang: 'en', 
    active: false, 
    ariaLabel: 'Vælg sprog: English' 
  },
  { 
    title: 'Deutsch', 
    lang: 'de', 
    active: false, 
    ariaLabel: 'Vælg sprog: Deutsch' 
  }
])

const switchLanguage = (language) => {
  console.log('Switching to language:', language.title)
  // Custom language switching logic
  // e.g., update i18n, router, etc.
}

const updateLanguageCode = (langCode) => {
  console.log('Language code changed to:', langCode)
  // Simple language code handling
}
</script>
```

### With Custom URLs and Document Language Management

```vue
<template>
  <FdsSprogvaelger 
    v-model="languagesWithUrls"
    :auto-set-lang="true"
    :prevent-default="false"
    @language-change="handleLanguageSwitch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FdsSprogvaelger } from '@madsb/dkfds-vue3'

const languagesWithUrls = ref([
  { 
    title: 'Dansk', 
    lang: 'da', 
    active: true, 
    ariaLabel: 'Valgt sprog: Dansk',
    href: '/da/current-page'
  },
  { 
    title: 'English', 
    lang: 'en', 
    active: false, 
    ariaLabel: 'Vælg sprog: English',
    href: '/en/current-page'
  }
])

const handleLanguageSwitch = (language) => {
  // Optional additional handling even with custom URLs
  console.log('Navigating to:', language.href)
  // Document language will be automatically set due to autoSetLang: true
}
</script>
```

### Integration with Vue Router and i18n

```vue
<template>
  <FdsSprogvaelger 
    v-model="routerLanguages"
    :prevent-default="true"
    :auto-set-lang="true"
    @language-change="changeRouterLanguage"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { FdsSprogvaelger } from '@madsb/dkfds-vue3'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const routerLanguages = computed(() => [
  {
    title: 'Dansk',
    lang: 'da',
    active: locale.value === 'da',
    ariaLabel: locale.value === 'da' ? 'Valgt sprog: Dansk' : 'Vælg sprog: Dansk'
  },
  {
    title: 'English', 
    lang: 'en',
    active: locale.value === 'en',
    ariaLabel: locale.value === 'en' ? 'Valgt sprog: English' : 'Vælg sprog: English'
  }
])

const changeRouterLanguage = async (language) => {
  // Update i18n locale
  locale.value = language.lang
  
  // Navigate to same route with new locale
  await router.push({
    ...route,
    params: { ...route.params, locale: language.lang }
  })
}
</script>
```

### Dynamic Language Loading

```vue
<template>
  <div>
    <FdsSprogvaelger 
      v-model="dynamicLanguages"
      :prevent-default="true"
      :auto-set-lang="true"
      @language-change="loadLanguage"
    />
    
    <div v-if="isLoading" class="language-loading">
      <FdsSpinner /> Indlæser sprog...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FdsSprogvaelger, FdsSpinner } from '@madsb/dkfds-vue3'

const dynamicLanguages = ref([])
const isLoading = ref(false)

onMounted(async () => {
  // Load available languages from API
  dynamicLanguages.value = await fetchAvailableLanguages()
})

const fetchAvailableLanguages = async () => {
  // Simulate API call
  return [
    { title: 'Dansk', lang: 'da', active: true, ariaLabel: 'Valgt sprog: Dansk' },
    { title: 'English', lang: 'en', active: false, ariaLabel: 'Vælg sprog: English' },
    { title: 'Svenska', lang: 'sv', active: false, ariaLabel: 'Vælg sprog: Svenska' }
  ]
}

const loadLanguage = async (language) => {
  isLoading.value = true
  try {
    // Load language resources
    await loadLanguageResources(language.lang)
    console.log(`Language ${language.title} loaded successfully`)
  } catch (error) {
    console.error('Failed to load language:', error)
  } finally {
    isLoading.value = false
  }
}

const loadLanguageResources = async (langCode) => {
  // Simulate dynamic language resource loading
  return new Promise(resolve => setTimeout(resolve, 1000))
}
</script>
```

## TypeScript Interfaces

```typescript
export interface FdsLanguageItem {
  /** Display title for the language */
  title: string
  /** Whether this language is currently active */
  active: boolean
  /** Language code (e.g., 'da', 'en', 'de') */
  lang: string
  /** ARIA label for accessibility (e.g., 'Valgt sprog: Dansk') */
  ariaLabel: string
}

export interface ExtendedFdsLanguageItem extends FdsLanguageItem {
  /** 
   * Custom URL for language switching
   * Optional href for each language. If not provided, uses default query parameter format.
   */
  href?: string
}

export interface FdsSprogvaelgerProps {
  /** 
   * Array of available languages
   * Each language object should include lang, title, and active properties.
   * Optionally include href for custom navigation URLs.
   */
  modelValue: ExtendedFdsLanguageItem[]
  
  /** 
   * Automatically set document language attribute
   * Updates document.documentElement.lang when language changes.
   * @default false
   */
  autoSetLang?: boolean
  
  /** 
   * Prevent default link navigation behavior
   * When true, prevents navigation and allows event-based handling only.
   * @default true
   */
  preventDefault?: boolean
}
```

## Accessibility

The FdsSprogvaelger component implements comprehensive accessibility features following DKFDS standards:

### WCAG 2.1 AA Compliance

- ✅ **Semantic markup**: Uses proper `<ul>` and `<a>` elements for navigation list
- ✅ **ARIA labeling**: Container has `aria-label="Vælg sprog fra listen"`
- ✅ **Language attributes**: Each link has proper `lang` attribute for language identification
- ✅ **Individual ARIA labels**: Each language link has descriptive `ariaLabel`
- ✅ **Keyboard navigation**: Full keyboard accessibility with Tab and Enter/Space
- ✅ **Focus indicators**: Clear visual focus states for keyboard users
- ✅ **Active state indication**: Visual checkmark icon and active styling

### Screen Reader Support

- **Language announcement**: Screen readers announce the language of each option
- **Active state**: Current language is clearly identified with "Valgt sprog:" prefix
- **Navigation context**: Properly structured as a navigation list
- **Status updates**: Language changes are announced to assistive technology

### Keyboard Navigation

- **Tab**: Navigate through language options
- **Enter/Space**: Activate language selection
- **Focus management**: Logical tab order and clear focus indicators

### Danish Government Requirements

- Complies with Danish accessibility legislation (bekendtgørelse om tilgængelighed)
- Supports Danish screen readers and assistive technology
- Follows DKFDS accessibility patterns and guidelines

## DKFDS Guidelines

### Component Structure

The component follows DKFDS v11 sprogvælger specifications:

```html
<div class="language-switcher">
  <div class="container">
    <ul aria-label="Vælg sprog fra listen">
      <li>
        <a lang="da" aria-label="Valgt sprog: Dansk" class="active">
          <fds-ikon icon="check" decorative />
          Dansk
        </a>
      </li>
      <li>
        <a lang="en" aria-label="Vælg sprog: English">
          English
        </a>
      </li>
    </ul>
  </div>
</div>
```

### Design Tokens

Uses official DKFDS design tokens for consistent styling:

```scss
.language-switcher {
  /* Uses DKFDS container and spacing tokens */
}

.language-switcher a {
  /* Uses DKFDS link and interaction tokens */
}

.language-switcher a.active {
  /* Uses DKFDS active state tokens */
}
```

### Behavioral Patterns

- **Active First**: Active language automatically appears first in list
- **Visual Indication**: Checkmark icon indicates current language
- **Flexible Navigation**: Supports both URL-based and event-based switching
- **Document Integration**: Optional automatic document language attribute management

## Related Components

- [**FdsIkon**](./fds-ikon) - Icon component used internally for checkmark display
- [**FdsMenu**](../navigation/fds-menu) - Navigation menu component for broader navigation needs
- [**FdsNavLink**](../navigation/fds-nav-link) - Individual navigation links

<!-- Verified against source -->