<template>
  <section>
    <fds-preview header="Eksempel" href="https://designsystem.dk/komponenter/fejlopsummering/">
      <fds-preview-item>
        <h3>Automatisk fejlindsamling</h3>
        <fds-fejlopsummering />

        <form class="mt-6">
          <fds-formgroup>
            <fds-label for="demo-name">Navn</fds-label>
            <fds-input id="demo-name" v-model="name" required />
            <fds-fejlmeddelelse v-if="!name">Navn er påkrævet</fds-fejlmeddelelse>
          </fds-formgroup>

          <fds-formgroup>
            <fds-label for="demo-email">Email</fds-label>
            <fds-input id="demo-email" v-model="email" type="email" required />
            <fds-fejlmeddelelse v-if="!email">Email er påkrævet</fds-fejlmeddelelse>
          </fds-formgroup>
        </form>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeAuto"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Manuel fejlliste</h3>
        <fds-fejlopsummering header="Der er 2 fejl i formularen" :errors="manualErrors" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeManual"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Custom slot indhold</h3>
        <fds-fejlopsummering header="Fejl">
          <li>Custom fejl 1</li>
          <li>Custom fejl 2</li>
        </fds-fejlopsummering>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeSlot"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Scroll-to-field funktionalitet</h3>
        <p>Klik på fejlene nedenfor for at se, hvordan komponenten automatisk scroller til og fokuserer på det relevante felt.</p>
        
        <fds-fejlopsummering 
          header="Der er 4 fejl i formularen" 
          :errors="scrollDemoErrors"
          @error-clicked="onErrorClicked"
        />

        <form class="mt-6" style="min-height: 100vh;">
          <fds-formgroup id="scroll-name" class="mb-6">
            <fds-label for="scroll-name">Fulde navn *</fds-label>
            <fds-input 
              v-model="scrollForm.name" 
              :class="{ 'input-error': !scrollForm.name }"
            />
            <fds-fejlmeddelelse v-if="!scrollForm.name">
              Indtast dit fulde navn
            </fds-fejlmeddelelse>
          </fds-formgroup>

          <div style="height: 50vh; display: flex; align-items: center; justify-content: center; background: #f8f9fa; margin: 2rem 0; border: 1px dashed #ccc;">
            <p>Scroll-afstand mellem felter...</p>
          </div>

          <fds-formgroup id="scroll-email" class="mb-6">
            <fds-label for="scroll-email">Email adresse *</fds-label>
            <fds-input 
              v-model="scrollForm.email" 
              type="email"
              :class="{ 'input-error': !isValidEmail }"
            />
            <fds-fejlmeddelelse v-if="!isValidEmail">
              Indtast en gyldig email adresse
            </fds-fejlmeddelelse>
          </fds-formgroup>

          <div style="height: 40vh; display: flex; align-items: center; justify-content: center; background: #f8f9fa; margin: 2rem 0; border: 1px dashed #ccc;">
            <p>Mere indhold for at demonstrere scrolling...</p>
          </div>

          <fds-formgroup id="scroll-phone" class="mb-6">
            <fds-label for="scroll-phone">Telefonnummer *</fds-label>
            <fds-input 
              v-model="scrollForm.phone"
              :class="{ 'input-error': !isValidPhone }"
            />
            <fds-fejlmeddelelse v-if="!isValidPhone">
              Indtast et gyldigt telefonnummer (8 cifre)
            </fds-fejlmeddelelse>
          </fds-formgroup>

          <div style="height: 30vh; display: flex; align-items: center; justify-content: center; background: #f8f9fa; margin: 2rem 0; border: 1px dashed #ccc;">
            <p>Endnu mere indhold...</p>
          </div>

          <fds-formgroup id="scroll-message" class="mb-6">
            <fds-label for="scroll-message">Besked *</fds-label>
            <textarea 
              id="scroll-message" 
              v-model="scrollForm.message" 
              class="form-textarea"
              :class="{ 'input-error': !scrollForm.message }"
              rows="4"
              placeholder="Skriv din besked här..."
            ></textarea>
            <fds-fejlmeddelelse v-if="!scrollForm.message">
              Indtast en besked
            </fds-fejlmeddelelse>
          </fds-formgroup>

          <p class="mt-4">
            <strong>Sidste klik:</strong> {{ lastClickedField || 'Ingen fejl klikket endnu' }}
          </p>
        </form>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeScrollDemo"></pre>
      </fds-preview-code>

      <fds-preview-item>
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
              <td><code>header</code></td>
              <td><code>string</code></td>
              <td><code>'Der er problemer'</code></td>
              <td>Overskrift for fejlopsummering</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>ID for aria-labelledby (genereres automatisk hvis ikke angivet)</td>
            </tr>
            <tr>
              <td><code>errors</code></td>
              <td><code>ErrorItem[]</code></td>
              <td><code>[]</code></td>
              <td>Manuel liste af fejl med id og message</td>
            </tr>
            <tr>
              <td><code>autoCollect</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Om komponenten automatisk skal indsamle fejl fra formfelter</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact">
          <thead>
            <tr>
              <th>Events</th>
              <th>Payload</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>error-clicked</code></td>
              <td><code>string</code></td>
              <td>Udsendes når en fejl-link klikkes med felt ID</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact">
          <thead>
            <tr>
              <th>Slots</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>header</code></td>
              <td><code>props.header</code></td>
              <td>Overskrift slot</td>
            </tr>
            <tr>
              <td><code>default</code></td>
              <td><code>-</code></td>
              <td>Ekstra list items efter automatiske fejl</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact">
          <thead>
            <tr>
              <th>TypeScript Types</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ErrorItem</code></td>
              <td><code>{ id: string; message: string; element?: HTMLElement }</code></td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface ErrorItem {
  id: string
  message: string
  element?: HTMLElement
}

const name = ref('')
const email = ref('')

// Scroll demo form data
const scrollForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const lastClickedField = ref<string | null>(null)

// Computed validation for scroll demo
const isValidEmail = computed(() => {
  if (!scrollForm.value.email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(scrollForm.value.email)
})

const isValidPhone = computed(() => {
  if (!scrollForm.value.phone) return false
  return /^\d{8}$/.test(scrollForm.value.phone.replace(/\s/g, ''))
})

// Error list for scroll demo
const scrollDemoErrors = computed(() => {
  const errors: ErrorItem[] = []
  
  if (!scrollForm.value.name) {
    errors.push({ id: 'scroll-name', message: 'Fulde navn er påkrævet' })
  }
  
  if (!isValidEmail.value) {
    errors.push({ id: 'scroll-email', message: 'Email adresse er påkrævet og skal være gyldig' })
  }
  
  if (!isValidPhone.value) {
    errors.push({ id: 'scroll-phone', message: 'Telefonnummer er påkrævet og skal være 8 cifre' })
  }
  
  if (!scrollForm.value.message) {
    errors.push({ id: 'scroll-message', message: 'Besked er påkrævet' })
  }
  
  return errors
})

// Handle error clicks to track which field was clicked
const onErrorClicked = (fieldId: string) => {
  const fieldNames: Record<string, string> = {
    'scroll-name': 'Fulde navn',
    'scroll-email': 'Email adresse', 
    'scroll-phone': 'Telefonnummer',
    'scroll-message': 'Besked'
  }
  lastClickedField.value = fieldNames[fieldId] || fieldId
}

const manualErrors: ErrorItem[] = [
  { id: 'field-1', message: 'Feltnavn skal udfyldes' },
  { id: 'field-2', message: 'Email er ikke gyldig' },
]

const codeAuto = `
<!-- Automatisk fejlindsamling fra formfelter -->
<fds-fejlopsummering />

<form>
  <fds-formgroup>
    <fds-label for="name">Navn</fds-label>
    <fds-input id="name" v-model="name" required />
    <fds-fejlmeddelelse v-if="!name">Navn er påkrævet</fds-fejlmeddelelse>
  </fds-formgroup>
</form>
`

const codeManual = `
<!-- Manuel fejlliste -->
<fds-fejlopsummering 
  header="Der er 2 fejl i formularen"
  :errors="errors"
/>

<script setup>
const errors = [
  { id: 'field-1', message: 'Feltnavn skal udfyldes' },
  { id: 'field-2', message: 'Email er ikke gyldig' }
]
<\/script>
`

const codeSlot = `
<!-- Custom slot indhold -->
<fds-fejlopsummering header="Fejl">
  <li>Custom fejl 1</li>
  <li>Custom fejl 2</li>
</fds-fejlopsummering>
`

const codeScrollDemo = `
<!-- Scroll-to-field funktionalitet -->
<fds-fejlopsummering 
  header="Der er fejl i formularen" 
  :errors="scrollDemoErrors"
  @error-clicked="onErrorClicked"
/>

<form>
  <fds-formgroup>
    <fds-label for="scroll-name">Fulde navn *</fds-label>
    <fds-input 
      id="scroll-name" 
      v-model="scrollForm.name" 
      :class="{ 'input-error': !scrollForm.name }"
    />
    <fds-fejlmeddelelse v-if="!scrollForm.name">
      Indtast dit fulde navn
    </fds-fejlmeddelelse>
  </fds-formgroup>

  <!-- Mere indhold her for at demonstrere scrolling -->
  
  <fds-formgroup>
    <fds-label for="scroll-email">Email adresse *</fds-label>
    <fds-input 
      id="scroll-email" 
      v-model="scrollForm.email" 
      type="email"
      :class="{ 'input-error': !isValidEmail }"
    />
    <fds-fejlmeddelelse v-if="!isValidEmail">
      Indtast en gyldig email adresse
    </fds-fejlmeddelelse>
  </fds-formgroup>
</form>

<script setup>
import { ref, computed } from 'vue'

const scrollForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const scrollDemoErrors = computed(() => {
  const errors = []
  
  if (!scrollForm.value.name) {
    errors.push({ id: 'scroll-name', message: 'Fulde navn er påkrævet' })
  }
  
  if (!isValidEmail.value) {
    errors.push({ id: 'scroll-email', message: 'Email er påkrævet' })
  }
  
  return errors
})

// Automatisk fokus og scroll til felt når fejl klikkes
const onErrorClicked = (fieldId) => {
  console.log('Scrolling to field:', fieldId)
}
<` + `/script>
\``
</script>
