<template>
  <section>
    <fds-preview header="Tjekboks" href="https://designsystem.dk/komponenter/tjekboks/">
      <fds-preview-item>
        <h3>Enkelt tjekboks</h3>
        <fds-checkbox v-model="oneChecked"> Jeg accepterer vilkår og betingelser </fds-checkbox>

        <h3 class="mt-4">Tjekboks med ekstra indhold</h3>
        <fds-checkbox v-model="twoChecked">
          Tilmeld nyhedsbrev
          <template #content>
            <div class="mt-2">
              <fds-formgroup>
                <fds-label>Email adresse</fds-label>
                <fds-input
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="din@email.dk"
                  width-class="input-width-l"
                />
              </fds-formgroup>
            </div>
          </template>
        </fds-checkbox>

        <fds-pre header="v-model" :json="{ oneChecked, twoChecked, newsletterEmail }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeBasic"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Tjekboks gruppe">
      <fds-preview-item>
        <fieldset>
          <legend class="form-label">Vælg interesser</legend>
          <div class="form-hint">Du kan vælge flere</div>

          <fds-checkbox v-model="interests" value="sport"> Sport </fds-checkbox>

          <fds-checkbox v-model="interests" value="kultur"> Kultur </fds-checkbox>

          <fds-checkbox v-model="interests" value="teknologi">
            Teknologi
            <template #content>
              <div class="mt-2">
                <fds-formgroup>
                  <fds-label>Hvilke teknologier?</fds-label>
                  <fds-input v-model="techDetails" placeholder="f.eks. AI, Web, Mobile" />
                </fds-formgroup>
              </div>
            </template>
          </fds-checkbox>

          <fds-checkbox v-model="interests" value="andet"> Andet </fds-checkbox>
        </fieldset>

        <fds-pre header="v-model" :json="{ interests, techDetails }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeGroup"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Deaktiveret tjekboks">
      <fds-preview-item>
        <fds-checkbox v-model="disabledChecked" :disabled="true">
          Deaktiveret tjekboks (ikke markeret)
        </fds-checkbox>

        <fds-checkbox :model-value="true" :disabled="true">
          Deaktiveret tjekboks (markeret)
        </fds-checkbox>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeDisabled"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Props Reference">
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
              <td><code>boolean | string[]</code></td>
              <td><code>false</code></td>
              <td>Tjekboksens værdi (array for grupper)</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>string | number | boolean</code></td>
              <td><code>true</code></td>
              <td>Værdi for tjekboks i gruppe</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>null (autoid)</code></td>
              <td>Unik identifikator</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Name attribut for form submission</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Deaktiverer tjekboksen</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact mt-4">
          <thead>
            <tr>
              <th>Events</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@change</code></td>
              <td>Udsendt når tjekboksen ændres</td>
            </tr>
            <tr>
              <td><code>@dirty</code></td>
              <td>Udsendt når tjekboksen mister fokus</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact mt-4">
          <thead>
            <tr>
              <th>Slots</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>Label tekst for tjekboksen</td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td>Ekstra indhold der vises når tjekboksen er markeret</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const oneChecked = ref(false)
const twoChecked = ref(false)
const newsletterEmail = ref('')
const interests = ref<string[]>([])
const techDetails = ref('')
const disabledChecked = ref(false)

const codeBasic = `
<!-- Enkelt tjekboks -->
<fds-checkbox v-model="oneChecked">
  Jeg accepterer vilkår og betingelser
</fds-checkbox>

<!-- Tjekboks med ekstra indhold -->
<fds-checkbox v-model="twoChecked">
  Tilmeld nyhedsbrev
  <template #content>
    <div class="mt-2">
      <fds-formgroup>
        <fds-label>Email adresse</fds-label>
        <fds-input
          v-model="newsletterEmail"
          type="email"
          placeholder="din@email.dk"
        />
      </fds-formgroup>
    </div>
  </template>
</fds-checkbox>
`

const codeGroup =
  `
<!-- Tjekboks gruppe med array v-model -->
<fieldset>
  <legend class="form-label">Vælg interesser</legend>
  <div class="form-hint">Du kan vælge flere</div>

  <fds-checkbox v-model="interests" value="sport">
    Sport
  </fds-checkbox>

  <fds-checkbox v-model="interests" value="kultur">
    Kultur
  </fds-checkbox>

  <fds-checkbox v-model="interests" value="teknologi">
    Teknologi
    <template #content>
      <!-- Vises kun når teknologi er valgt -->
      <fds-input v-model="techDetails" />
    </template>
  </fds-checkbox>

  <fds-checkbox v-model="interests" value="andet">
    Andet
  </fds-checkbox>
</fieldset>

<script setup>
const interests = ref<string[]>([])
<` +
  `/script>
`

const codeDisabled = `
<!-- Deaktiveret ikke-markeret -->
<fds-checkbox v-model="disabledChecked" :disabled="true">
  Deaktiveret tjekboks
</fds-checkbox>

<!-- Deaktiveret markeret -->
<fds-checkbox :model-value="true" :disabled="true">
  Deaktiveret tjekboks (markeret)
</fds-checkbox>
`
</script>
