<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { createApp, compile } from 'vue'
import dkfdsVue3 from '@madsb/dkfds-vue3'
// Inline the library CSS to the iframe to avoid leaking into VitePress
// Vite will import the file content as a string
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - vite '?raw' import
import dkfdsVue3Css from '@madsb/dkfds-vue3/dist/dkfds-vue3.css?raw'
// Import DKFDS CSS as URLs so Vite copies them to the build output
// and returns hashed, base-aware URLs that work on GitHub Pages
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - vite '?url' import returns a string
import dkfdsVirkUrl from 'dkfds/dist/css/dkfds-virkdk.min.css?url'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - vite '?url' import returns a string
import dkfdsBorgerUrl from 'dkfds/dist/css/dkfds-borgerdk.min.css?url'

type ThemeName = 'virk' | 'borger'
type ColorScheme = 'light' | 'dark'

const props = defineProps<{
  code: string // base64-encoded template string
  theme?: ThemeName
  scheme?: ColorScheme
  showSource?: boolean
  minHeight?: number | string
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)
const activeTheme = ref<ThemeName>(props.theme ?? 'virk')
const activeScheme = ref<ColorScheme>(props.scheme ?? 'light')
const decoded = ref<string>('')
let cleanup: (() => void) | null = null

function decodeBase64(b64: string) {
  try {
    return decodeURIComponent(escape(window.atob(b64)))
  } catch {
    try {
      return window.atob(b64)
    } catch {
      return ''
    }
  }
}

function setIframeHeight() {
  const el = iframeRef.value
  if (!el) return
  const doc = el.contentDocument
  if (!doc) return
  const body = doc.body as HTMLBodyElement
  const contentHeight = Math.ceil(Math.max(body?.scrollHeight || 0, body?.offsetHeight || 0))
  const minH = Math.ceil(Number((props.minHeight as any) ?? 160))
  const next = Math.max(contentHeight, minH)
  const current = parseInt(el.style.height || '0', 10) || 0
  if (next !== current) {
    el.style.height = `${next}px`
  }
}

function mountIntoIframe() {
  const el = iframeRef.value
  if (!el) return
  const doc = el.contentDocument as Document
  if (!doc) return

  // Reset document
  doc.open()
  doc.write('<!doctype html><html><head><meta charset="utf-8"/></head><body><div id="app"></div></body></html>')
  doc.close()

  // Ensure clean body to avoid height feedback loops (100vh etc.)
  doc.body.style.margin = '0'
  // Add inner padding so examples have breathing room
  doc.body.style.padding = '12px'

  // Inject DKFDS theme stylesheet via <link>
  // Use Vite-resolved asset URLs that are valid in static builds
  const themeHref = activeTheme.value === 'borger' ? (dkfdsBorgerUrl as string) : (dkfdsVirkUrl as string)
  const dkfdsLink = doc.createElement('link')
  dkfdsLink.rel = 'stylesheet'
  dkfdsLink.href = themeHref
  doc.head.appendChild(dkfdsLink)

  // Inject library CSS inline
  const style = doc.createElement('style')
  style.textContent = dkfdsVue3Css
  doc.head.appendChild(style)

  // Override problematic global rules inside iframe context
  const override = doc.createElement('style')
  override.textContent = `
    html, body { min-height: auto !important; height: auto !important; }
    body { display: block !important; }
  `
  doc.head.appendChild(override)

  // Create a Vue app in the parent window but mount into iframe document
  const container = doc.getElementById('app')
  if (!container) return

  const template = decoded.value
  const component = { render: compile(template) }
  
  // Use statically imported createApp to avoid top-level await
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // import at top of file: import { createApp } from 'vue'
  const app = createApp(component)
  app.use(dkfdsVue3)
  app.provide('dkfds-theme', {
    theme: activeTheme.value,
    colorScheme: activeScheme.value,
  })
  app.mount(container)

  // Auto-resize when fonts render
  setTimeout(setIframeHeight, 50)
  setTimeout(setIframeHeight, 200)

  // Observe DOM mutations to resize dynamically
  const observer = new (el.contentWindow as Window).MutationObserver(() => setIframeHeight())
  observer.observe(doc.documentElement, { childList: true, subtree: true, characterData: true })

  // Also react to viewport size changes inside the iframe
  // Removed: avoid feedback loop where setting iframe height resizes viewport and grows endlessly

  // Provide cleanup for remounts
  cleanup = () => {
    observer.disconnect()
  }
}

onMounted(async () => {
  decoded.value = decodeBase64(props.code)
  await nextTick()
  mountIntoIframe()
})

watch([activeTheme, activeScheme], async () => {
  // Re-mount to apply new provided theme values
  await nextTick()
  if (cleanup) cleanup()
  mountIntoIframe()
})
</script>

<template>
  <div class="component-preview">
    <div class="component-preview__toolbar">
      <label>
        Theme
        <select v-model="activeTheme">
          <option value="virk">VirkDK</option>
          <option value="borger">BorgerDK</option>
        </select>
      </label>
      <label>
        Scheme
        <select v-model="activeScheme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>

    <iframe
      ref="iframeRef"
      class="component-preview__frame"
      :style="{ minHeight: (props.minHeight ?? 160) + 'px' }"
      sandbox="allow-scripts allow-same-origin"
    />

    <details v-if="props.showSource" class="component-preview__source">
      <summary>Show source</summary>
      <pre><code>{{ decoded }}</code></pre>
    </details>
  </div>
  
</template>

<style scoped>
.component-preview {
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft, #f6f6f7);
}
.component-preview__toolbar {
  display: flex;
  gap: .75rem;
  align-items: center;
  padding: .5rem .75rem;
  border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
  background: var(--vp-c-bg, #fff);
}
.component-preview__toolbar label {
  font-size: .875rem;
  color: var(--vp-c-text-2, #666);
}
.component-preview__toolbar select {
  margin-left: .375rem;
}
.component-preview__frame {
  width: 100%;
  display: block;
  border: 0;
  background: white;
}
.component-preview__source {
  padding: .5rem .75rem;
  background: var(--vp-c-bg, #fff);
}
.component-preview__source pre {
  margin: 0;
}
</style>
