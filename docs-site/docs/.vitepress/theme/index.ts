import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Import only DKFDS components without styles to avoid VitePress conflicts
import dkfdsVue3 from '@madsb/dkfds-vue3'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Register all DKFDS components globally
    app.use(dkfdsVue3)
  }
} satisfies Theme
