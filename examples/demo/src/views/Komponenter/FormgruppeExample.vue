<template>
  <section>
    <fds-preview header="Eksempel">
      <fds-preview-item href="https://designsystem.dk/komponenter/inputfelter/">
        <h3>Eksempel med fuld accessibility</h3>
        <p>
          Denne formgruppe demonstrerer automatisk aria-describedby kobling mellem input og
          hint/fejl elementer.
        </p>

        <fds-formgroup id="demo-name-field" :is-valid="isNameValid">
          <fds-label>Fulde navn</fds-label>
          <fds-tooltip class="ml-2">Dit fulde navn som det står i dit pas</fds-tooltip>
          <fds-hint>Fx "Anders Andersen"</fds-hint>
          <fds-fejlmeddelelse v-if="!isNameValid">
            Navn skal være mindst 3 tegn
          </fds-fejlmeddelelse>
          <fds-input v-model="user.name" @blur="validateName" />
        </fds-formgroup>

        <div class="mt-4">
          <fds-button variant="secondary" @click="user.name = ''">Ryd navn</fds-button>
          <fds-button class="ml-4" @click="user.name = 'Anders Andersen'"
            >Udfyld eksempel</fds-button
          >
        </div>

        <fds-pre header="Data" :json="user" class="mt-4" />

        <details class="mt-4">
          <summary>Se genereret HTML med accessibility attributter</summary>
          <p class="mt-2">Input elementet får automatisk:</p>
          <ul>
            <li><code>id="demo-name-field"</code> - fra formgroup</li>
            <li>
              <code>aria-describedby="demo-name-field-hint demo-name-field-error"</code> - når der
              er fejl
            </li>
            <li><code>aria-describedby="demo-name-field-hint"</code> - når der ikke er fejl</li>
          </ul>
          <p>Hint og fejl elementer får automatisk matchende IDs.</p>
        </details>
      </fds-preview-item>

      <hr />

      <fds-preview-item>
        <h3>Om fds-formgroup</h3>
        <p class="italic">
          Komponenten <code>fds-formgroup</code> er et Vue wrapper komponent omkring DKFDS's
          CSS-baserede <code>.form-group</code> klasse. Den håndterer:
        </p>
        <ul>
          <li>Automatisk ID-generering og koordinering mellem label og input</li>
          <li>Fejlvisning med <code>.form-error</code> klasse</li>
          <li>Accessibility med automatisk <code>aria-describedby</code> for hints og fejl</li>
          <li>Integration med fejlopsummering komponent</li>
          <li>Overholder DKFDS 8-punkts grid (24px margin-bottom)</li>
        </ul>

        <p class="h4 mt-6">Props</p>
        <table class="table table--compact">
          <thead>
            <tr>
              <th></th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code></td>
              <td><code>string | null</code></td>
              <td><code>null</code></td>
              <td>Eksplicit ID for formgruppen, ellers auto-genereres</td>
            </tr>
            <tr>
              <td><code>isValid</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Hvis false sættes class form-error</td>
            </tr>
          </tbody>
        </table>

        <p class="h4">Provide</p>
        <table class="table table--compact">
          <thead>
            <tr>
              <th></th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>formid</code></td>
              <td><code>Ref&lt;string&gt;</code></td>
              <td><code>Auto id</code></td>
              <td>Udstiller form id til label og input</td>
            </tr>
            <tr>
              <td><code>hintId</code></td>
              <td><code>ComputedRef&lt;string&gt;</code></td>
              <td><code>{formid}-hint</code></td>
              <td>ID til hint element</td>
            </tr>
            <tr>
              <td><code>errorId</code></td>
              <td><code>ComputedRef&lt;string&gt;</code></td>
              <td><code>{formid}-error</code></td>
              <td>ID til fejlmeddelelse element</td>
            </tr>
            <tr>
              <td><code>ariaDescribedby</code></td>
              <td><code>ComputedRef&lt;string&gt;</code></td>
              <td><code>Computed</code></td>
              <td>Kombineret aria-describedby værdi for input</td>
            </tr>
          </tbody>
        </table>

        <p class="h4">Inject</p>
        <table class="table table--compact">
          <thead>
            <tr>
              <th></th>
              <th>Type</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>provideIsValid</code></td>
              <td><code>boolean</code></td>
              <td>lytter efter provideIsValid, vægtes højere end props.isValid</td>
            </tr>
          </tbody>
        </table>

        <p class="italic">
          Komponenten udstiller (<code>provide</code>) et <code>formid</code> som
          <code>fds-label</code> selv omdanner til <code>for</code> id og
          <code>fds-[input]</code> elementer benytter som <code>id</code>.
        </p>
        <p class="italic">
          Komponenten udstiller ligeledes <code>hintId</code> og <code>errorId</code> som
          <code>fds-hint</code> og <code>fds-fejlmeddelelse</code> selv omdanner til
          <code>span</code> elementer med <code>id</code>.
        </p>
        <p class="italic">
          Hvis nødvendigt kan man selv bruge enten
          <code> &lt;fds-formgroup #default="{ formid, ariaDescribedby }" &gt; </code>
          eller selv <code>const formid = inject('formid', null)</code>. Nu kan man også få adgang
          til <code>ariaDescribedby</code> via slot props.
        </p>

        <p class="italic"></p>
        <p class="italic">
          Kan evt bruge til at lave egne komponenter der wrapper eksempelvis ovenstående i sin egen
          validarings-komponent
        </p>
        <p class="italic">
          Komponenten <code>fds-input</code> kan udskiftes med egne komponenter eller eg:
          <code>fds-input-number</code> m.m. Disse vil automatisk få <code>id</code> og
          <code>aria-describedby</code> via provide/inject systemet.
        </p>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const user = ref({
  name: '',
})

const isNameValid = ref(true)

const validateName = () => {
  isNameValid.value = user.value.name.length >= 3
}
const code = `
<!-- Eksempel med fuld accessibility -->
<fds-formgroup id="demo-name-field" :is-valid="isNameValid">
  <fds-label>Fulde navn</fds-label>
  <fds-tooltip class="ml-2">
    Dit fulde navn som det står i dit pas
  </fds-tooltip>
  <fds-hint>Fx "Anders Andersen"</fds-hint>
  <fds-fejlmeddelelse v-if="!isNameValid">
    Navn skal være mindst 3 tegn
  </fds-fejlmeddelelse>
  <fds-input v-model="user.name" @blur="validateName" />
</fds-formgroup>

<script setup>
const user = ref({ name: '' })
const isNameValid = ref(true)

const validateName = () => {
  isNameValid.value = user.value.name.length >= 3
}
<${'/'}script>
`
</script>
