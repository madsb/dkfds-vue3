import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Import only DKFDS components without styles to avoid VitePress conflicts
import dkfdsVue3 from '@madsb/dkfds-vue3'
import ComponentPreview from './components/ComponentPreview.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Register all DKFDS components globally
    app.use(dkfdsVue3)

    // Register preview component used by markdown containers
    app.component('ComponentPreview', ComponentPreview)
  }
} satisfies Theme
