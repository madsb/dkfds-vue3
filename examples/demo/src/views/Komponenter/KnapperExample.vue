<template>
  <article>
    <h1>Knapper</h1>

    <!-- Basic Button Examples -->
    <section>
      <h2>Grundlæggende eksempel</h2>
      <div class="example-container">
        <p>
          <fds-button @click="klikEvent">Gå til næste</fds-button>
        </p>
        <p>
          <fds-button variant="secondary" @click="klikEvent">Secondary knap</fds-button>
        </p>
        <p>
          <fds-button variant="tertiary" @click="klikEvent">Tertiary knap</fds-button>
        </p>
        <p>
          <fds-button variant="warning" @click="klikEvent">Warning knap</fds-button>
        </p>
      </div>
    </section>

    <!-- Button Variants -->
    <section>
      <h2>Varianter</h2>
      <div class="example-container">
        <div class="d-flex flex-wrap gap-2">
          <fds-button variant="primary" @click="klikEvent">Primary</fds-button>
          <fds-button variant="secondary" @click="klikEvent">Secondary</fds-button>
          <fds-button variant="tertiary" @click="klikEvent">Tertiary</fds-button>
          <fds-button variant="warning" @click="klikEvent">Warning</fds-button>
        </div>
      </div>
    </section>

    <!-- Icon Examples -->
    <section>
      <h2>Knapper med ikoner</h2>
      <div class="example-container">
        <h3>Ikon til venstre</h3>
        <div class="d-flex flex-wrap gap-2 mb-4">
          <fds-button variant="primary" icon="save" @click="klikEvent">Gem</fds-button>
          <fds-button variant="secondary" icon="refresh" @click="klikEvent">Opdater</fds-button>
          <fds-button variant="tertiary" icon="edit" @click="klikEvent">Rediger</fds-button>
        </div>

        <h3>Ikon til højre</h3>
        <div class="d-flex flex-wrap gap-2 mb-4">
          <fds-button variant="primary" icon="arrow-right" icon-right @click="klikEvent"
            >Fortsæt</fds-button
          >
          <fds-button variant="secondary" icon="download" icon-right @click="klikEvent"
            >Download</fds-button
          >
        </div>

        <h3>Kun ikon</h3>
        <div class="d-flex flex-wrap gap-2">
          <fds-button
            variant="primary"
            icon="close"
            icon-only
            aria-label="Luk dialog"
            @click="klikEvent"
          />
          <fds-button
            variant="secondary"
            icon="help"
            icon-only
            aria-label="Hjælp"
            @click="klikEvent"
          />
          <fds-button
            variant="tertiary"
            icon="settings"
            icon-only
            aria-label="Indstillinger"
            @click="klikEvent"
          />
        </div>
      </div>
    </section>

    <!-- Mobile Full Width -->
    <section>
      <h2>Responsiv bredde</h2>
      <div class="example-container">
        <p>
          <fds-button variant="primary" full-width-mobile @click="klikEvent">
            Fuld bredde på mobil
          </fds-button>
        </p>
        <p class="mt-2 text-muted">
          <small>Denne knap får fuld bredde på skærme mindre end 576px</small>
        </p>
      </div>
    </section>

    <!-- Interactive Example -->
    <section>
      <h2>Interaktivt eksempel</h2>
      <div class="example-container">
        <div class="d-flex flex-column gap-3">
          <div>
            <fds-button
              :variant="selectedVariant"
              :icon="selectedIcon"
              :icon-right="iconPosition === 'right'"
              :icon-only="showIconOnly"
              :full-width-mobile="fullWidthMobile"
              @click="handleInteractiveClick"
            >
              {{ showIconOnly ? '' : buttonText }}
            </fds-button>
          </div>

          <div class="mt-4">
            <h4>Konfiguration:</h4>
            <div class="row">
              <div class="col-md-6">
                <label>Variant:</label>
                <select v-model="selectedVariant" class="form-select mt-1">
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="tertiary">Tertiary</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
              <div class="col-md-6">
                <label>Ikon:</label>
                <select v-model="selectedIcon" class="form-select mt-1">
                  <option value="">Intet ikon</option>
                  <option value="save">Save</option>
                  <option value="edit">Edit</option>
                  <option value="close">Close</option>
                  <option value="help">Help</option>
                </select>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <label> <input v-model="showIconOnly" type="checkbox" /> Kun ikon </label>
                <label class="ms-3">
                  <input v-model="fullWidthMobile" type="checkbox" /> Fuld bredde på mobil
                </label>
                <label v-if="selectedIcon" class="ms-3">
                  <input v-model="iconPosition" type="radio" value="left" /> Ikon venstre
                </label>
                <label v-if="selectedIcon" class="ms-2">
                  <input v-model="iconPosition" type="radio" value="right" /> Ikon højre
                </label>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <p><strong>Sidste klik:</strong> {{ lastClickMessage }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility Example -->
    <section>
      <h2>Tilgængelighed</h2>
      <div class="example-container">
        <div class="d-flex flex-wrap gap-2">
          <fds-button variant="primary" icon="save" aria-describedby="save-help" @click="klikEvent">
            Gem dokument
          </fds-button>
          <fds-button
            variant="secondary"
            icon="close"
            icon-only
            aria-label="Luk dialog"
            title="Luk dialog"
            @click="klikEvent"
          />
          <fds-button
            variant="tertiary"
            icon="help"
            icon-only
            aria-label="Hjælp og support"
            aria-describedby="help-description"
            @click="klikEvent"
          />
        </div>

        <div class="mt-3">
          <p id="save-help" class="text-muted small">Gemmer dokumentet i kladdemappen</p>
          <p id="help-description" class="text-muted small">
            Åbner hjælpepanelet med supportinformation
          </p>
        </div>
      </div>
    </section>

    <fds-preview header="Kodeeksempler" href="https://designsystem.dk/komponenter/knapper/">
      <fds-preview-item>
        <h3>Grundlæggende brug</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeBasic"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Med ikoner</h3>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="codeIcons"></pre>
      </fds-preview-code>
    </fds-preview>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const klikEvent = () => window.confirm('KLIK')

// Interactive example state
const selectedVariant = ref<'primary' | 'secondary' | 'tertiary' | 'warning'>('primary')
const selectedIcon = ref('')
const iconPosition = ref<'left' | 'right'>('left')
const showIconOnly = ref(false)
const fullWidthMobile = ref(false)
const buttonText = ref('Interaktiv knap')
const lastClickMessage = ref('Ingen klik endnu')

const handleInteractiveClick = () => {
  const config = [
    `variant: ${selectedVariant.value}`,
    selectedIcon.value ? `icon: ${selectedIcon.value}` : '',
    iconPosition.value === 'right' && selectedIcon.value ? 'icon-right: true' : '',
    showIconOnly.value ? 'icon-only: true' : '',
    fullWidthMobile.value ? 'full-width-mobile: true' : '',
  ]
    .filter(Boolean)
    .join(', ')

  lastClickMessage.value = `Klik med konfiguration: { ${config} }`
}

// Code examples
const codeBasic = `
<!-- Grundlæggende knapper -->
<fds-button variant="primary" @click="handleClick">Primary knap</fds-button>
<fds-button variant="secondary" @click="handleClick">Secondary knap</fds-button>
<fds-button variant="tertiary" @click="handleClick">Tertiary knap</fds-button>
<fds-button variant="warning" @click="handleClick">Warning knap</fds-button>

<!-- Responsiv bredde -->
<fds-button variant="primary" full-width-mobile @click="handleClick">
  Fuld bredde på mobil
</fds-button>
`

const codeIcons = `
<!-- Ikon til venstre (standard) -->
<fds-button variant="primary" icon="save" @click="handleClick">Gem</fds-button>
<fds-button variant="secondary" icon="refresh" @click="handleClick">Opdater</fds-button>

<!-- Ikon til højre -->
<fds-button variant="primary" icon="arrow-right" icon-right @click="handleClick">
  Fortsæt
</fds-button>

<!-- Kun ikon -->
<fds-button
  variant="tertiary"
  icon="close"
  icon-only
  @click="handleClick"
  aria-label="Luk dialog"
/>
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

.gap-2 {
  gap: 0.5rem !important;
}

.gap-3 {
  gap: 1rem !important;
}
</style>
