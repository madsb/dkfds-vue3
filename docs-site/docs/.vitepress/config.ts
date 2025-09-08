import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { resolve as pathResolve, dirname } from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import { Buffer } from 'node:buffer'

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
            { text: 'Form Group', link: '/components/forms/fds-formgroup' },
            { text: 'Label', link: '/components/forms/fds-label' },
            { text: 'Hint', link: '/components/forms/fds-hint' },
            { text: 'Error Message', link: '/components/forms/fds-fejlmeddelelse' },
          ],
        },
        {
          text: 'Input',
          collapsed: false,
          items: [
            { text: 'Button', link: '/components/input/fds-button' },
            { text: 'Input', link: '/components/input/fds-input' },
            { text: 'Textarea', link: '/components/input/fds-textarea' },
            { text: 'Checkbox', link: '/components/input/fds-checkbox' },
            { text: 'Radio Group', link: '/components/input/fds-radio-group' },
            { text: 'Radio Item', link: '/components/input/fds-radio-item' },
            { text: 'Dropdown', link: '/components/input/fds-dropdown' },
            { text: 'Toggle Switch', link: '/components/input/fds-toggle-switch' },
            { text: 'Date Fields (Dato Felter)', link: '/components/input/fds-dato-felter' },
            { text: 'Date Picker (Dato Vælger)', link: '/components/input/fds-dato-vaelger' },
            { text: 'File Upload', link: '/components/input/fds-file-upload' },
            { text: 'Input Limit', link: '/components/input/fds-input-limit' },
            { text: 'Number Input', link: '/components/input/fds-input-number' },
          ],
        },
        {
          text: 'Navigation',
          collapsed: false,
          items: [
            { text: 'Brødkrummer', link: '/components/navigation/fds-breadcrumb' },
            { text: 'Menu', link: '/components/navigation/fds-menu' },
            { text: 'Menu Item', link: '/components/navigation/fds-menu-item' },
            { text: 'Nav Link', link: '/components/navigation/fds-nav-link' },
            { text: 'Overflow Menu', link: '/components/navigation/fds-overflow-menu' },
            { text: 'Paginering', link: '/components/navigation/fds-paginering' },
            { text: 'Til top', link: '/components/navigation/fds-til-top' },
            { text: 'Tilbage-link', link: '/components/navigation/fds-tilbage-link' },
            { text: 'Faneblade', link: '/components/navigation/fds-faneblade' },
            {
              text: 'Faneblade Nav',
              link: '/components/navigation/fds-faneblade-nav',
            },
            { text: 'Faneblade Nav Item', link: '/components/navigation/fds-faneblade-nav-item' },
            { text: 'Faneblade Tab', link: '/components/navigation/fds-faneblade-tab' },
            { text: 'Faneblade Panel', link: '/components/navigation/fds-faneblade-panel' },
            {
              text: 'Trinindikatorer',
              link: '/components/navigation/fds-trinindikator-group',
            },
            { text: 'Trinindikator Step', link: '/components/navigation/fds-trinindikator-step' },
          ],
        },
        {
          text: 'Feedback',
          collapsed: false,
          items: [
            { text: 'Alert', link: '/components/feedback/fds-alert' },
            { text: 'Modal', link: '/components/feedback/fds-modal' },
            { text: 'Toast', link: '/components/feedback/fds-toast' },
            { text: 'Toast Container', link: '/components/feedback/fds-toast-container' },
            { text: 'Tooltip', link: '/components/feedback/fds-tooltip' },
            { text: 'Spinner', link: '/components/feedback/fds-spinner' },
            {
              text: 'Error Summary (Fejlopsummering)',
              link: '/components/feedback/fds-fejlopsummering',
            },
          ],
        },
        {
          text: 'Data Display',
          collapsed: false,
          items: [
            { text: 'Accordion', link: '/components/data-display/fds-accordion' },
            { text: 'Accordion Group', link: '/components/data-display/fds-accordion-group' },
            { text: 'Badge', link: '/components/data-display/fds-badge' },
            { text: 'Kort', link: '/components/data-display/fds-card' },
            { text: 'Kort Group', link: '/components/data-display/fds-card-group' },
            { text: 'Detaljer', link: '/components/data-display/fds-detaljer' },
            { text: 'Liste', link: '/components/data-display/fds-list' },
            { text: 'Liste Item', link: '/components/data-display/fds-list-item' },
            { text: 'Tag', link: '/components/data-display/fds-tag' },
            { text: 'Preformatted (Pre)', link: '/components/data-display/fds-pre' },
            { text: 'Preview', link: '/components/data-display/fds-preview' },
            { text: 'Preview Item', link: '/components/data-display/fds-preview-item' },
            { text: 'Preview Code', link: '/components/data-display/fds-preview-code' },
            { text: 'Preview Example', link: '/components/data-display/fds-preview-example' },
          ],
        },
        {
          text: 'Layout',
          collapsed: false,
          items: [
            { text: 'Ikon', link: '/components/layout/fds-ikon' },
            { text: 'Ikon Collection', link: '/components/layout/fds-icon-collection' },
            {
              text: 'Cookiemeddelelse',
              link: '/components/layout/fds-cookiemeddelelse',
            },
            { text: 'Funktionslink', link: '/components/layout/fds-funktionslink' },
            {
              text: 'Sprogvælger',
              link: '/components/layout/fds-sprogvaelger',
            },
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
    config(md) {
      // Custom ::: preview container without external deps
      const escapeHtmlAttr = (s: string) =>
        s
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')

      // Block rule for ::: preview ... :::
      md.block.ruler.before('fence', 'preview_container', (state, startLine, endLine, silent) => {
        const start = state.bMarks[startLine] + state.tShift[startLine]
        const max = state.eMarks[startLine]
        const line = state.src.slice(start, max).trim()
        if (!line.startsWith(':::')) return false
        const params = line.slice(3).trim()
        if (!params.startsWith('preview')) return false
        if (silent) return true

        // Parse options: preview theme=virk scheme=light showSource
        let theme: 'virk' | 'borger' | undefined
        let scheme: 'light' | 'dark' | undefined
        let showSource = false
        const parts = params.split(/\s+/).slice(1)
        for (const p of parts) {
          if (p === 'showSource') showSource = true
          const [k, v] = p.split('=')
          if (k === 'theme' && (v === 'virk' || v === 'borger')) theme = v
          if ((k === 'scheme' || k === 'colorScheme') && (v === 'light' || v === 'dark')) scheme = v as any
        }

        // Find the end :::
        let nextLine = startLine + 1
        let found = false
        for (; nextLine < endLine; nextLine++) {
          const s = state.bMarks[nextLine] + state.tShift[nextLine]
          const e = state.eMarks[nextLine]
          const l = state.src.slice(s, e).trim()
          if (l === ':::') {
            found = true
            break
          }
        }
        if (!found) return false

        const content = state.getLines(startLine + 1, nextLine, state.tShift[startLine + 1], false)
        const b64 = Buffer.from(content).toString('base64')

        const token = state.push('preview_block', 'div', 0)
        token.block = true
        token.map = [startLine, nextLine]
        token.meta = { b64, theme, scheme, showSource }

        state.line = nextLine + 1
        return true
      })

      md.renderer.rules.preview_block = (tokens: any, idx: number) => {
        const meta = tokens[idx].meta || {}
        const attrs: string[] = [`code=\"${escapeHtmlAttr(meta.b64 || '')}\"`]
        if (meta.theme) attrs.push(`theme=\"${meta.theme}\"`)
        if (meta.scheme) attrs.push(`scheme=\"${meta.scheme}\"`)
        if (meta.showSource) attrs.push(`showSource`)
        return `<ComponentPreview ${attrs.join(' ')} />`
      }

      // Code fence ```preview blocks
      const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) || ((...args: any[]) => {
        // @ts-ignore fallback to default renderer
        return (md as any).renderer.renderToken(...args)
      })

      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx]
        const info = (token.info || '').trim()
        if (info === 'preview' || info.startsWith('preview ')) {
          // Parse options: preview theme=... scheme=... showSource
          const parts = info.split(/\s+/).slice(1)
          let theme: 'virk' | 'borger' | undefined
          let scheme: 'light' | 'dark' | undefined
          let showSource = false
          for (const p of parts) {
            if (p === 'showSource') showSource = true
            const [k, v] = p.split('=')
            if (k === 'theme' && (v === 'virk' || v === 'borger')) theme = v
            if ((k === 'scheme' || k === 'colorScheme') && (v === 'light' || v === 'dark')) scheme = v as any
          }
          const b64 = Buffer.from(token.content).toString('base64')
          const attrs: string[] = [`code=\"${b64}\"`]
          if (theme) attrs.push(`theme=\"${theme}\"`)
          if (scheme) attrs.push(`scheme=\"${scheme}\"`)
          if (showSource) attrs.push('showSource')
          return `<ComponentPreview ${attrs.join(' ')} />`
        }
        return defaultFence(tokens as any, idx, options, env, slf)
      }
    },
  },

  vite: {
    resolve: {
      alias: [
        { find: '@', replacement: '../../src' },
        { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
        // Expose DKFDS CSS files directly so we can import them with ?url in the theme preview component
        {
          find: /^dkfds\/dist\/css\/dkfds-virkdk\.min\.css(\?url)?$/,
          replacement: pathResolve(
            fileURLToPath(new URL('../../', import.meta.url)),
            'node_modules/dkfds/dist/css/dkfds-virkdk.min.css'
          ),
        },
        {
          find: /^dkfds\/dist\/css\/dkfds-borgerdk\.min\.css(\?url)?$/,
          replacement: pathResolve(
            fileURLToPath(new URL('../../', import.meta.url)),
            'node_modules/dkfds/dist/css/dkfds-borgerdk.min.css'
          ),
        },
      ],
    },
    ssr: {
      noExternal: ['@madsb/dkfds-vue3', 'dkfds'],
    },
    define: {
      // Resolve DKFDS real install path to avoid symlink issues
      __DKFDS_VIRK_ABS__: (() => {
        const pkg = require.resolve('dkfds/package.json')
        const cssDir = pathResolve(dirname(pkg), 'dist/css')
        return JSON.stringify(pathResolve(cssDir, 'dkfds-virkdk.min.css'))
      })(),
      __DKFDS_BORGER_ABS__: (() => {
        const pkg = require.resolve('dkfds/package.json')
        const cssDir = pathResolve(dirname(pkg), 'dist/css')
        return JSON.stringify(pathResolve(cssDir, 'dkfds-borgerdk.min.css'))
      })(),
    },
  },
})
