<template>
  <section>
    <fds-preview header="Eksempel" href="https://designsystem.dk/komponenter/dropdown/">
      <fds-preview-item>
        <fds-dropdown v-model="dropdownVal">
          <option value="">Vælg en mulighed</option>
          <option value="Manuel">Manuel</option>
          <option value="Auto">Auto</option>
        </fds-dropdown>

        <fds-pre header="v-model" :json="{ dropdownVal }" />

        <div class="mt-6">
          <h4>Eksempel med forudvalgt værdi:</h4>
          <fds-dropdown v-model="dropdownVal2" class="mt-2">
            <option value="">Vælg en mulighed</option>
            <option value="Manuel">Manuel</option>
            <option value="Auto">Auto</option>
          </fds-dropdown>
          <fds-pre header="v-model" :json="{ dropdownVal2 }" class="mt-3" />
        </div>
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
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>formid</code></td>
              <td>Se form gruppe</td>
            </tr>
            <tr>
              <td><code>v-model</code></td>
              <td><code>string</code></td>
              <td><code>''</code></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dropdownVal = ref('')
const dropdownVal2 = ref('Auto')

const code = `
<!-- Uden forudvalgt værdi -->
<fds-dropdown v-model="dropdownVal">
  <option value="">Vælg en mulighed</option>
  <option value="Manuel">Manuel</option>
  <option value="Auto">Auto</option>
</fds-dropdown>

<!-- Med forudvalgt værdi -->
<fds-dropdown v-model="dropdownVal2">
  <option value="">Vælg en mulighed</option>
  <option value="Manuel">Manuel</option>
  <option value="Auto">Auto</option>
</fds-dropdown>

const dropdownVal = ref('');
const dropdownVal2 = ref('Auto');
`
</script>
