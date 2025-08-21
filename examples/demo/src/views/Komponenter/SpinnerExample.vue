<template>
  <section>
    <fds-preview header="Spinner varianter" href="https://designsystem.dk/komponenter/spinner/">
      <!-- Basic spinner -->
      <fds-preview-item header="Standard spinner">
        <div class="mt-6">
          <fds-spinner :sr-only-text="'Indlæser indhold'" />
        </div>
      </fds-preview-item>

      <!-- Small spinner -->
      <fds-preview-item header="Lille spinner">
        <div class="mt-6">
          <fds-spinner size="small" :sr-only-text="'Indlæser'" />
        </div>
      </fds-preview-item>

      <!-- Spinner with visible text -->
      <fds-preview-item header="Spinner med synlig tekst">
        <div class="mt-6">
          <fds-spinner>Arbejder...</fds-spinner>
        </div>
      </fds-preview-item>

      <!-- Centered spinner -->
      <fds-preview-item header="Centreret spinner">
        <div class="border p-6" style="min-height: 200px">
          <fds-spinner :centered="true" :sr-only-text="'Indlæser side'" />
        </div>
      </fds-preview-item>

      <!-- Light variant for dark backgrounds -->
      <fds-preview-item header="Lys variant (til mørke baggrunde)">
        <div class="bg-primary-dark p-6" style="color: white">
          <fds-spinner variant="light">Indlæser på mørk baggrund</fds-spinner>
        </div>
      </fds-preview-item>

      <!-- Multiple sizes and combinations -->
      <fds-preview-item header="Kombinationer">
        <div class="row">
          <div class="col-12 col-md-6 mb-4">
            <h4>Stor spinner med tekst</h4>
            <fds-spinner>Henter data...</fds-spinner>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <h4>Lille spinner med tekst</h4>
            <fds-spinner size="small">Gemmer...</fds-spinner>
          </div>
        </div>
      </fds-preview-item>

      <!-- Accessibility examples -->
      <fds-preview-item header="Tilgængelighed varianter">
        <div class="row">
          <div class="col-12 col-md-4 mb-4">
            <h4>Polite aria-live</h4>
            <fds-spinner aria-live="polite">Standard indlæsning</fds-spinner>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <h4>Assertive aria-live</h4>
            <fds-spinner aria-live="assertive">Kritisk handling</fds-spinner>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <h4>Kun skærmlæser tekst</h4>
            <fds-spinner :sr-only-text="'Behandler anmodning'" />
          </div>
        </div>
      </fds-preview-item>

      <!-- Usage in context -->
      <fds-preview-item header="Spinner i kontekst">
        <fds-formgroup>
          <fds-label for="search-field">Søg</fds-label>
          <div class="d-flex align-items-center">
            <fds-input id="search-field" v-model="searchText" />
            <fds-spinner v-if="isSearching" size="small" class="ml-3"> Søger... </fds-spinner>
          </div>
        </fds-formgroup>

        <hr class="my-5" />

        <fds-button :disabled="isProcessing" variant="primary" @click="handleButtonClick">
          <span v-if="!isProcessing">Gem ændringer</span>
          <fds-spinner v-else size="small" variant="light"> Gemmer... </fds-spinner>
        </fds-button>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
const isSearching = ref(false)
const isProcessing = ref(false)

const handleButtonClick = () => {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
  }, 2000)
}

const code = `<!-- Standard spinner med skærmlæser tekst -->
<fds-spinner :sr-only-text="'Indlæser indhold'" />

<!-- Lille spinner -->
<fds-spinner size="small" :sr-only-text="'Indlæser'" />

<!-- Spinner med synlig tekst -->
<fds-spinner>Arbejder...</fds-spinner>

<!-- Centreret spinner -->
<fds-spinner :centered="true" :sr-only-text="'Indlæser side'" />

<!-- Lys variant til mørke baggrunde -->
<fds-spinner variant="light">Indlæser på mørk baggrund</fds-spinner>

<!-- Lille spinner med tekst -->
<fds-spinner size="small">Gemmer...</fds-spinner>

<!-- Med assertive aria-live for kritiske handlinger -->
<fds-spinner aria-live="assertive">Kritisk handling</fds-spinner>

<!-- I en knap -->
<fds-button :disabled="isProcessing">
  <span v-if="!isProcessing">Gem ændringer</span>
  <fds-spinner v-else size="small" variant="light">
    Gemmer...
  </fds-spinner>
</fds-button>

<!-- Ved søgefelt -->
<div class="d-flex align-items-center">
  <fds-input v-model="searchText" />
  <fds-spinner v-if="isSearching" size="small" class="ml-3">
    Søger...
  </fds-spinner>
</div>`
</script>
