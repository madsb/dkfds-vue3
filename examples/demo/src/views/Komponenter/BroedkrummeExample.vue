<template>
  <article>
    <!-- Basic Example -->
    <section>
      <h2>Grundlæggende eksempel</h2>
      <div class="example-container">
        <fds-breadcrumb :items="basicBreadcrumbItems" container />

        <p class="mt-4">
          <strong>Nuværende side:</strong>
          {{ basicBreadcrumbItems[basicBreadcrumbItems.length - 1].text }}
        </p>
      </div>
    </section>

    <!-- Container vs No Container -->
    <section>
      <h2>Med og uden container</h2>
      <div class="example-container">
        <h3>Med container</h3>
        <fds-breadcrumb :items="breadcrumbItems" container />

        <h3 style="margin-top: 24px">Uden container</h3>
        <fds-breadcrumb :items="breadcrumbItems" />
      </div>
    </section>

    <!-- Different Depths -->
    <section>
      <h2>Forskellige dybder</h2>
      <div class="example-container">
        <h3>Simpel navigation (2 niveauer)</h3>
        <fds-breadcrumb :items="simpleBreadcrumbItems" container />

        <h3 style="margin-top: 24px">Standard navigation (3 niveauer)</h3>
        <fds-breadcrumb :items="breadcrumbItems" container />

        <h3 style="margin-top: 24px">Dyb navigation (5 niveauer)</h3>
        <fds-breadcrumb :items="deepBreadcrumbItems" container />
      </div>
    </section>

    <!-- Interactive Demo -->
    <section>
      <h2>Interaktivt eksempel</h2>
      <div class="example-container">
        <fds-breadcrumb
          :items="currentBreadcrumbs"
          :aria-label="customAriaLabel"
          container
          @item-click="handleBreadcrumbClick"
        />

        <div class="navigation-controls" style="margin-top: 24px">
          <h4>Naviger til:</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px">
            <button
              v-for="(page, index) in allPages"
              :key="index"
              class="btn btn--secondary btn--sm"
              :class="{ 'btn--primary': currentPageIndex === index }"
              @click="navigateToPage(index)"
            >
              {{ page.text }}
            </button>
          </div>
        </div>

        <div class="interaction-feedback" style="margin-top: 16px">
          <p><strong>Klik antal:</strong> {{ clickCount }}</p>
          <p><strong>Sidste handling:</strong> {{ lastAction }}</p>
          <p><strong>Aktuel side:</strong> {{ allPages[currentPageIndex].text }}</p>
        </div>
      </div>
    </section>

    <!-- Custom Aria Label -->
    <section>
      <h2>Tilpasset aria-label</h2>
      <div class="example-container">
        <fds-breadcrumb :items="breadcrumbItems" aria-label="Sidenavigation" container />

        <br />

        <fds-breadcrumb
          :items="serviceBreadcrumbs"
          aria-label="Servicenavigation for ansøgninger"
          container
        />
      </div>
    </section>

    <!-- Vue Router Integration -->
    <section>
      <h2>Vue Router Integration</h2>
      <div class="example-container">
        <h3>Med Vue Router</h3>
        <p style="margin-bottom: 16px">
          Komponenten detekterer automatisk Vue Router og bruger <code>router-link</code> for
          navigation når den er tilgængelig. Du kan bruge både <code>href</code> og
          <code>to</code> props.
        </p>
        <fds-breadcrumb :items="routerBreadcrumbs" container />

        <h3 style="margin-top: 24px">Native links (tvunget)</h3>
        <p style="margin-bottom: 16px">
          Du kan tvinge brugen af standard anchor tags med <code>useNativeLinks</code> prop.
        </p>
        <fds-breadcrumb
          :items="routerBreadcrumbs"
          :use-native-links="true"
          container
          @item-click="handleNativeClick"
        />

        <h3 style="margin-top: 24px">Eksterne links</h3>
        <p style="margin-bottom: 16px">
          Links markeret med <code>external: true</code> bruger altid standard anchor tags.
        </p>
        <fds-breadcrumb :items="externalBreadcrumbs" container />

        <div class="mt-4">
          <h4>Kode eksempel:</h4>
          <pre><code>{{ routerExampleCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- Usage Guidelines -->
    <section>
      <h2>Retningslinjer for brug</h2>
      <div class="example-container">
        <div class="alert alert--info" style="margin-bottom: 16px">
          <h4>Hvornår skal du bruge brødkrummer?</h4>
          <ul>
            <li>I hierarkiske strukturer med flere niveauer</li>
            <li>Når brugeren skal kunne navigere tilbage til overordnede sider</li>
            <li>For at vise brugerens position i sitestrukturen</li>
          </ul>
        </div>

        <div class="alert alert--warning">
          <h4>Vigtigt at huske:</h4>
          <ul>
            <li>Brug ikke samtidig med tilbage-link</li>
            <li>Sidste element i brødkrummer er den nuværende side (uden link)</li>
            <li>Inkluder automatisk chevron-right separatorer</li>
            <li>Standard aria-label er "Brødkrumme"</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section>
      <h2>Tilgængelighed</h2>
      <div class="example-container">
        <fds-breadcrumb
          :items="accessibilityBreadcrumbs"
          aria-label="Hjælpsystem navigation"
          container
        />

        <div class="mt-4">
          <h4>Tilgængelighedsfunktioner:</h4>
          <ul>
            <li><strong>Semantisk HTML:</strong> Bruger &lt;nav&gt; og &lt;ol&gt; elementer</li>
            <li><strong>ARIA labels:</strong> Tilpasselige aria-label og aria-current="page"</li>
            <li><strong>Tastaturnavigation:</strong> Alle links kan navigeres med tastatur</li>
            <li>
              <strong>Skærmlæser-venlig:</strong> Korrekt annoncering af navigation og position
            </li>
            <li>
              <strong>Visuelle indikatorer:</strong> Chevron ikoner er dekorative (aria-hidden)
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Code Examples -->
    <section>
      <h2>Kodeeksempler</h2>
      <div class="example-container">
        <pre><code>{{ codeExamples }}</code></pre>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BreadcrumbItem } from '@madsb/dkfds-vue3'

// Interactive demo state
const currentPageIndex = ref(2)
const clickCount = ref(0)
const lastAction = ref('Ingen handlinger endnu')

// All pages for interactive demo
const allPages = [
  { text: 'Forside', href: '/', data: { level: 0 } },
  { text: 'Komponenter', href: '/komponenter', data: { level: 1 } },
  { text: 'Brødkrumme', href: '/komponenter/broedkrumme', data: { level: 2 } },
  { text: 'Eksempler', href: '/komponenter/broedkrumme/eksempler', data: { level: 3 } },
  { text: 'Avanceret', href: '/komponenter/broedkrumme/avanceret', data: { level: 4 } },
]

// Basic breadcrumb for simple example
const basicBreadcrumbItems = ref<BreadcrumbItem[]>([
  { text: 'Forside', href: '/' },
  { text: 'Komponenter', href: '/komponenter' },
  { text: 'Brødkrumme' },
])

// Standard breadcrumb with 3 levels
const breadcrumbItems = ref<BreadcrumbItem[]>([
  { text: 'Forside', href: '/' },
  { text: 'Komponenter', href: '/komponenter' },
  { text: 'Brødkrumme' },
])

// Simple breadcrumb with 2 levels
const simpleBreadcrumbItems = ref<BreadcrumbItem[]>([
  { text: 'Forside', href: '/' },
  { text: 'Aktuel side' },
])

// Deep navigation with 5 levels
const deepBreadcrumbItems = ref<BreadcrumbItem[]>([
  { text: 'Forside', href: '/' },
  { text: 'Kategori', href: '/kategori' },
  { text: 'Underkategori', href: '/kategori/under' },
  { text: 'Produkt', href: '/kategori/under/produkt' },
  { text: 'Detaljer' },
])

// Service-specific breadcrumbs
const serviceBreadcrumbs = ref<BreadcrumbItem[]>([
  { text: 'Borger.dk', href: '/borger' },
  { text: 'Ansøgninger', href: '/borger/ansogninger' },
  { text: 'Ny ansøgning', href: '/borger/ansogninger/ny' },
  { text: 'Personlige oplysninger' },
])

// Accessibility-focused breadcrumbs
const accessibilityBreadcrumbs = ref<BreadcrumbItem[]>([
  { text: 'Hjælp', href: '/help' },
  { text: 'Tilgængelighed', href: '/help/accessibility' },
  { text: 'Navigationshjælp' },
])

// Vue Router integration examples
const routerBreadcrumbs = ref<BreadcrumbItem[]>([
  { text: 'Forside', to: '/' },
  { text: 'Komponenter', to: { name: 'komponenter' } },
  { text: 'Brødkrumme', to: '/komponenter/broedkrumme' },
  { text: 'Vue Router' },
])

const externalBreadcrumbs = ref<BreadcrumbItem[]>([
  { text: 'Forside', href: '/' },
  { text: 'Ressourcer', href: '/ressourcer' },
  { text: 'DKFDS', href: 'https://designsystem.dk', external: true },
  { text: 'Dokumentation' },
])

// Computed values for interactive demo
const currentBreadcrumbs = computed(() => {
  return allPages.slice(0, currentPageIndex.value + 1).map((page, index) => ({
    text: page.text,
    href: index < currentPageIndex.value ? page.href : undefined,
    data: page.data,
  }))
})

const customAriaLabel = computed(() => `Navigation - niveau ${currentPageIndex.value + 1}`)

// Event handlers
const handleBreadcrumbClick = (event: MouseEvent, item: BreadcrumbItem, index: number) => {
  event.preventDefault() // Prevent navigation for demo
  clickCount.value++
  lastAction.value = `Klikket på "${item.text}" (niveau ${index + 1})`

  // Update current page for demo
  const targetIndex = allPages.findIndex((page) => page.text === item.text)
  if (targetIndex !== -1 && targetIndex < currentPageIndex.value) {
    currentPageIndex.value = targetIndex
    lastAction.value = `Navigeret til "${item.text}"`
  }

  console.log('Breadcrumb clicked:', { item, index, data: item.data })
}

const navigateToPage = (index: number) => {
  if (index !== currentPageIndex.value) {
    currentPageIndex.value = index
    clickCount.value++
    lastAction.value = `Navigeret til "${allPages[index].text}"`
  }
}

const handleRouterClick = (event: MouseEvent, item: BreadcrumbItem, index: number) => {
  event.preventDefault() // Prevent navigation for demo
  console.log('Router breadcrumb clicked:', { item, index })
  lastAction.value = `Router link klikket: "${item.text}"`
}

const handleNativeClick = (event: MouseEvent, item: BreadcrumbItem, index: number) => {
  event.preventDefault() // Prevent navigation for demo
  console.log('Native breadcrumb clicked:', { item, index })
  lastAction.value = `Native link klikket: "${item.text}"`
}

const routerExampleCode = `
<!-- Vue Router integration -->
<!-- Komponenten detekterer automatisk Vue Router -->
<fds-breadcrumb :items="routerItems" container />

<!-- Items med Vue Router to prop -->
const routerItems: BreadcrumbItem[] = [
  {
    text: 'Forside',
    href: '/',        // Fallback for non-router
    to: '/'           // Vue Router navigation
  },
  {
    text: 'Komponenter',
    href: '/komponenter',
    to: { name: 'komponenter' }  // Named route
  },
  {
    text: 'Aktuel side'
  }
]

<!-- Tving native links -->
<fds-breadcrumb
  :items="routerItems"
  :use-native-links="true"
  container
/>

<!-- Eksterne links -->
const externalItems: BreadcrumbItem[] = [
  { text: 'Intern', href: '/' },
  {
    text: 'DKFDS',
    href: 'https://designsystem.dk',
    external: true  // Bruger altid <a> tag
  },
  { text: 'Aktuel' }
]

<!-- TypeScript interface med Vue Router -->
interface BreadcrumbItem {
  text: string
  href?: string                    // Standard URL
  to?: string | Record<string, any> // Vue Router location
  external?: boolean               // Force standard anchor
  data?: any                       // Custom data
}
`

const codeExamples = `
<!-- Grundlæggende brug -->
<fds-breadcrumb :items="breadcrumbItems" container />

<!-- Uden container -->
<fds-breadcrumb :items="breadcrumbItems" />

<!-- Med tilpasset aria-label -->
<fds-breadcrumb
  :items="breadcrumbItems"
  aria-label="Sidenavigation"
  container
/>

<!-- Med event handling -->
<fds-breadcrumb
  :items="breadcrumbItems"
  @item-click="handleBreadcrumbClick"
  container
/>

<!-- TypeScript interface -->
interface BreadcrumbItem {
  text: string
  href?: string  // Udelad for nuværende side
  data?: any     // Tilpasset data
}

<!-- Event handler -->
const handleBreadcrumbClick = (
  event: MouseEvent,
  item: BreadcrumbItem,
  index: number
) => {
  console.log('Klikket på:', item.text)
  console.log('Position:', index)
  console.log('Tilpasset data:', item.data)
}

<!-- Eksempler på forskellige strukturer -->
<!-- Simpel (2 niveauer) -->
const simpleBreadcrumbs: BreadcrumbItem[] = [
  { text: 'Forside', href: '/' },
  { text: 'Aktuel side' }
]

<!-- Standard (3 niveauer) -->
const standardBreadcrumbs: BreadcrumbItem[] = [
  { text: 'Forside', href: '/' },
  { text: 'Kategori', href: '/kategori' },
  { text: 'Aktuel side' }
]

<!-- Dyb navigation (5 niveauer) -->
const deepBreadcrumbs: BreadcrumbItem[] = [
  { text: 'Forside', href: '/' },
  { text: 'Niveau 2', href: '/niveau2' },
  { text: 'Niveau 3', href: '/niveau2/niveau3' },
  { text: 'Niveau 4', href: '/niveau2/niveau3/niveau4' },
  { text: 'Aktuel side' }
]

<!-- Med tilpasset data -->
const breadcrumbsWithData: BreadcrumbItem[] = [
  { text: 'Forside', href: '/', data: { id: 'home', level: 0 } },
  { text: 'Produkter', href: '/products', data: { id: 'products', level: 1 } },
  { text: 'Detaljer', data: { id: 'current', level: 2 } }
]
`
</script>

<style scoped>
.example-container {
  padding: 24px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 24px;
}

section {
  margin-bottom: 48px;
}

h2 {
  margin-bottom: 16px;
}

h3 {
  margin-bottom: 12px;
}

.mt-4 {
  margin-top: 16px;
}

.navigation-controls h4 {
  margin-bottom: 8px;
}

.interaction-feedback p {
  margin: 4px 0;
}
</style>
