<template>
  <article>
    <!-- Basic List Example -->
    <section>
      <h2>Grundlæggende eksempel</h2>
      <div class="example-container">
        <h3>Uordnet liste</h3>
        <fds-list>
          <fds-list-item>Første element</fds-list-item>
          <fds-list-item>Andet element</fds-list-item>
          <fds-list-item>Tredje element</fds-list-item>
        </fds-list>

        <h3>Ordnet liste</h3>
        <fds-list ordered>
          <fds-list-item>Første trin</fds-list-item>
          <fds-list-item>Andet trin</fds-list-item>
          <fds-list-item>Tredje trin</fds-list-item>
        </fds-list>
      </div>
    </section>

    <!-- List Variants -->
    <section>
      <h2>Varianter</h2>
      <div class="example-container">
        <h3>Bordered liste</h3>
        <fds-list variant="bordered">
          <fds-list-item>Element med kant</fds-list-item>
          <fds-list-item>Andet element</fds-list-item>
          <fds-list-item>Tredje element</fds-list-item>
        </fds-list>

        <h3>Unstyled liste</h3>
        <fds-list variant="unstyled">
          <fds-list-item>Element uden styling</fds-list-item>
          <fds-list-item>Andet element</fds-list-item>
          <fds-list-item>Tredje element</fds-list-item>
        </fds-list>

        <h3>No bullet liste</h3>
        <fds-list variant="nobullet">
          <fds-list-item>Element uden punkttegn</fds-list-item>
          <fds-list-item>Andet element</fds-list-item>
          <fds-list-item>Tredje element</fds-list-item>
        </fds-list>
      </div>
    </section>

    <!-- Nested Lists -->
    <section>
      <h2>Indlejrede lister</h2>
      <div class="example-container">
        <fds-list>
          <fds-list-item>
            Første niveau
            <fds-list>
              <fds-list-item>Andet niveau - punkt 1</fds-list-item>
              <fds-list-item>Andet niveau - punkt 2</fds-list-item>
            </fds-list>
          </fds-list-item>
          <fds-list-item>
            Første niveau - punkt 2
            <fds-list ordered>
              <fds-list-item>Ordnet underliste - punkt 1</fds-list-item>
              <fds-list-item>Ordnet underliste - punkt 2</fds-list-item>
            </fds-list>
          </fds-list-item>
        </fds-list>
      </div>
    </section>

    <!-- List Items with Status -->
    <section>
      <h2>Liste elementer med status</h2>
      <div class="example-container">
        <fds-list variant="bordered">
          <fds-list-item>Normal element</fds-list-item>
          <fds-list-item variant="current">Nuværende element</fds-list-item>
          <fds-list-item variant="active">Aktivt element</fds-list-item>
          <fds-list-item variant="disabled">Deaktiveret element</fds-list-item>
        </fds-list>
      </div>
    </section>

    <!-- Flex Layout Lists -->
    <section>
      <h2>Flex layout</h2>
      <div class="example-container">
        <fds-list variant="bordered">
          <fds-list-item flex justify-between>
            <span>Element med flex layout</span>
            <fds-badge>Ny</fds-badge>
          </fds-list-item>
          <fds-list-item flex justify-between>
            <span>Andet element</span>
            <fds-badge variant="success">Komplet</fds-badge>
          </fds-list-item>
          <fds-list-item flex justify-between>
            <span>Element med længere tekst der demonstrerer flex layout</span>
            <fds-badge variant="warning">Venter</fds-badge>
          </fds-list-item>
        </fds-list>
      </div>
    </section>

    <!-- Custom Content Lists -->
    <section>
      <h2>Brugerdefineret indhold</h2>
      <div class="example-container">
        <fds-list variant="bordered">
          <fds-list-item flex>
            <div class="d-flex align-items-start gap-3 w-100">
              <fds-ikon icon="document" class="mt-1" />
              <div class="flex-grow-1">
                <h4 class="mb-1">Dokument titel</h4>
                <p class="mb-1 text-muted">Beskrivelse af dokumentet med yderligere detaljer</p>
                <small class="text-muted">Sidst ændret: 15. januar 2024</small>
              </div>
              <fds-button variant="tertiary" icon="download">Download</fds-button>
            </div>
          </fds-list-item>
          <fds-list-item flex>
            <div class="d-flex align-items-start gap-3 w-100">
              <fds-ikon icon="image" class="mt-1" />
              <div class="flex-grow-1">
                <h4 class="mb-1">Billede fil</h4>
                <p class="mb-1 text-muted">Et eksempel billede med metadata</p>
                <small class="text-muted">Uploadet: 12. januar 2024</small>
              </div>
              <fds-button variant="tertiary" icon="view">Vis</fds-button>
            </div>
          </fds-list-item>
        </fds-list>
      </div>
    </section>

    <!-- Interactive Example -->
    <section>
      <h2>Interaktivt eksempel</h2>
      <div class="example-container">
        <div class="d-flex flex-column gap-3">
          <div>
            <fds-list
              :variant="selectedVariant"
              :ordered="isOrdered"
              :no-top-margin="noTopMargin"
              :no-bottom-margin="noBottomMargin"
            >
              <fds-list-item v-for="(item, index) in listItems" :key="index">
                {{ item }}
              </fds-list-item>
            </fds-list>
          </div>

          <div class="mt-4">
            <h4>Konfiguration:</h4>
            <div class="row">
              <div class="col-md-6">
                <label>Variant:</label>
                <select v-model="selectedVariant" class="form-select mt-1">
                  <option :value="null">Standard</option>
                  <option value="bordered">Bordered</option>
                  <option value="unstyled">Unstyled</option>
                  <option value="nobullet">No bullet</option>
                  <option value="overflow">Overflow</option>
                </select>
              </div>
              <div class="col-md-6">
                <label>Liste type:</label>
                <div class="mt-1">
                  <label
                    ><input v-model="isOrdered" type="radio" :value="false" /> Uordnet (ul)</label
                  >
                  <label class="ms-3"
                    ><input v-model="isOrdered" type="radio" :value="true" /> Ordnet (ol)</label
                  >
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <label><input v-model="noTopMargin" type="checkbox" /> Ingen top margin</label>
                <label class="ms-3"
                  ><input v-model="noBottomMargin" type="checkbox" /> Ingen bottom margin</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section>
      <h2>Tilgængelighed</h2>
      <div class="example-container">
        <p class="mb-3">Liste med semantisk korrekt markup og accessibility attributter:</p>

        <fds-list aria-label="Navigations menu" variant="bordered">
          <fds-list-item role="none">
            <a href="#section1" aria-describedby="section1-desc">Sektion 1</a>
            <span id="section1-desc" class="sr-only">Gå til første sektion</span>
          </fds-list-item>
          <fds-list-item role="none">
            <a href="#section2" aria-describedby="section2-desc">Sektion 2</a>
            <span id="section2-desc" class="sr-only">Gå til anden sektion</span>
          </fds-list-item>
        </fds-list>
      </div>
    </section>

    <fds-preview header="Kodeeksempler" href="https://designsystem.dk/komponenter/lister/">
      <fds-preview-item>
        <h3>Grundlæggende brug</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeBasic"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Med varianter og status</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeVariants"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Flex layout og brugerdefineret indhold</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeFlex"></pre>
      </fds-preview-code>
    </fds-preview>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Interactive example state
const selectedVariant = ref<'bordered' | 'unstyled' | 'nobullet' | 'overflow' | null>(null)
const isOrdered = ref(false)
const noTopMargin = ref(false)
const noBottomMargin = ref(false)
const listItems = ref(['Første element i listen', 'Andet element med mere tekst', 'Tredje element'])

// Code examples
const codeBasic = `
<!-- Uordnet liste -->
<fds-list>
  <fds-list-item>Første element</fds-list-item>
  <fds-list-item>Andet element</fds-list-item>
  <fds-list-item>Tredje element</fds-list-item>
</fds-list>

<!-- Ordnet liste -->
<fds-list ordered>
  <fds-list-item>Første trin</fds-list-item>
  <fds-list-item>Andet trin</fds-list-item>
  <fds-list-item>Tredje trin</fds-list-item>
</fds-list>
`

const codeVariants = `
<!-- Bordered liste -->
<fds-list variant="bordered">
  <fds-list-item>Standard element</fds-list-item>
  <fds-list-item variant="current">Nuværende element</fds-list-item>
  <fds-list-item variant="active">Aktivt element</fds-list-item>
  <fds-list-item variant="disabled">Deaktiveret element</fds-list-item>
</fds-list>

<!-- Unstyled liste -->
<fds-list variant="unstyled">
  <fds-list-item>Element uden styling</fds-list-item>
</fds-list>
`

const codeFlex = `
<!-- Flex layout med badges -->
<fds-list variant="bordered">
  <fds-list-item flex justify-between>
    <span>Element med flex layout</span>
    <fds-badge>Ny</fds-badge>
  </fds-list-item>
</fds-list>

<!-- Brugerdefineret indhold -->
<fds-list variant="bordered">
  <fds-list-item flex>
    <div class="d-flex align-items-start gap-3 w-100">
      <fds-ikon icon="document" class="mt-1" />
      <div class="flex-grow-1">
        <h4 class="mb-1">Dokument titel</h4>
        <p class="mb-1 text-muted">Beskrivelse af dokumentet</p>
      </div>
      <fds-button variant="tertiary" icon="download">Download</fds-button>
    </div>
  </fds-list-item>
</fds-list>
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

.gap-3 {
  gap: 1rem !important;
}
</style>
