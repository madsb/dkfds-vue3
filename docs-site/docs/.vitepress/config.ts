import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DKFDS Vue 3',
  description:
    'Vue 3 implementation of Det Fælles Designsystem (DKFDS v11) - Danish Common Design System',
  base: '/dkfds-vue3/',
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
      { text: 'API', link: '/api/' },
      { text: 'Demo', link: 'https://github.com/madsb/dkfds-vue3/tree/main/examples/demo' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Accessibility', link: '/guide/accessibility' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Forms',
          collapsed: false,
          items: [
            { text: 'Form Group', link: '/components/forms/formgroup' },
            { text: 'Label', link: '/components/forms/label' },
            { text: 'Hint', link: '/components/forms/hint' },
            { text: 'Error Message', link: '/components/forms/fejlmeddelelse' },
          ],
        },
        {
          text: 'Input',
          collapsed: false,
          items: [
            { text: 'Button', link: '/components/input/button' },
            { text: 'Input', link: '/components/input/input' },
            { text: 'Textarea', link: '/components/input/textarea' },
            { text: 'Checkbox', link: '/components/input/checkbox' },
            { text: 'Radio Group', link: '/components/input/radio-group' },
            { text: 'Radio Item', link: '/components/input/radio-item' },
            { text: 'Dropdown', link: '/components/input/dropdown' },
            { text: 'Toggle Switch', link: '/components/input/toggle-switch' },
            { text: 'Date Fields (Dato Felter)', link: '/components/input/dato-felter' },
            { text: 'Date Picker (Dato Vælger)', link: '/components/input/dato-vaelger' },
            { text: 'File Upload', link: '/components/input/file-upload' },
            { text: 'Input Limit', link: '/components/input/input-limit' },
            { text: 'Number Input', link: '/components/input/input-number' },
          ],
        },
        {
          text: 'Navigation',
          collapsed: false,
          items: [
            { text: 'Breadcrumb', link: '/components/navigation/breadcrumb' },
            { text: 'Menu', link: '/components/navigation/menu' },
            { text: 'Menu Item', link: '/components/navigation/menu-item' },
            { text: 'Nav Link', link: '/components/navigation/nav-link' },
            { text: 'Overflow Menu', link: '/components/navigation/overflow-menu' },
            { text: 'Pagination (Paginering)', link: '/components/navigation/paginering' },
            { text: 'Back to Top (Til Top)', link: '/components/navigation/til-top' },
            { text: 'Back Link (Tilbage Link)', link: '/components/navigation/tilbage-link' },
            { text: 'Tabs (Faneblade)', link: '/components/navigation/faneblade' },
            { text: 'Tab Navigation (Faneblade Nav)', link: '/components/navigation/faneblade-nav' },
            { text: 'Tab Nav Item', link: '/components/navigation/faneblade-nav-item' },
            { text: 'Tab', link: '/components/navigation/faneblade-tab' },
            { text: 'Tab Panel', link: '/components/navigation/faneblade-panel' },
            { text: 'Step Indicator Group (Trinindikator)', link: '/components/navigation/trinindikator-group' },
            { text: 'Step Indicator Step', link: '/components/navigation/trinindikator-step' },
          ],
        },
        {
          text: 'Feedback',
          collapsed: false,
          items: [
            { text: 'Alert', link: '/components/feedback/alert' },
            { text: 'Modal', link: '/components/feedback/modal' },
            { text: 'Toast', link: '/components/feedback/toast' },
            { text: 'Toast Container', link: '/components/feedback/toast-container' },
            { text: 'Tooltip', link: '/components/feedback/tooltip' },
            { text: 'Spinner', link: '/components/feedback/spinner' },
            { text: 'Error Summary (Fejlopsummering)', link: '/components/feedback/fejlopsummering' },
          ],
        },
        {
          text: 'Data Display',
          collapsed: false,
          items: [
            { text: 'Accordion', link: '/components/data-display/accordion' },
            { text: 'Accordion Group', link: '/components/data-display/accordion-group' },
            { text: 'Badge', link: '/components/data-display/badge' },
            { text: 'Card', link: '/components/data-display/card' },
            { text: 'Card Group', link: '/components/data-display/card-group' },
            { text: 'Details (Detaljer)', link: '/components/data-display/detaljer' },
            { text: 'List', link: '/components/data-display/list' },
            { text: 'List Item', link: '/components/data-display/list-item' },
            { text: 'Tag', link: '/components/data-display/tag' },
            { text: 'Preformatted (Pre)', link: '/components/data-display/pre' },
            { text: 'Preview', link: '/components/data-display/preview' },
            { text: 'Preview Item', link: '/components/data-display/preview-item' },
            { text: 'Preview Code', link: '/components/data-display/preview-code' },
            { text: 'Preview Example', link: '/components/data-display/preview-example' },
          ],
        },
        {
          text: 'Layout',
          collapsed: false,
          items: [
            { text: 'Icon (Ikon)', link: '/components/layout/ikon' },
            { text: 'Icon Collection', link: '/components/layout/icon-collection' },
            { text: 'Cookie Notice (Cookiemeddelelse)', link: '/components/layout/cookiemeddelelse' },
            { text: 'Function Link (Funktionslink)', link: '/components/layout/funktionslink' },
            { text: 'Language Selector (Sprogvælger)', link: '/components/layout/sprogvaelger' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Components', link: '/api/components' },
            { text: 'Composables', link: '/api/composables' },
            { text: 'Types', link: '/api/types' },
            { text: 'Utilities', link: '/api/utilities' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/madsb/dkfds-vue3' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Mads Bjerre',
    },

    search: {
      provider: 'local',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },

  vite: {
    resolve: {
      alias: {
        '@': '../../src',
      },
    },
    ssr: {
      noExternal: ['@madsb/dkfds-vue3', 'dkfds']
    }
  },
})
