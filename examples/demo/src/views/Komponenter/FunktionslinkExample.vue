<template>
  <article>
    <h1>Funktionslink</h1>

    <!-- Basic Example -->
    <section>
      <h2>Grundlæggende eksempel</h2>
      <div class="example-container">
        <fds-funktionslink title="Grundlæggende funktionslink" @click="handleBasicClick">
          Funktionslink
        </fds-funktionslink>

        <div class="mt-4">
          <p><strong>Klik antal:</strong> {{ basicClickCount }}</p>
          <p><strong>Element type:</strong> Button (automatisk valgt)</p>
        </div>
      </div>
    </section>

    <!-- Link vs Button Types -->
    <section>
      <h2>Element typer</h2>
      <div class="example-container">
        <h3>Automatisk type-detektion</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px">
          <fds-funktionslink title="Button type (auto-detekteret)" @click="handleButtonDemo">
            Button type
          </fds-funktionslink>

          <fds-funktionslink
            href="/link-destination"
            title="Link type (auto-detekteret)"
            @click="handleLinkDemo"
          >
            Link type
          </fds-funktionslink>
        </div>

        <h3>Eksplicit type</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap">
          <fds-funktionslink type="button" title="Eksplicit button" @click="handleExplicitButton">
            Eksplicit button
          </fds-funktionslink>

          <fds-funktionslink
            type="link"
            href="/explicit-link"
            title="Eksplicit link"
            @click="handleExplicitLink"
          >
            Eksplicit link
          </fds-funktionslink>
        </div>
      </div>
    </section>

    <!-- Icons -->
    <section>
      <h2>Med ikoner</h2>
      <div class="example-container">
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
          <fds-funktionslink icon="print" title="Print denne side" @click="handlePrint">
            Print
          </fds-funktionslink>

          <fds-funktionslink
            icon="download"
            href="/download/document.pdf"
            title="Download PDF"
            @click="handleDownload"
          >
            Download PDF
          </fds-funktionslink>

          <fds-funktionslink
            icon="arrow-right"
            :icon-right="true"
            href="/next-page"
            title="Gå til næste side"
            @click="handleNext"
          >
            Næste side
          </fds-funktionslink>

          <fds-funktionslink
            icon="open-in-new"
            href="https://designsystem.dk"
            target="_blank"
            rel="noopener noreferrer"
            title="Åbn DKFDS i nyt vindue"
            @click="handleExternal"
          >
            Åbn i nyt vindue
          </fds-funktionslink>
        </div>
      </div>
    </section>

    <!-- Interactive States -->
    <section>
      <h2>Interaktive tilstande</h2>
      <div class="example-container">
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
          <fds-funktionslink
            icon="save"
            :disabled="isSaving"
            title="Gem kladde"
            @click="handleSave"
          >
            {{ isSaving ? 'Gemmer...' : 'Gem kladde' }}
          </fds-funktionslink>

          <fds-funktionslink icon="delete" title="Slet element" @click="handleDelete">
            Slet
          </fds-funktionslink>

          <fds-funktionslink
            icon="refresh"
            :disabled="isLoading"
            title="Opdater data"
            @click="handleRefresh"
          >
            {{ isLoading ? 'Opdaterer...' : 'Opdater' }}
          </fds-funktionslink>
        </div>

        <div class="mt-4">
          <p><strong>Status:</strong> {{ currentStatus }}</p>
          <p><strong>Sidste handling:</strong> {{ lastAction }}</p>
        </div>
      </div>
    </section>

    <!-- Link Attributes -->
    <section>
      <h2>Link attributter</h2>
      <div class="example-container">
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
          <fds-funktionslink
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            icon="open-in-new"
            title="Åbn eksternt link sikkert"
            @click="handleSecureExternal"
          >
            Sikkert eksternt link
          </fds-funktionslink>

          <fds-funktionslink
            href="/internal-page"
            target="_self"
            title="Naviger internt"
            @click="handleInternal"
          >
            Internt link
          </fds-funktionslink>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section>
      <h2>Tilgængelighed</h2>
      <div class="example-container">
        <fds-funktionslink
          icon="help"
          title="Hjælp til udfyldelse af formularen - åbner i nyt vindue"
          href="/help/form-help"
          target="_blank"
          rel="noopener noreferrer"
          @click="handleHelp"
        >
          Hjælp til formular
        </fds-funktionslink>

        <div class="mt-4">
          <h4>Tilgængelighedsfunktioner:</h4>
          <ul>
            <li>
              <strong>Semantisk HTML:</strong> Bruger korrekt &lt;a&gt; eller &lt;button&gt; element
            </li>
            <li><strong>Title attribut:</strong> Beskrivende tekst for alle interaktioner</li>
            <li>
              <strong>ARIA attributter:</strong> Automatisk håndtering baseret på element type
            </li>
            <li><strong>Tastaturnavigation:</strong> Fuld understøttelse af keyboard navigation</li>
            <li>
              <strong>Fokus håndtering:</strong> Visuel fokusindikator og korrekt tab-rækkefølge
            </li>
            <li><strong>Ikoner:</strong> Dekorative ikoner (aria-hidden="true")</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Props Documentation -->
    <section>
      <h2>Props reference</h2>
      <div class="example-container">
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Props</th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>icon</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>
                Ikon fra DKFDS ikonsæt. Se
                <a href="https://designsystem.dk/design/ikoner/" target="dkfds"> DKFDS ikoner</a>
              </td>
            </tr>
            <tr>
              <td><code>iconRight</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Placer ikon til højre for tekst</td>
            </tr>
            <tr>
              <td><code>href</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>URL for link navigation</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td><code>'link' | 'button'</code></td>
              <td><code>undefined</code></td>
              <td>Element type - auto-detekteres fra href hvis ikke angivet</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Title attribut for tilgængelighed</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Deaktiveret tilstand (kun for button type)</td>
            </tr>
            <tr>
              <td><code>target</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Target attribut for links (_blank, _self, _parent, _top)</td>
            </tr>
            <tr>
              <td><code>rel</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Rel attribut for links</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact" style="margin-top: 16px">
          <thead>
            <tr>
              <th>Events</th>
              <th>Type</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@click</code></td>
              <td><code>(event: MouseEvent) => void</code></td>
              <td>Udsendt når funktionslinket klikkes</td>
            </tr>
          </tbody>
        </table>
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

// Demo state
const basicClickCount = ref(0)
const clickCount = ref(0)
const isSaving = ref(false)
const isLoading = ref(false)
const lastAction = ref('Ingen handlinger endnu')

const currentStatus = computed(() => {
  if (isSaving.value) return 'Gemmer...'
  if (isLoading.value) return 'Opdaterer...'
  return 'Klar'
})

// Event handlers
const handleBasicClick = (event: MouseEvent) => {
  basicClickCount.value++
  lastAction.value = 'Grundlæggende funktionslink klikket'
  console.log('Basic funktionslink clicked', event)
}

const handleButtonDemo = (event: MouseEvent) => {
  clickCount.value++
  lastAction.value = 'Button type demo (auto-detekteret)'
  console.log('Button demo clicked - element type: button', event)
}

const handleLinkDemo = (event: MouseEvent) => {
  event.preventDefault() // Prevent navigation for demo
  clickCount.value++
  lastAction.value = 'Link type demo (auto-detekteret)'
  console.log('Link demo clicked - element type: a', event)
}

const handleExplicitButton = (event: MouseEvent) => {
  clickCount.value++
  lastAction.value = 'Eksplicit button type'
  console.log('Explicit button clicked', event)
}

const handleExplicitLink = (event: MouseEvent) => {
  event.preventDefault() // Prevent navigation for demo
  clickCount.value++
  lastAction.value = 'Eksplicit link type'
  console.log('Explicit link clicked', event)
}

const handlePrint = (_event: MouseEvent) => {
  clickCount.value++
  lastAction.value = 'Print funktion kaldt'
  console.log('Print function called')
  // window.print() - commented out for demo
}

const handleDownload = (event: MouseEvent) => {
  event.preventDefault() // Prevent actual download for demo
  clickCount.value++
  lastAction.value = 'Download link klikket'
  console.log('Download initiated')
}

const handleNext = (event: MouseEvent) => {
  event.preventDefault() // Prevent navigation for demo
  clickCount.value++
  lastAction.value = 'Næste side navigation'
  console.log('Next page navigation')
}

const handleExternal = (event: MouseEvent) => {
  event.preventDefault() // Prevent actual navigation for demo
  clickCount.value++
  lastAction.value = 'Eksternt link klikket'
  console.log('External link clicked')
}

const handleSave = async (_event: MouseEvent) => {
  if (isSaving.value) return

  clickCount.value++
  isSaving.value = true
  lastAction.value = 'Gemmer kladde...'

  // Simulate save operation
  await new Promise((resolve) => setTimeout(resolve, 2000))

  isSaving.value = false
  lastAction.value = 'Kladde gemt succesfuldt!'
  console.log('Draft saved successfully')
}

const handleDelete = (_event: MouseEvent) => {
  clickCount.value++
  if (confirm('Er du sikker på at du vil slette dette element?')) {
    lastAction.value = 'Element slettet'
    console.log('Element deleted')
  } else {
    lastAction.value = 'Sletning annulleret'
  }
}

const handleRefresh = async (_event: MouseEvent) => {
  if (isLoading.value) return

  clickCount.value++
  isLoading.value = true
  lastAction.value = 'Opdaterer data...'

  // Simulate refresh operation
  await new Promise((resolve) => setTimeout(resolve, 1500))

  isLoading.value = false
  lastAction.value = 'Data opdateret'
  console.log('Data refreshed')
}

const handleSecureExternal = (event: MouseEvent) => {
  event.preventDefault() // Prevent actual navigation for demo
  clickCount.value++
  lastAction.value = 'Sikkert eksternt link klikket'
  console.log('Secure external link with noopener noreferrer')
}

const handleInternal = (event: MouseEvent) => {
  event.preventDefault() // Prevent navigation for demo
  clickCount.value++
  lastAction.value = 'Internt link klikket'
  console.log('Internal link navigation')
}

const handleHelp = (event: MouseEvent) => {
  event.preventDefault() // Prevent navigation for demo
  clickCount.value++
  lastAction.value = 'Hjælp link klikket'
  console.log('Help link accessed - would open in new window')
}

const codeExamples = `
<!-- Grundlæggende brug -->
<fds-funktionslink title="Beskrivende titel" @click="handleClick">
  Funktionslink tekst
</fds-funktionslink>

<!-- Automatisk type detektion -->
<!-- Button type (ingen href) -->
<fds-funktionslink @click="handleAction" title="Udfør handling">
  Udfør handling
</fds-funktionslink>

<!-- Link type (med href) -->
<fds-funktionslink href="/destination" @click="handleNavigation" title="Gå til side">
  Gå til side
</fds-funktionslink>

<!-- Eksplicit type angivelse -->
<fds-funktionslink type="button" @click="handleClick" title="Eksplicit button">
  Button type
</fds-funktionslink>

<fds-funktionslink type="link" href="/page" title="Eksplicit link">
  Link type
</fds-funktionslink>

<!-- Med ikoner -->
<!-- Ikon til venstre (standard) -->
<fds-funktionslink icon="print" @click="handlePrint" title="Print denne side">
  Print
</fds-funktionslink>

<!-- Ikon til højre -->
<fds-funktionslink
  icon="arrow-right"
  :icon-right="true"
  href="/next-page"
  title="Gå til næste side"
>
  Næste side
</fds-funktionslink>

<!-- Link attributter -->
<!-- Eksternt link med sikkerhed -->
<fds-funktionslink
  href="https://external-site.com"
  target="_blank"
  rel="noopener noreferrer"
  icon="open-in-new"
  title="Åbn eksternt link sikkert"
>
  Eksternt link
</fds-funktionslink>

<!-- Interaktive tilstande -->
<!-- Med disabled state -->
<fds-funktionslink
  icon="save"
  :disabled="isSaving"
  title="Gem kladde"
  @click="handleSave"
>
  {{ isSaving ? 'Gemmer...' : 'Gem kladde' }}
</fds-funktionslink>

<!-- Event handler eksempel -->
const handleClick = (event: MouseEvent) => {
  console.log('Funktionslink clicked', event)
  // Din logik her
}

<!-- Med confirmation -->
const handleDelete = (event: MouseEvent) => {
  if (confirm('Er du sikker?')) {
    // Udfør sletning
    console.log('Element slettet')
  }
}

<!-- Async operations -->
const handleSave = async (_event: MouseEvent) => {
  isSaving.value = true
  try {
    await saveData()
    console.log('Gemt!')
  } finally {
    isSaving.value = false
  }
}
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
</style>
