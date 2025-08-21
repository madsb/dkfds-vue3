<template>
  <section>
    <fds-preview
      header="Fejlmeddelelser"
      href="https://designsystem.dk/komponenter/fejlmeddelelser/"
    >
      <fds-preview-item>
        <h3>Manuel fejlmeddelelse</h3>
        <fds-formgroup :is-valid="false">
          <fds-label> Kursustitel </fds-label>
          <fds-tooltip class="ml-2"> Hjælpende <b>tekst</b> </fds-tooltip>
          <fds-hint>Indtast navnet på dit kursus</fds-hint>
          <fds-fejlmeddelelse> Giv dit kursus et navn </fds-fejlmeddelelse>
          <fds-input v-model="txtKursus" input-type="text"></fds-input>
        </fds-formgroup>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Automatisk fejlmeddelelse med validering</h3>
        <fds-formgroup :is-valid="emailValid">
          <fds-label>E-mail</fds-label>
          <fds-hint>Indtast din e-mail adresse</fds-hint>
          <fds-fejlmeddelelse v-if="!emailValid">
            {{ emailError }}
          </fds-fejlmeddelelse>
          <fds-input
            v-model="txtEmail"
            input-type="email"
            autocomplete="email"
            @blur="emailDirty = true"
          />
        </fds-formgroup>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeValidate"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Props</h3>
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
              <td><code>auto</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Om komponenten automatisk skal vise fejl fra inject</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-4">Inject</h3>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Inject</th>
              <th>Type</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>provideErrorMessage</code></td>
              <td><code>string | Ref&lt;string&gt;</code></td>
              <td>Fejlbesked der vises automatisk når <code>auto</code> er true</td>
            </tr>
            <tr>
              <td><code>provideIsValid</code></td>
              <td><code>boolean | Ref&lt;boolean&gt;</code></td>
              <td>Om feltet er gyldigt. Fejl vises kun når false</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-4">Tilgængelighed</h3>
        <p>
          Komponenten tilføjer automatisk en skærmlæser-venlig "Fejl: " præfiks til alle
          fejlbeskeder.
        </p>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const txtKursus = ref('')
const txtEmail = ref('')
const emailDirty = ref(false)

const emailValidations = [
  (value: string) => {
    if (!value) {
      return 'E-mail er påkrævet'
    }
    return null
  },
  (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Indtast en gyldig e-mail adresse'
    }
    return null
  },
]

// Validation logic for email
const emailValid = computed(() => {
  if (!emailDirty.value) return true
  return emailValidations.every((v) => !v(txtEmail.value))
})

const emailError = computed(() => {
  if (emailValid.value || !emailDirty.value) return ''
  for (const validation of emailValidations) {
    const error = validation(txtEmail.value)
    if (error) return error
  }
  return ''
})

const code = `
<fds-formgroup :is-valid="false">
  <fds-label> Kursustitel </fds-label>
  <fds-tooltip class="ml-2">
    Hjælpende <b>tekst</b>
  </fds-tooltip>
  <fds-hint>Indtast navnet på dit kursus</fds-hint>
  <fds-fejlmeddelelse> Giv dit kursus et navn </fds-fejlmeddelelse>
  <fds-input v-model="txtKursus" input-type="text"></fds-input>
</fds-formgroup>
`

const codeValidate = `
<fds-formgroup :is-valid="emailValid">
  <fds-label>E-mail</fds-label>
  <fds-hint>Indtast din e-mail adresse</fds-hint>
  <fds-fejlmeddelelse v-if="!emailValid">
    {{ emailError }}
  </fds-fejlmeddelelse>
  <fds-input 
    v-model="txtEmail" 
    input-type="email" 
    autocomplete="email"
    @blur="emailDirty = true"
  />
</fds-formgroup>

// I script setup:
const emailValid = computed(() => {
  if (!emailDirty.value) return true
  return emailValidations.every(v => !v(txtEmail.value))
})

const emailError = computed(() => {
  if (emailValid.value || !emailDirty.value) return ''
  for (const validation of emailValidations) {
    const error = validation(txtEmail.value)
    if (error) return error
  }
  return ''
})
`
</script>
