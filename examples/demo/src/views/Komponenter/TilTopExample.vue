<template>
  <article>
    <h1>Tilbage til toppen</h1>

    <!-- Basic Example -->
    <section>
      <h2>Grundlæggende eksempel</h2>
      <div class="example-container">
        <fds-til-top class="example-til-top" />
        <p class="mt-3">
          <small class="text-muted">
            Komponenten vises normalt efter 2 skærmhøjder scroll. I denne demo er den gjort synlig
            til demonstration.
          </small>
        </p>
        <p>Se også i bund højre hjørne af siden for den rigtige implementering.</p>
      </div>
    </section>

    <!-- Custom Text Example -->
    <section>
      <h2>Med tilpasset tekst</h2>
      <div class="example-container">
        <fds-til-top
          class="example-til-top"
          visible-text="Hop til top"
          screen-reader-text="Gå til toppen af denne side"
        >
          Hop til top
        </fds-til-top>
      </div>
    </section>

    <!-- Custom Threshold Example -->
    <section>
      <h2>Med tilpasset scroll-tærskel</h2>
      <div class="example-container">
        <fds-til-top class="example-til-top" :threshold="200" />
        <p class="mt-3">
          <small class="text-muted">
            Denne version vises efter kun 200px scroll i stedet for standard 2 skærmhøjder.
          </small>
        </p>
      </div>
    </section>

    <!-- Interactive Example -->
    <section>
      <h2>Interaktivt eksempel</h2>
      <div class="example-container">
        <div class="d-flex flex-column gap-3">
          <div>
            <fds-til-top
              class="example-til-top"
              :visible-text="customVisibleText"
              :screen-reader-text="customScreenReaderText"
              :threshold="customThreshold"
            >
              {{ useSlotContent ? customSlotText : '' }}
            </fds-til-top>
          </div>

          <div class="mt-4">
            <h4>Konfiguration:</h4>
            <div class="row">
              <div class="col-md-6">
                <label for="visible-text">Synlig tekst (desktop):</label>
                <input
                  id="visible-text"
                  v-model="customVisibleText"
                  class="form-control mt-1"
                  placeholder="Til toppen"
                />
              </div>
              <div class="col-md-6">
                <label for="screen-reader-text">Skærmlæser tekst:</label>
                <input
                  id="screen-reader-text"
                  v-model="customScreenReaderText"
                  class="form-control mt-1"
                  placeholder="Til toppen af siden"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <label for="threshold">Scroll-tærskel (px):</label>
                <input
                  id="threshold"
                  v-model.number="customThreshold"
                  type="number"
                  class="form-control mt-1"
                  min="0"
                  step="100"
                />
              </div>
              <div class="col-md-6 d-flex align-items-end">
                <label>
                  <input v-model="useSlotContent" type="checkbox" />
                  Brug slot indhold
                </label>
              </div>
            </div>
            <div v-if="useSlotContent" class="row mt-3">
              <div class="col-12">
                <label for="slot-text">Slot tekst:</label>
                <input
                  id="slot-text"
                  v-model="customSlotText"
                  class="form-control mt-1"
                  placeholder="Tilpasset slot tekst"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility Features -->
    <section>
      <h2>Tilgængelighed</h2>
      <div class="example-container">
        <div class="alert alert-info">
          <h4>Tilgængelighedsfeatures:</h4>
          <ul class="mb-0">
            <li>
              <strong>Skærmlæser support:</strong> Komponentet har skjult tekst til skærmlæsere
            </li>
            <li>
              <strong>Keyboard navigation:</strong> Kan navigeres med Tab og aktiveres med
              Enter/Space
            </li>
            <li><strong>Responsivt design:</strong> Kun ikon på mobil, tekst + ikon på desktop</li>
            <li>
              <strong>Focus management:</strong> Springer til #top element eller document.body
            </li>
            <li><strong>Motion preferences:</strong> Respekterer brugerens motion preferences</li>
          </ul>
        </div>

        <fds-til-top
          class="example-til-top"
          screen-reader-text="Gå til toppen af denne side - tilgængelig version"
          visible-text="Til top"
        />
      </div>
    </section>

    <!-- Implementation Guide -->
    <section>
      <h2>Implementeringsguide</h2>
      <div class="example-container">
        <div class="alert alert-warning">
          <h4>Vigtigt at bemærke:</h4>
          <ul class="mb-0">
            <li>
              <strong>Placering:</strong> Komponenten skal typisk placeres i bunden af siden eller i
              en footer
            </li>
            <li>
              <strong>Scroll trigger:</strong> Vises automatisk efter 2 skærmhøjder scroll (kan
              tilpasses)
            </li>
            <li>
              <strong>Smooth scrolling:</strong> Bruger browser's native smooth scroll
              funktionalitet
            </li>
            <li>
              <strong>Target element:</strong> Springer til element med id="top" eller til toppen af
              siden
            </li>
          </ul>
        </div>
      </div>
    </section>

    <fds-preview header="Kodeeksempler" href="https://designsystem.dk/komponenter/tilbage-til-top/">
      <fds-preview-item>
        <h3>Grundlæggende brug</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeBasic"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Med tilpassede indstillinger</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeCustom"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Typisk implementering i layout</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeLayout"></pre>
      </fds-preview-code>
    </fds-preview>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Interactive example state
const customVisibleText = ref('Til toppen')
const customScreenReaderText = ref('Til toppen af siden')
const customThreshold = ref(400)
const useSlotContent = ref(false)
const customSlotText = ref('Tilpasset tekst')

// Code examples
const codeBasic = `
<!-- Grundlæggende implementering -->
<fds-til-top />

<!-- Placeret i footer (anbefalet) -->
<footer>
  <fds-til-top />
  <!-- ... andet footer indhold ... -->
</footer>
`

const codeCustom = `
<!-- Med tilpasset tekst og tærskel -->
<fds-til-top 
  visible-text="Hop til top"
  screen-reader-text="Gå til toppen af denne side"
  :threshold="300"
/>

<!-- Med slot indhold -->
<fds-til-top screen-reader-text="Tilbage til toppen">
  🔝 Til tops
</fds-til-top>
`

const codeLayout = `
<!-- App.vue eller layout template -->
<template>
  <div id="app">
    <!-- Tilføj id="top" til hovedelement for optimal navigation -->
    <header id="top">
      <!-- ... -->
    </header>
    
    <main>
      <!-- ... side indhold ... -->
    </main>
    
    <footer>
      <!-- Tilbage til toppen knap placeret i footer -->
      <fds-til-top />
      
      <!-- ... andet footer indhold ... -->
    </footer>
  </div>
</template>

<style>
/* DKFDS CSS inkluderet, komponentet er automatisk positioneret */
</style>
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
  font-size: 1.1rem;
}

h4 {
  margin-bottom: 12px;
  font-size: 1rem;
}

/* Override positioning for demo purposes */
.example-til-top {
  position: relative !important;
  right: auto !important;
  bottom: auto !important;
  left: auto !important;
  top: auto !important;
  z-index: 1 !important;
  display: inline-block !important;
}

.gap-3 {
  gap: 1rem !important;
}
</style>
