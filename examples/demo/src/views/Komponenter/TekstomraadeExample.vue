<template>
  <section>
    <fds-preview header="Tekstområde" href="https://designsystem.dk/komponenter/tekstomraade/">
      <fds-preview-item>
        <fds-formgroup>
          <fds-label>Begrundelse</fds-label>
          <fds-hint>Indtast din begrundelse (automatisk højdejustering)</fds-hint>
          <fds-textarea v-model="txtBegrundelse" :rows="5" :max-rows="10" />
        </fds-formgroup>

        <fds-pre header="v-model" :json="{ txtBegrundelse }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
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
              <td><code>v-model</code></td>
              <td><code>string</code></td>
              <td><code>''</code></td>
              <td>Tekstområdets værdi</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>null (autoid)</code></td>
              <td>Unik identifikator</td>
            </tr>
            <tr>
              <td><code>rows</code></td>
              <td><code>number</code></td>
              <td><code>5</code></td>
              <td>Minimum antal synlige rækker</td>
            </tr>
            <tr>
              <td><code>maxRows</code></td>
              <td><code>number</code></td>
              <td><code>10</code></td>
              <td>Maksimum antal rækker (auto-resize)</td>
            </tr>
            <tr>
              <td><code>rowlength</code></td>
              <td><code>number</code></td>
              <td><code>80</code></td>
              <td>Tegn pr. række til beregning</td>
            </tr>
            <tr>
              <td><code>maxlength</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Maksimal tegnlængde</td>
            </tr>
            <tr>
              <td><code>widthClass</code></td>
              <td><code>string</code></td>
              <td><code>''</code></td>
              <td>DKFDS bredde klasser</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>

    <fds-preview header="Tekstområde med tegnbegrænsning">
      <fds-preview-item>
        <fds-formgroup>
          <fds-label>Beskrivelse</fds-label>
          <fds-hint>Maks 200 tegn</fds-hint>
          <fds-textarea v-model="txtBeskrivelse" :maxlength="200" :rows="4" :max-rows="8" />
          <fds-input-limit :model-value="txtBeskrivelse" :limit="200" />
        </fds-formgroup>

        <fds-pre header="v-model" :json="{ txtBeskrivelse, length: txtBeskrivelse.length }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeLimit"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Tekstområde med forskellige bredder">
      <fds-preview-item>
        <fds-formgroup>
          <fds-label>Kort besked (input-width-m)</fds-label>
          <fds-textarea v-model="txtKort" width-class="input-width-m" :rows="3" />
        </fds-formgroup>

        <fds-formgroup>
          <fds-label>Lang beskrivelse (input-width-xl)</fds-label>
          <fds-textarea v-model="txtLang" width-class="input-width-xl" :rows="6" />
        </fds-formgroup>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeWidths"></pre>
      </fds-preview-code>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const txtBegrundelse = ref('')
const txtBeskrivelse = ref('')
const txtKort = ref('')
const txtLang = ref('')

const code = `
<fds-formgroup>
  <fds-label>Begrundelse</fds-label>
  <fds-hint>Indtast din begrundelse</fds-hint>
  <fds-textarea 
    v-model="txtBegrundelse" 
    :rows="5" 
    :max-rows="10" 
  />
</fds-formgroup>
`

const codeLimit = `
<fds-formgroup>
  <fds-label>Beskrivelse</fds-label>
  <fds-hint>Maks 200 tegn</fds-hint>
  <fds-textarea 
    v-model="txtBeskrivelse" 
    :maxlength="200"
    :rows="4"
    :max-rows="8"
  />
  <fds-input-limit :model-value="txtBeskrivelse" :limit="200" />
</fds-formgroup>
`

const codeWidths = `
<!-- Kort tekstområde -->
<fds-textarea 
  v-model="txtKort" 
  width-class="input-width-m"
  :rows="3"
/>

<!-- Langt tekstområde -->
<fds-textarea 
  v-model="txtLang" 
  width-class="input-width-xl"
  :rows="6"
/>
`
</script>
