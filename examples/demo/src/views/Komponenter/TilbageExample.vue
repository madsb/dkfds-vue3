<template>
  <article>
    <h1>Tilbage-link</h1>

    <!-- Basic Example -->
    <section>
      <h2>Grundlæggende eksempel</h2>
      <div class="example-container">
        <fds-tilbage-link @click="handleBasicClick"> Tilbage </fds-tilbage-link>

        <br /><br />

        <fds-tilbage-link @click="handleCustomClick"> Tilbage til oversigten </fds-tilbage-link>
      </div>
    </section>

    <!-- Link Navigation -->
    <section>
      <h2>Med navigation</h2>
      <div class="example-container">
        <fds-tilbage-link href="/komponenter" @click="handleNavClick">
          Tilbage til komponenter
        </fds-tilbage-link>

        <br /><br />

        <fds-tilbage-link href="/" @click="handleHomeClick">
          Tilbage til forsiden
        </fds-tilbage-link>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section>
      <h2>Interaktivt eksempel</h2>
      <div class="example-container">
        <p><strong>Nuværende trin:</strong> {{ currentStep }}</p>

        <div
          class="step-content"
          style="padding: 16px; background-color: #f0f8ff; border-radius: 4px; margin: 16px 0"
        >
          <h3>{{ steps[currentStepIndex].title }}</h3>
          <p>{{ steps[currentStepIndex].description }}</p>

          <div style="margin-top: 16px">
            <button
              v-if="currentStepIndex < steps.length - 1"
              class="btn btn--primary"
              style="margin-right: 8px"
              @click="nextStep"
            >
              Næste
            </button>

            <fds-tilbage-link v-if="currentStepIndex > 0" @click="previousStep">
              Forrige trin
            </fds-tilbage-link>
          </div>
        </div>

        <div class="mt-4">
          <p><strong>Klik antal:</strong> {{ clickCount }}</p>
          <p><strong>Sidste handling:</strong> {{ lastAction }}</p>
        </div>
      </div>
    </section>

    <!-- Usage Guidelines -->
    <section>
      <h2>Retningslinjer for brug</h2>
      <div class="example-container">
        <div class="alert alert--info" style="margin-bottom: 16px">
          <h4>Hvornår skal du bruge tilbage-link?</h4>
          <ul>
            <li>I flertrinsselvbetjeningsløsninger</li>
            <li>I løsninger med sammenhængende sider</li>
            <li>Når brugeren skal kunne gå tilbage til forrige trin</li>
          </ul>
        </div>

        <div class="alert alert--warning">
          <h4>Vigtigt at huske:</h4>
          <ul>
            <li>Placer øverst til venstre under headeren</li>
            <li>Brug ikke samtidig med brødkrummer</li>
            <li>Standard tekst er "Tilbage"</li>
            <li>Inkluderer automatisk chevron-left ikon</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section>
      <h2>Tilgængelighed</h2>
      <div class="example-container">
        <fds-tilbage-link href="/previous-page" @click="handleAccessibilityDemo">
          Tilgængelig tilbage-link
        </fds-tilbage-link>

        <div class="mt-4">
          <h4>Tilgængelighedsfunktioner:</h4>
          <ul>
            <li><strong>Semantisk HTML:</strong> Bruger standard &lt;a&gt; element</li>
            <li><strong>Ikondekor:</strong> Chevron-left ikon er dekorativt (aria-hidden)</li>
            <li><strong>Fokus:</strong> Kan navigeres med tastatur</li>
            <li><strong>Mus og touch:</strong> Understøtter alle interaktionsmetoder</li>
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

// Interactive demo state
const currentStepIndex = ref(0)
const clickCount = ref(0)
const lastAction = ref('Ingen handlinger endnu')

const steps = [
  { title: 'Trin 1: Personlige oplysninger', description: 'Indtast dine personlige oplysninger.' },
  { title: 'Trin 2: Adresseoplysninger', description: 'Indtast din adresse.' },
  { title: 'Trin 3: Kontaktoplysninger', description: 'Indtast telefon og email.' },
  {
    title: 'Trin 4: Gennemse og bekræft',
    description: 'Gennemse dine oplysninger før indsendelse.',
  },
]

const currentStep = computed(() => `${currentStepIndex.value + 1} af ${steps.length}`)

// Event handlers
const handleBasicClick = (event: MouseEvent) => {
  clickCount.value++
  lastAction.value = 'Grundlæggende tilbage-link klikket'
  console.log('Basic tilbage-link clicked', event)
}

const handleCustomClick = (event: MouseEvent) => {
  clickCount.value++
  lastAction.value = 'Tilpasset tilbage-link klikket'
  console.log('Custom tilbage-link clicked', event)
}

const handleNavClick = (event: MouseEvent) => {
  // Prevent default navigation for demo
  event.preventDefault()
  clickCount.value++
  lastAction.value = 'Navigation tilbage-link klikket'
  console.log('Navigation tilbage-link clicked', event)
}

const handleHomeClick = (event: MouseEvent) => {
  // Prevent default navigation for demo
  event.preventDefault()
  clickCount.value++
  lastAction.value = 'Hjem navigation klikket'
  console.log('Home navigation clicked', event)
}

const handleAccessibilityDemo = (event: MouseEvent) => {
  // Prevent default navigation for demo
  event.preventDefault()
  clickCount.value++
  lastAction.value = 'Tilgængelighed demo klikket'
  console.log('Accessibility demo clicked', event)
}

const nextStep = () => {
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++
    lastAction.value = `Gik til trin ${currentStepIndex.value + 1}`
  }
}

const previousStep = (_event: MouseEvent) => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
    clickCount.value++
    lastAction.value = `Gik tilbage til trin ${currentStepIndex.value + 1}`
  }
}

const codeExamples = `
<!-- Grundlæggende brug -->
<fds-tilbage-link @click="handleClick">
  Tilbage
</fds-tilbage-link>

<!-- Med tilpasset tekst -->
<fds-tilbage-link @click="handleClick">
  Tilbage til oversigten
</fds-tilbage-link>

<!-- Med href for navigation -->
<fds-tilbage-link href="/previous-page" @click="handleClick">
  Tilbage til forrige side
</fds-tilbage-link>

<!-- TypeScript event handler -->
const handleClick = (event: MouseEvent) => {
  console.log('Tilbage-link clicked', event)
  // Din logik her
}

<!-- Flere eksempler -->
<!-- I en flertrinsproces -->
<fds-tilbage-link @click="goToPreviousStep">
  Forrige trin
</fds-tilbage-link>

<!-- Tilbage til forside -->
<fds-tilbage-link href="/">
  Tilbage til forsiden
</fds-tilbage-link>

<!-- Tilbage til specifik side -->
<fds-tilbage-link href="/ansogninger">
  Tilbage til ansøgninger
</fds-tilbage-link>
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

.step-content h3 {
  margin-bottom: 8px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
